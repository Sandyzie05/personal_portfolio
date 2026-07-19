# Feature Research

**Domain:** Personal/developer portfolio website (Senior SRE / Platform Engineer, targeting recruiters/hiring managers/professional network)
**Researched:** 2026-07-18
**Confidence:** MEDIUM (cross-corroborated web sources; no single authoritative spec exists for this domain — synthesized consensus across multiple independent 2025/2026 guides, hiring-manager surveys, and accessibility/performance standards bodies)

## Feature Landscape

### Table Stakes (Users Expect These)

Features recruiters/hiring managers assume exist. Missing these makes the site feel incomplete or amateurish — and for this audience, "users" means an 8-second-scan recruiter and a more careful hiring-manager follow-up read.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero/landing with name + one-line positioning statement | Recruiters scan ~8 seconds; need role + value prop instantly visible without scrolling | LOW | Should read "Senior SRE / Platform Engineer" + a differentiating clause, not a generic "passionate developer" line |
| About/professional summary | Establishes narrative and career arc beyond a bare resume dump | LOW | Synthesize from resume; keep specific, not generic ("I love learning" reads as filler) |
| Experience timeline with quantified achievements | Hiring managers weigh "why"/impact, not just company names; quantified impact ("cut X 70%") outperforms vague duty lists | MEDIUM | Map to Adobe/Workfront + prior roles; each entry should have 2-4 concrete, numbers-backed outcomes |
| Projects section (3-6 curated, not all ~30 repos) | Recruiters rarely read raw repos; a curated set with context and links to GitHub for verification is the effective pattern. 84% of hiring managers want live/working evidence where feasible | MEDIUM | For SRE/platform: favor infra-flavored projects (IaC modules, GitOps pipelines, observability tooling) over generic web-app CRUD; not all projects have "live demos" in this domain — screenshots/architecture diagrams substitute |
| Skills organized by category | Lets a non-technical recruiter keyword-match ("Kubernetes", "Terraform") while a hiring manager reads depth | LOW | Category by cloud/infra, IaC, GitOps/DevOps tooling, observability, languages, AI tooling per PROJECT.md; avoid decorative "skill bar" percentages — viewed as amateurish/meaningless |
| Certifications section | Concrete, verifiable credentials (PCAP, AWS CSAA, Azure Fundamentals, ITIL, Datadog, Jenkins Engineer) are fast trust signals for infra roles | LOW | Simple list/badges; link to verification where issuer supports it |
| Education section | Baseline expected credential context | LOW | MS Information Systems, BTech CS |
| Contact mechanism + resume download in one click | "Don't make them hunt for your email" is the single most repeated finding; a slow/hidden contact path is a lost opportunity | LOW | See dedicated contact-pattern guidance below — combine visible email/LinkedIn/GitHub links with a lightweight form, plus a direct resume PDF download |
| GitHub profile links/integration | Signals real code, contribution activity, and collaboration; recruiters treat it as verification layer behind curated project cards | LOW–MEDIUM | Simple links are table stakes; live stats widget is a differentiator (see below) |
| Responsive, mobile-first layout | Recruiters/hiring managers frequently check portfolios on phones; a broken mobile layout reads as "failed a basic frontend test" even for a backend/infra role | MEDIUM | Non-negotiable; test at common breakpoints |
| Fast page load (<2s, Core Web Vitals-clean) | Recruiters bounce on slow sites; and for an SRE/platform engineer specifically, a slow personal site is a direct anti-signal about their own craft | MEDIUM | Target LCP <2.5s, INP <200ms, CLS <0.1; especially important here because of the animated background (biggest performance risk in this project) |
| Basic SEO/meta tags (title, description, OG tags, semantic HTML) | Helps the site surface when someone searches the candidate's name; semantic HTML also improves accessibility and CWV simultaneously | LOW | Standard `<meta>`/Open Graph/Twitter Card tags, one canonical URL, descriptive page title |
| Accessibility basics (contrast, alt text, keyboard nav, semantic headings) | WCAG-adjacent baseline; also correlates with better CWV scores; a portfolio with accessibility gaps undermines credibility for anyone in a platform/reliability role | MEDIUM | Contrast ratios 4.5:1 normal / 3:1 large text; alt text on images; logical heading hierarchy; keyboard-navigable nav and controls |
| No broken links / dead demos | Repeatedly cited as the single worst failure mode — worse than not having a portfolio at all | LOW (process, not build) | Requires an ongoing-maintenance habit, not a one-time build task |

