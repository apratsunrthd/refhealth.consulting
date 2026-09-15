# Hosted diagnostic form setup

The diagnostic intake is hosted by Tally and embedded on `intake.html`. The
plain-email link remains as a fallback if the hosted form does not load.

## Provider decision

Tally is the selected provider. Its current pricing page lists unlimited forms
and submissions, and its help center documents free self email notifications
and free standard embeds. Tally says form data is encrypted in transit and at
rest and stored in Europe. The free plan keeps Tally branding, which is an
acceptable tradeoff for this diagnostic; custom branding and domains are paid
features.

Reference documentation:

- [Tally pricing](https://tally.so/pricing)
- [Tally embeds](https://tally.so/help/embed-your-form)
- [Self email notifications](https://tally.so/help/self-email-notifications)
- [Tally and GDPR](https://tally.so/help/gdpr)

The form must remain a business-intake form, not a healthcare-data collection
form. Do not ask for PHI, patient/member records, credentials, or confidential
customer material.

## Form copy

- Title: `Start a Healthcare AI Diagnostic`
- Intro: `The focused healthcare AI readiness diagnostic starts at $2,500. It helps a health-tech team decide what to fund, what to fix first, and what should wait.`
- Privacy note: `Please keep your answers high level. Do not include PHI, customer records, credentials, or confidential material.`
- Confirmation: `Thanks. Your note is in. I’ll review the decision, context, and timing, then reply about fit and next steps.`

## Field map

Create these fields, in this order:

1. Work email — required, email validation
2. Company or product — required, short text
3. Your role — optional: Founder or CEO; COO or operations; CTO, engineering, or data; Product or clinical; Other
4. What decision or problem needs attention? — required, long text
5. What would a better outcome look like? — optional, long text
6. What data, analytics, or AI context is already in place? — optional, long text
7. When does the decision matter? — optional: Within 30 days; Within 60 days; Within 90 days; Exploring

Use the same privacy guidance shown on the page: do not request PHI, customer
records, credentials, or confidential material. Send notifications to
`refhealth.consulting@gmail.com`.

## Activation checklist

Completed on 2026-09-14:

- Created the Tally form in the consulting inbox workspace.
- Enabled self email notifications to `refhealth.consulting@gmail.com`.
- Published the form at `https://tally.so/r/5BJOVN`.
- Verified the published role and timing choices.
- Submitted a synthetic, non-sensitive QA inquiry and reached the custom
  confirmation page.
- Copied the standard embed from Tally’s Share tab into `intake.html`.
- Kept the plain-email fallback and the privacy guidance.
- Changed the local intake-start analytics method from `mailto` to `tally`.
- Connected Tally to the Google Sheet `refhealth lead attribution` so
  submissions are logged automatically:
  `https://docs.google.com/spreadsheets/d/1Bi3aH0ZCyLmLjpKWen-JzQw8q3f45uqDf9Mz1Xi81KQ`.
- Shared the response sheet as Viewer with the Data Studio account so the
  measurement dashboard can read new rows without editor access.
- Added the site-side attribution decorator so allow-listed UTM parameters,
  the first landing path, and the referring host can travel with a submission.
- Added and published the seven hidden attribution fields in the Tally editor.

## Attribution fields

These are Tally hidden fields. Their names match the site embed keys:

1. `utm_source`
2. `utm_medium`
3. `utm_campaign`
4. `utm_content`
5. `utm_term`
6. `landing_page`
7. `referrer_host`

The fields are intentionally limited to campaign labels, a URL path, and a
hostname. They must not be used for PHI, customer records, credentials, or
other confidential material.

The repository stores the public form URL and embed configuration, but no
provider credentials, tokens, or submission contents.
