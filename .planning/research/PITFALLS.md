# Pitfalls Research

**Domain:** Interactive-background personal portfolio site (theme-switchable canvas/WebGL background + static professional content, deployed to constrained shared Node.js hosting)
**Researched:** 2026-07-18
**Confidence:** MEDIUM (cross-verified web sources for technical claims; project-specific hosting constraints taken as given from PROJECT.md and the proven `jagdamba_automobiles` deployment pattern)

## Critical Pitfalls

### Pitfall 1: Uncancelled Animation Loops & Leaked Listeners on Theme Switch
**What goes wrong:** Switching from one background theme (e.g. Space) to another (e.g. Human Evolution) starts a new `requestAnimationFrame` loop and new scroll/mouse listeners without tearing down the previous theme's loop and listeners. Over a session with several theme switches, multiple RAF loops run concurrently, each doing full scene updates — frame rate degrades progressively the longer a visit lasts, which is exactly backwards for a portfolio (recruiters often browse for a while).
**Why it happens:** Each theme is built as its own module/class with its own `init()`, but `destroy()`/`dispose()` is never implemented or never called from the theme switcher, because it "worked" in manual testing (single theme, short session).
**How to avoid:** Design a single theme-engine lifecycle contract from the start: every theme module must expose `mount(canvas)` and `unmount()`; `unmount()` must call `cancelAnimationFrame`, remove all listeners it added, and dispose all GPU resources (see Pitfall 2). The switcher only ever has one active theme instance at a time — enforce this with a single owning controller, not per-theme globals.
**Warning signs:** FPS counter (dev overlay) drops after 3-4 theme switches in the same session; Chrome Task Manager shows GPU/CPU usage climbing without a corresponding increase in visible complexity; multiple `requestAnimationFrame` IDs logged if you instrument the scheduler.
**Phase to address:** Background Engine / Theme Framework phase — build the mount/unmount contract before building the first theme, not after all four exist.

---

### Pitfall 2: GPU Memory Leak from Undisposed Three.js/Canvas Resources Across Theme Switches
**What goes wrong:** Geometries, materials, textures, and render targets allocated by a WebGL theme are not automatically garbage-collected by the browser — they must be explicitly disposed. Repeated theme switching (or even repeated resize/regenerate of particle systems within one theme) leaks GPU memory until the tab slows down, the WebGL context is lost ("Rats! WebGL hit a snag"), or mobile Safari kills the tab.
**Why it happens:** Developers assume JS garbage collection covers GPU-side objects too; `.dispose()` calls are easy to forget because their absence has no visible effect on a quick local test.
**How to avoid:** In every theme's `unmount()`, explicitly call `.dispose()` on every geometry, material, and texture created, plus `renderer.dispose()` if the renderer itself is recreated per theme (prefer one shared renderer with a swapped scene, which reduces context churn). Add a lightweight leak check to manual QA: switch through all 4 themes 10x in a row and watch `performance.memory` / GPU memory in DevTools for a plateau vs. a monotonic climb.
**Warning signs:** Tab memory climbs each theme switch and never comes back down; WebGL context loss errors in console after extended use; degraded performance after navigating away and back to the site (bfcache restore).
**Phase to address:** Background Engine / Theme Framework phase (contract-level), verified per-theme during each Theme Implementation phase.

---

