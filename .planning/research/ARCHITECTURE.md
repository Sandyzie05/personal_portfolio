# Architecture Research

**Domain:** Interactive personal portfolio (static SPA) with switchable animated backgrounds
**Researched:** 2026-07-18
**Confidence:** MEDIUM (established React/Canvas performance patterns, cross-checked across multiple independent sources; project-specific deployment details verified directly against the `jagdamba_automobiles` reference repo on disk, which counts as HIGH confidence for that portion)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│ Browser (client-only, no SSR)                                       │
├───────────────────────────────────────────────────────────────────┤
│ App Shell (React)                                                    │
│ ┌─────────────┐  ┌───────────────────────────┐  ┌────────────────┐  │
│ │ TopNav /    │  │ ContentLayer (z-index top) │  │ BackgroundLayer │  │
│ │ ThemePicker │  │  Hero / About / Experience │  │ (z-index behind,│  │
│ │ + Opacity   │  │  Projects / Skills / Certs │  │  full-bleed,    │  │
│ │ Slider      │  │  Education / Contact       │  │  low-opacity)   │  │
│ └──────┬──────┘  └──────────────┬──────────────┘  └────────┬───────┘  │
│        │ theme+opacity state    │ (no coupling to bg)      │          │
│        ▼                        │                          ▼          │
│ ┌─────────────────────────┐     │        ┌───────────────────────────┐│
│ │ ThemeContext / Store    │◄────┴───────►│ Theme Engine Contract     ││
│ │ (activeTheme, opacity)  │              │ (init/render/resize/      ││
│ │ persisted → localStorage│              │  destroy per theme)      ││
│ └─────────────────────────┘              └──────────┬────────────────┘│
├───────────────────────────────────────────────────────────────────┤
│ Interaction Layer (framework-agnostic, one instance shared by all    │
│ themes)                                                              │
│ ┌───────────────┐   ┌───────────────┐   ┌───────────────────────┐    │
│ │ scrollRef      │   │ pointerRef    │   │ rAF loop (single      │    │
│ │ (passive       │   │ (passive      │   │ ticker, one           │    │
│ │  scroll        │   │  pointermove  │   │ requestAnimationFrame │    │
│ │  listener)     │   │  listener)    │   │ call site)            │    │
│ └───────────────┘   └───────────────┘   └───────────────────────┘    │
├───────────────────────────────────────────────────────────────────┤
│ Rendering Backend (Canvas2D <canvas> element, one per page,         │
│ theme modules draw into it — see "Component Responsibilities")      │
├───────────────────────────────────────────────────────────────────┤
│ Persistence: window.localStorage (theme id, opacity value only —    │
│ no server, no cookies, no backend needed)                            │
└───────────────────────────────────────────────────────────────────┘

Build/deploy (unchanged from jagdamba_automobiles pattern):
┌──────────────┐   vite build    ┌───────────┐   scp/upload   ┌────────────────────────┐
│ Dev machine   │ ─────────────► │  dist/    │ ─────────────► │ cPanel Node app root:   │
│ (Vite+TS+React)│                │ (static)  │                │  app.js (http/fs/path/  │
└──────────────┘                 └───────────┘                │  url only) serves dist/ │
                                                                └────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|-------------------------|
