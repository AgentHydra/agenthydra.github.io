// Keep the version and the download links baked into index.html equal to the latest
// published release.
//
// WHY THIS EXISTS. The page corrects itself in the browser: a small script at the bottom
// of index.html fetches /releases/latest and rewrites the download hrefs, the version
// label and the JSON-LD after load. That is enough for a human with a working network.
// It is not enough for anyone else.
//
// Everything that does not run JavaScript reads the STATIC file: search crawlers, the AI
// answer engines this site carries schema.org markup for in the first place, link
// unfurlers, and every visitor whose request landed on GitHub's unauthenticated
// 60-per-hour API limit and silently fell back. A fallback that is wrong for months is
// not a fallback, it is a second claim. Nothing kept this file honest before and it
// showed: the page claimed softwareVersion 0.38.3 while 0.42.0 was shipping.
//
// It matters more now than it used to, because the download buttons no longer point at
// /releases -- they point at the FILE, one per build, so that clicking Linux ARM64
// downloads the Linux ARM64 build instead of opening a page with six archives to tell
// apart by filename. Those URLs carry the version, and so do these filenames. Left alone
// they 404 the day after a release.
//
// So the fallback is generated rather than remembered. This runs on a schedule and on
// demand, rewrites every place the version and the download URLs appear, and the
// workflow commits only when something actually changed.
//
//   node scripts/sync-version.mjs           # rewrite if stale
//   node scripts/sync-version.mjs --check   # exit 1 if stale, write nothing
//
// It throws rather than writing whenever it cannot prove what it is about to write: a
// marker it expects is missing (the template changed shape and this script is silently
// no longer tracking anything), the page offers a build this script has no URL rule for,
// this script has a build the page no longer offers, or the release does not actually
// contain the asset a link resolves to (the release job renamed it). A download button
// that 404s looks exactly like a working site until somebody clicks it, so that case is
// a hard failure here rather than a silent one in a browser.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = path.join(ROOT, 'index.html');
const REPO = 'LunarWerxs/AgentHydra';
const RELEASES = `https://api.github.com/repos/${REPO}/releases/latest`;

/** Every asset a release carries, keyed by the `data-dl` value the page uses. These
 *  filenames carry the version, so each is a function of it. Adding a build means adding
 *  a line here AND a tile in index.html; either one alone is a hard error below, which is
 *  the point. */
const DL_ASSETS = {
  'win-x64': (v) => `AgentHydra-${v}-windows-x64.exe`,
  'win-x64-zip': (v) => `AgentHydra-${v}-windows-x64.zip`,
  'mac-arm64': (v) => `AgentHydra-${v}-darwin-arm64.tar.gz`,
  'mac-x64': (v) => `AgentHydra-${v}-darwin-x64.tar.gz`,
  'linux-x64': (v) => `AgentHydra-${v}-linux-x64.tar.gz`,
  'linux-arm64': (v) => `AgentHydra-${v}-linux-arm64.tar.gz`,
};
/** The build the static page offers first, and the one schema.org's downloadUrl names. */
const PRIMARY_DL = 'win-x64';
const DL_BASE = `https://github.com/${REPO}/releases/download`;

const check = process.argv.includes('--check');

function countMatches(html, re) {
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  return (html.match(g) || []).length;
}

/** The tag as a bare `0.42.0`, plus the names of every asset the release actually
 *  published. Refuses anything that is not a version: writing a draft name or an empty
 *  string into the page would be worse than leaving yesterday's number there. */
async function latestRelease() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'agenthydra-site-sync' };
  // GITHUB_TOKEN in Actions lifts the 60/hour anonymous limit; absent locally, which is
  // fine for a once-a-day job.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(RELEASES, { headers });
  if (!res.ok) throw new Error(`releases/latest -> HTTP ${res.status}`);
  const body = await res.json();
  const tag = String(body.tag_name ?? '').trim().replace(/^v/, '');
  if (!/^\d+\.\d+\.\d+/.test(tag)) throw new Error(`tag_name is not a version: ${tag || '(empty)'}`);
  const assets = new Set((body.assets ?? []).map((a) => String(a.name ?? '')));
  return { version: tag, assets };
}

/**
 * The two shapes the version is written in, on purpose.
 *
 * `.js-app-version` is what a reader sees and carries the `v`. `softwareVersion` is
 * schema.org and must be bare, because that is what the vocabulary says and what the
 * answer engines parse. The runtime script in the page rewrites exactly these two, so
 * keeping to the same pair means the static file and the live correction can never
 * disagree about WHERE the version lives.
 */
