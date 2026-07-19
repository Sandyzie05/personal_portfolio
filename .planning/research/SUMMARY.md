# Project Research Summary

**Project:** Personal Portfolio (interactive, theme-switchable background)
**Domain:** Personal/developer portfolio website (Senior SRE / Platform Engineer) with a signature interactive WebGL background, deployed as a static SPA on constrained shared Node.js hosting
**Researched:** 2026-07-18
**Confidence:** MEDIUM-HIGH

## Executive Summary

This is a static, client-only React/TypeScript/Vite SPA whose flagship differentiator is a full-bleed, low-opacity, theme-switchable animated background (Computers, AI/Neural Network, Space, Human Evolution) that reacts to scroll and pointer, layered behind conventional recruiter-facing portfolio content (Hero, About, Experience, Projects, Skills, Certifications, Education, Contact). Experts build this class of effect with WebGL via Three.js wrapped in React Three Fiber (R3F) rather than Canvas2D/SVG/CSS, because GPU-driven instanced particle interpolation is the only approach that scales cleanly to "N points assemble/disassemble" across four shared themes without per-theme hand-rolled physics. The site deploys with zero SSR/runtime Node dependencies -- matching the proven jagdamba_automobiles static-SPA-on-cPanel/Passenger pattern -- so all animation-library choices are purely client-side concerns with no hosting-constraint conflicts.

The recommended approach is: one shared Canvas/interaction pipeline (single requestAnimationFrame loop, ref-driven scroll/pointer capture, never React state) with four theme modules implementing one shared ThemeModule contract (init/update/resize/destroy), each code-split via dynamic import(). Content lives in typed data files fully decoupled from the background engine, letting content work proceed in parallel with animation work. GSAP+ScrollTrigger (now free, April 2025 license change) drives content-section choreography; Zustand holds theme/opacity/pointer state read inside the render loop without triggering re-renders; Framer Motion handles UI micro-interactions.

The dominant risk cluster is entirely about discipline around the animation engine, not the content: uncancelled RAF loops/leaked GPU resources on theme switch, main-thread jank from non-passive listeners, mobile battery/thermal throttling, missing prefers-reduced-motion support, and per-theme contrast failures behind text. A second, equally important risk is scope: treating all four themes as equally-weighted parallel builds risks never reaching a shippable milestone. Mitigation is to build the shared engine contract against exactly one theme first, get the full site (content + one theme) genuinely shippable, then replicate the remaining three themes against the proven contract -- while content sections ship independently of animation completeness.

## Key Findings

### Recommended Stack

React 19.2.7 + TypeScript 6.0.x (not 7.0 -- no stable programmatic compiler API yet) + Vite ^6.3.6, matching the Node engine range (^18.0.0 || ^20.0.0 || >=22.0.0) already proven by the jagdamba_automobiles reference deployment. The animation engine is Three.js + React Three Fiber + drei, all pure client-side/browser libraries with zero SSR or Node-runtime coupling, so the dependency-free static-hosting constraint (CloudLinux LVE, no WASM at runtime) is a non-issue -- Vite/esbuild's WASM usage is build-time only and never touches the production server.

**Core technologies:**
- **Three.js (0.185.1) + React Three Fiber (9.6.1) + drei (10.7.7)**: WebGL rendering engine + declarative React scene graph -- purpose-built for GPU-driven "N particles interpolate between target-position buffers," the exact assemble/disassemble pattern needed; one shared Canvas/render loop across all 4 themes.
- **Zustand (5.0.14)**: tiny shared store for activeTheme/opacity/live pointer/scroll values, written outside React's render cycle and read inside useFrame to avoid re-render storms.
- **GSAP + ScrollTrigger (3.15.0)**: content-section scroll choreography -- free for commercial use since April 30, 2025 (Webflow-owned, license change confirmed via official pricing page).
- **Framer Motion / motion (12.42.2)**: UI micro-interactions (nav, theme picker, opacity slider) -- same version already proven in the jagdamba_automobiles reference project.
- **@react-three/postprocessing (3.0.4, optional)**: bloom/glow, gated behind dynamic import only for themes that benefit (Space, AI/Neural-Network).

Avoid: TypeScript 7.0 (tooling incompatible until 7.1), Vite 8.x (narrower Node floor than the proven hosting pattern), tsParticles/PixiJS as the primary rendering engine (both fight against a bespoke shader-controlled assemble/disassemble look), and any Next.js/Remix/edge-runtime WebGL tutorial pattern (irrelevant -- this is a plain static Vite SPA with no SSR).

