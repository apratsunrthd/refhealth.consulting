# HANDOFF - refhealth.consulting

## Fast Orientation

This is a static marketing site. There is no package manager, build command, or
framework. Open `index.html` directly to preview the homepage.

Important files:

- `index.html` - main marketing page and revenue CTA
- `styles.css` - shared CSS for the homepage and blog pages
- `blog.html` - article index
- `blog-100k-per-day-mistake.html` - domain knowledge article
- `blog-why-we-build-with-dbt.html` - dbt article
- `PRODUCT.md` - confirmed product facts and claim boundaries
- `DESIGN.md` - Impeccable visual direction and design rules

## Current Branch

Work was done on `update-content-ai-consulting-site`, not `main`.

## Design Context

The active visual direction is "healthcare signal-control grid." It uses a
paper/ink base with red, amber, green, and teal signal states. Avoid reverting to
generic healthcare blue gradients, card grids, glass, or AI-agency purple.

Impeccable context reported no automatic design hook. Manual detector command:

```bash
/Users/apratsunrthd/.claude/skills/impeccable/scripts/impeccable detect --json index.html styles.css blog.html blog-100k-per-day-mistake.html blog-why-we-build-with-dbt.html
```

Known detector state after the latest pass: only section-level cramped-padding
warnings remain. The rendered screenshots showed adequate spacing.

Final Impeccable reviewer verdict: `ship`. The final pass specifically checked
mobile touch targets, blog/article navigation labels, and durable proof copy.

## Content Boundaries

- Brad's current title can be used, but do not imply employer sponsorship.
- Do not name Pager internal tools, data, systems, clients, or proprietary
  details.
- Public GitHub links may be used for public repositories only.
- Private local repos may inform generic capability language only.
- Do not invent clients, logos, case-study metrics, pricing, certifications, or
  guarantees.

## Verification

Manual browser checks used gstack browse against local files:

- `file://./index.html` at 1440x900 and 390x844
- `file://./blog.html`
- `file://./blog-why-we-build-with-dbt.html`

All checked pages loaded with no console errors.

## Deployment

The repo has `CNAME` for `refhealth.consulting` and can be served by any static
host or GitHub Pages.
