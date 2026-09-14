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

The baseline SEO and AI-search work is merged to `main` and deployed. This
content branch adds the healthcare AI model-strategy article and its internal
links. Google Search Console and Bing Webmaster Tools both show the site as
verified. Google shows
the sitemap submission as successful; Bing shows the sitemap as submitted and
processing.

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
- Do not invent clients, logos, case-study metrics, pricing, certifications, or
  guarantees.

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

## Required AI Positioning

- Mention multi-model orchestration across labs/providers.
- Mention the ability to go deep with a single provider when policy,
  integration, commitment, or delivery speed makes that the right path.
- Keep the company Data AI Operating System as the flagship mechanism.

## Verification

Manual browser checks used gstack browse against local files:

- `file://./index.html` at 1440x900 and 390x844
- `file://./blog.html`
- `file://./blog-why-we-build-with-dbt.html`

All checked pages loaded with no console errors.

Post-deploy canary: all 10 public HTML pages returned 200 with expected titles,
canonical URLs, and H1s. The homepage loaded in 48 ms in the browser check with
no console errors. `robots.txt`, the sitemap, and the IndexNow key returned 200.

Production also exposes both ownership tags. Google Search Console confirmed
ownership through the HTML tag and reported the sitemap as successful with 100
discovered pages. Bing Webmaster Tools confirmed ownership through its HTML
meta tag and accepted the sitemap for processing.

Static checks for this SEO pass validate that every HTML page has a title,
description, canonical URL, and parseable JSON-LD; all local links and fragments
resolve; and `sitemap.xml` is valid XML. New pages still need a live browser
check after deployment.

## Deployment

The repo has `CNAME` for `refhealth.consulting` and can be served by any static
host or GitHub Pages. The site is currently served by GitHub Pages from `main`.
The sitemap workflow updates the sitemap/GA injection and submits the current
URL set to IndexNow after main-branch changes.
