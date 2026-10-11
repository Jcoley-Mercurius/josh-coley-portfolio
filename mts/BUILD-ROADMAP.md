# Mercurius Solutions build roadmap v1.0
Consumes MPS/MDS/MTS v1.0. Existing repository. S0 complete 2026-10-10 and merged to main (PR #1, caca99c); current slice S1 ready. A1 polish complete; production build not started. Foundations may begin; release blocked by evidence, contact setup, abuse-control selection and combined browser QA.

| Slice | Outcome | Status | Completion requirement |
| --- | --- | --- | --- |
| S0 | Reconcile repository | complete | Verify package, instructions, handoff assets, current branch and baseline; record build/lint results. No UI edits. |
| S1 | A1 foundations | ready | Port tokens, shell, hero and responsive asset delivery; verify desktop/mobile references. |
| S2 | Selected work journey | not_started | Implement server-rendered project cards and accessible client filters with counts and empty state. |
| S3 | Case-study journey | not_started | Implement real project routes, chapters, next/back, not-found, per-project metadata and no-JS readable content. |
| S4 | Motion and navigation | not_started | Implement bounded desktop hero depth, entrance and card motion with cleanup, reduced preference, manual control and accessible menu. |
| S5 | Inquiry journey | blocked | Implement server Resend validation, idempotency and selected shared abuse controls; cover every success/error state. |
| S6 | Project evidence | blocked | Replace placeholders with permitted actual screenshots and verified case narratives; prepare Upwork/Fiverr exports without invented claims. |
| S7 | Release verification | blocked | Run combined acceptance, responsive/accessibility/performance QA, preview inquiry test and approved deployment with rollback record. |

Branching (owner decision 2026-10-11): slices are committed to `main`, which Vercel deploys to Production on every push; there is no long-lived feature branch. Josh accepted that in-progress slices are publicly reachable; this does not relax the no-invented-claims rules, so anything on `main` must stay truthful. Each slice depends on its predecessor. S5 external setup can proceed beside S1–S4; S6 evidence preparation can proceed beside engineering. Required external skills: none; recommended Mercurius skills use file-and-official-doc fallback, verify target availability in S0. Agent owns implementation and evidence; Josh owns final project permissions, sending identity, recipient, hosting/domain choices and release decision. Preview checkpoints after each coherent journey; use prior verified commit for recovery. Never carry failed baseline checks silently.

Companion: mts/MERCURIUS-IMPLEMENTATION-PLAYBOOK.md. Maintain per-slice actual results there and in mts/QA-STATUS.md.

Working copy: this file is the maintained roadmap; `handoff/Mercurius-Solutions-A1-Handoff/BUILD-ROADMAP.md` stays the unmodified checksummed original.
