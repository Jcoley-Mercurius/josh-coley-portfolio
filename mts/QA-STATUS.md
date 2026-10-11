# Handoff prototype verification (carried from the handoff package)
PASS: polished inline JavaScript syntax compilation; source assertions for all five project identities, chapter links, missing-project state, motion preference and simulated form states; handoff files and asset checksums.
NOT RUN: browser interaction, responsive visual QA, screen-reader checks, Next install/build/lint, real Resend integration and delivery, deployment-provider verification.
Prototype remains private. Simulated contact is explicitly labeled; no data sent/saved. Evidence placeholders remain intentional. B2 preserved separately.

# S0 repository reconciliation — 2026-10-10
Branch `feat/mercurius-a1` from main `b41318d` (handoff commit). Only change since inspected commit 7a4ee96 is the handoff itself; no application source drift to reconcile.

PASS: `sha256sum -c SHA256SUMS` (all files OK).
PASS: `npm ci` with unchanged package-lock.json. Runtime Node 24.17.0 / npm 11.13.0; package.json declares no engines; Next 16.2.9 requirement satisfied.
PASS: `npm run build` (Next 16.2.9 Turbopack; routes `/` and `/_not-found`, both static).
PASS: `npm run lint` (eslint, no findings).
NOT RUN: `npm run dev` / browser checks (no UI changes in S0; browser QA environment still unavailable).

Instructions: root AGENTS.md was identical to the packaged nextjs-agent-rules block; merged by adopting the packaged superset. CLAUDE.md unchanged and still imports @AGENTS.md.

Assets accounted for: `mps/`, `mds/` (state, tokens.json, reference index, 3 reference boards), `mts/`, `content/projects/` (5 records) copied to repo root non-destructively. `handoff/.../reference/a1-prototype/` (index.html, hero.png) retained in place as design evidence; it is outside `app/` and `public/` and is not served. No `.openai/hosting.json` exists in the repository.

Skills: `mercurius-technology-system` and `mercurius-design-system` are not installed in this Claude environment. Fallback per manifest: canonical handoff files plus official docs. Nothing installed.

Open finding — dependency advisories (owner decision; not fixed, per no-auto-upgrade rule): `npm audit` reports 15 (1 critical, 12 high, 2 moderate). Critical is `next` itself, fixed in next@16.4.0 (also clears transitive postcss, sharp). `eslint-config-next` chain (braces, micromatch, fast-glob, @next/eslint-plugin-next) is dev-only; audit's suggested fix is a downgrade to 14.x and should not be taken. Remaining (brace-expansion, browserslist, js-yaml, nanoid, source-map-js, baseline-browser-mapping, @tailwindcss/postcss) are non-breaking `npm audit fix` candidates. Recommend a separate reviewed upgrade to Next 16.4.x before S7 release.

Unresolved setup (unchanged): hosting linkage, Resend sender/recipient, abuse-control selection, project evidence/permissions, browser QA environment.

# S0 follow-up: dependency remediation — 2026-10-10
Owner-approved. `next` and `eslint-config-next` 16.2.9 → 16.4.0 (exact pins kept); `npm audit fix` (non-breaking) applied to lockfile. React 19.2.4 unchanged. Installed upgrade guide (`upgrading/version-16.md`) lists no 16.3/16.4-specific breaking changes; the 15→16 migrations it covers were already in place.

Audit: 15 (1 critical, 12 high, 2 moderate) → 5 high after upgrade and `npm audit fix` → 0 after shim. Critical `next` advisory cleared, plus postcss, sharp, brace-expansion, browserslist, js-yaml, nanoid, source-map-js, baseline-browser-mapping, @tailwindcss/postcss.
FIXED (owner-directed): braces GHSA-vfj7-8cjw-p6xm (≤3.0.3, no patched release exists) reached only via @next/eslint-plugin-next → fast-glob@3.3.1 → micromatch. The plugin's sole fast-glob call is `globSync(rootDir, { onlyDirectories: true })`. Added workspace package `tools/fast-glob-shim` (name fast-glob, 3.3.3) implementing that call on tinyglobby 0.2.17 (already in tree, MIT), plus `overrides: {"@next/eslint-plugin-next": {"fast-glob": "3.3.3"}}`. braces and micromatch are removed from the tree. Rejected alternatives: `file:`/`$` overrides (npm resolves the path relative to the nested package, leaving a dangling link) and audit `--force` (downgrades to eslint-config-next 14). eslint.config.mjs allows `require()` in the CommonJS shim only.
PASS: audit 0 vulnerabilities; `npm ls` clean; fresh `npm ci` reproduces. PASS: plugin `getRootDirs` via shim: unset → cwd; `app` → [app]; `["app/*","{mds,mts}"]` → [app/components, mds, mts]; absolute → absolute. Shim output matches fast-glob on tested patterns except `./x`, `../x` and trailing-slash forms (same directory, normalized spelling) and `x/**` (also includes base dir). This project does not set `settings.next.rootDir`.

PASS: `npm run build` on 16.4.0 (`/`, `/_not-found` static). PASS: `npm run lint`. PASS: `next start` smoke — `/` 200 with existing title, unknown route 404.
NOT RUN: browser/visual regression of existing pages.

Skills: `mercurius-technology-system` and `mercurius-design-system` installed (see mts/AGENT-SKILL-MANIFEST.yaml).
README rewritten to describe the A1 rebuild, slice status, stack, layout and working agreement.
Security note: the legacy Web3Forms access key is hard-coded in app/components/Contact.tsx and in git history. Removal is S5 scope; owner should revoke or rotate it in Web3Forms regardless.

# Pre-S1 cleanup — 2026-10-11
Owner decisions: slices commit straight to `main` (Vercel Production) instead of a staged feature branch; merged branches `feat/mercurius-a1` and `handoff/mercurius-a1` deleted locally and on origin; Playwright approved for S1 visual checks.
Hosting verified: Vercel GitHub integration. PR #1 merge (caca99c) deployed to Production successfully; live `/` returns 200 with the existing portfolio title.
Added `@playwright/test` 1.63.0 (exact pin, dev only; 1.64.0 skipped as under two weeks old). Uses the cached Chromium v1243; no browser download needed. Playwright output folders added to `.gitignore`.
PASS: headless Chromium 153 launch smoke test. PASS: `npm audit` 0 vulnerabilities. PASS: `npm run build`. PASS: `npm run lint`.
Open: Web3Forms key is still in source and the live bundle; owner to revoke or rotate it, with removal from source in S5.
