interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  FROM_EMAIL: string;
  ALLOWED_ORIGIN: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
}

interface ContactEmailFields {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: Date;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 16_000;
const MAX_MESSAGE_LENGTH = 2_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequest(context: PagesContext): Promise<Response> {
  const { request, env } = context;
  const origin = request.headers.get("Origin");
  const corsHeaders = createCorsHeaders(origin, env.ALLOWED_ORIGIN);

  if (!isAllowedOrigin(origin, env.ALLOWED_ORIGIN)) {
    return jsonResponse({ success: false, message: "Origin not allowed." }, 403, corsHeaders);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed." }, 405, {
      ...corsHeaders,
      Allow: "POST, OPTIONS",
    });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.FROM_EMAIL) {
    console.error("Contact email environment variables are not configured.");
    return jsonResponse(
      { success: false, message: "The message service is temporarily unavailable." },
      503,
      corsHeaders,
    );
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      { success: false, message: "Content-Type must be application/json." },
      415,
      corsHeaders,
    );
  }

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, message: "Request is too large." }, 413, corsHeaders);
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ success: false, message: "Request is too large." }, 413, corsHeaders);
    }
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return jsonResponse({ success: false, message: "Invalid request body." }, 400, corsHeaders);
  }

  const name = cleanString(payload.name, 120);
  const email = cleanString(payload.email, 254).toLowerCase();
  const phone = cleanString(payload.phone, 50);
  const service = cleanString(payload.service, 120);
  const message = cleanString(payload.message, MAX_MESSAGE_LENGTH + 1);
  const website = cleanString(payload.website, 200);

  // Return a normal success response for bots so the honeypot is not disclosed.
  if (website) {
    return jsonResponse({ success: true, message: "Your message has been sent." }, 200, corsHeaders);
  }

  if (!name || !email || !message) {
    return jsonResponse(
      { success: false, message: "Name, email, and message are required." },
      400,
      corsHeaders,
    );
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return jsonResponse(
      { success: false, message: "Please enter a valid email address." },
      400,
      corsHeaders,
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse(
      { success: false, message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      400,
      corsHeaders,
    );
  }

  const subject = service ? `New Website Inquiry - ${service}` : "New Website Inquiry";
  const emailFields = { name, email, phone, service, message, submittedAt: new Date() };
  const text = buildTextEmail(emailFields);
  const html = buildHtmlEmail(emailFields);

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend rejected contact email", resendResponse.status, await resendResponse.text());
      return jsonResponse(
        { success: false, message: "We could not send your message right now. Please try again." },
        502,
        corsHeaders,
      );
    }

    return jsonResponse(
      { success: true, message: "Your message has been sent." },
      200,
      corsHeaders,
    );
  } catch (error) {
    console.error("Contact email request failed", error);
    return jsonResponse(
      { success: false, message: "We could not send your message right now. Please try again." },
      502,
      corsHeaders,
    );
  }
}

function isAllowedOrigin(origin: string | null, allowedOrigin: string): boolean {
  return !origin || (!!allowedOrigin && origin === allowedOrigin.replace(/\/$/, ""));
}