function rewriteVersion(html, version) {
  const pillRe = /(<[^>]*class="[^"]*\bjs-app-version\b[^"]*"[^>]*>)v?\d+\.\d+\.\d+[^<]*(<\/)/g;
  const schemaRe = /("softwareVersion"\s*:\s*")\d+\.\d+\.\d+[^"]*(")/g;
  const pills = countMatches(html, pillRe);
  const schema = countMatches(html, schemaRe);
  if (pills === 0 || schema === 0) {
    throw new Error(
      `sync-version: expected version markers not found (js-app-version: ${pills}, ` +
      `softwareVersion: ${schema}). Refusing to treat a missing marker as "already current" ` +
      `-- the template likely changed shape. Fix the regex or the markup.`);
  }
  return html.replace(pillRe, `$1v${version}$2`).replace(schemaRe, `$1${version}$2`);
}

/**
 * Repoint every download link, and schema.org's downloadUrl, at the files in this
 * release.
 *
 * Matches the whole `<a ... data-dl="key" ...>` tag and rewrites the href inside it, so
 * it does not care what order the attributes are written in -- a cheap property to have,
 * given the next person to touch that markup will not have read this file.
 */
function rewriteDownloads(html, version, assets) {
  const seen = new Set();
  const out = html.replace(/<a\b[^>]*\sdata-dl="([a-z0-9-]+)"[^>]*>/gi, (tag, key) => {
    const name = DL_ASSETS[key];
    if (!name) {
      throw new Error(
        `sync-version: index.html has data-dl="${key}", which is not a known release asset. ` +
        `Add it to DL_ASSETS (with the filename that release publishes) or fix the markup.`);
    }
    const file = name(version);
    if (assets.size && !assets.has(file)) {
      throw new Error(
        `sync-version: release v${version} does not contain "${file}", the asset behind ` +
        `data-dl="${key}". Refusing to write a download button that 404s -- either the release ` +
        `job renamed that asset (update DL_ASSETS) or this release did not publish that build ` +
        `(remove its tile from index.html). Published: ${[...assets].join(', ') || '(none)'}`);
    }
    if (!/\shref="/.test(tag)) throw new Error(`sync-version: the data-dl="${key}" link has no href to rewrite`);
    seen.add(key);
    return tag.replace(/(\shref=")[^"]*(")/, (_m, a, b) => `${a}${DL_BASE}/v${version}/${file}${b}`);
  });

  const missing = Object.keys(DL_ASSETS).filter((k) => !seen.has(k));
  if (missing.length) {
    throw new Error(
      `sync-version: index.html has no download link for ${missing.join(', ')}. Every asset in ` +
      `DL_ASSETS is supposed to be offered on the page; a build that quietly stops being linked ` +
      `is a build nobody can download. Restore the tile, or drop the key here.`);
  }

  const ldRe = /("downloadUrl"\s*:\s*")[^"]*(")/g;
  if (countMatches(html, ldRe) === 0) {
    throw new Error('sync-version: JSON-LD "downloadUrl" not found. Refusing to treat a missing marker as already current.');
  }
  const primary = `${DL_BASE}/v${version}/${DL_ASSETS[PRIMARY_DL](version)}`;
  return out.replace(ldRe, (_m, a, b) => `${a}${primary}${b}`);
}

const { version, assets } = await latestRelease();
const before = fs.readFileSync(PAGE, 'utf8');
const after = rewriteDownloads(rewriteVersion(before, version), version, assets);

// NOTHING here calls process.exit(), and that is deliberate rather than stylistic.
// Calling it from inside a top-level await tears the event loop down mid-flight, and on
// Windows Node aborts with a libuv assertion and exit code 127 -- so a gate meant to
// report "stale" with a 1, and a happy path meant to report success with a 0, both come
// back as a crash. Setting exitCode and letting the process end on its own gives the
// codes this script promises.
if (before === after) {
  console.log(`site version and download links already ${version}; nothing to do`);
} else {
  // Say what moved. A silent "updated" tells nobody whether the regexes still match what
  // the page looks like today.
  const was = [...before.matchAll(/"softwareVersion"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  console.log(`site version ${[...new Set(was)].join(', ') || '(unknown)'} -> ${version}`);

  if (check) {
    console.error('STALE: run `node scripts/sync-version.mjs` to fix');
    process.exitCode = 1;
  } else {
    fs.writeFileSync(PAGE, after);
    console.log('index.html updated');
  }
}
