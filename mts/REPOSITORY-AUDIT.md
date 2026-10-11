# Mercurius Solutions — A1 technology discovery, motion and evidence plan

Date: October 10, 2026 (America/New_York)
Status: Draft v0.1. Discovery and prototype inspection complete within stated scope; capability mapping and initial motion research recorded. Production repository is now identified; reuse of its foundation is the planning direction. Exact motion parameters and new package choices remain proposed. Not an implementation-ready handoff.

## Authority and current position

- Approved by Josh: replacement Mercurius Solutions freelance portfolio; business websites, landing pages, booking experiences, SaaS/portals and marketplace development; A1 luminous marble/bronze, Greek architecture and mythology; mobile homepage/case-study composition; desktop case-study composition; final preference for A1 over B2.
- Shave Parlor is explicitly in rebuild. Current corrections are unfinished approved work, not grounds to describe it as final delivery.
- Routine steps may continue automatically. This does not turn proposed dependencies, services or public exposure into approved decisions.
- MPS/MDS authority presently consists of conversation decisions and Tail Eater records. No formally activated/versioned MPS or MDS package exists for this portfolio. Do not label either v1.0.
- A1: https://mercurius-a1-prototype.jcoley516283.chatgpt.site
- B2 retained comparison: https://mercurius-b2-prototype.jcoley516283.chatgpt.site
- MTS current gate: Capability Mapping, with initial Research performed for motion. Repository reconciliation completed below; remaining recommendations are conditional on complete experience states and service configuration.

## Inspection and disposition

Inspected `/workspace/sites/mercurius-a1/dist/index.html` and `.openai/hosting.json`. Existing source is a private Sites-backed static prototype. It contains embedded CSS/JS, a generated Hermes PNG, category filters, hash-based case-study routes, mobile menu, motion toggle and reduced-motion rules. No React, Next.js, Motion, GSAP, database, auth or analytics dependency is present in application code. Private hosting access is provided by Sites rather than custom application authentication.

| Existing item | Disposition | Reason / next work |
|---|---|---|
| Approved A1 visual composition | KEEP | Preserve image/text hierarchy and responsive order |
| Static rendering approach | EXTEND, provisional | Adequate for public content; generate real pages and structured project content |
| Inline monolithic HTML/CSS/JS | EXTEND | Separate content, styling and behavior for maintainability; no rewrite solely for framework preference |
| Hash case-study navigation | REPLACE for production, proposed | Use `/work/<slug>/` pages, direct-load metadata, sensible back navigation and missing-page behavior |
| JS-generated project content | EXTEND | Pre-render project cards and case studies so essential evidence is available without JS |
| Generated hero artwork | KEEP / optimize | Produce responsive sizes and modern image formats; verify mobile crop and rights/provenance |
| Native motion | EXTEND | Centralize preferences, route cleanup and bounded effects |
| Sample brief panel | KEEP for prototype | Production inquiry destination is undecided; do not pretend it submits |
| Private audience | KEEP | Public release is a separate decision |

Evidence: successful private deployments and syntax checks were observed. Browser interaction, responsive fidelity, accessibility and performance were not tested. Source inspection is not a runtime pass.

## Capability map

| ID | Need | Status | Technical direction |
|---|---|---|---|
| CAP-01 | Responsive portfolio and individual case studies | Required | Pre-render HTML and reusable layout/content patterns |
| CAP-02 | Project filtering and navigation | Required | Progressive native JS enhancement; ordinary links remain usable |
| CAP-03 | Distinctive motion with accessible alternatives | Required | Native microinteractions; assess one orchestration library for signature sequence |
| CAP-04 | Project evidence and truthful status | Required | Versioned editorial records; permission and verification fields |
| CAP-05 | Discoverable public pages when released | Required at public launch | Per-page title, description, canonical, social image and indexing rules |
| CAP-06 | Image/media delivery | Required | Responsive images, dimensions, selective loading and video posters |
| CAP-07 | Inquiry next step | Product decision pending | Choose platform-directed inquiry or direct contact before adding forms/email |
| CAP-08 | Conversion measurement | Deferred proposal | Define inquiry events and privacy requirements before choosing analytics |
| CAP-09 | Deployment and recovery | Required | Preserve prototype, version source, validate release and rehearse rollback |
| CAP-10 | Browser/visual/accessibility verification | Required before release | Supported browser environment still needed |
| CAP-11 | Accounts, database, AI, payments | Not evidenced | No current runtime need; project examples do not require their underlying services here |

