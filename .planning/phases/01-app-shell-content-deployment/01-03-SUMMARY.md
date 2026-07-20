---
phase: 01-app-shell-content-deployment
plan: 03
subsystem: ui
tags: [react, typescript, vitest, projects, testimonials, testing-library]

# Dependency graph
requires:
  - phase: 01-02
    provides: About/Experience/Skills/Certifications/Education content sections, content/presentation split pattern, TopNav links array, App.tsx composition root, card-grid/tag-chip CSS patterns
provides:
  - Projects section (6 curated GitHub repo cards, D-02 fixed order, no runtime API calls)
  - Testimonials section (3 verbatim LinkedIn recommendation quotes with attribution)
  - Full 9-section App.tsx composition in final order: Hero -> About -> Experience -> Projects -> Skills -> Certifications -> Education -> Testimonials -> Contact
  - TopNav links array extended to its final 9-entry state (Home, About, Experience, Projects, Skills, Certifications, Education, Testimonials, Contact)
  - projects-grid/project-card and testimonials-grid/testimonial-card CSS patterns added to src/styles.css per 01-UI-SPEC.md tokens
affects: [01-04-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Content/presentation split repeated for the final 2 sections: src/content/{projects,testimonials}.ts (interface + const) paired with src/sections/{Projects,Testimonials}.tsx"
    - "Project card pattern: auto-fit CSS grid of surface cards, each with name/description/tag-chip-list/external GitHub link, hover/focus-within accent border-glow (CSS-only, no Framer Motion per Plan 01's dependency decision)"
    - "Testimonial card pattern: auto-fit CSS grid of <blockquote> cards, align-items: start so the visibly longer Rebecca Cengiz-Robbs quote doesn't stretch shorter siblings"

key-files:
  created:
    - src/content/projects.ts
    - src/content/testimonials.ts
    - src/sections/Projects.tsx
    - src/sections/Testimonials.tsx
    - src/sections/Projects.test.tsx
    - src/sections/Testimonials.test.tsx
  modified:
    - src/App.tsx
    - src/nav/TopNav.tsx
    - src/styles.css

key-decisions:
  - "Two of this plan's own acceptance-criteria grep commands overcount/undercount for the same reason noted in Plan 02's summary: `grep -c \"quote:\" src/content/testimonials.ts` returns 4 (not 3) because it also matches the TypeScript interface field declaration (`quote: string`); `grep -c \"<section id=\" src/App.tsx` returns 0 (not 9) because App.tsx composes sections via component tags (`<Projects />`, `<Testimonials />`, etc.) per the established content/presentation split pattern from Plan 01 -- the literal `<section id=\"...\">` markup lives inside each section component file, not in App.tsx itself. Verified instead via `grep -rl \"<section id=\" src/sections/*.tsx | wc -l` -> 9, one per section component, and the full test suite confirms all content renders correctly. The underlying implementation is correct; these are plan-verification-command false-negatives/positives, not defects."
  - "`grep -c 'repoUrl:' src/content/projects.ts` returns 7 (not 6) for the identical reason -- it also matches the `repoUrl: string` interface field declaration. Confirmed 6 actual project entries via the Projects.test.tsx assertion that exactly 6 headings render."

patterns-established:
  - "Section component pair (final): src/content/{name}.ts + src/sections/{Name}.tsx — now used by all 9 of the site's sections, completing the pattern established in Plan 01 and extended through Plan 02"
  - "TopNav's links array reached its final 9-entry state for Phase 1 — no further sections are added in this phase"

requirements-completed: [PROJ-01, PROJ-02, PROJ-03, SOCIAL-01]

coverage:
  - id: D1
    description: "Projects section renders exactly 6 curated project cards (name, description, tech tags, GitHub link) in D-02's fixed source order"
    requirement: "PROJ-01"
    verification:
      - kind: unit
        ref: "src/sections/Projects.test.tsx#renders exactly 6 project names in authored order"
        status: pass
    human_judgment: false
  - id: D2
    description: "Project data is static/hand-curated at build time; no runtime GitHub API/fetch call exists anywhere in the Projects section"
    requirement: "PROJ-02"
    verification:
      - kind: other
        ref: "grep -c 'api.github.com\\|fetch(' src/sections/Projects.tsx src/content/projects.ts -> 0 in both files"
        status: pass
    human_judgment: false
  - id: D3
    description: "Each project card links to its own GitHub repo with target=_blank rel=noopener noreferrer"
    requirement: "PROJ-03"
    verification:
      - kind: unit
        ref: "src/sections/Projects.test.tsx#renders every GitHub link as target=_blank rel=noopener noreferrer"
        status: pass
      - kind: unit
        ref: "src/sections/Projects.test.tsx#renders a non-empty description and at least one tag for every project"
        status: pass
    human_judgment: false
  - id: D4
    description: "Site includes exactly 3 verbatim LinkedIn recommendation quotes with name+company attribution"
    requirement: "SOCIAL-01"
    verification:
      - kind: unit
        ref: "src/sections/Testimonials.test.tsx#renders all 3 quotes and name+title attributions"
        status: pass
      - kind: unit
        ref: "src/sections/Testimonials.test.tsx#renders quotes and attributions in the array's authored order"
        status: pass
    human_judgment: false

# Metrics
duration: 4min
completed: 2026-07-20
status: complete
---

# Phase 1 Plan 03: Projects + Testimonials Summary

**Six curated GitHub project cards (D-02 fixed order, zero runtime API calls) and 3 verbatim LinkedIn recommendation quotes, completing the full 9-section App.tsx/TopNav.tsx assembly for Phase 1's content shell.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-07-19T19:02:15-06:00 (approx, first commit 19:02:33)
- **Completed:** 2026-07-19T19:04:25-06:00
- **Tasks:** 2 (all auto, TDD)
- **Files modified:** 6 created, 3 modified (App.tsx, TopNav.tsx, styles.css touched across both tasks)

## Accomplishments
- Projects: all 6 D-02 locked repos (`acksync`, `acksync_crm_lmb`, `stock_predictor`, `jagdamba_automobiles`, `cbse_tutor`, `compliOS`) rendered as cards in fixed source order, each with a hand-curated description and tech-tag list, and a safe (`target="_blank" rel="noopener noreferrer"`) GitHub link — zero `fetch`/`axios`/GitHub API usage anywhere in the component or content module
- Testimonials: all 3 locked verbatim recommendation quotes (Ankit Agnihotri, Nathan Stewart, Rebecca Cengiz-Robbs) rendered with name+title attribution, using `align-items: start` so the visibly longer Rebecca Cengiz-Robbs quote doesn't stretch the shorter cards
- App.tsx and TopNav.tsx reached their final Phase-1 states: 9 sections in RESEARCH.md's recommended order (Hero → About → Experience → Projects → Skills → Certifications → Education → Testimonials → Contact), 9 matching TopNav anchor links
- Closes ROADMAP.md Phase 1 Success Criteria 1-4 (content shell complete); only Success Criteria 5 (live deployment, Plan 04) remains

## Task Commits

Each task followed TDD (test -> feat), 2 commits per task, 4 total:

1. **Task 1: Projects**
   - `e928c92` (test) - failing Projects test + projects.ts content module (6 entries, D-02 order)
   - `4769f0c` (feat) - Projects.tsx implementation, wired into App.tsx (after Experience)/TopNav.tsx, projects-grid CSS
2. **Task 2: Testimonials + full-shell assembly**
   - `062626b` (test) - failing Testimonials test + testimonials.ts content module (3 entries, verbatim)
   - `59ae0ad` (feat) - Testimonials.tsx implementation, wired into App.tsx (after Education, before Contact)/TopNav.tsx to their final 9-entry states, testimonials-grid CSS

_Note: no separate "plan metadata" commit — this summary is committed together with the roadmap/requirements update below (STATE.md is intentionally left untouched per orchestrator instruction)._

## Files Created/Modified
- `src/content/projects.ts` - `Project` interface + `projects` const array (6 entries, D-02 fixed order, all under `github.com/Sandyzie05`)
- `src/content/testimonials.ts` - `Testimonial` interface + `testimonials` const array (3 entries, verbatim quotes)
- `src/sections/Projects.tsx` - renders `projects` as an auto-fit CSS grid of cards with name/description/tag-chip-list/GitHub link
- `src/sections/Testimonials.tsx` - renders `testimonials` as an auto-fit CSS grid of `<blockquote>` quote cards
- `src/sections/Projects.test.tsx` - render + fixed-order + safe-link + non-empty-description/tags assertions
- `src/sections/Testimonials.test.tsx` - render + content + authored-order assertions
- `src/App.tsx` - composition order finalized to Hero -> About -> Experience -> Projects -> Skills -> Certifications -> Education -> Testimonials -> Contact
- `src/nav/TopNav.tsx` - `links` array finalized to 9 entries
- `src/styles.css` - added `.projects-grid`/`.project-card`/`.project-name`/`.project-description` and `.testimonials-grid`/`.testimonial-card`/`.testimonial-quote`/`.testimonial-name`/`.testimonial-title` rules per 01-UI-SPEC.md tokens

## Decisions Made
- Reused the exact D-02 repo descriptions/tags and D-03/D-04 verbatim quotes as specified in the plan and `01-CONTEXT.md` — no new content authoring judgment calls were needed since both were already locked.
- Applied the same CSS-only hover-glow treatment (`border-color: var(--color-accent)` on `:hover`/`:focus-within`) to project cards as `01-UI-SPEC.md`'s Color section specifies, without introducing Framer Motion (matches Plan 01's dependency decision to keep animation libraries out of the content-shell phase).
- Noted (not fixed, consistent with Plan 02's precedent) that 3 of this plan's own acceptance-criteria grep commands over/undercount because they also match TypeScript interface field declarations, or because App.tsx composes sections via component tags rather than literal `<section id=...>` markup — see `key-decisions` in frontmatter for full detail. All underlying data/structure was independently verified correct via the test suite and targeted greps against `src/sections/*.tsx`.

## Deviations from Plan

None — plan executed exactly as written for all content, component structure, CSS, and wiring. The grep-command discrepancies noted above are documented under Decisions Made (matching Plan 02's precedent) rather than as Rule 1-4 deviations, since they reflect verification-command false-positives/negatives, not any change to scope, architecture, or shipped behavior.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 9 sections (Hero, About, Experience, Projects, Skills, Certifications, Education, Testimonials, Contact) are live, tested, and wired into `App.tsx`/`TopNav.tsx` in the final Phase-1 order.
- Full test suite (18 tests across 9 files) passes; `npm run build` and `npm run lint` both exit clean.
- ROADMAP.md Phase 1 Success Criteria 1-4 (content shell) are now closed; only Success Criteria 5 (live MilesWeb deployment, Plan 04) remains.
- Plan 04 can proceed directly to the deployment pipeline with no further content/shell work required.

---
*Phase: 01-app-shell-content-deployment*
*Completed: 2026-07-20*

## Self-Check: PASSED
All 6 created files verified present on disk; all 4 task commits (`e928c92`, `4769f0c`, `062626b`, `59ae0ad`) verified present in git log.
