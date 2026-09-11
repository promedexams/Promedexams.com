# Appointment Emails

Automated emails sent after a successful booking, delivered through the practice's
Microsoft 365 mailbox via the Microsoft Graph API (no third-party email service).

## Flow

`app/api/appointments/create-booking/route.ts` calls `sendAppointmentEmails()` after
the Square booking succeeds. The send is wrapped in `try/catch` so an email failure
never affects the booking. Exam type is derived from the human-readable service name
via `lib/utils/appointment-type.ts`.

| Module                       | Responsibility                                                        |
| ---------------------------- | --------------------------------------------------------------------- |
| `graph-client.ts`            | OAuth2 client-credentials auth + `sendMail`                           |
| `attachments.ts`             | Load PDF attachments from `public/`, skip missing ones with a warning |
| `templates.ts`               | English HTML for each email (transcribed from the client's drafts)    |
| `send-appointment-emails.ts` | Chooses which emails + attachments to send                            |

## Currently wired

- **DOT** — welcome (new vs. returning) + `[Secure]` encrypted email
- **Immigration (IME)** — welcome + `[Secure]` encrypted email
- **FAA** — welcome (new vs. returning). No encrypted email: the client requested
  that only for DOT and IME.

School/Sports/Camp and Consultation bookings intentionally send nothing.
IME sends the same welcome to new and returning clients (only one draft exists).

## Required environment variables

Set these from the Entra app registration (application permission `Mail.Send`,
admin-consented). While any are unset, emails are skipped and bookings are unaffected.

```
MS_TENANT_ID
MS_CLIENT_ID
MS_CLIENT_SECRET
MS_SENDER_EMAIL   # e.g. office@promedexams.com
```

## Attachment files

| File                                                                | Used on            | Status  |
| ------------------------------------------------------------------- | ------------------ | ------- |
| `forms/dot/MCSA-5875.pdf`                                           | DOT welcome        | present |
| `legal-documents/notice-of-privacy-policy-july-2025.pdf`            | all welcome emails | present |
| `legal-documents/pilot-bill-of-rights-july-2025.pdf`                | FAA welcome (new)  | present |
| `forms/dot/dot-dmv-mec-info.pdf` (DMV can't find your DOT MEC)      | DOT welcome        | present |
| `forms/immigration/I-693.pdf` (page 4 civil-surgeon info completed) | IME welcome        | present |

Missing files are skipped with a console warning; the email still sends without them.
`next.config.ts` traces `public/**/*.pdf` into the booking route so these are readable
from the Vercel serverless function (`public/` is otherwise CDN-only, not bundled).

## Other open items

- `I693_INSTRUCTIONS_URL` in `lib/links.ts` is a `#` placeholder — needs the client's
  real "Instructions to Download and Edit Form I-693" document URL.
- **Encryption:** the `[Secure]` subject prefix is the marker for a Microsoft 365
  mail-flow rule to apply Office Message Encryption. That rule is configured in the
  Exchange admin center, not in code, and depends on the M365 license tier.
- Translations (Spanish) are handled by the client on their end for now.
