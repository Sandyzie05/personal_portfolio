# Phase 1: App Shell, Content & Deployment - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-19
**Phase:** 1-App Shell, Content & Deployment
**Areas discussed:** Content curation, Visual design direction, Deployment specifics

---

## Content Curation

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts project list from public repo metadata | Claude picks 3-6 repos and writes descriptions from README/metadata alone | |
| User supplies the repo picks and quotes | User names which repos to feature and pastes recommendation quotes verbatim | ✓ |
| Defer entirely to execution | Skip discussing, decide during execution | |

**User's choice:** User will personally choose 3-6 `Sandyzie05` repos to feature and personally supply 2-3 LinkedIn recommendation quotes (with recommender name/title). Resume PDF is used as-is with no further synthesis.
**Notes:** Content itself (repo list, quotes) was not pasted during this discussion session — user did not respond to the follow-up request to paste them now vs. defer to execution. Treated as deferred to execution per the standing offer in the prior turn; logged as a pre-execution content dependency in CONTEXT.md rather than blocking context capture.

---

## Visual Design Direction

| Option | Description | Selected |
|--------|-------------|----------|
| Dark-mode-first, technical/minimalist | Dark base, sans-serif type, card-based sections — pairs with full-bleed WebGL backgrounds | ✓ (Claude's discretion) |
| Light-mode-first, editorial/warm | Light base, serif accents, more traditional resume-site feel | |
| Full detail now (palette, type scale, spacing) | Lock exact visual system in this discussion | |

**User's choice:** No explicit user selection was made in this session (discussion could not proceed interactively). Claude defaulted to dark-mode-first/technical-minimalist as a starting direction, explicitly flagged as discretionary and non-final.
**Notes:** Full visual system detail is intentionally deferred to `/gsd-ui-phase 1`, which produces UI-SPEC.md — this phase only needed a coarse direction so research/planning aren't unguided.

---

## Deployment Specifics

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror `jagdamba_automobiles` exactly (manual build+upload) | Same dependency-free Node `app.js` + Vite `dist/` pattern, same manual deploy flow | ✓ |
| Add CI/CD auto-deploy on top of the reference pattern | GitHub Actions or similar triggers deploy on push | |
| Different hosting/deploy pattern | Explore alternatives to the proven reference pattern | |

**User's choice:** Mirror `jagdamba_automobiles`'s deployment pattern verbatim — new cPanel Node.js app root, same dependency-free `app.js` server, same Node engines range, manual build-and-upload (no CI/CD in v1).
**Notes:** Target domain/subdomain and new GitHub repo name were not finalized in this session — logged as a pre-execution dependency for the DEPLOY-01 step specifically, not blocking earlier content/shell work.

---

## Claude's Discretion

- Visual design direction default (dark-mode-first, technical-minimalist) — see above, non-final pending UI-SPEC.md.
- Section ordering/visual hierarchy within the single-page shell (hero first, contact/footer last, order of sections in between).
- Exact color palette, type scale, and component styling — deferred to `/gsd-ui-phase 1`.

## Deferred Ideas

- Domain/subdomain and new GitHub repo name confirmation — needed before DEPLOY-01 execution.
- GitHub repo picks (3-6 of ~30) and LinkedIn recommendation quotes (2-3) — needed before Projects/Social Proof execution.
- Detailed visual design system — owned by `/gsd-ui-phase 1`.
