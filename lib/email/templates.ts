/**
 * HTML builders for appointment emails (English only for now — the client
 * localizes on their end). Content is transcribed from the client's approved
 * drafts. Each builder returns a subject line and inline-styled, Outlook-safe HTML.
 *
 * NOTE: encrypted-email subjects are prefixed with "[Secure]" so a Microsoft 365
 * mail-flow rule can key on that marker to apply Office Message Encryption.
 */

import { BusinessInfo } from "@/lib/business-info";
import {
  ADOBE_READER_URL,
  CDC_VACCINATION_TECHNICAL_INSTRUCTIONS_URL,
  CDC_VACCINES_BY_AGE_URL,
  DOMAIN_URL,
  FAA_AME_GUIDE_URL,
  FAA_PHYSICALS_PAGE_URL,
  I693_INSTRUCTIONS_URL,
  IMMIGRATION_FAQ_URL,
  IMMIGRATION_PAGE_URL,
  MED_XPRESS_URL,
  QUEST_LAB_APPOINTMENT_URL,
} from "@/lib/links";

export interface AppointmentEmail {
  subject: string;
  html: string;
}

const OFFICE_EMAIL = BusinessInfo.ContactInformation.OfficeEmail;

// --- Shared inline styles -------------------------------------------------

const NAVY = "#07001C";
const GOLD = "#f1a208";
const TEXT = "#252a33";
const LINK = "#1d4ed8";
const LOGO_URL = "https://promedexams.com/branding/logos/globe-logo-email.png";

const bodyStyle = `margin:0;font-size:15px;line-height:1.7;color:${TEXT};`;
const pStyle = `margin:0 0 16px;`;
const strongLead = `font-weight:700;`;
const sectionHeading = `margin:28px 0 14px;padding-bottom:8px;font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${NAVY};border-bottom:2px solid ${GOLD};`;
const listStyle = `margin:0 0 16px;padding-left:22px;`;
const subListStyle = `margin:6px 0 6px;padding-left:22px;`;
const linkStyle = `color:${LINK};text-decoration:underline;`;
const checkboxRow = `margin:6px 0;`;

const link = (href: string, text: string) => `<a href="${href}" style="${linkStyle}">${text}</a>`;

/** Soft-yellow panel used to spotlight the most important action/deadline in an email. */
const callout = (innerHtml: string): string =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
    <tr>
      <td style="padding:18px 22px;background-color:#fdf6e3;border-radius:8px;font-size:15px;line-height:1.65;color:${NAVY};">
        ${innerHtml}
      </td>
    </tr>
  </table>`;

/** Underlined key phrase for use inside a callout panel. */
const highlight = (text: string): string => `<span style="text-decoration:underline;">${text}</span>`;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const formatTime12h = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

/** Groups consecutive open days with identical hours into readable ranges for the footer. */
const getHoursLines = (): { days: string; time: string }[] => {
  const { hours } = BusinessInfo.ContactInformation.HoursOfOperation;
  const groups: { start: number; end: number; open: string; close: string }[] = [];

  hours.forEach((day, index) => {
    if (!day) return;
    const last = groups[groups.length - 1];
    if (last && last.end === index - 1 && last.open === day.open && last.close === day.close) {
      last.end = index;
    } else {
      groups.push({ start: index, end: index, open: day.open, close: day.close });
    }
  });

  return groups.map((group) => ({
    days: group.start === group.end ? DAY_NAMES[group.start] : `${DAY_NAMES[group.start]} – ${DAY_NAMES[group.end]}`,
    time: `${formatTime12h(group.open)} – ${formatTime12h(group.close)}`,
  }));
};

/** Wraps body content in the branded ProMed Exams email shell. */
const wrapEmail = (bodyHtml: string, previewText: string): string => `
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${previewText}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f5;padding:28px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e6ec;font-family:Arial,Helvetica,sans-serif;">
        <tr>
          <td align="center" style="background-color:${NAVY};padding:34px 32px 26px;">
            <img src="${LOGO_URL}" width="76" height="76" alt="ProMed Exams" style="display:block;margin:0 auto 14px;border:0;outline:none;text-decoration:none;" />
            <div style="color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">ProMed Exams</div>
            <div style="color:${GOLD};font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;margin-top:7px;">Medical Exams in Littleton, CO</div>
          </td>
        </tr>
        <tr>
          <td style="height:4px;line-height:4px;font-size:0;background-color:${GOLD};">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:32px;${bodyStyle}">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="height:4px;line-height:4px;font-size:0;background-color:${GOLD};">&nbsp;</td>
        </tr>
        <tr>
          <td style="background-color:${NAVY};padding:28px 32px;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" style="font-size:12px;line-height:1.7;color:#b9bcc6;">
                  <strong style="color:#ffffff;font-size:13px;">ProMed Exams PC</strong><br />
                  ${BusinessInfo.ContactInformation.FullAddress}<br />
                  Phone: ${BusinessInfo.ContactInformation.PhoneNumber} &nbsp;|&nbsp; Fax: ${BusinessInfo.ContactInformation.FaxNumber}<br />
                  <a href="mailto:${OFFICE_EMAIL}" style="color:${GOLD};text-decoration:none;">${OFFICE_EMAIL}</a>
                  &nbsp;&bull;&nbsp;
                  <a href="${DOMAIN_URL}" style="color:${GOLD};text-decoration:none;">promedexams.com</a>
                </td>
                <td valign="top" align="right" style="font-size:12px;line-height:1.6;color:#b9bcc6;">
                  <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Hours</div>
                  ${getHoursLines()
                    .map(
                      ({ days, time }) =>
                        `<div style="margin-top:6px;"><span style="color:#ffffff;">${days}</span><br />${time}</div>`
                    )
                    .join("")}
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;padding-top:14px;border-top:1px solid #2a2440;color:#71747f;font-size:11px;text-align:center;">${BusinessInfo.CopyrightDisclaimer}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

