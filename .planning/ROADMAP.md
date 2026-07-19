# Roadmap: Sandeep Gupta — Portfolio

## Overview

A four-phase build that ships all professional content and the full deployment pipeline first — de-risking the MilesWeb/cPanel hosting unknown immediately, since content has zero dependency on the animation engine — then tackles the project's single biggest technical risk, the theme-switchable, scroll+mouse-reactive WebGL background, by proving the shared engine against one reference theme before replicating it across all 4. The picker/opacity UI is wired up last against real, working themes, and a dedicated performance/accessibility/launch-hardening pass closes out the whole site before launch.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked INSERTED)

Decimal phases appear surrounding integers in numeric order.

- [ ] **Phase 1: App Shell, Content & Deployment** - All professional content sections render on a deployed, live MilesWeb site
- [ ] **Phase 2: Background Engine & 4-Theme System** - All 4 animated WebGL background themes react to scroll/mouse without hurting legibility or battery life
- [ ] **Phase 3: Theme Picker, Opacity & Persistence** - Visitors can pick a theme and adjust opacity, remembered across visits
- [ ] **Phase 4: Performance, Accessibility & Launch Hardening** - The finished site is fast, accessible, SEO-tagged, and link-clean

## Phase Details

### Phase 1: App Shell, Content & Deployment

**Goal**: A visitor can browse Sandeep's full professional story — through a responsive site shell (header navigation, content pages, footer) covering hero, about, experience, projects, skills, certifications, education, and contact — on the live, deployed MilesWeb site.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: HERO-01, ABOUT-01, EXP-01, EXP-02, PROJ-01, PROJ-02, PROJ-03, SKILL-01, SKILL-02, CERT-01, EDU-01, CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, SOCIAL-01, DEPLOY-01
**Success Criteria** (what must be TRUE):

  1. Visitor lands on the hero section and immediately sees Sandeep's name, title, and a one-line positioning statement.
  2. Visitor can read a synthesized About summary and a chronological Experience timeline with quantified achievements listed per role.
  3. Visitor can browse 3-6 curated project cards (description, tech tags, GitHub link), skills grouped by category, certifications, and education, all sourced from static, hand-curated build-time content data (no live GitHub API calls at runtime).
  4. Visitor can email Sandeep directly, open his LinkedIn and GitHub profiles, download his resume PDF with one click, and read 2-3 transcribed recommendation quotes.
  5. The site is live at its MilesWeb production URL, deployed via the proven `jagdamba_automobiles` dependency-free Node `app.js` + Vite `dist/` pattern.

**Plans**: 4 plans
Plans:
**Wave 1**

- [ ] 01-01-PLAN.md — Scaffold (Vite+React+TS+ESLint+Vitest) + Hero + Contact vertical slice, proven locally end-to-end

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 01-02-PLAN.md — About + Experience + Skills + Certifications + Education (resume-derived static content)

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 01-03-PLAN.md — Projects + Testimonials (curated content) + full 9-section nav/order assembly

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 01-04-PLAN.md — Production deployment to MilesWeb cPanel (DEPLOY-01)

**UI hint**: yes

### Phase 2: Background Engine & 4-Theme System

**Goal**: A visitor sees a full-bleed, low-opacity animated WebGL background that assembles/disassembles as they scroll and move their mouse (or touch on mobile), for all 4 v1 themes (Computers, AI/Neural Network, Space, Human Evolution), without it ever obscuring the content, draining their battery, or violating motion preferences.
**Mode:** mvp
**Depends on**: Phase 1 (background renders behind real content, not a placeholder)
**Requirements**: BG-02, BG-03, BG-05, BG-06
**Success Criteria** (what must be TRUE):

  1. Each of the 4 themes renders a distinct, full-bleed, low-opacity WebGL background behind the content.
  2. The active background's shapes visibly assemble/disassemble in response to scroll position and mouse movement, with a working touch/gyroscope fallback on mobile devices that have no native mousemove.
  3. Portfolio text and UI controls stay fully legible over every theme, even during its busiest ("fully assembled") animation frame.
  4. The background animation pauses automatically when its tab/canvas isn't visible and honors the visitor's OS-level `prefers-reduced-motion` setting.

**Plans**: TBD
**Sequencing note**: Build the shared engine + interaction pipeline (RAF loop, resize/DPR handling, mount/unmount lifecycle) against ONE reference theme first — this is the highest-uncertainty work in the whole project — then replicate the proven ThemeModule contract to the remaining three themes. Plan-phase should sequence plans this way rather than building all 4 themes in parallel (avoids over-scoping the phase).
**UI hint**: yes

### Phase 3: Theme Picker, Opacity & Persistence

**Goal**: A visitor can choose which background theme is active and how strongly it shows, and that choice is remembered on their next visit.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: BG-01, BG-04
**Success Criteria** (what must be TRUE):

  1. Visitor can open a theme picker in the top nav and switch between all 4 themes using either keyboard or pointer.
  2. Visitor can adjust an opacity control to make the active background more or less prominent, down to nearly invisible.
  3. Visitor's theme and opacity choice persists across page reloads and return visits.

**Plans**: TBD
**UI hint**: yes

### Phase 4: Performance, Accessibility & Launch Hardening

**Goal**: The finished site loads fast, passes accessibility basics, is discoverable via correct SEO metadata, and has no broken links or images anywhere — across every content section and every theme.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05
**Success Criteria** (what must be TRUE):

  1. Layout adapts cleanly across mobile, tablet, and desktop breakpoints for both content and background.
  2. Page load and interaction metrics stay Core-Web-Vitals-clean (LCP, INP, CLS) with the heaviest theme active.
  3. Search engines and social link previews show correct title, description, and Open Graph metadata.
  4. Keyboard navigation, semantic HTML, alt text, and content-over-background contrast all meet accessibility basics on every theme.
  5. No broken links, images, or downloads exist anywhere on the live site.

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:** Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|-----------------|--------|-----------|
| 1. App Shell, Content & Deployment | 0/TBD | Not started | - |
| 2. Background Engine & 4-Theme System | 0/TBD | Not started | - |
| 3. Theme Picker, Opacity & Persistence | 0/TBD | Not started | - |
| 4. Performance, Accessibility & Launch Hardening | 0/TBD | Not started | - |

---
*Roadmap created: 2026-07-19*
*Granularity: coarse (4 phases derived from 28 v1 requirements; research's 5-phase suggestion honored as an internal sequencing note within Phase 2 rather than a separate phase, since "remaining 3 themes" carries no distinct requirement of its own)*
