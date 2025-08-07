/**
 * Represents a booking request containing personal and appointment information.
 *
 * @property firstName - The first name of the client.
 * @property middleInitial - The middle initial of the client.
 * @property lastName - The last name of the client.
 * @property birthday - The client's date of birth as an ISO date string.
 * @property email - The client's email address.
 * @property phoneNumber - The client's phone number.
 * @property serviceId - The identifier for the requested service.
 * @property newOrReturningClient - Indicates if the client is new or returning ("new" | "returning").
 * @property newHealthConditions - Optional. Indicates if the client has new health conditions ("yes" | "no").
 * @property newMedications - Optional. Indicates if the client is taking new medications ("yes" | "no").
 * @property hasQuestions - Indicates if the client has questions ("yes" | "no").
 * @property appointmentDate - The date of the appointment as an ISO date string.
 * @property appointmentTime - The time of the appointment (e.g., "10:00 AM").
 */
export interface BookingRequest {
  // Personal Information
  firstName: string;
  middleInitial: string;
  lastName: string;
  birthday: string; // ISO date string
  email: string;
  phoneNumber: string;

  // Appointment Information
  serviceId: string;
  newOrReturningClient: "new" | "returning";
  newHealthConditions?: "yes" | "no";
  newMedications?: "yes" | "no";
  hasQuestions: "yes" | "no";

  // Date/Time
  appointmentDate: string; // ISO date string
  appointmentTime: string; // e.g., "10:00 AM"
}

/**
 * Represents the response returned after attempting to create or manage a booking.
 *
 * @property success - Indicates whether the booking operation was successful.
 * @property bookingId - The unique identifier for the booking, present if the operation was successful.
 * @property appointmentId - The unique identifier for the associated appointment, if applicable.
 * @property error - An error message describing why the booking operation failed, present if `success` is false.
 */
export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  appointmentId?: string;
  error?: string;
}