| ContentLayer | Renders all portfolio sections (Hero, About, Experience, Projects, Skills, Certifications, Education, Contact) from static data files; owns document flow/scroll height | Plain React components, static content modules (e.g. `content/experience.ts`), semantic HTML, no knowledge of theme/animation internals |
| TopNav / ThemePicker | Presents 4 theme options + opacity control; writes selection to shared theme store; reads current theme/opacity for UI highlighting | Small React component; dispatches to a Context/store, not directly to the canvas |
| ThemeContext / Store | Single source of truth for `activeThemeId` and `opacity`; persists to `localStorage`; hydrates on load | React Context + `useReducer`, or a tiny external store (Zustand-style) to avoid re-render storms in content tree |
| Interaction Layer | Captures scroll position and pointer position at high frequency without triggering React renders; runs one shared `requestAnimationFrame` ticker | Custom hook(s) using `useRef` for `scrollY`, `pointerX/pointerY`, `rafId`; passive event listeners (`{ passive: true }`) on `scroll`/`pointermove`; single `requestAnimationFrame` loop shared across the whole app (not one per theme) |
| Background Rendering Engine | Owns the `<canvas>` element(s), the draw loop plumbing, resize/DPR handling, pause-when-tab-hidden logic; exposes a stable "theme module" contract | A `BackgroundStage` component that mounts one canvas, and imperatively hands frame data (scroll ref value, pointer ref value, elapsed time, canvas ctx) to whichever theme module is active |
| Theme Modules (x4: Computers, AI/Neural Network, Space, Human Evolution) | Implement the actual particle/shape system and assemble/disassemble visual logic for one theme, conforming to a shared interface | Independent modules under `src/backgrounds/themes/<theme>/`, each exporting `{ init(ctx, canvasSize), update(frameState), destroy() }`; no theme touches the DOM/content or owns its own rAF loop |
| Static Server (`app.js`) | Serves the built `dist/` folder as an SPA, with correct MIME types and SPA fallback to `index.html` | Dependency-free Node (`node:http`/`node:fs`/`node:path`/`node:url`), identical to `jagdamba_automobiles/app.js` — no changes needed for this feature |

## Recommended Project Structure

```
src/
├── content/                  # Static, typed data — sections author here
│   ├── hero.ts
│   ├── about.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── certifications.ts
│   ├── education.ts
│   └── contact.ts
├── sections/                  # Presentational components consuming content/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Certifications.tsx
│   ├── Education.tsx
│   └── Contact.tsx
├── nav/
│   ├── TopNav.tsx
│   ├── ThemePicker.tsx        # dropdown/segmented control, 4 options
│   └── OpacitySlider.tsx
├── theme/
│   ├── ThemeContext.tsx       # activeThemeId, opacity, setters, localStorage sync
│   └── themeStorage.ts        # get/set localStorage, schema versioning, defaults
├── interaction/
│   ├── useScrollPointerRef.ts # refs for scroll/pointer, passive listeners, single rAF
│   └── frameState.ts          # shared type: { scrollY, scrollRatio, pointerX, pointerY, t }
├── backgrounds/
│   ├── BackgroundStage.tsx    # mounts <canvas>, resize/DPR, delegates per-frame draw
│   ├── themeModule.ts         # shared TS interface all 4 themes implement
│   └── themes/
│       ├── computers/index.ts
│       ├── neuralNetwork/index.ts
│       ├── space/index.ts
│       └── humanEvolution/index.ts
├── App.tsx                    # composes TopNav + BackgroundStage + sections
└── main.tsx
```

### Structure Rationale

- **`content/` is separated from `sections/`:** content can be edited/expanded (résumé updates) without touching layout/JSX, and it can be authored/reviewed before any component code exists — this is what lets content scaffolding start immediately, in parallel with background-engine work.
- **`backgrounds/themes/*` are structurally identical, isolated modules:** each implements the same `themeModule.ts` contract (`init`, `update(frameState)`, `resize`, `destroy`), so `BackgroundStage` and the interaction layer are written once and reused by all 4 themes — adding a 5th theme (or the deferred Chess theme) later means adding one folder, not touching shared code.
- **`interaction/` has zero knowledge of theme content:** it only produces a `frameState` object (scroll ratio, pointer coords, elapsed time). This is the seam that lets 4 very different visual themes (particle grids, neural nets, starfields, evolution silhouettes) share one input pipeline.
- **`theme/` (persisted preference) is separate from `interaction/` (real-time input):** one changes rarely and needs persistence; the other changes 60x/second and must never touch React state/localStorage in the hot path.

## Architectural Patterns

### Pattern 1: Ref-driven interaction state + single shared rAF loop (not per-theme, not state-driven)

