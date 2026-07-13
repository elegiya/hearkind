# HearKind GDPR landing setup

This package adds the minimum frontend and policy structure for the current HearKind landing page with a Supabase waitlist and optional PostHog analytics.

## Included

- `/privacy`, `/cookies`, and `/legal` pages.
- Privacy notice below the waitlist form.
- Analytics consent banner with equally visible Accept and Reject actions.
- Persistent Manage cookies control in the footer.
- PostHog initialisation only after consent.
- PostHog autocapture and session recording disabled in code.
- Waitlist email, name, interest, and database ID excluded from analytics.
- The waitlist API no longer returns its database record ID.
- `support@hearkind.app` as the privacy contact fallback.

## Install

From the repository root, while on `compliance/gdpr-landing`:

```bash
unzip -o ~/Downloads/hearkind-gdpr-files.zip -d .
cd apps/web
npm run lint
npm run build
```

Adjust the Downloads path if the ZIP is stored elsewhere.

## Vercel variables

```env
NEXT_PUBLIC_LEGAL_CONTROLLER_NAME=Maryna Gaponova
NEXT_PUBLIC_LEGAL_CONTACT_EMAIL=support@hearkind.app
NEXT_PUBLIC_LEGAL_OPERATOR_COUNTRY=
NEXT_PUBLIC_LEGAL_ADDRESS=
NEXT_PUBLIC_LEGAL_TAX_ID=
NEXT_PUBLIC_LEGAL_REGISTRATION_DETAILS=
```

Do not invent the country, professional address, tax ID, or registration details. Complete them after confirming the legal operator and jurisdiction.

Until this consent version is deployed, keep:

```env
NEXT_PUBLIC_DISABLE_ANALYTICS=true
```

After deployment and verification, set it to `false` and redeploy. PostHog will then start only after the visitor accepts analytics.

## PostHog dashboard

- Confirm EU hosting.
- Disable IP capture.
- Disable session replay.
- Disable autocapture.
- Match actual retention to the Privacy Policy.

## Verify

In an incognito window:

1. No PostHog requests occur before a choice.
2. Reject keeps analytics disabled.
3. The waitlist works after Reject.
4. Accept starts PostHog.
5. Manage cookies allows changing the decision.
6. Privacy, Cookies, and Legal links work.
7. `support@hearkind.app` appears on the policy pages.
