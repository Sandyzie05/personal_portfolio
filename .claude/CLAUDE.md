<!-- GSD:project-start source:PROJECT.md -->

> **2026-09-24 direction update:** `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`,
> and `.planning/UI-REVAMP-2026-09.md` are authoritative. The four-theme WebGL
> background material below is historical research, not active v1 scope. Current
> v1 uses a content-first systems-topology hero plus persistent light/dark themes.

## Project

**Sandeep Gupta — Portfolio**

A personal portfolio website for Sandeep Gupta, a Senior Site Reliability Engineer / platform engineer at Adobe, built to showcase his professional experience, projects, and skills to recruiters, hiring managers, and his professional network. The site's signature feature is a full-bleed, low-opacity animated background — the user picks a theme (Computers, AI/Neural Network, Space, or Human Evolution) from the top nav, and the animation dynamically assembles/disassembles as they scroll and move their mouse, while the portfolio content itself always stays legible and front-and-center.

**Core Value:** A visitor immediately understands Sandeep's professional depth (experience, projects, skills) through a portfolio that is memorable and technically impressive — the interactive background must always serve the content, never compete with it.

### Constraints

- **Hosting**: MilesWeb shared hosting via cPanel, Node.js only (engines `^18.0.0 || >=20.0.0` to match `jagdamba_automobiles`) — CloudLinux LVE cannot allocate WebAssembly memory at runtime, so the production server must stay dependency-free (no Vite/esbuild/WASM at runtime)
- **Tech stack**: Node.js-based stack required by hosting; React + TypeScript + Vite is the strong default given it matches the proven `jagdamba_automobiles` pattern and the user's existing familiarity
- **Timeline**: Ship v1 (full professional content + 4-theme interactive background) as fast as reasonably possible — user explicitly prioritized speed over broader scope
- **Content**: Personal (non-professional) content is explicitly out of scope for v1 and must not be added without a future, separate scoping decision

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Answering the Core Questions

### 1. Best rendering approach for theme-switchable, scroll+mouse-reactive assemble/disassemble effects

| Axis | Canvas2D | SVG | CSS | **WebGL (Three.js/R3F)** |
|---|---|---|---|---|
| "Assemble/disassemble" particle capability | Fine at low counts (~500), CPU-bound position updates, gets janky above ~1-2k points | Not viable — DOM node per particle is the slowest option for anything beyond a few hundred elements | Can't do free-form per-particle physics/morphing at all (transforms are the wrong primitive) | **Purpose-built**: instanced geometry + per-vertex shader math is exactly the "N points interpolate between two target-position buffers" pattern this effect needs |
| Desktop performance | Good at your target counts | Poor | N/A | Excellent; GPU parallelism handles thousands of instances at 60fps trivially |
| Mobile performance | CPU throttles first under sustained load since Canvas concentrates work on the CPU — this is exactly what you'll hit with continuous scroll/mouse-reactive updates | Poor | Good but limited expressiveness | Good *if disciplined*: well-instanced WebGL is typically more battery-efficient than equivalent Canvas work because GPUs spend less energy per pixel than CPUs — but only with batched draw calls and a capped particle budget: mobile GPUs are less powerful and battery-constrained, so cap counts and pixel ratio on touch devices |
| Bundle size | 0 (native API) | 0 (native API) | 0 (native API) | Three.js core is the heaviest single dependency (~150KB gzip) — the tradeoff you're paying for capability |
| Complexity for 4 shared-framework themes | Requires hand-rolling instancing/shader-lite tricks yourself to hit 2k+ particles smoothly | N/A | N/A | One `<Canvas>`, one interaction/uniform layer, 4 swappable `<Points>`/shader modules — this is R3F's core value: compose one scene graph, share one render loop, one set of camera/mouse/scroll uniforms across all 4 themes |

### 2. Leading libraries and the React + TypeScript + Vite pairing