### Pitfall 3: Main-Thread Jank from Non-Passive Scroll/Mouse Listeners and Synchronous Layout Reads
**What goes wrong:** Scroll and mousemove handlers that synchronously read layout properties (`getBoundingClientRect`, `offsetTop`, `scrollY` computed mid-handler) and immediately push values into the render loop, combined with non-`passive` event listeners, block the compositor from optimizing scroll and cause visible jank — most noticeable exactly where it matters most, while a recruiter is scrolling through the Experience/Projects sections.
**Why it happens:** It feels natural to update the animation state directly inside the `scroll`/`mousemove` callback. Without `{ passive: true }`, the browser must wait to see whether `preventDefault()` will be called before it can scroll, which serializes scroll response behind JS execution.
**How to avoid:** Register scroll/mousemove listeners with `{ passive: true }`. Decouple input capture from rendering: listeners only write the latest scroll/mouse values into a small state object; the actual scene update and draw happens once per frame inside the RAF loop (read cached values, don't re-query the DOM). Never call layout-reading APIs inside a scroll/mousemove callback.
**Warning signs:** Scroll feels "sticky" or delayed especially on mid-tier laptops/Android devices; Chrome Performance panel shows long tasks correlated with `scroll`/`mousemove` events rather than with the RAF callback; input lag increases as particle count/theme complexity increases.
**Phase to address:** Background Engine / Interaction Layer phase — establish the "listeners write state, RAF reads state" pattern once, reuse across all 4 themes.

---

### Pitfall 4: Mobile Battery Drain & Thermal Throttling from Full-Frame-Rate, Always-On Background
**What goes wrong:** A continuously animating full-bleed WebGL background running at 60fps regardless of visibility or device class drains battery quickly and triggers thermal throttling on phones, which then throttles frame rate site-wide — including the perception of the portfolio content itself, undermining the "technically impressive" goal instead of supporting it.
**Why it happens:** Desktop dev testing on a plugged-in machine with a discrete/integrated GPU never surfaces this; the animation is built and tuned entirely against desktop performance headroom.
**How to avoid:** Pause the RAF loop entirely when the tab is hidden (Page Visibility API — `document.hidden` / `visibilitychange`) and when the background canvas scrolls out of view (`IntersectionObserver`). Cap frame rate and reduce particle/complexity budget on mobile via a device-tier heuristic (e.g. `navigator.hardwareConcurrency`, coarse pointer + viewport width, or a quick one-time render-time probe) rather than assuming desktop-grade budget everywhere. Test on an actual mid-tier Android phone, not just Chrome DevTools' CPU throttling slider (thermal throttling behavior doesn't reproduce well in emulation).
**Warning signs:** Phone gets noticeably warm within 1-2 minutes of the site being open; frame rate visibly drops over time on mobile even though it stayed steady on desktop; battery usage stats (if testable) show the browser tab as a top consumer.
**Phase to address:** Performance/Accessibility Hardening phase, with the pause-when-hidden/off-screen mechanism ideally built into the Background Engine phase so every theme inherits it for free.

---

### Pitfall 5: Background Canvas Intercepts Clicks/Taps Meant for Portfolio Content
**What goes wrong:** The full-bleed background canvas sits in the DOM/stacking order above (or interleaved with) the content, or is missing `pointer-events: none`, so clicks/taps on links (GitHub project links, contact/resume links, nav) are silently swallowed by the canvas layer instead of reaching the content. This is easy to miss in casual testing because hover states on the canvas itself look fine.
**Why it happens:** Full-bleed decorative layers are commonly implemented with `position: fixed; inset: 0;` and a z-index that's correct for visual layering but forgets that stacking order alone doesn't stop pointer capture — `pointer-events: none` must be set explicitly on the canvas (or its wrapper).
**How to avoid:** Set `pointer-events: none` on the background canvas/wrapper as a hard rule from the first line of CSS for it, and add an automated or manual click-through test on every real link in the nav/experience/projects sections as part of "definition of done" for the layout.
**Warning signs:** Links/buttons that visually look correct don't respond to click/tap; the issue often only appears once the canvas is actually full-bleed and animating (not when it's a placeholder gray box).
**Phase to address:** Layout/Structure phase (when the background layer is first wired behind content) — verify again in each Theme Implementation phase since some themes may add interactive canvas elements (e.g. clickable particles) that need scoped pointer-events exceptions.

---

### Pitfall 6: Missing `prefers-reduced-motion` Support and No Manual Pause Control
**What goes wrong:** Constant background motion — especially large-scale camera pans, zooming particle assembly/disassembly, and parallax tied to scroll — is a documented vestibular-disorder trigger (WCAG 2.3.3, "Animation from Interactions"). Shipping without honoring `prefers-reduced-motion` means users with motion sensitivity get an unavoidable, un-pausable full-screen animation the moment they land on the site — the opposite of a good first impression for a portfolio.
**Why it happens:** `prefers-reduced-motion` is a CSS media feature; canvas/WebGL animation runs entirely in JavaScript, so it's not automatically respected the way CSS transitions are — it requires an explicit `window.matchMedia('(prefers-reduced-motion: reduce)')` check that's easy to skip when the animation is JS/WebGL-driven rather than CSS-driven. It's also commonly checked only once at load rather than listened for live changes.
**How to avoid:** On theme mount, check `matchMedia('(prefers-reduced-motion: reduce)').matches` before starting the RAF loop; if true, render a single static assembled frame (or a drastically dampened version — slower/no camera movement, no large-scale parallax) instead of the full animation. Attach a `change` listener on the `MediaQueryList` so toggling the OS setting live updates behavior without a reload. Independently of the OS setting, ship an in-page pause/reduce-motion control (the same control that already exists for opacity is a natural place to add this), since the OS setting alone doesn't fully cover WCAG's "pause/stop" requirement for persistent background motion, and not all users know the OS-level setting exists.
**Warning signs:** No `matchMedia` reference anywhere in the animation bootstrap code; QA only ever tests with reduced-motion off; accessibility audit (axe/Lighthouse) flags motion-related issues.
**Phase to address:** Background Engine phase (the check must be part of the mount contract every theme uses) — the visible opacity/motion control UI can ship alongside the opacity control feature already planned.
**Confidence:** MEDIUM (cross-verified against MDN, W3C WCAG 2.3.3 guidance, and web.dev accessibility guidance).

