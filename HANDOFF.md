# HANDOFF - refhealth.consulting

## Fast Orientation

This is a static marketing site. There is no package manager, build command, or
framework. Open `index.html` directly to preview the homepage.

Important files:

- `index.html` - main marketing page and revenue CTA
- `healthcare-ai-consulting.html` - flagship Data AI Operating System offer
- `healthcare-data-strategy.html` - healthcare data landscape and strategy offer
- `dbt-consulting.html` - dbt and analytics engineering offer
- `ai-readiness-assessment.html` - paid AI-readiness diagnostic offer
- `intake.html` - paid diagnostic intake page with hosted Tally form and email fallback
- `analytics.js` - shared privacy-safe attribution and conversion events
- `MEASUREMENT.md` - measurement architecture, event dictionary, and operating cadence
- `og.png` - brand-safe 1200x630 social preview image
- `og-card.svg` - editable source for the social preview image
- `FORM_SETUP.md` - hosted-form field map and activation checklist
- `AGENTS.md` - persisted GitHub Pages deployment configuration
- `about.html` - experience, translation layer, and engagement model
- `styles.css` - shared CSS for all pages
- `blog.html` - article index
- `blog-data-ai-operating-system.html` - original AI operating-system explainer
- `blog-healthcare-ai-model-strategy.html` - single-provider versus multi-model
  healthcare AI strategy article
- `blog-100k-per-day-mistake.html` - domain knowledge article
- `blog-why-we-build-with-dbt.html` - dbt article
- `robots.txt` - public crawl policy, including explicit OAI-SearchBot access
- `sitemap.xml` - public URL inventory; the GitHub Action regenerates it on main
- `d774f0fd6934e4b0345056d9a28dbcf1.txt` - IndexNow ownership key file
- `index.html` - homepage with Google Search Console and Bing Webmaster
  verification tags
- `PRODUCT.md` - confirmed product facts and claim boundaries
- `DESIGN.md` - Impeccable visual direction and design rules

## Current Branch

The measurement system is merged to `main` and deployed. It points every
public page at the dedicated `refhealth.consulting` GA4 stream, adds shared
attribution/conversion tracking, and records the operating system in
`MEASUREMENT.md`. The free Data Studio report is available at
`https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F`.
The startup positioning, $2,500 diagnostic path, privacy-safe
intake measurement, best-fit guidance, and anonymized outcome proof are already
on `main`.

The diagnostic form is hosted by Tally at `https://tally.so/r/5BJOVN` and
embedded in `intake.html`. Self email notifications are configured for the
consulting inbox, and a synthetic non-sensitive test submission reached the
custom confirmation page. `FORM_SETUP.md` contains the field map and setup
record. Keep the plain-email fallback and no-sensitive-data guidance intact.
Tally is connected to the Google Sheet `refhealth lead attribution`. The site
passes only allow-listed UTM values, the first landing path, and the referring
host to the seven matching hidden Tally fields. Those fields are present and
published in the form editor; new submissions can now carry source context into
the sheet.
`AGENTS.md` contains the deployment settings for GitHub Pages, including the
production URL and post-merge smoke checks.
The email fallback appears before the hosted iframe so it remains reachable if
Tally fails to load. Keep the surrounding intake copy aligned with the hosted
submission flow.
The three-step process list explicitly places each description in its content
column; preserve that rule when changing the intake layout so mobile text stays
readable.

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

The repo has `CNAME` for `refhealth.consulting` and can be served by any static
host or GitHub Pages. The site is currently served by GitHub Pages from `main`.
The sitemap workflow updates the sitemap/GA injection and submits the current
URL set to IndexNow after main-branch changes.
The deployment configuration used by `/land-and-deploy` is recorded in
`AGENTS.md`; it uses a squash merge, the root URL as the primary health check,
and `/intake.html` plus `/sitemap.xml` as smoke checks.

The latest measurement deployment landed in PR #29 on 2026-09-15. GitHub Pages
and the sitemap workflow completed successfully, and the production canary
confirmed the homepage, intake page, analytics asset, and sitemap returned 200
with no browser console errors.

On 2026-09-20, domain registration and DNS for `refhealth.consulting` were
migrated from Namecheap to Cloudflare Registrar and Cloudflare Anycast DNS.
Namecheap legacy email forwarders were replaced with Cloudflare Email
Routing (`*@refhealth.consulting` forwarding to `refhealth.consulting@gmail.com`)
with active SPF, DKIM, and MX records managed via Cloudflare API.

On 2026-09-21, static web hosting was migrated to Cloudflare Pages (`refhealth-consulting` project)
with custom domains `refhealth.consulting` and `www.refhealth.consulting`.
The entire stack (registrar, anycast DNS, edge CDN, origin static hosting, and email routing)
is now natively hosted and managed on Cloudflare with automated deployments on push to `main`.


