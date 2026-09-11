/**
 * Orchestrates the appointment emails sent after a successful booking.
 *
 * Given the exam type and whether the client is new or returning, this decides
 * which emails to send (welcome + encrypted) and which documents to attach, then
 * dispatches them via Microsoft Graph. It never throws: email problems are logged
 * but must never break the booking flow, which has already succeeded by this point.
 *
 * Currently wired for DOT and Immigration (IME). FAA is intentionally parked until
 * the client provides the welcome copy and attachment documents.
 */

import { getAppointmentType } from "@/lib/utils/appointment-type";
import { AttachmentId, loadAttachments } from "./attachments";
import { isGraphConfigured, sendGraphMail } from "./graph-client";
import {
  AppointmentEmail,
  buildDotEncryptedEmail,
  buildDotWelcomeNewEmail,
  buildDotWelcomeReturningEmail,
  buildFaaWelcomeNewEmail,
  buildFaaWelcomeReturningEmail,
  buildImmigrationEncryptedEmail,
  buildImmigrationWelcomeEmail,
} from "./templates";

interface AppointmentEmailPlan {
  email: AppointmentEmail;
  attachments: AttachmentId[];
}

export interface SendAppointmentEmailsParams {
  to: string;
  /** Human-readable Square service name, e.g. "DOT Physical". */
  appointmentType: string;
  newOrReturningClient: "new" | "returning";
}

/** Builds the ordered list of emails to send for a given booking. */
const buildEmailPlan = (
  appointmentTypeName: string,
  newOrReturningClient: "new" | "returning"
): AppointmentEmailPlan[] => {
  const { key } = getAppointmentType(appointmentTypeName);

  if (key === "dot") {
    const welcome = newOrReturningClient === "returning" ? buildDotWelcomeReturningEmail() : buildDotWelcomeNewEmail();
    return [
      { email: welcome, attachments: ["mcsa5875", "noticeOfPrivacyPractices", "dotDmvMecInfo"] },
      { email: buildDotEncryptedEmail(), attachments: [] },
    ];
  }

  if (key === "immigration") {
    return [
      { email: buildImmigrationWelcomeEmail(), attachments: ["i693", "noticeOfPrivacyPractices"] },
      { email: buildImmigrationEncryptedEmail(), attachments: [] },
    ];
  }

  // FAA has no encrypted email; the client requested that only for DOT and IME.
  if (key === "faa") {
    if (newOrReturningClient === "returning") {
      return [{ email: buildFaaWelcomeReturningEmail(), attachments: ["noticeOfPrivacyPractices"] }];
    }
    return [{ email: buildFaaWelcomeNewEmail(), attachments: ["pilotBillOfRights", "noticeOfPrivacyPractices"] }];
  }

  // School/Sports/Camp and Consultation bookings have no automated emails yet.
  return [];
};

export const sendAppointmentEmails = async ({
  to,
  appointmentType,
  newOrReturningClient,
}: SendAppointmentEmailsParams): Promise<void> => {
  if (!isGraphConfigured()) {
    console.warn("[appointment-email] Microsoft Graph is not configured; skipping appointment emails.");
    return;
  }

  const plan = buildEmailPlan(appointmentType, newOrReturningClient);
  if (plan.length === 0) {
    return;
  }

  for (const { email, attachments } of plan) {
    try {
      const loadedAttachments = await loadAttachments(attachments);
      await sendGraphMail({
        to,
        subject: email.subject,
        html: email.html,
        attachments: loadedAttachments,
      });
    } catch (error) {
      // Log and continue so one failed email doesn't prevent the others.
      console.error(`[appointment-email] Failed to send "${email.subject}" to ${to}:`, error);
    }
  }
};
