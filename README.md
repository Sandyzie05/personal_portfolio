# Sandeep Gupta — Engineering Portfolio

A responsive portfolio about building reliable software, developer platforms, and practical AI. It presents Sandeep's public career story, generalized enterprise case studies, personal projects, technical toolkit, education, certifications, recommendations, and contact links in one React application.

The design uses a full-bleed systems-topology hero, trace-line career history, restrained motion, and persistent light/dark themes. Enterprise examples intentionally omit internal names, repository links, architecture specifics, and exact operational scale.

## Tech Stack

- React 19 and TypeScript
- Vite 6
- Vitest and Testing Library
- ESLint
- Dependency-free Node.js production server
- Plain CSS design system with WCAG AA contrast targets

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Local Development

```bash
npm install
npm run dev
```

Vite prints the local development URL when the server starts.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run the test suite once with Vitest |
| `npm run lint` | Check the project with ESLint |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build with Vite |
| `npm start` | Serve the existing `dist/` build with `app.js` |

To verify the complete local production path:

```bash
npm run build
npm start
```

In another terminal, run:

```bash
bash scripts/deploy-smoke.sh http://localhost:4173
```

The smoke test confirms that the homepage is reachable and that `resume.pdf` is served with the correct PDF content type.

## Project Structure

```text
.
|-- app.js                    # Dependency-free production static server
|-- public/
|   |-- assets/               # Hero artwork
|   `-- resume.pdf            # Downloadable current resume
|-- scripts/
|   `-- deploy-smoke.sh       # Post-deployment HTTP checks
|-- src/
|   |-- content/              # Typed portfolio content
|   |-- nav/                  # Responsive primary navigation
|   |-- sections/             # Page sections and component tests
|   |-- test/                 # Shared test setup
|   |-- theme/                # Persistent light/dark theme control
|   |-- App.tsx               # Page composition
|   |-- main.tsx              # React entry point
|   `-- styles.css            # Global and responsive styles
|-- index.html
|-- package.json
`-- vite.config.ts
```

## Updating Portfolio Content

Most copy is intentionally kept separate from the React components. Update the corresponding module in `src/content/`:

| Content | File |
| --- | --- |
| Hero introduction | `src/content/hero.ts` |
| Professional summary | `src/content/about.ts` |
| Generalized enterprise work | `src/content/enterpriseWork.ts` |
| Work history | `src/content/experience.ts` |
| Featured projects | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |
| Certifications | `src/content/certifications.ts` |
| Education | `src/content/education.ts` |
| Recommendations | `src/content/testimonials.ts` |
| Contact and social links | `src/content/contact.ts` |

Replace `public/resume.pdf` to update the downloadable resume while keeping the same public URL.

## Content Safety

- Personal GitHub projects can link to public source repositories.
- Employer work stays high-level and outcome-oriented.
- Do not publish internal repository names, service names, URLs, credentials, customer data, architecture diagrams, or exact scale/capacity figures without explicit review.
- Recommendation copy is manually curated; the site performs no live LinkedIn scraping or authenticated API calls.

## Quality Checks

```bash
npm test
npm run lint
npm run build
```

Current suite covers all portfolio sections, public links, generalized enterprise copy, and theme switching. Motion respects `prefers-reduced-motion`; colors expose a higher-contrast boundary through `prefers-contrast`.

## Production Deployment

The production build is designed for Node.js hosting such as a cPanel Node.js application. Vite compiles the site into `dist/`, and `app.js` serves those static files without runtime dependencies.

### Git vs. Server Artifacts

| Item | Committed to Git | Created on the server |
| --- | --- | --- |
| Application source and configuration | Yes | Pulled from GitHub |
| `package-lock.json` | Yes | Used by `npm install` |
| `node_modules/` | No | Created by `npm install` |
| `dist/` | No | Created by `npm run build` |
| Runtime secrets | No | Configure through the host if ever needed |

### cPanel and GitHub

1. Clone this repository into the cPanel account, for example under `repositories/personal_portfolio`.
2. In **Setup Node.js App**, create an application using Node.js 18 or 20.
3. Set the application root to the repository directory.
4. Set the startup file to `app.js`.
5. Run `npm install` in the application root. Development dependencies are required for the build.
6. Run `npm run build` to generate `dist/`.
7. Restart the Node.js application so it serves the new build.
8. Verify the deployment:

```bash
bash scripts/deploy-smoke.sh https://your-portfolio-domain.example
```

The server reads the host-provided `PORT` environment variable and defaults to port `4173` locally.

## Repository

[github.com/Sandyzie05/personal_portfolio](https://github.com/Sandyzie05/personal_portfolio)
