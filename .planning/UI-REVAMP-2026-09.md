# UI Revamp — 2026-09

## Design Thesis

Quiet systems cockpit meets personal field journal: technical, legible, and specific to an engineer who builds and operates platforms. One topology image carries the visual boldness; the remaining interface stays disciplined.

## Research Used

- Current two-page platform-engineering resume
- Existing portfolio research on recruiter scanning, performance, hosting, and content architecture
- Public personal-project documentation for Personal AI Vault, Stock Research System, CBSE AI Tutor, CompliOS, Touch-first Retail CRM, and Jagdamba Automobiles
- Recent enterprise work themes around an AI agent harness, GitOps control-plane scaling, deployment workflows, CI/CD standards, and rollout readiness
- Apple HIG foundations for accessibility, layout, typography, color, dark mode, motion, branding, and buttons, translated to the web

LinkedIn could not be fetched live in this environment. Existing manually transcribed profile information and recommendation excerpts remain the source for that material.

## Content Safety Boundary

Enterprise research informed only these public themes:

- AI task routing, reusable skills/evaluations, isolated execution, and observability
- GitOps scaling, sharding, migration safety, and progressive delivery
- Self-service delivery, CI/CD standards, infrastructure access, cost, and reliability feedback

Public copy excludes internal project names, repo links, service names, URLs, architecture specifics, customer data, and exact internal scale/capacity figures. A component test checks known internal names are absent from enterprise case studies.

## Design System

### Signature

Systems topology hero plus a continuous trace metaphor across work numbering and the career timeline. This belongs to the subject: it visualizes the relationship between software, infrastructure, and AI without pretending to be a live production diagram.

### Color

| Role | Light | Dark | Verified contrast |
| --- | --- | --- | --- |
| Background | `#F4F7FB` | `#07111F` | — |
| Primary text | `#0B1220` | `#F5F8FC` | 17.42:1 / 17.78:1 |
| Secondary text | `#42526B` | `#AAB9CC` | 7.37:1 / 9.49:1 |
| Accent | `#005FCC` | `#75AEFF` | 5.57:1 / 8.35:1 |
| Primary action | white on `#005FCC` | `#07111F` on `#75AEFF` | 5.98:1 / 8.35:1 |

### Type

- Display/body: Inter with system fallbacks
- Utility labels/data: JetBrains Mono with system monospace fallbacks
- Body floor: 16px; touch controls: 44px minimum

### Motion

- Hero image and copy entrance establish hierarchy.
- Supported browsers show a thin scroll-progress signal.
- Project rows lift and external arrows move on hover/focus.
- `prefers-reduced-motion` removes nonessential animation and smooth scrolling.

## Quality Review

- Responsive CSS covers desktop, tablet, and mobile layouts.
- Navigation, theme toggle, links, and buttons expose visible focus states.
- Hero image is decorative and excluded from the accessibility tree.
- Dark/light preference persists in local storage and is applied before React mounts to prevent theme flash.
- Production build has no WebGL or animation-library dependency.

## Verification

- `npm test` — 11 files / 20 tests passed
- `npm run lint` — passed
- `npm run build` — passed
- Browser screenshot QA unavailable because no browser surface/runtime was present; production viewport inspection remains in launch phase.
