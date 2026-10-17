# refhealth.consulting

Static marketing site for ref(health) Consulting, an executive healthcare data leadership and AI advisory firm.

The firm specializes in **Fractional VP of Data** leadership, **Company Data AI Operating Systems (HDAIOS)**, and 2-week AI-readiness diagnostics ($2,500). dbt analytics engineering and open-source packages serve as our Layer 2 Governed Data Foundation proof-of-work ("we know the plumbing down to the metal") rather than an hourly contractor offering. The primary buyer is a health-tech founder, CEO, or CTO; provider and health plan data teams remain secondary audiences. Dedicated service pages, an interactive intake, and original technical playbooks make the offers clear for search engines, LLM answer engines, and prospective clients. Free [Healthcare Feed Triage](feed-triage.html) is a downloadable Claude Desktop extension that inspects local CSV event feeds and FHIR Bundles for concrete timing and data-quality defects.

Company Page: [ref(health) Consulting on LinkedIn](https://www.linkedin.com/company/refhealthconsulting). Campaign drafts and setup copy are in [thought-leadership-linkedin-campaign.md](thought-leadership-linkedin-campaign.md).

## Development

No build tooling is required for the site. Open `index.html` in a browser to preview
the homepage. Serve the directory locally (for example,
`python3 -m http.server 8000`) to preview `/feed-triage.html` and its extension
download. Visit `blog.html` to view the insights index. Preview the executive calculator at
`/fractional-vp-data.html#calculator`; budgets are illustrative inputs, not advisory quotes.
Run its dependency-free tests with `node --test test/executive-calculator.test.cjs`.

The extension package bundles its Node dependencies; Claude Desktop supplies the
runtime. For development, run `npm ci --prefix mcp` and `npm test --prefix mcp`.
See [mcp/README.md](mcp/README.md) for usage and input formats. After editing
extension files, rebuild the download with:

```sh
./scripts/build-feed-bundle.sh
```

## Structure

- `index.html` - homepage and primary conversion path
- `healthcare-ai-consulting.html` - healthcare AI and Data AI Operating System
- `healthcare-data-strategy.html` - healthcare data strategy and landscape work
- `fractional-vp-data.html`, `fractional-vp-data.css`, `fractional-vp-data.js` - executive leadership offering and editable cash/runway/capacity calculator with local Markdown memo export
- `dbt-consulting.html` - dbt consulting and analytics engineering
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic
- `feed-triage.html` - extension landing page, example results, investigation guide, and install steps
- `feed-triage-summary.html` - visual one-page extension overview
- `refhealth-feed-triage.mcpb`, `mcp/` - Claude Desktop extension and local feed inspector
- `intake.html` - diagnostic intake and starting-price conversion path
- `about.html` - healthcare experience and engagement model
- `hdaios.html` / `hdaios.md` - Healthcare Data AI Operating System (HDAIOS) v1.0 canonical architectural specification and interactive self-assessment (`#assessment`)
- `dbt-consulting.html` - dbt analytics engineering offer, featuring interactive Claims Lag & Capital Float Calculator (`#calculator`)
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic offer and interactive Statement of Work (SOW) Generator (`#scope-generator`)
- `blog.html` - insights, playbooks, and specifications listing
- `blog-*.html` - static technical teardowns (`blog-edi-837-835-claims-modeling-dbt.html`, `blog-healthcare-dbt-audit-playbook.html`, `blog-bitemporal-healthcare-data-ai.html`)
- `llms.txt` and `llms-full.txt` - machine-readable manifests and token-dense knowledge corpus for AI answer engines and autonomous agents
- `styles.css` - shared visual system
- `og.png` and `og-card.svg` - social preview asset and editable source
- `assets/brand/refhealth-linkedin-logo.png` / `.svg` - 400×400 Company Page logo and editable source
- `docs/deployments/2026-10-14-pr66.md` - executive offering deployment and verification record
- `FORM_SETUP.md` - hosted diagnostic form setup checklist
- `robots.txt` and `sitemap.xml` - crawl policy and public URL inventory
- Open-Source Repositories:
  - [`apratsunrthd/refhealth-starter-dbt-project`](https://github.com/apratsunrthd/refhealth-starter-dbt-project) - cloneable DuckDB healthcare dbt starter repo (v1.2.0) with synthetic FHIR encounter crosswalk, actuarial metrics, and 106 passing tests
  - [`apratsunrthd/refhealth-dbt-healthcare-checks`](https://github.com/apratsunrthd/refhealth-dbt-healthcare-checks) - 7 generic dbt test macros for healthcare data integrity
  - [`apratsunrthd/refhealth-feed-triage`](https://github.com/apratsunrthd/refhealth-feed-triage) - local Claude Desktop MCP extension for feed quality
- `PRODUCT.md` - durable product facts for Impeccable and future agents
- `DESIGN.md` - durable design system and visual direction
- `BRIEF.md`, `HANDOFF.md`, `TODO.md`, `ADVERTISING_PLAN.md`, `thought-leadership-linkedin-campaign.md` - project state, documentation, and growth plans

## Deployment

The site is hosted natively on Cloudflare Pages (`refhealth.consulting` and `www.refhealth.consulting`)
with automated deployments on push to `main` via `.github/workflows/sitemap.yml`.
DNS and domain registration are managed via Cloudflare Registrar and Anycast DNS.
`.github/workflows/checks.yml` tests the feed evaluator, MCP protocol, and download
contents, plus the executive calculator on pull requests.