// --- Shared content blocks ------------------------------------------------

/** Adobe download + MCSA-5875 completion instructions, shared by new & returning DOT welcomes. */
const dotInstructionsBlock = `
  ${callout(
    `<strong>You must send ProMed Exams the Medical Exam Report Form (MCSA-5875) with pages 1 &amp; 2 completed ${highlight("at least 24 hours")} prior to your appointment.</strong>`
  )}

  <p style="${sectionHeading}">PRIOR TO YOUR APPOINTMENT</p>

  <p style="margin:0 0 8px;font-weight:700;text-decoration:underline;">1. Download Adobe Acrobat Reader (free).</p>
  <ul style="${listStyle}">
    <li>Download Adobe Acrobat Reader for free from the ${link(ADOBE_READER_URL, "Adobe website")}.
      <ul style="${subListStyle}">
        <li><strong>Make sure to uncheck</strong> &ldquo;Install Adobe Express Photos&rdquo; and &ldquo;Install McAfee Security Scan Plus&rdquo; <strong>BEFORE</strong> clicking on &ldquo;Download Acrobat Reader.&rdquo;</li>
      </ul>
    </li>
  </ul>

  <p style="margin:0 0 12px;font-weight:700;text-decoration:underline;">2. Download &amp; Complete Form MCSA-5875 Attached to this Email, then Email to ProMed Exams</p>
  <p style="${pStyle}"><em><strong>IMPORTANT: Do NOT</strong> download, open, or fill out the form directly in your web browser (Chrome, Edge, Safari) or default preview programs (like Mac's Preview, which can corrupt data). Follow the steps below <em>exactly as written</em> to avoid problems.</em></p>

  <p style="margin:0 0 6px;font-weight:700;">Step 1: Download the File</p>
  <ul style="${listStyle}">
    <li><strong>Right-click</strong> on the attached Form MCSA-5875.</li>
    <li>Select <strong>Save Link As</strong> or <strong>Download/Download Link As</strong>.</li>
    <li><strong>Save it to your Desktop or Downloads folder.</strong>
      <ul style="${subListStyle}">
        <li>We recommend you name the file &lsquo;MCSA-5875 Last Name, First Name&rsquo;.</li>
      </ul>
    </li>
  </ul>

  <p style="margin:0 0 6px;font-weight:700;">Step 2: Open in Adobe</p>
  <ul style="${listStyle}">
    <li><strong>Do NOT</strong> double-click the downloaded file on your computer to open it <strong>UNLESS</strong> Adobe Acrobat Reader is set as your computer's <strong>default app</strong> for that file type (PDF).
      <ul style="${subListStyle}">
        <li>If it isn't, the document might open in your web browser or default preview program which can corrupt data.</li>
      </ul>
    </li>
    <li>Instead, open your <strong>Adobe Acrobat Reader</strong> program first, then open the saved file from within Adobe.</li>
  </ul>

  <p style="margin:0 0 6px;font-weight:700;">Step 3: Edit Form MCSA-5875 in Adobe and Save Completed Form to Your Computer</p>
  <ul style="${listStyle}">
    <li><strong>Left-click in the shaded areas</strong> and type your Personal Information. You can &lsquo;tab&rsquo; over instead of clicking on each area if you prefer. Your age should autopopulate after you enter your date of birth on page 1. Your name &amp; date of birth should autopopulate on the tops of pages 2-5 after you enter the information on page 1.</li>
    <li>If you check &ldquo;Yes&rdquo; to prior surgery, then the associated area below will become shaded and allow you to type. Please enter the surgery, date of surgery, &amp; any complications.</li>
  </ul>`;

