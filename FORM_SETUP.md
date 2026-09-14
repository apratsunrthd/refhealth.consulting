# Hosted diagnostic form setup

The site currently uses a review-before-send email intake. Keep that path live
until a hosted provider is configured and its public URL is available.

## Provider decision

Tally is the selected provider. Its current pricing page lists unlimited forms
and submissions, and its help center documents free self email notifications
and free standard embeds. Tally says form data is encrypted in transit and at
rest and stored in Europe. The free plan keeps Tally branding, which is an
acceptable tradeoff for this diagnostic; custom branding and domains are paid
features.

Verify these claims again when the account is created:

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

Before changing `intake.html`:

- Create the Tally account using the consulting inbox, if that is the intended account owner.
- Enable self email notifications and confirm the notification destination.
- Copy the public form URL and test one non-sensitive submission.
- Confirm the submission appears in the destination inbox.
- Copy the standard embed code from Tally’s Share tab; replace the current email form only after the endpoint is verified.
- Keep the plain-email fallback and the privacy guidance.
- Update the intake analytics `method` value from `mailto` to `tally`.

No provider account, public form URL, or test submission is stored in this
repository.
