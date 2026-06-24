# Assured Restoration Decap OAuth Proxy

This Cloudflare Worker provides the GitHub OAuth endpoints required by Decap CMS:

- `GET /auth`
- `GET /callback`

The Worker keeps the GitHub OAuth client secret server-side. No real credentials belong in this repository or in `public/admin/config.yml`.

## Prerequisites

- A live Assured Restoration website URL
- A Cloudflare account
- Node.js and npm
- Wrangler, invoked with `npx wrangler`
- Permission to create a GitHub OAuth App

## 1. Create The Worker

From the repository root:

```bash
cd oauth-proxy
Copy-Item wrangler.toml.example wrangler.toml
npx wrangler login
```

The example config deploys `src/index.js`. Change only the Worker name or optional custom route as needed.

## 2. Deploy Once To Get A Worker Domain

```bash
npx wrangler deploy
```

Cloudflare will provide a domain similar to:

```text
https://assured-restoration-cms-oauth.YOUR-SUBDOMAIN.workers.dev
```

Use that value as `YOUR-WORKER-DOMAIN` below.

## 3. Create A GitHub OAuth App

In GitHub:

1. Open **Settings**.
2. Open **Developer settings**.
3. Open **OAuth Apps**.
4. Select **New OAuth App**.
5. Use `Assured Restoration CMS` as the application name.
6. Set **Homepage URL** to the live Assured Restoration website URL.
7. Set **Authorization callback URL** to:

```text
https://YOUR-WORKER-DOMAIN/callback
```

Create the app, then generate a client secret.

## 4. Store Credentials Safely

Set both values as encrypted Worker secrets:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Paste each value only when Wrangler prompts for it.

Never add `GITHUB_CLIENT_SECRET` to:

- `wrangler.toml`
- `public/admin/config.yml`
- frontend JavaScript
- committed `.env` files

## 5. Deploy The Configured Worker

```bash
npx wrangler deploy
```

Verify:

```text
https://YOUR-WORKER-DOMAIN/
https://YOUR-WORKER-DOMAIN/auth
https://YOUR-WORKER-DOMAIN/callback
```

Expected behavior:

- `/` returns a short health message.
- `/auth` redirects to GitHub after secrets are configured.
- `/callback` is the GitHub callback endpoint. Opening it manually without an OAuth code should show an error; that is expected.

## 6. Enable Production Login In Decap

Only after the Worker is deployed and tested, update `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: Digital-Age1/Assured-Restoration
  branch: CMS
  base_url: https://YOUR-WORKER-DOMAIN
  auth_endpoint: auth
```

Keep:

```yaml
local_backend: true
```

Do not enable a placeholder or fake `base_url`.

## 7. Test Production Login

1. Confirm the hosting platform deploys the `CMS` branch.
2. Deploy the updated Decap config.
3. Open `https://YOUR-LIVE-SITE/admin/`.
4. Select **Login with GitHub**.
5. Authorize the GitHub OAuth App.
6. Confirm Decap loads the repository content and can save a reversible test edit to the `CMS` branch.

The GitHub user must have suitable access to `Digital-Age1/Assured-Restoration`.
