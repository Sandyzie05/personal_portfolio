# Phase 1: App Shell, Content & Deployment - Pattern Map

**Mapped:** 2026-07-19
**Files analyzed:** 30 (9 content modules, 9 section components, 1 nav, App/main/index.html/CSS, app.js, package.json, vite.config.ts, .npmrc, eslint.config.js, 9 test files)
**Analogs found:** All files have an analog in the sibling reference project `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles` (this repo has no prior code — Phase 1 is greenfield).

**Analog project root:** `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles`

## File Classification

| New File (this repo) | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `app.js` | server/middleware (static file server) | file-I/O | `jagdamba_automobiles/app.js` | exact (must be patched, see Shared Patterns) |
| `package.json` | config | — | `jagdamba_automobiles/package.json` | exact |
| `vite.config.ts` | config | — | `jagdamba_automobiles/vite.config.ts` | exact (base path differs, no admin.html input) |
| `.npmrc` | config | — | `jagdamba_automobiles/.npmrc` | exact |
| `eslint.config.js` | config | — | `jagdamba_automobiles/eslint.config.js` | exact |
| `index.html` | config/entry | — | `jagdamba_automobiles/index.html` | exact |
| `src/main.tsx` | entry | request-response | `jagdamba_automobiles/src/main.tsx` | exact |
| `src/App.tsx` | component (composition root) | request-response | `jagdamba_automobiles/src/App.tsx` | role-match (no multi-page/admin routing needed — simpler) |
| `src/content/hero.ts` | model (static data) | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/about.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/experience.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/projects.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` (gallery/trustPoints arrays) | exact |
| `src/content/skills.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/certifications.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/education.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/testimonials.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` | exact |
| `src/content/contact.ts` | model | CRUD (read-only) | `jagdamba_automobiles/src/siteContent.ts` (contacts array) | exact |
| `src/sections/Hero.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/About.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Experience.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Projects.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` (gallery rendering) | role-match |
| `src/sections/Skills.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Certifications.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Education.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Testimonials.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` | role-match |
| `src/sections/Contact.tsx` | component | request-response | `jagdamba_automobiles/src/StorefrontPage.tsx` (contacts rendering) | role-match |
| `src/nav/TopNav.tsx` | component | request-response | no direct analog (jagdamba has no anchor-nav) | no analog — see below |
| `src/test/setup.ts` | test config | — | none in jagdamba (no test suite there) | no analog |
| `src/sections/*.test.tsx` (9 files) | test | request-response | none in jagdamba | no analog |
| `scripts/deploy-smoke.sh` | test/utility | request-response | none in jagdamba | no analog |

## Pattern Assignments

### `app.js` (server, file-I/O)

**Analog:** `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles/app.js` (76 lines, read in full)

**Imports pattern** (lines 1-9):
```js
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || process.env.NODE_PORT || 4173)
```

**MIME table pattern** (lines 15-31) — reuse verbatim, but this phase's content_context research (RESEARCH.md Pitfall 3) requires adding a `.pdf` entry that jagdamba's table lacks:
```js
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
  '.pdf':  'application/pdf', // ADD — jagdamba's table lacks this; required for CONTACT-04
}
```

**Routing pattern to REMOVE (do not copy)**: jagdamba's `BASE = '/jagdambaautomobiles'` prefix-stripping and `/admin`/`admin.html` routing (lines 33-48) — this project is a single-page site with no subpath (per Open Question A1, default `base: '/'`) and no admin page. Only the base `urlPath` decode + SPA fallback-to-`index.html` logic should be kept.

**Path-containment fix to ADD (jagdamba lacks this — genuine gap, not present anywhere to copy from):**
```js
const resolved = path.resolve(filePath)
const distRoot = path.resolve(distDir) + path.sep
if (!resolved.startsWith(distRoot) && resolved !== path.resolve(distDir)) {
  res.writeHead(400, { 'Content-Type': 'text/plain' })
  res.end('Bad request')
  return
}
```

**serveFile / listen pattern** (lines 61-76) — copy structure verbatim (readFile → 404 fallback → extname → MIME lookup → `application/octet-stream` default; `server.listen(port, '0.0.0.0', ...)`).

---

### `package.json` (config)

**Analog:** `jagdamba_automobiles/package.json` (full file, single read)

Key fields to mirror exactly: `"type": "module"`, `"main": "app.js"`, `"engines": {"node": "^18.0.0 || >=20.0.0"}`, scripts block (`dev`, `build` with the inline Node-version guard, `build:site`, `preview`, `start: "node app.js"`, `lint`). Dependency versions must NOT be copied verbatim — use RESEARCH.md's pinned versions instead (React 19.2.7 not 18.3.1, Vite 6.3.6 not 5.4.1, TypeScript 6.0.3 not 5.5.3, etc. — jagdamba's versions are one+ major behind this project's locked stack). This phase additionally adds `vitest`, `jsdom`, `@testing-library/react` (jagdamba has no test scripts at all — no analog for the `test` script; use `"test": "vitest run"`).

---

### `vite.config.ts` (config)

**Analog:** `jagdamba_automobiles/vite.config.ts` (full file, single read)

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jagdambaautomobiles/',   // THIS PROJECT: use '/' per Open Question A1 default; revisit at D-08 resolution
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',        // OMIT — this project has no admin.html/second entry point
      },
    },
  },
})
```
Also add a `test` block (or separate `vitest.config.ts`) per RESEARCH.md's Validation Architecture — no analog for this in jagdamba since it has no test suite.

---

### `.npmrc` (config)

**Analog:** `jagdamba_automobiles/.npmrc` — copy verbatim: `registry=https://registry.npmjs.org/` (required to bypass the local Adobe Artifactory registry override — RESEARCH.md Pitfall 1).

---

### `eslint.config.js` (config)

**Analog:** `jagdamba_automobiles/eslint.config.js` (full file, 28 lines, single read) — copy structure verbatim (flat config via `tseslint.config()`, `ignores: ['dist']`, `js.configs.recommended` + `tseslint.configs.recommended`, `globals.browser`, `react-hooks`/`react-refresh` plugins with `allowConstantExport: true`). No changes needed beyond matching this project's pinned `eslint`/`typescript-eslint` versions.

---

### `src/main.tsx` (entry)

**Analog:** `jagdamba_automobiles/src/main.tsx` (full file, 10 lines) — copy verbatim structure:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

### `src/App.tsx` (component, composition root)

**Analog:** `jagdamba_automobiles/src/App.tsx` (full file, 11 lines)

jagdamba's App.tsx does path-based admin/storefront routing (`adminPathPattern`, `window.location.pathname` check) — **this pattern does NOT apply** to this project (no admin page, no router per CONTEXT.md's locked "single-page app shell" decision). Instead, `App.tsx` should compose `TopNav` + `<main>` with all 9 sections in document order + `<footer>`, per RESEARCH.md's Recommended Project Structure. No existing analog for this simpler composition; build directly from RESEARCH.md's System Architecture Diagram.

---

### `src/content/*.ts` (9 files, model/static-data role)

**Analog:** `jagdamba_automobiles/src/siteContent.ts` (lines 1-60 read; pattern is representative of the whole file)

**Core pattern to replicate** — one exported `interface`/`type` per data shape, a single exported const object/array, plain data with no JSX:
```ts
export interface ServiceHighlight {
  title: string
  description: string
}

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const siteContent = {
  hero: {
    eyebrow: '...',
    title: '...',
    description: '...',
  },
  contacts: [
    { name: '...', role: '...', phoneHref: 'tel:+91...' },
    // ...
  ],
}
```
**Key difference for this project:** RESEARCH.md's Architecture Pattern 1 calls for **one file per content domain** (`hero.ts`, `about.ts`, `experience.ts`, etc.) rather than jagdamba's single monolithic `siteContent.ts` — split the same "typed interface + exported const" shape across 9 files instead of one. The `publicAsset` helper (line 24, using `import.meta.env.BASE_URL`) is directly reusable for `content/contact.ts`'s resume PDF path.

---

### `src/sections/*.tsx` (9 files, component/presentational role)

**Analog:** `jagdamba_automobiles/src/StorefrontPage.tsx` — jagdamba renders all storefront content from one large page component consuming `siteContent`; this project's `sections/*.tsx` split does the same data-consumption pattern but as one component per section instead of one monolithic page. Import content from the matching `content/*.ts` module, render semantic `<section id="..." aria-labelledby="...">` markup (per RESEARCH.md Pattern 2), map arrays to lists/cards with `key` props. External links (Projects/Contact) must use the `target="_blank" rel="noopener noreferrer"` pattern (RESEARCH.md Pattern 3, Code Examples § Contact section).

---

### `src/nav/TopNav.tsx` (component)

**No analog in jagdamba** (it has no anchor-nav — its nav is a simple two-page admin/storefront split). Build directly from RESEARCH.md Pattern 2 (Accessible Anchor-Section Navigation): plain `<a href="#hero">` etc., `aria-label="Primary"` nav, skip-link as first focusable element. No JS scroll-hijacking.

---

### Test files (`src/sections/*.test.tsx`, `src/test/setup.ts`, `scripts/deploy-smoke.sh`)

**No analog** — jagdamba has zero test files (`vitest`/`@testing-library` not in its `package.json` at all). Build directly from RESEARCH.md's Validation Architecture section (Vitest 3.2.4 + `@testing-library/react` 16.3.2 + jsdom 26.1.0): standard `render()` + `screen.getByRole/getByText` assertions, one file per section component. `deploy-smoke.sh` should be a plain `curl -sI` script per RESEARCH.md's Code Examples/Test Map (no existing shell-script analog in either repo — write fresh).

---

## Shared Patterns

### Dependency-free static server (path-containment + MIME patch)
**Source:** `jagdamba_automobiles/app.js` (base pattern) + RESEARCH.md Code Examples (patches jagdamba lacks)
**Apply to:** `app.js` only, once.
The reference project's server is missing a `.pdf` MIME entry and any path-traversal guard — both must be added fresh (not present in the analog to copy), see the `app.js` section above and RESEARCH.md Pitfalls 3-4 for the full patched listing.

### Content/Presentation split
**Source:** `jagdamba_automobiles/src/siteContent.ts` + `StorefrontPage.tsx`
**Apply to:** All 9 `content/*.ts` + `sections/*.tsx` pairs.
Every section's copy lives in a typed data module; the matching component never hardcodes text. Difference from jagdamba: split into 9 content files + 9 section components (not 1 monolithic content file + 1 page component), per RESEARCH.md's Recommended Project Structure.

### External link safety
**Source:** RESEARCH.md Pattern 3 (no existing analog in jagdamba — its outbound links, e.g. WhatsApp `https://wa.me/...`, don't consistently use `rel="noopener noreferrer"`; do not copy that omission)
**Apply to:** `Projects.tsx` (GitHub repo cards), `Contact.tsx` (LinkedIn/GitHub links).
```tsx
<a href="https://github.com/Sandyzie05/acksync" target="_blank" rel="noopener noreferrer">
  View on GitHub
</a>
```

### Build/lint/dev toolchain config shape
**Source:** `jagdamba_automobiles/package.json`, `vite.config.ts`, `.npmrc`, `eslint.config.js`
**Apply to:** All 4 root config files.
Structure and scripts carry over exactly; only dependency version numbers change (use RESEARCH.md's Standard Stack pins, not jagdamba's older versions) and `vite.config.ts`'s `base`/`rollupOptions.input` simplify (no subpath, no second `admin.html` entry).

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/nav/TopNav.tsx` | component | request-response | jagdamba has no anchor-based in-page nav (its "nav" is a path-based admin/storefront switch) — build from RESEARCH.md Pattern 2 |
| `src/test/setup.ts`, `src/sections/*.test.tsx` (9), `scripts/deploy-smoke.sh` | test | request-response | jagdamba has zero test infrastructure — build from RESEARCH.md's Validation Architecture section directly |
| `App.tsx`'s section-composition logic | component | request-response | jagdamba's `App.tsx` does admin/storefront path routing, which doesn't apply here; this project's composition (TopNav + ordered sections + footer) has no existing analog, use RESEARCH.md's System Architecture Diagram |

## Metadata

**Analog search scope:** `/Users/sandgupt/RandomIdeasWithAI/jagdamba_automobiles` (only pre-existing sibling reference project; this repo itself is empty of source code — confirmed via CONTEXT.md's "Reusable Assets: None yet in this repo")
**Files scanned:** `app.js`, `package.json`, `vite.config.ts`, `.npmrc`, `eslint.config.js`, `src/main.tsx`, `src/App.tsx`, `src/siteContent.ts`, `src/StorefrontPage.tsx` (partial), `src/AdminPage.tsx` (not used — admin-specific, out of scope)
**Pattern extraction date:** 2026-07-19
