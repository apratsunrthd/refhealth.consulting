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
- The measurement system landed in PR #29 on 2026-09-15. GitHub Pages and the
  sitemap workflow completed successfully, and the production canary passed.
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

- Homepage opens directly from `index.html`.
- `blog.html` and article pages open directly.
- Google Analytics snippet remains present.
- `analytics.js` is loaded on all public HTML pages and the GA4 measurement ID
  is `G-05XLCL9N8S`.
- The Data Studio dashboard is available at
  `https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F`.
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

See `TODO.md`. The site-side measurement wiring, Tally sheet connection, and
dashboard are complete. The remaining operating step is to use the combined
dashboard weekly and revisit Search Console after qualified traffic accumulates.
