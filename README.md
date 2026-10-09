# agenthydra.github.io

The landing page for **AgentHydra 2.0**: one local window for every Claude Code chat on the PC,
Claude Desktop's included, with your projects, their dev servers and every Claude and Codex
account's quota, plus an MCP server for your agents.

🔗 **Live:** https://agenthydra.lunarwerx.com
📦 **Source & releases:** https://github.com/LunarWerxs/AgentHydra

[![Discord](https://img.shields.io/badge/Discord-join_the_community-5865F2?logo=discord&logoColor=white)](https://discord.gg/PsWpeNUzhk)

A single self-contained `index.html` (no build step, no dependencies), served by GitHub Pages.
Edit it directly and push to `main`.

## The version and downloads

Never typed by hand. `scripts/sync-version.mjs` rewrites the version and the download links in
`index.html`, and the version row in `pricing.md`, from the latest GitHub release;
`.github/workflows/sync-version.yml` runs it on a schedule and on demand. After a release:
`gh workflow run sync-version.yml --repo AgentHydra/agenthydra.github.io`.

## Checks

`scripts/copy-budget.mjs` runs in CI on every push that touches the page, and locally with
`node scripts/copy-budget.mjs`. It enforces two things the owner cares about:

- **No em-dashes in visitor-facing copy.** A hard zero. Use a comma, colon, semicolon or a
  full stop. Dashes inside `<style>` or `<script>` comments are ignored.
- **The page does not quietly grow back.** Length is a ratchet against the baseline in
  `scripts/copy-budget.json`, not a fixed bar, so the page may shrink freely and drift up a
  little. Cut copy on purpose? Re-record it with `node scripts/copy-budget.mjs --update` and
  commit the new baseline.

It measures what a visitor actually reads, so collapsed `<details>`, elements with a `hidden`
attribute and `<noscript>` do not count. A naive word count reads about three times high.

To see a change rather than measure it, screenshot the page with the scroll-reveal animations
forced to their finished state: see [docs/screenshots.md](docs/screenshots.md) (the owner's copy of the tool is `~/.claude/tools/shot/shotpage.mjs`).
