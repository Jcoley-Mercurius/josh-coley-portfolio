# Contact integration
Resend is approved. Implement proposed `app/api/contact/route.ts` after inspecting current Next local docs. Variables, server only: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL. No NEXT_PUBLIC credential. Fixed server recipient and sender; validated visitor email as reply-to. Do not inherit Marketplace addresses or old 24-hour response promises.

Validate type, trimmed required fields, email, lengths, permitted service values and bounded request body on server. Reject unexpected fields. Honeypot is supplementary; select shared rate limiting or verified hosting controls before public enablement. No process-memory-only abuse control. Protect logs from full briefs, addresses and credentials. Restrict allowed origins appropriately; do not treat Origin alone as abuse prevention.

UI: idle → invalid or sending → accepted, rate-limited or unavailable. Accepted means provider accepted, never delivered. Preserve input on failure; retry identical request with same idempotency key; changing payload creates a new key. Resend retention window is 24 hours; confirm current provider behavior before implementation. Guard double-submit. No automatic reply, attachments, database or newsletter.

Official references: https://resend.com/docs/send-with-nextjs and https://resend.com/docs/dashboard/emails/idempotency-keys (checked during discovery; recheck in implementation).
