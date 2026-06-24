# Assured Restoration CMS Production Setup

## Branch Policy

This project uses the `CMS` branch as the production branch.

- GitHub repo: `Digital-Age1/Assured-Restoration`
- Production/deployment branch: `CMS`
- Decap CMS target branch: `CMS`

Do not use `main` for production unless this decision changes later.

## Decap CMS Branch

The Decap CMS backend must commit edits to the `CMS` branch:

```yaml
backend:
  name: github
  repo: Digital-Age1/Assured-Restoration
  branch: CMS
```

The current admin config is located at:

```text
public/admin/config.yml
```

## Hosting Deployment

The hosting platform must deploy from the `CMS` branch.

When connecting or updating the site in the hosting provider, set the production branch to:

```text
CMS
```

Do not select `main` for production deploys unless the production branch decision changes later.

Note: GitHub may still show `main` as the repository default branch or remote `HEAD`. That does not change this project's deployment decision. The hosting platform branch setting should still be `CMS`.

## Local CMS Editing

Local CMS editing uses Decap's local backend:

```yaml
local_backend: true
```

Run the local CMS proxy before testing local saves:

```bash
npm run cms:proxy
```

Then open:

```text
http://localhost:5173/admin/
```

## Production GitHub OAuth Setup

Production Decap login requires a GitHub OAuth proxy or an equivalent Decap-compatible auth service.

Do not commit OAuth secrets to this repository. Do not hardcode `client_secret` in `public/admin/config.yml`, frontend code, or any public file.

This repository includes a Cloudflare Worker template in:

```text
oauth-proxy/
```

### A. Create GitHub OAuth App

1. Open GitHub **Settings**.
2. Open **Developer settings**.
3. Open **OAuth Apps**.
4. Select **New OAuth App**.
5. Set **Application name** to `Assured Restoration CMS`.
6. Set **Homepage URL** to `LIVE_SITE_URL`.
7. Set **Authorization callback URL** to:

```text
https://YOUR-WORKER-DOMAIN/callback
```

### B. Save Credentials Safely

- Store the Client ID in the Worker environment/secrets.
- Store the Client Secret only as a Worker secret.
- Never put the Client Secret in `public/admin/config.yml`.
- Never commit either credential in frontend files or a public environment file.

With Wrangler, set the credentials using:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

### C. Deploy OAuth Proxy

Follow `oauth-proxy/README.md` to deploy the Worker.

After deployment, confirm:

```text
https://YOUR-WORKER-DOMAIN/auth
https://YOUR-WORKER-DOMAIN/callback
```

`/auth` should redirect to GitHub after the secrets are configured. Opening `/callback` manually without an OAuth code should return an expected error.

### D. Update Decap Config

Only after the Worker is live, update `public/admin/config.yml` to use:

```yaml
backend:
  name: github
  repo: Digital-Age1/Assured-Restoration
  branch: CMS
  base_url: https://YOUR-WORKER-DOMAIN
  auth_endpoint: auth
```

Keep `local_backend: true`.

The placeholder `base_url` and `auth_endpoint` remain commented out until a real Worker domain is available.

## Media Paths

CMS media is configured to use the local uploads folder:

```yaml
media_folder: "public/uploads/assured-restoration"
public_folder: "/uploads/assured-restoration"
```

The admin logo is:

```yaml
logo_url: "/uploads/assured-restoration/assured-restoration-amp-remodeling-llc.jpg"
```