// --- DOT ------------------------------------------------------------------

export const buildDotWelcomeNewEmail = (): AppointmentEmail => ({
  subject: "Welcome to ProMed Exams – Your DOT Physical",
  html: wrapEmail(
    `
    <p style="${pStyle}"><strong>Welcome to ProMed Exams,</strong></p>
    <p style="${pStyle}">My name is Laura Wyse. I am the office manager of ProMed Exams and will be your main point of contact. Dr. Jill Quigley will be performing your DOT physical.</p>
    <p style="${pStyle}${strongLead}">For your upcoming appointment to go smoothly, please carefully read the information in this email and follow the instructions below as soon as possible.</p>
    ${dotInstructionsBlock}`,
    "Welcome to ProMed Exams — please complete your MCSA-5875 before your DOT physical."
  ),
});

export const buildDotWelcomeReturningEmail = (): AppointmentEmail => ({
  subject: "Thank You for Scheduling with ProMed Exams – Your DOT Physical",
  html: wrapEmail(
    `
    <p style="${pStyle}"><strong>Thank you for scheduling with ProMed Exams,</strong></p>
    <p style="${pStyle}">We are looking forward to seeing you again. Here is a summary of your appointment and the items you need to bring with you.</p>
    <p style="${pStyle}${strongLead}">For your upcoming appointment to go smoothly, please carefully read the information in this email and follow the instructions below as soon as possible.</p>
    ${dotInstructionsBlock}`,
    "Thanks for scheduling with ProMed Exams — please complete your MCSA-5875 before your DOT physical."
  ),
});

export const buildDotEncryptedEmail = (): AppointmentEmail => ({
  subject: "[Secure] ProMed Exams – Send Your DOT Documents Securely",
  html: wrapEmail(
    `
    <p style="${pStyle}">Hello,</p>
    <p style="${pStyle}">Please use this encrypted email to send sensitive documents and correspondence before, during, and after your exam in order to keep your personal information secure.</p>
    ${callout(
      `<strong>Reply to this email to send ProMed Exams the Medical Exam Report Form (MCSA-5875) with pages 1 &amp; 2 completed ${highlight("at least 24 hours")} prior to your appointment.</strong>`
    )}
    <p style="${pStyle}">If applicable, also send <strong>medical records, clearance letters, or exemption letters</strong> from your doctors (for chronic health conditions such as diabetes, sleep apnea, warfarin use; or for acute/new issues since your last DOT exam such as hospitalization, surgery, injury).</p>
    <p style="${pStyle}">If we do not receive the completed form and applicable medical records/letters, we may have to cancel your appointment and a late cancellation fee will apply.</p>`,
    "Use this encrypted email to securely send your DOT documents to ProMed Exams."
  ),
});

