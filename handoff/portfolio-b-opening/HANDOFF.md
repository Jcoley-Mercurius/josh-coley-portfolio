# Mercurius Solutions — selected B opening

Decision: **MDS-PORTFOLIO-2026-10-14-B-OPENING** · October 14, 2026 · Josh Coley
Status: approved for focused implementation; not implemented or cleared for public release.

## Start here

Continue https://github.com/Jcoley-Mercurius/josh-coley-portfolio in its existing Next.js architecture. Current main was refreshed during packaging and remains `5433865c2032ac2fa12c4aae946e9ea293a602d5`. Read root AGENTS.md, MPS/MDS/MTS states, Agent Skill Manifest and current roadmap before editing. Current root states outrank the old handoff package. Reconcile newer commits and preserve unrelated work if main changes after packaging.

The private experiment is https://mercurius-portfolio-ui-experiment.jcoley516283.chatgpt.site/ (source `d55a1448621b4bc6453ab79d83d301d9f3c215be`). It is a frozen HTML comparison, not application source. Do not transplant its HTML, scripts, disabled form or hosting configuration into Next.js.

## What Josh selected

Owner: “for the header and the hero, I do like B. The spacing, the typography, everything is a little better.” Josh then explicitly requested recording the selection and preparing this focused Claude Code handoff.

Selection: B's opening typography, spacing, composition and service cue, within the approved A1 identity. B has no header-specific implementation delta: keep the current Header and SiteNav styling/behavior. The featured-project redesign and selected-work padding are unselected and excluded.

This is owner visual preference, not measured service comprehension, client-task performance, conversion or revenue evidence. Client participants: zero. The reusable Tail Eater lesson remains a candidate.

## Exact implementation scope

Edit `app/components/Hero.tsx` and narrowly scoped hero rules in `app/globals.css`. Reuse HeroDepth and next/image, the original Hermes asset, alt text, eager loading, blur placeholder and responsive image behavior. Preserve existing header/nav, CTA labels and destinations, service sentence and source-code evidence caption. Preserve motion and reduced-motion behavior.

Update current MDS state to record this accepted local refinement under MDS-06; proposed nonbreaking version 1.1. Preserve all MPS/MTS authorities and release blockers. The included patch demonstrates that state propagation against the inspected base. Update the current roadmap/QA record with actual results, rather than editing the historical packaged handoff.

No work on ProjectCard, SelectedWork, WorkFilter, project records, Services, case-study content, About, Contact, email integration or hosting audience. Do not apply the experiment's selected-work padding or full-width feature CSS.

## Concrete approved values

| Role | 901px and wider | 651–900px | 650px and narrower |
|---|---|---|---|
| Hero minimum height | 600px | 560px | 0; content determines height |
| Copy vertical padding | 56px / 56px | 40px / 40px | 36px top / 20px bottom |
| Copy horizontal padding/width | Retain current A1 values | Retain current A1 values | 6%; width auto |
| H1 family/weight | Georgia, normal | Same | Same |
| H1 size | clamp(44px,5.6vw,80px) | clamp(44px,6.8vw,62px) | 46px |
| H1 line-height | 1.04 | 1.04 | 1.06 |
| H1 tracking | -.045em | Same | Same |
| H1 maximum width | 9.2em | Same | 9.1em |
| H1 margin | 24px vertical | Same | 20px vertical |
| Services sentence | max-width400px;19px/1.55 | Same | 17px/1.55 |
| Mobile art | Existing desktop artwork behavior | Existing tablet artwork behavior | Height220px;77% top focal point |

Retain global A1 tokens: ivory #f7f3eb, ink #20271f, bronze #82613b and line #d5c9b7. Hero refinements are local pattern values, not a global type-system replacement.

Eyebrow becomes **Web & product development**. Keep heading words exactly **Ideas shaped into working products.** Remove the old two forced `<br />` breaks; use `Ideas shaped into ` followed by a display:block span containing `working products.`. Let natural wrapping handle narrow widths; do not insert viewport-specific wording or shrink text to suppress overflow.

## Included implementation aid

`opening-only.patch` changes only Hero.tsx, scoped CSS and current MDS state. It was generated from the inspected commit; it has NOT been applied, built or browser-tested as Next.js. Read it first. Use `git apply --check` on the implementation branch, then apply if the inspected files are still compatible. If files differ, merge the intent into current components rather than forcing the patch or restoring old files. `hero-opening.css` is the same scoped styling for inspection.

The patch deliberately excludes SelectedWork padding, even though full comparison screenshots show the broader B experiment. Compare only the opening. The shared header remains unchanged. Do not recreate the frozen prototype's menu/filter scripts.

## Acceptance and verification

1. Branch from current main, suggested `feat/portfolio-b-opening`; one PR for this slice. No main push or merge.
2. Hero copy/art hierarchy matches B's opening on desktop and mobile; no other content/layout changes except natural upward movement of following sections from the shorter hero.
3. Compare current baseline and implementation at matching 360, 768 and 1440 CSS-pixel widths; also inspect 320px and around 650/651 and 900/901 boundaries. Use full-size screenshots for QA; comparison screenshots are contextual references, not pixel-level masks.
4. No clipped text, overlap or horizontal page overflow. At 200% text/zoom, allow reflow and taller hero; minimum heights are not fixed heights.
5. Keyboard focus, skip link, mobile menu open/close/Escape, Work/Services/Contact navigation and CTA anchors continue working. Honor system reduced motion; do not add a manual motion switch.
6. Verify image crop, sharpness and loading stability. Keep the original Next image pipeline. Do not claim lab or field performance improvement without measurement.
7. Run current repository-required checks, at minimum production build and existing relevant regressions. No dependency or tooling upgrades for this slice. Record pass/fail/not-run and actual commit, viewport and screenshots. This handoff's patch is untested as an application change.
8. Open a PR; obtain its Vercel Preview through the existing workflow and verify the actual implementation there. Preserve access settings. If a private preview is needed but unavailable, report the limitation; do not weaken protection.
9. Return preview URL, PR URL, changed files, MDS decision/version update, checks, desktop/mobile screenshots and deviations. Leave merge and production release to Josh.

## Evidence already available

Observed private prototype: matched 1440px hero height baseline≈721.9px/B600px; matched360px frames showed no horizontal page overflow. These are prototype observations, not proof the Next.js patch passes. Owner preference supports this implementation selection. Client benefits remain hypotheses.

Tail Eater review: https://tail-eater.jcoley516283.chatgpt.site/#record-b19db846-6705-4250-b914-d7a1c1f61582
Experiment: https://tail-eater.jcoley516283.chatgpt.site/#record-5f5f05d1-26cb-4f12-9d3c-645999964f87
Candidate lesson: https://tail-eater.jcoley516283.chatgpt.site/#lesson-34718e96-bdfc-4db7-8b7f-eedbd08f9553
