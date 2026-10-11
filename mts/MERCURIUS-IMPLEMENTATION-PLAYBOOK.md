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

## S2: Selected work journey (ready)
> Execute only S2. Read the inherited contract and canonical files above, then inspect current repository. Implement server-rendered project cards and accessible client filters with counts and empty state. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S3. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S3: Case-study journey (not_started)
> Execute only S3. Read the inherited contract and canonical files above, then inspect current repository. Implement real project routes, chapters, next/back, not-found, per-project metadata and no-JS readable content. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S4. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S4: Motion and navigation (not_started)
> Execute only S4. Read the inherited contract and canonical files above, then inspect current repository. Implement bounded desktop hero depth, entrance and card motion with cleanup, reduced preference, manual control and accessible menu. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S5. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S5: Inquiry journey (blocked)
> Execute only S5. Read the inherited contract and canonical files above, then inspect current repository. Implement server Resend validation, idempotency and selected shared abuse controls; cover every success/error state. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S6. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S6: Project evidence (blocked)
> Execute only S6. Read the inherited contract and canonical files above, then inspect current repository. Replace placeholders with permitted actual screenshots and verified case narratives; prepare Upwork/Fiverr exports without invented claims. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: S7. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## S7: Release verification (blocked)
> Execute only S7. Read the inherited contract and canonical files above, then inspect current repository. Run combined acceptance, responsive/accessibility/performance QA, preview inquiry test and approved deployment with rollback record. Trace changes through mts/IMPLEMENTATION-PLAN.md. In scope: this slice's user journey and applicable failure, recovery, responsive and accessibility states. Out of scope: later slices and unapproved integrations. No migrations or authentication are planned; document if inspection changes that assumption. Validate the end-to-end journey with focused automated checks and manual preview evidence where available. Report actual pass/fail/not-run, changed files, unresolved setup, rollback commit and next slice. Update canonical status and stop at the checkpoint.

Checkpoint: slice outcome demonstrated, applicable failures verified and limitations recorded. Next: owner release review. Recovery: revert only this slice through reviewed git history, preserving unrelated work.

## External setup and final release
Before S5 enablement: privately configure Resend credentials, verified sending identity and chosen fixed recipient; select and verify shared abuse protection. Use synthetic test inquiries. Confirm accepted request, provider delivery separately, and absence of secrets in client bundles/logs. Before S6: confirm project title/scope/role/status and permissions; Shave Parlor rebuild cannot be called final. Before S7 production: resolve hosting/domain linkage, obtain release instruction, record current deployment/commit and rollback method. Run keyboard, focus, mobile widths, zoom, contrast, reduced motion, direct links, back/forward, no-JS, image failure, contact errors and delivery tests. Browser QA must run in target environment; none has been claimed here. Review PR and preview, then deploy only the reviewed commit. Verify live routes and one synthetic inquiry, retain rollback pointer. If verification fails, stop release and document recovery.