// --- Immigration (IME) ----------------------------------------------------

export const buildImmigrationWelcomeEmail = (): AppointmentEmail => ({
  subject: "Welcome to ProMed Exams – Your Immigration Medical Exam",
  html: wrapEmail(
    `
    <p style="${pStyle}"><strong>Welcome to ProMed Exams,</strong></p>
    <p style="${pStyle}">My name is Laura Wyse. I am the office manager of ProMed Exams and will be your main point of contact. Dr. Jill Quigley will be performing your immigration medical exam. We are happy to help you through this part of the immigration process. We know it can be a stressful and scary process, so our goal is to make the medical part as smooth and stress-free as possible. The main feedback that we have received from others who have come to us for their medical exams is that we were welcoming, calming, supportive, and efficient. We hope you will feel the same!</p>
    <p style="${pStyle}${strongLead}">For your upcoming appointment to go smoothly, please carefully read the information in this email and follow the instructions below as soon as possible.</p>

    ${callout(
      `<div style="font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${NAVY};margin-bottom:10px;">Important</div>
      <ul style="margin:0;padding-left:22px;">
        <li style="margin-bottom:8px;">You must <strong>schedule a separate</strong> immigration medical exam <strong>appointment for EACH MEMBER of your family</strong>.</li>
        <li>You <strong>MUST complete Parts 1-4 of Form I-693 and email the documents</strong> requested below as soon as possible. To ensure accuracy and avoid delays we require this information ${highlight("at least 24 hours")} prior to your appointment.</li>
      </ul>`
    )}

    <p style="${sectionHeading}">PRIOR TO YOUR APPOINTMENT</p>

    <p style="margin:0 0 8px;font-weight:700;text-decoration:underline;">1. Download Adobe Acrobat Reader (free).</p>
    <ul style="${listStyle}">
      <li>Download Adobe Acrobat Reader for free from the ${link(ADOBE_READER_URL, "Adobe website")}.
        <ul style="${subListStyle}">
          <li><strong>Make sure to uncheck</strong> &ldquo;Install Adobe Express Photos&rdquo; and &ldquo;Install McAfee Security Scan Plus&rdquo; <strong>BEFORE</strong> clicking on &ldquo;Download Acrobat Reader.&rdquo;</li>
        </ul>
      </li>
      <li>Completing the form using Adobe Acrobat Reader <strong>allows your full name and A-number to auto-populate on ALL pages</strong> as you enter them on page 1, which saves you time and decreases risk of typos that can potentially lead to denial of application.</li>
    </ul>

    <p style="margin:0 0 8px;font-weight:700;text-decoration:underline;">2. Download &amp; Complete Form I-693 (free) attached to this email, then securely email to ProMed Exams following the instructions in this link:</p>
    <ul style="${listStyle}">
      <li>${link(I693_INSTRUCTIONS_URL, "Instructions to Download and Edit Form I-693 in Adobe; Email to ProMed Exams")}</li>
      <li>Complete <strong>ONE form PER family member</strong>.</li>
    </ul>

    <p style="margin:0 0 8px;font-weight:700;text-decoration:underline;">3. Send the documents listed below to ProMed Exams via ENCRYPTED EMAIL at least 24 HOURS prior to your appointment.</p>
    <ul style="${listStyle}">
      <li>Please bring all documents to your appointment as well as sending through email.</li>
      <li>Reply to the <strong>ENCRYPTED email</strong> sent to you (at the same time as this welcome email) by me, Laura Wyse, from ${link(`mailto:${OFFICE_EMAIL}`, OFFICE_EMAIL)} and attach these documents to keep your information protected.
        <ul style="${subListStyle}">
          <li>Encrypted email may be found in your junk/spam folder until you choose &lsquo;Report Not Spam&rsquo; or &lsquo;Trusted Sender&rsquo; and save ${link(`mailto:${OFFICE_EMAIL}`, OFFICE_EMAIL)} as a contact.</li>
        </ul>
      </li>
    </ul>

    <p style="${checkboxRow}">&#9744; <span style="text-decoration:underline;">Form I-693</span> with Parts 1-4 Completed</p>
    <p style="${checkboxRow}">&#9744; ALL <span style="text-decoration:underline;">Vaccination Records</span> - <strong>TRANSLATED to English</strong></p>
    <p style="${checkboxRow}">&#9744; Copy of <span style="text-decoration:underline;">Insurance Card</span> (if any) - labs must be ordered by Dr. Quigley at your exam</p>
    <p style="${checkboxRow}">&#9744; Copy of Valid <span style="text-decoration:underline;">Passport</span> or other Government-Issued <span style="text-decoration:underline;">Photo ID</span></p>
    <p style="${checkboxRow}">&#9744; List of current <span style="text-decoration:underline;">medications</span> including doses and who prescribes the medication</p>
    <p style="${checkboxRow}">&#9744; Any pertinent <span style="text-decoration:underline;">medical records</span> regarding significant health conditions</p>
    <p style="${checkboxRow}">&#9744; <strong>IF</strong> you have received previous treatment for syphilis or tuberculosis, Certificate of Clearance of communicable diseases</p>
    <p style="${checkboxRow}">&#9744; <strong>IF</strong> you have a history of harmful or violent behavior resulting in injury to people or animals, information that will allow the doctor to determine whether the behavior was related to a psychiatric or medical problem, or to drug or alcohol use</p>
    <p style="${checkboxRow}">&#9744; <strong>IF</strong> you have been treated or hospitalized for psychiatric or mental illness, or alcohol or drug abuse, written documentation including the diagnosis, length of treatment, and your prognosis</p>

    <p style="${sectionHeading}">Lab Information</p>
    <ul style="${listStyle}">
      <li>The USCIS requires labs to be ordered by a civil surgeon and drawn the <strong>SAME DAY</strong> as your appointment. The labs must be drawn <strong>AFTER</strong> the exam, <strong>NOT BEFORE</strong>. We will create your lab order during your exam to take with you to Quest.</li>
      <li>We recommend scheduling a lab appointment now at Quest Diagnostics online ideally for <strong>60-90 minutes after</strong> the starting time of your immigration exam appointment. Note: You may schedule your lab appointment prior to receiving your lab order from us.
        <ul style="${subListStyle}">
          <li>${link(QUEST_LAB_APPOINTMENT_URL, "QUEST LAB APPOINTMENT LINK")}</li>
        </ul>
      </li>
      <li>The closest Quest is the Southpark location at 8199 South Park Lane, Suite 110 in Littleton, which is less than 2 miles from our office. The link above goes directly to their scheduling page, but you can choose a different Quest location if you prefer, as long as you make sure to have the labs done the <strong>SAME DAY</strong> after your exam.</li>
      <li>Go to our ${link(IMMIGRATION_FAQ_URL, "Frequently Asked Questions")} link for further information.</li>
    </ul>

    <p style="${sectionHeading}">Vaccination Information</p>
    <ul style="${listStyle}">
      <li>Dr. Quigley will review your vaccination records prior to your appointment and then discuss with you which vaccines are required by the USCIS for your age at your exam.</li>
      <li>We do not carry vaccines at our office, so you will be instructed to go to a pharmacy, public health department, or your primary care provider to obtain the required vaccines.</li>
      <li>Go to our ${link(IMMIGRATION_FAQ_URL, "Frequently Asked Questions")} link for further information.</li>
      <li>CDC sources civil surgeons must use for USCIS-required vaccine information:
        <ul style="${subListStyle}">
          <li>${link(CDC_VACCINES_BY_AGE_URL, "Table of Required Vaccines by Age")}</li>
          <li>${link(CDC_VACCINATION_TECHNICAL_INSTRUCTIONS_URL, "Vaccination Technical Instructions for Civil Surgeons")}</li>
        </ul>
      </li>
    </ul>

    <p style="${sectionHeading}">Payment and Insurance Coverage Information</p>
    <ul style="${listStyle}">
      <li>The cost of the exam and paperwork is <strong>$235</strong>. You will receive a <strong>$25 credit</strong> for completing your form and submitting your documents more than 24 hours before your appointment time. You will also receive a <strong>$10 credit</strong> for paying in cash.</li>
      <li>We accept cash or credit card for payment. <em>We do NOT accept checks.</em></li>
      <li>Insurance does NOT cover immigration exams, but may cover vaccines and labs.</li>
    </ul>

    <p style="${sectionHeading}">After Your Appointment</p>
    <ul style="${listStyle}">
      <li>Upon completion of all Form I-693 requirements, you will be given a completed signed and dated Form I-693 in a <strong>sealed envelope</strong>.</li>
      <li><strong>Do not open this envelope</strong>; it should be submitted in the sealed envelope to USCIS as part of the application process.</li>
      <li>An identical set of documents will also be emailed to you to keep for your personal records and to send to your immigration attorney, if applicable.</li>
    </ul>

    <p style="${pStyle}${strongLead}">${link(IMMIGRATION_FAQ_URL, "Click this link for Frequently Asked Questions")}. AFTER carefully reading this welcome email and the Frequently Asked Questions page, please reply to this email if you have any additional questions. You may also visit our website at ${link(IMMIGRATION_PAGE_URL, "www.promedexams.com")} for more information.</p>

    ${callout(
      `<div style="font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${NAVY};margin-bottom:10px;">Important</div>
      <ul style="margin:0;padding-left:22px;">
        <li style="margin-bottom:8px;">Please arrive <strong>15 minutes prior</strong> to your appointment to complete the check-in process.</li>
        <li>Please bring an <strong>interpreter</strong> to your appointment if needed.</li>
      </ul>`
    )}

    <p style="${pStyle}">Thank you for reaching out to us! We look forward to meeting you!</p>`,
    "Welcome to ProMed Exams — please complete Form I-693 before your immigration medical exam."
  ),
});

