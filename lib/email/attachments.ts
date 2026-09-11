/**
 * Loads PDF attachments for appointment emails from the public/ directory
 * and encodes them for Microsoft Graph.
 *
 * Files that are not yet available (e.g. documents the client still needs to
 * provide) are skipped with a warning rather than throwing, so the email still
 * sends. Missing required documents are surfaced in the logs for follow-up.
 */

import { readFile } from "fs/promises";
import path from "path";

import { GraphAttachment } from "./graph-client";

/** Identifiers for each document that can be attached to an appointment email. */
export type AttachmentId = "mcsa5875" | "noticeOfPrivacyPractices" | "dotDmvMecInfo" | "i693" | "pilotBillOfRights";

interface AttachmentConfig {
  /** Path relative to the project's public/ directory. */
  publicPath: string;
  /** File name the recipient sees on the attachment. */
  displayName: string;
}

/**
 * Source files live under public/forms. MCSA-5875 is already hosted for the DOT
 * page download; the email-only documents live under public/forms/email.
 *
 * The Notice of Privacy Practices and Pilot Bill of Rights already ship with the
 * site (they are linked from the footer) and are reused here.
 *
 * The I-693 already has ProMed's civil-surgeon info completed on page 4 and is the
 * same file linked from the immigration page.
 *
 * TODO: add the one PDF the client still owes, under public/forms/email/:
 *   - dot-dmv-mec-info.pdf  (what to do if the DMV cannot find your DOT MEC)
 */
const ATTACHMENT_CONFIGS: Record<AttachmentId, AttachmentConfig> = {
  mcsa5875: {
    publicPath: "forms/dot/MCSA-5875.pdf",
    displayName: "MCSA-5875.pdf",
  },
  noticeOfPrivacyPractices: {
    publicPath: "legal-documents/notice-of-privacy-policy-july-2025.pdf",
    displayName: "Notice of Privacy Practices.pdf",
  },
  dotDmvMecInfo: {
    publicPath: "forms/email/dot-dmv-mec-info.pdf",
    displayName: "If the DMV Cannot Find Your DOT MEC.pdf",
  },
  i693: {
    publicPath: "forms/immigration/I-693.pdf",
    displayName: "Form I-693.pdf",
  },
  pilotBillOfRights: {
    publicPath: "legal-documents/pilot-bill-of-rights-july-2025.pdf",
    displayName: "Pilot Bill of Rights.pdf",
  },
};

const loadAttachment = async (id: AttachmentId): Promise<GraphAttachment | null> => {
  const config = ATTACHMENT_CONFIGS[id];
  const absolutePath = path.join(process.cwd(), "public", config.publicPath);

  try {
    const buffer = await readFile(absolutePath);
    return {
      name: config.displayName,
      contentType: "application/pdf",
      contentBytes: buffer.toString("base64"),
    };
  } catch {
    console.warn(
      `[appointment-email] Attachment "${id}" not found at public/${config.publicPath}; sending email without it.`
    );
    return null;
  }
};

/** Loads the given attachments, omitting any that are not yet available. */
export const loadAttachments = async (ids: AttachmentId[]): Promise<GraphAttachment[]> => {
  const loaded = await Promise.all(ids.map(loadAttachment));
  return loaded.filter((attachment): attachment is GraphAttachment => attachment !== null);
};
