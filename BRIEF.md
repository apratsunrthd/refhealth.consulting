# BRIEF - refhealth.consulting

## What This Project Is

Static marketing site for ref(health) Consulting, a healthcare data, analytics,
and practical AI consulting firm.

The site sells senior consulting around healthcare data strategy, dbt-centered
analytics engineering, AI-readiness, agentic workflow prototypes, payer/provider
modernization, fractional data leadership, multi-model AI orchestration, and
company Data AI Operating System buildouts.

## Current State

- Healthcare Feed Triage is implemented as a downloadable Claude Desktop `.mcpb`
  extension with a public landing page and a visual one-page overview labeled
  with the current 0.1.2 download version. Its local
  MCP tool inspects synthetic or approved de-identified CSV event feeds and FHIR
  Bundles. CSV checks include
  delivery latency, duplicate IDs, required fields, and timestamp defects;
  FHIR checks include Encounter IDs, patient references within the Bundle, and
  encounter end times. The tool returns counts and row-numbered findings to
  Claude, without raw records or identifiers. It does not send the file to
  ref(health). Version 0.1.2 adds an optional investigation-guide link when
  findings exist; opening it is the user's choice. It is live on Cloudflare Pages, and an installed copy was tested
  in Claude Desktop against the bundled synthetic CSV. MIT-licensed source and
  a release package are published separately at
  `apratsunrthd/refhealth-feed-triage`. Version 0.1.1 was submitted to
  Anthropic's desktop extension directory on 2026-10-11; inclusion is pending
  Anthropic's review. The earlier outreach and dbt manifest prototypes were
  retired.
- Static HTML/CSS site. No build step.
- Homepage and search-discoverability work are merged to `main` and deployed
  through GitHub Pages.
- The initial signal-control hero visual was rejected after screenshot QA
  because it created overlapping text and looked gimmicky.
- Hero visual was replaced with a clean Data AI Operating System panel.
- Blog listing and article pages updated to share the new navigation, footer,
  typography, and CTA framing.
- `PRODUCT.md` and `DESIGN.md` now record product and design truth.
- SEO and AI-search discoverability now have a dedicated content architecture:
  intent-specific healthcare AI, data strategy, dbt, AI-readiness, and About
  pages, plus original Data AI Operating System and healthcare AI model
  strategy articles.
- The Healthcare Data AI Operating System (HDAIOS) v1.0 specification is published
  at `/hdaios.html` and `/hdaios.md`, providing a canonical 5-layer open architectural
  reference: Layer 1 Decision Interface (Schmitt-Thompson triage boundary), Layer 2
  Governed Data Foundation (SCD2 bitemporal claims modeling and dbt integrity checks),
  Layer 3 Enterprise BAA & Model Gateway (cloud commitment optimization across Bedrock/Azure/Vertex),
  Layer 4 Agent & Semantic Orchestration (semantic layer RAG and HITL tripwires), and
  Layer 5 Continuous Operational Cadence (drift monitoring and 90-day review cadence).
- The open-source dbt package `apratsunrthd/refhealth-dbt-healthcare-checks` v1.0.0
  is published and integrated across the site and `/llms-full.txt`, codifying 7 generic
  dbt test macros for healthcare data integrity.
- The interactive, client-side, zero-PHI HDAIOS Self-Assessment Tool is live on
  `hdaios.html#assessment`, enabling engineering teams and autonomous agents to calculate
  a readiness score (0–100%) and export a prioritized remediation gap checklist.
- `apratsunrthd/refhealth-feed-triage` is syndicated via Smithery (`smithery.yaml`), allowing
  one-click CLI installation (`npx -y @smithery/cli install @apratsunrthd/refhealth-feed-triage`)
  across Cursor, Windsurf, and Claude.
- The 48-Hour Healthcare dbt Audit Playbook is published at `/blog-healthcare-dbt-audit-playbook.html`,
  providing an actionable teardown of surrogate key grain collapse, bitemporal enrollment desync,
  midnight timestamp drops, and code drift, with runnable tests from `refhealth-dbt-healthcare-checks`.