### Differentiators (Competitive Advantage)

Features that are not required but make the portfolio memorable and align directly with this project's Core Value ("memorable and technically impressive... background must always serve the content").

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Theme-switchable, scroll+mouse-reactive full-bleed background (Computers/AI/Space/Human-Evolution) | This IS the project's signature differentiator per PROJECT.md — a technically impressive, memorable first impression that no competing SRE portfolio will have | HIGH | Must stay low-opacity, non-competing with content, respect `prefers-reduced-motion`, and expose a user opacity/disable control (see Anti-Features below for what NOT to do) |
| Case-study-style project writeups (problem → approach/stack → trade-offs → measurable outcome) | Communicates the "why" behind technical decisions, which is what hiring managers (as opposed to keyword-scanning recruiters) actually evaluate; the "delta" beyond the base task (tests, CI, observability added) is the signal that stands out | MEDIUM | Apply to 2-4 flagship projects; include an architecture diagram or screenshot per writeup, not just prose |
| Live/curated GitHub stats or pinned-repo cards | Turns a static "here's my GitHub" link into tangible, current evidence of activity | MEDIUM | Prefer custom GitHub REST/GraphQL API fetch with config-based pinning + client-side caching over third-party hosted widgets (those rely on a public Vercel instance that rate-limits); given the dependency-free Node hosting constraint, fetch at build time or via a lightweight serverless-free client call rather than adding a runtime dependency |
| Manually-curated LinkedIn recommendations/testimonials | Third-party social proof is persuasive and differentiates from a resume-only pitch | LOW–MEDIUM | LinkedIn's recommendation API has been closed since 2015 — no live sync is feasible. Manually transcribe 2-4 recommendations as static content, WITH explicit permission from each recommender before republishing their text (copyright belongs to the writer), and keep their role/title accurate to when it was written. This matches PROJECT.md's existing decision to manually reference LinkedIn content rather than integrate live |
| Dark mode / theme-aware color scheme | Common expectation in developer-facing sites; low cost, decent polish signal | LOW | Straightforward with CSS custom properties; should coordinate with the 4 background themes rather than being a second, independent toggle system |
| User-facing background opacity/intensity control | Directly required by PROJECT.md; also doubles as an accessibility affordance (effectively a stronger, in-UI version of `prefers-reduced-motion`) | LOW–MEDIUM | Should default to prefers-reduced-motion-aware state and be persisted (e.g. localStorage) across visits |

### Anti-Features (Commonly Requested, Often Problematic)

