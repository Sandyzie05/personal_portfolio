# Phase 1: App Shell, Content & Deployment - Context

**Gathered:** 2026-07-19
**Status:** Ready for planning

<domain>
## Phase Boundary

A visitor can browse Sandeep's full professional story — hero, about, experience, projects, skills, certifications, education, contact, social proof — through a responsive site shell on the live, deployed MilesWeb site. No background animation work happens in this phase (that's Phase 2/3); this phase is content + shell + deployment pipeline only.

</domain>

<decisions>
## Implementation Decisions

### Content Curation
- **D-01:** Resume PDF (`~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`) is used as-is as the source of truth for About, Experience, Skills, Certifications, and Education content — no additional content synthesis beyond what's in the resume.
- **D-02:** The 3-6 curated GitHub project cards (PROJ-01) will be picked by the user from `github.com/Sandyzie05` (~30 public repos) rather than Claude selecting them.
- **D-03:** The 2-3 LinkedIn recommendation quotes (SOCIAL-01) will be manually transcribed and supplied by the user (with recommender name/title), not scraped or invented.
- **D-04:** Both D-02 and D-03 content have not yet been supplied as of context-gathering time — see Deferred/pre-execution dependencies below. Executor should treat these as blocking inputs for the Projects and Social Proof sections specifically, not for the rest of the phase.

### Deployment Specifics
- **D-05:** Deployment mirrors the `jagdamba_automobiles` pattern exactly: React + TypeScript + Vite SPA built to `dist/`, served at runtime by a dependency-free Node `app.js` using only `node:http`/`node:fs`/`node:path`/`node:url` — no Vite/esbuild/WASM at runtime (CloudLinux LVE constraint).
- **D-06:** A new cPanel Node.js "application root" is created for this project (separate from `jagdamba_automobiles`'s), following the same manual build-and-upload process as the reference project (no CI/CD auto-deploy in v1, matching the reference's proven flow).
- **D-07:** Node engines target `^18.0.0 || >=20.0.0` to match the reference project and MilesWeb's available Node selector options.
- **D-08:** Target domain/subdomain and the new GitHub repo name are not yet finalized — see Deferred/pre-execution dependencies below.

### Visual Design Direction
- **D-09 (Claude's Discretion):** Default to a dark-mode-first, modern/minimalist, technical-professional aesthetic (clean sans-serif type, generous whitespace, card-based section layouts) — this pairs naturally with full-bleed WebGL backgrounds across all 4 themes and fits an SRE/platform-engineer's professional register. This is a starting default, not a locked spec.
- **D-10:** Full visual system detail (exact palette, type scale, spacing system, component styling) is deferred to `/gsd-ui-phase 1`, which produces a dedicated UI-SPEC.md — this phase's discussion only sets the high-level direction so planning/research aren't unguided.

### Claude's Discretion
- Exact color palette, type scale, and component-level styling (deferred to UI-SPEC.md per D-10).
- Section ordering/visual hierarchy within the single-page app shell, as long as hero renders first and contact/footer renders last.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — full v1 requirement list; Phase 1 covers HERO-01, ABOUT-01, EXP-01, EXP-02, PROJ-01/02/03, SKILL-01/02, CERT-01, EDU-01, CONTACT-01–04, SOCIAL-01, DEPLOY-01
- `.planning/ROADMAP.md` §"Phase 1: App Shell, Content & Deployment" — phase goal and success criteria
- `.planning/PROJECT.md` — business context, content sources, key decisions log
- `.planning/STATE.md` — current blockers (GitHub repo triage, LinkedIn recommendation permissions)

### Tech Stack & Deployment
- `.claude/CLAUDE.md` — full stack decisions (React 19.2.7, TypeScript 6.0.x, Vite ^6.3.6, R3F/drei versions for later phases, MilesWeb/cPanel hosting constraints, Node engines range)
- `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles` (local reference project) — proven deployment pattern to mirror verbatim: Vite build → `dist/` + dependency-free Node `app.js` server

### Content Source
- `~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf` — resume, source of truth for About/Experience/Skills/Certifications/Education content
- `https://github.com/Sandyzie05` — GitHub profile for project curation (PROJ-01)
- `https://www.linkedin.com/in/sandeepguptauou17/` — LinkedIn profile (CONTACT-02) and source for recommendation quotes (SOCIAL-01)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet in this repo — Phase 1 is the first phase, no existing app code.
- `jagdamba_automobiles`'s `app.js` (dependency-free Node static server) is a direct copy-and-adapt candidate for this project's production server.

### Established Patterns
- `jagdamba_automobiles` establishes the cPanel Node.js deployment shape (Vite build output served by a hand-rolled static file server) — this phase's DEPLOY-01 work should follow that shape exactly rather than inventing a new one.

### Integration Points
- N/A — no existing system to integrate with; this phase establishes the app shell from scratch.

</code_context>

<specifics>
## Specific Ideas

- Portfolio is professional-content-only for v1; no personal/hobby content (already locked in PROJECT.md, restated here as a scope fence).
- Site is a single-page app shell with distinct content sections (hero, about, experience, projects, skills, certifications, education, contact, social proof) rather than multiple routed pages — consistent with "portfolio" conventions and simplest to build fast per the user's stated timeline priority.

</specifics>

<deferred>
## Deferred Ideas

- **Pre-execution content dependency:** User to supply the 3-6 chosen `Sandyzie05` repos (title, description, tech tags — or raw repo URLs for Claude to draft descriptions from) before/during Phase 1 execution's Projects section work.
- **Pre-execution content dependency:** User to supply 2-3 LinkedIn recommendation quotes (verbatim text + recommender name/title) before/during Phase 1 execution's Social Proof section work.
- **Pre-execution deployment dependency:** Confirm target domain/subdomain and new GitHub repo name before the DEPLOY-01 execution step (not needed for earlier content/shell work).
- Detailed visual design system (palette, type scale, spacing, component styling) — belongs to `/gsd-ui-phase 1`, not this content-focused discuss-phase.
- Live GitHub API stats, deeper case-study writeups, blog/articles section, contact form — already tracked as v2/out-of-scope in REQUIREMENTS.md; restated here only to confirm they didn't resurface as scope creep during this discussion.

### Reviewed Todos (not folded)
None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-App Shell, Content & Deployment*
*Context gathered: 2026-07-19*