- The open-source reference template `apratsunrthd/refhealth-starter-dbt-project` v1.1.0
  is published and integrated across `dbt-consulting.html`, `/llms.txt`, and `/llms-full.txt`,
  providing a cloneable DuckDB healthcare dbt repository with 78/78 automated tests passing out of the box,
  including monthly actuarial and financial metrics (Medical Loss Ratio, Allowed/Net PMPM, Cost-Share, and Adjudication Lag percentiles).
- An interactive, client-side Diagnostic Statement of Work (SOW) Generator is live at
  `ai-readiness-assessment.html#scope-generator` and cross-linked in `intake.html`, enabling prospects
  to select their warehouse and pipeline friction points to generate and download a custom 1-page SOW memo.
- The flagship technical guide on EDI 837 vs 835 Claims Modeling in dbt is published at `/blog-edi-837-835-claims-modeling-dbt.html`,
  providing a senior analytics engineering teardown of claim frequency codes (1 vs 7 vs 8), Claim Adjustment Segment (CAS) normalization
  to prevent 3x–5x row multiplication, overpayment takebacks/recoupments (PLB), and true net denial rate modeling. Cross-linked across
  `blog.html`, `sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
- The model-strategy article explains when to orchestrate multiple models across
  labs/providers and when to go deep with one provider based on policy,
  integration, commitment, or delivery speed. It is listed in Insights and
  linked from the healthcare AI offer page.
- The current commercial wedge is health-tech startups. The site now leads with
  a focused AI-readiness diagnostic starting at $2,500, with larger operating
  system builds and other work positioned as follow-on engagements.
- A hosted Tally intake page now asks for only the information needed to scope
  the diagnostic. It keeps a plain-email fallback and repeats the no-sensitive-
  data boundary inside the form.
- The intake fallback stays above the hosted embed so email remains reachable if
  Tally cannot load, and the surrounding copy describes the hosted submission
  flow accurately.
- The intake process list keeps step descriptions in the content column at every
  viewport, so mobile text no longer collapses into the numbered column.
- The intake page now explains the three-step path from context to scope to
  decision, and records a privacy-safe GA4 event when a visitor starts the
  Tally intake without sending field values. Tally's hosted submission and
  notification surfaces are the source of truth for completed inquiries.
- Measurement now uses a dedicated `refhealth.consulting` GA4 web stream
  (`G-05XLCL9N8S`) instead of the older mixed-site stream. A shared
  `analytics.js` file captures allow-listed attribution, diagnostic CTA clicks,
  diagnostic starts, and email fallback clicks without sending form answers.
- Tally is connected to a Google Sheet named `refhealth lead attribution`.
  The intake embed forwards the allow-listed UTM values, first landing path,
  and referring host to hidden Tally fields so the submission log can be tied
  back to acquisition automatically. All seven hidden fields are now published.
- The free Data Studio report [ref(health) Measurement Dashboard](https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F)
  is connected to the dedicated GA4 property, the verified Search Console
  domain property, and the Tally response worksheet. It has scorecards for
  search clicks, search impressions, active users, and response count, plus a
  query table.
- The measurement system landed in PR #29 on 2026-09-15.
- On 2026-09-20, domain registration and DNS were transferred to Cloudflare Registrar and Anycast DNS, and
  Namecheap email forwarding was migrated to Cloudflare Email Routing with
  active catch-all routing (`*@refhealth.consulting` to `refhealth.consulting@gmail.com`).
- On 2026-09-21, static hosting was fully migrated from GitHub Pages to Cloudflare Pages (`refhealth-consulting` project).
  Automated deployments run on every push to `main` via `cloudflare/wrangler-action@v3` in `.github/workflows/sitemap.yml`.
- Edge security and performance hardening:
  - Enabled Cloudflare Bot Fight Mode (`fight_mode: true, enable_js: true`) to automatically challenge automated scraper networks and cloud IP probes at the edge.
  - Enabled Cloudflare Always Use HTTPS (`always_use_https: on`) for immediate HTTP -> HTTPS edge 301 redirection.
  - Configured Cloudflare Pages `_headers` with HSTS preload, X-Frame-Options SAMEORIGIN, nosniff, and granular caching rules.
  - Built and deployed branded `404.html` matching `DESIGN.md`, eliminating soft 404s and preventing bot probes from triggering the homepage SPA fallback.
- Paid acquisition & growth:
  - Formulated comprehensive B2B Paid Acquisition & Advertising Plan in `ADVERTISING_PLAN.md` with a $1,500 pilot sprint budget, brand-led LinkedIn sponsored content, Google high-intent keyword targeting, and automated UTM attribution tracking into Tally and Google Sheets.
- System design and operating documentation:
  - Codified the complete system architecture, data flows, and technical decisions in `ARCHITECTURE.md`.
- LLM Agent & Answer Engine Authority Overhaul:
  - Created standardized `/llms.txt` and comprehensive `/llms-full.txt` per `llmstxt.org` specifications for token-dense ingestion by LLM agents (ChatGPT Search, Claude, Perplexity, Gemini).
  - Configured `robots.txt` with explicit crawl rules for AI search crawlers (`OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`).
  - Added Cloudflare Pages edge headers in `_headers` serving `/llms.txt` and `/llms-full.txt` as `text/plain; charset=utf-8` with 1-hour revalidation caching.
  - Upgraded Schema.org JSON-LD graph across `index.html` and service pages with canonical Wikidata URIs, `@type: FAQPage` structured Q&A, and explicit $2,500 diagnostic pricing.
  - Codified founder's 21-year technical heuristics into new flagship article `blog-bitemporal-healthcare-data-ai.html`: batch claims latency vs. naive LLM real-time assumptions, SCD Type 2 bitemporal modeling, operational timestamp semantics, non-negotiable dbt tests (NPI, ICD/CPT, midnight default audits, referential integrity), and Schmitt-Thompson clinical triage boundaries.
  - Upgraded $2,500 diagnostic deliverables in `ai-readiness-assessment.html` to include ready-to-run execution scripts and dbt tests that engineering teams can merge immediately.
  - Published companion open-source dbt package `apratsunrthd/refhealth-dbt-healthcare-checks` v1.0.0 on GitHub with 7 generic test macros for healthcare claims, enrollment, and clinical data.
  - Expanded Answer Engine Optimization (AEO) directory in `/llms.txt` and `/llms-full.txt` targeting high-intent queries across ChatGPT Search, Perplexity, Claude, and Gemini.
- The intake asks one optional outcome question and clarifies the best-fit
  engagement signal: a specific decision, owner, and near-term date.
- The flagship AI offer now carries the owner-approved anonymized outcome
  evidence: reduced tedious work, more capacity for human judgment and
  creativity, and support for workforce and capacity planning.
- The homepage now makes the measurement standard explicit: search visibility
  is an early signal; qualified diagnostic conversations tied to a decision and
  operating outcome are the commercial measure.
- Every public HTML page now points social previews to the brand-safe `og.png`
  card. `og-card.svg` is the editable `1200x630` source asset.
- Tally is the live hosted-form provider after reviewing its current free plan,
  embed, self-notification, and privacy documentation. The published form is
  `https://tally.so/r/5BJOVN`; self notifications are configured for the
  consulting inbox, and a synthetic QA submission reached the custom
  confirmation page.
