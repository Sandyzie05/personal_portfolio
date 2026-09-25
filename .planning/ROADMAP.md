# Roadmap: Sandeep Gupta — Engineering Portfolio

## Current Milestone

Ship the redesigned portfolio with accurate public content, explicit confidentiality boundaries, strong accessibility, and a verified production deployment.

## Phases

- [x] **Phase 1: Content foundation** — Resume/profile content, public projects, experience, credentials, recommendations, and contact routes.
- [x] **Phase 2: UI/UX redesign** — New art direction, generalized enterprise case studies, topology hero, responsive layout, light/dark themes, accessibility, tests, and documentation.
- [ ] **Phase 3: Launch verification** — Deploy current `dist/`, run HTTP smoke checks, inspect desktop/mobile light/dark views, and repair any production-only issues.

## Phase 2 Exit Evidence

- `npm test`: 11 files / 20 tests passing
- `npm run lint`: passing
- `npm run build`: passing
- Current resume synchronized to `public/resume.pdf`
- Hero artwork included in production build
- Enterprise-work privacy regression test added

## Phase 3 Checklist

1. Publish latest commit/build through existing cPanel workflow.
2. Run `bash scripts/deploy-smoke.sh <production-url>`.
3. Verify hero image, resume response, theme persistence, navigation, and outbound links.
4. Inspect 390px, 768px, and 1440px widths in light and dark themes.
5. Run Lighthouse accessibility/performance checks and record results.

## Later Options

- Deep public case studies for Personal AI Vault and Stock Research System
- Short technical writing section if there is a sustainable publishing cadence
- Privacy-conscious engagement analytics

---
*Updated: 2026-09-24.*
