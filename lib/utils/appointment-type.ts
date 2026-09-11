/**
 * Maps a human-readable Square service name (e.g. "DOT Physical", "Immigration Medical Exam")
 * to a stable internal key. Centralizes the pattern-matching that was previously duplicated
 * across the appointment-confirmed page and is now also used by the appointment email service.
 */

export type AppointmentTypeKey = "dot" | "faa" | "schoolSportsCamp" | "immigration" | "consultation" | "general";

interface AppointmentTypeConfig {
  key: AppointmentTypeKey;
  pattern: RegExp;
  servicePageUrl: string;
}

/**
 * Ordered list of matchers. The first pattern to match the service name wins, so keep
 * more specific patterns above more general ones if they are ever added.
 */
const APPOINTMENT_TYPE_CONFIGS: AppointmentTypeConfig[] = [
  { key: "dot", pattern: /DOT/i, servicePageUrl: "/services/dot-physicals" },
  { key: "faa", pattern: /FAA/i, servicePageUrl: "/services/faa-physicals" },
  {
    key: "schoolSportsCamp",
    pattern: /School|Sports|Camp/i,
    servicePageUrl: "/services/school-sports-camp-physicals",
  },
  { key: "immigration", pattern: /Immigration/i, servicePageUrl: "/services/immigration-medical-exams" },
  { key: "consultation", pattern: /Consultation/i, servicePageUrl: "/services" },
];

const GENERAL_FALLBACK: Pick<AppointmentTypeConfig, "key" | "servicePageUrl"> = {
  key: "general",
  servicePageUrl: "/services",
};

/**
 * Resolves a service name to its internal key and service page URL.
 * Falls back to the "general" key when no pattern matches.
 */
export const getAppointmentType = (
  appointmentTypeName: string
): { key: AppointmentTypeKey; servicePageUrl: string } => {
  for (const config of APPOINTMENT_TYPE_CONFIGS) {
    if (config.pattern.test(appointmentTypeName)) {
      return { key: config.key, servicePageUrl: config.servicePageUrl };
    }
  }
  return { ...GENERAL_FALLBACK };
};