| Library | Role | Verdict for this project |
|---|---|---|
| **Three.js** | WebGL engine (the actual renderer) | **Use.** The de facto standard; everything else in this table either wraps it (R3F) or competes with it in a narrower niche (PixiJS = 2D-only, OGL = raw/low-level, no framework glue) |
| **React Three Fiber (`@react-three/fiber`)** | React renderer for Three.js — declarative scene graph, `useFrame` render loop hook | **Use.** This is the piece that makes "4 themes sharing one interaction/opacity-control framework" tractable in a React codebase: one `<Canvas>` component tree, themes become swappable child components |
| **`@react-three/drei`** | Grab-bag of R3F helpers (`<Points>`, `<PointMaterial>`, camera controls, GPGPU helpers) | **Use.** Saves you from re-implementing common particle/point-cloud boilerplate for each of the 4 themes |
| **`@react-three/postprocessing`** | Bloom/glow, depth-of-field, chromatic aberration effects | **Optional, use selectively.** Genuinely useful for the AI/Neural-Network and Space themes (glow on nodes/stars); skip it for Computers/Human-Evolution themes if it doesn't add value — it's an extra dependency, so gate it behind the themes that need it via dynamic `import()` |
| **OGL** | Minimal raw-WebGL micro-library, ~7-8KB gzipped, no React bindings | **Don't use as primary.** Excellent if you were bundle-size-obsessed and willing to hand-roll a scene graph/interaction layer 4 times over, but it throws away everything R3F gives you for "one shared framework, 4 swappable themes." Not worth the tradeoff here. |
| **PixiJS** | 2D WebGL-accelerated sprite/particle renderer | **Don't use.** Outperforms Three.js for flat, sprite-based 2D particle fields, but your effect wants free-form particle assembly (arguably 3D-ish depth, or at least non-sprite point clouds) shared across 4 themes — R3F's shader/instancing model fits better than Pixi's sprite-batching model for this specific "assemble into an evolving shape" brief. Reconsider only if you pivot to a purely flat/2D sprite look. |
| **tsParticles** | Config-driven particle effects (JSON presets: confetti, snow, links, etc.) | **Don't use as the core engine.** It's turnkey for generic ambient particle backgrounds, but it is explicitly *less* flexible than R3F for a bespoke, per-pixel/shader-controlled assemble-disassemble look; you'd be fighting its preset config model to get custom "converge into a neuron/spaceship/skull shape" behavior. Reasonable *only* as a scrap-and-replace placeholder during early prototyping, not for v1 ship. |
| **GSAP + ScrollTrigger** | Scroll-position-driven timeline/tweening | **Use for content-section choreography** (fade-ins, section reveals, nav state) and optionally to drive a single normalized `scrollProgress` value into the R3F uniform layer. As of **April 30, 2025**, GSAP (Webflow-owned) made the *entire* library — including ScrollTrigger, SplitText, MorphSVG, all former "Club GreenSock" plugins — free for commercial use under its standard no-charge license. The only carve-out is a "Prohibited Uses" clause aimed at no-code visual-builder competitors to Webflow, which doesn't apply to a normal coded website. **Confirmed via GSAP's own pricing/license page and Webflow's official announcement — this used to be a paid-plugin gate and is a meaningful 2025 stack change worth knowing.** |
| **Framer Motion / `motion`** | Declarative React UI animation (layout transitions, gestures, simple scroll hooks) | **Use for UI-layer micro-interactions** (nav theme picker, opacity slider, button/card hover states, page-level fades) — this is what your reference project (`jagdamba_automobiles`) already uses (`framer-motion ^12.38.0`), so it's a proven, familiar pairing. Don't use it to drive the WebGL particle uniforms themselves — that's R3F's `useFrame` + a shared store's job, not Framer Motion's. |

- **R3F + drei + Three.js** → the actual background canvas and all 4 theme particle systems (shared render loop, shared mouse/scroll uniform inputs).
- **Zustand** (tiny, `~1KB` core, already a pmndrs sibling project to R3F) → the shared store for `activeTheme`, `opacity`, and live `scrollProgress`/`pointer` values, written from event listeners *outside* React's render cycle and read inside `useFrame` — this is the standard R3F pattern to avoid React re-renders on every scroll/mouse-move tick.
- **GSAP + ScrollTrigger** → content-section scroll choreography (independent of the canvas).
- **Framer Motion (`motion`)** → nav/theme-picker/opacity-control UI interactions.

### 3. Static-only deployment compatibility (no SSR, no runtime WASM/Vite/esbuild)

