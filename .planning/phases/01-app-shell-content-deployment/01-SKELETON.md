# Walking Skeleton — Sandeep Gupta Portfolio

**Phase:** 1
**Generated:** 2026-07-19

## Capability Proven End-to-End

A visitor can view Sandeep's hero introduction and use all four contact actions (email, LinkedIn, GitHub profile, one-click resume PDF download) on a site built by Vite and served by a dependency-free Node `app.js` — proven locally in Plan 01, then live on MilesWeb in Plan 04.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | React 19.2.7 + TypeScript 6.0.3 + Vite ^6.3.6 | Matches the proven `jagdamba_automobiles` pattern (CLAUDE.md-pinned versions); no router needed — single anchor-nav page per D-CONTEXT "Claude's Discretion" (section ordering) |
| Data layer | Static typed `src/content/*.ts` modules (no DB, no CMS, no runtime fetch) | PROJ-02 forbids live GitHub API calls at runtime; content is single-owner, hand-curated (D-01/D-02/D-03), so a database is unjustified complexity |
| Auth | None | Public static portfolio site — no login surface, no session/credential handling (ASVS V2/V3/V4 not applicable) |
| Deployment target | MilesWeb shared hosting via cPanel Node.js application root; dependency-free `app.js` (only `node:http`/`node:fs`/`node:path`/`node:url`) serves Vite's `dist/` | D-05/D-06/D-07 lock this pattern verbatim from `jagdamba_automobiles`; CloudLinux LVE cannot allocate WASM memory at runtime, so the production server must stay dependency-free |
| Directory layout | `src/content/*.ts` (typed static data, no JSX) + `src/sections/*.tsx` (presentational components, one per content section) + `src/nav/TopNav.tsx` | Decouples content-authoring from rendering, matches `01-PATTERNS.md`'s file classification, and keeps this phase's file tree independent of the not-yet-built Phase 2/3 background/theme system |

## Stack Touched in Phase 1

- [x] Project scaffold (Vite + React + TypeScript, ESLint flat config, Vitest+jsdom+RTL test runner) — Plan 01
- [x] Routing — single anchor-nav page (`#hero`, `#contact`, ... section ids), no client router — Plan 01 (skeleton) through Plan 03 (full nav)
- [x] Database — replaced by a real read of static typed content data (`src/content/hero.ts`, `src/content/contact.ts`) rendered into the DOM; no write path exists by design (static portfolio) — Plan 01
- [x] UI — real interactive elements wired end-to-end: `mailto:` link, LinkedIn/GitHub external links (`rel="noopener noreferrer"`), same-origin resume PDF download — Plan 01
- [x] Deployment — Plan 01 proves the full stack locally (`npm run build && npm start` + `scripts/deploy-smoke.sh` curl checks against `http://localhost:4173`); Plan 04 repeats the same smoke script against the live MilesWeb URL

## Out of Scope (Deferred to Later Slices)

- Background/theme animation engine, particle systems, all 4 themes (R3F/three.js/zustand/gsap) — Phase 2
- Theme picker UI, opacity control, scroll/mouse-reactive uniforms — Phase 3
- Performance, SEO, and accessibility hardening pass — Phase 4
- Live GitHub API stats/case-study writeups, blog/articles section, contact form (v2 items: CASE-01, PROJ-04, CONTACT-05, per REQUIREMENTS.md) — explicitly out of scope, not re-litigated here
- A 5th/6th background theme (Chess, BG-07) — v2
- `lucide-react`, `@fontsource/*`, `framer-motion` as Phase 1 dependencies — omitted to keep this phase's `package.json` exactly matching `01-RESEARCH.md`'s audited package table (inline SVG icons + Google Fonts CDN `<link>` used instead; see `01-01-PLAN.md` Task 2 action)

## Subsequent Slice Plan

- **Phase 1, Plan 02:** About + Experience + Skills + Certifications + Education (resume-derived static content)
- **Phase 1, Plan 03:** Projects + Testimonials (curated content) + full 9-section nav/order assembly
- **Phase 1, Plan 04:** Production deployment to MilesWeb (DEPLOY-01)
- **Phase 2:** Background engine core — shared `ThemeModule` contract + one reference theme, then replicate to the remaining 3
- **Phase 3:** Theme picker, opacity control, scroll/mouse-reactive uniform wiring
- **Phase 4:** Performance/accessibility/launch hardening pass
