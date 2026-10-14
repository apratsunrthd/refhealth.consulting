# HANDOFF - refhealth.consulting

## Fast Orientation

This is a static marketing site. Open `index.html` directly to preview the
homepage. Serve the directory over HTTP to preview `/feed-triage.html` and
download its `.mcpb` extension: `python3 -m http.server 8000`. The local MCP
server lives in `mcp/`; run `npm ci --prefix mcp`, `npm test --prefix mcp`, and
`./scripts/build-feed-bundle.sh` after changing it.

Important files:

- `index.html` - main marketing page and revenue CTA
- `feed-triage.html` - free extension page and install instructions
- `feed-triage.html#investigate` - public investigation guide linked from version 0.1.2 tool results when findings exist
- `feed-triage-summary.html` - visual one-page overview with the synthetic sample's measured result, data boundary, and current download version
- `mcp/feed-core.mjs` / `mcp/server.mjs` - deterministic feed checks and MCP tool
- `mcp/` / `refhealth-feed-triage.mcpb` - samples, manifest, and downloadable Claude Desktop package
- `mcp/test/` - feed rules and MCP client integration tests
- Public extension source: `https://github.com/apratsunrthd/refhealth-feed-triage`; supports Claude Desktop (`.mcpb`) and Smithery CLI (`npx -y @smithery/cli install @apratsunrthd/refhealth-feed-triage`).
- Public dbt test package: `https://github.com/apratsunrthd/refhealth-dbt-healthcare-checks`; open-source dbt package with 7 healthcare integrity tests.
- Public starter repository: `https://github.com/apratsunrthd/refhealth-starter-dbt-project`; cloneable DuckDB healthcare dbt starter project (v1.2.0) with synthetic claims, monthly actuarial metrics, FHIR encounter crosswalk, and 106 passing tests.
- `hdaios.html` / `hdaios.md` - Healthcare Data AI Operating System (HDAIOS) v1.0 canonical architectural specification and interactive, zero-PHI self-assessment audit tool (`#assessment`)
- `thought-leadership-linkedin-campaign.md` - 3-part executive LinkedIn sequence targeting health-tech CEOs/CTOs on data debt, fractional data leadership, and HDAIOS
- Anthropic desktop extension directory submission for version 0.1.1 was recorded on 2026-10-11. Version 0.1.2 adds an optional guide link, but the submitted 0.1.1 package does not contain it. Monitor `contact@refhealth.consulting` for a review response; submission does not guarantee listing.
- `healthcare-ai-consulting.html` - flagship Data AI Operating System offer
- `healthcare-data-strategy.html` - healthcare data landscape and strategy offer, including `#fractional-leadership` executive advisory
- `dbt-consulting.html` - dbt and analytics engineering offer, featuring interactive Claims Lag & Capital Float Calculator (`#calculator`)
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic offer and interactive Statement of Work (SOW) Generator (`#scope-generator`)
- `intake.html` - paid diagnostic intake page with hosted Tally form, email fallback, and SOW query-parameter banner
- `analytics.js` - shared privacy-safe attribution and conversion events
- `MEASUREMENT.md` - measurement architecture, event dictionary, and operating cadence
- `ADVERTISING_PLAN.md` - paid acquisition strategy, unit economics, audience targeting, and $1,500 pilot sprint
- `og.png` - brand-safe 1200x630 social preview image
- `og-card.svg` - editable source for the social preview image
- `FORM_SETUP.md` - hosted-form field map and activation checklist
- `AGENTS.md` - Cloudflare Pages deployment configuration and health check rules
- `about.html` - experience, translation layer, and engagement model
- `styles.css` - shared CSS for all pages
- `blog.html` - article index
- `blog-edi-837-835-claims-modeling-dbt.html` - technical guide on EDI 837 claim submission vs 835 remittance reconciliation, CAS normalization, takebacks, and net denial rates
- `blog-healthcare-dbt-audit-playbook.html` - 48-hour healthcare dbt audit playbook covering grain collapse, bitemporal desync, midnight timestamps, and code drift
- `blog-bitemporal-healthcare-data-ai.html` - bitemporal claims modeling, healthcare dbt tests, and clinical-diagnostic safety boundaries
- `blog-data-ai-operating-system.html` - original AI operating-system explainer
- `blog-healthcare-ai-model-strategy.html` - single-provider versus multi-model
  healthcare AI strategy article