**What:** Scroll position and pointer position are captured in `useRef` values updated directly inside passive `scroll`/`pointermove` event listeners (never via `setState`). One `requestAnimationFrame` loop, owned by `BackgroundStage`, reads these refs each frame and calls `activeTheme.update(frameState)` to draw into the canvas imperatively.

**When to use:** Any time an animation reacts to input that changes far more often (dozens to hundreds of times/sec) than the UI actually needs to re-render.

**Trade-offs:** Extremely low React overhead (zero re-renders per frame); requires imperative/canvas-style code inside the theme modules rather than declarative JSX for the animated parts, which is a different mental model for a team otherwise writing normal React content components — but that's an acceptable, contained trade because only `backgrounds/*` is imperative; `sections/*` stays pure React.

**Example:**
```ts
// interaction/useScrollPointerRef.ts
export function useScrollPointerRef() {
  const frame = useRef({ scrollY: 0, scrollRatio: 0, pointerX: 0, pointerY: 0 });

  useEffect(() => {
    const onScroll = () => {
      frame.current.scrollY = window.scrollY;
      frame.current.scrollRatio =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    const onPointerMove = (e: PointerEvent) => {
      frame.current.pointerX = e.clientX;
      frame.current.pointerY = e.clientY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []); // mount once — never re-subscribe on render

  return frame; // stable ref object, never triggers re-render
}
```
```ts
// backgrounds/BackgroundStage.tsx (sketch)
useEffect(() => {
  let rafId: number;
  const loop = (t: number) => {
    activeThemeModule.current?.update({ ...frameRef.current, t }, ctx);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(rafId);
}, []); // one loop for the app; swapping themes swaps activeThemeModule.current, not the loop
```

### Pattern 2: Shared theme-module contract (strategy pattern) instead of 4 bespoke components

**What:** Define one TypeScript interface (`ThemeModule`) with `init(canvas, size)`, `update(frameState, ctx)`, `resize(size)`, `destroy()`. Each of the 4 themes is a plain object/class implementing it. `BackgroundStage` only ever talks to this interface, never to a specific theme's internals.

**When to use:** Whenever multiple visually distinct behaviors must share one rendering/interaction pipeline — the classic "strategy pattern" fit.

**Trade-offs:** Requires up-front interface design (slightly more effort before any theme is built) but eliminates the alternative — 4 copies of resize/DPR/rAF/pointer-mapping boilerplate that would drift out of sync and multiply bugs. Given this project explicitly has 4 (soon possibly 5, with Chess deferred) themes, the shared-contract cost pays for itself starting at theme #2.

### Pattern 3: Preference persistence via localStorage + Context, decoupled from per-frame interaction state

**What:** `activeThemeId` and `opacity` live in a small Context/store that reads from and writes to `localStorage` (e.g. keys `portfolio:theme`, `portfolio:opacity`) only on user action (picking a theme, dragging the slider) — not per frame. `BackgroundStage` reads `activeThemeId`/`opacity` from this context (a normal, infrequent React re-render is fine here) and only the *frame data* (scroll/pointer) bypasses React state.

**When to use:** Any low-frequency user preference that (a) must survive reloads and (b) must stay in sync with a picker UI.

**Trade-offs:** A theme switch does cause one React re-render (to mount the new theme module and swap opacity CSS var) — that's fine and desired, since it's a rare, deliberate action, unlike scroll/pointer which fire constantly. Keep opacity applied via a CSS custom property (`--bg-opacity`) on the canvas wrapper rather than passing it into the draw loop, so dragging the slider is a pure CSS repaint, not a canvas redraw trigger.

## Data Flow

### Interaction → Render Flow

```
[user scrolls / moves mouse]
        ↓ (native DOM event, passive listener)
[useScrollPointerRef: mutate ref, NO setState]
        ↓ (read once per animation frame)
[BackgroundStage rAF loop: build frameState { scrollRatio, pointerX, pointerY, t }]
        ↓ (imperative call)
[activeThemeModule.update(frameState, ctx)] → draws into <canvas> directly
```
No React re-render occurs anywhere in this path. Content sections scroll normally in the document flow; the canvas is fixed/absolute-positioned behind them and simply redraws.

