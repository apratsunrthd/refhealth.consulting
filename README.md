# refhealth.consulting

Static marketing site for ref(health) Consulting, a healthcare data, analytics,
and practical AI consulting firm.

The homepage positions the firm around paid healthcare data and AI work:
AI-readiness diagnostics, company Data AI Operating Systems, data landscape
assessments, dbt analytics engineering, model orchestration, agentic workflow
prototypes, payer/provider modernization support, and fractional data
leadership. The primary buyer is a health-tech startup; provider and other
healthcare teams remain secondary audiences. The focused AI-readiness diagnostic
starts at $2,500. Dedicated service pages, a short diagnostic intake, and
original articles make the offers easier for search engines, answer engines, and
buyers to find and understand. Free [Healthcare Feed Triage](feed-triage.html)
is a downloadable Claude Desktop extension that inspects local CSV event feeds
and FHIR Bundles for concrete timing and data-quality problems.

## Development

No build tooling is required for the site. Open `index.html` in a browser to preview
the homepage. Serve the directory locally (for example,
`python3 -m http.server 8000`) to preview `/feed-triage.html` and its extension
download. Visit `blog.html` to view the insights index.

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
- `dbt-consulting.html` - dbt consulting and analytics engineering
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic
- `feed-triage.html` - extension landing page, example results, and install steps
- `refhealth-feed-triage.mcpb`, `mcp/` - Claude Desktop extension and local feed inspector
- `intake.html` - diagnostic intake and starting-price conversion path
- `about.html` - healthcare experience and engagement model
- `blog.html` - insights listing
- `blog-*.html` - static article pages
- `styles.css` - shared visual system
- `og.png` and `og-card.svg` - social preview asset and editable source
- `FORM_SETUP.md` - hosted diagnostic form setup checklist
- `robots.txt` and `sitemap.xml` - crawl policy and public URL inventory
- `PRODUCT.md` - durable product facts for Impeccable and future agents
- `DESIGN.md` - durable design system and visual direction
- `BRIEF.md`, `HANDOFF.md`, `TODO.md`, `ADVERTISING_PLAN.md` - project state, documentation, and growth plans

## Deployment

The site is hosted natively on Cloudflare Pages (`refhealth.consulting` and `www.refhealth.consulting`)
with automated deployments on push to `main` via `.github/workflows/sitemap.yml`.
DNS and domain registration are managed via Cloudflare Registrar and Anycast DNS.
`.github/workflows/checks.yml` tests the feed evaluator, MCP protocol, and download
contents on pull requests.
