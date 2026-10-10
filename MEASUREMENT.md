# Measurement system

This site now has a low-maintenance measurement loop for the commercial path:

```text
Search and referrals -> site attribution -> GA4 -> diagnostic CTA/start
                                                   |
                                                   v
                                             Tally intake
                                                   |
                                                   v
                                      Google Sheets submission log
                                                   |
                                                   v
                                           Looker Studio dashboard
```

## What each system answers

- **Google Search Console**: Which Google searches and pages create impressions,
  clicks, click-through rate, and average position?
- **Bing Webmaster Tools**: Which search and Copilot experiences create
  impressions, clicks, and cited pages? Bing's AI Performance report is an
  exposure signal, not a substitute for a qualified inquiry.
- **GA4**: Which pages, sources, referrals, and CTAs create site engagement and
  diagnostic starts? The dedicated `refhealth.consulting` web stream uses
  measurement ID `G-05XLCL9N8S`.
- **Tally + Google Sheets**: Which diagnostic inquiries were actually submitted?
  Tally's connected sheet is the completion ledger; GA4 does not receive form
  answers.
- **Looker Studio**: The operating view that puts acquisition, search, and
  submitted inquiries together. The report uses the dedicated
  `refhealth.consulting` GA4 property, the verified Search Console domain
  property, and the Tally response worksheet.

## Dashboard

The working report is [ref(health) Measurement Dashboard](https://datastudio.google.com/u/0/reporting/5f7d5706-71b8-4121-ba2b-73b29a223af7/page/QHz8F).
It currently includes:

- Search Console clicks and impressions for the last 28 days.
- GA4 active users for the dedicated `refhealth.consulting` property.
- Tally response count from `refhealth lead attribution`.
- A Search Console query table with clicks and impressions.

The Tally worksheet includes one synthetic, non-sensitive QA submission from
form setup. Treat the current response count as a baseline until the first real
inquiry arrives; do not report it as a qualified lead.

## Events

The shared `analytics.js` file records these privacy-safe GA4 events:

| Event | Fires when | Useful question |
| --- | --- | --- |
| `diagnostic_cta_click` | A link to `intake.html` is clicked | Which page or navigation path creates demand? |
| `diagnostic_form_start` | A visitor interacts with the hosted Tally area | Are visitors who reach the form beginning it? |
| `contact_email_click` | A `mailto:` link is clicked | Is the email fallback being used? |
| `feed_extension_download_click` | The Claude Desktop extension link is clicked | Is there interest in trying the local feed inspector? No file path or feed contents are tracked. |

Events include page path, broad first/last source, medium, and campaign values.
They never include form answers, email addresses, query strings, or other free-
form personal data. The evaluator events do not include file contents, paths,
model names, or use-case text. Tally answers remain in Tally and its connected sheet.

## Attribution fields

The site allows only these URL parameters into the Tally embed and stored
attribution record:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `landing_page` (path only)
- `referrer_host` (host only)

First-touch context is retained in browser storage. When a visitor reaches the
intake later through an internal link, the last known campaign/referral context
is forwarded to Tally. No arbitrary URL parameters are forwarded.

Use consistent links when promoting the site. Examples:

```text
https://refhealth.consulting/ai-readiness-assessment.html?utm_source=linkedin&utm_medium=organic_social&utm_campaign=diagnostic_launch
https://refhealth.consulting/intake.html?utm_source=partner&utm_medium=referral&utm_campaign=diagnostic_launch
https://refhealth.consulting/blog-data-ai-operating-system.html?utm_source=email&utm_medium=owned&utm_campaign=diagnostic_launch
```

Do not add UTM parameters to internal site links. Organic search should remain
unmodified so Search Console and GA4 can report it as organic traffic.

## Operating cadence

The dashboard is intended to be checked once per week, using a rolling 28-day
window and the previous 28 days for comparison:

1. Check Search Console clicks and impressions by query and page.
2. Check GA4 sessions and diagnostic CTA clicks by source/medium and landing
   page.
3. Check Tally submissions and the attribution fields in the connected sheet.
4. Compare submitted inquiries with the commercial outcome: a qualified
   conversation tied to a decision, owner, and near-term date.

Traffic is an early signal. A submitted diagnostic is stronger. Revenue is the
actual measure. Search or AI citations do not prove business impact on their
own.

## AI-search reality

There is no universal publisher-level analytics feed for every assistant. Bing
provides an AI Performance report for its own Copilot and partner experiences;
other assistant exposure is best measured through technical crawl/indexing
signals, referral hosts when available, tagged links, and the question “How did
you hear about us?” in a real sales conversation. The site therefore keeps its
technical eligibility broad and treats AI citations as an awareness signal.

## Cloudflare Edge Analytics vs. Google Analytics 4

Site traffic is observed at two distinct architectural layers:

1. **Cloudflare Edge Analytics (`dash.cloudflare.com/.../analytics/requests`)**:
   - **Scope**: Measures every raw HTTP/TCP network request arriving at Cloudflare's Anycast edge.
   - **Includes**: Automated scrapers, web spiders, vulnerability scanners probing non-existent paths (e.g., `wp-login.php`, `/.env`, 404 endpoints), asset requests (CSS, SVG, manifest), bot sweeps, and human visits.
   - **Referrer behavior**: Automated scrapers and bots request URLs directly without clicking external hyperlinks, sending an empty HTTP `Referer` header. Cloudflare reports these as **Direct / None**.
   - **Known patterns**: Large traffic volume spikes originating from cloud hosting hubs or proxy networks (e.g., São Paulo / Brazil datacenters like AWS `sa-east-1` or Oracle Vinhedo) accompanied by high 404 ratios indicate automated scanner sweeps, not qualified buyers.
   - **Edge defense**: Cloudflare Bot Fight Mode (`Security -> Bots -> Bot Fight Mode`) can be toggled on to issue lightweight JavaScript challenges to automated scrapers at the edge.

2. **Google Analytics 4 (`G-05XLCL9N8S`) & Looker Studio**:
   - **Scope**: Measures client-side sessions where a browser loads HTML and successfully executes `gtag.js` and `analytics.js`.
   - **Excludes**: Command-line scrapers, headless curl/python scripts, and vulnerability scanners that do not execute JavaScript.
   - **Dark social traffic**: In-app mobile browsers (e.g., WhatsApp, Telegram, Instagram) strip `Referer` headers when opening links, appearing in GA4 as `(direct) / (none)`.
   - **Distinguishing scrapers from dark-social visitors in GA4**:
     - *Engagement Time*: Automated bots report 0s engagement time and 0% engagement rate; real humans average 15s–90s+.
     - *Tech Profile*: Scrapers typically report Linux or generic desktop user agents with `(not set)` screen dimensions; real mobile messaging traffic reports Android/iOS with mobile viewport resolutions.
     - *Hostnames*: Hits with `Hostname: (not set)` indicate Measurement Protocol spam; verified traffic reports `refhealth.consulting`.

## Privacy boundary

Do not put PHI, patient/member records, customer data, credentials, or
confidential material into the diagnostic form. Do not add those values to GA4,
UTM parameters, or the Google Sheet.
