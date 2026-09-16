# AgentHydra site

> The marketing site for a single-page dashboard that lists every Claude Code, Codex and OpenCode session on one machine in one browser.

<!-- odin:about HAND-OWNED above the GENERATED marker. Edit freely; `odin codex about --ingest` carries it back into Odin's Codex. -->

## What it is

The landing and documentation site for AgentHydra, a local dashboard that unifies every Claude Code, Codex and OpenCode session on a single machine in one browser interface. Shipped as a single self-contained index.html with no build step or dependencies, deployed to GitHub Pages. Demonstrates AgentHydra's core capabilities: session browsing, instance management, queue and scheduler features, and the MCP server API that agents use to control the same state.

## Things not to forget

_The intricacies worth remembering: the gotchas, the half-built parts, the decisions whose
reason lives nowhere else. Odin never overwrites this section._

- The FAQ exists twice by hand: once as JSON-LD FAQPage structured data for search/AI crawlers and once as visible on-page cards with the same questions - editing only one leaves the schema and the rendered page saying different things. anchors: `index.html:722`
- That same FAQ duplication also lives on-screen, so a new or changed FAQ answer has to be typed into the visible card grid, not just the schema block. anchors: `index.html:1439`
- The version number is hand-typed in three unrelated spots that already disagree (replica UI shows 0.14.0, footer shows v0.38.3, and pricing.md has its own reference) - there is no single source of truth to bump on release. anchors: `index.html:1106`
- Footer version string is the other half of that same drift and is the one most likely to be treated as 'the' current version by a visitor. anchors: `index.html:1492`
- The 'product screenshot' is not an image - it's a full interactive HTML/CSS replica of the real app UI (tab switching, hover states) built by hand, so a real UI redesign silently goes stale here until someone rebuilds the replica. anchors: `index.html:832`
- Codex and OpenCode sessions are read-only by design, not by omission: only Claude ships a CLI that accepts a piped prompt, so the provider matrix and FAQ both encode a real product limit, not a site bug to be 'fixed' by adding a reply button here. anchors: `index.html:1439`
- The site is intentionally a single self-contained index.html with no build step and no dependencies - the whole deploy is edit the file and push to main. anchors: `README.md:1`
- pricing.md sits in the repo root but nothing in the site links to or renders it, so it is dead weight rather than a live page. anchors: `pricing.md:1`

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
- `favicon.ico` - browser tab icon
- `og.png` - Open Graph image for social sharing (1280x640)
- `pricing.md` - markdown file for pricing page reference (currently unused/linked)

### Features

14 recorded - 14 shipped, 0 partial, 0 planned. Each `path:line` is where the feature is DEFINED, checked by `odin codex check`.

**Shipped**

- **Hero section and product pitch** - Eyebrow tagline, headline with gradient text, lede copy, and dual CTA buttons (Download / GitHub) with live update indicator; sets the value proposition: unified session list, instance isolation, queue and scheduler. - `index.html:814`
- **Product screenshot (interactive replica)** - HTML/CSS replica of the AgentHydra app UI inside a browser frame, demonstrating the session list, provider badges, details pane, queue panel, and instances table. Includes hover states and tab switching. - `index.html:832`
- **Three-step setup guide** - Step-by-step card grid explaining how AgentHydra works: start the daemon, it auto-discovers sessions, then reply, queue or hand off to agents. - `index.html:1167`
- **Provider compatibility matrix** - Table showing which features work with which AI tools (Claude Code, Codex, OpenCode): one list, instances, messaging, queuing, scheduler, MCP, marked by checkmark or dash per provider. - `index.html:1196`
- **Features grid (nine capabilities)** - Nine feature cards with icons: one list unifying three tools; isolated instances; Codex window isolation; session reply; queue persistence; restart survival; rate-limit recovery; ChatGPT handoff; quick instance mode. - `index.html:1223`
- **MCP server and agent integration section** - Two-card layout: one for the human dashboard, one for agent access over MCP. Explains the dual interface and what agents can control (sessions, queue, scheduler, instances, quota checks). - `index.html:1275`
- **Quota and fan-out guidance section** - Educational content on using AgentHydra to prevent agent fan-out crashes by checking quotas before spinning up parallel work. - `index.html:1324`
- **Installation options section** - Two-card comparison: pre-built binaries (Windows .exe, Linux/macOS single executables) vs. running from source (bun checkout); links to GitHub Releases and repo. - `index.html:1355`
- **FAQ (structured data)** - Eight FAQPage items in JSON-LD schema covering cost, tool support, Codex/OpenCode read-only limitations, privacy and opt-out, MCP capabilities, offline mode, comparison to Crystal/Conductor, and Bun dependency. - `index.html:722`
- **Navigation header** - Sticky navbar with brand logo, nav links to anchor sections, and GitHub repo link with icon. - `index.html:797`
- **Brand and design system** - Dark theme CSS variables (terracotta brand color #c15f3c, provider colors for Claude/Codex/OpenCode), typography scale, spacing, and interactive states; includes background gradient and theme colors. - `index.html:28`
- **Social metadata and SEO** - Open Graph tags, Twitter card, canonical URL, JSON-LD SoftwareApplication schema with featureList, Organization, and BreadcrumbList; opt-out analytics pixel via ARGUS. - `index.html:642`, `index.html:14`
- **Comparison to alternatives** - Dedicated section (#compare) contrasting AgentHydra against separate terminal windows, Crystal/Nimbalyst, Conductor, and ccmanager, describing each from its own public docs and how AgentHydra differs. - `index.html:1406`
- **Agent and search crawler discovery files** - robots.txt, sitemap.xml and llms.txt ship at the site root so search engines and LLM agents can discover and summarize the product; none are mentioned in architecture or features. - `llms.txt:1`, `robots.txt:1`, `sitemap.xml:1`

### Where to add a new one

- **new feature card in the feature grid** - add a div.card after line 1239, following the pattern: icon div, h3 title, p description anchors: `index.html:1223`
- **new FAQ entry** - add a Question/Answer object to the FAQPage mainEntity array in the JSON-LD schema anchors: `index.html:724`
- **new provider or tool column in the matrix** - add a new th in .ptable thead and corresponding td cells in each row anchors: `index.html:1196`
- **navigation link to a new section** - add an anchor link in .nav-links (line 97) and a corresponding section id below anchors: `index.html:88`

### Gaps and wants

_Withheld: this repository is public, and the gap list is not published outside the private index._
_Read it with `python odin.py codex brief agenthydra-github-io` in the Odin clone._

---

_Generated by `odin codex about --publish agenthydra-github-io` on 2026-09-16 from a Codex dossier stamped 2026-09-14. Regenerate after the product moves; `odin codex about` reports drift._
<!-- odin:about GENERATED END sha=5ec1f9a94a8f -->