- Search Console was checked on 2026-09-14. The site has only an early web
  visibility signal, with no qualified query/page evidence yet. The
  generative-AI report has limited homepage-only visibility. No performance
  claim is published from this data.
- Every public HTML page has a canonical URL, unique description, social
  metadata, and valid JSON-LD appropriate to the page type. The homepage
  defines the ref(health) Organization and WebSite entities.
- `robots.txt` explicitly allows `OAI-SearchBot` for ChatGPT search, and the
  sitemap lists every public URL.
- The sitemap workflow now notifies IndexNow after main-branch updates. The
  root key file verifies ownership for the public host without storing an
  account credential.
- The Google Search Console and Bing Webmaster verification tags are present on
  the homepage and live in production.
- PRs #16, #17, #18, #19, and #20 are merged. Google Search Console ownership is
  verified and its sitemap submission succeeded. Bing Webmaster Tools ownership
  is verified and its sitemap is submitted for processing.
- GitHub Pages is live from `main`; the sitemap workflow completed and accepted
  the latest IndexNow submission.
- Impeccable detector run after the screenshot-driven correction. Remaining
  findings are section-level padding warnings and type-ramp advisories; rendered
  screenshots show the corrected layout has adequate spacing and no overlap.
- Browser smoke checks passed for the homepage, blog listing, and article pages,
  including the new model-strategy article.

