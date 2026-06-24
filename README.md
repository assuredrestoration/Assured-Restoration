# Assured Restoration

React/Vite website with Decap CMS and a Cloudflare Pages Function for contact email delivery through Resend.

## Local Frontend Development

```bash
npm install
npm run dev
```

## Local Contact Function Development

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Add a Resend API key to `.dev.vars`.
3. Build the frontend.
4. Run the Cloudflare Pages development server.

```bash
npm run build
npx wrangler pages dev dist
```

The Pages development server serves the Vite build and the `/api/contact` Function together. `.dev.vars` is ignored by Git.

## Cloudflare Pages Deployment

Connect the GitHub repository to Cloudflare Pages and deploy the `CMS` branch.

Use these Cloudflare Pages build settings:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Production branch: CMS
```

Add these variables in **Cloudflare Pages > Settings > Variables and Secrets** for the production environment:

```env
RESEND_API_KEY
CONTACT_TO_EMAIL
FROM_EMAIL
ALLOWED_ORIGIN
```

Recommended values, with the API key stored as a secret:

```env
CONTACT_TO_EMAIL=caryg@assuredrestoration.com
FROM_EMAIL=Assured Restoration <noreply@assuredrestoration.com>
ALLOWED_ORIGIN=https://assuredrestoration.com
```

Never commit the real `RESEND_API_KEY`.

## Resend Setup

1. Add and verify `assuredrestoration.com` in Resend.
2. Configure the DNS records Resend provides in Cloudflare DNS.
3. Create a Resend API key.
4. Store it as the Cloudflare Pages secret `RESEND_API_KEY`.
5. Confirm `FROM_EMAIL` uses an address on the verified domain.

The contact forms submit JSON to:

```text
/api/contact
```

The implementation is at `functions/api/contact.ts`. It validates required fields, rejects invalid email and oversized messages, checks a honeypot field, applies exact-origin CORS, and calls the Resend HTTP API.

## Domain And Hosting Responsibilities

- **GoDaddy** keeps domain ownership and registration.
- **Cloudflare** manages DNS for the domain.
- **Cloudflare Pages** hosts the React/Vite website.
- **Cloudflare Pages Functions** handles `/api/contact`.
- **Resend** sends the actual contact email.

Point the GoDaddy domain nameservers to the nameservers assigned by Cloudflare. Manage website, Resend verification, and Pages DNS records in Cloudflare after that change.

## React Route Fallback

`public/_redirects` contains:

```text
/* /index.html 200
```

This allows direct requests to React routes such as `/our-services` and `/about-us` to load through `index.html`.

## Legacy Backend

`backend/contact-email/` contains the previous PHP/SMTP implementation for reference only. It is not copied by the build and is not used in Cloudflare production.
