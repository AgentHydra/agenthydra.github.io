# agenthydra.github.io

The landing page for **AgentHydra**: a local dashboard that puts every Claude, Codex and
OpenCode session on the machine in one list, manages isolated Claude and Codex instances, and
queues `claude` runs to fire now or on a schedule.

🔗 **Live:** https://agenthydra.lunarwerx.com
📦 **Source & releases:** https://github.com/LunarWerxs/AgentHydra

[![Discord](https://img.shields.io/badge/Discord-join_the_community-5865F2?logo=discord&logoColor=white)](https://discord.gg/PsWpeNUzhk)

A single self-contained `index.html` (no build step, no dependencies), served by GitHub Pages.
Edit it directly and push to `main`.

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

To see a change rather than measure it, use `~/.claude/tools/shot/shotpage.mjs`, which
screenshots the page with the scroll-reveal animations forced to their finished state.