export const buildImmigrationEncryptedEmail = (): AppointmentEmail => ({
  subject: "[Secure] ProMed Exams – Send Your Immigration Documents Securely",
  html: wrapEmail(
    `
    <p style="${pStyle}">In order to keep your personal information secure, ProMed Exams uses encrypted email for correspondence involving sensitive information. Please only reply to this encrypted email before, during, and after your exam with any sensitive information.</p>
    <p style="${pStyle}">Please use this encrypted email to send these required documents as soon as possible:</p>
    <ul style="${listStyle}">
      <li>USCIS I693 with pages 1-3 completed as well as the tops of all pages</li>
      <li>Record of ALL vaccines</li>
      <li>Copy of insurance card (for your lab order)</li>
      <li>Copy of valid passport or other government-issued photo ID</li>
      <li>Any medical records regarding <em>significant</em> medical conditions such as diabetes, seizures, multiple sclerosis, heart disease, and many more. If you are unsure if you have a significant medical condition, Dr. Quigley will discuss this with you at your appointment and give you further instructions.</li>
    </ul>
    ${callout(
      `You MUST send these documents no later than ${highlight("24 hours before your appointment")} to allow us time to prepare for your appointment. You will NOT receive the $25 discount per person if we do not receive your completed Form I-693 and required documents by that deadline.`
    )}`,
    "Use this encrypted email to securely send your immigration documents to ProMed Exams."
  ),
});