- **Three.js, R3F, drei, `@react-three/postprocessing`, GSAP, Framer Motion/`motion`, Zustand are all pure client-side browser libraries.** They run entirely inside the browser via WebGL/Canvas/DOM APIs after your JS bundle loads — none of them import Node built-ins (`fs`, `path`, etc.), require a Node process at request-time, or need an SSR/hydration step. They work identically whether the HTML shell was generated by Next.js SSR or, as here, is a single static `index.html` produced once at build time by Vite. **There is no SSR in this project at all — plain Vite SPA — so there's no hydration-mismatch class of bug to worry about either**, which is actually a simpler situation than most modern React tutorials assume.
- **Vite/esbuild's WebAssembly usage is a build-time-only concern, not a runtime one.** esbuild ships a native binary (and a WASM fallback, `esbuild-wasm`, for environments where the native binary can't run) but this only matters while `vite build` executes on your development machine. The *output* of that build — the `dist/` folder — is plain static HTML/CSS/JS with zero embedded esbuild or WASM dependency. Your dependency-free Node `http` static server on MilesWeb/CloudLinux LVE never touches esbuild, Vite, or WASM at all; it just serves static files. **This directly confirms the project's stated hosting constraint is a non-issue for any of the recommended animation libraries** — the WASM/memory-allocation limitation on CloudLinux LVE only bites if you tried to *run* Vite/esbuild on the server itself (e.g., SSR frameworks that rebuild or transform on each request), which this architecture explicitly avoids.
- **Flag — libraries/patterns to avoid *because* they assume Node/edge runtime features:** any Next.js-specific WebGL tutorial that uses `next/dynamic(() => import(...), { ssr: false })` — that pattern exists to dodge Next's SSR hydration mismatch for canvas-based components, which is irrelevant here since there's no SSR to dodge. Similarly, skip any "R3F + Next.js Edge Runtime" or "R3F + Remix loader" boilerplate found in blog posts — none of that applies to a plain Vite SPA; a bare `ReactDOM.createRoot(...).render(<App/>)` mount is all you need.

### 4. Specific versions + low-power/`prefers-reduced-motion` fallback

| Package | Version (verified via npm registry) | Notes |
|---|---|---|
| `react` / `react-dom` | `19.2.7` | Current stable |
| `vite` | `^6.3.6` | Engines: `^18.0.0 \|\| ^20.0.0 \|\| >=22.0.0` — matches your `jagdamba_automobiles` reference project's Node engines field (`^18.0.0 \|\| >=20.0.0`) almost exactly. **Do not jump to Vite 8.1.5** (current absolute latest) unless you also raise your Node engines floor — Vite 8 requires Node `^20.19.0 \|\| >=22.12.0`, which is narrower than what your proven MilesWeb pattern currently targets. |
| `three` | `0.185.1` | Current stable |
| `@react-three/fiber` | `9.6.1` | Peer deps: `react ">=19 <19.3"`, `three ">=0.156"` |
| `@react-three/drei` | `10.7.7` | Peer deps: `react "^19"`, `three ">=0.159"`, `@react-three/fiber "^9.0.0"` |
| `@react-three/postprocessing` (optional) | `3.0.4` | Peer deps: `@react-three/fiber "^9.0.0"`, `react "^19.0"`, `three ">= 0.156.0"` |
| `zustand` | `5.0.14` | For the shared theme/opacity/pointer/scroll store read inside `useFrame` |
| `gsap` | `3.15.0` | Free commercial license as of April 30, 2025 (see Q2) |
| `framer-motion` (or its new alias package `motion`) | `12.42.2` | Same version already proven in `jagdamba_automobiles` (`^12.38.0`) — safe, familiar upgrade |
| `typescript` | **`6.0.x`** — do NOT jump to `7.0` yet | See "What NOT to Use" below |
| Package | Version | Notes |
|---|---|---|
| `react` / `react-dom` | `18.3.1` (exact match to reference project) | |
| `@react-three/fiber` | `8.17.10` | Peer deps: `react ">=18.0"`, `react-dom ">=18.0"`, `three ">=0.133"` — fully React-18 compatible |
| `@react-three/drei` | `9.x` line (the R3F-8-compatible major) | Do not mix drei 10.x with R3F 8.x — drei 10 requires `@react-three/fiber "^9.0.0"` |

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | 19.2.7 | UI framework | Current stable; matches the modern R3F 9 / drei 10 / postprocessing 3 major-version set (see Q4 for the React-18-parity alternative) |
| TypeScript | 6.0.x (NOT 7.0) | Type safety | 6.0 is the last classic-codebase release and the version `typescript-eslint` officially supports (`>=4.8.4 <6.1.0`); 7.0 (GA July 8, 2026, the new Go-native compiler) ships with no stable programmatic API yet — tooling like `typescript-eslint` can't consume it until 7.1 |
| Vite | ^6.3.6 | Build tool, dev server | Node engine range (`^18.0.0 \|\| ^20.0.0 \|\| >=22.0.0`) lines up with your proven `jagdamba_automobiles` hosting constraint; avoid jumping to Vite 8 without also raising the Node floor |