---

### Pitfall 7: Theme-Dependent Contrast Failure Makes Text Illegible
**What goes wrong:** Opacity/contrast is tuned once against one theme (e.g. a dark Space theme) and looks fine, but a differently-toned theme (e.g. a bright Computers/circuit theme, or Human Evolution with warm tones) pushed behind the same text color/opacity fails contrast in specific regions of the screen, especially where a bright particle cluster happens to assemble directly behind body text.
**Why it happens:** The "low-opacity, never competes with content" requirement is treated as a single global opacity value tuned against a single reference theme, rather than validated per-theme and per-region behind actual text blocks.
**How to avoid:** Put a solid, sufficiently opaque content-scrim (a semi-opaque backdrop directly behind text blocks, independent of the decorative background's own opacity) between the animated background and the text, rather than relying purely on a single low global alpha value. Validate contrast (WCAG AA, 4.5:1 for body text) for every theme against the actual rendered text color, not just "looks fine to me" — spot-check with a contrast checker while each theme is animating (not on a static screenshot), since assemble/disassemble motion means the busiest possible background frame is what matters, not the calmest one.
**Warning signs:** Text is legible in one theme but hard to read in another; contrast passes on a static screenshot but fails during the "assembled" (busiest) animation frame; user-facing opacity control has to be turned down further than intended for some themes to remain readable, undermining the differentiator per-theme visuals were meant to provide.
**Phase to address:** Each Theme Implementation phase individually (contrast is theme-specific, not a one-time global fix) plus a final cross-theme Accessibility/Polish pass before launch.

---

### Pitfall 8: Theme-Picker Not Keyboard Operable / Focus Not Managed
**What goes wrong:** The top-nav theme picker (a purely visual, easy-to-build-as-mouse-only control) ends up mouse/touch-only, or reachable by keyboard but with no visible focus indicator, or with focus lost/reset to the top of the page after a theme is selected — a real usability bar for keyboard and switch-device users even though the background itself is purely decorative.
**Why it happens:** Interactive-background projects tend to pour design effort into the canvas and treat the theme-picker UI as an afterthought; custom-styled dropdowns/segmented controls are especially prone to losing native `<select>`/`<button>` keyboard semantics when hand-rolled with `<div>`s.
**How to avoid:** Build the theme picker from native interactive elements (`<button>` group with `aria-pressed`/`role="radiogroup"`, or a native `<select>`) so keyboard support and focus order come for free; ensure a visible focus ring is never suppressed (`outline: none` without a replacement is a common regression); after selecting a theme, keep focus on the control that was just activated rather than moving it.
**Warning signs:** Tabbing through the nav skips the theme picker or lands on it with no visible focus outline; Lighthouse/axe accessibility audit flags missing accessible name or keyboard interaction on the control.
**Phase to address:** Content/Structure phase when the nav is first built, verified again in the final Accessibility pass.

---

### Pitfall 9: Touch Devices Have No Mouse-Move Equivalent — Background "Dead" on Mobile
**What goes wrong:** A background built to react to `mousemove` has literally no equivalent event firing continuously on touch devices (`touchmove` only fires during an active drag, not ambient movement), so on phones — where a large share of recruiter/network traffic will land — the flagship "reacts to mouse" interaction silently does nothing, and if scroll-reactivity isn't itself sufficient, the background looks static or broken by comparison to desktop.
**Why it happens:** The interaction model is designed and demoed on a desktop with a mouse; the "what happens on a phone" question gets deferred as an afterthought rather than designed as a first-class fallback from the start.
**How to avoid:** Design the interaction model as an explicit input hierarchy from day one, not desktop-first-then-patch: scroll position drives the primary assemble/disassemble state on all devices (this is the one input that works identically everywhere); on top of that, use `mousemove` where available (`matchMedia('(pointer: fine)')` / `hover: hover` feature detection, not user-agent sniffing) and fall back to `deviceorientation`/gyroscope tilt on touch devices that support it (with the iOS 13+ permission-prompt flow handled), or simply let touch drag (`touchmove`) drive the same effect mousemove would, scaled appropriately. Feature-detect capability rather than sniffing user-agent strings, which are unreliable and get out of date.
**Warning signs:** On a real phone, the background only ever responds to scrolling and never to anything else, while desktop has a richer reactive feel — an asymmetry that's easy to miss if testing happens mostly on desktop; DeviceOrientationEvent silently does nothing on iOS Safari because the permission prompt was never requested.
**Phase to address:** Interaction Layer phase (the input-hierarchy decision should be made once, before building theme-specific reactions) with a dedicated mobile-device verification pass in each Theme Implementation phase.
**Confidence:** MEDIUM (cross-verified against multiple parallax-library implementations and known iOS DeviceOrientationEvent permission gotcha).

---

### Pitfall 10: Stale Deployed Code Despite a Successful Upload (cPanel/Passenger Restart Gotcha)
**What goes wrong:** On cPanel's Node.js Selector (Phusion Passenger), uploading a new build's files does not make the running app pick up the change — Passenger keeps serving the previously-loaded process until it's explicitly restarted (via cPanel's "Restart" button or touching the app's `tmp/restart.txt`). A deploy that "completed successfully" per the upload step can still serve old JS/content, which is confusing during iterative content updates (a portfolio that gets frequent small content edits is exactly the case where this bites repeatedly).
**Why it happens:** This is a standard Passenger behavior, not a bug, but it's non-obvious to anyone coming from platforms with automatic reload-on-deploy; the same deployment pattern proven in `jagdamba_automobiles` must carry this same reminder forward, and it's exactly the kind of step that's easy to forget once deploys become routine.
**How to avoid:** Make "restart the Node app" an explicit, scripted or checklisted final step of the deploy process (not just "upload dist/") — document it directly in the deploy runbook and, ideally, script the restart trigger. Verify a successful deploy by checking a visible marker (e.g. a build timestamp or version string rendered somewhere) rather than trusting "upload succeeded."
**Warning signs:** Content/asset changes don't appear on the live site after a deploy that otherwise reported success; the issue reproduces consistently and disappears only after manually restarting via cPanel.
**Phase to address:** Deployment/Hosting Setup phase — bake the restart step into the deploy script/runbook from the very first deploy, not discovered later.

---

### Pitfall 11: Wrong/Missing MIME Types and No Cache-Busting for Hashed Assets on the Custom Node `http` Server
**What goes wrong:** A dependency-free Node `http` server (by design, to avoid the CloudLinux LVE WebAssembly-memory constraint) has no built-in MIME-type table the way Apache/Nginx or Express do. Vite's build output includes fonts, and if any theme ever adds textures/models (GLTF/GLB) or a `.wasm` asset, serving them with a missing or wrong `Content-Type` causes browsers to reject or mis-parse them (e.g. `application/wasm` is required for WASM; `font/woff2` for woff2) even though the file itself uploaded correctly. Separately, if the server doesn't set strong cache headers on Vite's content-hashed filenames (and/or doesn't set `no-cache`/`no-store` on `index.html` itself), visitors can get stuck on a stale cached `index.html` referencing asset hashes that no longer exist post-deploy, or conversely never see updates because the browser aggressively caches everything with the same long TTL.
**Why it happens:** This is the direct tradeoff of choosing a minimal dependency-free server for CloudLinux LVE compatibility — none of the "just works" MIME/caching behavior that a full framework (Express + `serve-static` + `mime-types`) provides for free is present unless explicitly written into `app.js`.
**How to avoid:** Maintain an explicit extension-to-MIME-type map in `app.js` covering at minimum: `.js`→`application/javascript`, `.css`→`text/css`, `.html`→`text/html`, `.json`→`application/json`, `.woff`/`.woff2`→`font/woff`/`font/woff2`, `.svg`→`image/svg+xml`, `.png`/`.jpg`/`.webp`, and — only if a theme ever actually adds them — `.wasm`→`application/wasm`, `.glb`/`.gltf`→`model/gltf-binary`/`model/gltf+json`. Set long, immutable cache headers (`Cache-Control: public, max-age=31536000, immutable`) only on Vite's content-hashed files (`/assets/*-[hash].js` etc.), and `Cache-Control: no-cache` on `index.html` so it's always revalidated and always points at the current hashed assets. Reuse and extend whatever MIME/cache logic already exists in `jagdamba_automobiles`'s `app.js` rather than rebuilding from scratch, and add any new extension the moment a new asset type is introduced (don't wait until it 404s in production).
**Warning signs:** A font renders as the browser's fallback font, a texture/model fails to load, or console shows "Failed to load module script: server responded with a non-JavaScript MIME type" — even though the file is present at the right path; visitors report seeing an old version after a deploy, or a broken blank page after a deploy (index.html cached, referencing hashes from a build that's since been replaced).
**Phase to address:** Deployment/Hosting Setup phase — build and test the MIME/cache header map against the actual Vite build output before the first real deploy, and re-check it any time a new asset type (font, texture, model) is introduced in a later Theme Implementation phase.
**Confidence:** MEDIUM (cross-verified: MDN MIME type configuration guidance + a documented Express/`.wasm` MIME-type GitHub issue confirming this is a known class of problem, not hypothetical).