### Preference → UI Flow

```
[user clicks ThemePicker option or drags OpacitySlider]
        ↓ (onClick / onChange — React event, low frequency)
[ThemeContext dispatch: setActiveTheme(id) / setOpacity(v)]
        ↓
[localStorage.setItem('portfolio:theme', id)]   (side effect)
        ↓
[Context value changes → React re-render of: TopNav (highlight), BackgroundStage (swap module)]
```

### Key Data Flows

1. **Cold load:** `ThemeContext` initializes by reading `localStorage` (falling back to a default theme, e.g. Computers, and default opacity, e.g. 0.15–0.25) before first paint, so there's no flash of the wrong theme.
2. **Theme switch:** `BackgroundStage` calls `destroy()` on the outgoing theme module, dynamically `import()`s the new theme's module (see Pattern below on code-splitting), calls `init()`, and continues the same shared rAF loop — the loop itself never restarts.
3. **Resize/orientation change:** A single `resize` listener (debounced) updates canvas backing-store size and DPI scaling, and calls `activeThemeModule.resize(size)` — not part of the hot per-frame path.

### Code-Splitting Per Theme (build-time concern, informs data flow)

Each theme module should be behind a dynamic `import()` (`() => import('./themes/space')`) rather than statically imported at the top of the bundle. Vite/Rollup will then emit one JS chunk per theme automatically; only the chunk for the currently selected (or previously persisted) theme is fetched over the network. This directly serves the "don't download all 4 themes' assets upfront" requirement, and requires no server-side logic — it's a pure client bundling concern, verified as Vite's standard code-splitting behavior for dynamic imports (Source: Vite discussions/community guides, MEDIUM confidence, cross-checked across multiple independent write-ups).

## Suggested Build Order

Given the background is the "novel/riskiest part" and content is the "must-ship, well-understood part," the least-risky order interleaves them rather than strictly sequencing all-content-then-all-background, or all-background-then-all-content:

1. **Scaffold app shell + static content sections first, against a placeholder/solid-color background.** Build `content/*`, `sections/*`, and basic layout/nav (no theme picker logic yet, just a static top bar). This validates the deployment pipeline (Vite build → `app.js` static serve, matching `jagdamba_automobiles`) immediately, de-risking the *deployment* unknown early and cheaply, and gives a stable "empty canvas" host for the animation work to slot into next. Do **not** wait for the background engine to be feature-complete before this — content and layout have no dependency on it.
2. **Build the interaction layer + BackgroundStage shell with ONE trivial placeholder theme (e.g. simple moving dots), not all 4 yet.** This proves the riskiest technical bets — the ref/rAF pipeline, canvas resize/DPR handling, opacity control, performance over real scrolling content — against real content from step 1, without yet paying the cost of designing 4 distinct visual systems. This is the highest-uncertainty step and should be validated in isolation before multiplying effort across 4 themes.
3. **Only after the shared engine + one theme is proven smooth (no jank, acceptable CPU, correct z-index/legibility over content), implement the remaining 3 theme modules** (Neural Network, Space, Human Evolution) against the now-stable `ThemeModule` contract. This is comparatively low-risk, repetitive work once the contract and pipeline are validated — the shared interface (Pattern 2) is exactly what makes adding themes 2–4 cheap.
4. **Add the ThemePicker UI + localStorage persistence + opacity slider last, wiring to the already-working `ThemeContext`.** This is simple, well-understood React state/UI work with no unknowns, and doing it last means it can immediately exercise all 4 real themes rather than a placeholder.
5. **Final pass: code-splitting verification (confirm per-theme chunks in `dist/assets`), performance pass (mobile/low-end CPU throttling, `prefers-reduced-motion` fallback), and deployment to MilesWeb using the unchanged `app.js` pattern.**

