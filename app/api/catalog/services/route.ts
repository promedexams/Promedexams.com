import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

import { AppointmentOption } from "@/lib/types/api/appointment-option";

export async function GET(request: NextRequest): Promise<NextResponse<AppointmentOption[] | { error: string }>> {
  // Initialize Square client
  const client = new SquareClient({
    token: process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
  });

  try {
    const response = await client.catalog.list({ types: "ITEM" });

    const services: AppointmentOption[] = response.data.map((item: any) => ({
      id: item.id,
      name: item.itemData.name,
    }));

    return NextResponse.json(services);
  } catch (error) {
    console.error("Square Catalog API error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
