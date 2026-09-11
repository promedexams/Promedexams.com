/**
 * Minimal Microsoft Graph email client.
 *
 * Sends mail from the practice's Microsoft 365 mailbox using the OAuth2
 * client-credentials flow (app-only auth). Requires an Entra app registration
 * with the application permission `Mail.Send` (admin-consented).
 *
 * Required environment variables:
 *   MS_TENANT_ID      - Entra tenant (directory) ID
 *   MS_CLIENT_ID      - App registration (client) ID
 *   MS_CLIENT_SECRET  - App registration client secret
 *   MS_SENDER_EMAIL   - Mailbox to send from (e.g. office@promedexams.com)
 */

const GRAPH_SCOPE = "https://graph.microsoft.com/.default";

export interface GraphAttachment {
  /** Display name shown in the email, e.g. "Form I-693.pdf". */
  name: string;
  /** MIME type, e.g. "application/pdf". */
  contentType: string;
  /** Base64-encoded file contents. */
  contentBytes: string;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: GraphAttachment[];
}

/** Returns true only when every required Graph env var is present. */
export const isGraphConfigured = (): boolean =>
  Boolean(
    process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET && process.env.MS_SENDER_EMAIL
  );

// Simple in-memory token cache. Serverless instances are short-lived, but reusing
// a token across requests handled by the same warm instance avoids extra token calls.
let cachedToken: { value: string; expiresAt: number } | null = null;

const getAccessToken = async (): Promise<string> => {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const tenantId = process.env.MS_TENANT_ID!;
  const body = new URLSearchParams({
    client_id: process.env.MS_CLIENT_ID!,
    client_secret: process.env.MS_CLIENT_SECRET!,
    scope: GRAPH_SCOPE,
    grant_type: "client_credentials",
  });

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to obtain Graph access token (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
};

/**
 * Sends a single HTML email (optionally with attachments) via Microsoft Graph.
 * Throws on failure; callers are responsible for catching so that email
 * problems never block the booking flow.
 */
export const sendGraphMail = async ({ to, subject, html, attachments }: SendMailOptions): Promise<void> => {
  const token = await getAccessToken();
  const sender = process.env.MS_SENDER_EMAIL!;

  const message: Record<string, unknown> = {
    subject,
    body: { contentType: "HTML", content: html },
    toRecipients: [{ emailAddress: { address: to } }],
  };

  if (attachments && attachments.length > 0) {
    message.attachments = attachments.map((attachment) => ({
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: attachment.name,
      contentType: attachment.contentType,
      contentBytes: attachment.contentBytes,
    }));
  }

  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, saveToSentItems: true }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Graph sendMail failed (${response.status}): ${detail}`);
  }
};
