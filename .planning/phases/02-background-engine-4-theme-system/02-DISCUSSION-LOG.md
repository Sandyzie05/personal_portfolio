# Phase 2: Background Engine & 4-Theme System - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-19
**Phase:** 2-Background Engine & 4-Theme System
**Areas discussed:** Theme visual identity, Reference theme choice, Particle density & feel, Scroll/mouse reactivity model

---

## Reference Theme Choice

| Option | Description | Selected |
|--------|-------------|----------|
| Computers | Simplest/most familiar geometry (screens, keyboards, server racks) — recommended as lowest-risk first build for proving the shared engine | ✓ |
| AI/Neural Network | Node/edge graph geometry — natural fit for particle-point clouds but more complex interpolation | |
| Space | Starfield/rocket geometry | |
| Human Evolution | Multi-figure progression geometry — most complex, best built last | |

**User's choice:** Computers (Recommended)
**Notes:** Chosen as the reference theme against which the shared `ThemeModule` contract, RAF loop, resize/DPR handling, and mount/unmount lifecycle are proven first, per the roadmap's sequencing note.

---

## Theme Visual Identity — Computers

| Option | Description | Selected |
|--------|-------------|----------|
| Circuit board | Abstract PCB trace/node pattern | |
| Terminal/wireframe | Abstract terminal-window wireframe | |
| Server rack | Abstract rack-unit silhouette | |
| You decide | Claude picks | |

**User's choice:** Free-text override — **"A computer"**
**Notes:** The user did not select any of the proposed abstract/diagrammatic options and instead specified via free text that particles should assemble into the literal shape of a computer. This shifted the creative direction for all remaining theme questions toward literal object silhouettes rather than abstract/diagrammatic shapes.

---

## Theme Visual Identity — AI/Neural Network

| Option | Description | Selected |
|--------|-------------|----------|
| Humanoid robot / android | Literal robot/android silhouette, consistent with the literal-object direction set by the Computers answer | ✓ |
| Neuron/node graph | Abstract neural-network graph (originally-proposed default) | |
| Brain silhouette | Literal brain shape | |

**User's choice:** Humanoid robot / android
**Notes:** Confirms the literal-object-silhouette pattern carries across themes, following the free-text override on the Computers question.

---

## Theme Visual Identity — Space

| Option | Description | Selected |
|--------|-------------|----------|
| Rocket / spaceship (Recommended) | Literal rocket/spaceship silhouette | ✓ |
| Starfield/planet | Abstract starfield or planet shape | |
| Astronaut | Literal astronaut figure | |

**User's choice:** Rocket / spaceship (Recommended)
**Notes:** Continues the literal-object pattern.

---

## Theme Visual Identity — Human Evolution

| Option | Description | Selected |
|--------|-------------|----------|
| Ape-to-man silhouette progression (Recommended) | A sequence of figures depicting the classic evolutionary progression, rather than a single static shape | ✓ |
| Single hominid silhouette | One static figure | |
| DNA helix | Abstract helix shape | |

**User's choice:** Ape-to-man silhouette progression (Recommended)
**Notes:** This is a sequence/progression rather than a single silhouette — mechanically how this maps to scroll-driven interpolation is left to research/planning (see CONTEXT.md Specific Ideas).

---

## Particle Density & Feel

| Option | Description | Selected |
|--------|-------------|----------|
| Moderate density (Recommended) | A few hundred to ~1,000-1,500 particles on desktop, clamped further on mobile | ✓ |
| Sparse/minimal | Very few particles, more abstract/subtle | |
| Dense/rich | 2,000+ particles for maximal visual impact | |

**User's choice:** Moderate density (Recommended)
**Notes:** Chosen with the mobile battery/performance budget explicitly in mind, consistent with the project-wide mobile clamping discipline already locked in `.claude/CLAUDE.md`.

---

## Scroll/Mouse Reactivity Model

| Option | Description | Selected |
|--------|-------------|----------|
| Continuous scroll-driven (Recommended) | Particles interpolate smoothly along a scroll-progress value | ✓ |
| Discrete scene-snapping | Background snaps between distinct "scenes" at scroll breakpoints | |

**User's choice:** Continuous scroll-driven (Recommended)

| Option (mobile input) | Description | Selected |
|--------|-------------|----------|
| Scroll-only, no simulated pointer (Recommended) | No synthetic pointer/gyroscope input generated on touch devices — scroll alone drives reactivity | ✓ |
| Touch-drag as pointer | Map touch-drag gestures to a simulated pointer position | |
| Gyroscope-driven | Use device orientation as a simulated pointer input | |

**User's choice:** Scroll-only, no simulated pointer (Recommended)
**Notes:** This narrows BG-03's stated "touch/gyroscope fallback" — flagged as a deferred/reviewable gap in CONTEXT.md rather than silently dropped.

---

## Claude's Discretion

- Exact particle target-position sampling algorithm per theme (how points map onto each silhouette).
- Shape "disassembly" visual style (explode/fade/drift), constrained by legibility and the literal-silhouette requirement.
- Mechanical implementation of the Human Evolution "progression" (multiple scroll-tied target shapes vs. one composite silhouette).

## Deferred Ideas

- Touch/gyroscope-driven pointer simulation for mobile — narrowed to scroll-only per D-09; flagged for researcher/planner review against BG-03's original wording.
- Chess theme (BG-07) — already deferred to v2, reconfirmed out of scope, not re-discussed.
