import { NextRequest, NextResponse } from "next/server";
import { fromZonedTime } from "date-fns-tz";
import { SquareClient, SquareEnvironment } from "square";

import { BookingRequest } from "@/lib/types/api/booking";

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingRequest = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "serviceId",
      "serviceVariationVersion",
      "appointmentDate",
      "appointmentTime",
      "birthday",
    ];

    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingRequest]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}`, code: "VALIDATION_ERROR" },
          { status: 400 }
        );
      }
    }

    const client = new SquareClient({
      token: process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
      environment: SquareEnvironment.Production,
    });

    // First, create or get the customer (with DOB matching)
    const customer = await createOrGetCustomer(client, bookingData);
    if (!customer.success || !customer.customerId) {
      return NextResponse.json(
        {
          success: false,
          error: customer.error || "Failed to create client",
          code: "CLIENT_ERROR",
        },
        { status: 500 }
      );
    }

    // Create the booking
    const booking = await createBooking(client, bookingData, customer.customerId);
    if (!booking.success) {
      return NextResponse.json(
        {
          success: false,
          error: booking.error || "Failed to create booking",
          code: "BOOKING_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.bookingId,
      customerId: customer.customerId,
      code: "BOOKING_SUCCESS",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

async function createOrGetCustomer(client: SquareClient, bookingData: BookingRequest) {
  try {
    // Search for existing customer by email
    const searchResponse = await client.customers.search({
      query: {
        filter: {
          emailAddress: {
            exact: bookingData.email,
          },
        },
      },
    });

    // If customer exists, check if DOB matches
    if (searchResponse.customers && searchResponse.customers.length > 0) {
      const existingCustomer = searchResponse.customers[0];

      // Check if DOB matches
      if (existingCustomer.birthday === bookingData.birthday) {
        return {
          success: true,
          customerId: existingCustomer.id!,
        };
      } else {
        // DOB doesn't match - this might be a different person with same email
        return {
          success: false,
          error: "Customer with this email exists but date of birth doesn't match",
        };
      }
    }

    // Create new customer
    const createResponse = await client.customers.create({
      givenName: bookingData.firstName,
      familyName: bookingData.lastName,
      emailAddress: bookingData.email,
      phoneNumber: bookingData.phoneNumber.replace(/\D/g, ""),
      birthday: bookingData.birthday,
      note: generateCustomerNote(bookingData),
    });

    if (createResponse.customer?.id) {
      return {
        success: true,
        customerId: createResponse.customer.id,
      };
    }

    return {
      success: false,
      error: "Failed to create customer",
    };
  } catch (error: any) {
    console.error("Error creating/getting customer:", error);
    return {
      success: false,
      error: "Failed to create or retrieve customer",
    };
  }
}

async function createBooking(client: SquareClient, bookingData: BookingRequest, customerId: string) {
  try {
    // Convert time to 24-hour format for Square API
    const appointmentDateTime = convertToDateTime(bookingData.appointmentDate, bookingData.appointmentTime);

    const createBookingResponse = await client.bookings.create({
      booking: {
        appointmentSegments: [
          {
            serviceVariationId: bookingData.serviceId,
            serviceVariationVersion: BigInt(bookingData.serviceVariationVersion),
            teamMemberId: process.env.SQUARE_OWNER_TEAM_MEMBER_ID!,
          },
        ],
        locationId: process.env.SQUARE_OFFICE_LOCATION_ID,
        startAt: appointmentDateTime,
        customerId: customerId,
        customerNote: generateCustomerNote(bookingData),
        sellerNote: generateSellerNote(bookingData),
      },
    });

    if (createBookingResponse.booking?.id) {
      return {
        success: true,
        bookingId: createBookingResponse.booking.id,
      };
    }

    return {
      success: false,
      error: "Booking creation failed - no booking ID returned",
    };
  } catch (error: any) {
    console.error("Error creating booking:", error);

    // Handle specific Square API errors
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map((err: any) => err.detail || err.code || "Unknown error").join(", ");
      return {
        success: false,
        error: `Square API error: ${errorMessages}`,
      };
    }

    return {
      success: false,
      error: "Failed to create booking",
    };
  }
}

function convertToDateTime(date: string, time: string): string {
  // Combine date and time strings
  const [timeStr, period] = time.split(" ");
  const [hours, minutes] = timeStr.split(":").map(Number);

  let hour24 = hours;
  if (period === "PM" && hours !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hours === 12) {
    hour24 = 0;
  }

  const localDateTime = new Date(`${date}T00:00:00.000`);
  localDateTime.setHours(hour24, minutes);

  const zonedTime = fromZonedTime(localDateTime, "America/Denver");

  return zonedTime.toISOString();
}

function generateCustomerNote(bookingData: BookingRequest): string {
  const notes = [];

  notes.push(`Middle Initial: ${bookingData.middleInitial || "N/A"}`);
  notes.push(`Client Type: ${bookingData.newOrReturningClient}`);

  if (bookingData.newOrReturningClient === "returning") {
    if (bookingData.newHealthConditions === "yes") {
      notes.push("Has new health conditions since last visit");
    }
    if (bookingData.newMedications === "yes") {
      notes.push("Taking new medications since last visit");
    }
  }

  if (bookingData.hasQuestions === "yes") {
    notes.push("Has questions/concerns to discuss prior to examination");
  }

  return notes.join(". ") + ".";
}

function generateSellerNote(bookingData: BookingRequest): string {
  return `Client: ${bookingData.firstName} ${bookingData.middleInitial || ""} ${bookingData.lastName} | Email: ${bookingData.email} | Phone: ${bookingData.phoneNumber} | DOB: ${bookingData.birthday} | Type: ${bookingData.newOrReturningClient}`;
}
