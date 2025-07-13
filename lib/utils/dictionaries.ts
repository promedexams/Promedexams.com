const dictionaries = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  es: () => import("../../dictionaries/es.json").then((module) => module.default),
};

/**
 * Asynchronously retrieves the dictionary object for the specified locale.
 *
 * @param locale - The locale code for which to fetch the dictionary. Supported values are `"en"` (English) and `"es"` (Spanish).
 * @returns A promise that resolves to the dictionary object corresponding to the given locale.
 */
export const getDictionary = async (locale: "en" | "es") => dictionaries[locale]();
