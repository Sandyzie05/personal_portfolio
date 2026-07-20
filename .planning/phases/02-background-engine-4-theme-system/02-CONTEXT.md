# Phase 2: Background Engine & 4-Theme System - Context

**Gathered:** 2026-07-19
**Status:** Ready for planning

<domain>
## Phase Boundary

A visitor sees a full-bleed, low-opacity animated WebGL background that assembles/disassembles as they scroll and move their mouse (or touch on mobile), for all 4 v1 themes (Computers, AI/Neural Network, Space, Human Evolution), without it ever obscuring the content, draining their battery, or violating motion preferences. This phase builds the shared engine + interaction pipeline against ONE reference theme first, then replicates the proven `ThemeModule` contract to the remaining three themes. The theme picker UI and opacity control (BG-01, BG-04) are Phase 3 — out of scope here.

</domain>

<decisions>
## Implementation Decisions

### Reference Theme Sequencing
- **D-01:** The **Computers** theme is built first as the reference implementation. The shared engine (RAF loop, resize/DPR handling, mount/unmount lifecycle, Zustand-driven scroll/pointer uniforms, `ThemeModule` contract) is proven against this one theme before replicating to the other three.

### Theme Visual Identities
- **D-02:** All 4 themes assemble into a **literal object silhouette**, not an abstract/diagrammatic shape. This is a deliberate, locked creative direction — downstream research/planning must NOT substitute abstract alternatives (e.g. circuit boards, neuron graphs, starfields, DNA helices) for these literal shapes.
- **D-03:** Computers theme → assembles into the literal shape of **a computer**.
- **D-04:** AI/Neural Network theme → assembles into a **humanoid robot / android**.
- **D-05:** Space theme → assembles into a **rocket / spaceship**.
- **D-06:** Human Evolution theme → assembles into an **ape-to-man silhouette progression** (a sequence, not a single static figure).

### Particle Density & Performance Budget
- **D-07:** Each theme's fully-assembled silhouette should read as **moderate density** — roughly a few hundred up to ~1,000-1,500 particles on desktop. This must still be clamped further on mobile (`matchMedia('(pointer: coarse)')`) per the existing project-wide mobile/battery discipline (cap particle count and `devicePixelRatio`, e.g. `Math.min(devicePixelRatio, 1.5)`).

### Scroll/Mouse Reactivity Model
- **D-08:** The background reacts **continuously** to scroll position — particles interpolate smoothly along a scroll-driven progress value, not via discrete "snap between scenes" jumps.
- **D-09:** On mobile/touch devices with no native `mousemove`, the background is **scroll-only** — no simulated/synthetic pointer input is generated from touch or gyroscope events for v1. (Note: this narrows BG-03's stated touch/gyroscope fallback — see Deferred Ideas.)

### Claude's Discretion
- Exact particle target-position generation algorithm per theme (e.g. how points are sampled onto each silhouette) is left to research/planning — no specific technique was requested by the user.
- Shape "disassembly" visual style (e.g. explode outward, fade, drift) is left to research/planning judgment, constrained only by legibility (BG-05) and the literal-silhouette requirement above.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Tech stack & version lock (already decided, do not re-litigate)
- `.claude/CLAUDE.md` — Full stack decision record: React 19.2.7, TypeScript 6.0.x, Vite ^6.3.6/6.4.3, Three.js 0.185.1, `@react-three/fiber` 9.6.1, `@react-three/drei` 10.7.7, Zustand 5.0.14, GSAP 3.15.0 + ScrollTrigger, Framer Motion/`motion` 12.42.2, `@react-three/postprocessing` 3.0.4 (optional, dynamic-import gated). Includes the `ThemeModule` contract pattern and mobile/`prefers-reduced-motion` discipline — all binding for this phase.

### Roadmap & requirements
- `.planning/ROADMAP.md` §"Phase 2: Background Engine & 4-Theme System" — Goal, dependencies, success criteria, and the sequencing note (build reference theme first, then replicate).
- `.planning/REQUIREMENTS.md` — BG-02, BG-03, BG-05, BG-06 (Phase 2 requirements); BG-01/BG-04 explicitly deferred to Phase 3.

### Project state
- `.planning/STATE.md` — Confirms Phase 1 is 3/4 complete (01-04 deployment plan still pending); flags Phase 2 for `--research-phase` due to no controlled benchmark existing for this project's GPU-driven particle interpolation approach.

### Existing code integration points
- `src/App.tsx` — Current render tree (`TopNav`, 9 `<main>` sections, `footer`). No background/canvas mount point exists yet; this phase must introduce one (e.g. a fixed/absolute full-bleed canvas layer behind `<main>`).
- `src/styles.css` — Dark palette (`--color-bg: #0B0F17`, `--color-accent: #22D3EE`) and existing `prefers-reduced-motion` precedent (currently gates only `scroll-behavior: smooth`, lines 43-47) — this phase must extend reduced-motion handling to the canvas/WebGL layer.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet specific to WebGL/background rendering — this is the first phase to introduce the canvas layer.

### Established Patterns
- Dark glass-morphism surface pattern (`--color-surface: rgba(17, 22, 32, 0.72)` + `backdrop-filter: blur(16px)`) used across `.skill-group`, `.certification-card`, `.education-entry`, `.project-card`, `.testimonial-card` — the background must render behind these surfaces without visually competing (BG-05 legibility requirement).
- `prefers-reduced-motion` is already checked once in `styles.css` for smooth scrolling; the canvas/WebGL RAF loop must independently check this same media query before starting, and listen for live changes (per BG-06 and the project's stated accessibility/motion requirements).

### Integration Points
- A new full-bleed canvas mount point must be added to `src/App.tsx`, likely as a sibling rendered behind `<main>` (fixed/absolute positioning), since no such mount point exists today.
- Zustand store for `activeTheme` / `opacity` / `scrollProgress` / `pointer` does not exist yet — this phase creates it (opacity control UI itself is Phase 3, but the store slice for opacity should exist now since BG-05/legibility depends on some default opacity value).

</code_context>

<specifics>
## Specific Ideas

- All 4 themes must be literal object silhouettes (see D-02 through D-06) — this was a deliberate override of Claude's originally-proposed abstract/diagrammatic options, confirmed directly by the user via free-text input on the Computers theme question, then confirmed as the pattern across all 4 themes.
- Human Evolution theme specifically wants a "progression" (ape-to-man sequence), not a single static silhouette — this may imply either multiple sequential target-shapes tied to scroll progress, or a single composite silhouette depicting the sequence; left to research/planning to resolve mechanically.

</specifics>

<deferred>
## Deferred Ideas

- **Touch/gyroscope-driven pointer simulation** — BG-03 as written in REQUIREMENTS.md mentions a touch/gyroscope fallback for mouse-reactivity on mobile. The user's decision (D-09) narrows this for v1 to scroll-only reactivity on touch devices, with no synthetic pointer generated from touch/gyroscope. Flag this gap to the researcher/planner: either treat D-09 as satisfying BG-03's "fallback" via scroll-only behavior, or revisit with the user if a gyroscope-driven effect turns out to be low-cost during research.
- **Chess theme (BG-07)** — already deferred to v2 in REQUIREMENTS.md; reconfirmed out of scope here, not re-discussed.

### Reviewed Todos (not folded)
None — no pending todos matched this phase during `cross_reference_todos`.

</deferred>

---

*Phase: 2-Background Engine & 4-Theme System*
*Context gathered: 2026-07-19*
