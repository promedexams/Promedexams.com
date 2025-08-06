/**
 * Props for components or functions that require language support.
 *
 * @property params - A promise that resolves to an object containing the selected language.
 */
export interface SupportedLanguagesProps {
  params: Promise<{ lang: SupportedLanguages }>;
}

/**
 * Represents the set of language codes supported by the application.
 *
 * - `"en"`: English
 * - `"es"`: Spanish
 */
export type SupportedLanguages = "en" | "es";
