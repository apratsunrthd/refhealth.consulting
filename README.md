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
buyers to find and understand. The free [AI Data Readiness Checker](readiness-checker.html)
reviews dbt metadata in the browser; a downloadable local MCP server exposes the
same checks to AI clients.

## Development

No build tooling is required for the site. Open `index.html` in a browser to preview
the homepage. For the checker, serve the directory locally (for example,
`python3 -m http.server 8000`) and open `/readiness-checker.html`; ES modules
need an HTTP origin. Visit `blog.html` to view the insights index.

The optional MCP server needs Node.js 20 or newer. Run `npm ci --prefix mcp` and
`npm test --prefix mcp`; see [mcp/README.md](mcp/README.md) for client setup.
After editing MCP distribution files, refresh `readiness-mcp.zip` with:

```sh
zip -X -q readiness-mcp.zip readiness-core.mjs mcp/server.mjs mcp/package.json mcp/package-lock.json mcp/sample-manifest.json mcp/README.md test/readiness.test.mjs mcp/test/server.test.mjs
```

## Structure

- `index.html` - homepage and primary conversion path
- `healthcare-ai-consulting.html` - healthcare AI and Data AI Operating System
- `healthcare-data-strategy.html` - healthcare data strategy and landscape work
- `dbt-consulting.html` - dbt consulting and analytics engineering
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic
- `readiness-checker.html`, `readiness-ui.mjs`, `readiness-core.mjs` - free browser checker and shared review rules
- `readiness-mcp.zip`, `mcp/` - downloadable local MCP server and sample manifest
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
`.github/workflows/checks.yml` tests the shared checker, MCP protocol, and download
contents on pull requests.
