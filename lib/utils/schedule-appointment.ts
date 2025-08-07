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

/**
 * Formats a string of digits into a date string in the format "DD/MM/YYYY".
 *
 * Non-digit characters are removed from the input, and only the first 8 digits are considered.
 * The function inserts slashes to separate day, month, and year components as the user types.
 *
 * @param value - The input string potentially containing a date.
 * @returns The formatted date string as "DD/MM/YYYY", or a partial format if fewer digits are provided.
 */
export function formatDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  let formatted = "";

  if (digits.length > 0) {
    formatted += digits.slice(0, 2);
  }
  if (digits.length >= 3) {
    formatted += "/" + digits.slice(2, 4);
  }
  if (digits.length >= 5) {
    formatted += "/" + digits.slice(4, 8);
  }

  return formatted;
}