Production source is Jcoley-Mercurius/josh-coley-portfolio, inspected at 7a4ee96535bc8f9cf3a3bc4409d987a2025834a6. Sites remains the private experience reference. Reuse the existing Next.js repository in VS Code/Claude; production hosting linkage, domain and deployment settings are not yet verified. This replaces the earlier destination unknown.

## Motion behavior specification — proposed

These are design proposals, not inferred facts from still images. Timings are starting values for browser tuning.

| ID / area | Standard behavior | Mobile / reduced motion | Acceptance evidence |
|---|---|---|---|
| MOT-01 Hero entrance | Short opacity/translate sequence, approximately 450–650 ms; CTA usable immediately | Shorter mobile entrance; instant visible state for reduced motion | Content never waits on library/image load; no replay on routine back navigation |
| MOT-02 Sculptural depth | Bounded decorative displacement only while hero is visible; no continuous idle loop | Static on touch/narrow screens and when motion is off | No crop gaps, overlapping text or main-thread stalls |
| MOT-03 Cards | Small lift and border feedback, approximately 180–250 ms | Tap/focus feedback; static reduced-motion styling | Hover is not needed to discover title or action |
| MOT-04 Filter changes | Brief opacity/position transition; preserve button focus | Immediate filtering with announced count; no movement when off | Stable layout, accurate count and keyboard operability |
| MOT-05 Case-study navigation | Optional short outgoing/incoming transition; heading focus and scroll restoration managed separately | Immediate route change for reduced motion | Direct URL loads, browser Back/Forward and focus work reliably |
| MOT-06 Evidence chapters | One-time restrained reveals; native in-page navigation | No pinned sections on mobile; instant visibility for reduced motion | Evidence readable without animation; chapter links have shareable destinations |
| MOT-07 Menu | Brief reveal; close on Escape; return focus when appropriate | Same controls at narrow widths | Focus order and expanded state are correct |
| MOT-08 Preference controller | OS preference takes priority; explicit off switch applies to all effects | Cancel active timelines/scroll callbacks; reset transforms; disable smooth scrolling at root | Switching preference during animation works, including route changes |

Do not use scroll hijacking, cursor replacement, loading theatrics, autoplay audio or animated placeholder metrics. Prototype manual-off currently changes a body class; production must also ensure root scrolling behavior follows the preference. Manage animation teardown on navigation, media-query changes and unmounts. Never allow two engines to own the same element transform.

### Motion technology research

Reviewed official documentation October 10, 2026:

- Motion JavaScript animate: https://motion.dev/docs/animate — supports HTML/SVG animation and hybrid sequences. React is not a prerequisite for the JS API.
- Motion scroll: https://motion.dev/docs/scroll — candidate for scroll-linked effects.
- GSAP matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/ — responsive contexts collect animations and ScrollTriggers for reversion.
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ — candidate for detailed scroll sequencing.
- GSAP licensing: https://gsap.com/community/standard-license/ — license page consulted; verify exact chosen package/version and permitted use at dependency approval. Do not infer an MIT license.
- Google web.dev motion accessibility: https://web.dev/learn/accessibility/motion — reduced-motion handling and user control inform the acceptance plan.

Reconciled direction: native CSS for simple states and existing Framer Motion for React interactions, with a bounded GSAP study only if an approved signature sequence benefits from it. React and Framer Motion are already present in the production repository. Evaluate the installed library first; a package rename/migration is a separate change. Do not install both by default. Package versions, license record and measured payload/performance must be established before adoption. No paid animation subscription is justified by current requirements.

