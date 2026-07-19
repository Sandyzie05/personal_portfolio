---
phase: 01-app-shell-content-deployment
plan: 01
subsystem: ui
tags: [react, typescript, vite, vitest, node-http, cpanel]

# Dependency graph
requires: []
provides:
  - React 19 + TypeScript 6 + Vite 6 project scaffold (package.json, tsconfig project-reference trio, eslint flat config, vite.config.ts with vitest test block)
  - Dependency-free Node app.js static server (path-traversal guarded, .pdf MIME, SPA fallback) proven against jagdamba_automobiles's pattern
  - Content/presentation split pattern (src/content/*.ts typed const + src/sections/*.tsx consumer) established for Hero and Contact
  - TopNav shell with skip-link, accessible anchor nav, mobile hamburger toggle
  - Vitest + React Testing Library test harness (src/test/setup.ts) and scripts/deploy-smoke.sh curl-based smoke check
affects: [01-02-content-sections, 01-03-projects-testimonials, 01-04-deployment]

# Tech tracking
tech-stack:
  added: [react@19.2.7, react-dom@19.2.7, vite@6.4.3, "@vitejs/plugin-react@4.7.0", typescript@6.0.3, vitest@3.2.7, jsdom@26.1.0, "@testing-library/react@16.3.2", eslint@9.39.1, typescript-eslint@8.64.0]
  patterns:
    - "Typed content module (interface + const) per section, imported by a matching presentational component in src/sections/"
    - "app.js: path.resolve + startsWith(distRoot + path.sep) containment check before serving any file; unmatched paths fall back to index.html (SPA routing)"
    - "External links always pair target=\"_blank\" with rel=\"noopener noreferrer\""
    - "scripts/deploy-smoke.sh as the reusable curl-based proof of a running build, reused unchanged in Plan 04's live deploy"

key-files:
  created:
    - package.json
    - vite.config.ts
    - app.js
    - src/App.tsx
    - src/nav/TopNav.tsx
    - src/content/hero.ts
    - src/content/contact.ts
    - src/sections/Hero.tsx
    - src/sections/Contact.tsx
    - src/styles.css
    - scripts/deploy-smoke.sh
  modified: []

key-decisions:
  - "Bumped vite (6.3.6 -> 6.4.3) and vitest (3.2.4 -> 3.2.7) after npm audit flagged a high-severity Vite dev-server path-traversal/arbitrary-file-read CVE and a critical Vitest UI-server arbitrary-file-execution CVE in the plan's originally pinned versions. Both fixes stay within the ^6.x/^3.x majors already approved by the Task 1 legitimacy gate."
  - "vite.config.ts imports defineConfig from 'vitest/config' (not 'vite') so the 'test' block type-checks under tsc -b without a TS2353 excess-property error — same runtime config, correctly typed."
  - "Added src/vite-env.d.ts (standard Vite ambient-types triple-slash reference) — omitted from the plan's file list but required for the CSS side-effect import in main.tsx to type-check; jagdamba_automobiles has the identical file."
  - "Expanded .gitignore beyond the plan's node_modules/+dist/ to mirror jagdamba_automobiles's fuller version (*.tsbuildinfo, editor dirs, OS files) plus .tokensave/ (local MCP tool cache) — needed to avoid committing generated/local-only files that didn't exist when the plan was written."

patterns-established:
  - "Section component pair: src/content/{name}.ts (interface + const) + src/sections/{Name}.tsx (renders it, id + aria-labelledby on the <section>)"
  - "TopNav's `links` array is the single source of truth for anchor nav — Plan 02/03 extend it in place rather than duplicating nav markup"

requirements-completed: [HERO-01, CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04]

coverage:
  - id: D1
    description: "Hero section renders Sandeep's name, title, and positioning statement"
    requirement: "HERO-01"
    verification:
      - kind: unit
        ref: "src/sections/Hero.test.tsx#renders the name and title"
        status: pass
    human_judgment: false
  - id: D2
    description: "Contact mailto link opens email client addressed to Sandeep"
    requirement: "CONTACT-01"
    verification:
      - kind: unit
        ref: "src/sections/Contact.test.tsx#renders a mailto link"
        status: pass
    human_judgment: false
  - id: D3
    description: "Contact LinkedIn link opens in a new tab safely (rel=noopener noreferrer)"
    requirement: "CONTACT-02"
    verification:
      - kind: unit
        ref: "src/sections/Contact.test.tsx#renders a safe LinkedIn link"
        status: pass
    human_judgment: false
  - id: D4
    description: "Contact GitHub link opens in a new tab safely (rel=noopener noreferrer)"
    requirement: "CONTACT-03"
    verification:
      - kind: unit
        ref: "src/sections/Contact.test.tsx#renders a safe GitHub link"
        status: pass
    human_judgment: false
  - id: D5
    description: "Resume PDF downloads same-origin from /resume.pdf with correct Content-Type"
    requirement: "CONTACT-04"
    verification:
      - kind: unit
        ref: "src/sections/Contact.test.tsx#renders a same-origin resume download link"
        status: pass
      - kind: e2e
        ref: "scripts/deploy-smoke.sh http://localhost:4173"
        status: pass
    human_judgment: false
  - id: D6
    description: "app.js serves dist/ using only node:http/fs/path/url and rejects out-of-bounds paths with 400"
    verification:
      - kind: manual_procedural
        ref: "curl path-traversal probes against running `npm start` (percent-encoded ../.. -> 400; unmatched routes -> SPA fallback 200, verified body matches index.html not a leaked source file)"
        status: pass
    human_judgment: false

# Metrics
duration: 30min
completed: 2026-07-19
status: complete
---

# Phase 1 Plan 01: Walking Skeleton Summary

**React 19 + TypeScript 6 + Vite 6 scaffold with a dependency-free Node app.js server, proven end-to-end via a Hero/Contact vertical slice, Vitest+RTL tests, and a curl-based deploy-smoke.sh check.**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-07-19T17:59:09Z
- **Completed:** 2026-07-19T18:29:13Z
- **Tasks:** 3 (1 human-verify checkpoint + 2 auto)
- **Files modified:** 22 (Task 2) + 4 (Task 3) = 26

## Accomplishments
- Full Vite+React+TypeScript scaffold, mirroring `jagdamba_automobiles`'s proven config shape with this project's own version pins
- `app.js` patched into a dependency-free static server: `.pdf` MIME entry added, path-traversal containment check added, `jagdambaautomobiles`-specific BASE/admin routing fully removed
- Hero + Contact vertical slice wired end-to-end: typed content modules -> presentational components -> rendered, tested, and curl-verified in a production build
- `scripts/deploy-smoke.sh` — a reusable smoke check that will run unchanged against the live MilesWeb deploy in Plan 04

## Task Commits

Each task was committed atomically:

1. **Task 1: Package legitimacy check before first install** - human-verify checkpoint, approved (no file changes — gate only)
2. **Task 2: Scaffold + Hero + Contact vertical slice** - `ff37b11` (feat)
3. **Task 3: Tests + local end-to-end proof** - `2717736` (test)

_Note: no separate "plan metadata" commit — this summary is committed together with the STATE.md update below._

## Files Created/Modified
- `package.json`, `.npmrc`, `vite.config.ts`, `tsconfig.{json,app.json,node.json}`, `eslint.config.js`, `.gitignore` — project scaffold/config
- `index.html`, `src/main.tsx`, `src/vite-env.d.ts`, `src/App.tsx`, `src/styles.css` — app shell
- `src/nav/TopNav.tsx` — accessible sticky nav with skip-link and mobile toggle
- `src/content/hero.ts`, `src/content/contact.ts` — typed content modules
- `src/sections/Hero.tsx`, `src/sections/Contact.tsx` — section components
- `public/resume.pdf` — copied from `~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`
- `app.js` — patched dependency-free Node static server
- `src/test/setup.ts`, `src/sections/Hero.test.tsx`, `src/sections/Contact.test.tsx` — test harness + tests
- `scripts/deploy-smoke.sh` — curl-based smoke check

## Decisions Made
- Bumped `vite`/`vitest` to patched versions (6.4.3 / 3.2.7) after `npm audit` found a high + critical CVE in the plan's originally pinned versions — see `key-decisions` above.
- Used `vitest/config`'s `defineConfig` (not `vite`'s) so `vite.config.ts`'s `test` block type-checks cleanly.
- Added `src/vite-env.d.ts` (missing from the plan's file list but required boilerplate, confirmed present in `jagdamba_automobiles`).
- Expanded `.gitignore` beyond the plan's minimal two-line spec to also exclude `*.tsbuildinfo` and `.tokensave/` (local MCP tool cache) — both appeared as untracked files that the plan's narrower spec didn't anticipate.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Patched high+critical npm audit CVEs in vite/vitest**
- **Found during:** Task 2 (post-install verification)
- **Issue:** Plan pinned `vite@6.3.6` and `vitest@3.2.4` exactly; `npm audit` flagged a high-severity Vite dev-server path-traversal/arbitrary-file-read advisory and a critical Vitest UI-server arbitrary-file-execution advisory affecting those exact versions.
- **Fix:** Bumped to `vite@6.4.3` and `vitest@3.2.7` (both within the already-approved ^6.x/^3.x majors); `npm audit` now reports 0 vulnerabilities.
- **Files modified:** `package.json`, `package-lock.json`
- **Verification:** `npm audit` clean; `npm run build` and `npm test -- --run` both still pass after the bump.
- **Committed in:** `ff37b11` (Task 2 commit)

**2. [Rule 3 - Blocking] Added missing src/vite-env.d.ts**
- **Found during:** Task 2 (`npm run build`)
- **Issue:** `tsc -b` failed with `TS2882: Cannot find module or type declarations for side-effect import of './styles.css'` — the plan's file list omitted the standard Vite ambient-types file.
- **Fix:** Added `src/vite-env.d.ts` with `/// <reference types="vite/client" />`, identical to `jagdamba_automobiles`'s copy.
- **Files modified:** `src/vite-env.d.ts`
- **Verification:** `npm run build` succeeds.
- **Committed in:** `ff37b11` (Task 2 commit)

**3. [Rule 2 - Missing Critical] Expanded .gitignore to exclude build artifacts and local tool cache**
- **Found during:** Task 2 (pre-commit `git status` review)
- **Issue:** The plan's two-line `.gitignore` spec (`node_modules/`, `dist/`) didn't cover `*.tsbuildinfo` (generated by `tsc -b`) or `.tokensave/` (a local MCP tool cache directory present in the repo root, unrelated to this project's source) — both showed up as untracked and would have been swept into `git add -A`.
- **Fix:** Replaced the minimal `.gitignore` with `jagdamba_automobiles`'s fuller proven version (adds `*.tsbuildinfo`, editor dirs, OS files) plus a `.tokensave/` entry.
- **Files modified:** `.gitignore`
- **Verification:** `git status` after `git add -A` shows neither `*.tsbuildinfo` files nor `.tokensave/` staged.
- **Committed in:** `ff37b11` (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (1 missing critical security patch, 1 blocking build fix, 1 missing critical gitignore gap)
**Impact on plan:** All three were necessary for correctness/security; none change the plan's architecture, scope, or content. No scope creep.

## Issues Encountered
None beyond the deviations documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Walking Skeleton proven: scaffold, content/presentation split, `app.js` security posture, and test harness are all validated and ready for Plan 02 to extend (About/Experience/Skills/Certifications/Education sections) without re-deriving any of these patterns.
- `TopNav`'s `links` array and `App.tsx`'s composition order are the two files Plan 02/03 will extend in place.
- Plan 04's live deploy can reuse `scripts/deploy-smoke.sh` unchanged against the MilesWeb URL once D-08 (domain/subdomain) is resolved.

---
*Phase: 01-app-shell-content-deployment*
*Completed: 2026-07-19*