Specifically scoped to the flashy-background risk this project carries, plus a few general portfolio anti-patterns.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| High-opacity/high-contrast background animation that visually competes with foreground text | "Enjoyable"/"immersive" framing tempts turning up intensity for wow-factor | Directly contradicts PROJECT.md's Core Value; reduces text contrast and readability, the #1 cited pitfall in animated-background portfolios; recruiters give an 8-second scan — any friction reading content loses the visit | Keep background permanently low-opacity by design (not just by convention), with content contrast validated against WCAG 4.5:1/3:1 regardless of theme or opacity slider position |
| More than the planned 4 background themes ("just add a couple more, it's just a config swap") | Each additional theme feels cheap to add once the assemble/disassemble engine exists | Dilutes build/polish effort across more themes instead of perfecting 4; PROJECT.md already explicitly deferred a 5th (Chess) theme for this reason — scope creep here is the most likely single derailment of ship timeline | Ship the 4 committed themes to a high polish bar; treat additional themes (Chess, etc.) as an explicit v2 backlog item, not a "quick add" |
| Autoplaying, un-pausable full-bleed animation with no reduced-motion/opt-out path | Feels like the "purest" expression of the flagship feature | Violates accessibility for users with vestibular disorders/photosensitivity; `prefers-reduced-motion` failing to be respected is one of the most consistently cited animation pitfalls across sources; WCAG's Pause/Stop/Hide expectation applies to persistent autoplaying, non-essential motion | Respect `prefers-reduced-motion` (static/reduced fallback) AND expose an explicit in-UI opacity/pause control regardless of OS setting — PROJECT.md already requires the latter, this makes it also do accessibility duty |
| Unbounded/uncapped animation complexity (particle counts, WebGL scene complexity) tuned only for high-end hardware | Author's own dev machine renders it smoothly, so it "looks done" | Frame rate drops below 60fps and load time balloons on average recruiter hardware/connections — directly undermines the "technically impressive" goal by making the site feel janky, and actively hurts Core Web Vitals (LCP/INP) which double as an SRE-credibility signal | Budget a performance ceiling up front (target FPS, GPU/CPU cost caps), test on mid-tier hardware, and provide device-tier/capability detection to gracefully downgrade effect complexity rather than degrade uniformly |
| Full LinkedIn API live-sync ("auto-pull my recommendations/connections") | Feels more "dynamic" and lower-maintenance than manual curation | LinkedIn closed the public recommendations API in 2015 and never reopened it; live sync would require restrictive Marketing Developer Platform approval intended for business use cases, not personal portfolios — a dead end already ruled out in PROJECT.md | Manually curate and periodically refresh a small, permissioned set of recommendations as static content |
| Skill-bar / percentage-based skill ratings ("React 90%, Python 75%") | Looks quantifiable and easy to build (just a progress bar component) | Repeatedly cited as reading as amateurish and meaningless — there's no credible way to justify "90% at Kubernetes" and it invites skepticism rather than trust | Category-grouped skill lists (cloud/infra, IaC, GitOps, observability, languages, AI tooling) without fake precision; let certifications and project evidence carry the credibility weight |
| Contact-form-only (no visible email/mailto fallback) | Centralizes spam protection, feels "cleaner" | Nielsen Norman Group research and multiple sources warn forms-only contact pages read as a barrier — visitors worry the message won't be seen/read; also removes the fastest path (mailto) for a hiring manager already convinced | Offer both: visible email (role-based or lightly obfuscated to deter scraping) + LinkedIn/GitHub links, with an optional lightweight form as an additional channel, not the only one |
| Committing to a blog section for v1 | Feels like it rounds out the site and helps SEO | An abandoned or single-post blog is rated worse than no blog at all — it visibly dates the site and signals inconsistency; also directly conflicts with PROJECT.md's "ship fast, professional-content-focused v1" priority | Treat blog/writing as an explicit v1.x-or-later differentiator, contingent on a genuine ongoing-content commitment — do not stub an empty "Blog" nav item in v1 |

## Feature Dependencies

```
Theme-switchable animated background (v1 flagship)
  └──requires──> prefers-reduced-motion handling + user opacity control (accessibility/UX floor)
                    └──requires──> content-contrast validation across all 4 themes × all opacity levels

Curated Projects section
  └──requires──> GitHub repo enumeration/triage (Sandyzie05, ~30 repos → 3-6 curated)
                    └──enhances──> Case-study project writeups (adds depth to the curated subset)
                    └──enhances──> GitHub live-stats/pinned-repo widget (adds freshness signal)

Contact section
  └──requires──> Resume PDF hosted for one-click download
  └──enhances──> LinkedIn/GitHub links (redundant paths reduce "forms-only" friction)

LinkedIn recommendations/testimonials (differentiator)
  └──requires──> Manual permission from each recommender before publishing (blocking, non-technical dependency)

Dark mode / theme-aware color scheme
  └──conflicts──> Treating background themes and dark/light mode as two independent toggle systems (adds UI complexity, confuses "theme" terminology)

Blog/writing section
  └──conflicts──> v1 ship-fast constraint (explicitly out of scope per PROJECT.md priorities)
```

### Dependency Notes

- **Animated background requires reduced-motion + opacity control:** This isn't optional polish — PROJECT.md's own success criterion ("background must always serve the content, never compete with it") cannot be met without both an OS-level `prefers-reduced-motion` fallback and a user-facing opacity control, validated for contrast across every theme.
- **Curated Projects requires GitHub triage first:** With ~30 public repos and no enumeration done yet (per PROJECT.md context), the case-study writeups and live-stats widget can't be built until 3-6 repos are actually selected — this is a hard ordering dependency for planning.
- **LinkedIn testimonials has a non-technical blocking dependency:** Getting recommender permission is a manual, potentially slow step outside the codebase — should be flagged early so it doesn't block a later phase.
- **Dark mode conflicts with theme system:** Because the project already has a 4-way "theme" concept (Computers/AI/Space/Human-Evolution) tied to the background, introducing a separate light/dark toggle risks confusing terminology and doubling state to manage — recommend folding light/dark handling into each background theme's own palette rather than a second toggle.
- **Blog conflicts with ship-fast constraint:** PROJECT.md explicitly prioritizes speed and defers non-essential scope; a blog's maintenance-commitment requirement makes it structurally incompatible with a fast v1 launch.

