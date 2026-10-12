# Claude implementation playbook v1.0
Run one slice prompt at a time; checkpoint and report before continuing to the next. All slices below inherit the same contract: read root AGENTS.md and current MPS/MDS/MTS state, reference index, implementation plan and skill manifest; inspect current source before editing. Required external skills: none. Recommended Mercurius skills: verify target availability, invoke for their concern or document file/official-doc fallback. No new dependencies, providers, scope or claims without a supported decision. Tests and manual checks must report pass/fail/not-run; update roadmap and QA status. Stop for missing governing assets or unresolved blocking decisions. Do not deploy production during slices S0–S6.

## Command lane
In a terminal appropriate to the workstation, run these individually from the repository root. VS Code and Claude installation are owner prerequisites; target OS and runtime manager are not assumed.
```sh
git status --short
git rev-parse HEAD
node --version
npm --version
git switch -c feat/mercurius-a1
npm ci
npm run build
npm run lint
npm run dev
```
Before install, inspect package.json engines and current scripts; choose a compatible runtime, preserving lockfile. Never overwrite dirty changes. If repository is not yet local, clone the supplied GitHub URL first. Copy handoff directories non-destructively and merge root instructions before prompts. Verify SHA256SUMS from the extracted package with an available checksum utility. For each slice: inspect diff, run relevant checks, explicitly stage intended files, commit and push the dedicated branch when authorized; inspect provider preview. Hosting project and deployment CLI are not yet known: verify linkage before writing exact deployment commands. Secret values belong only in private local/hosting environment settings, never prompt text or committed files.

## S0: Reconcile repository (complete)
> Execute only S0. Read the inherited contract and canonical files above, then inspect current repository. Verify package, instructions, handoff assets, current branch and baseline; record build/lint results. No UI edits. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: baseline build/lint and every asset accounted for. Next: S1. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-10): PASS checksums, npm ci, build, lint; AGENTS.md merged; canonical dirs placed. Audit findings recorded for owner decision. Rollback: b41318d. Details in mts/QA-STATUS.md.

## S1: A1 foundations (complete)
> Execute only S1. Read the inherited contract and canonical files above, then inspect current repository. Port tokens, shell, hero and responsive asset delivery; verify desktop/mobile references. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S2. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-11): PASS lint, typecheck, build, 15 Playwright checks at 360/390/768/1280/1440 plus no-JS, skip link, focus, menu, reduced motion and image failure. Rollback: 60aaee1. Details in mts/QA-STATUS.md.

## S2: Selected work journey (complete)
> Execute only S2. Read the inherited contract and canonical files above, then inspect current repository. Implement server-rendered project cards and accessible client filters with counts and empty state. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S3. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-11): PASS 8 node:test record-adapter checks, lint, typecheck, static build, 34 Playwright (11 new: no-JS cards, every filter with counts and aria-pressed, keyboard, 1/2/3-column layout at reference widths, hero CTA, legacy claims removed); empty state verified manually. Rollback: 9905b17. Details in mts/QA-STATUS.md.

## S3: Case-study journey (complete)
> Execute only S3. Read the inherited contract and canonical files above, then inspect current repository. Implement real project routes, chapters, next/back, not-found, per-project metadata and no-JS readable content. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S4. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-11): PASS 11 node:test record-adapter checks, lint, typecheck, build (five case studies prerendered), audit 0, 18 new Playwright checks (no-JS case studies with metadata, card links, next-project order and wrap with title focus, back/forward history, direct chapter links with and without JavaScript, keyboard chapters, four unknown-URL 404s without JavaScript, layout at reference widths, no unverified claims). Full suite 51/52: the S1 2560×1440 hero framing test is a pre-existing load-dependent flake (fails 3/3 on main). Rollback: 2d29b7b. Details in mts/QA-STATUS.md.