### Animation/Background Engine

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| three | 0.185.1 | WebGL rendering engine | Industry-standard 3D/WebGL library; the only realistic engine for GPU-driven assemble/disassemble particle interpolation at this scope |
| @react-three/fiber | 9.6.1 | React renderer for Three.js | Makes "4 themes, one shared interaction/opacity framework" tractable as one `<Canvas>` + swappable child scene components |
| @react-three/drei | 10.7.7 | R3F helper components | `<Points>`/`<PointMaterial>` and camera/pointer helpers avoid reinventing boilerplate per theme |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zustand | 5.0.14 | Shared store for active theme / opacity / live pointer & scroll values | Read inside `useFrame` without triggering React re-renders on every scroll/mouse tick |
| gsap (+ ScrollTrigger, bundled free since Apr 2025) | 3.15.0 | Scroll-driven content-section choreography | Section reveals, nav state changes, optionally feeding a normalized scroll-progress value into the canvas uniforms |
| framer-motion (or `motion`) | 12.42.2 | UI micro-interactions | Nav theme picker, opacity slider, hover/press states — matches version already proven in `jagdamba_automobiles` |
| @react-three/postprocessing | 3.0.4 | Bloom/glow effects | Only for themes that benefit visually (AI/Neural-Network, Space) — dynamic-import it per theme to avoid paying its cost everywhere |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + typescript-eslint | Linting | Requires TypeScript within its supported range (`>=4.8.4 <6.1.0`) — another reason to stay on TS 6.0.x, not 7.0, for now |
| `@vitejs/plugin-react` | Vite/React integration | Same role it plays in `jagdamba_automobiles` |

## Installation

# Core

# Animation engine

# Scroll/UI animation

# Optional (gate behind specific themes via dynamic import)

# Dev dependencies

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React 19 + R3F 9 + drei 10 | React 18.3.1 + R3F 8.17.10 + drei 9.x | If you want byte-for-byte dependency parity with `jagdamba_automobiles` instead of adopting the current React 19 major |
| React Three Fiber / Three.js | OGL (raw, ~7-8KB gzipped) | If bundle size becomes a hard constraint and you're willing to hand-build a scene/interaction layer 4 times instead of sharing R3F's scene graph |
| React Three Fiber / Three.js | PixiJS | If the visual direction pivots to flat 2D sprite-based particles rather than free-form assemble/disassemble shapes |
| GSAP ScrollTrigger for scroll orchestration | Plain `IntersectionObserver` + `requestAnimationFrame` | If you want to shave GSAP's dependency weight for a very small number of scroll triggers — reasonable, but GSAP is free now and handles edge cases (resize, momentum scroll) you'd otherwise re-solve |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| TypeScript 7.0 (right now) | GA'd July 8, 2026 but ships with **no stable programmatic compiler API** — `typescript-eslint` and similar tools that need programmatic access cannot consume it until TS 7.1 (several months out per Microsoft's own announcement) | TypeScript 6.0.x — last classic-codebase release, fully within `typescript-eslint`'s supported range |
| Vite 8.1.5 (absolute latest) as a default pick | Requires Node `^20.19.0 \|\| >=22.12.0` — narrower than your proven `jagdamba_automobiles` Node engines field (`^18.0.0 \|\| >=20.0.0`), risking a mismatch with what MilesWeb's Node.js selector actually offers | Vite ^6.3.6 — matches the same Node engine range your reference project already ships with |
| tsParticles as the primary rendering engine | Config/preset-driven; fights against a bespoke, per-theme "assemble into a specific evolving shape" shader-controlled look | R3F + Three.js with custom particle-position shaders/attributes per theme |
| PixiJS for this specific effect | Excellent for flat 2D sprite particle fields, but its sprite-batching model doesn't map as naturally onto "one shared 3D-ish interaction/opacity framework across 4 themes" as R3F's scene-graph + shader model does | React Three Fiber + Three.js |
| Any Next.js/Remix/edge-runtime WebGL tutorial pattern (`ssr: false` dynamic imports, Edge Runtime canvas wrappers) | This project has no SSR at all — it's a plain static Vite SPA — so those patterns solve a problem you don't have and add irrelevant complexity | A plain `ReactDOM.createRoot(...).render(<App/>)` client mount |
| Unbounded particle counts / uncapped `devicePixelRatio` on mobile | Mobile GPUs are battery- and power-constrained; poorly-batched WebGL (or just too many draw calls) can burn more power than a clean Canvas2D implementation would | Cap particle count and clamp `dpr` (e.g., `Math.min(devicePixelRatio, 1.5)`) on `matchMedia('(pointer: coarse)')` devices |

