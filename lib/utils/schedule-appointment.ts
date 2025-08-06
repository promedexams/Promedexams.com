/**
 * Formats a phone number string into a standard US format or an international format with a country code.
 *
 * - For input with 10 or fewer digits, formats as "(XXX) XXX-XXXX".
 * - For input with more than 10 digits, treats the leading digits as the country code and formats as "+<country> (XXX) XXX-XXXX".
 * - Non-digit characters in the input are ignored.
 *
 * @param value - The input phone number string to format.
 * @returns The formatted phone number string.
 */
export function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    // Standard US format
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    let formatted = "";
    if (match[1]) formatted = `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  } else {
    // Country/area code + US format
    const country = digits.slice(0, digits.length - 10);
    const rest = digits.slice(-10);
    const match = rest.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (!match) return `+${country} ${rest}`;
    return `+${country} (${match[1]}) ${match[2]}-${match[3]}`;
  }
}
