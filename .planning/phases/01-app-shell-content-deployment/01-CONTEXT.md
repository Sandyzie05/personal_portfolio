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
- **D-02:** PROJ-01's 6 featured repos are locked: `acksync`, `acksync_crm_lmb`, `stock_predictor`, `jagdamba_automobiles`, `cbse_tutor`, `compliOS` (all under `github.com/Sandyzie05`). Descriptions and tech tags still need to be drafted from each repo's actual content during research/planning — not fabricated from name alone.
- **D-03:** SOCIAL-01's 3 recommendation quotes are locked (selected from 6 the user supplied) — see `<specifics>` for full text/attribution. 3 alternates (Kevin Estes, Kharb Pradeep, Clark Baker) were not selected but are easy swaps if the user prefers different ones later.
- **D-04:** Quotes are lightly trimmed of LinkedIn UI chrome (connection degree, date, relationship line, "All LinkedIn membersOn" boilerplate) — praise text itself is kept verbatim per the user's instruction to use only name + company from the raw paste.

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

### PROJ-01 — Featured Repos (locked list)
`github.com/Sandyzie05/{repo}` for each of: `acksync`, `acksync_crm_lmb`, `stock_predictor`, `jagdamba_automobiles`, `cbse_tutor`, `compliOS`. Card copy (description, tech tags) to be drafted from each repo's README/content during research/planning — do not invent details from the name alone.

### SOCIAL-01 — Recommendation Quotes (locked selection, 3 of 6 supplied)

**Ankit Agnihotri — Sr. Site Reliability Engineer, Adobe**
> "Sandeep is an amazing colleague. He is filled with outstanding leadership qualities. His attitude towards work and his co-workers is commendable. He is strong in will power to take the very first step to change the monotonous system."

**Nathan Stewart — Lead DevOps Engineer, Five9**
> "Sandeep has great passion to learn and fulfill his responsibilities to the best of his ability. While working on my team, he never ceased to give 100 percent effort until the task or project was complete."

**Rebecca Cengiz-Robbs — IT Infrastructure & Project Management Professional**
> "Sandeep is one of the most motivated and hardworking engineers I know. I never had to worry about his daily work or projects. He owned his work completely and consistently met deadlines and provided excellent communication and support to our internal customers. He invested many hours of his personal time to research and learn new technologies to help him succeed. It was an honor to work with Sandeep."

**Not selected (alternates on file if a swap is wanted):** Kevin Estes (managed Sandeep directly — "self starter... dug into issues"), Kharb Pradeep (Cloud Consultant, Azure/AWS — "dedicated and talented IT professional"), Clark Baker (Senior Software Engineer, Carbonite — monitoring-software collaboration story).

</specifics>

<deferred>
## Deferred Ideas

- **Resolved:** Repo list (D-02) and recommendation quotes (D-03) supplied by user on 2026-07-19 — no longer a pre-execution dependency. Only card copy for the 6 repos (description/tags) remains to be drafted from actual repo content during research/planning.
- **Pre-execution deployment dependency:** Confirm target domain/subdomain and new GitHub repo name before the DEPLOY-01 execution step (not needed for earlier content/shell work).
- Detailed visual design system (palette, type scale, spacing, component styling) — belongs to `/gsd-ui-phase 1`, not this content-focused discuss-phase.
- Live GitHub API stats, deeper case-study writeups, blog/articles section, contact form — already tracked as v2/out-of-scope in REQUIREMENTS.md; restated here only to confirm they didn't resurface as scope creep during this discussion.

### Reviewed Todos (not folded)
None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-App Shell, Content & Deployment*
*Context gathered: 2026-07-19*