---

### Pitfall 12: No Fallback for Unknown Routes / Direct Links Landing on a 404
**What goes wrong:** If any client-side routing is introduced (even simple hash-free deep links to a specific section/project, or a future `/projects/:id` route) a static file server that only serves exact file paths returns a 404 for anything other than `/` and the literal asset paths, breaking a shared/bookmarked link or a page refresh on a non-root path — a bad first impression if a recruiter refreshes or shares a specific link.
**Why it happens:** SPA routing is handled entirely client-side by the JS router, but the server has no knowledge of client-side routes; without an explicit fallback, only requests for files that literally exist on disk succeed.
**How to avoid:** In the dependency-free `app.js`, add a fallback: if a requested path isn't a known static asset (no matching file/extension) and isn't an API route, serve `index.html` with a `200` status so the client-side router can take over and resolve the path itself. Even if v1 ships as a single-page anchor-scroll site with no router, decide this explicitly rather than by accident, since it's cheap to add now and expensive to retrofit once real inbound links exist.
**Warning signs:** Refreshing the browser on any URL other than the exact root returns a 404 (or the shared-hosting default error page) instead of the site; a shared link to a specific section fails when opened fresh (no prior client-side navigation).
**Phase to address:** Deployment/Hosting Setup phase, decided alongside the MIME/cache header work in Pitfall 11 (same `app.js`).

