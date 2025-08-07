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

/**
 * Represents detailed information about an error or notification to be displayed to the user.
 *
 * @property title - A short, descriptive title for the error or message.
 * @property message - A detailed message explaining the error or situation.
 * @property action - Suggested action or next step for the user to resolve or respond to the error.
 * @property severity - The severity level of the message, which can be "error", "warning", or "info".
 */
export interface ErrorInfo {
  title: string;
  message: string;
  action: string;
  severity: "error" | "warning" | "info";
}

/**
 * Returns detailed error information for a given error code related to appointment scheduling.
 *
 * Maps a provided error code to a user-friendly error object containing a title, message, recommended action, and severity.
 * If the error code is not recognized, a generic "Unknown Error" object is returned.
 *
 * @param errorCode - The string identifier for the error type.
 * @returns An {@link ErrorInfo} object with details for displaying user-facing error messages.
 */
export const getErrorInfo = (errorCode: string): ErrorInfo => {
  const errorMap: Record<string, ErrorInfo> = {
    // Validation Errors
    VALIDATION_ERROR: {
      title: "Missing Information",
      message: "Please check that all required fields are completed correctly.",
      action: "Review and complete the form",
      severity: "error",
    },

    // Client/Customer Errors
    CLIENT_ERROR: {
      title: "Customer Information Issue",
      message:
        "There was an issue with your customer information. This may be due to a date of birth mismatch with an existing account.",
      action: "Please verify your information or contact our office",
      severity: "error",
    },

    // Booking Errors
    BOOKING_ERROR: {
      title: "Booking Failed",
      message: "We were unable to create your appointment booking.",
      action: "Please try again or contact our office",
      severity: "error",
    },

    // Network/System Errors
    INTERNAL_ERROR: {
      title: "System Error",
      message: "An unexpected error occurred on our end.",
      action: "Please try again in a few moments or contact our office",
      severity: "error",
    },

    // Square API Specific Errors
    INVALID_REQUEST_ERROR: {
      title: "Invalid Request",
      message: "The appointment request contains invalid information.",
      action: "Please check your information and try again",
      severity: "error",
    },

    RATE_LIMIT_ERROR: {
      title: "Too Many Requests",
      message: "Our system is currently busy. Please wait a moment before trying again.",
      action: "Wait a few moments and try again",
      severity: "warning",
    },

    AUTHENTICATION_ERROR: {
      title: "System Authentication Error",
      message: "There was an authentication issue with our booking system.",
      action: "Please contact our office to book your appointment",
      severity: "error",
    },

    // Payment/Card Related (if applicable)
    PAYMENT_METHOD_ERROR: {
      title: "Payment Method Issue",
      message: "There was an issue with the payment method.",
      action: "Please check your payment information and try again",
      severity: "error",
    },

    CARD_DECLINED: {
      title: "Card Declined",
      message: "Your payment card was declined.",
      action: "Please try a different payment method or contact your bank",
      severity: "error",
    },

    INSUFFICIENT_FUNDS: {
      title: "Insufficient Funds",
      message: "Your payment method has insufficient funds.",
      action: "Please try a different payment method",
      severity: "error",
    },

    // Scheduling Specific
    CONFLICTING_PARAMETERS: {
      title: "Scheduling Conflict",
      message: "There was a conflict with your selected appointment time.",
      action: "Please select a different time slot",
      severity: "error",
    },

    INVALID_TIME_RANGE: {
      title: "Invalid Time Selection",
      message: "The selected appointment time is no longer available.",
      action: "Please refresh and select a different time",
      severity: "warning",
    },

    LOCATION_MISMATCH: {
      title: "Location Error",
      message: "There was an issue with the appointment location.",
      action: "Please contact our office to resolve this issue",
      severity: "error",
    },

    // Customer Related
    CUSTOMER_NOT_FOUND: {
      title: "Customer Not Found",
      message: "We could not locate your customer information.",
      action: "Please verify your information and try again",
      severity: "error",
    },

    INVALID_EMAIL_ADDRESS: {
      title: "Invalid Email",
      message: "The email address provided is not valid.",
      action: "Please check your email address and try again",
      severity: "error",
    },

    INVALID_PHONE_NUMBER: {
      title: "Invalid Phone Number",
      message: "The phone number provided is not valid.",
      action: "Please check your phone number and try again",
      severity: "error",
    },

    // Service Related
    UNSUPPORTED_CURRENCY: {
      title: "Currency Not Supported",
      message: "The currency for this appointment is not supported.",
      action: "Please contact our office for assistance",
      severity: "error",
    },

    TRANSACTION_LIMIT: {
      title: "Transaction Limit Exceeded",
      message: "The appointment fee exceeds your payment limit.",
      action: "Please contact your bank or try a different payment method",
      severity: "error",
    },

    // General System Issues
    SERVICE_UNAVAILABLE: {
      title: "Service Temporarily Unavailable",
      message: "Our booking system is temporarily unavailable.",
      action: "Please try again later or call our office",
      severity: "warning",
    },

    GATEWAY_TIMEOUT: {
      title: "Connection Timeout",
      message: "The request timed out. Your appointment may not have been created.",
      action: "Please check your appointments or contact our office",
      severity: "warning",
    },

    TEMPORARY_ERROR: {
      title: "Temporary System Error",
      message: "A temporary error occurred. Your request can be safely retried.",
      action: "Please try submitting your appointment again",
      severity: "warning",
    },

    // Booking Specific
    CHECKOUT_EXPIRED: {
      title: "Session Expired",
      message: "Your booking session has expired.",
      action: "Please start the appointment booking process again",
      severity: "warning",
    },

    IDEMPOTENCY_KEY_REUSED: {
      title: "Duplicate Request",
      message: "This appointment request has already been processed.",
      action: "Please check your appointments or start a new booking",
      severity: "info",
    },

    // Network Issues
    NETWORK_ERROR: {
      title: "Connection Error",
      message: "Unable to connect to our booking system.",
      action: "Please check your internet connection and try again",
      severity: "error",
    },

    // Default fallback
    UNKNOWN_ERROR: {
      title: "Unknown Error",
      message: "An unknown error occurred while processing your appointment.",
      action: "Please contact our office for assistance",
      severity: "error",
    },
  };

  return errorMap[errorCode] || errorMap["UNKNOWN_ERROR"];
};

/**
 * Determines whether a given error code represents a retryable error.
 *
 * Checks if the provided `errorCode` is included in a predefined list of error codes
 * that are considered transient or temporary, and for which retrying the operation
 * may succeed.
 *
 * @param errorCode - The error code to check.
 * @returns `true` if the error code is retryable; otherwise, `false`.
 */
export const isRetryableError = (errorCode: string): boolean => {
  const retryableErrors = [
    "RATE_LIMIT_ERROR",
    "TEMPORARY_ERROR",
    "GATEWAY_TIMEOUT",
    "SERVICE_UNAVAILABLE",
    "NETWORK_ERROR",
  ];

  return retryableErrors.includes(errorCode);
};
