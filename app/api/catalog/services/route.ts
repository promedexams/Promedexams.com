import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

import { ServiceTypeResponse } from "@/lib/types/api/services";

export async function GET(): Promise<NextResponse<ServiceTypeResponse[] | { error: string }>> {
  const client = new SquareClient({
    token: process.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
  });

  try {
    const response = await client.catalog.list({ types: "ITEM" });

    const services = response.data.map((item: any) => ({
      id: item.itemData.variations[0].id,
      name: item.itemData.name,
      variationVersion: item.itemData.variations[0].version,
    }));

    const formattedServices = services.map((service) => ({
      ...service,
      variationVersion: service.variationVersion ? service.variationVersion.toString() : undefined,
    }));

    return NextResponse.json(formattedServices);
  } catch (error) {
    console.error("Square Catalog API error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
