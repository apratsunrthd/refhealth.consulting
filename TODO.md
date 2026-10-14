# TODO

## Recently completed

- Executed and Passed In-Depth Codex Architectural & Documentation Review (PR #64):
  - Addressed all automated Codex review items: restored truncated deploy verification URLs in `TODO.md`, scrubbed clinical triage / Schmitt-Thompson references across `hdaios.md`, `hdaios.html`, `ARCHITECTURE.md`, `llms.txt`, and blog posts in favor of explicit clinical safety boundaries and non-compete guardrails, and restored operational feedback loops in `ARCHITECTURE.md` (linking Layer 4 human-in-the-loop triage to Layer 5 drift monitoring).
  - Codex approved commit `89a8c06` with 0 findings ("Chef's kiss").
  - Squashed and merged PR #64 to `main`, verified clean edge deployment on Cloudflare Pages (`https://refhealth.consulting/`, `/intake.html`, and `/sitemap.xml` all returning `HTTP 200`).
- Strategically Repositioned ref(health) for Fractional Data Leadership & HDAIOS:
  - Shifted primary core offering from tactical dbt consulting to Executive Healthcare Data Leadership (Fractional VP of Data) and Company Data AI Operating Systems (HDAIOS).
  - Repositioned dbt analytics engineering and open-source packages as Layer 2 Governed Data Foundation proof-of-work rather than an hourly service.
  - Rewrote 3-part LinkedIn thought leadership campaign in `thought-leadership-linkedin-campaign.md` to address health-tech CEOs and CTOs on the healthcare AI data trap, when to hire a fractional VP of Data, and the 5-layer HDAIOS architecture.
  - Updated `index.html` hero signals, offer catalog, and schema with Fractional Data Leadership.
  - Added dedicated `#fractional-leadership` executive advisory section to `healthcare-data-strategy.html`.
  - Updated `llms.txt` and `llms-full.txt` discovery manifests with executive leadership and HDAIOS positioning.
- Hardened Deployment Workflow & Verified Live Production Calculator:
  - Verified live Cloudflare Pages deployment of Claims Lag & Working Capital Float Calculator on `https://refhealth.consulting/dbt-consulting#calculator`.
  - Added `workflow_dispatch` and rebase protection to `.github/workflows/sitemap.yml`.
- Built and deployed Interactive Claims Lag & Working Capital Float Calculator:
  - Deployed client-side, zero-PHI financial calculator at `dbt-consulting.html#calculator`.
  - Calculates unadjudicated capital float tied in clearinghouse transit, annual clerical rework drag, and monthly MLR volatility bands from monthly volume, lag days, and rejection rate.
  - Generates instant 1-click executive Markdown briefing memo and dynamically pre-fills scope parameters on `intake.html`.
- Published Flagship Technical Guide on EDI 837 vs 835 Claims Modeling in dbt:
  - Authored deep architectural guide `blog-edi-837-835-claims-modeling-dbt.html` ("EDI 837 vs 835 Claims Modeling in dbt: Reconciliation, Reversals, and Denial Rates Without Row Multiplication").
  - Dissected the 4 primary operational failure modes: claim frequency codes (1 vs 7 vs 8), Claim Adjustment Segment (CAS) normalization into a 2-table dimensional bridge to avoid 3x–5x row multiplication, overpayment takebacks/recoupments (PLB), and true net denial rates vs first-pass clerical rejections.
  - Cross-linked across `blog.html`, `sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
- Built and deployed Interactive Diagnostic Scope & Statement of Work (SOW) Generator:
  - Deployed client-side, zero-PHI SOW Generator at `ai-readiness-assessment.html#scope-generator`.
  - Dynamically synthesizes client warehouse (Snowflake, BigQuery, Databricks, PostgreSQL, DuckDB), ingestion feeds (claims, eligibility, clinical, provider), and priority pipeline friction points into an executive budget memo.
  - Implemented one-click Markdown clipboard copy, `.md` file download, and pre-filled handoff to `intake.html`.
  - Added custom scope parameter listener on `intake.html` rendering scope verification banner.
- Built and released Cloneable Healthcare dbt Starter Repository (`apratsunrthd/refhealth-starter-dbt-project` v1.0.0):
  - Created open-source reference implementation featuring DuckDB zero-setup local execution and cross-warehouse ANSI SQL compatibility.
  - Implemented 100% synthetic, zero-PHI seeds (`raw_members.csv`, `raw_providers.csv`, `raw_claims.csv`), staging views (`stg_members`, `stg_providers`, `stg_claims`), and marts tables (`dim_members`, `dim_providers`, `fct_claims`).
  - Pre-configured and verified 51/51 passing tests using `refhealth-dbt-healthcare-checks` v1.0.3 (surrogate grain, bitemporal dates, CMS NPI format, ICD-10/CPT validity, midnight timestamp audits, referential integrity).
  - Added GitHub Actions CI workflow, `README.md`, `ARCHITECTURE.md`, `BRIEF.md`, `HANDOFF.md`, and `TODO.md`.
  - Integrated across `dbt-consulting.html`, `blog-healthcare-dbt-audit-playbook.html`, `/llms.txt`, and `/llms-full.txt`.
- Published and indexed The 48-Hour Healthcare dbt Audit Playbook:
  - Authored flagship technical guide `blog-healthcare-dbt-audit-playbook.html` ("The 48-Hour Healthcare dbt Audit Playbook: Triage Claims Lag, Code Drift, and Timestamp Anomalies").
  - Detailed the four primary failure modes: surrogate key grain collapse, bitemporal member enrollment desynchronization, midnight (`00:00:00`) default timestamp precision drops, and code registry drift (CMS NPI, ICD-10, HCPCS/CPT).
  - Provided copy-paste dbt YAML and SQL tests from open-source `refhealth-dbt-healthcare-checks` package (`claim_member_referential_integrity`, `column_not_midnight_default`, `valid_npi_format`, `valid_icd10_format`).
  - Added article to `blog.html`, `sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
- Syndicated Healthcare Feed Triage across Open MCP Registries (Smithery, Cursor, Claude CLI):
  - Added `smithery.yaml` configuration to `apratsunrthd/refhealth-feed-triage` enabling one-click installation via `npx -y @smithery/cli install @apratsunrthd/refhealth-feed-triage`.
  - Added Node shebang to `mcp/server.mjs` for direct CLI process execution and rebuilt `refhealth-feed-triage.mcpb`.
  - Updated `feed-triage.html` with multi-client install options (Claude Desktop `.mcpb` and Smithery CLI for Cursor/Windsurf).
- Built and deployed Interactive HDAIOS Self-Assessment Tool:
  - Deployed client-side, zero-PHI 10-question evaluation widget on `hdaios.html` (`#assessment`) covering all 5 HDAIOS layers.
  - Implemented dynamic scoring (0–100%), architectural risk tiering (Production Ready, Emerging Foundation, High-Risk Pilot), and automated remediation gap analysis.
  - Added one-click Markdown clipboard copy and text download for engineering memos and tickets.
  - Cross-linked self-assessment on `ai-readiness-assessment.html` and indexed in `/llms.txt` and `/llms-full.txt`.
- Released Healthcare Data AI Operating System (HDAIOS) Specification v1.0:
  - Formulated and published canonical 5-layer architectural specification in `hdaios.md` and interactive reference page in `hdaios.html`.
  - Defined explicit interface contracts: Layer 1 Decision Interface (operational and administrative guardrails restricting uncertified LLMs from clinical diagnostic decision-making), Layer 2 Governed Data Foundation (SCD2 bitemporal claims modeling and `refhealth-dbt-healthcare-checks`), Layer 3 Enterprise BAA & Model Gateway (cloud commitment optimization and model parity), Layer 4 Agent & Workflow Orchestration (semantic layer RAG and HITL tripwires), and Layer 5 Continuous Operational Cadence (drift monitoring and 90-day review cadence).
  - Configured edge headers in `_headers` serving `/hdaios.md` as `text/plain; charset=utf-8` and indexed the specification in `/llms.txt` and `/llms-full.txt`.
- Published and integrated open-source dbt test package:
  - Released `refhealth-dbt-healthcare-checks` v1.0.0 on GitHub (`https://github.com/apratsunrthd/refhealth-dbt-healthcare-checks`) with 7 generic test macros (bitemporal enrollment consistency, surrogate key grain, CMS NPI formatting, ICD-10 validity, HCPCS/CPT validity, midnight timestamp audits, referential integrity).
  - Cross-linked package in `dbt-consulting.html`, `blog-bitemporal-healthcare-data-ai.html`, `/llms.txt`, and `/llms-full.txt`.
  - Expanded Answer Engine Optimization (AEO) directory in `/llms-full.txt` targeting high-intent queries across Perplexity, SearchGPT, Claude, and Gemini.
- Built and deployed Phase 2 Substantive Authority Moat:
  - Published flagship technical teardown `blog-bitemporal-healthcare-data-ai.html` ("Bitemporal Healthcare Data, dbt Testing Standards, and the LLM Trap"), addressing clearinghouse/payer batch cycles, SCD Type 2 bitemporality, timestamp semantics, and clinical triage boundaries.
  - Codified non-negotiable healthcare dbt testing standards in `dbt-consulting.html` and `FAQPage` schema: surrogate key uniqueness, CMS NPI registry checks, ICD-10 and HCPCS/CPT validity, midnight (`00:00:00`) default timestamp audits, bitemporal enrollment desync detection, and referential integrity.
  - Articulated the clinical safety boundary in `healthcare-ai-consulting.html`: uncertified LLMs must never attempt clinical diagnosis or triage, focusing autonomous agents on administrative toil, operational coordination, and structured data pipelines.
  - Expanded the $2,500 diagnostic deliverable in `ai-readiness-assessment.html`: added ready-to-run execution scripts and dbt tests that client engineers can merge immediately during the 2-week engagement.
  - Updated `/llms.txt` and `/llms-full.txt` with these domain heuristics for direct citation by AI answer engines.
- Built and deployed LLM Agent & Answer Engine Discovery Architecture:
  - Standardized `/llms.txt` and `/llms-full.txt` manifests per `llmstxt.org` specifications for token-dense ingestion by LLM agents, ChatGPT Search, Claude, and Perplexity.
  - Configured `robots.txt` with explicit crawl permissions for AI answer engines (`OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`).
  - Added edge headers in Cloudflare Pages `_headers` serving `/llms.txt` and `/llms-full.txt` as `text/plain; charset=utf-8`.
  - Upgraded Schema.org JSON-LD across `index.html` and all service pages (`ai-readiness-assessment.html`, `healthcare-ai-consulting.html`, `dbt-consulting.html`, `healthcare-data-strategy.html`): grounded `knowsAbout` with canonical Wikidata URIs, added `@type: FAQPage` question/answer entities for rich answer engine extraction, and declared `$2,500` diagnostic pricing in service offers.
- Corrected the visual overview's version stamp to match the live 0.1.2 extension download.
- Added a fixed investigation-guide link to version 0.1.2 MCP results with findings. The guide gives source-owner checks and sits on the product page; the tool makes no website request.
- Added a visual one-page Healthcare Feed Triage summary with a local-to-Claude
  flow diagram and charts derived from the bundled synthetic CSV and FHIR samples.
- Replaced the outreach demo with Healthcare Feed Triage, a local Claude Desktop
  extension that inspects CSV event feeds and FHIR Bundles. Added synthetic
  samples, an install page, and a downloadable `.mcpb` package.
- Retired the earlier outreach and dbt manifest prototypes before PR #42
  merged; neither was a strong Claude-native lead magnet.
- Added a three-step explanation to the diagnostic intake and privacy-safe GA4
  events for form starts and submitted inquiries. No form field values are sent
  to analytics.
- Added an optional desired-outcome question and best-fit guidance to improve
  diagnostic scoping without adding a required field.
- Added anonymized, owner-approved outcome evidence to the flagship AI offer
  without naming a client, employer, or metric.
- Added a brand-safe `og.png` social preview and applied Open Graph/Twitter
  image metadata to all public HTML pages.
- Added a neutral measurement note to the proof section and recorded the
  2026-09-14 Search Console baseline. The data is too early to support a
  qualified-intent performance claim.
- Created and published the Tally hosted diagnostic form, enabled self email
  notifications to the consulting inbox, verified the published choices, ran a
  synthetic non-sensitive test submission, and embedded the live form with a
  plain-email fallback.
- Persisted the GitHub Pages deployment configuration in `AGENTS.md`, including
  the production URL, squash merge method, and post-merge smoke checks.
- Corrected the hosted intake instructions and kept the plain-email fallback
  visible above the Tally embed; aligned the editable social-card source with
  the published `1200x630` asset.
- Fixed the intake process descriptions so they use the content column on mobile
  and desktop instead of collapsing into the step-number column.
- Created a dedicated GA4 web stream for `refhealth.consulting` and switched all
  public pages plus the sitemap workflow to measurement ID `G-05XLCL9N8S`.
- Added shared attribution tracking for UTM source, medium, campaign, content,
  term, landing path, and referring host. Diagnostic CTA clicks, form starts,
  and email fallback clicks are now recorded without sending form answers.
- Connected the Tally form to the `refhealth lead attribution` Google Sheet for
  automatic submission logging.
- Added `MEASUREMENT.md` with the system map, event dictionary, UTM convention,
  privacy boundary, and weekly operating cadence.
- Created the free Data Studio measurement dashboard and connected the
  dedicated GA4 property, Search Console domain property, and Tally response
  worksheet. The report includes search clicks/impressions, active users,
  response count, and a query table.
- Landed the measurement system in PR #29 and verified the GitHub Pages
  production canary on 2026-09-15.
- Migrated domain registration and authoritative DNS for `refhealth.consulting`
  from Namecheap to Cloudflare. Locked in wholesale at-cost renewal pricing,
  transferred the zone to Cloudflare Anycast DNS, and proxied edge traffic to
  GitHub Pages with strict SSL.
- Replaced Namecheap legacy email forwarding with Cloudflare Email Routing.
  Verified destination inbox `refhealth.consulting@gmail.com`, activated catch-all
  rule (`*@refhealth.consulting`), and published Cloudflare MX, SPF, and DKIM
  records via API.
- Elevated site presentation, performance, and branding across all 12 public pages:
  - Designed and deployed custom SVG brand favicon (`favicon.svg`) and webmanifest (`site.webmanifest`).
  - Upgraded Twitter/X cards from `summary` to `summary_large_image` across all pages for rich 1200x630 social cards.
  - Branded all public contact touchpoints and JSON-LD schemas to `contact@refhealth.consulting`.
  - Optimized critical rendering path by deferring `analytics.js`.
  - Added tactile button and navigation `:active` micro-interaction states in `styles.css`.
- Migrated web hosting from GitHub Pages to Cloudflare Pages (`refhealth-consulting` project).
  - Attached custom domains `refhealth.consulting` and `www.refhealth.consulting` with active SSL edge certificates.
  - Replaced legacy GitHub Pages A/AAAA records with Cloudflare Pages CNAMEs.
  - Configured repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub.
  - Updated automated deployment workflow in `.github/workflows/sitemap.yml` to deploy directly to Cloudflare Pages on push to `main`.
- Implemented branded `404.html` matching `DESIGN.md` for native Cloudflare Pages 404 handling, eliminating soft 404 errors and preventing automated scanners from triggering the homepage SPA fallback.
- Configured Cloudflare Pages `_headers` with edge security (HSTS preload, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy) and granular Cache-Control rules.
- Enabled Cloudflare Bot Fight Mode (`fight_mode: true, enable_js: true`) to actively challenge automated scraper fleets and cloud crawler sweeps at the edge.
- Enabled Cloudflare Always Use HTTPS (`always_use_https: on`) for immediate HTTP -> HTTPS edge redirects.
- Created comprehensive B2B Paid Acquisition & Advertising Plan in `ADVERTISING_PLAN.md`: $1,500 30-day pilot budget, brand-led LinkedIn sponsored content, Google search high-intent keyword targets, conversion economics, and automated UTM tracking through Tally and Google Sheets.

## For Codex or Claude

Version 0.1.1 was submitted to Anthropic's desktop extension directory on
2026-10-11. Version 0.1.2 now adds an optional guide link to the site download;
the directory submission still has 0.1.1. Monitor `contact@refhealth.consulting`
for Anthropic's decision and update the directory package if accepted. Track
the privacy-safe `feed_extension_download_click` event alongside qualified
intake submissions. Collect feedback on whether the CSV and FHIR findings
helped resolve a feed question before expanding scope.

The site infrastructure, measurement system, and branding are fully modernized:

- The site runs natively on Cloudflare Pages (`refhealth-consulting` project)
  with custom domains `refhealth.consulting` and `www.refhealth.consulting`.
- Automated deployments run on every push to `main` via `cloudflare/wrangler-action@v3`
  in `.github/workflows/sitemap.yml`.
- Authoritative DNS and Domain Registration are managed by Cloudflare Registrar at wholesale cost.
- Cloudflare Email Routing is active with catch-all forwarding (`*@refhealth.consulting` to
  `refhealth.consulting@gmail.com`), and all public contact paths use
  `contact@refhealth.consulting`.
- The live Tally form is embedded on `intake.html`; its public URL and setup
  record are in `FORM_SETUP.md`.
- Brand-safe SVG favicon (`favicon.svg`), PWA manifest (`site.webmanifest`), and
  `summary_large_image` social cards are live across all 12 pages.
- The existing anonymized capability/outcome evidence is the safe proof format;
  no exact client case study or metric is available to publish.
- Search Console and Bing Webmaster verification are live and documented.
- The dedicated GA4 stream (`G-05XLCL9N8S`) and shared attribution script are
  deferred and wired into every public page.
- Tally is connected to the Google Sheet `refhealth lead attribution` and its
  hidden fields are published.
- The dashboard is available at
  `https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F`.
- `MEASUREMENT.md` explains how to operate the system without manual tagging or
  spreadsheet maintenance.
- `ADVERTISING_PLAN.md` defines the paid acquisition roadmap, unit economics,
  target firmographics, creative hooks, and $1,500 pilot sprint.
- Cloudflare Edge Analytics tracks all raw network requests (including scrapers and bots),
  while GA4 tracks JavaScript-executed browser sessions. High-volume traffic spikes without
  referrers from cloud datacenter regions (e.g. Brazil/AWS) represent automated scanner sweeps.
- Deploy verification smoke checks: `https://refhealth.consulting/`, `https://refhealth.consulting/intake.html`, and `https://refhealth.consulting/sitemap.xml`.

## Next up (for Claude Code, Codex, and other models)

- [ ] Build dedicated `/fractional-vp-data` executive landing page (`fractional-vp-data.html`):
  - Articulate executive value proposition for health-tech founders, CEOs, and CTOs (Series Seed through Series B).
  - Detail 4 core executive pillars: Board & Metric Governance (MLR, CAC/LTV, net retention), Architecture & HDAIOS Roadmap, Data Team Hiring & Technical Diligence, and Vendor/Cloud Contract Negotiation.
  - Detail advisory tiers: Strategic Advisory Retainer (bi-weekly board cadence, architectural oversight) vs. Embedded Fractional Leadership (hands-on roadmap direction, team management, HDAIOS rollout).
  - Include zero-PHI clinical safety boundaries and non-compete guardrails.
- [ ] Build Interactive Executive ROI & Capacity Calculator:
  - Deploy zero-PHI, client-side calculator on `fractional-vp-data.html` (`#calculator`).
  - Model real executive economics: Full-Time VP of Data ($300k base + 25% bonus + $80k equity/benefits + $60k recruiter fee = ~$465k Year 1 cash/equity burn) vs. Fractional VP of Data ($6k–$12k/month retainer + targeted analytics engineering sprints).
  - Calculate annual burn reduction ($250k–$350k capital preserved), runway extension (months of additional cash runway), and time-to-first-board-metric (days vs 6-month executive search).
  - Implement 1-click Markdown scope memo generation and seamless query parameter pre-fill to `intake.html?scope=fractional-vp-data`.
- [ ] Integrate Fractional Advisory Across Discovery & Site Architecture:
  - Add `/fractional-vp-data` to site header navigation and footer across all public pages.
  - Add dedicated scope parameter listener on `intake.html` to render custom executive scope banner when receiving `?scope=fractional-vp-data`.
  - Update `sitemap.xml`, `/llms.txt`, and `/llms-full.txt` with structured executive offering definitions for AI answer engine citation.

## For the site owner (human)

### 1. Off-Site Citation Footprint & Entity Resolution (AI Answer Engine Authority)
- [ ] **Create LinkedIn Company Page (`ref(health) Consulting`)**:
  - Follow copy and profile metadata specified in [`thought-leadership-linkedin-campaign.md`](thought-leadership-linkedin-campaign.md).
  - Set Tagline: "Executive Healthcare Data Leadership & AI Operating Systems (HDAIOS)."
  - Set Industry: IT Services and IT Consulting / Hospitals and Healthcare.
  - Set Website: `https://refhealth.consulting`.
- [ ] **Link Founder Experience on Personal LinkedIn**:
  - Add role: "Founder & Fractional Principal" at `ref(health) Consulting`.
  - Describe scope: Fractional VP of Data advisory, Healthcare Data AI Operating Systems (HDAIOS), and board-level data governance for health-tech startups.
- [ ] **Syndicate Post 1 from Executive Sequence**:
  - Publish Post 1 from [`thought-leadership-linkedin-campaign.md`](thought-leadership-linkedin-campaign.md) ("Why Healthcare AI Pilots Die in the Data Layer").
  - Post natively from personal profile; tag company page in comments.
- [ ] **Anchor Knowledge Graph Entity Profiles**:
  - Claim basic free company profile on **Crunchbase** for `ref(health) Consulting` (pointing to `https://refhealth.consulting`).
  - Claim basic free company profile on **Wellfound** (formerly AngelList) for `ref(health) Consulting`.
  - *Rationale*: Establishes authoritative, permanent entity resolution nodes that OpenAI (SearchGPT), Anthropic (Claude), Perplexity, and Google cross-reference when evaluating company legitimacy and author citations.

### 2. Paid Growth & Commercial Verification
- [ ] Review and launch the $1,500 pilot sprint detailed in `ADVERTISING_PLAN.md` via LinkedIn Campaign Manager and Google Search Ads.
- [ ] Monitor incoming leads in `refhealth.consulting@gmail.com` and the connected Google Sheet `refhealth lead attribution`.
- [ ] Monitor real browser engagement in Google Analytics 4 (`G-05XLCL9N8S`) and Looker Studio, filtering out raw Cloudflare edge crawler spikes.
- [ ] Review the published $2,500 starting price after initial qualified conversations.
