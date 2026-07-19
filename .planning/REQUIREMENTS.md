# Requirements: Sandeep Gupta — Portfolio

**Defined:** 2026-07-19
**Core Value:** A visitor immediately understands Sandeep's professional depth (experience, projects, skills) through a portfolio that is memorable and technically impressive — the interactive background must always serve the content, never compete with it.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Hero

- [ ] **HERO-01**: Landing/hero section introduces Sandeep as a Senior SRE/platform engineer with a clear, memorable first impression (name, title, one-line positioning)

### About

- [ ] **ABOUT-01**: About section synthesizes a professional summary from resume content (background, focus areas, career narrative)

### Experience

- [ ] **EXP-01**: Experience section presents full professional history (Adobe/Workfront and prior roles) in a timeline/chronological format
- [ ] **EXP-02**: Each role lists quantified achievements and impact, not just responsibilities

### Projects

- [ ] **PROJ-01**: Projects section surfaces 3-6 curated GitHub repos from `Sandyzie05` as simple cards (title, description, tech tags, link)
- [ ] **PROJ-02**: Project data (descriptions, tags, stats) is static/hand-curated at build time — no live GitHub API calls at runtime
- [ ] **PROJ-03**: Each project card links to its GitHub repo

### Skills

- [ ] **SKILL-01**: Skills section organizes skills by category (cloud/infra, IaC, GitOps/DevOps tooling, observability, languages, AI tooling, etc.) pulled from resume
- [ ] **SKILL-02**: Skills are presented as category groupings/tags, not skill-bar percentage graphics

### Certifications

- [ ] **CERT-01**: Certifications section lists resume certifications (PCAP, Jenkins Engineer, AWS CSAA, MS Azure Fundamentals, ITIL V3, Datadog)

### Education

- [ ] **EDU-01**: Education section lists MS Information Systems and BTech CS from resume

### Contact

- [ ] **CONTACT-01**: Contact section provides a direct email link (sandeepgupta050890@gmail.com)
- [ ] **CONTACT-02**: Contact section links to LinkedIn profile (linkedin.com/in/sandeepguptauou17)
- [ ] **CONTACT-03**: Contact section links to GitHub profile (github.com/Sandyzie05)
- [ ] **CONTACT-04**: Contact section offers one-click resume PDF download

### Social Proof

- [ ] **SOCIAL-01**: Site includes 2-3 manually-transcribed LinkedIn recommendation quotes (with permission from recommenders)

### Background & Theme System

- [ ] **BG-01**: Top nav offers a theme picker with 4 v1 themes: Computers, AI/Neural Network, Space, Human Evolution
- [ ] **BG-02**: Each theme drives a full-bleed, low-opacity animated background using WebGL/Three.js (React Three Fiber)
- [ ] **BG-03**: Background assembles/disassembles in reaction to scroll position and mouse movement (with touch/gyroscope fallback on mobile)
- [ ] **BG-04**: User-facing control lets visitors adjust background opacity
- [ ] **BG-05**: Background never obscures or reduces legibility of portfolio content
- [ ] **BG-06**: Background animation respects `prefers-reduced-motion` and pauses when the tab/canvas is not visible

### Deployment

- [ ] **DEPLOY-01**: Site is deployed to MilesWeb (cPanel Node.js hosting) using the `jagdamba_automobiles` pattern (dependency-free Node `app.js` serving a Vite-built `dist/`)

### Quality & Accessibility

- [ ] **QUAL-01**: Layout is responsive/mobile-first across breakpoints
- [ ] **QUAL-02**: Page load is fast and Core Web Vitals-clean (background rendering must not degrade load/interaction metrics)
- [ ] **QUAL-03**: Basic SEO meta tags are present (title, description, Open Graph)
- [ ] **QUAL-04**: Accessibility basics are met (semantic HTML, alt text, keyboard navigation, sufficient contrast for content over background)
- [ ] **QUAL-05**: No broken links/images at launch

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Projects

- **CASE-01**: 1-2 flagship projects get a deeper case-study writeup (problem/solution/impact)
- **PROJ-04**: Live GitHub stats (stars, last-updated, language) fetched via the GitHub API for pinned repos

### Contact

- **CONTACT-05**: In-page contact form (requires adding an email-sending service)

### Background & Theme System

- **BG-07**: Additional background themes beyond the 4 v1 themes (e.g. Chess)

### Social Proof

- **SOCIAL-02**: Expand LinkedIn recommendations as more are gathered

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Personal (non-professional) content — hobbies, personal photos, non-work interests | Explicitly deferred by the user; v1 is professional-content-only |
| Live/authenticated LinkedIn API integration | No public scraping-friendly API; profile content is manually transcribed instead |
| Blog/articles section | Premature for v1 launch; adds ongoing content-maintenance burden without validating the core portfolio first |
| Skill-bar percentage graphics | Reads as amateurish/unverifiable per research; category groupings used instead |
| Autoplay background with no way to pause/reduce | Violates WCAG motion guidance; covered instead by the opacity control (BG-04) and reduced-motion support (BG-06) |
| More than 4 background themes | Scope creep on the flagship feature; 4 themes is already a broad v1 commitment |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | Phase 1 | Pending |
| ABOUT-01 | Phase 1 | Pending |
| EXP-01 | Phase 1 | Pending |
| EXP-02 | Phase 1 | Pending |
| PROJ-01 | Phase 1 | Pending |
| PROJ-02 | Phase 1 | Pending |
| PROJ-03 | Phase 1 | Pending |
| SKILL-01 | Phase 1 | Pending |
| SKILL-02 | Phase 1 | Pending |
| CERT-01 | Phase 1 | Pending |
| EDU-01 | Phase 1 | Pending |
| CONTACT-01 | Phase 1 | Pending |
| CONTACT-02 | Phase 1 | Pending |
| CONTACT-03 | Phase 1 | Pending |
| CONTACT-04 | Phase 1 | Pending |
| SOCIAL-01 | Phase 1 | Pending |
| DEPLOY-01 | Phase 1 | Pending |
| BG-02 | Phase 2 | Pending |
| BG-03 | Phase 2 | Pending |
| BG-05 | Phase 2 | Pending |
| BG-06 | Phase 2 | Pending |
| BG-01 | Phase 3 | Pending |
| BG-04 | Phase 3 | Pending |
| QUAL-01 | Phase 4 | Pending |
| QUAL-02 | Phase 4 | Pending |
| QUAL-03 | Phase 4 | Pending |
| QUAL-04 | Phase 4 | Pending |
| QUAL-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-19*
*Last updated: 2026-07-19 after initial definition*