## Key Content Decisions

- Primary conversion goal is revenue, expressed as a paid engagement
  conversation.
- Primary target is health-tech startups; provider teams are a secondary
  audience.
- The public diagnostic starting price is $2,500. Do not infer or publish other
  prices until they are validated.
- Contact method remains `refhealth.consulting@gmail.com`.
- Public copy must not mention the founder's personal name or add affiliation
  disclaimer language.
- Recent AI work is described only as anonymized capability language.
- Owner-provided live-use outcome language may describe reduced tedious work,
  increased bandwidth for human judgment and creativity, and workforce/capacity
  planning, but must not identify an employer or disclose a workforce reduction.
- Public code links are not primary conversion proof and have been removed from
  the sales path.
- Private project evidence may inform capability claims but is not named.
- No customers, revenue impact, testimonials, certifications, or metrics were
  invented. The $2,500 starting price is owner-provided.

## Research Used

Market scan supported the selected offer lanes: AI-ready data foundations, data
governance, payer modernization, provider data, workflow automation, prior
authorization/interoperability pressure, and responsible AI.

Sources reached during implementation included CMS-0057-F, NIST AI RMF
material, Gartner B2B buying journey material, Edelman/LinkedIn thought
leadership research, and TrustRadius B2B buying research. HHS and LinkedIn
blocked the headless browser.

The search pass used current Google Search Central guidance for AI features,
people-first content, organization structured data, and sitemaps, plus official
OpenAI crawler, Anthropic web-search, Microsoft Bing/Copilot, xAI web-search,
and IndexNow guidance. The key conclusion is that AI search uses the same
technical eligibility and helpful-content foundation as regular search; there
is no magic AI-only markup. Explicit `OAI-SearchBot` access is useful for
ChatGPT search visibility. IndexNow is useful for notifying participating
search engines when the site's URLs change, but it does not guarantee ranking
or inclusion.

## What Works

- Entire site is hosted natively on Cloudflare Pages with apex and `www` custom domains.
- Automated deployments run cleanly on push to `main` via GitHub Actions and Wrangler.
- Cloudflare Bot Fight Mode and Always Use HTTPS are active at the edge.
- Cloudflare Pages `_headers` serves HSTS Preload, X-Frame-Options SAMEORIGIN, nosniff, and granular caching.
- Branded `404.html` returns true `HTTP/2 404` for invalid or scanned paths.
- Google Analytics snippet and `analytics.js` attribution script track diagnostic CTAs across both `/intake` and `/intake.html`.
- Tally intake form forwards hidden campaign and landing parameters to the connected Google Sheet.
- The Looker Studio dashboard combines GA4 active users, Search Console queries, and Tally submissions.
- Domain registrar, Anycast DNS, edge proxy, and catch-all email routing are centrally managed in Cloudflare.
- Paid acquisition roadmap and launch checklist are codified in `ADVERTISING_PLAN.md`.
- System architecture is fully documented in `ARCHITECTURE.md`.

## Next

See `TODO.md`. The technical infrastructure, edge hardening, measurement engine, and advertising plan are complete. Next commercial steps:
Review and merge the workflow evaluator PR, then verify the production page and ZIP download.
1. Initiate the $1,500 pilot sprint in LinkedIn Campaign Manager (under the ref(health) brand page) and Google Ads.
2. Monitor inbound inquiries in the consulting inbox and `refhealth lead attribution` sheet.
3. Review weekly Looker Studio metrics as campaign impressions and search queries accumulate.