### Expected Features

**Must have (table stakes):**
- Hero with name + one-line positioning, About, Experience timeline with quantified achievements, Skills grouped by category (no fake skill-bar percentages), Certifications, Education
- Curated Projects section (3-6 repos, not all ~30) with descriptions, tech tags, GitHub links
- Contact mechanism + one-click resume download, combining visible email/LinkedIn/GitHub links (not a forms-only page)
- Responsive/mobile-first layout, Core Web Vitals-clean performance (LCP <2.5s, INP <200ms, CLS <0.1), basic SEO meta tags, accessibility basics (contrast, alt text, keyboard nav, semantic headings)
- No broken links / dead demos (ongoing maintenance discipline, not a one-time build task)

**Should have (competitive differentiators):**
- The 4-theme animated, scroll+mouse-reactive background itself -- genuinely rare in this domain, the project's core signature feature
- Case-study-style project writeups (problem -> approach -> trade-offs -> outcome) for 2-4 flagship projects
- Live/curated GitHub stats or pinned-repo cards (build-time fetch, not a third-party hosted widget)
- Dark mode folded into the existing theme system (not a second independent toggle)
- User-facing background opacity/intensity control (doubles as an accessibility affordance)

**Defer (v2+):**
- Manually-curated LinkedIn recommendations (blocked on external, non-technical recommender permission -- no live API exists since 2015)
- Blog/writing section (abandoned blogs are rated worse than no blog; conflicts with ship-fast v1 priority)
- 5th+ background theme, e.g. deferred Chess theme (design the theme-module contract now so this is a low-cost v2 add later)

### Architecture Approach

A layered client-only architecture: a ContentLayer (plain React components + typed content data files) sits visually above a BackgroundLayer (one canvas, full-bleed, low-opacity, pointer-events: none), coordinated by a ThemeContext/store (persisted preference: activeTheme, opacity) that is strictly decoupled from a separate Interaction Layer (ref-driven scroll/pointer capture feeding one shared requestAnimationFrame loop). Background themes are structurally identical modules implementing one shared ThemeModule interface (init/update/resize/destroy) -- a strategy pattern that lets BackgroundStage and the interaction pipeline be written once and reused across all 4 (and future) themes. Deployment is unchanged from the proven jagdamba_automobiles pattern: vite build -> static dist/ -> dependency-free Node http server on cPanel/Passenger.

**Major components:**
1. **BackgroundStage + Theme Modules** -- owns the canvas, single shared RAF loop, resize/DPR handling; delegates per-frame draw to whichever theme module is active via a fixed contract
2. **Interaction Layer** -- captures scroll/pointer via passive listeners into refs (never setState), producing a generic frameState object every theme consumes identically
3. **ThemeContext/Store** -- low-frequency persisted preference (theme id, opacity) via localStorage, decoupled from the 60x/sec interaction state
4. **ContentLayer** -- static, typed content data files + presentational section components, zero coupling to theme/animation internals
5. **Static Server (app.js)** -- dependency-free node:http/fs/path/url, unchanged from the reference deployment pattern

**Suggested build order:** scaffold content + placeholder background first (de-risks deployment early) -> build the shared engine + ONE trivial theme (proves the riskiest technical bet in isolation) -> implement remaining 3 themes against the now-stable contract -> wire ThemePicker/opacity UI last -> final code-splitting/perf/accessibility pass.

### Critical Pitfalls

