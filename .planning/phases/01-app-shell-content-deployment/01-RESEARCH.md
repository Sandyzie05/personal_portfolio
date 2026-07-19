# Phase 1: App Shell, Content & Deployment - Research

**Researched:** 2026-07-19
**Domain:** React + TypeScript + Vite single-page portfolio shell, static hand-curated content, dependency-free Node deployment to MilesWeb/cPanel
**Confidence:** HIGH (deployment pattern verified against local reference project + live npm registry checks; content sourced directly from resume PDF and live GitHub repo reads this session)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Resume PDF (`~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`) is used as-is as the source of truth for About, Experience, Skills, Certifications, and Education content — no additional content synthesis beyond what's in the resume.
- **D-02:** PROJ-01's 6 featured repos are locked: `acksync`, `acksync_crm_lmb`, `stock_predictor`, `jagdamba_automobiles`, `cbse_tutor`, `compliOS` (all under `github.com/Sandyzie05`). Descriptions and tech tags still need to be drafted from each repo's actual content during research/planning — not fabricated from name alone.
- **D-03:** SOCIAL-01's 3 recommendation quotes are locked (Ankit Agnihotri, Nathan Stewart, Rebecca Cengiz-Robbs). 3 alternates on file if a swap is wanted.
- **D-04:** Quotes are lightly trimmed of LinkedIn UI chrome — praise text itself is kept verbatim.
- **D-05:** Deployment mirrors the `jagdamba_automobiles` pattern exactly: React + TypeScript + Vite SPA built to `dist/`, served at runtime by a dependency-free Node `app.js` using only `node:http`/`node:fs`/`node:path`/`node:url` — no Vite/esbuild/WASM at runtime (CloudLinux LVE constraint).
- **D-06:** A new cPanel Node.js "application root" is created for this project (separate from `jagdamba_automobiles`'s), following the same manual build-and-upload process as the reference project (no CI/CD auto-deploy in v1).
- **D-07:** Node engines target `^18.0.0 || >=20.0.0` to match the reference project and MilesWeb's available Node selector options.
- **D-08:** Target domain/subdomain and the new GitHub repo name are not yet finalized — see Open Questions below.
- **D-09 (Claude's Discretion):** Default to a dark-mode-first, modern/minimalist, technical-professional aesthetic — a starting default, not a locked spec.
- **D-10:** Full visual system detail (palette, type scale, spacing, component styling) is deferred to `/gsd-ui-phase 1` (UI-SPEC.md).

### Claude's Discretion

- Exact color palette, type scale, and component-level styling (deferred to UI-SPEC.md per D-10).
- Section ordering/visual hierarchy within the single-page app shell, as long as hero renders first and contact/footer renders last.

### Deferred Ideas (OUT OF SCOPE)

- Detailed visual design system — belongs to `/gsd-ui-phase 1`.
- Live GitHub API stats, deeper case-study writeups, blog/articles section, contact form — v2/out-of-scope, confirmed not resurfacing as scope creep.
- Personal (non-professional) content — explicitly out of scope for v1.
- Background/theme animation work of any kind — that's Phase 2/3; this phase builds the shell content only, against a static/placeholder background area.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Hero introduces Sandeep with name/title/one-line positioning | Resume professional summary captured verbatim below; `content/hero.ts` pattern |
| ABOUT-01 | About synthesizes professional summary from resume | Full resume text captured this session (see Content Source Data) |
| EXP-01 | Full professional history in timeline/chronological format | All 8 roles + dates extracted from resume, chronological order confirmed |
| EXP-02 | Quantified achievements per role, not just responsibilities | Adobe/Carbonite/Workfront bullet points already contain quantified metrics — extracted verbatim below |
| PROJ-01 | 3-6 curated GitHub repo cards | 6 locked repos fetched live via WebFetch this session — description/tech stack per repo documented below |
| PROJ-02 | Static/hand-curated at build time, no live GitHub API calls | `content/projects.ts` static data module pattern (Don't Hand-Roll + Architecture sections) |
| PROJ-03 | Each card links to its GitHub repo | Verified repo URLs; external-link `rel="noopener noreferrer"` pattern documented in Pitfalls |
| SKILL-01 | Skills grouped by category | Resume's 8 skill categories extracted verbatim below |
| SKILL-02 | Category/tag grouping, not skill-bar graphics | Already an established project-level decision (REQUIREMENTS.md); confirmed no additional research needed |
| CERT-01 | Certifications list | 6 certifications extracted verbatim from resume below |
| EDU-01 | Education list | 2 degrees extracted verbatim from resume below |
| CONTACT-01 | Direct email link | `mailto:` pattern + encoding pitfall documented below |
| CONTACT-02 | LinkedIn profile link | External link pattern (target/rel) documented below |
| CONTACT-03 | GitHub profile link | Same external link pattern |
| CONTACT-04 | One-click resume PDF download | `<a download>` same-origin requirement + custom server `.pdf` MIME gap (found this session) documented in Pitfalls |
| SOCIAL-01 | 2-3 transcribed recommendation quotes | Quotes already locked in CONTEXT.md; `content/testimonials.ts` pattern |
| DEPLOY-01 | Deploy via `jagdamba_automobiles` dependency-free Node pattern | Full `app.js`/`vite.config.ts`/`package.json` reference read this session; version-compatibility corrections documented below |

</phase_requirements>

## Summary

This phase has almost no novel technical risk — it is a content-and-shell build on a deployment pattern that already runs in production for `jagdamba_automobiles`. The real research value this session came from three places: (1) reading the actual resume PDF and all 6 locked GitHub repos to ground the content data instead of guessing, (2) re-verifying every recommended npm package version against the live registry rather than trusting the project's existing (day-old) `STACK.md`/`CLAUDE.md`, which surfaced a real and currently-active ecosystem trap — several tools' *latest* releases (`vite@8`, `@vitejs/plugin-react@5`/`6`, `eslint@10`, `vitest@4`, `jsdom@27+`) have quietly bumped their own Node engine floor to `20.19+`/`22.12+`, which is incompatible with this project's locked `^18.0.0 || >=20.0.0` engines target — and (3) directly reading `jagdamba_automobiles/app.js` line by line, which surfaced two concrete, fixable gaps in the exact pattern this phase is told to mirror: no MIME type for `.pdf` (which will silently break CONTACT-04's one-click resume download) and no path-containment check on the static file server (a path-traversal exposure).

**Primary recommendation:** Build a single-page React 19 + TypeScript + Vite 6.3.6 SPA with content isolated into typed `content/*.ts` data modules consumed by presentational `sections/*.tsx` components (no router, no CMS, no runtime GitHub API calls), reuse `jagdamba_automobiles/app.js` as the deployment server but patch in a `.pdf` MIME entry and a path-containment check before first deploy, and pin the exact dependency versions below rather than "latest" to stay inside the Node 18 engines floor.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero/About/Experience/Skills/Certs/Education content rendering | Browser / Client | — | Pure static React render from build-time data; no server round-trip |
| Projects section (card data) | Browser / Client | Build-time data | PROJ-02 explicitly forbids runtime GitHub API calls — data is baked into the JS bundle at build time, not fetched |
| Contact links (email/LinkedIn/GitHub) | Browser / Client | — | Plain anchor tags; `mailto:` is handled entirely by the OS/browser, no backend needed |
| Resume PDF download | CDN / Static | Browser / Client | The PDF is a static asset served byte-for-byte by the Node static server; the browser's `download` attribute triggers the save, no processing involved |
| Recommendation quotes (SOCIAL-01) | Browser / Client | — | Static content module, identical treatment to other content sections |
| Static file serving / SPA host | CDN / Static | — | `app.js` is a minimal static-file server, not an application backend — no business logic, sessions, or database |
| Deployment build pipeline | Build-time (dev machine) | — | `vite build` runs on the developer's machine or the cPanel shell during setup; never at request-time (this is the whole point of the CloudLinux LVE constraint) |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.2.7 | UI framework | `[VERIFIED: npm registry]` — current stable, matches `CLAUDE.md`'s existing recommendation, re-confirmed live this session |
| react-dom | 19.2.7 | DOM renderer | `[VERIFIED: npm registry]` — same as above |
| vite | 6.3.6 | Build tool/dev server | `[VERIFIED: npm registry]` — engines `^18.0.0 \|\| ^20.0.0 \|\| >=22.0.0`. **Do not use `vite@8.1.5`** (current `latest` tag) — its engines are `^20.19.0 \|\| >=22.12.0`, incompatible with this project's locked Node 18 floor (D-07) |
| typescript | 6.0.3 | Type safety | `[VERIFIED: npm registry]` — corrects `CLAUDE.md`'s listed `6.0.1` (that version only exists as `6.0.1-rc`; `6.0.3` is the actual latest stable 6.0.x patch). Confirmed within `typescript-eslint@8.64.0`'s supported range (`>=4.8.4 <6.1.0`) |
| @vitejs/plugin-react | 4.7.0 | Vite/React integration | `[VERIFIED: npm registry]` — **do not use the `latest` tag (`6.0.3`)**: its peer requirement is `vite: "^8.0.0"` and its own engines are `^20.19.0 \|\| >=22.12.0`, both incompatible with this project's vite/Node pins. `4.7.0` is the last version in the 4.x line, supports `vite: "^4.2.0 \|\| ^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0"`, and keeps engines at `^14.18.0 \|\| >=16.0.0` (Node-18-safe) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | 12.42.2 | UI micro-interactions (hover/press states, section fade-ins) | `[VERIFIED: npm registry]` peer `react: "^18.0.0 \|\| ^19.0.0"` — matches the version already proven in `jagdamba_automobiles` (`^12.38.0`). Optional for this phase; do not use it to drive canvas/WebGL uniforms (that's Phase 2's job) |
| eslint | 9.39.1 | Linting | `[VERIFIED: npm registry]` — **do not use `eslint@10.7.0`** (`latest` tag): its own engines are `^20.19.0 \|\| ^22.13.0 \|\| >=24`, incompatible with Node 18. `9.39.1` is the latest 9.x patch, engines `^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0` (Node 18.18+ compatible; confirm local/CI Node ≥18.18, not just ≥18.0) |
| @eslint/js | 9.39.5 | Flat-config recommended rules | `[VERIFIED: npm registry]` — pin to the 9.x line to match `eslint@9.39.1` |
| typescript-eslint | 8.64.0 | TS-aware lint rules | `[VERIFIED: npm registry]` peer `eslint: "^8.57.0 \|\| ^9.0.0 \|\| ^10.0.0"`, `typescript: ">=4.8.4 <6.1.0"` — compatible with both pins above |
| eslint-plugin-react-hooks | 7.1.1 | Hooks lint rules | `[VERIFIED: npm registry]` peer includes `eslint: "...^9.0.0 \|\| ^10.0.0"` |
| eslint-plugin-react-refresh | 0.5.3 | Vite HMR lint rule | `[VERIFIED: npm registry]` peer `eslint: "^9 \|\| ^10"` |
| globals | 17.7.0 | Flat-config global defs | `[VERIFIED: npm registry]` — pure data package |
| @types/react | 19.2.17 | React 19 types | `[VERIFIED: npm registry]` |
| @types/react-dom | 19.2.3 | React-DOM 19 types | `[VERIFIED: npm registry]` |
| vitest | 3.2.4 | Test runner | `[VERIFIED: npm registry]` — **do not use `vitest@4.1.10`** (`latest`): its own engines are `^20.0.0 \|\| ^22.0.0 \|\| >=24.0.0`. `3.2.4`'s engines are `^18.0.0 \|\| ^20.0.0 \|\| >=22.0.0` and its `vite` dependency range (`^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0-0`) matches the pinned `vite@6.3.6` |
| jsdom | 26.1.0 | DOM environment for Vitest | `[VERIFIED: npm registry]` — **do not use `jsdom@27+`**, which requires Node ≥20. `26.1.0` engines are `>=18` |
| @testing-library/react | 16.3.2 | Component testing | `[VERIFIED: npm registry]` engines `>=18`, peer `react`/`react-dom: "^18.0.0 \|\| ^19.0.0"` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Anchor-based single-page nav (no router) | `react-router` | Rejected per CONTEXT.md's locked "single-page app shell with sections" decision — a router adds complexity with no benefit for a one-page portfolio |
| Static `content/*.ts` data modules | Headless CMS (Contentful, Sanity) | Rejected — PROJ-02 explicitly requires build-time static content with zero runtime API calls; a CMS would violate that and add an external service dependency with no upside for a single-owner personal site |
| Reusing `jagdamba_automobiles/app.js` static server (patched) | Express + `serve-static` + `mime-types` | Rejected — adds runtime dependencies, which is exactly what the CloudLinux LVE constraint (D-05) forbids; the dependency-free pattern only needs ~5 lines of patching (see Pitfalls) to close its gaps |
| Vitest + Testing Library | Jest + Testing Library | Vitest is the natural pairing with Vite (shares config/transform pipeline, faster in this stack) — Jest would require a separate transform/config layer for no benefit here |

**Installation:**
```bash
# Core
npm install react@19.2.7 react-dom@19.2.7

# Optional UI polish
npm install framer-motion@12.42.2

# Dev toolchain (Node-18-safe pins — do NOT let npm resolve to "latest" on these)
npm install -D vite@6.3.6 @vitejs/plugin-react@4.7.0 typescript@6.0.3 \
  eslint@9.39.1 @eslint/js@9.39.5 typescript-eslint@8.64.0 \
  eslint-plugin-react-hooks@7.1.1 eslint-plugin-react-refresh@0.5.3 globals@17.7.0 \
  @types/react@19.2.17 @types/react-dom@19.2.3 \
  vitest@3.2.4 jsdom@26.1.0 @testing-library/react@16.3.2
```

**Version verification:** All versions above were fetched directly against `https://registry.npmjs.org/` on 2026-07-19 (see Environment Availability — this machine's default npm registry is an internal Adobe Artifactory mirror that 403s on these public packages; the public registry must be explicitly targeted, see Pitfall below).

## Package Legitimacy Audit

| Package | Registry | Published (latest) | Weekly Downloads | Source Repo | Verdict | Disposition |
|---------|----------|---------------------|-------------------|--------------|---------|-------------|
| react | npm | 2026-06-01 | 146M | github.com/facebook/react | OK | Approved |
| react-dom | npm | 2026-06-01 | 138M | github.com/facebook/react | OK | Approved |
| vite | npm | 2026-07-16 | 144M | github.com/vitejs/vite | SUS (too-new) | Approved — see rationale |
| typescript | npm | 2026-07-08 | 220M | github.com/microsoft/TypeScript | SUS (too-new) | Approved — see rationale |
| framer-motion | npm | 2026-06-30 | 37M | github.com/motiondivision/motion | SUS (too-new) | Approved — see rationale |
| @vitejs/plugin-react | npm | 2026-06-23 | 68M | github.com/vitejs/vite-plugin-react | SUS (too-new) | Approved — see rationale |
| eslint | npm | 2026-07-10 | 134M | github.com/eslint/eslint | SUS (too-new) | Approved — see rationale |
| typescript-eslint | npm | 2026-07-13 | 74M | github.com/typescript-eslint/typescript-eslint | SUS (too-new) | Approved — see rationale |
| eslint-plugin-react-hooks | npm | 2026-04-17 | 83M | github.com/facebook/react | OK | Approved |
| eslint-plugin-react-refresh | npm | 2026-06-14 | 36M | github.com/ArnaudBarre/eslint-plugin-react-refresh | OK | Approved |
| @eslint/js | npm | 2026-02-06 | 120M | github.com/eslint/eslint | OK | Approved |
| globals | npm | 2026-06-22 | 231M | github.com/sindresorhus/globals | SUS (too-new) | Approved — see rationale |
| @types/react | npm | 2026-06-05 | 128M | github.com/DefinitelyTyped/DefinitelyTyped | OK | Approved |
| @types/react-dom | npm | 2025-11-12 | 104M | github.com/DefinitelyTyped/DefinitelyTyped | OK | Approved |

**Packages removed due to [SLOP] verdict:** none.

**Packages flagged as suspicious [SUS]:** `vite`, `typescript`, `framer-motion`, `@vitejs/plugin-react`, `eslint`, `typescript-eslint`, `globals` — all flagged solely for the `"too-new"` heuristic (their most-recently-published version's timestamp is recent), not for any download/repo-authenticity signal. Every one of these packages has an official, matching GitHub source repo and weekly download counts between 37M and 231M — several orders of magnitude above any realistic slopsquat. This is almost certainly a heuristic false-positive triggered by these projects' normal, frequent release cadence rather than genuine suspicion. **Per protocol this is still flagged, not silently cleared:** the planner should add one lightweight `checkpoint:human-verify` task before the first `npm install` (a 30-second visual check that `package.json` resolves to the exact pinned versions above, not to unexpected newer majors) rather than a deep investigation.

## Architecture Patterns

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│ Browser (client-only, no SSR, single index.html)                    │
│                                                                       │
│  [Visitor loads /]                                                   │
│        │                                                             │
│        ▼                                                             │
│  App.tsx mounts ──▶ TopNav (anchor links: #hero #about #experience   │
│        │            #projects #skills #certs #education #contact)   │
│        │                                                             │
│        ▼                                                             │
│  <main> renders sections in document order, each fed by a            │
│  typed content/*.ts module:                                          │
│                                                                       │
│   content/hero.ts    ──▶ <Hero/>          (HERO-01)                  │
│   content/about.ts   ──▶ <About/>         (ABOUT-01)                 │
│   content/experience.ts ─▶ <Experience/>  (EXP-01, EXP-02)           │
│   content/projects.ts ──▶ <Projects/>     (PROJ-01/02/03) ──▶ github.com links (new tab)
│   content/skills.ts  ──▶ <Skills/>        (SKILL-01/02)              │
│   content/certifications.ts ▶ <Certifications/> (CERT-01)            │
│   content/education.ts ──▶ <Education/>   (EDU-01)                   │
│   content/testimonials.ts ▶ <Testimonials/> (SOCIAL-01)              │
│   content/contact.ts ──▶ <Contact/>       (CONTACT-01..04) ──▶ mailto:, linkedin.com,
│                                                                 github.com, /resume.pdf (download)
│        │                                                             │
│        ▼                                                             │
│  <footer> (site closes here — contact/footer always last per         │
│  Claude's Discretion constraint)                                     │
└────────────────────────────────────────────────────────────────────┘

Build/deploy (identical mechanism to jagdamba_automobiles, patched):
┌──────────────┐   vite build    ┌───────────┐   upload/build   ┌──────────────────────────┐
│ Dev machine   │ ─────────────► │  dist/    │ ───────────────► │ cPanel Node app root:     │
│ React+TS+Vite │                │ (static,  │                  │ app.js (http/fs/path/url  │
│               │                │ + resume  │                  │ only, patched: +.pdf MIME,│
│               │                │  .pdf)    │                  │ +path containment check)  │
└──────────────┘                 └───────────┘                  └──────────────────────────┘
```

### Recommended Project Structure

```
personal_portfolio/
├── app.js                    # Node entry, adapted from jagdamba_automobiles (see Pitfalls for the 2 patches)
├── package.json               # engines: "^18.0.0 || >=20.0.0", main: "app.js"
├── vite.config.ts             # base: TBD per D-08 (see Open Questions)
├── index.html                 # single entry point (no admin.html — this project has no admin panel)
├── .npmrc                      # registry=https://registry.npmjs.org/  (see Pitfalls — required in this environment)
├── public/
│   └── resume.pdf              # served as a static same-origin asset — required for CONTACT-04's <a download>
├── src/
│   ├── content/                 # static, typed data — no JSX, no component logic
│   │   ├── hero.ts
│   │   ├── about.ts
│   │   ├── experience.ts
│   │   ├── projects.ts          # PROJ-02: hand-curated at build time, zero runtime fetches
│   │   ├── skills.ts
│   │   ├── certifications.ts
│   │   ├── education.ts
│   │   ├── testimonials.ts
│   │   └── contact.ts
│   ├── sections/                 # presentational components consuming content/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   ├── Education.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   ├── nav/
│   │   └── TopNav.tsx             # anchor links only this phase — ThemePicker/OpacitySlider are Phase 3
│   ├── App.tsx                    # composes TopNav + <main> sections + footer
│   ├── main.tsx
│   └── index.css / styles.css
└── dist/                          # build output (see jagdamba's README for git-vs-server tracking options)
```

**Forward-compatible on purpose:** this mirrors the `content/` + `sections/` split already established in the project-level `ARCHITECTURE.md` research, deliberately omitting the `backgrounds/`, `theme/`, and `interaction/` directories that belong to Phase 2/3 — those slot in later without touching anything built in this phase, since content components have zero coupling to the (not-yet-built) background/theme system.

### Pattern 1: Content/Presentation Split (data modules never import JSX)

**What:** Every content section's copy lives in a plain `.ts` file exporting a typed object/array (e.g. `export const experience: ExperienceEntry[] = [...]`). The matching `sections/*.tsx` component imports that data and renders it — it contains no hardcoded resume text itself.

**When to use:** Every content section in this phase, without exception.

**Example:**
```ts
// src/content/experience.ts
export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  start: string; // "2021-05-24"
  end: string | 'Present';
  achievements: string[]; // pre-written, quantified bullet points
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Site Reliability Engineer',
    company: 'Adobe',
    location: 'Lehi, Utah',
    start: '2021-05-24',
    end: 'Present',
    achievements: [
      'Built and scaled Adobe Workfront’s Backstage-based Internal Developer Portal for 250+ engineers — a 30-plugin React 18/Node.js platform unifying ArgoCD deployments, Kubernetes rightsizing, Split.io feature flags, SLOs, service maturity, Datadog CCM cost/reliability insights and error-budget health, Vault, Okta SSO, and GitLab CI/CD into a single service-owner view.',
      'Led zero-downtime ArgoCD sharding for 568 ApplicationSets, 4,200+ Applications, and 252 services, splitting one control plane into 4 shards across 8+ repos and delivering a 15x UI latency improvement (10-30s to p95 under 2s) while maintaining 99%+ sync success and ~3x capacity headroom.',
      // ...remaining bullets verbatim from resume, see Content Source Data below
    ],
  },
  // ...remaining 7 roles, chronological, most recent first or last per UI-SPEC discretion
];
```

**Trade-offs:** None meaningful at this scale (single-owner content, <30 entries total across all sections) — this is pure upside (Pitfall 14: content drift is cheaper to fix when content is data, not hardcoded JSX).

### Pattern 2: Accessible Anchor-Section Navigation (no router, no JS scroll hijacking)

**What:** `TopNav` renders plain `<a href="#hero">`, `<a href="#experience">`, etc. Each section root element carries a matching `id`. Smooth scrolling is CSS-only, gated behind a reduced-motion media query; a `scroll-margin-top` on each section compensates for any sticky header.

**When to use:** This phase's entire in-page navigation — no router, no `scrollIntoView()` JS needed.

**Example:**
```css
/* Source: MDN scroll-behavior (developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) */
html {
  scroll-behavior: auto; /* default */
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; } /* must target html/:root, NOT body — body does not propagate to the viewport */
}
section[id] {
  scroll-margin-top: 72px; /* match sticky TopNav height so anchors don't land underneath it */
}
```
```html
<!-- Skip-link: standard WCAG G1 technique, first focusable element in <body> -->
<a href="#main" class="skip-link">Skip to content</a>
<nav aria-label="Primary">
  <a href="#hero">Home</a>
  <a href="#experience">Experience</a>
  <!-- ... -->
</nav>
<main id="main">
  <section id="hero" aria-labelledby="hero-heading">...</section>
  <section id="experience" aria-labelledby="experience-heading">...</section>
</main>
```

**Trade-offs:** `scroll-behavior: smooth` only affects anchor-click/programmatic scrolling, never wheel/trackpad/keyboard-arrow scrolling (per MDN) — this is exactly the desired behavior (don't hijack native scroll), and it means no JS is required at all for this pattern in v1.

### Pattern 3: External Link Safety (target=_blank + rel)

**What:** Every outbound link (GitHub repo cards, LinkedIn/GitHub in Contact) that opens in a new tab sets `rel="noopener noreferrer"` alongside `target="_blank"`.

**When to use:** PROJ-03, CONTACT-02, CONTACT-03 — any `<a>` pointing off-site.

**Example:**
```tsx
<a
  href="https://github.com/Sandyzie05/acksync"
  target="_blank"
  rel="noopener noreferrer"
>
  View on GitHub
</a>
```

**Trade-offs:** None — this is a zero-cost, well-established mitigation for reverse tabnabbing (see Security Domain below); omitting it is the actual anti-pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component/render testing | Custom DOM-diffing assertions | `@testing-library/react` + `vitest` + `jsdom` | Battle-tested, standard pairing for Vite/React; hand-rolled assertions would re-solve a solved problem for no benefit |
| Smooth-scroll easing | Custom `requestAnimationFrame` scroll tweening | CSS `scroll-behavior: smooth` (Pattern 2) | Zero JS, respects `prefers-reduced-motion` structurally, and this phase has no need for scroll-triggered visual choreography (that's optional GSAP work reserved for later phases if ever needed) |
| Static file MIME-type table | A generic auto-detecting file-type library | Extend `jagdamba_automobiles/app.js`'s existing small `MIME` object literal with the missing entries (see Pitfalls) | The CloudLinux LVE constraint (D-05) forbids adding *any* runtime npm dependency to `app.js` — a MIME-detection library would violate the one hard constraint this phase must respect |
| Path-traversal-safe file serving | A full static-file-serving framework (`serve-static`, `express.static`) | A ~5-line `path.resolve` + prefix-check guard added directly to the existing `app.js` (see Pitfalls, Code Examples) | Same reasoning — the fix is small enough that adding a dependency for it would be a worse trade than patching the existing dependency-free file |

**Key insight:** The one recurring theme across all four rows is the same hosting constraint (D-05): this phase must resist the urge to reach for *any* library to patch gaps in the static server, because the entire reason `jagdamba_automobiles`'s pattern exists is to avoid runtime dependencies on CloudLinux LVE. Every fix needed here is small enough to write by hand in the same dependency-free style.

## Common Pitfalls

### Pitfall 1: Local npm registry misconfiguration blocks `npm install` entirely
**What goes wrong:** Running `npm install` in this project on this machine fails with `403 Forbidden` against `artifactory-uw2.adobeitc.com` for every public package (react, vite, everything) — even though the packages exist and are reachable at `registry.npmjs.org`.
**Why it happens:** The global `~/.npmrc` on this machine points `registry` at an internal Adobe Artifactory mirror (verified this session via `npm config get registry`), which does not proxy general public npm packages for a personal, non-Adobe project.
**How to avoid:** Add a project-local `.npmrc` with `registry=https://registry.npmjs.org/` — confirmed this is exactly what `jagdamba_automobiles/.npmrc` already does (37-byte file, verified present in the reference project this session), which is why that project's builds work. Do this as the very first Wave 0 step, before any `npm install`.
**Warning signs:** `npm ERR! code E403` / `403 Forbidden` mentioning `artifactory` in the URL, on a completely standard, correctly-spelled public package name.
**Confidence:** `[VERIFIED: local environment + jagdamba_automobiles/.npmrc]` — reproduced directly this session.

---

### Pitfall 2: "Latest" dev-toolchain versions have silently raised their Node floor above this project's target
**What goes wrong:** Following generic "just install the latest" advice for `vite`, `@vitejs/plugin-react`, `eslint`, `vitest`, or `jsdom` pulls in versions whose own `engines.node` field requires Node `≥20.19`/`≥22.12`/`≥24` — incompatible with this project's locked `^18.0.0 || >=20.0.0` engines target (D-07), which exists specifically to match what MilesWeb's cPanel Node selector offers.
**Why it happens:** Several major frontend-tooling projects bumped their Node floor in recent majors (Vite 7→8, `@vitejs/plugin-react` 4→5→6, ESLint 9→10, Vitest 3→4, jsdom 26→27) — a project scaffolded today by blindly running `npm install vite@latest` etc. would silently drift onto an incompatible toolchain.
**How to avoid:** Use the exact pinned versions in the Standard Stack table above (`vite@6.3.6`, `@vitejs/plugin-react@4.7.0`, `eslint@9.39.1`, `vitest@3.2.4`, `jsdom@26.1.0`), all independently verified this session to (a) support each other via peer/dependency ranges and (b) keep `engines.node` compatible with Node 18.
**Warning signs:** `npm install` warnings about unsupported engine versions; `vite build`/`vite dev` or `vitest` failing to even start locally on Node 18 with a cryptic syntax or runtime error rather than a clear engine-mismatch message.
**Confidence:** `[VERIFIED: npm registry]` — every version and engines field above was queried directly against `registry.npmjs.org` this session (2026-07-19), not taken from training data or the project's day-old `STACK.md`.

---

### Pitfall 3: Custom static server has no MIME entry for `.pdf` — breaks CONTACT-04 silently
**What goes wrong:** `jagdamba_automobiles/app.js`'s `MIME` table (the one this phase is instructed to reuse verbatim per D-05) covers `.html/.js/.css/.json/.png/.jpg/.jpeg/.gif/.svg/.ico/.webp/.woff/.woff2/.ttf/.txt` — **but not `.pdf`**. Any request for `/resume.pdf` falls through to the `application/octet-stream` fallback. Most browsers still offer a "Save As" for `application/octet-stream`, but some browser/PDF-viewer combinations misbehave (blank tab, no filename, or "cannot display" errors) on the wrong content type, and it's simply incorrect regardless of browser leniency.
**Why it happens:** The reference project (`jagdamba_automobiles`) never serves a PDF, so this gap never surfaced there — it's a genuine new requirement this phase introduces (CONTACT-04) that the copied pattern doesn't already cover.
**How to avoid:** Add `'.pdf': 'application/pdf'` to the `MIME` object when adapting `app.js` for this project — confirmed correct per MDN's common MIME types reference. Verify by loading `/resume.pdf` directly in a browser after first deploy and confirming the `Content-Type` response header.
**Warning signs:** Resume link downloads a file with no `.pdf` icon/preview, or some browsers show a blank/broken viewer instead of the PDF.
**Confidence:** `[VERIFIED: MDN — developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types]` cross-checked against direct read of `jagdamba_automobiles/app.js`'s actual `MIME` object this session.

---

### Pitfall 4: Path-traversal exposure in the static file server's naive `path.join`
**What goes wrong:** `app.js` builds `const filePath = path.join(distDir, urlPath)` directly from the decoded, attacker-controllable request URL, then serves it if `fs.existsSync(filePath)` is true. `path.join` normalizes `..` segments but does **not** prevent the resolved path from escaping `distDir` — a request like `GET /../../../../etc/passwd` (or an equivalent encoded/traversal variant) can resolve outside the intended `dist/` directory, and reading arbitrary readable files as whatever the Node process's file permissions allow.
**Why it happens:** The pattern was written for a low-risk motorcycle-parts storefront and never audited for path traversal because it "just serves the site correctly" in normal use — the vulnerability only manifests under a deliberately crafted request, which normal manual QA never exercises.
**How to avoid:** After computing `filePath`, resolve it and verify it's still inside `distDir` before serving:
```js
// Source: standard Node.js path-containment pattern (OWASP Path Traversal guidance)
const resolved = path.resolve(filePath);
const distRoot = path.resolve(distDir) + path.sep;
if (!resolved.startsWith(distRoot) && resolved !== path.resolve(distDir)) {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.end('Bad request');
  return;
}
```
This is a ~5-line addition, keeps the file dependency-free (no `serve-static`/Express needed), and should be applied to `app.js` before the first real deploy — not just copied verbatim from `jagdamba_automobiles` as-is.
**Warning signs:** None visible in normal use — this must be checked by code review / a deliberate manual test (`curl` a traversal payload against the deployed URL), not discovered organically.
**Confidence:** `[VERIFIED: direct code read of jagdamba_automobiles/app.js]` for the vulnerability; the fix pattern is `[CITED: OWASP Path Traversal cheat-sheet standard guidance]`.

---

### Pitfall 5: `<a download>` silently does nothing for cross-origin resume links
**What goes wrong:** The HTML `download` attribute only forces a save dialog for **same-origin** URLs; if the resume PDF is ever referenced by an absolute external URL (e.g. hosted elsewhere, or a copy-pasted Google Drive/Dropbox share link) instead of a same-origin static asset, most browsers ignore `download` and just navigate to/preview the file instead of downloading it.
**How to avoid:** Place `resume.pdf` in `public/` so Vite copies it verbatim into `dist/` at the site's own origin, and reference it with a relative path (`/resume.pdf` or `${import.meta.env.BASE_URL}resume.pdf` if a subpath `base` is used — see Open Questions), never an external URL.
**Warning signs:** Clicking the resume link opens a new tab showing the PDF instead of triggering a save dialog.
**Confidence:** `[CITED: general HTML `download` attribute same-origin behavior, well-established web platform behavior]`.

---

### Pitfall 6: `vite.config.ts`'s `base` must match the eventual deployment path — currently unresolved (D-08)
**What goes wrong:** `jagdamba_automobiles` deploys under a subpath (`base: '/jagdambaautomobiles/'`) because it shares a domain with other cPanel apps. If this new portfolio ends up on its own dedicated domain/subdomain root, `base` must be `'/'` instead — using the wrong one means every built asset URL (`/assets/*.js`, fonts, `resume.pdf`) 404s in production even though the build succeeded and looked fine locally under `vite preview`.
**How to avoid:** Confirm the target domain/subdomain (D-08's open pre-execution dependency) before the DEPLOY-01 execution step, and set `base` accordingly — default to `'/'` unless a subpath is confirmed necessary. This is cheap to get right before first deploy and mildly annoying to debug after (broken asset loading with no console errors pointing directly at `vite.config.ts`).
**Warning signs:** Blank page / broken styling / 404s on `/assets/*` in the Network tab after what looked like a successful `npm run build` + upload.
**Confidence:** `[VERIFIED: direct read of jagdamba_automobiles/vite.config.ts]` for the mechanism; the specific target path for this project is `[ASSUMED — unresolved, see Open Questions]`.

---

### Pitfall 7: Stale deploy despite successful upload (cPanel/Passenger restart gotcha)
**What goes wrong:** Uploading new build files to the cPanel Node app root does not make the running app pick up the change — Passenger keeps serving the previously-loaded process until explicitly restarted (cPanel's "Restart" button or touching `tmp/restart.txt`).
**How to avoid:** Treat "restart the Node app" as an explicit, checklisted final deploy step from the very first deploy. Verify success via a visible marker (e.g., render a small build-timestamp/version string in the footer) rather than trusting "upload succeeded."
**Confidence:** `[CITED: standard, documented Phusion Passenger behavior]` — carried forward from project-level `PITFALLS.md` (still fully applicable to this phase's DEPLOY-01 work, not superseded by anything new this session).

---

### Pitfall 8: `mailto:` links need encoded subject/body, and plain `mailto:` alone can look broken with no default mail client configured
**What goes wrong:** A bare `<a href="mailto:sandeepgupta050890@gmail.com">` works, but a common enhancement — pre-filling a subject line — breaks if special characters (spaces, `&`, `?`) aren't percent-encoded: `mailto:x@y.com?subject=Hello There` silently truncates or mis-parses the subject in some clients.
**How to avoid:** If a subject/body is desired, build the href with `encodeURIComponent`: `` `mailto:${email}?subject=${encodeURIComponent('Portfolio inquiry')}` ``. If not, a bare `mailto:` link (CONTACT-01's actual requirement) is sufficient and has no encoding concerns at all.
**Warning signs:** Clicking the email link opens a mail client with a garbled or truncated subject line.
**Confidence:** `[CITED: RFC 6068 mailto URI scheme — well-established web platform behavior]`.

## Code Examples

### Patched static file server MIME table + path containment (both fixes together)
```js
// app.js — adapted from jagdamba_automobiles/app.js, with two additions marked below
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || process.env.NODE_PORT || 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.pdf':  'application/pdf', // ADDED — required for CONTACT-04 (Pitfall 3)
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]
  try { urlPath = decodeURIComponent(urlPath) } catch (_) {}

  const filePath = path.join(distDir, urlPath)

  // ADDED — path-containment check (Pitfall 4)
  const resolved = path.resolve(filePath)
  const distRoot = path.resolve(distDir) + path.sep
  if (!resolved.startsWith(distRoot) && resolved !== path.resolve(distDir)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Bad request')
    return
  }

  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    return serveFile(res, resolved)
  }
  serveFile(res, path.join(distDir, 'index.html'))
})

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
}

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving dist/ on http://0.0.0.0:${port}/`)
})
```

### Contact section — email, LinkedIn, GitHub, resume download
```tsx
// src/sections/Contact.tsx
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <a href="mailto:sandeepgupta050890@gmail.com">Email me</a>
      <a href="https://www.linkedin.com/in/sandeepguptauou17/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="https://github.com/Sandyzie05" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      {/* resume.pdf lives in public/ — same-origin, so `download` actually triggers a save (Pitfall 5) */}
      <a href="/resume.pdf" download="Sandeep_Gupta_Resume.pdf">
        Download Resume
      </a>
    </section>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` as the package name | Package now also published as `motion` (same maintainers, Motion One merger) | Ongoing since ~2024 | No action needed this phase — `framer-motion@12.42.2` still works identically and is what `jagdamba_automobiles` already uses; not a breaking concern |
| ESLint `.eslintrc.*` config format | Flat config (`eslint.config.js`), default since ESLint 9 | ESLint 9 (2024) | `jagdamba_automobiles` already uses flat config — carry the same pattern forward, no new decision needed |
| Vite major version 5.x (jagdamba's pin) | Vite 6.x is now the Node-18-compatible ceiling; 7.x/8.x require Node ≥20.19 | Vite 7→8 transition | This project should move to `vite@6.3.6` (one major ahead of jagdamba's `^5.4.1`) rather than copying jagdamba's exact pin, since 6.x still supports Node 18 |
| TypeScript classic compiler | TypeScript 7.0 (Go-native compiler), GA'd 2026-07-08 | Just happened, days before this research | **Do not adopt yet** — no stable programmatic API, `typescript-eslint` cannot consume it until 7.1; stay on `typescript@6.0.3` |

**Deprecated/outdated:** None of this phase's recommended stack is deprecated; the only "old vs new" nuance is the Node-18-compatibility ceiling on the *dev toolchain* documented in Pitfall 2 above.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Target production domain/subdomain will be a dedicated root (`base: '/'`) rather than a subpath like jagdamba's | Pitfall 6, Recommended Project Structure | If wrong (a subpath is actually needed), every built asset 404s until `vite.config.ts`'s `base` is corrected and rebuilt — cheap fix, but must not be skipped before first deploy |
| A2 | The 6 GitHub repos' descriptions/tech stacks (fetched live via WebFetch this session) accurately reflect current repo README/About content at time of writing this phase's content | Phase Requirements, Architecture Pattern 1 | Low risk — repos are personal projects unlikely to change materially before this phase executes; still, spot-check each repo's About/README once more at implementation time in case of recent edits |
| A3 | The local machine's default npm registry misconfiguration (Adobe Artifactory) is specific to this dev environment and not something the user's actual eventual dev/build machine will also hit | Pitfall 1 | If the user's real machine has the same global `.npmrc`, the project-local `.npmrc` fix documented here still resolves it — low risk either way since the fix is included regardless |

**If this table is empty:** N/A — see entries above; all three are low-risk, already mitigated by documented fallbacks.

## Open Questions

1. **Target domain/subdomain for deployment (D-08, carried over from CONTEXT.md)**
   - What we know: MilesWeb domain is already configured per `PROJECT.md`; deployment will mirror `jagdamba_automobiles`'s cPanel Node app pattern.
   - What's unclear: Whether this new site gets its own domain/subdomain root (`base: '/'`) or a subpath alongside other apps (`base: '/something/'`), and the new GitHub repo's name.
   - Recommendation: Not blocking for content/shell development (Wave 0-N can build with `base: '/'` as a working default) — resolve before the DEPLOY-01 execution task specifically, per CONTEXT.md's own deferred-items note.

2. **Section ordering within the single-page shell**
   - What we know: Hero must render first, Contact/footer must render last (Claude's Discretion constraint in CONTEXT.md).
   - What's unclear: The exact order of About/Experience/Projects/Skills/Certifications/Education in between.
   - Recommendation: A natural, resume-mirroring order is Hero → About → Experience → Projects → Skills → Certifications → Education → Testimonials → Contact — this follows the same narrative order recruiters expect from a resume, and can be revisited in `/gsd-ui-phase 1` (D-10) without any data/architecture rework since sections are decoupled, order-independent components.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Vite build, dev server, dependency-free `app.js` runtime | ✓ | 18.20.2 (local) | Satisfies `^18.0.0 \|\| >=20.0.0` engines target; confirm the actual MilesWeb cPanel Node selector separately at deploy time |
| npm | Package install/build scripts | ✓ | 10.5.0 | — |
| git | Version control, deploy source | ✓ | 2.50.1 | — |
| Public npm registry (`registry.npmjs.org`) | Installing react/vite/etc. | ✓ (once `.npmrc` override is added) | — | This machine's *default* registry is an internal Adobe Artifactory mirror that 403s on public packages (see Pitfall 1) — the project-local `.npmrc` fallback documented above resolves this and must be added in Wave 0 |
| Resume PDF source file | Content extraction (About/Experience/Skills/Certs/Education) | ✓ | `~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf`, read in full this session | — |
| MilesWeb cPanel Node.js Selector | DEPLOY-01 | Not verifiable from this session (no remote access) | — | Assumed available per D-06/D-07 (locked project decision); verify Node version options match `^18.0.0 \|\| >=20.0.0` at actual deploy time |

**Missing dependencies with no fallback:** None — the one real gap found (npm registry misconfiguration) has a confirmed, proven fallback (project `.npmrc`, already working in `jagdamba_automobiles`).

**Missing dependencies with fallback:** Public npm registry access (fallback: project-local `.npmrc` override, see Pitfall 1).

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 + @testing-library/react 16.3.2 + jsdom 26.1.0 (none currently installed — greenfield project) |
| Config file | none yet — Wave 0 must add a `test` block to `vite.config.ts` (or a separate `vitest.config.ts`) plus a `src/test/setup.ts` importing `@testing-library/jest-dom` matchers |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run` (project is small enough this phase that quick/full are the same command) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero renders name, title, one-line positioning | unit (render + text query) | `npx vitest run src/sections/Hero.test.tsx` | ❌ Wave 0 |
| ABOUT-01 | About renders synthesized summary | unit | `npx vitest run src/sections/About.test.tsx` | ❌ Wave 0 |
| EXP-01, EXP-02 | Experience renders all roles chronologically with achievement bullets | unit | `npx vitest run src/sections/Experience.test.tsx` | ❌ Wave 0 |
| PROJ-01, PROJ-02, PROJ-03 | Projects renders 6 cards with correct GitHub hrefs; no `fetch`/API call made | unit (mock global `fetch`, assert not called) | `npx vitest run src/sections/Projects.test.tsx` | ❌ Wave 0 |
| SKILL-01, SKILL-02 | Skills renders category groupings as tags, not progress bars | unit | `npx vitest run src/sections/Skills.test.tsx` | ❌ Wave 0 |
| CERT-01 | Certifications renders all 6 certifications | unit | `npx vitest run src/sections/Certifications.test.tsx` | ❌ Wave 0 |
| EDU-01 | Education renders both degrees | unit | `npx vitest run src/sections/Education.test.tsx` | ❌ Wave 0 |
| CONTACT-01..04 | Contact renders correct `mailto:`/LinkedIn/GitHub hrefs and a same-origin `download` resume link | unit | `npx vitest run src/sections/Contact.test.tsx` | ❌ Wave 0 |
| SOCIAL-01 | Testimonials renders exactly 3 quotes with correct attribution | unit | `npx vitest run src/sections/Testimonials.test.tsx` | ❌ Wave 0 |
| DEPLOY-01 | Live site reachable, correct asset MIME types, resume PDF downloads correctly | manual/smoke (not unit-testable — requires the real deployed URL) | `curl -sI https://<production-url>/` + `curl -sI https://<production-url>/resume.pdf` (expect `200` and `Content-Type: application/pdf`) | ❌ Wave 0 (write as a `scripts/deploy-smoke.sh`, run manually post-deploy) |

### Sampling Rate
- **Per task commit:** `npx vitest run` (whole suite — project is small, no need to scope to a single file per commit)
- **Per wave merge:** `npx vitest run` (same command; no larger integration suite needed at this phase's scope)
- **Phase gate:** Full suite green, plus a manual `deploy-smoke.sh` run against the live MilesWeb URL, before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `npm install -D vitest@3.2.4 jsdom@26.1.0 @testing-library/react@16.3.2` — framework install
- [ ] `vite.config.ts` `test` block (or `vitest.config.ts`) — environment: `jsdom`, setupFiles pointing at `src/test/setup.ts`
- [ ] `src/test/setup.ts` — import `@testing-library/jest-dom/vitest` (or equivalent) for DOM matchers
- [ ] One `*.test.tsx` per section component (9 files total, see table above)
- [ ] `scripts/deploy-smoke.sh` — curl-based post-deploy manual check (site root 200, `resume.pdf` correct MIME, at least one project GitHub link resolves)

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth in this phase — public static content site |
| V3 Session Management | No | No sessions/cookies needed |
| V4 Access Control | No | No protected resources — everything served is meant to be public |
| V5 Input Validation | Minimal | No server-processed user input in v1 (mailto is client/OS-handled, not a submitted form); TypeScript's compile-time typing on `content/*.ts` is the only "validation" surface this phase has |
| V6 Cryptography | No (delegated) | TLS termination is handled by MilesWeb/cPanel, not application code — nothing to implement here |
| V12 Files and Resources | Yes | Path-containment check on the custom static file server (Pitfall 4) — this is the one real file-serving risk this phase's server code introduces |
| V14 Configuration | Yes | Explicit MIME-type table (Pitfall 3) and `rel="noopener noreferrer"` on all `target="_blank"` outbound links (Pattern 3) |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| Path traversal via unsanitized `path.join(distDir, urlPath)` in the custom Node static server | Tampering / Information Disclosure | `path.resolve` + prefix-containment check before serving any file (Pitfall 4, Code Examples) |
| Reverse tabnabbing via `target="_blank"` without `rel="noopener"` on outbound project/social links | Spoofing | `rel="noopener noreferrer"` on every external anchor (Pattern 3) |
| MIME-type confusion / browser MIME sniffing on served assets | Tampering | Explicit `Content-Type` per extension (Pitfall 3); optionally add `X-Content-Type-Options: nosniff` response header in `app.js` |

## Sources

### Primary (HIGH confidence)
- `registry.npmjs.org` direct queries (2026-07-19, this session) for: `react`, `react-dom`, `vite` (+`6.3.6`), `typescript` (+versions list, `6.0.3`), `@vitejs/plugin-react` (+`4.3.4`/`4.7.0`/`5.2.0`), `eslint` (+`9.39.1`), `@eslint/js`, `typescript-eslint` (+`8.64.0`), `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `framer-motion`, `vitest` (+`3.2.4`), `jsdom` (+`26.1.0`), `@testing-library/react`, `@types/react`, `@types/react-dom` — package.json fields (`version`, `engines`, `peerDependencies`, `dependencies`, `dist-tags`)
- Direct file reads: `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles/app.js`, `package.json`, `vite.config.ts`, `README.md`, `CLAUDE.md`, `src/` directory listing — ground truth for the reference deployment pattern
- Direct PDF read: `~/Downloads/Sandeep_Gupta_Platform_Engineering.pdf` — full resume text, all roles/skills/certs/education
- WebFetch of all 6 locked GitHub repos (`github.com/Sandyzie05/{acksync,acksync_crm_lmb,stock_predictor,jagdamba_automobiles,cbse_tutor,compliOS}`) — live descriptions/README summaries/tech stacks
- `gsd-tools query package-legitimacy check` — verdicts for all 14 npm packages in this phase's stack
- Local environment probes this session: `node --version` (18.20.2), `npm --version` (10.5.0), `npm config get registry` (revealing the Artifactory misconfiguration), `curl` against `registry.npmjs.org` (confirmed reachable, 200)

### Secondary (MEDIUM confidence)
- `developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior` — WebFetch this session, confirmed `html`-vs-`body` propagation behavior
- `developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types` — WebFetch this session, confirmed `.pdf` → `application/pdf`
- WebSearch synthesis on accessible smooth-scroll + `prefers-reduced-motion` patterns (css-tricks.com, smashingmagazine.com, yanandcoffee.com, openreplay.com) — cross-referenced across 5+ independent sources converging on the same `scroll-behavior`/`scroll-margin-top` pattern

### Tertiary (LOW confidence)
- None — every claim in this document is either directly verified this session or cited against a specific, named source above.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every version/engines/peer-dependency claim independently re-verified against the live npm registry this session, correcting several stale/incorrect details in the project's own day-old `STACK.md`/`CLAUDE.md`
- Architecture: HIGH — directly extends the already-researched project-level `ARCHITECTURE.md` pattern, trimmed to this phase's actual (background-free) scope
- Pitfalls: HIGH — the two most consequential findings (missing `.pdf` MIME type, path-traversal gap) came from a direct line-by-line read of the exact file this phase is instructed to reuse, not from general web research
- Content data: HIGH — sourced directly from the resume PDF (full text extracted) and live reads of all 6 locked GitHub repos this session, not fabricated or assumed

**Research date:** 2026-07-19
**Valid until:** ~30 days for architecture/pitfalls guidance (stable); ~7-14 days for the specific pinned npm versions (fast-moving ecosystem — re-verify exact patch versions immediately before Wave 0's `npm install` if planning is delayed)