---

### Pitfall 13: Over-Scoping V1 with Four Fully Custom Theme Animations Before Shipping Anything
**What goes wrong:** All four themes (Computers, AI/Neural Network, Space, Human Evolution) are treated as equally-weighted, fully bespoke builds from the start, so the project never reaches a shippable state until all four are simultaneously "done" — directly contradicting the user's own stated priority ("ship v1 fast") and creating a classic scope trap where the flagship feature becomes the bottleneck for shipping the actual professional content (which is the part that directly serves recruiters).
**Why it happens:** The four themes look like "one feature, four skins" on paper, but each is really an independent creative + technical build (different particle systems, different assemble/disassemble choreography, different color/contrast tuning per Pitfall 7) — the multiplicative cost is easy to underestimate when scoping.
**How to avoid:** Build the shared theme-engine contract (mount/unmount, reduced-motion, opacity control, pause-when-hidden — Pitfalls 1-6) against exactly one theme first, get the full site (content + one working theme) to a genuinely shippable state, then implement the remaining three themes against the now-proven contract as parallelizable, lower-risk follow-on phases. This also means the content phases (hero/about/experience/projects/skills/certs/education) should not be blocked on all four themes being finished — content and background are separable delivery tracks that only need to converge for the final launch.
**Warning signs:** All four themes are "80% done" simultaneously with none fully polished; content sections are still using placeholder/lorem text while animation polish continues; no internally shippable milestone exists before all four themes are complete.
**Phase to address:** Roadmap/phase-sequencing itself — structure phases so one theme reaches "done" (including accessibility/perf hardening) before the other three are started, and treat the remaining three as replicable follow-on phases against a proven contract.

---

