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

# S1 merge and workflow change — 2026-10-11
S1 merged via PR #2 (merge d0617dc). Vercel Preview passed before merge. Production `/` returns 200 with title “Mercurius Solutions · Web and product development”. Owner decision: slices now land through one branch and pull request each, not direct commits to `main`.

# S2 selected work journey — 2026-10-11
Branch `feat/s2-selected-work` from `chore/pr-workflow` 9905b17 (PR #3, docs only, still open). Rollback: 9905b17.

Scope: server-rendered project cards, accessible client filters with a live result count, and an empty state you can recover from. Legacy `FeaturedWork` removed, along with CSS used only by it. It published unverified claims (“Live”, “Ready to deploy”, Smart Quote Tool, Vendor Application Portal) and a “Visit Site” link. Selected work now follows the hero, as in the A1 layout. About, Services, WhyWorkWithMe and Contact are unchanged.

Records: `content/projects/*.json` gain `type` and `summary`, copied verbatim from the approved A1 prototype's project data. Status, permission, role and evidence fields are unchanged, and the records stay canonical where the prototype differs (Vertex shows “User-reported capability”, Supabase SaaS “Working title”, Shave Parlor “In rebuild”). Display order follows the prototype.
Adapter: `app/_lib/projects.ts` validates every record at build time: required text fields, lowercase slug id, approved category, boolean `publicationReady`, string arrays, unique ids. It also fails the build if a record has metrics while `publicationReady` is false, or screenshots without `"permission": "granted"`. (“granted” is the value this adapter expects once permission is cleared; S6 should confirm the term.)
Rendering: `SelectedWork` and `ProjectCard` are server components. `WorkFilter` is the only client boundary. It receives the cards already rendered and decides which to show. Filters are `aria-pressed` toggle buttons in a labelled group. The count (“N projects shown”, singular for one) is a `role=status` live region. The empty state says “No {category} projects to show yet.” and offers “Show all projects”, which resets to All and moves focus to the All button. Without JavaScript, all cards and the count render, and the filter row stays hidden with its space reserved, so it never shows controls that cannot work and hydration does not shift the layout. `/` stays static.
Visual values come from the prototype: grid 3/2/1 columns at ≥901/651–900/≤650, card border and #ffffff42 fill, 25px Georgia titles, bronze category and type line and status label, screenshot placeholder frame (200px, 230px on mobile), filter chips (30px radius, ink fill when pressed). The chip and placeholder styles live in `@layer components` as classes. The chip is not built from `bg-` utilities, because a legacy rule (`button[class*="bg-"]:hover`) would otherwise add the old blue lift.
Tooling: `npm run test:unit` uses Node's built-in `node:test` with native type stripping (Node 24). No dependency added. `tsconfig.json` gains `allowImportingTsExtensions` (valid with `noEmit`) so the test can import `./projects.ts`.

PASS: `npm run test:unit` 8/8 (all supplied records valid and truthfully labelled; required-field, category, slug, claims-before-evidence and duplicate rejection; filtering including an empty result; count label).
PASS: `npm run lint`, `tsc --noEmit`, `npm run build` (`/` and `/_not-found` static), `npm audit` 0.
PASS: `npm run test:e2e` 34/34 (23 S1 plus 11 S2):
- no-JS: heading, all five cards in order with category, status and screenshot-pending placeholder; count shown; filter controls not offered
- every filter: matching cards, count text, `aria-pressed` on exactly one button, back to All
- keyboard: Tab reaches the filters, Enter and Space activate them, focus stays on the control, bronze 3px focus ring
- pressed chip uses the ink fill, white text and 30px radius
- 360/390 one column, 768 two, 1280/1440 three; no horizontal overflow; no page errors
- the hero's “Explore the work” brings Selected work into view
- legacy claims and “Visit Site” are gone from `/`
PASS (manual, not committed): empty state. With Shave Parlor temporarily recategorized on a dev server, Booking showed “0 projects shown” and the empty message. “Show all projects” restored 5 projects with All pressed and focused. The data change was reverted.
Manual visual comparison of the 360/768/1440 screenshots with the prototype structure and `mds/references/homepage.png`: heading with the eyebrow on the right (stacked on mobile), chips, count, and a bordered card grid on paper. The homepage board's titles with arrows and wireframe previews are illustrative. The prototype card (category·type line, “Project screenshot pending”, status, summary) was followed.

Deliberately not in S2:
- “Explore case study” card link. `/work/[slug]` does not exist until S3, and merged slices are live, so a link now would 404 in Production. S3 adds it. The card keeps the prototype's 68px summary min-height, which leaves room for it.
- Card hover/focus lift and entrance motion: S4.
- Per-filter counts inside the chips. The prototype shows a single result count, which is implemented. Adding per-chip counts would change the approved chip design, so that needs an owner decision.
Observation: `next dev` rewrites the Next.js block at the top of AGENTS.md (newer wording, plus a note that it re-adds itself). That rewrite was reverted and is not part of S2. Resolved 2026-10-11: owner accepted the generated block; committed at the start of S4.

NOT RUN: real-device/Safari/Firefox, screen reader announcement of the live count, 200% zoom, contrast tooling (manual: bronze #82613b on the card fill ≈5:1; #746a5d placeholder text on #f7f3eb ≈5:1), Vercel Preview inspection (pending PR build).

# S3 case-study journey — 2026-10-11
Branch `feat/s3-case-studies` from main 2d29b7b (S2 merged via PR #4). Rollback: 2d29b7b.

Scope: real `/work/[slug]` routes for every supplied record, chapters, back and next navigation, not-found, per-project metadata and content you can read without JavaScript. The card's "Explore case study ↗" link (held back in S2 so Production never linked to a 404) now ships.

Records: `content/projects/*.json` gain `challenge`, `decisions` and `detail`, copied verbatim from the approved A1 prototype's project data. Records stay canonical for status and the other fields. The adapter rejects a missing `challenge` or `detail`, and an empty or blank `decisions` list. New helpers: `findProject` (exact slug only) and `nextProject` (display order, wraps).
Route: `app/work/[slug]/page.tsx` is a server component. `generateStaticParams` prerenders all five, and `generateMetadata` sets the title (“{name} · Mercurius Solutions”), the description (record summary) and Open Graph. There is no canonical URL or OG image until the domain decision. Page structure follows the prototype case study: “← Back to work” (`/#work`), “Case study · {category}” eyebrow, h1, summary, facts (Project type, Status, Evidence: “Review pending” while `publicationReady` is false), chapter nav (Challenge, Contribution, Decisions, Evidence as `#` fragment links), the “Verified project screenshot pending” frame (390px, 250px on mobile), challenge and contribution panels, numbered decisions (3 columns ≥901px), working evidence panels and “Next project · {name} ↗”. The contribution text stays the prototype's “Scope, role, and delivery evidence to verify before publication.” while `role` is “verify”. The prototype's “Case Study A1” eyebrow label is not used, per the S1 owner decision.
Not-found: `dynamicParams = false`, so an unknown slug never reaches the page. It gets the root `app/not-found.tsx` (new, A1 styled): status 404, `noindex`, title “Page not found”, “This page or case-study link is unavailable.” and “Return to selected work”. This replaced Next's default unstyled 404 site-wide.
Finding (Next 16.4.0): a `notFound()` thrown from a page, including a two-line probe page, returns `<html id="__next_error__">` with an empty body. The not-found UI then renders only after JavaScript runs, and a segment-level `not-found.tsx` is not used. A URL that matches no route is answered with full server HTML. So unknown slugs are routed there, and the prototype's project-specific “Project not found” copy became the shared wording above. The guard `if (!project) notFound()` remains in the page for type narrowing only. Revisit after a Next upgrade.
Focus and scroll: `RouteFocus` (a small client component in the layout) moves focus to the new page's `h1[tabindex=-1]` after a client-side route change with no hash, matching the prototype's title focus. Initial loads and hash targets are left alone. `<html data-scroll-behavior="smooth">` (Next 16 opt-in) lets Next switch off the global CSS smooth scrolling during route changes. In-page anchors still scroll smoothly.

PASS: `npm run test:unit` 11/11 (adds required case-study fields, decisions validation, exact-slug lookup, next-project order and wrap).
PASS: `npm run lint`, `tsc --noEmit`, `npm run build` (`/`, `/_not-found` static; five `/work/*` SSG), `npm audit` 0.
PASS: `e2e/s3-case-studies.spec.ts` 18/18, and 54/54 over three repeats:
- no-JS: all five case studies return 200 with title, description, h1, eyebrow, facts, four chapters, challenge, contribution, detail, decisions, evidence, back link and the correct next link
- every card links to its case study; clicking moves focus to the title
- “Next project” with the keyboard visits all five in order and wraps; title, h1 and focus update; page lands at the top
- back to work lands on Selected work; browser back and forward restore both pages
- direct chapter links (`/work/vertex#…`) land below the sticky header, with and without JavaScript; chapter links work with the keyboard and show the 3px focus ring
- `/work/not-a-project`, `/work/Vertex`, `/work`, `/work/vertex/extra`: 404, noindex, readable without JavaScript, recovery link to `/#work`
- 360/390/768/1280/1440 on the longest title: no horizontal overflow, facts beside the title above 650px and below it on mobile, decisions 3 columns above 900px and stacked below, no page errors
- no “Case Study A1”, percentages or images in any case study
Full suite: 51/52 at two workers. One failure, the S1 hero framing test at 2560×1440 (image-load or screenshot timeout), is pre-existing. On untouched main (2d29b7b, fresh `npm ci` and build in a temporary worktree) it failed 3/3. On this branch it passes in some runs and fails in others. With 16 default workers, the S1 menu-widening test also failed once, then passed 69/69 in an S1-only run (3 repeats, 2 workers). Both are load-dependent and do not involve S3 code. Recommend raising that test's image-load timeout or limiting workers (owner decision; S1 test not changed here).
Manual visual comparison of 1440/768/360 screenshots against the prototype case study and `mds/references/desktop-case.png` / `mobile-case-board.png`: back link, eyebrow, serif title, facts column with left rule, chapter bar, large placeholder, two panels, numbered decisions, evidence panels and bronze next button match the A1 structure and palette. The boards' sculpture backdrop, icons and wireframe placeholders are illustrative. The prototype's plain treatment was followed, as in S2. One fix from review: the ↗ in “Next project” wrapped alone at 360px, so a non-breaking space now keeps it with the name.

Deliberately not in S3: a “Previous project” link (the prototype has Back and Next only); card hover lift and entrance motion (S4); sitemap and canonical URLs (need the domain decision).
NOT RUN: real-device/Safari/Firefox, screen reader (title focus and route announcement), 200% zoom, contrast tooling, Vercel Preview inspection (pending PR build).

# S3 merge and AGENTS.md — 2026-10-11
S3 merged via PR #5 (merge 9678f7f) after a one-line playbook fix (e081705, S4 heading set to ready). Vercel Preview checks passed before merge. Production: `/` and all five `/work/*` case studies return 200 with their titles; `/work/not-a-project` returns 404 “Page not found”. Checked by server HTML only, not visually in a browser.
Owner decision: accept the Next.js block that `next dev` writes at the top of AGENTS.md (Next 16.4.0 wording, plus a note that `next dev` re-adds it). Committed at the start of S4. The Mercurius contract below it and CLAUDE.md's `@AGENTS.md` import are unchanged.
Owner decision: the S1 2560×1440 hero framing flake is fixed by a longer image-load timeout on that test, not by capping workers (applied in S4).