1. **Uncancelled RAF loops & leaked listeners/GPU resources on theme switch** -- mandate a mount()/unmount() lifecycle contract from the start (every theme disposes geometries/materials/textures, cancels its RAF, removes listeners) so switching themes repeatedly doesn't progressively degrade FPS or leak GPU memory.
2. **Main-thread jank from non-passive listeners / synchronous layout reads** -- enforce "listeners write refs, RAF reads and renders" as a hard rule from theme #1; never query the DOM inside scroll/mousemove callbacks.
3. **Mobile battery drain & thermal throttling** -- pause the RAF loop on document.hidden/off-screen (IntersectionObserver), cap particle count and devicePixelRatio by device tier; test on a real mid-tier phone, not just DevTools throttling.
4. **Missing prefers-reduced-motion support and no manual pause control** -- canvas/WebGL animation isn't auto-respected the way CSS transitions are; check matchMedia before starting the RAF loop, listen for live OS changes, and ship an in-UI opacity/motion control regardless of OS setting.
5. **Theme-dependent contrast failure / touch has no mousemove equivalent** -- validate contrast per-theme against the busiest ("assembled") animation frame (not a calm screenshot); design the interaction model input-hierarchy (scroll first, then feature-detected mousemove/touch/gyroscope) rather than desktop-first-then-patch.
6. **Over-scoping v1 with all 4 themes built in parallel** -- this is a roadmap-level pitfall: build the shared contract against one theme, reach a genuinely shippable milestone (content + 1 theme), then treat the remaining 3 as lower-risk replicable follow-on phases.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: App Shell, Content Scaffold & Deployment Pipeline
**Rationale:** De-risks the deployment unknown immediately and cheaply; content has zero dependency on the background engine and should not wait for it.
**Delivers:** Vite+React+TS app scaffold, all 8 content sections (Hero/About/Experience/Projects/Skills/Certs/Education/Contact) rendering from typed data files against a placeholder/solid-color background, deployed end-to-end via the proven app.js/cPanel/Passenger pattern (including MIME/cache-header map, SPA fallback, restart-on-deploy runbook).
**Addresses:** All table-stakes features from FEATURES.md.
**Avoids:** Pitfall 10 (stale deploy/Passenger restart), Pitfall 11 (MIME/cache headers), Pitfall 12 (route fallback), Pitfall 14 (content drift -- data-driven content architecture from day one).

### Phase 2: Background Engine Core + One Reference Theme
**Rationale:** This is the highest-uncertainty step in the whole project; proving the ref/RAF pipeline, canvas resize/DPR, mount/unmount lifecycle, opacity control, and performance against real content (from Phase 1) in isolation -- before multiplying effort across 4 themes -- is the single most important sequencing decision from ARCHITECTURE.md and PITFALLS.md.
**Delivers:** Shared BackgroundStage, ThemeModule contract, interaction layer (passive listeners + refs + single RAF loop), prefers-reduced-motion handling, pause-when-hidden/offscreen, one fully working theme (e.g. Computers) reaching a genuinely shippable, accessibility/perf-hardened state.
**Uses:** Three.js, React Three Fiber, drei, Zustand from STACK.md.
**Implements:** BackgroundStage, Interaction Layer, ThemeContext components from ARCHITECTURE.md.
**Avoids:** Pitfalls 1, 2, 3, 4, 5, 6, 13 (lifecycle leaks, jank, battery drain, reduced-motion, click-through, over-scoping).

