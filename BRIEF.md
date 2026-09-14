# BRIEF - refhealth.consulting

## What This Project Is

Static marketing site for ref(health) Consulting, a healthcare data, analytics,
and practical AI consulting firm.

The site sells senior consulting around healthcare data strategy, dbt-centered
analytics engineering, AI-readiness, agentic workflow prototypes, payer/provider
modernization, fractional data leadership, multi-model AI orchestration, and
company Data AI Operating System buildouts.

## Current State

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
- The model-strategy article explains when to orchestrate multiple models across
  labs/providers and when to go deep with one provider based on policy,
  integration, commitment, or delivery speed. It is listed in Insights and
  linked from the healthcare AI offer page.
- The current commercial wedge is health-tech startups. The site now leads with
  a focused AI-readiness diagnostic starting at $2,500, with larger operating
  system builds and other work positioned as follow-on engagements.
- A free, email-based intake page now asks for only the information needed to
  scope the diagnostic. It is intentionally easy to replace with a hosted form
  after a provider account is available.
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

- Homepage opens directly from `index.html`.
- `blog.html` and article pages open directly.
- Google Analytics snippet remains present.
- Navigation anchors resolve to `#offers`, `#ai`, `#proof`, `blog.html`, and
  `#contact`.
- Service pages are linked from the homepage and each has a direct paid CTA and
  FAQ-style answer blocks written for human readers and answer engines.
- Live canary previously passed for all 10 public HTML pages, `robots.txt`,
  `sitemap.xml`, and the IndexNow key. The model-strategy article now also
  returns 200 with the expected copy, metadata, and no console errors.
- Desktop and mobile screenshots were captured locally under
  `.impeccable/review/` and are ignored by git.

## Next

See `TODO.md`. The current branch adds startup positioning, the paid diagnostic
price, and the diagnostic intake page; it still needs owner review before the
new commercial language is treated as final.
