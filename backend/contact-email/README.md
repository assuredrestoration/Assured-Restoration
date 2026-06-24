# Legacy SMTP Contact Backend

This PHP/PHPMailer backend is retained only as historical reference.

It is **not used by the Cloudflare Pages production deployment** and must not be copied into `dist/` or configured on Cloudflare.

Production contact submissions use:

```text
functions/api/contact.ts
```

The React forms submit to `/api/contact`, and the Cloudflare Pages Function sends email through the Resend HTTP API.

Do not add SMTP passwords or production credentials to this directory.