## MVP Definition

### Launch With (v1)

Minimum viable product — matches PROJECT.md's "Active" requirements almost exactly; grounded in table-stakes research above.

- [ ] Hero/landing, About, Experience, Skills, Certifications, Education, Contact sections — all table stakes, no credible "must-have" portfolio section research surfaced ships without these
- [ ] Curated Projects section (3-6 repos from `Sandyzie05`, not all ~30) with descriptions, tech tags, and GitHub links — quality-over-quantity is the strongest cross-source consensus finding
- [ ] Resume PDF one-click download + contact section combining email/LinkedIn/GitHub links plus an optional lightweight form — removes the single most-cited failure mode ("don't make them hunt for your email")
- [ ] 4-theme animated background with scroll+mouse reactivity, full-bleed low-opacity rendering, user opacity control, and `prefers-reduced-motion` respect — this is the project's stated flagship differentiator and its accessibility floor must ship together, not be retrofitted
- [ ] Responsive/mobile-first layout, Core Web Vitals-conscious build (image optimization, code-splitting, minimal third-party scripts), basic SEO meta tags, and accessibility basics (contrast, alt text, semantic headings, keyboard nav) — non-negotiable baseline per research and directly at risk given the animated-background feature

### Add After Validation (v1.x)

Features to add once the core site is live and gathering real recruiter/network engagement.