The signature sequence should demonstrate purposeful engineering: lifecycle cleanup, input parity, interruption handling, efficient rendering and accessible fallbacks. Library names alone are not portfolio proof.

## Project evidence preparation

Use one record per project with: real title, work kind, problem, contribution, authority/version, deployment URL and commit/date, lifecycle status, scope reviewed, screenshot provenance, display permission/reference, verification results, limitations, and measured outcomes where available. Keep reported, independently verified and measured evidence distinct.

| Project | Known basis | Evidence to collect | Publication stance |
|---|---|---|---|
| The Shave Parlor | Client website; rebuild; approved roster and Squire boundary | Final deployed screenshots, role/scope, actual booking handoff walkthrough, responsive tests, owner display permission | In rebuild until delivery verified; no booking improvement claim |
| Homeschool Haven | User-listed client project | Current URL/status, approved scope, contribution, representative flows, privacy-safe screenshots and display permission | Status and results unverified |
| Mercurius Marketplace | Founder-built home-services product | Bounded capabilities, current deployment/commit, role, public-safe workflow demos and actual release status | Founder work; no invented traction or completed transactions |
| Vertex | User-reported video keyword/timestamp learning platform | URL/repository, role, search-to-timestamp demo, empty/error states, authorized sample video/transcript | Reported functionality until tested |
| Supabase SaaS project | User-listed project; working title | Confirm exact title, URL/repository, problem and contribution; collect meaningful permission/data isolation checks if relevant to actual scope | No secure/production-ready claim without scoped evidence |

Screenshots must exclude private users, child data, credentials, banking information and internal administrative records. Prefer authorized demo data and clearly identify it. Client publication permission is unresolved, not assumed from project existence. No performance or conversion statistics should appear unless methods, dates and limitations accompany them.

Reuse the same verified narrative for website case studies and Upwork/Fiverr assets; check current platform specifications and policies before upload. No platform posting or outreach is authorized by this plan.

## Draft implementation sequence

1. **Reconcile authority and destination.** Record A1 selection; choose production repository/hosting; inventory real project evidence. Keep exploration private.
2. **Publishable content structure.** Define project schema and real case-study routes; pre-render essential content; add route-specific metadata and recovery states.
3. **MDS production foundations.** Formalize colors, typography, spacing, component states and motion decisions. Prototype hex values are observed implementation values, not approved tokens by default.
4. **Assets and evidence.** Optimize hero/media; complete one truthful case study end to end before repeating it across projects.
5. **Motion study.** Compare a bounded signature sequence with its native baseline; record device, payload, frame behavior, reduced-motion and cleanup observations. Select dependencies through the project decision process.
6. **Complete core experience.** Implement remaining case studies, service paths, inquiry destination, missing-page behavior and mobile states.
7. **Combined verification.** Test narrow/mobile/tablet/desktop layouts, keyboard use, 200% text enlargement, motion preference changes, direct links, Back/Forward, loading failures and no-JS content. Measure performance; distinguish lab observations from field metrics.
8. **Release and recover.** Verify permissions, claims, metadata and indexing intent; retain exact prior source/version; authorize public audience and destination; rehearse rollback. Private prototype publication is not public-launch approval.

This is a draft sequence, not the approved Mercurius Build Roadmap or Implementation Playbook. Exact commands and per-slice coding prompts follow actual repository inspection and approved stack selection.

## Open decisions and blockers

- Production repository is identified and inspected; deployment linkage, domain and preview settings remain unverified.
- Exact design tokens, full route/state coverage and proposed motion behavior need reconciliation into canonical MDS.
- Resend is explicitly selected by Josh; sender/recipient, spam controls, retention notice and preview configuration remain to verify. Analytics is deferred.
- Project URLs/roles/status, permissions and final evidence are incomplete.
- Browser QA environment is unavailable through the supported current preview workflow.
- No new animation package is approved or installed; no implementation-readiness claim is made.

Next useful action: complete the Sites polish/state checklist and assemble the repository-specific handoff, while gathering project evidence and Resend configuration facts. No new external service is needed to prepare evidence or preserve the current private prototype.


