const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "decap_oauth_state";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET" },
      });
    }

    if (url.pathname === "/auth") {
      return startAuthorization(request, env);
    }

    if (url.pathname === "/callback") {
      return finishAuthorization(request, env);
    }

    if (url.pathname === "/") {
      return new Response("Assured Restoration CMS OAuth proxy is running.", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function startAuthorization(request, env) {
  assertEnvironment(env);

  const requestUrl = new URL(request.url);
  const state = crypto.randomUUID();
  const callbackUrl = `${requestUrl.origin}/callback`;
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);

  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", callbackUrl);
  authorizeUrl.searchParams.set("scope", "repo");
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      "Set-Cookie": serializeCookie(STATE_COOKIE, state, {
        maxAge: 600,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
      }),
      "Cache-Control": "no-store",
    },
  });
}

async function finishAuthorization(request, env) {
  try {
    assertEnvironment(env);

    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const returnedState = requestUrl.searchParams.get("state");
    const expectedState = readCookie(request.headers.get("Cookie"), STATE_COOKIE);
    const providerError = requestUrl.searchParams.get("error");

    if (providerError) {
      const description =
        requestUrl.searchParams.get("error_description") || providerError;
      return popupResponse("error", { message: description }, 400);
    }

    if (!code) {
      return popupResponse("error", { message: "Missing GitHub authorization code." }, 400);
    }

    if (!returnedState || !expectedState || returnedState !== expectedState) {
      return popupResponse("error", { message: "OAuth state validation failed." }, 400);
    }

    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "assured-restoration-decap-oauth-proxy",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenResult.access_token) {
      const message =
        tokenResult.error_description ||
        tokenResult.error ||
        "GitHub token exchange failed.";
      return popupResponse("error", { message }, 502);
    }

    return popupResponse(
      "success",
      {
        token: tokenResult.access_token,
        provider: "github",
      },
      200,
      serializeCookie(STATE_COOKIE, "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected OAuth proxy error.";
    return popupResponse("error", { message }, 500);
  }
}

function popupResponse(status, payload, httpStatus, cookie) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Security-Policy":
      "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'",
    "X-Content-Type-Options": "nosniff",
  });

  if (cookie) {
    headers.set("Set-Cookie", cookie);
  }

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Assured Restoration CMS Login</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; }
    </style>
  </head>
  <body>
    <p>Completing CMS login...</p>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        if (window.opener) {
          window.opener.postMessage(message, "*");
          window.close();
        } else {
          document.body.textContent = "Login window could not reach the CMS. Close this window and try again.";
        }
      })();
    </script>
  </body>
</html>`,
    { status: httpStatus, headers },
  );
}

function assertEnvironment(env) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    throw new Error("OAuth proxy environment is not configured.");
  }
}

function readCookie(header, name) {
  if (!header) {
    return null;
  }

  for (const item of header.split(";")) {
    const [key, ...valueParts] = item.trim().split("=");
    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

function serializeCookie(name, value, options) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

  return parts.join("; ");
}
