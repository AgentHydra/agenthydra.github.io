# AgentHydra site

> The public site for AgentHydra 2.0: one local window for every Claude Code chat on a PC, with its projects, their dev servers and every Claude and Codex account's quota.

<!-- odin:about HAND-OWNED above the GENERATED marker. Edit freely; `odin codex about --ingest` carries it back into Odin's Codex. -->

## What it is

The landing page for AgentHydra (https://github.com/LunarWerxs/AgentHydra), published from this repo by GitHub Pages at https://agenthydra.lunarwerx.com. It is one self-contained `index.html` with no build step: the hero, real screenshots of the 2.0 window, what it does, the downloads and an FAQ. Rewritten for 2.0 on 2026-10-08.

## Things not to forget

_The intricacies worth remembering: the gotchas, the half-built parts, the decisions whose
reason lives nowhere else. Odin never overwrites this section._

- The FAQ exists twice by hand: once as JSON-LD FAQPage structured data for search and AI crawlers and once as the visible cards, with the same questions. Editing only one leaves the schema and the page saying different things. anchors: `index.html:566`, `index.html:895`
- The version and the download links are generated, never typed: `scripts/sync-version.mjs` rewrites them in `index.html` and `pricing.md` from the latest GitHub release, run by `.github/workflows/sync-version.yml` on a schedule and on demand (`gh workflow run sync-version.yml --repo AgentHydra/agenthydra.github.io` after a release). The page also corrects them in the browser after load, but crawlers and no-JS visitors read the static file. anchors: `scripts/sync-version.mjs:1`
- The screenshots are real captures of the 2.0 demo window (`bun run screenshots` in the app repo's `desk2/`, which runs `scripts/window-shots.ts`), turned into WebP by `python scripts/optimize_images.py`. A UI change means retaking them; never commit a capture of a real chat. anchors: `img/window.webp`
- The copy has a word budget and no em-dashes: `node scripts/copy-budget.mjs` (ceiling in `scripts/copy-budget.json`), also run by `.github/workflows/copy-budget.yml`. anchors: `scripts/copy-budget.json:1`
- Codex and OpenCode sessions are read-only by design, not by omission: only Claude ships a CLI that accepts a piped prompt, so the FAQ encodes a real product limit, not a site bug to fix with a reply button. anchors: `index.html:571`
- The site is one self-contained `index.html` with no build step and no dependencies: the whole deploy is edit the file and push to main. anchors: `README.md:1`
- `pricing.md` is a machine-readable pricing summary for agentic buyers. Nothing on the page links to it; its version row is kept by `sync-version.mjs`. anchors: `pricing.md:1`

<!-- odin:about GENERATED BEGIN - rewritten by `odin codex about --publish`; edit the Codex, not this -->

## What Odin knows about this project

Everything from here down is generated from this project's Codex dossier
(`codex/projects/agenthydra-github-io.md` in the Odin clone) and is **rewritten on every publish** -
edit the dossier, not this block. Everything ABOVE the marker is yours.

### At a glance

- **Ships as:** static site - GitHub Pages (published to https://agenthydra.lunarwerx.com)
- **Live at:** https://agenthydra.lunarwerx.com
- **Entry points:** `site_root`
- **Deploys via:** github-pages
- **Domain:** AI coding tools, session management, agent orchestration, MCP server, queue scheduler, multi-tool integration
- **Remote:** https://github.com/AgentHydra/agenthydra.github.io.git

### Architecture

- `index.html` - single self-contained page: hero, product screenshot, three-step setup, feature grid, provider matrix, FAQ, and call-to-action links
- `docs/` - supplementary markdown docs: README with links to source repo and live site
- `icon.svg` - brand mark (terracotta logo) used in nav and page meta
- `favicon.ico` - browser tab icon for browsers that do not read icon.svg (16/32/48 px only; `python scripts/optimize_images.py` rewrites it)
- `og.png` - Open Graph image for social sharing (1280x640)
- `pricing.md` - markdown file for pricing page reference (currently unused/linked)

### Features

14 recorded - 14 shipped, 0 partial, 0 planned. Each path is where the feature is DEFINED; the exact lines live in the Codex entry, which `odin codex check` re-verifies and repairs.

**Shipped**

- **Hero section and product pitch** - Eyebrow tagline, headline with gradient text, lede copy, and dual CTA buttons (Download / GitHub) with live update indicator; sets the value proposition: unified session list, instance isolation, queue and scheduler. - `index.html`
- **Product screenshot (interactive replica)** - HTML/CSS replica of the AgentHydra app UI inside a browser frame, demonstrating the session list, provider badges, details pane, queue panel, and instances table. Includes hover states and tab switching. - `index.html`
- **Three-step setup guide** - Step-by-step card grid explaining how AgentHydra works: start the daemon, it auto-discovers sessions, then reply, queue or hand off to agents. - `index.html`
- **Provider compatibility matrix** - Table showing which features work with which AI tools (Claude Code, Codex, OpenCode): one list, instances, messaging, queuing, scheduler, MCP, marked by checkmark or dash per provider. - `index.html`
- **Features grid (nine capabilities)** - Nine feature cards with icons: one list unifying three tools; isolated instances; Codex window isolation; session reply; queue persistence; restart survival; rate-limit recovery; ChatGPT handoff; quick instance mode. - `index.html`
- **MCP server and agent integration section** - Two-card layout: one for the human dashboard, one for agent access over MCP. Explains the dual interface and what agents can control (sessions, queue, scheduler, instances, quota checks). - `index.html`
- **Quota and fan-out guidance section** - Educational content on using AgentHydra to prevent agent fan-out crashes by checking quotas before spinning up parallel work. - `index.html`
- **Installation options section** - Two-card comparison: pre-built binaries (Windows .exe, Linux/macOS single executables) vs. running from source (bun checkout); links to GitHub Releases and repo. - `index.html`
- **FAQ (structured data)** - Eight FAQPage items in JSON-LD schema covering cost, tool support, Codex/OpenCode read-only limitations, privacy and opt-out, MCP capabilities, offline mode, comparison to Crystal/Conductor, and Bun dependency. - `index.html`
- **Navigation header** - Sticky navbar with brand logo, nav links to anchor sections, and GitHub repo link with icon. - `index.html`
- **Brand and design system** - Dark theme CSS variables (terracotta brand color #c15f3c, provider colors for Claude/Codex/OpenCode), typography scale, spacing, and interactive states; includes background gradient and theme colors. - `index.html`
- **Social metadata and SEO** - Open Graph tags, Twitter card, canonical URL, JSON-LD SoftwareApplication schema with featureList, Organization, and BreadcrumbList; opt-out analytics pixel via ARGUS. - `index.html`
- **Comparison to alternatives** - Dedicated section (#compare) contrasting AgentHydra against separate terminal windows, Crystal/Nimbalyst, Conductor, and ccmanager, describing each from its own public docs and how AgentHydra differs. - `index.html`
- **Agent and search crawler discovery files** - robots.txt, sitemap.xml and llms.txt ship at the site root so search engines and LLM agents can discover and summarize the product; none are mentioned in architecture or features. - `llms.txt`, `robots.txt`, `sitemap.xml`

### Where to add a new one

- **new feature card in the feature grid** - add a div.card after line 1239, following the pattern: icon div, h3 title, p description anchors: `index.html`
- **new FAQ entry** - add a Question/Answer object to the FAQPage mainEntity array in the JSON-LD schema anchors: `index.html`
- **new provider or tool column in the matrix** - add a new th in .ptable thead and corresponding td cells in each row anchors: `index.html`
- **navigation link to a new section** - add an anchor link in .nav-links (line 97) and a corresponding section id below anchors: `index.html`

### Gaps and wants

_Withheld: this repository is public, and the gap list is not published outside the private index._
_Read it with `python odin.py codex brief agenthydra-github-io` in the Odin clone._

---

_Generated by `odin codex about --publish agenthydra-github-io` on 2026-09-16 from a Codex dossier stamped 2026-09-14. Regenerate after the product moves; `odin codex about` reports drift._
<!-- odin:about GENERATED END sha=e0638ebadc14 -->
