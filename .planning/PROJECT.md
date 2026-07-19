# Sandeep Gupta — Portfolio

## What This Is

A personal portfolio website for Sandeep Gupta, a Senior Site Reliability Engineer / platform engineer at Adobe, built to showcase his professional experience, projects, and skills to recruiters, hiring managers, and his professional network. The site's signature feature is a full-bleed, low-opacity animated background — the user picks a theme (Computers, AI/Neural Network, Space, or Human Evolution) from the top nav, and the animation dynamically assembles/disassembles as they scroll and move their mouse, while the portfolio content itself always stays legible and front-and-center.

## Core Value

A visitor immediately understands Sandeep's professional depth (experience, projects, skills) through a portfolio that is memorable and technically impressive — the interactive background must always serve the content, never compete with it.

## Business Context

- **Customer**: Recruiters, hiring managers, and professional network contacts evaluating Sandeep for roles/collaboration
- **Revenue model**: N/A — personal brand/portfolio, not monetized
- **Success metric**: Visitor engagement (time on site, scroll depth) and contact/outreach initiated after a visit
- **Strategy notes**: None

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero/landing section introduces Sandeep as a Senior SRE/platform engineer with a strong first impression
- [ ] About section synthesizes a professional summary from resume content
- [ ] Experience section covers full professional history from resume (Adobe/Workfront and prior roles) with achievements and impact
- [ ] Projects section surfaces relevant GitHub repos from `Sandyzie05` with descriptions, tech tags, and links
- [ ] Skills section organized by category (cloud/infra, IaC, GitOps/DevOps tooling, observability, languages, AI tooling, etc.) pulled from resume
- [ ] Certifications section (e.g. PCAP, Jenkins Engineer, AWS CSAA, MS Azure fundamentals, ITIL V3, Datadog) from resume
- [ ] Education section (MS Information Systems, BTech CS) from resume
- [ ] Contact section/mechanism (email, LinkedIn, GitHub links, and/or contact form)
- [ ] Theme picker in top nav offering 4 v1 themes: Computers, AI/Neural Network, Space, Human Evolution
- [ ] Each theme drives a full-bleed, low-opacity animated background that assembles/disassembles in reaction to scroll position and mouse movement
- [ ] User-facing control to adjust background opacity
- [ ] Background never obscures or competes with portfolio content legibility
- [ ] Site deployed to MilesWeb (cPanel Node.js hosting) using the same deployment pattern as `jagdamba_automobiles` (dependency-free Node `app.js` entrypoint serving a Vite-built `dist/`)

### Out of Scope

- Personal (non-professional) content/sections (hobbies, personal photos, non-work interests) — explicitly deferred by the user to a future phase; v1 is professional-content-only
- Chess theme (and any background themes beyond the 4 selected) — deferred as a v2 candidate; user selected Computers, AI/Neural Network, Space, and Human Evolution for v1
- Live/authenticated LinkedIn integration — LinkedIn has no public scraping-friendly API; profile content will be manually referenced/transcribed into the site rather than fetched live

## Context

- Sandeep Gupta is a Senior Site Reliability Engineer at Adobe (Workfront), with a background spanning platform engineering, Kubernetes/ArgoCD at scale, observability (Datadog/OpenTelemetry), CI/CD, and increasingly AI-driven tooling. Full history and detail available in his resume.
- Content sources for v1: resume PDF (`~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`, full text already captured), GitHub profile `https://github.com/Sandyzie05` (username `Sandyzie05`, ~30 public repos, no bio/company set on the profile itself — repo list not yet enumerated), LinkedIn `https://www.linkedin.com/in/sandeepguptauou17/`. General web research may supplement supporting links/images as needed.
- Deployment reference: `jagdamba_automobiles` (local: `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles`, GitHub: `https://github.com/Sandyzie05/jagdamba_automobiles`) is the proven pattern for this exact hosting setup — a React + TypeScript + Vite SPA built to `dist/`, served at runtime by a dependency-free Node `app.js` (uses only `node:http`/`node:fs`/`node:path`/`node:url`) inside a single cPanel Node.js "application root" directory. This avoids running Vite/esbuild at runtime, which fails on MilesWeb's CloudLinux shared hosting because the LVE can't allocate WebAssembly memory.
- MilesWeb domain is already configured; deployment is expected to mirror `jagdamba_automobiles` exactly — create a new cPanel Node.js app project and upload/deploy this new GitHub repo the same way.
- The theme-switchable, scroll+mouse-reactive assemble/disassemble background animation is a novel technical feature for this user (not present in `jagdamba_automobiles`) — the concrete rendering approach (Canvas2D vs. WebGL/Three.js/React Three Fiber vs. CSS/SVG) is not yet decided and is a candidate for research before requirements/roadmap are finalized.

## Constraints

- **Hosting**: MilesWeb shared hosting via cPanel, Node.js only (engines `^18.0.0 || >=20.0.0` to match `jagdamba_automobiles`) — CloudLinux LVE cannot allocate WebAssembly memory at runtime, so the production server must stay dependency-free (no Vite/esbuild/WASM at runtime)
- **Tech stack**: Node.js-based stack required by hosting; React + TypeScript + Vite is the strong default given it matches the proven `jagdamba_automobiles` pattern and the user's existing familiarity
- **Timeline**: Ship v1 (full professional content + 4-theme interactive background) as fast as reasonably possible — user explicitly prioritized speed over broader scope
- **Content**: Personal (non-professional) content is explicitly out of scope for v1 and must not be added without a future, separate scoping decision

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Ship 4 background themes in v1 (Computers, AI/Neural Network, Space, Human Evolution); Chess deferred to v2 | User picked all 4 in the themes multi-select, taking priority over an earlier "2-3 themes" answer; flagship feature warranted the fuller set | — Pending |
| Background reacts to both scroll position and mouse movement | User wants an immersive, exploratory feel rather than a single-trigger animation | — Pending |
| Background is full-bleed and low-opacity with a user-facing opacity control | Keeps portfolio content always legible/primary per user's explicit requirement, while still delivering an "enjoyable" experience | — Pending |
| Reuse `jagdamba_automobiles`'s MilesWeb/cPanel deployment pattern (Vite build + dependency-free Node `app.js` server) verbatim | Proven working pattern on this exact host; avoids the WebAssembly memory limitation on CloudLinux shared hosting that rules out running Vite/esbuild at runtime | — Pending |
| v1 includes as much real professional content as possible across every section (not a trimmed teaser) | User explicitly wants maximal content now and plans to iterate/update sections later rather than launch thin | — Pending |
| Personal (non-professional) content deferred entirely to a future phase | User explicitly separated this out during questioning to keep phase 1 focused and shippable fast | — Pending |

---
*Last updated: 2026-07-18 after initial questioning*
