import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

const DAY_MAP: Record<string, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export async function GET() {
  const client = new SquareClient({
    token: process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
  });

  const locationId = process.env.SQUARE_OFFICE_LOCATION_ID;
  if (!locationId) {
    return NextResponse.json({ error: "Missing locationId" }, { status: 400 });
  }

  try {
    // Get location info (including business hours)
    const locationRes = await client.locations.get({ locationId });
    const location = locationRes.location;

    if (!location || !location.businessHours || !location.businessHours.periods) {
      return NextResponse.json([], { status: 200 });
    }

    // Debug: Log the business hours to see what Square is returning
    console.log("Business hours periods:", JSON.stringify(location.businessHours.periods, null, 2));

    // Get all unique days of week that have business hours
    const openDays = new Set<number>();
    for (const period of location.businessHours.periods) {
      if (period.dayOfWeek) {
        const dayOfWeek = period.dayOfWeek.toUpperCase();
        if (DAY_MAP.hasOwnProperty(dayOfWeek)) {
          openDays.add(DAY_MAP[dayOfWeek]);
        } else {
          console.warn(`Unknown day of week from Square: ${period.dayOfWeek}`);
        }
      }
    }

    // Generate next 60 days that match open days
    const today = new Date();
    const availableDays: string[] = [];

    for (let i = 0; i < 365; i++) {
      // Create date in local timezone to avoid UTC conversion issues
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate() + i;

      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();

      if (openDays.has(dayOfWeek)) {
        // Format date manually to avoid timezone issues
        const isoDate =
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0");
        availableDays.push(isoDate);
      }
    }

    console.log(`Generated ${availableDays.length} available days`);
    return NextResponse.json(availableDays);
  } catch (error) {
    console.error("Error fetching available days:", error);
    return NextResponse.json({ error: "Failed to fetch available days" }, { status: 500 });
  }
}
