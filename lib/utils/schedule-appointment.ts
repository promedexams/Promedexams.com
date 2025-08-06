/**
 * Formats a string of digits into a standard US phone number format.
 *
 * The function removes all non-digit characters from the input string and then formats
 * the digits as "(XXX) XXX-XXXX". If the input does not contain enough digits, it will
 * format as much as possible based on the available digits.
 *
 * @param value - The input string containing a phone number, possibly with non-digit characters.
 * @returns The formatted phone number string, or the original input if formatting is not possible.
 */
export function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  let formatted = "";
  if (match[1]) formatted = `(${match[1]}`;
  if (match[2]) formatted += `) ${match[2]}`;
  if (match[3]) formatted += `-${match[3]}`;
  return formatted;
}