## S4: Motion and navigation (complete)
> Execute only S4. Read the inherited contract and canonical files above, then inspect current repository. Implement bounded desktop hero depth, entrance and card motion with cleanup, reduced preference, manual control and accessible menu. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S5. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-11): PASS 11 node:test checks, lint, typecheck, build, audit 0, 18 new Playwright checks (desktop depth follows scroll capped at 32px with no gap above the art, still at 768/390, starts on widening, detaches and resumes across routes; 650ms hero entrance; card lift on hover and keyboard focus; motion switch off/on, keyboard, persistence across client navigation and reload before first paint, system preference lock; legacy sections visible without JavaScript and when motion is off; menu closes on outside click, focus leaving, in-page back and route change; plain links without JavaScript). Full suite 70/70 at default workers. S1 framing test updated for the depth layer, with the owner-chosen longer timeout. Rollback: 478a695. Details in mts/QA-STATUS.md.

## S5: Contact removal (complete)
> Owner decision 2026-10-11: the Resend inquiry waits for the sending domain to be verified and moves to S5b. Execute only S5: remove the legacy Web3Forms contact form, its hard-coded key, any dependency used only by it and every link to it, without adding a replacement contact path or address. Validate with focused automated checks. Report actual pass/fail/not-run, changed files, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: no contact form, Web3Forms reference or contact link remains in source, server HTML or client bundle. Next: S5b when its setup is ready, otherwise S6. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

Actual (2026-10-11): PASS 11 node:test checks, lint, typecheck, build, audit 0, no Web3Forms string or key string in `.next/static` or `.next/server`, 2 new Playwright checks (no contact section, form, contact or mailto links, or Web3Forms request on the home page; no Web3Forms reference in server HTML). Full suite 72/72 at two workers; at default workers two runs each had different timing failures (71–70/72) that pass on rerun. Rollback: a98cd15. Details in mts/QA-STATUS.md.

## S5b: Inquiry journey (complete; Preview delivery verified)
> Execute only S5b. Read the inherited contract and canonical files above, then inspect current repository. Implement server Resend validation, idempotency and selected shared abuse controls; cover every success/error state. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S6 (or S7 if S6 is already complete).

Actual (2026-10-11): owner chose no custom domain (Resend test sender to the owner's Resend account address) and the Vercel Firewall rate limit. PASS 29 node:test checks (12 new handler/validation), lint, typecheck, build, Playwright 85/85 at two workers (16 S5b checks replace the 2 S5 removal checks). Firewall rule published; CONTACT_FROM_EMAIL/CONTACT_TO_EMAIL set. Preview (2026-10-12, after the owner added RESEND_API_KEY): PASS synthetic inquiry delivered to the inbox, same-key replay deduplicated, 429 on the 6th request. Rollback: 8dc257c. Details in mts/QA-STATUS.md. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S6: Project evidence (complete; Upwork/Fiverr exports deferred by owner)
> Execute only S6. Read the inherited contract and canonical files above, then inspect current repository. Replace placeholders with permitted actual screenshots and verified case narratives; prepare Upwork/Fiverr exports without invented claims. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S7. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S7: Release verification (blocked)
> Execute only S7. Read the inherited contract and canonical files above, then inspect current repository. Run combined acceptance, responsive/accessibility/performance QA, preview inquiry test and approved deployment with rollback record. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: owner release review. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## External setup and final release
Before S5b enablement: verify the Resend sending domain; privately configure Resend credentials, verified sending identity and chosen fixed recipient; select and verify shared abuse protection. Use synthetic test inquiries. Confirm accepted request, provider delivery separately, and absence of secrets in client bundles/logs. Before S6: confirm project title/scope/role/status and permissions; Shave Parlor rebuild cannot be called final. Before S7 production: resolve hosting/domain linkage, obtain release instruction, record current deployment/commit and rollback method. Run keyboard, focus, mobile widths, zoom, contrast, reduced motion, direct links, back/forward, no-JS, image failure, contact errors and delivery tests. Browser QA must run in target environment; none has been claimed here. Review PR and preview, then deploy only the reviewed commit. Verify live routes and one synthetic inquiry, retain rollback pointer. If verification fails, stop release and document recovery.
