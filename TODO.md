# TODO

## Recently completed

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

## For Codex or Claude

The site-side measurement system and live-form attribution configuration are
implemented.

- The live Tally form is embedded on `intake.html`; its public URL and setup
  record are in `FORM_SETUP.md`.
- Brand-safe social preview is live in the source and referenced by every page.
- The existing anonymized capability/outcome evidence is the safe proof format;
  no exact client case study or metric is available to publish.
- Search Console has been checked and documented. There is not yet enough
  qualified query/page signal to publish a performance claim.
- The dedicated GA4 stream and shared attribution script are wired into every
  public page.
- Tally is connected to a Google Sheet and its hidden fields are published, so
  new rows will carry the source context automatically.
- The dashboard is available at
  `https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F`.
- `MEASUREMENT.md` explains how to operate the system without manual tagging or
  spreadsheet maintenance.

## For the site owner

- Review the published $2,500 starting price after the first qualified inquiries.
- Confirm the first real notification arrives in the consulting inbox, then
  review the first qualified inquiries for fit and response time.
- Provide any measurable, client-safe proof points or anonymized case stories
  that can be used without customer or confidentiality risk.
- Provide a calendar URL if email should not be the primary conversion path.
- Review Bing Webmaster Tools after sitemap processing completes and inspect
  its AI Performance report once enough data accumulates.
- Review the new service-page wording for offer scope, timing, and claims before
  publishing it as the permanent commercial language.
- Recheck Search Console after qualified impressions or clicks accumulate, then
  update the measurement note with buyer-language and page-level evidence.
