import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

export async function GET(request: NextRequest) {
  const client = new SquareClient({
    token: process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
  });

  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");
  const locationId = process.env.SQUARE_OFFICE_LOCATION_ID;

  if (!serviceId || !date || !locationId) {
    return NextResponse.json({ error: "Missing serviceId, date, or locationId" }, { status: 400 });
  }

  try {
    const response = await client.bookings.searchAvailability({
      query: {
        filter: {
          locationId,
          segmentFilters: [
            {
              serviceVariationId: serviceId,
            },
          ],
          startAtRange: {
            startAt: `${date}T00:00:00Z`,
            endAt: `${date}T23:59:59Z`,
          },
        },
      },
    });

    const availableTimes =
      response.availabilities?.map((slot: any) => {
        const time = new Date(slot.startAt);
        return time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Denver",
        });
      }) || [];

    return NextResponse.json(availableTimes);
  } catch (error) {
    console.error("Square Bookings API error:", error);
    return NextResponse.json({ error: "Failed to fetch available times" }, { status: 500 });
  }
}
