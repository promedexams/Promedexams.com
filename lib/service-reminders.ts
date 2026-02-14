/**
 * Configuration object for service reminders.
 * @interface ServiceReminderConfig
 * @property {string | RegExp} namePattern - A string or regular expression pattern used to match service names.
 * @property {string} dictionaryKey - The key used to retrieve reminder text from a localization dictionary.
 */
export interface ServiceReminderConfig {
  namePattern: string | RegExp;
  dictionaryKey: string;
}

export const SERVICE_REMINDER_CONFIGS: ServiceReminderConfig[] = [
  {
    namePattern: /FAA.*1st|FAA.*First/i,
    dictionaryKey: "faaFirst",
  },
  {
    namePattern: /FAA.*(2nd|3rd|Second|Third)/i,
    dictionaryKey: "faaSecondThird",
  },
  {
    namePattern: /DOT/i,
    dictionaryKey: "dot",
  },
  {
    namePattern: /Immigration/i,
    dictionaryKey: "immigration",
  },
];

/**
 * Gets the dictionary key for the reminder based on service name
 * @param serviceName - The name of the service from Square
 * @returns The dictionary key for the matching reminder, or null if no match found
 */
export function getServiceReminderKey(serviceName: string): string | null {
  if (!serviceName) return null;

  for (const config of SERVICE_REMINDER_CONFIGS) {
    if (typeof config.namePattern === "string") {
      if (serviceName.toLowerCase().includes(config.namePattern.toLowerCase())) {
        return config.dictionaryKey;
      }
    } else if (config.namePattern instanceof RegExp) {
      if (config.namePattern.test(serviceName)) {
        return config.dictionaryKey;
      }
    }
  }

  return null;
}
