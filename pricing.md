# AgentHydra: pricing

Machine-readable summary for agentic buyers and procurement checks. Last updated: 2026-08-23.

## Summary

| | |
|---|---|
| Price | $0 |
| License | MIT |
| Plans / tiers | None: one build, all features |
| Account required | No |
| Seats / user limits | None (local software, not a hosted service) |
| Trial or freemium gate | None; nothing is paywalled or time-limited |
| Current version | v0.38.3 |
| Platforms | Windows, macOS, Linux |

AgentHydra itself is free and open source under the MIT license
(https://github.com/LunarWerxs/AgentHydra, see LICENSE in the repo). There is no paid tier, no
subscription, no usage cap, and no account to create. It runs as one local daemon on `localhost`
and is installed either as a prebuilt binary from GitHub Releases or built from source with Bun.

## Costs the user still carries (not paid to AgentHydra)

AgentHydra dispatches work through AI CLIs the user already has, so their existing usage terms
apply. None of this is billed by AgentHydra or LunarWerx:

- **Claude Code / Claude Desktop**: queuing and messaging `claude` runs uses the user's own
  Claude subscription or API key, under Anthropic's own pricing and quota terms.
- **Codex**: Codex instance management and session reading use the user's own OpenAI account,
  under OpenAI's own pricing and quota terms.
- **OpenCode**: session reading is read-only and local; whatever model/API costs the user's
  OpenCode setup already incurs are unaffected by AgentHydra.
- **ChatGPT handoff (optional)**: opens the user's own ChatGPT account in the browser; the user
  reviews and submits the upload themselves, under their own ChatGPT plan.

## What AgentHydra does not charge for

- The dashboard, the MCP server, the run queue and scheduler, instance management, quota
  checking (`check_usage`), and the auto-resume monitor are all part of the same free build.
  No feature is gated behind payment.

## Network use (not a cost, disclosed for completeness)

- A periodic, **opt-out** update check calls `studio.connections.icu` with the app version, a
  coarse OS tag, and a random per-install id (never an IP address, hostname, username, file
  path, account, or email). Set `AGENTHYDRA_NO_PING=1` to route the check to GitHub's API
  instead, with no install id sent at all.

## Links

- Releases (binaries): https://github.com/LunarWerxs/AgentHydra/releases
- Source: https://github.com/LunarWerxs/AgentHydra
- License file: https://github.com/LunarWerxs/AgentHydra (MIT, see LICENSE)
- Full brief: https://agenthydra.lunarwerx.com/llms-full.txt