### Phase 3: Remaining Three Themes (Neural Network, Space, Human Evolution)
**Rationale:** Comparatively low-risk, repetitive work once the contract and pipeline are validated in Phase 2 -- this is exactly what the shared-module strategy pattern is designed to make cheap.
**Delivers:** Three additional theme modules implementing the proven ThemeModule interface, each code-split via dynamic import().
**Addresses:** The full 4-theme differentiator from FEATURES.md.
**Avoids:** Pitfall 7 (theme-dependent contrast -- validated per-theme against each theme's busiest frame), Pitfall 9 (touch/mousemove fallback verified per-theme).

### Phase 4: Theme Picker UI, Opacity Control & Preference Persistence
**Rationale:** Simple, well-understood React/UI work with no unknowns; doing it last lets it immediately exercise all 4 real themes rather than a placeholder.
**Delivers:** Keyboard-operable theme picker (native button/role="radiogroup" semantics), opacity slider with accessible labeling, localStorage persistence, dark-mode folded into theme palettes.
**Uses:** Framer Motion for UI micro-interactions.
**Avoids:** Pitfall 8 (theme-picker keyboard/focus issues).

### Phase 5: Performance, Accessibility & Launch Hardening
**Rationale:** A dedicated final pass catches cross-cutting issues (device-tier budgets, cross-theme contrast, SEO/CWV) that individual theme phases can't fully validate in isolation.
**Delivers:** Code-splitting verification (per-theme chunks confirmed in dist/assets), mobile/low-end device testing, Lighthouse/axe accessibility audit, SEO meta tags, final content accuracy pass.
**Addresses:** Responsive/CWV/accessibility table stakes from FEATURES.md.
**Avoids:** Pitfall 4 (mobile battery), remaining items on the "Looks Done But Isn't" checklist from PITFALLS.md.

### Phase Ordering Rationale

- Content and the background engine are deliberately interleaved rather than strictly sequential: content ships first because it has zero dependency on the animation engine, and the highest-uncertainty animation work (Phase 2) is validated against real content early rather than late.
- Building one theme fully before the other three (Phase 2 -> 3) directly counters PITFALLS.md's #13 (over-scoping v1 with 4 parallel builds) -- this is the single most important sequencing decision surfaced by research.
- UI/persistence work (Phase 4) is deliberately last because it's low-risk and benefits from having all 4 real themes to wire against.
- A dedicated hardening phase (5) exists because several pitfalls (contrast, battery, MIME/caching) are cross-cutting and only fully verifiable once all themes and content exist together.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Background Engine Core):** Novel, highest-technical-risk work (GPU-driven particle interpolation, shader/attribute-based assemble/disassemble) -- no controlled benchmark exists for this project's specific particle counts/shapes; needs --research-phase to validate concrete shader/GPGPU implementation patterns.
- **Phase 3 (Remaining themes):** Each theme's specific visual/shape design (neural network topology, starfield, evolution silhouette) is creative/technical territory not covered by generic research -- may need lightweight research per theme for shape-generation techniques.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Content + deployment):** Well-documented, established patterns; deployment pipeline already proven via the jagdamba_automobiles reference project.
- **Phase 4 (Theme picker/UI):** Standard React/accessibility patterns, no unknowns.
- **Phase 5 (Hardening):** Standard performance/accessibility audit tooling (Lighthouse, axe), well-documented checklist already captured in PITFALLS.md.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Package versions verified directly against npm registry metadata; GSAP license fact corroborated by official vendor page + independent press; ecosystem comparisons (WebGL vs Canvas2D/PixiJS) are MEDIUM-confidence synthesized web consensus |
| Features | MEDIUM | Cross-corroborated across many independent 2025/2026 portfolio guides and hiring-manager surveys; no single authoritative spec exists for this domain, so treat as strong consensus rather than ground truth |
| Architecture | MEDIUM-HIGH | Core React+canvas performance patterns (refs/RAF, passive listeners) are well-established and cross-checked across multiple independent sources; deployment-specific details verified directly against the jagdamba_automobiles reference repo (HIGH for that portion) |
| Pitfalls | MEDIUM | Cross-verified against MDN/W3C/web.dev for accessibility claims and GitHub issues for MIME-type gotchas; project-specific hosting constraints taken as given from PROJECT.md |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- No Context7/official-vendor-docs session was reachable during stack research -- narrative claims beyond npm registry version data should be spot-checked against Vite/Three.js/R3F official docs before finalizing the build pipeline.
- The specific visual/shape design for each of the 4 themes (what particles assemble into, exact color palettes) is a creative decision not resolved by this research -- flag for design/prototyping during Phase 2/3 planning.
- GitHub repo triage (which 3-6 of ~30 Sandyzie05 repos to curate) has not been done -- this is a hard ordering dependency for the Projects section and should happen early in Phase 1 content work.
- LinkedIn recommendation permissions (a manual, non-technical, potentially slow external dependency) should be initiated early if that v1.x feature is ever pursued, since it can't be resolved inside a coding phase.

## Sources

### Primary (HIGH confidence)
- npm registry direct metadata (registry.npmjs.org) for three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, motion/framer-motion, zustand, vite, typescript, react
- Direct inspection of jagdamba_automobiles/app.js and package.json (proven reference deployment pattern)
- .planning/PROJECT.md -- project requirements/constraints
- GSAP/Webflow license change -- gsap.com/pricing, webflow.com/blog/gsap-becomes-free, css-tricks.com
- TypeScript 7.0 GA/API-stability -- devblogs.microsoft.com/typescript, typescript-eslint GitHub issue #12123

### Secondary (MEDIUM confidence)
- WebGL vs Canvas2D/PixiJS particle performance comparisons (blog.maximeheckel.com, r3f.docs.pmnd.rs, Codrops, bestofjs.org)
- React+canvas RAF/ref performance patterns (CSS-Tricks, Pete Corey, philna.sh, Medium)
- Vite code-splitting/dynamic import behavior (vitejs/vite Discussion #17730, Sambit Sahoo blog)
- prefers-reduced-motion + WCAG animation guidance (MDN, W3C WAI, web.dev, OpenReplay)
- MIME-type/caching gotchas for custom Node static servers (MDN, expressjs/express GitHub Issue #3589)
- Developer/SRE portfolio feature consensus (nucamp.co, Hakia, Fueler, daily.dev Recruiter, DEV Community, Pesto, Arc.dev, CareerFoundry)
- Mobile mousemove/gyroscope fallback patterns (matthew.wagerfield.com/parallax, wagerfield/parallax GitHub Issue #268)

### Tertiary (LOW confidence)
- None flagged as low-confidence; all sources above were independently cross-checked at least once

---
*Research completed: 2026-07-18*
*Ready for roadmap: yes*
