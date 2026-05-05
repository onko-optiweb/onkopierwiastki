import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const facilities = await prisma.facility.findMany({
    where: { active: true },
    orderBy: { city: "asc" },
    select: {
      id: true,
      name: true,
      address: true,
      postalCode: true,
      city: true,
      phone: true,
      hours: true,
      lat: true,
      lng: true,
    },
  });

  return NextResponse.json(facilities);
}