// --- FAA ------------------------------------------------------------------

/** Reminders that close out both FAA emails. */
const faaArrivalReminders = callout(
  `<div style="margin-bottom:10px;"><strong>Be prepared to leave a urine sample (NOT for drug testing) at your appointment.</strong></div>
   <div><strong>Please arrive 10 minutes prior to your appointment time to complete the check-in process.</strong></div>`
);

/** Shared "what to bring" line items for FAA appointments. */
const faaMedXPressItem = `${link(MED_XPRESS_URL, "MedXPress")} Confirmation Number &mdash; You <strong>MUST</strong> have this ready when you arrive for <strong>all FAA physicals</strong> in order to proceed with the exam.`;
const faaAmeGuideItem = `Any medical and/or psychiatric evaluation documents required by the FAA per a prior or recent Special Issuance letter, CACI worksheet or Status Report, or Disposition Table as found in the FAA ${link(FAA_AME_GUIDE_URL, "AME guide")} available to the public.`;

export const buildFaaWelcomeNewEmail = (): AppointmentEmail => ({
  subject: "Welcome to ProMed Exams – Your FAA Physical",
  html: wrapEmail(
    `
    <p style="${pStyle}"><strong>Welcome to ProMed Exams,</strong></p>
    <p style="${pStyle}">My name is Laura Wyse. I am the office manager of ProMed Exams and will be your main point of contact. Dr. Jill Quigley will be performing your FAA physical/consultation. We are excited to get to know you better as we help to keep you flying safely now and in the future.</p>
    <p style="${pStyle}">Please see the attached Pilot Bill of Rights, which we will have you sign at your upcoming appointment. I have also attached a copy of our Notice of Privacy Practices.</p>

    <p style="${sectionHeading}">Current Pricing for Services</p>
    <p style="margin:0 0 10px;font-style:italic;">Credit card processing fees apply.</p>
    <ul style="${listStyle}">
      <li>Exam (all classes) $210 with a $10 discount if paid in cash.
        <ul style="${subListStyle}">
          <li>Additional charges may apply for Special Issuance, SODA, and multiple CACI conditions based on case complexity</li>
        </ul>
      </li>
      <li>EKG $150</li>
      <li>Waggoner Color Vision (with exam) $35</li>
      <li>Consultation Only (no MedXPress, no certificate) $75 per 15 min</li>
    </ul>

    <p style="${sectionHeading}">Payment &amp; Insurance Coverage</p>
    <ul style="${listStyle}">
      <li>Insurance does NOT cover FAA physicals.</li>
      <li>ProMed Exams accepts cash or credit card for payment.</li>
    </ul>

    <p style="${sectionHeading}">Please bring the following to your appointment</p>
    <ul style="${listStyle}">
      <li>Valid photo ID (driver's license or passport)</li>
      <li>${faaMedXPressItem}
        <ul style="${subListStyle}">
          <li><span style="text-decoration:underline;">NOTE</span>: You do <span style="text-decoration:underline;">NOT</span> need a MedXPress confirmation number if you are scheduled <span style="text-decoration:underline;">for a consultation</span> only, not an FAA physical. <em>In fact, you should avoid entering your information into MedXPress until after the consultation.</em></li>
        </ul>
      </li>
      <li>Glasses/ Contacts/ Hearing aids if needed to pass the exam</li>
      <li>${faaAmeGuideItem}</li>
    </ul>

    ${faaArrivalReminders}

    <p style="${pStyle}">For more details on what to expect during your exam, please visit our website at ${link(FAA_PHYSICALS_PAGE_URL, "www.promedexams.com")}.</p>
    <p style="${pStyle}">Please reply to this email if you have any further questions. We look forward to meeting you!</p>`,
    "Welcome to ProMed Exams — what to bring and what to expect at your FAA physical."
  ),
});

export const buildFaaWelcomeReturningEmail = (): AppointmentEmail => ({
  subject: "Thank You for Scheduling with ProMed Exams – Your FAA Physical",
  html: wrapEmail(
    `
    <p style="${pStyle}"><strong>Thank you for scheduling with ProMed Exams,</strong></p>
    <p style="${pStyle}">We are looking forward to seeing you again. Current pricing is listed on ${link(FAA_PHYSICALS_PAGE_URL, "our website")}.</p>

    <p style="${pStyle}">Here is a summary of the items you need to bring with you to your appointment:</p>
    <ul style="${listStyle}">
      <li>Valid photo ID (driver's license or passport) <strong>if</strong> yours has expired since your last appointment.</li>
      <li>${faaMedXPressItem}</li>
      <li>Glasses/ Contacts/ Hearing aids if needed to pass the exam.</li>
      <li>${faaAmeGuideItem}</li>
    </ul>

    ${faaArrivalReminders}

    <p style="${pStyle}">Please reply to this email if you have any further questions. We look forward to seeing you!</p>`,
    "Thanks for scheduling with ProMed Exams — what to bring to your FAA physical."
  ),
});