function createCorsHeaders(origin: string | null, allowedOrigin: string): Record<string, string> {
  const normalizedAllowedOrigin = allowedOrigin?.replace(/\/$/, "");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };

  if (origin && origin === normalizedAllowedOrigin) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonResponse(
  body: { success: boolean; message: string },
  status: number,
  headers: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function buildTextEmail(fields: ContactEmailFields): string {
  const submittedTime = formatSubmittedTime(fields.submittedAt);

  return [
    "ASSURED RESTORATION",
    "New Website Inquiry",
    "",
    "New customer inquiry received from the website.",
    "",
    "INQUIRY SUMMARY",
    `Service requested: ${fields.service || "Not provided"}`,
    `Submitted: ${submittedTime}`,
    `Source: Website Contact Form`,
    "",
    "CUSTOMER DETAILS",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "Not provided"}`,
    "",
    "MESSAGE",
    fields.message,
    "",
    "This inquiry was sent from the Assured Restoration website contact form.",
  ].join("\n");
}

function buildHtmlEmail(fields: ContactEmailFields): string {
  const name = escapeHtml(fields.name);
  const email = escapeHtml(fields.email);
  const phone = escapeHtml(fields.phone || "Not provided");
  const service = escapeHtml(fields.service || "Not provided");
  const message = escapeHtml(fields.message).replace(/\n/g, "<br>");
  const submittedTime = escapeHtml(formatSubmittedTime(fields.submittedAt));
  const phoneHref = normalizePhoneHref(fields.phone);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Website Inquiry</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef2f5; color:#243442; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      New customer inquiry received from the Assured Restoration website.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; background-color:#eef2f5; border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border-collapse:separate; border-spacing:0; border:1px solid #d8e0e6; border-radius:8px; overflow:hidden;">
            <tr>
              <td style="padding:28px 32px; background-color:#334958; border-bottom:4px solid #8293a1;">
                <p style="margin:0 0 8px; color:#dce5eb; font-size:12px; font-weight:700; line-height:18px; letter-spacing:1.4px; text-transform:uppercase;">Assured Restoration</p>
                <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; line-height:34px;">New Website Inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:separate; border-spacing:0; background-color:#f2f6f8; border:1px solid #d8e0e6; border-left:4px solid #8293a1; border-radius:6px;">
                  <tr>
                    <td style="padding:14px 16px; color:#334958; font-size:14px; font-weight:700; line-height:21px;">
                      New customer inquiry received from the website.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <p style="margin:0 0 10px; color:#667985; font-size:11px; font-weight:700; line-height:16px; letter-spacing:1.2px; text-transform:uppercase;">Inquiry Summary</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:separate; border-spacing:0; border:1px solid #d8e0e6; border-radius:6px;">
                  <tr>
                    <td style="width:42%; padding:12px 14px; background-color:#f7f9fa; border-bottom:1px solid #e4eaee; color:#667985; font-size:13px; line-height:19px;">Service requested</td>
                    <td style="padding:12px 14px; border-bottom:1px solid #e4eaee; color:#243442; font-size:13px; font-weight:700; line-height:19px;">${service}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px; background-color:#f7f9fa; border-bottom:1px solid #e4eaee; color:#667985; font-size:13px; line-height:19px;">Submitted</td>
                    <td style="padding:12px 14px; border-bottom:1px solid #e4eaee; color:#243442; font-size:13px; line-height:19px;">${submittedTime}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px; background-color:#f7f9fa; color:#667985; font-size:13px; line-height:19px;">Source</td>
                    <td style="padding:12px 14px; color:#243442; font-size:13px; line-height:19px;">Website Contact Form</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <p style="margin:0 0 10px; color:#667985; font-size:11px; font-weight:700; line-height:16px; letter-spacing:1.2px; text-transform:uppercase;">Customer Details</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:separate; border-spacing:0; border:1px solid #d8e0e6; border-radius:6px;">
                  <tr>
                    <td style="width:28%; padding:12px 14px; background-color:#f7f9fa; border-bottom:1px solid #e4eaee; color:#667985; font-size:13px; line-height:19px;">Name</td>
                    <td style="padding:12px 14px; border-bottom:1px solid #e4eaee; color:#243442; font-size:13px; font-weight:700; line-height:19px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px; background-color:#f7f9fa; border-bottom:1px solid #e4eaee; color:#667985; font-size:13px; line-height:19px;">Email</td>
                    <td style="padding:12px 14px; border-bottom:1px solid #e4eaee; font-size:13px; line-height:19px;"><a href="mailto:${email}" style="color:#3e657b; font-weight:700; text-decoration:underline;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px; background-color:#f7f9fa; color:#667985; font-size:13px; line-height:19px;">Phone</td>
                    <td style="padding:12px 14px; color:#243442; font-size:13px; line-height:19px;">${phoneHref ? `<a href="tel:${escapeHtml(phoneHref)}" style="color:#3e657b; font-weight:700; text-decoration:underline;">${phone}</a>` : phone}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0 0 10px; color:#667985; font-size:11px; font-weight:700; line-height:16px; letter-spacing:1.2px; text-transform:uppercase;">Message</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:separate; border-spacing:0; background-color:#ffffff; border:1px solid #d8e0e6; border-radius:6px;">
                  <tr>
                    <td style="padding:18px; color:#344854; font-size:14px; line-height:23px; overflow-wrap:anywhere; word-break:break-word;">${message}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px; background-color:#f7f9fa; border-top:1px solid #d8e0e6;">
                <p style="margin:0; color:#71828d; font-size:12px; line-height:18px; text-align:center;">This inquiry was sent from the Assured Restoration website contact form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function formatSubmittedTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function normalizePhoneHref(phone: string): string {
  return phone ? phone.replace(/[^\d+]/g, "") : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