- `blog-100k-per-day-mistake.html` - domain knowledge article
- `blog-why-we-build-with-dbt.html` - dbt article
- `robots.txt` - public crawl policy, including explicit AI crawler permissions (OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` - concise markdown site manifest optimized for LLM agent ingestion and citations
- `llms-full.txt` - token-dense unabridged site corpus and Q&A directory for direct LLM context windows
- `sitemap.xml` - public URL inventory; the GitHub Action regenerates it on main
- `d774f0fd6934e4b0345056d9a28dbcf1.txt` - IndexNow ownership key file
- `index.html` - homepage with Google Search Console and Bing Webmaster
  verification tags
- `PRODUCT.md` - confirmed product facts and claim boundaries
- `DESIGN.md` - Impeccable visual direction and design rules

## Current Branch

The strategic repositioning for **Executive Healthcare Data Leadership (Fractional VP of Data)** and **Company Data AI Operating Systems (HDAIOS)** is merged to `main` and verified live on Cloudflare Pages.
Tactical dbt engineering and open-source packages now serve as our Layer 2 Governed Data Foundation proof-of-work.

PR #64 underwent in-depth automated review by Codex (`chatgpt-codex-connector`) and was approved with 0 findings ("Chef's kiss") before being squashed and merged to `main`.
All clinical triage / Schmitt-Thompson references were replaced across the codebase with explicit non-compete guardrails and clinical safety boundaries.

The site is hosted natively on Cloudflare Pages (`refhealth-consulting` project) with custom domains `refhealth.consulting` and `www.refhealth.consulting`.
Automated CI/CD deployments trigger on push to `main` via `cloudflare/wrangler-action@v3`.
The measurement system is active with dedicated GA4 web stream `G-05XLCL9N8S`, shared `analytics.js` attribution tracking, and Google Looker Studio dashboard:
`https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F`.

The diagnostic intake form is hosted by Tally at `https://tally.so/r/5BJOVN` and embedded in `intake.html` with query-parameter listeners for dynamic SOW generation and Claims Lag calculator handoffs.
Self email notifications are configured for the consulting inbox, and a synthetic non-sensitive test submission reached the custom confirmation page.
`FORM_SETUP.md` contains the field map and setup record. Keep the plain-email fallback and no-sensitive-data guidance intact.
Tally is connected to Google Sheet `refhealth lead attribution` forwarding seven hidden attribution fields.
`AGENTS.md` contains the deployment configuration for Cloudflare Pages, including root health checks and post-merge smoke checks.
Preserve the layout rule placing descriptions in their content columns so mobile views remain responsive.

## Strategic Recommendations & Open Threads

### 1. For Claude Code, Codex, and Next Engineering Sessions
- **Dedicated Fractional VP of Data Landing Page (`fractional-vp-data.html`)**:
  - Build out the full executive offering addressing health-tech founders, CEOs, and CTOs (Series Seed through Series B).
  - Four pillars: Board & Metric Governance (MLR, net revenue retention, CAC/LTV), Architecture & HDAIOS Roadmap, Data Team Hiring & Technical Diligence, and Cloud/Vendor Negotiation.
  - Two engagement tiers: Strategic Advisory Retainer (bi-weekly board cadence, architectural oversight) and Embedded Fractional Leadership (hands-on roadmap direction, team management, HDAIOS rollout).
- **Interactive Executive ROI & Capacity Calculator**:
  - Deploy zero-PHI, client-side calculator on `fractional-vp-data.html` (`#calculator`).
  - Compare full-time VP overhead ($300k base + bonus + equity + benefits + recruiting ~ $465k Year 1 burn) vs. fractional advisory ($6k-$12k/mo retainer + targeted engineering sprints).
  - Calculate annual cash burn reduction ($250k–$350k capital preserved), runway extension (in months), and time-to-first-board-metric.
  - Export 1-click Markdown scope memo and dynamically pre-fill `intake.html?scope=fractional-vp-data`.
- **Discovery Manifests & Navigation**:
  - Wire `/fractional-vp-data` into header nav, footer, `sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
  - Add query-parameter listener on `intake.html` rendering a dedicated executive advisory verification banner.

### 2. For the Site Owner (Human Actions)
- **LinkedIn Company Page**: Create `ref(health) Consulting` on LinkedIn using the pre-drafted copy in `thought-leadership-linkedin-campaign.md`.
- **Personal Profile Link**: Add "Founder & Fractional Principal" under Experience on your personal LinkedIn profile, linked directly to the new company page.
- **Publish Post 1**: Syndicate Post 1 from `thought-leadership-linkedin-campaign.md` ("Why Healthcare AI Pilots Die in the Data Layer").
- **Knowledge Graph Entity Anchors**: Register free basic company profiles on **Crunchbase** and **Wellfound** (formerly AngelList) for `ref(health) Consulting` (URL: `https://refhealth.consulting`). This gives LLM web-search crawlers (ChatGPT Search / OAI-SearchBot, ClaudeBot, PerplexityBot) verifiable external entity resolution nodes.
- **Paid Acquisition Sprint**: Review and initiate the $1,500 30-day pilot sprint outlined in `ADVERTISING_PLAN.md` via LinkedIn Campaign Manager and Google Search.

## Design Context

The active visual direction is "Company Data AI Operating System." It uses a
paper/ink base with red, amber, green, and teal signal states. Avoid reverting to
the rejected signal-map hero, generic healthcare blue gradients, card grids,
glass, or AI-agency purple.

Impeccable context reported no automatic design hook. Manual detector command:

```bash
$HOME/.claude/skills/impeccable/scripts/impeccable detect --json index.html styles.css blog.html blog-100k-per-day-mistake.html blog-why-we-build-with-dbt.html
```

Known detector state after the latest pass: section-level cramped-padding
warnings and type-ramp advisories remain. The rendered screenshots showed
adequate spacing, no overlap, no visible undersized touch targets on the
homepage, and no horizontal mobile overflow.

## Content Boundaries

- Do not mention the founder's personal name in public site copy or public project
  docs.
- Do not use affiliation disclaimer copy.
- Do not lead with public code links as buyer proof. If used later, they should
  be secondary technical diligence only.
- Private projects may inform generic capability language only.
- Do not invent clients, logos, case-study metrics, certifications, or
  guarantees.
- The owner-approved diagnostic starting price is $2,500. Do not publish other
  prices until they are validated.
- Use anonymized capability language for live healthcare AI work; do not name an
  employer or disclose a workforce reduction.

## Search Context

- Search intent is handled through distinct, useful pages instead of repeated
  keyword copy.
- Google guidance says AI Overviews and AI Mode have no extra technical or
  special schema requirement beyond normal Search eligibility. Keep improving
  people-first content, internal links, structured data that matches visible
  text, and page experience.
- OpenAI's official crawler guidance identifies `OAI-SearchBot` as the crawler
  used to surface websites in ChatGPT search. It is explicitly allowed in
  `robots.txt`.
- Google, Bing/Copilot, Anthropic, and xAI all document search or retrieval
  paths that use public web content. The site keeps the generic `Allow: /`
  rule rather than guessing at undocumented model-specific crawler names.
- The main-branch sitemap workflow submits the current URL set to IndexNow
  after its sitemap/HTML update. This improves change notification, not rank
  guarantees.
- Google Search Console ownership is verified and `/sitemap.xml` is submitted
  successfully. Bing Webmaster Tools ownership is verified and the full sitemap
  URL is submitted with status `Submitted - Processing`. Search engines may
  still need time to crawl and index the new URLs.
- On 2026-09-14, Google Search Console was reviewed. The site has only an early
  web visibility signal, and its generative-AI report has limited homepage-only
  visibility. The query/page signal is not yet qualified buyer intent, so the
  site makes no performance claim from it.
- A new GA4 web stream was created on 2026-09-15 with measurement ID
  `G-05XLCL9N8S` in the dedicated `refhealth.consulting` property. The
  dashboard is connected to that property rather than the older mixed-site
  property.

## Required AI Positioning

- Mention multi-model orchestration across labs/providers.
- Mention the ability to go deep with a single provider when policy,
  integration, commitment, or delivery speed makes that the right path.
- Keep the company Data AI Operating System as the flagship mechanism.
- Lead the commercial path with the focused health-tech startup diagnostic,
  starting at $2,500.

## Verification

Manual browser checks used gstack browse against local files:

- `file://./index.html` at 1440x900 and 390x844
- `file://./blog.html`
- `file://./blog-why-we-build-with-dbt.html`

All checked pages loaded with no console errors.

Post-deploy canary: the prior pass covered 10 public HTML pages with expected
titles, canonical URLs, and H1s. This pass additionally verified the new
model-strategy article, the Insights listing, and the healthcare AI offer page
at 200, with the expected internal links. The article returned the intended
metadata and JSON-LD, the published sitemap includes its URL, and its console
was clean after stale browser logs were cleared. `robots.txt`, the sitemap,
and the IndexNow key returned 200.

Production also exposes both ownership tags. Google Search Console confirmed
ownership through the HTML tag and reported the sitemap as successful with 100
discovered pages. Bing Webmaster Tools confirmed ownership through its HTML
meta tag and accepted the sitemap for processing.

The social-preview asset is a deterministic, brand-safe PNG rather than a
photographic or AI-generated image. All 12 public HTML pages reference it with
Open Graph and Twitter image metadata. `og-card.svg` is the editable source and
uses the same `1200x630` aspect ratio as `og.png`.

Static checks for this SEO pass validate that every HTML page has a title,
description, canonical URL, and parseable JSON-LD; all local links and fragments
resolve; and `sitemap.xml` is valid XML.

The measurement pass also validates that all public pages use the dedicated GA4
ID and shared analytics script, that `analytics.js` parses successfully, and
that the Data Studio report has the GA4, Search Console, and Tally sources.

## Deployment

The site is natively hosted on Cloudflare Pages (`refhealth-consulting` project)
with custom domains `refhealth.consulting` and `www.refhealth.consulting`.
Automated deployments run on every push to `main` via `cloudflare/wrangler-action@v3`
in `.github/workflows/sitemap.yml`.
The deployment configuration used by `/land-and-deploy` is recorded in
`AGENTS.md`; it uses a squash merge, the root URL as the primary health check,
and `/intake.html` plus `/sitemap.xml` as smoke checks.

On 2026-09-20, domain registration and DNS for `refhealth.consulting` were
migrated from Namecheap to Cloudflare Registrar and Cloudflare Anycast DNS.
Namecheap legacy email forwarders were replaced with Cloudflare Email
Routing (`*@refhealth.consulting` forwarding to `refhealth.consulting@gmail.com`)
with active SPF, DKIM, and MX records managed via Cloudflare API.

On 2026-09-21, static web hosting was migrated to Cloudflare Pages.
The entire stack (registrar, anycast DNS, edge CDN, origin static hosting, and email routing)
is now natively hosted and managed on Cloudflare with automated CI/CD deployments on push to `main`.

## Traffic and Analytics Operational Notes

- **Cloudflare Edge Analytics vs. GA4**: Cloudflare Edge Analytics (`refhealth.consulting/analytics/requests`)
  measures all raw network requests arriving at the edge, including automated crawlers,
  vulnerability scanners probing non-existent paths, and asset downloads.
  GA4 (`G-05XLCL9N8S`) measures only real browser sessions executing JavaScript.
- **Traffic Spikes Without Referrer**: High-volume traffic surges (e.g., from Brazil cloud/proxy
  networks like AWS `sa-east-1` or Oracle Vinhedo) with missing referrers are typically
  automated scanner fleets probing endpoints. They do not trigger GA4 active users.
- **404 Handling & Soft 404 Resolution**: `404.html` is implemented to ensure invalid/scanned
  endpoints receive a genuine HTTP 404 instead of falling back to the `index.html` SPA behavior.
- **Security & Caching Headers**: `_headers` configures HSTS preload, X-Frame-Options SAMEORIGIN,
  nosniff, and granular cache controls (instant revalidation for HTML, immutable long-term caching
  for assets).
- **Bot Defense**: Cloudflare Bot Fight Mode (`Security -> Bots -> Bot Fight Mode`) is active
  on the zone (`fight_mode: true, enable_js: true`), automatically challenging automated scrapers
  before they reach the site.
- **HTTPS Enforcement**: `always_use_https: on` is active on Cloudflare, enforcing 301 redirects
  from HTTP to HTTPS at the edge.


