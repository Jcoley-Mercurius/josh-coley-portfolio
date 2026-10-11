# Mercurius Solutions build roadmap v1.0
Consumes MPS/MDS/MTS v1.0. Existing repository. S0 complete 2026-10-10 and merged to main (PR #1, caca99c); S1 complete 2026-10-11 and merged to main (PR #2, d0617dc); S2 complete 2026-10-11 and merged to main (PR #4, 2d29b7b); S3 complete 2026-10-11 and merged to main (PR #5, 9678f7f); S4 complete 2026-10-11 and merged to main (PR #6, a98cd15); S5 revised by owner decision 2026-10-11 to remove the legacy contact form, complete on `feat/s5-remove-contact`, awaiting PR review; the Resend inquiry moves to S5b (blocked on domain verification, sender/recipient configuration and abuse-control selection); next slice S6. A1 polish complete; production build not started. Foundations may begin; release blocked by evidence, contact setup, abuse-control selection and combined browser QA.

| Slice | Outcome | Status | Completion requirement |
| --- | --- | --- | --- |
| S0 | Reconcile repository | complete | Verify package, instructions, handoff assets, current branch and baseline; record build/lint results. No UI edits. |
| S1 | A1 foundations | complete | Port tokens, shell, hero and responsive asset delivery; verify desktop/mobile references. |
| S2 | Selected work journey | complete | Implement server-rendered project cards and accessible client filters with counts and empty state. |
| S3 | Case-study journey | complete | Implement real project routes, chapters, next/back, not-found, per-project metadata and no-JS readable content. |
| S4 | Motion and navigation | complete | Implement bounded desktop hero depth, entrance and card motion with cleanup, reduced preference, manual control and accessible menu. |
| S5 | Contact removal | complete (PR review) | Owner decision 2026-10-11: remove the legacy Web3Forms form, its key, contact-only dependency and links to it; no replacement contact path until S5b. |
| S5b | Inquiry journey | blocked | Implement server Resend validation, idempotency and selected shared abuse controls; cover every success/error state. |
| S6 | Project evidence | blocked | Replace placeholders with permitted actual screenshots and verified case narratives; prepare Upwork/Fiverr exports without invented claims. |
| S7 | Release verification | blocked | Run combined acceptance, responsive/accessibility/performance QA, preview inquiry test and approved deployment with rollback record. |

Branching (owner decision 2026-10-11, revised after S1): each slice goes on its own branch (e.g. `feat/s2-selected-work`) and lands through a pull request into `main`. Vercel builds a Preview for every PR; merging deploys `main` to Production. Josh reviews and merges; agents do not push to `main` directly. Merged slices are publicly reachable, which does not relax the no-invented-claims rules, so anything merged must stay truthful. Each slice depends on its predecessor. S5 external setup can proceed beside S1–S4; S6 evidence preparation can proceed beside engineering. Required external skills: none; recommended Mercurius skills use file-and-official-doc fallback, verify target availability in S0. Agent owns implementation and evidence; Josh owns final project permissions, sending identity, recipient, hosting/domain choices and release decision. Preview checkpoints after each coherent journey; use prior verified commit for recovery. Never carry failed baseline checks silently.

Companion: mts/MERCURIUS-IMPLEMENTATION-PLAYBOOK.md. Maintain per-slice actual results there and in mts/QA-STATUS.md.

Working copy: this file is the maintained roadmap; `handoff/Mercurius-Solutions-A1-Handoff/BUILD-ROADMAP.md` stays the unmodified checksummed original.