## Repository reconciliation — October 10, 2026

Repository: https://github.com/Jcoley-Mercurius/josh-coley-portfolio
Inspected default branch main at commit `7a4ee96535bc8f9cf3a3bc4409d987a2025834a6`. Read-only clone; no repository edits or pushes performed. No dependency installation, build or browser test was run.

| Item | Observed | Reconciliation |
|---|---|---|
| Framework | Next 16.2.9; React/React DOM 19.2.4; App Router | KEEP baseline; verify locally before implementation; do not auto-upgrade |
| Language/style | TypeScript; Tailwind 4 | KEEP tooling, replace old visual tokens with canonical A1 tokens |
| Package manager | package-lock.json; npm scripts dev/build/start/lint | KEEP npm; initial baseline uses npm ci, npm run build, npm run lint |
| Motion | framer-motion ^12.40.0; AnimateIn and Header use it | EXTEND; installed version comes from lockfile; validate server rendering/no-JS visibility and preference changes |
| Icons/toasts | lucide-react; sonner | Reuse where needed; evaluate unused code after A1 port |
| Fonts | Inter and Playfair Display through next/font | Candidate reuse; A1 typography must be finalized rather than inferred |
| Home | Existing section components assembled by app/page.tsx | Preserve component structure where suitable; adapt to approved A1 order |
| Content | Old service prices, Marketplace contact email, response promises | Review as legacy content; do not silently carry prices or promises into new product authority |
| Contact | Browser submits to Web3Forms | REPLACE with Resend, explicitly selected by user; remove legacy submission and key from active code |
| Agent instructions | AGENTS.md requires local Next docs; CLAUDE.md imports AGENTS.md | Preserve that rule; merge MPS/MDS/MTS project instructions into one AGENTS.md |

`AnimateIn` initially hides content and reveals it in view; no-JS/hydration failure visibility needs runtime verification. Header currently lacks aria-expanded/aria-controls on its menu button and does not visibly implement Escape/focus-return logic in inspected code. These are scoped inspection findings, not a complete accessibility audit.

## Resend integration plan

Provider selection: approved by explicit user instruction; account configuration and implementation unverified. Official guide: https://resend.com/docs/send-with-nextjs (checked October 10, 2026). Idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys (checked October 10, 2026).

Proposed flow: contact form → same-origin Next Route Handler → server validation and abuse controls → Resend → fixed operator inbox. The browser must never choose the recipient, sender or arbitrary email template, and must never receive RESEND_API_KEY.

Proposed path `app/api/contact/route.ts`; environment names RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL. These paths/variables are proposals, not existing repository facts. Use verified sender domain, configured operator recipient, validated reply-to and plain text or escaped templating. No auto-reply, newsletter subscription, database or attachment handling is added by default.

Validate lengths, email syntax, allowed service values, body size and unexpected fields on the server. Connect the honeypot to validation. Choose and verify multi-instance abuse/rate-limit controls before exposing the endpoint; an in-memory counter is not a distributed protection. Restrict origins appropriately without treating Origin as sole bot protection. Return safe errors and log minimal operational identifiers rather than full inquiry bodies. Preserve typed input on failure. Acknowledge provider acceptance rather than guaranteed inbox delivery. Do not promise a response within 24 hours unless Josh approves that commitment.

Reuse a request ID/idempotency key for retries of the same payload; a new inquiry uses a new ID. Resend's documented deduplication window is 24 hours, not permanent duplicate prevention. Verify sender/recipient, configured environments, missing-secret handling, invalid input, abuse rejection, timeout, provider error, duplicate retry and actual controlled inbox delivery. Preview must use a controlled test inbox; no real sends during visual prototype review.

Implementation permission does not prove configuration. Required owner setup: select verified sending identity and recipient, provision secrets in the actual deployment environment and authorize the bounded delivery test. Confirm contact-data notice/retention before public collection. API subscription usage/cost is not inspected; do not infer Marketplace credentials or billing can be reused automatically.

