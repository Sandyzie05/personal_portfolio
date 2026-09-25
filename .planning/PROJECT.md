# Sandeep Gupta — Engineering Portfolio

## What This Is

A public, single-page portfolio for recruiters, hiring managers, engineers, and potential collaborators. It tells one coherent story across software engineering, SRE/DevOps, developer platforms, and applied AI.

## Core Value

A visitor should understand within one screen that Sandeep builds software systems that are reliable in production, useful to other engineers, and informed by practical AI experience.

## Audience

- Engineering and platform leaders evaluating technical depth and scope
- Recruiters evaluating role fit and career progression
- Engineers evaluating projects, interests, and collaboration potential

## Content Sources

- Current resume: `~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`
- Public GitHub projects under `Sandyzie05`
- Manually curated LinkedIn profile details and recommendation excerpts
- Local project research and recent work history, published only after generalization

## Product Decisions

- The hero is a full-bleed systems-topology poster with one dominant message.
- The site's three pillars are Software Engineering, SRE & DevOps, and Applied AI.
- Personal projects link to public repositories; employer work is described as generalized case studies with no internal links or names.
- Light and dark themes are both first-class, persisted locally, and available from every viewport.
- Motion is restrained to hierarchy and affordance, with `prefers-reduced-motion` support.
- Earlier four-theme WebGL background plans are superseded. They added runtime weight and visual competition without strengthening the portfolio's core message.

## Constraints

- React + TypeScript + Vite static SPA
- Node.js 18+ shared-host compatibility
- Dependency-free production server
- No runtime LinkedIn/GitHub API dependency
- No confidential employer implementation details

## Success Criteria

- First viewport communicates name, disciplines, positioning, and a clear route into work.
- Enterprise and personal work demonstrate platform, reliability, software, and AI interests.
- Full experience, education, certifications, recommendations, resume, and contact routes remain available.
- Responsive navigation, visible focus, 44px controls, sufficient contrast, and reduced-motion behavior work.
- Tests, lint, production build, and deployment smoke check pass.

---
*Updated: 2026-09-24 after portfolio redesign and content-safety review.*