### Pitfall 14: Content Drift — Resume/LinkedIn/GitHub Fall Out of Sync With the Live Site
**What goes wrong:** Because LinkedIn has no scraping-friendly public API and content is manually transcribed/referenced (per PROJECT.md), the site's Experience/Skills/Certifications content is a point-in-time snapshot. Every time the resume is updated for a job search, a new role starts, a new project ships to GitHub, or a certification is earned/expires, the live site silently drifts out of sync with the source-of-truth documents a recruiter might cross-reference (LinkedIn, actual GitHub repo state) — undermining exactly the credibility a portfolio is meant to build.
**Why it happens:** There's no automated sync (deliberately, since LinkedIn can't be live-integrated) and no low-friction update workflow designed in, so content updates get deprioritized against "more interesting" animation work, and the gap widens silently since nothing breaks or errors when content goes stale.
**How to avoid:** Structure portfolio content (experience, skills, certifications, projects) as data separate from layout/components (e.g. a small set of structured content files) so updates are a content edit + redeploy, not a code change — this alone doesn't prevent drift but makes fixing it cheap enough that it actually happens. For the Projects section specifically, prefer pulling repo metadata (name, description, topics/tags, stars, last-updated) from the GitHub API at build time over hand-transcribing it, so at least that section can be regenerated instead of manually re-synced. Treat "review and refresh content" as an explicit recurring task (e.g. after every resume update), not a one-time v1 activity.
**Warning signs:** Site shows a role/title that's no longer current; a certification listed has since expired or a new one earned isn't reflected; a GitHub project shown is archived/renamed/deleted, or a newer, more relevant repo is missing.
**Phase to address:** Content/Structure phase (data-driven content architecture decision made up front) plus a standing "content maintenance" expectation captured in the roadmap/launch phase rather than assumed to happen automatically.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|--------------------|-----------------|------------------|
| Hardcoding resume/project content directly into JSX/components instead of a data file | Faster to ship the very first content pass | Every future update requires touching component code; content drift (Pitfall 14) gets worse, not better, over time | Never for content that will be updated post-launch; acceptable only for a true throwaway prototype |
| Skipping `IntersectionObserver`/Page Visibility pause-when-offscreen on the very first theme | Slightly less code to write for theme #1 | Every subsequent theme inherits the same battery/perf problem (Pitfall 4), and retrofitting after 4 themes exist means touching 4x the code | Acceptable only if explicitly built into the shared engine before theme #2 starts, i.e. "acceptable to defer by one theme, never by four" |
| User-agent sniffing to detect "mobile" instead of feature detection (`pointer`/`hover` media features, `ontouchstart`) | Quick, well-known one-liner | Breaks on new devices/browsers, misclassifies foldables/tablets/touch-laptops, and silently degrades the interaction fallback (Pitfall 9) for users it misclassifies | Only as a last-resort supplement to feature detection, never as the primary check |
| Using one shared long cache TTL for all static assets, including `index.html` | Simple, one config line | Stale `index.html` references deleted hashed asset filenames after a deploy, producing broken pages until cache expires (part of Pitfall 11) | Never — `index.html` must always be `no-cache`; only content-hashed assets should get long/immutable caching |

## Integration Gotchas

Common mistakes when connecting to external services/references this project touches.

| Integration | Common Mistake | Correct Approach |
|--------------|------------------|--------------------|
| GitHub (`Sandyzie05` repos) for the Projects section | Manually curating a static, one-time list of repos/descriptions that silently goes stale as new repos are pushed or old ones archived | Fetch repo metadata via the GitHub API at build time (name, description, topics, last-pushed date) and filter/curate at build time rather than hand-copying into content, so refreshing is a rebuild, not a rewrite |
| LinkedIn profile content | Attempting any live fetch/scrape of LinkedIn (no public API, scraping violates ToS and is fragile) | Manually transcribe/reference LinkedIn content into the site's own content data (already the documented approach in PROJECT.md) and treat it as a point-in-time snapshot requiring periodic manual review (Pitfall 14), not a live source |
| Reusing the `jagdamba_automobiles` deployment pattern verbatim | Assuming this project's build output (with Three.js/WebGL + 4 theme bundles) will behave identically in size/asset-type mix to a simpler prior React+Vite SPA, and copying `app.js` without re-checking its MIME-type table against the new asset types this project introduces | Reuse the proven `app.js` server/Passenger/restart pattern structurally, but explicitly re-audit its static-file MIME/cache logic against every new asset extension this project's build actually produces (fonts, and textures/models only if used) before first deploy |
| cPanel "Setup Node.js App" / Passenger process | Hardcoding a port number in `app.js` instead of reading the port Passenger assigns via environment variable | Always bind to `process.env.PORT` (falling back to a local dev default), matching the proven working pattern, and never assume a fixed port in production |

## Performance Traps