## Remaining Sites polish — before experience freeze

| ID | Required result | Checkpoint |
|---|---|---|
| POL-01 | A1 final-selection labels; B2 retained as archive | Remove obsolete comparison-pending wording from A1 |
| POL-02 | Complete route/state inventory | Home, case study, missing project, empty filter, image/video unavailable and inquiry states |
| POL-03 | Inquiry reference design | Idle, validation errors, sending, provider accepted, rate limited, unavailable, retry; prototype explicitly simulated |
| POL-04 | Global motion preference | Root scrolling follows off preference; reset decorative transforms; no hidden evidence |
| POL-05 | Mobile/keyboard navigation | Menu expanded state, Escape and focus return; desktop/narrow transitions checked |
| POL-06 | Content presentation | Rebuild/evidence badges intentional; no unsupported claims, prices or response promises |
| POL-07 | Asset composition | Desktop/mobile crops and image failure fallback; native aspect ratios and responsive sizes |
| POL-08 | Browser verification | Supported browser QA environment; keyboard, touch, text enlargement and reduced-motion evidence |

Polish requirements are prepared; these changes are not represented as already implemented. Sites reference freeze requires accurate remaining-gap labels, not fabricated project evidence. Incomplete case studies can remain clearly labeled during implementation, but public display requires owner-approved treatment.

## Claude/VS Code handoff requirements

The final package must contain the approved A1 reference, editable source, original hero artwork, responsive assets and provenance; canonical MPS/MDS/MTS state with stable requirement/motion/acceptance IDs; evidence records; the Build Roadmap; Implementation Playbook; merged AGENTS.md; and a file manifest with checksums. Package path names below are proposed until placed in the repository.

- `mps/`: purpose, scope, evidence/publication rules, inquiry intent and acceptance criteria.
- `mds/`: tokens, components, responsive composition, motion states and canonical references.
- `mts/`: blueprint, capability/integration matrices, security boundaries, agent manifest, QA, implementation plan and playbook.
- `references/a1/`: approved Sites source plus assets and reference images. Keep Sites hosting identity separate from production configuration; do not copy its .openai/hosting.json into the Next deployment root.
- `content/projects/`: proposed typed source records with status, contribution, permissions and evidence references.
- `AGENTS.md`: preserve local Next docs requirement; implement approved authority; do not invent claims/policies, migrate packages or expand services silently. `CLAUDE.md` continues pointing to it.

Proposed vertical slices: S0 baseline/reconciliation → S1 tokens/shell/assets → S2 homepage/filtering → S3 case-study routes/metadata → S4 motion and lifecycle QA → S5 Resend inquiry → S6 evidence and platform assets → S7 combined review/preview/deploy/rollback. Each slice has one bounded Claude prompt, verification commands and stop conditions in the final playbook. Require direct-load/Back/Forward tests, hydration/no-JS evidence visibility, keyboard/text enlargement, reduced-motion interruption tests and contact failure/abuse tests. Finish visual work without waiting for every client delivery; keep truthful status and defer final publication of unsupported evidence.

Known command lane after user-local clean worktree inspection: `npm ci`, `npm run build`, `npm run lint`, `npm run dev`. Read installed Next guides in node_modules/next/dist/docs before implementation as current AGENTS.md requires. Exact deployment commands and rollback instructions must follow verified hosting linkage, not presumed Vercel project identity. Use a rebuild branch; preserve main/live release until combined review passes.

Tail Eater owns reference curation and learning records; project authority remains in MPS/MDS/MTS. Record this Sites→handoff→Claude workflow as a candidate experiment, then capture fidelity gaps, clarification requests, rework and validation evidence before adopting it as a reusable standard.

### Ready versus pending

Ready: production repository inspection; stack disposition; Resend replacement direction; remaining polish checklist; handoff content and slice plan.
Pending: actual Sites polish; formal design/state reconciliation; browser QA; sender/recipient configuration; evidence/permission completion; final roadmap/playbook/AGENTS packaging and checksum validation. No production dependency or code changes have been made.
