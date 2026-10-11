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

# S1 A1 foundations — 2026-10-11
Scope: tokens, shell (skip link, sticky header, primary nav, footer), hero, responsive hero asset. Legacy About/Work/Services/WhyWorkWithMe/Contact sections are unchanged and stay until S2–S5 replace them. Rollback: 60aaee1.

Tokens: `mds/tokens.json` colors, type families, 1280 content width, motion values and the 650/900 breakpoints are ported to `app/globals.css` (`@theme`; breakpoints as mobile-first `tablet:` ≥651px and `desktop:` ≥901px). Prototype-observed supporting values tokenized by name only: marble #eee6d7 (hero ground), bronze-deep #73532e (focus ring), muted #666666 (notes). Header bar width 1380px is the prototype value, kept as a local value. No numeric token retuned.
Fonts: approved A1 uses Georgia / system-ui; Inter and Playfair `next/font` loads were removed from app/layout.tsx (visual reconciliation with the approved prototype, per IMPLEMENTATION-PLAN). Legacy sections now render in system-ui/Georgia.
Shell: layout renders skip link, Header, `main#main` and Footer, so S3 routes inherit it. Nav links target `/#work`, `/#services`, `/#about`, `/#contact`. Metadata now Mercurius Solutions (title template `%s · Mercurius Solutions`); no metadataBase/OG image until the domain decision.
Hero: server component, single `next/image` (static import, blur placeholder, eager + high fetch priority, preload link emitted). Desktop/tablet: copy left over the prototype gradient, sculpture full-bleed right. ≤650px: artwork 300px block below copy at 77% focal point. `--hero-depth` hook reserved for S4; transform removed under reduced motion.
Responsive asset: original 1536×1024 PNG (2.2 MB, checksum identical to handoff) kept in app/_assets; served as WebP 27 KB (640w), 64 KB (1080w), 109 KB (1920w+).

PASS: `npm run lint`. PASS: `tsc --noEmit`. PASS: `npm run build` (`/`, `/_not-found` static).
PASS: `npm run test:e2e` — 15/15 Playwright (Chromium 153, headless) against `next start`:
- hero at 360/390/768/1280/1440: heading and image render and load, MDS-02 placement (mobile art below CTAs; ≥651 copy within left 68%, art full-bleed), no horizontal overflow, no page errors
- no-JS: heading, artwork and primary nav server-rendered
- metadata title and description
- skip link visible on focus and moves focus to main
- bronze 3px focus ring on links
- desktop nav visible / Menu hidden, in-page navigation; mobile menu aria-expanded, Escape closes and returns focus, link closes menu, widening closes menu
- hero transform present by default and `none` under reduced motion
- image failure (optimizer aborted): copy and CTAs remain readable on marble ground
Manual visual comparison of screenshots vs `mds/references/homepage.png`, `mobile-case-board.png` and the prototype: composition, hierarchy and palette match the A1 direction. Two fixes made during review: A1 component classes moved into `@layer components` (unlayered `.a1-btn` overrode `tablet:hidden`, showing Menu on desktop); mobile CTAs use `flex-auto` + no-wrap so “Explore the work ↗” no longer breaks over two lines at 360/390 (prototype `flex:1` wrapped there too).

Owner decisions on S1 observations (2026-10-11):
- Copy changes confirmed: prototype labels (“Case Study A1”, “Portfolio design prototype”) stay removed.
- Hero crop: owner directed fix. The statue must stay in frame. See follow-up below.
- Services/Approach/About A1 sections and the “Approach” nav item: deferred to a later slice (owner will assign). Not in S1/S2 scope.
- Footer contacts (email, LinkedIn): deferred to a later pass.
- Web3Forms: removal of the integration and key stays in S5; owner accepts the interim exposure (site has no audience yet).
- Georgia is not present on Linux/Android; the serif falls back to the platform serif there. Tokens specify `Georgia, serif`. Open observation.

## S1 follow-up: hero statue framing — 2026-10-11
Cause: the image was cover-cropped around its vertical center, so at wide aspect ratios (e.g. 1440×720, 2:1) the top was cut and the statue's head lost. The statue spans ~7%–83% of the artwork height and ~64%–82% of its width.
Fix: artwork anchored to the top (`center top` from 651px; `77% top` on mobile, which also protects 600–650px). Desktop hero height grows with width, `max(720px, min(50vw, 100svh − 6rem))`, so wide screens keep head-to-shins framing instead of head-to-waist, capped at the viewport below the header. 720px minimum (prototype value) unchanged. Tablet 600px minimum unchanged.
PASS: `npm run build`, `npm run lint`. PASS: 23/23 Playwright, adding 8 framing checks (360×800, 600×900, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080, 2560×1440) that compute the visible region of the artwork from object-fit geometry: top ≤5% (head intact), bottom ≥60%, statue's horizontal span fully visible. Screenshots reviewed at 600, 1440 and 1920: full head and caduceus with headroom, framing comparable to `mds/references/homepage.png`.
S4 note: `--hero-depth` translates the art down by up to 32px while `scale(1.04)` leaves only ~2% (≈14–20px) of overscan at the top. With top anchoring, S4 must enlarge the overscan or shift the image origin so depth motion never reveals a gap above the art.

NOT RUN: real-device/Safari/Firefox checks, screen reader, 200% zoom, contrast tooling (manual estimates: bronze on paper ≈5:1, white on bronze ≈5.5:1, #666 on paper ≈5.2:1), preview deployment inspection.
Limitations: mobile menu is a basic disclosure; S4 owns focus containment, motion and final behavior. Without JavaScript the mobile menu cannot open (hero CTAs still link to Work and Services). Legacy sections still use the old palette, and the old Contact still ships the Web3Forms key (S5).