Patterns that work at small scale (dev machine, first look) but fail as usage/complexity grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Particle/geometry count tuned only against a powerful dev laptop GPU | Smooth 60fps locally, visible stutter on real mid-tier phones or older laptops | Set an explicit device-tier budget (particle count tiers by `hardwareConcurrency`/viewport/pointer type) and always validate on a real mid-range Android phone, not just DevTools throttling | Breaks the moment a visitor opens the site on anything less than a recent flagship device — likely a large share of mobile recruiter traffic |
| Recomputing camera aspect/resize synchronously inside the resize/scroll handler on every event | Feels fine on desktop resize (rare event); on mobile, address-bar show/hide fires resize repeatedly during scroll, causing visible jank | Debounce/rAF-throttle resize handling; separate "did viewport change" detection from the actual expensive recompute | Breaks specifically on mobile browsers where the URL bar collapsing/expanding fires resize events during ordinary scrolling |
| Driving scene state directly and synchronously from scroll/mousemove events instead of through the RAF loop | Fine with simple themes/low complexity; input and render start to visibly desync as theme complexity grows | Enforce the "listeners write state, RAF reads and renders" separation (Pitfall 3) as a hard rule from theme #1 onward | Breaks progressively as each theme adds more computation per frame — the 4th, most complex theme is where it becomes visible first |
| Recreating full Three.js scene graph (geometries/materials) on every theme switch instead of reusing a shared renderer/pool | Looks fine for the first few switches | GPU memory climbs and switch latency increases the more times a visitor toggles themes in one session (a realistic behavior — visitors exploring all 4 themes is the expected use case) | Breaks noticeably after roughly 5-10 theme switches in one session, depending on device |

## Domain-Specific UX/Accessibility Pitfalls

Beyond the critical items above, specific to a purely-decorative-canvas-behind-real-content pattern.

