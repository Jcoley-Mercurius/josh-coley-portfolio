# Josh Coley Portfolio → Mercurius Solutions

Source for Josh Coley's freelance portfolio. The site is being rebuilt as the **Mercurius Solutions** portfolio for business websites, landing pages, booking experiences, SaaS/portals and marketplace development.

The rebuild uses the approved **A1** direction (luminous marble and bronze, Greek architecture, Hermes hero artwork) one slice at a time. Each slice is a branch and pull request with a Vercel Preview; merging to `main` deploys to Production (https://josh-coley-portfolio.vercel.app), so merged slices are live.

## Status

| Slice | Outcome | Status |
| --- | --- | --- |
| S0 | Reconcile repository | complete |
| S1 | A1 foundations: tokens, shell, hero, responsive assets | complete |
| S2 | Selected work: server-rendered cards and accessible filters | complete |
| S3 | Case studies: `/work/[slug]` routes, chapters, metadata, not-found | complete (PR open) |
| S4 | Motion and navigation: bounded hero depth, reduced motion, accessible menu | ready |
| S5 | Inquiry: server-side Resend contact with validation and abuse controls | blocked |
| S6 | Project evidence: permitted screenshots and verified case narratives | blocked |
| S7 | Release verification: combined QA, preview inquiry test, approved deploy | blocked |

The live roadmap is [`mts/BUILD-ROADMAP.md`](mts/BUILD-ROADMAP.md), and per-slice results are in [`mts/QA-STATUS.md`](mts/QA-STATUS.md).

**Release blockers:** custom domain, the Resend sender and recipient, the shared abuse-control choice, project evidence and publication permissions, and combined browser QA. Public release also requires Josh's explicit release instruction.

## Stack

- Next.js 16.4 (App Router, Turbopack) with React 19.2 and TypeScript
- Tailwind CSS 4
- Framer Motion for React interactions (no second animation engine without an evidenced need)
- A1 type tokens: Georgia (display) and system-ui (body), no web-font download
- npm with a committed lockfile
- Playwright (`@playwright/test`, dev only) for browser and visual checks

Contact currently posts from the browser to Web3Forms. S5 replaces that with a same-origin Route Handler that sends through **Resend on the server**. `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` stay server-only, with no `NEXT_PUBLIC_` credentials.

## Development

Requires Node.js 20.9 or later.

```sh
npm ci          # install exactly from package-lock.json
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
npm run test:unit # node:test checks for the project record adapter (no extra dependency)
npm run test:e2e  # Playwright against a production build (run `npm run build` first)
```

Secrets belong in a private `.env.local` or the hosting provider's environment settings and are never committed (`.env*` is git-ignored).

## Repository layout

| Path | Purpose |
| --- | --- |
| `app/` | Next.js application: A1 shell, hero and selected work in place, legacy sections replaced incrementally |
| `e2e/` | Playwright checks per slice |
| `public/` | Static assets |
| `mps/` | Mercurius Product System: approved scope and requirements (`MPS-*`) |
| `mds/` | Mercurius Design System: A1 rules (`MDS-*`), tokens and approved composition boards |
| `mts/` | Mercurius Technology System: decisions, integration plan, roadmap, playbook, QA status |
| `content/projects/` | Project records with truthful status, contribution and evidence fields, validated at build time by `app/_lib/projects.ts` |
| `handoff/` | Original checksummed A1 handoff package and the prototype reference. Design evidence only, never deployed |
| `tools/fast-glob-shim/` | npm workspace shim (see below) |

`handoff/Mercurius-Solutions-A1-Handoff/reference/a1-prototype/` is the polished behavioral reference for A1. It gets translated into accessible Next components, not copied in as a client-only page.

### `tools/fast-glob-shim`

`@next/eslint-plugin-next` depends on `fast-glob`, which pulls in `braces` (GHSA-vfj7-8cjw-p6xm, no patched release). This workspace package provides the one function the plugin uses (`globSync` with `onlyDirectories`) on top of `tinyglobby`. An npm `overrides` entry points the plugin at it. The shim is lint-time only and is not part of the server or client bundle. Remove it once the upstream chain ships a fix.

## Working agreement

Agent and contributor rules live in [`AGENTS.md`](AGENTS.md); [`CLAUDE.md`](CLAUDE.md) imports it. In short:

- Read the installed Next.js guides in `node_modules/next/dist/docs/` before writing code. This Next version differs from older conventions.
- Read the MPS/MDS/MTS state and the current slice before editing. Run one slice at a time and report pass/fail/not-run.
- Don't invent project results, testimonials, delivery status or prices. The Shave Parlor is in rebuild.
- No new dependencies, providers or public release without a recorded decision.
- Stage only intended files and preserve unrelated changes.

The implementation playbook is [`mts/MERCURIUS-IMPLEMENTATION-PLAYBOOK.md`](mts/MERCURIUS-IMPLEMENTATION-PLAYBOOK.md).
