# Requirements: Sandeep Gupta — Engineering Portfolio

**Updated:** 2026-09-24

## v1 Requirements

### Positioning and Content

- [x] **CONTENT-01**: Hero names Sandeep and positions him across software engineering, SRE/DevOps, and applied AI.
- [x] **CONTENT-02**: Three practice pillars explain how those disciplines connect.
- [x] **CONTENT-03**: Enterprise work is presented through generalized problem, approach, and outcome language.
- [x] **CONTENT-04**: Six current personal projects include descriptions, technology tags, and public source links.
- [x] **CONTENT-05**: Career history, education, certifications, and recommendations derive from resume/profile material.
- [x] **CONTENT-06**: Email, LinkedIn, GitHub, and current resume routes are available.

### Privacy and Confidentiality

- [x] **SAFE-01**: Employer case studies contain no internal repository or product names.
- [x] **SAFE-02**: Employer case studies contain no internal URLs, credentials, customer data, or architecture diagrams.
- [x] **SAFE-03**: Exact internal scale and capacity figures are omitted from case-study copy.
- [x] **SAFE-04**: A regression test rejects known internal project names in the public enterprise-work section.

### Experience and Visual Design

- [x] **UX-01**: Hero uses one dominant visual and fits the initial viewport with persistent navigation.
- [x] **UX-02**: Light and dark modes are user-selectable and persist locally.
- [x] **UX-03**: Layout works at desktop, tablet, and mobile widths.
- [x] **UX-04**: Motion conveys entry, scroll progress, and affordance without blocking content.
- [x] **UX-05**: `prefers-reduced-motion` and `prefers-contrast` receive explicit treatment.
- [x] **UX-06**: Interactive targets are at least 44px where touch interaction is expected.
- [x] **UX-07**: Text and action colors meet WCAG AA contrast targets in both themes.

### Quality and Delivery

- [x] **QUAL-01**: Semantic landmarks, headings, keyboard focus, and accessible labels exist.
- [x] **QUAL-02**: SEO title, description, and basic Open Graph metadata exist.
- [x] **QUAL-03**: Component and theme tests pass.
- [x] **QUAL-04**: ESLint and TypeScript production build pass.
- [ ] **DEPLOY-01**: Latest `dist/` is deployed to the configured MilesWeb/cPanel application.
- [ ] **DEPLOY-02**: Production URL passes `scripts/deploy-smoke.sh` and manual viewport review.

## Deferred

- Deeper project case studies with architecture diagrams made only from public/personal material
- Optional analytics after a privacy review
- Additional ambient visual modes only if performance and content legibility remain unchanged
- Contact form only if a secure mail service is selected

---
*Earlier WebGL multi-theme requirements were superseded by the 2026-09-24 design decision recorded in `PROJECT.md` and `UI-REVAMP-2026-09.md`.*
