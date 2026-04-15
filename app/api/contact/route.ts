import { Resend } from "resend";
import { NextResponse } from "next/server";

// Initialise Resend with the API key from environment variables (fallback for build env)
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

/* ─── Types ──────────────────────────────────────────────────── */
interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface ApiError {
  error: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(body.email)) return "Please provide a valid email address.";
  if (!body.message?.trim()) return "Message is required.";
  if (body.message.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}

function buildHtml(name: string, email: string, message: string): string {
  // Escape user input to prevent XSS in email clients
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const safeName = escape(name.trim());
  const safeEmail = escape(email.trim());
  const safeMessage = escape(message.trim()).replace(/\n/g, "<br/>");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background:#111111;border-radius:16px;
                      border:1px solid #1f1f1f;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #1f1f1f;">
              <p style="margin:0;font-size:22px;font-weight:900;
                        background:linear-gradient(90deg,#00FFD1,#00b4ff);
                        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                        background-clip:text;">
                Chalchitra
              </p>
              <p style="margin:6px 0 0;font-size:13px;color:#666666;">
                New contact form submission
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">

              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin-bottom:20px;">
                <tr>
                  <td style="background:#0D0D0D;border:1px solid #1f1f1f;
                              border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;
                               letter-spacing:1px;color:#00FFD1;font-weight:600;">
                      Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#F2F2F2;font-weight:500;">
                      ${safeName}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin-bottom:20px;">
                <tr>
                  <td style="background:#0D0D0D;border:1px solid #1f1f1f;
                              border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;
                               letter-spacing:1px;color:#00FFD1;font-weight:600;">
                      Email
                    </p>
                    <p style="margin:0;font-size:16px;color:#F2F2F2;font-weight:500;">
                      <a href="mailto:${safeEmail}"
                         style="color:#00FFD1;text-decoration:none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#0D0D0D;border:1px solid #1f1f1f;
                              border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;
                               letter-spacing:1px;color:#00FFD1;font-weight:600;">
                      Message
                    </p>
                    <p style="margin:0;font-size:15px;color:#AAAAAA;line-height:1.7;">
                      ${safeMessage}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}"
                       style="display:inline-block;padding:12px 28px;background:#00FFD1;
                              color:#080808;font-weight:700;font-size:14px;
                              border-radius:100px;text-decoration:none;
                              letter-spacing:0.3px;">
                      Reply to ${safeName} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;font-size:11px;color:#444444;text-align:center;">
                Sent from the Chalchitra website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/* ─── POST handler ───────────────────────────────────────────── */
export async function POST(
  req: Request
): Promise<NextResponse<{ success: true } | ApiError>> {
  try {
    // Parse JSON body
    let body: Partial<ContactPayload>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Validate fields
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { name, email, message } = body as ContactPayload;

    // Guard: ensure env vars are set
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }
    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL is not configured.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "Chalchitra <onboarding@resend.dev>";
    const toAddress = process.env.CONTACT_EMAIL;

    console.log(`[contact] Sending via Resend — from: ${fromAddress}  to: ${toAddress}`);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: "New Contact Form Submission — Chalchitra",
      html: buildHtml(name, email, message),
    });

    // Log the full Resend response so you can debug in the terminal
    console.log("[contact] Resend response →", JSON.stringify({ data, error }, null, 2));

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    console.log(`[contact] Email accepted by Resend. ID: ${data?.id}`);
    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in /api/contact:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