| Pitfall | Why it hurts UX | What to do instead |
|---------|------------------|----------------------|
| Canvas element left focusable/announced to assistive tech even though it's purely decorative | Screen reader users hit an unlabeled, meaningless stop in the tab order or hear noise announced for a decorative element | Mark the background canvas/wrapper `aria-hidden="true"` and ensure it's not natively focusable (canvas isn't tab-stoppable by default, but confirm no `tabindex` was added) |
| Opacity control lacks a visible current-value indicator or accessible label | Sighted mouse users can eyeball the slider position, but keyboard/screen-reader users can't tell current opacity state | Give the opacity control a proper `<label>`/`aria-valuenow` (native `<input type="range">` handles this correctly) and show the numeric/percentage value visibly |
| Reduced-motion "off" state isn't actually silent to assistive tech — decorative canvas updates trigger unrelated ARIA live-region noise elsewhere on the page | Rare but real: dynamically updating unrelated DOM near the canvas can cause unintended screen-reader announcements | Keep the canvas entirely outside any `aria-live` regions and out of the accessibility tree entirely (aria-hidden), so its updates never interact with assistive tech regardless of animation state |

## "Looks Done But Isn't" Checklist

Things that appear complete but are commonly missing critical pieces.

- [ ] **Theme switching:** Often missing persistence — verify the selected theme (and opacity/reduced-motion preference) survives a page refresh (e.g. `localStorage`), not just in-session state.
- [ ] **Reduced-motion toggle:** Often only visually freezes the animation (CSS opacity 0 on canvas) while the RAF loop and GPU work keep running underneath — verify CPU/GPU usage actually drops when reduced motion is engaged, not just that the visual stops.
- [ ] **Pause-when-hidden:** Often works for `document.hidden` (tab switch) but not for the background canvas scrolling out of view within the page itself — verify both cases independently with a frame-rate/CPU probe.
- [ ] **Mobile interaction fallback:** Often demoed only via desktop DevTools "mobile emulation" (which still fires real `mousemove` from the mouse cursor) rather than a real touch device — verify on an actual phone that the fallback interaction (scroll/touch/gyroscope) actually engages.
- [ ] **Deploy freshness:** Often assumed complete because file upload succeeded — verify the Passenger app was actually restarted and the live site reflects a visible version marker, not the previous build.
- [ ] **Content accuracy:** Often verified once at initial content entry — verify current role/title, active certifications, and listed GitHub projects still match the actual resume/GitHub state at time of each subsequent deploy, not just at initial launch.
- [ ] **Cross-theme contrast:** Often verified against one "reference" theme — verify text contrast against all 4 themes' busiest ("fully assembled") animation frame, not a calm/static frame.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|------------------|
| GPU memory leak discovered in production (Pitfall 2) | MEDIUM | Audit each theme's `unmount()` for missing `.dispose()` calls; add an automated "switch themes N times, assert GPU memory plateaus" check to prevent regression; ship a hotfix deploy |
| Bundle/TTI too large post-launch (Three.js + 4 themes not code-split) | MEDIUM | Introduce dynamic `import()` per theme so only the active theme's code/assets load initially; lazy-load the remaining 3 on first switch; re-measure Lighthouse TTI before/after |
| Content found stale/inaccurate after launch (Pitfall 14) | LOW | Update the structured content data file(s) directly, rebuild, redeploy, and restart the Passenger app (Pitfall 10) — cheap if content was kept data-driven from the start, expensive if it was hardcoded into components |
| MIME-type/cache-header bug discovered live (Pitfall 11) | LOW | Patch the extension-to-MIME map / cache headers in `app.js`, redeploy, restart Passenger, and hard-refresh to confirm; add the missed extension to a checklist for future asset additions |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|--------------------|----------------|
| Uncancelled animation loops/leaked listeners (1) | Background Engine / Theme Framework phase | Switch all themes 10x in one session; confirm FPS and listener count don't degrade |
| GPU memory leak on theme switch (2) | Background Engine / Theme Framework phase | Watch GPU/tab memory across repeated theme switches for a plateau, not a climb |
| Main-thread jank from scroll/mouse listeners (3) | Background Engine / Interaction Layer phase | Chrome Performance panel: confirm listeners are `passive`, no long tasks tied to scroll/mousemove events |
| Mobile battery drain / thermal throttling (4) | Performance/Accessibility Hardening phase (mechanism built in Background Engine phase) | Real mid-tier phone test: FPS stays acceptable and device doesn't overheat within a multi-minute session |
| Canvas intercepting clicks meant for content (5) | Layout/Structure phase | Manually click every nav/content link with the background actively animating behind it |
| Missing `prefers-reduced-motion` support (6) | Background Engine phase | Toggle OS-level reduced-motion; confirm animation dampens/freezes and CPU/GPU usage actually drops |
| Theme-dependent contrast failure (7) | Each Theme Implementation phase + final Accessibility pass | Contrast-check text against each theme's busiest animation frame, not a static screenshot |
| Theme-picker keyboard/focus issues (8) | Content/Structure phase (nav build) + final Accessibility pass | Tab through the picker with keyboard only; confirm visible focus and correct activation |
| Touch has no mousemove equivalent (9) | Interaction Layer phase | Test on a real touch device; confirm scroll/touch/gyroscope fallback actually drives the background |
| Stale deploy despite successful upload (10) | Deployment/Hosting Setup phase | Confirm a visible version marker updates on the live site after each deploy + restart |
| Wrong MIME types / missing cache-busting (11) | Deployment/Hosting Setup phase | Load every asset type the build produces directly by URL and confirm correct `Content-Type` and cache headers |
| No SPA/route fallback (12) | Deployment/Hosting Setup phase | Manually load a non-root URL directly (not via in-app navigation) and confirm it resolves instead of 404ing |
| Over-scoping v1 with 4 full themes (13) | Roadmap/phase-sequencing decision | Confirm an internally shippable milestone exists (content + 1 working theme) before all 4 themes are attempted |
| Content drift over time (14) | Content/Structure phase (data-driven architecture) + ongoing maintenance expectation | Periodic manual check: does the live site match current resume/LinkedIn/GitHub state |

## Sources

- [prefers-reduced-motion CSS media feature — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [C39: Using the CSS prefers-reduced-motion query to prevent motion — W3C WAI](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)
- [Animation and motion — web.dev](https://web.dev/learn/accessibility/motion)
- [Using prefers-reduced-motion for Accessible Animation — OpenReplay Blog](https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/)
- [.wasm MIME type issue — expressjs/express GitHub Issue #3589](https://github.com/expressjs/express/issues/3589)
- [Properly configuring server MIME types — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Configuring_server_MIME_types)
- [parallax.js — Matthew Wagerfield (mouse/gyroscope fallback pattern)](https://matthew.wagerfield.com/parallax/)
- [parallaxify — jQuery plugin, gyroscope/mouse dual-input pattern](https://github.com/hwthorn/parallaxify)
- [Parallax gyroscope not working on mobile — wagerfield/parallax GitHub Issue #268](https://github.com/wagerfield/parallax/issues/268)
- Project context: `.planning/PROJECT.md` (MilesWeb/cPanel CloudLinux LVE constraint, `jagdamba_automobiles` proven deployment pattern, LinkedIn no-API constraint, v1 scope decisions)
- General engineering knowledge: Three.js resource-disposal lifecycle, RAF/event-listener cleanup patterns, Page Visibility API / IntersectionObserver pause patterns, Phusion Passenger app-restart behavior on cPanel Node.js Selector — standard, well-documented behaviors not requiring per-claim citation

---

*Pitfalls research for: Interactive-background personal portfolio (theme-switchable canvas/WebGL background on constrained shared Node.js hosting)*
*Researched: 2026-07-18*
