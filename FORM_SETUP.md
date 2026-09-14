# Hosted diagnostic form setup

The site currently uses a review-before-send email intake. Keep that path live
until a hosted provider is configured and its public URL is available.

## Recommended setup

Use a free hosted form with a professional public URL and email notifications.
Tally is the preferred candidate for evaluation; confirm its current free-plan
limits and privacy settings during setup. Google Forms is a workable fallback
if a simpler, Google-hosted experience is preferred.

## Field map

Create these fields, in this order:

1. Work email — required, email validation
2. Company or product — required, short text
3. Your role — optional, with the choices already used on `intake.html`
4. What decision or problem needs attention? — required, long text
5. What would a better outcome look like? — optional, long text
6. What data, analytics, or AI context is already in place? — optional, long text
7. When does the decision matter? — optional, with the existing timeline choices

Use the same privacy guidance shown on the page: do not request PHI, customer
records, credentials, or confidential material. Send notifications to
`refhealth.consulting@gmail.com`.

## Activation checklist

Before changing `intake.html`:

- Confirm the provider account and notification destination.
- Copy the public form URL and test one non-sensitive submission.
- Confirm the submission appears in the destination inbox.
- Replace the `mailto:` action only after the endpoint is verified.
- Keep the plain-email fallback and the privacy guidance.
- Update the intake analytics `method` value from `mailto` to the provider name.

No provider account, public form URL, or test submission is stored in this
repository.