**Rationale for this order:** Building all content before any background risks discovering late that the interaction/rendering approach doesn't perform well over real DOM content (long pages, many sections) — better to prove that early with a throwaway placeholder theme once real content exists. Conversely, building all 4 full theme visual systems before validating the shared engine risks having to retrofit the contract into 4 already-diverged implementations. Building the *shell* of both together, then only the *breadth* (4 themes) once the *depth* (one theme's full pipeline) is proven, minimizes rework.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Single visitor / low traffic (this project's actual scale) | Current design is already sufficient — no server-side rendering, no database, no CDN needed; MilesWeb shared hosting + dependency-free static server is appropriate and should not be over-engineered |
| Slow/low-end client devices | Cap particle counts and rAF work per theme based on `navigator.hardwareConcurrency` or a simple FPS-monitor downgrade; honor `prefers-reduced-motion` by disabling animation/motion (keep a static low-opacity image or freeze-frame instead) |
| Larger content growth (more projects/experience entries over time) | `content/*` files can grow freely without touching the background engine at all — this is the benefit of the decoupling; no architectural change needed |

### Scaling Priorities

1. **First (and only realistic) bottleneck: client-side rendering performance on the visitor's device**, not server/traffic scale. Mitigate via the shared rAF loop (never per-theme timers), passive listeners, and a device-capability-based particle/complexity budget per theme.
2. **Second: initial bundle size** if all 4 themes were bundled eagerly. Mitigated entirely at build time via per-theme dynamic `import()` code-splitting (see above) — no runtime architecture change needed, just correct import style from day one.

## Anti-Patterns

### Anti-Pattern 1: Driving canvas animation from React state/props on every frame

**What people do:** Store `mouseX`/`scrollY` in `useState` and call `setMouseX(e.clientX)` on every `mousemove`/`scroll` event, then re-render a component tree (or re-run a `useEffect`) each frame to draw.

**Why it's wrong:** Causes tens to hundreds of React re-renders per second (a "re-render storm"), fights the browser's paint scheduling, and produces visible jank — confirmed as the canonical pitfall across multiple independent React+canvas guides (CSS-Tricks, Pete Corey, philna.sh), which uniformly recommend refs instead.

**Do this instead:** Use `useRef` for all per-frame values; only call `setState` for rare, deliberate UI changes (theme switch, opacity change) — see Pattern 1/3 above.

### Anti-Pattern 2: One `requestAnimationFrame` loop + one set of scroll/mouse listeners per theme module

**What people do:** Let each of the 4 theme components independently call `requestAnimationFrame` and independently attach `scroll`/`pointermove` listeners.

**Why it's wrong:** Duplicates the exact boilerplate this project needs to share across 4 (soon 5) themes; risks multiple competing rAF loops running simultaneously during a theme swap if cleanup timing is off; makes it easy for themes to silently diverge in resize/DPR handling.

**Do this instead:** One shared `BackgroundStage` owns the single canvas, the single rAF loop, and the single set of passive listeners; theme modules are pure `update(frameState, ctx)` functions with no event/loop ownership of their own (Pattern 2).

### Anti-Pattern 3: Eagerly importing all 4 theme modules (and their assets) in the main bundle

**What people do:** `import ComputersTheme from './themes/computers'` etc. at the top of `App.tsx` alongside the other three, so all 4 are always in the initial JS payload regardless of which one is selected.

**Why it's wrong:** Forces every visitor to download all 4 themes' code/assets on first load even though only one renders at a time — pure wasted bandwidth/parse time, especially relevant on a personal-brand site where first-impression load speed matters.

**Do this instead:** Use `React.lazy`/dynamic `import()` keyed by theme id so Vite/Rollup emits separate chunks and only the active (or last-persisted) theme's chunk is fetched (see Code-Splitting section above).

### Anti-Pattern 4: Coupling background animation logic to content-section components

**What people do:** Have `Hero.tsx` or `Experience.tsx` reach into the canvas/theme engine directly (e.g. to trigger a "reveal" effect tied to a specific section).

**Why it's wrong:** Re-introduces tight coupling between the two halves of the system the requirements explicitly ask to decouple, and makes it impossible to reuse the interaction/rendering framework across themes without also touching content code.

**Do this instead:** Content sections only affect the shared `frameState` indirectly, via generic signals every theme already consumes (`scrollRatio`, `pointerX/Y`) — never via section-specific hooks into a particular theme's internals. If per-section triggers are wanted later (e.g. "assemble more near the Projects section"), expose them as an additional generic field in `frameState` (e.g. `scrollRatio` bucketed by section boundary, computed by the interaction layer via `IntersectionObserver`), not as a direct call from a section component into a theme module.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| None required for background/theme feature | N/A | This is a purely client-side feature; no API, no backend, no database changes needed anywhere in this system |
| GitHub (Projects section, per PROJECT.md) | Content is manually curated at build time from `Sandyzie05` repos, not live-fetched (per project context, no confirmed live API integration decided yet) | Keep this decoupled from the background/theme architecture entirely — it's a `content/projects.ts` data-population concern, unrelated to rendering |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| ContentLayer ↔ ThemeContext | React Context read only (for nothing — content sections should not need theme state at all in v1) | Keep this boundary at zero coupling; content renders identically regardless of active theme |
| TopNav/ThemePicker ↔ ThemeContext | Context dispatch (`setActiveTheme`, `setOpacity`) | Low frequency, normal React re-render is fine |
| ThemeContext ↔ BackgroundStage | Context read (`activeThemeId`, `opacity`) | Triggers module swap + CSS var update, not per-frame work |
| Interaction Layer ↔ BackgroundStage | Ref object passed down, read inside rAF loop | Zero React re-renders; this is the perf-critical boundary |
| BackgroundStage ↔ Theme Modules | Calls into the shared `ThemeModule` interface (`init/update/resize/destroy`) | This is the sole boundary theme authors need to implement against — the reuse point across all 4 (and future) themes |
| Static Server (`app.js`) ↔ everything else | Serves static files only; no runtime coupling to any client-side architecture decision above | Confirmed no server changes needed — verified directly against `jagdamba_automobiles/app.js` (dependency-free `node:http`/`fs`/`path`/`url` static + SPA-fallback server); the animated background, theme picker, and persistence are all resolved entirely client-side after `dist/index.html` and its JS bundle load |

## Sources

- Direct inspection of `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles/app.js` and `package.json` (reference deployment pattern) — HIGH confidence, primary source
- `/Users/sandgupt/RandomIdeasWithAI/personal_portfolio/.planning/PROJECT.md` — project requirements/constraints
- [Using requestAnimationFrame with React Hooks (CSS-Tricks)](https://css-tricks.com/using-requestanimationframe-with-react-hooks/) — MEDIUM confidence
- [Performant animations with requestAnimationFrame() and React hooks (Medium)](https://layonez.medium.com/performant-animations-with-requestanimationframe-and-react-hooks-99a32c5c9fbf) — MEDIUM confidence
- [Techniques for animating on the canvas in React (philna.sh)](https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/) — MEDIUM confidence
- [Animating a Canvas with React Hooks (Pete Corey)](https://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/) — MEDIUM confidence
- [How to optimize large projects with dynamic imports and code splitting in ViteJS (vitejs/vite Discussion #17730)](https://github.com/vitejs/vite/discussions/17730) — MEDIUM confidence
- [Vite code splitting that just works (Sambit Sahoo)](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html) — MEDIUM confidence
- General React/canvas performance guidance cross-checked across multiple independent community sources (CSS-Tricks, Medium, philna.sh, Pete Corey) converging on the same ref+rAF pattern

---
*Architecture research for: interactive personal portfolio (static SPA, switchable animated backgrounds)*
*Researched: 2026-07-18*
