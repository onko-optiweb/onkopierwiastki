import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();

  const facility = await prisma.facility.create({
    data: {
      name: data.name,
      address: data.address,
      postalCode: data.postalCode || '',
      city: data.city,
      phone: data.phone,
      hours: data.hours,
      lat: data.lat,
      lng: data.lng,
      notes: data.notes || '',
    },
  });

  return NextResponse.json({ success: true, data: facility });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await request.json();

  await prisma.facility.update({
    where: { id },
    data,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, permanent } = await request.json();

  if (permanent) {
    await prisma.facility.delete({ where: { id } });
  } else {
    await prisma.facility.update({
      where: { id },
      data: { active: false },
    });
  }

  return NextResponse.json({ success: true });
}