- [ ] Case-study-style writeups for 2-3 flagship projects (problem/approach/trade-offs/outcome format with diagrams) — trigger: once the curated project list is stable and initial visitor feedback shows people want more depth than a one-line description
- [ ] Live/curated GitHub stats or pinned-repo cards with config-based pinning — trigger: once the 3-6 flagship repos are finalized and stable (don't build this against a moving target)

### Future Consideration (v2+)

Features to defer until the core portfolio has validated its reception.

- [ ] Manually-curated LinkedIn recommendations/testimonials — defer because it depends on an external, non-technical step (recommender permission) that could stall the v1 timeline
- [ ] Blog/writing section — defer until there's a genuine, demonstrated willingness to maintain it; an abandoned blog actively damages credibility more than no blog
- [ ] Additional background themes (e.g. Chess) — already explicitly deferred in PROJECT.md; adding more themes should never be treated as a "quick add" against the 4 shipped themes

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero/About/Experience/Skills/Certs/Education (content sections) | HIGH | LOW–MEDIUM | P1 |
| Curated Projects with GitHub links | HIGH | MEDIUM | P1 |
| Contact + resume download (hybrid form/mailto/links) | HIGH | LOW | P1 |
| Animated theme-switchable background (4 themes, scroll+mouse, low-opacity, opacity control, reduced-motion) | HIGH | HIGH | P1 |
| Responsive layout, CWV performance, basic SEO, accessibility basics | HIGH | MEDIUM | P1 |
| Case-study project writeups | MEDIUM–HIGH | MEDIUM | P2 |
| GitHub live-stats/pinned-repo widget | MEDIUM | MEDIUM | P2 |
| Dark mode folded into theme palettes | MEDIUM | LOW | P2 |
| LinkedIn recommendations (manually curated) | MEDIUM | LOW–MEDIUM (+ external permission delay) | P3 |
| Blog/writing section | LOW–MEDIUM | MEDIUM (ongoing) | P3 |
| 5th+ background theme (e.g. Chess) | LOW (marginal) | MEDIUM–HIGH | P3 |

**Priority key:**
- P1: Must launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

Rather than named competitor sites, this domain is best benchmarked against aggregated research on what SRE/platform-engineering-adjacent developer portfolios and general "best practice" guides converge on for 2025/2026.

| Feature | General dev-portfolio consensus | SRE/platform-specific angle | Our Approach |
|---------|--------------------------------|------------------------------|--------------|
| Project showcase depth | 3-5 polished projects with live demos preferred | Live demos are less common for infra work (no public-facing "app"); architecture diagrams/postmortems substitute | Curated 3-6 GitHub-linked projects with diagrams/screenshots in place of live demos where a live demo isn't applicable |
| Skills presentation | Category-grouped lists over skill-bar percentages | Categories should reflect infra stack: cloud/infra, IaC, GitOps/DevOps, observability, languages, AI tooling | Adopt category grouping exactly as scoped in PROJECT.md |
| Signature visual differentiator | Rare in this domain — most competing portfolios use static hero + subtle micro-interactions only | N/A (novel for this space) | The 4-theme assemble/disassemble background is a genuine differentiator precisely because it's uncommon among SRE/platform portfolios, provided it never compromises the content-first requirement |

## Sources

- [Top 10 Full Stack Portfolio Projects for 2026](https://www.nucamp.co/blog/top-10-full-stack-portfolio-projects-for-2026-that-actually-get-you-hired)
- [Developer Portfolio Guide 2026 — Hakia](https://hakia.com/skills/building-portfolio/)
- [Top 10 Portfolio Platforms Recruiters Actually Check in 2026 — Fueler](https://fueler.io/blog/top-portfolio-platforms-recruiters-actually-check)
- [Hiring for Platform Engineering Teams — daily.dev Recruiter](https://recruiter.daily.dev/hiring-scenarios/platform-engineering/)
- [How to Build a Developer Portfolio That Gets You Hired in 2026](https://curious.page/blog/how-to-build-developer-portfolio-gets-hired)
- [What I learned after reviewing over 40 developer portfolios — DEV Community](https://dev.to/kethmars/what-i-learned-after-reviewing-over-40-developer-portfolios-9-tips-for-a-better-portfolio-4me7)
- [What Recruiters Look for in Developer Portfolios — Pesto](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios)
- [Web Developer Portfolio — Arc.dev](https://arc.dev/talent-blog/web-developer-portfolio/)
- [GitHub - anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- [Building My Portfolio Website with GitHub Integration — DEV Community](https://dev.to/arjun_computer_geek/building-my-portfolio-website-a-journey-with-react-github-integration-and-github-pages-deployment-1a66)
- [Making Your Web Animations Accessible: 5 Tips — BOIA](https://www.boia.org/blog/making-your-web-animations-accessible-5-tips)
- [Animated Website Background: Common UX Mistakes — Alpha Efficiency](https://alphaefficiency.com/animated-website-background)
- [How to Create Engaging and Accessible WCAG-Compliant Animations — A11Y Collective](https://www.a11y-collective.com/blog/wcag-animation/)
- [Understanding SC 2.3.3: Animation from Interactions — W3C WAI](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [prefers-reduced-motion — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [C39: Using prefers-reduced-motion to prevent motion — W3C WAI](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)
- [How to improve Core Web Vitals in 2025 — OWDT](https://owdt.com/insight/how-to-improve-core-web-vitals/)
- [Enhancing SEO Through Web Accessibility — Siteimprove](https://www.siteimprove.com/blog/seo-accessibility/)
- [Optimize Your Portfolio for Search — AgentKit SEO](https://agentkit-seo.github.io/playbooks/web-portfolio/)
- [Should I add a blog to my portfolio? — DESK Magazine](https://vanschneider.com/blog/portfolio-tips/should-i-add-a-blog-to-my-portfolio/)
- [Having a blog as a Developer — freeCodeCamp Forum](https://forum.freecodecamp.org/t/having-a-blog-as-a-developer/503147)
- [Contact Form vs Email Address — WPForms](https://wpforms.com/contact-form-vs-email-address-which-is-better/)
- [Mailto Links vs Contact Forms: Which Converts Better in 2026 — Flyn](https://www.flyn.to/blog/mailto-vs-contact-form-when-each-wins)
- [Website Email Spam Prevention: Mailto Links vs Contact Forms — LinkedIn](https://www.linkedin.com/pulse/website-email-spam-prevention-mailto-links-vs-contact-michael-akerele-dbmzf)
- [The Complete Software Engineer Portfolio Guide + 24 Examples — CareerFoundry](https://careerfoundry.com/en/blog/web-development/software-engineer-portfolio/)
- [Fetching and Displaying LinkedIn Testimonials on Your Website — Reintech](https://reintech.io/blog/integrating-linkedin-testimonials-on-your-website)
- [Embed LinkedIn Recommendations with HTML and CSS — Damos Designs](https://www.damosdesigns.com/LinkedinRecommendationsOnWebsite/)

---
*Feature research for: Personal/developer portfolio website (SRE/Platform Engineer)*
*Researched: 2026-07-18*