## Stack Patterns by Variant

- Use `@react-three/postprocessing`'s `Bloom` effect, but only mount it as part of those two themes' dynamically-imported modules
- Because postprocessing adds real bundle weight and GPU cost that the Computers/Human-Evolution themes don't need
- Code-split each of the 4 theme modules behind `React.lazy`/dynamic `import()`, keyed by the active theme in your Zustand store
- Because the user only ever sees one theme's shader/particle-config at a time — there's no reason to ship all 4 themes' JS in the initial bundle
- Design the "theme module" contract (particle target-position generator + optional postprocessing config) now, in v1, as a small interface the 4 shipped themes implement
- Because this makes adding a 5th theme in v2 a matter of writing one new module against an existing contract, not restructuring the canvas/interaction layer

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `@react-three/fiber@9.6.1` | `react ">=19 <19.3"`, `three ">=0.156"` | Do not pair with React 18 — use R3F 8.x for that |
| `@react-three/drei@10.7.7` | `@react-three/fiber "^9.0.0"`, `react "^19"`, `three ">=0.159"` | Do not mix with R3F 8.x — use drei 9.x line for that pairing |
| `@react-three/postprocessing@3.0.4` | `@react-three/fiber "^9.0.0"`, `react "^19.0"`, `three ">=0.156.0"` | Same R3F-9/React-19 major-version family as drei 10.x |
| `@react-three/fiber@8.17.10` (alt path) | `react ">=18.0"`, `react-dom ">=18.0"`, `three ">=0.133"` | Use this whole line (R3F 8 + drei 9) together if freezing on React 18 |
| `vite@^6.3.6` | Node `^18.0.0 \|\| ^20.0.0 \|\| >=22.0.0` | Matches `jagdamba_automobiles`'s Node engines field almost exactly |
| `typescript@6.0.x` | `typescript-eslint` `>=4.8.4 <6.1.0` | TypeScript 7.0 falls outside this range until `typescript-eslint` adds support |

## Sources

- npm registry direct metadata fetch (`registry.npmjs.org`) for: `three`, `@react-three/fiber` (9.x and 8.17.10), `@react-three/drei`, `@react-three/postprocessing`, `tsparticles`, `gsap`, `motion`/`framer-motion`, `zustand`, `vite` (latest and 6.3.6), `typescript`, `react` — HIGH confidence (ground-truth version/peer-dependency data)
- Web search synthesis: R3F/OGL/PixiJS/tsParticles comparison for reactive particle backgrounds (blog.maximeheckel.com, r3f.docs.pmnd.rs, Codrops, bestofjs.org) — MEDIUM confidence
- Web search: GSAP/Webflow license change, cross-checked against gsap.com/pricing, gsap.com/community/standard-license, webflow.com/blog/gsap-becomes-free, css-tricks.com — HIGH confidence (official vendor + independent press corroboration)
- Web search: WebGL vs Canvas2D mobile/battery performance (multiple independent sources: simplified.media, svggenie.com, quidmonkey/particle_test benchmark repo) — MEDIUM confidence
- Web search: `prefers-reduced-motion` + WebGL fallback pattern (css-tricks.com, MDN WebGL best practices, Codrops decorative-WebGL-backgrounds tutorial) — MEDIUM confidence
- Web search: TypeScript 7.0 GA and API-stability gap, cross-checked against devblogs.microsoft.com/typescript (official "Announcing TypeScript 7.0" and "Announcing TypeScript 7.0 RC" posts), typescript-eslint GitHub issue #12123, visualstudiomagazine.com — HIGH confidence (official Microsoft announcement + direct tooling-compat tracking issue)
- Vite/esbuild build-time-vs-runtime WASM reasoning — based on esbuild/Vite's documented architecture (native binary + `esbuild-wasm` fallback used only during `vite build`); no single canonical URL retrieved this session due to a search-rate-limit, so treat as MEDIUM confidence and spot-check against Vite's own docs before finalizing the build pipeline
- `jagdamba_automobiles/package.json` (local reference project) — direct file read, ground truth for the proven deployment pattern's existing dependency versions

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
