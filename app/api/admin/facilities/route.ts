import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

const facilitySchema = z.object({
  name: z.string().min(1).max(255),
  address: z.string().min(3).max(255),
  postalCode: z.string().max(10).default(""),
  city: z.string().min(1).max(100),
  phone: z.string().max(50).default(""),
  hours: z.string().max(200).default(""),
  lat: z.number().min(-90).max(90).default(0),
  lng: z.number().min(-180).max(180).default(0),
  email: z.string().max(255).default(""),
  notes: z.string().max(1000).default(""),
  supportsBlood: z.boolean().default(true),
  supportsSerum: z.boolean().default(true),
});

const facilityUpdateSchema = facilitySchema.partial();

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const raw = await request.json();
  const parsed = facilitySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  const facility = await prisma.facility.create({ data: parsed.data });
  return NextResponse.json({ success: true, data: facility });
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id, ...raw } = await request.json();
  if (!id || typeof id !== "number") {
    return NextResponse.json({ error: "Brak ID placówki" }, { status: 400 });
  }

  const parsed = facilityUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  await prisma.facility.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id, permanent } = await request.json();
  if (!id || typeof id !== "number") {
    return NextResponse.json({ error: "Brak ID placówki" }, { status: 400 });
  }

  if (permanent) {
    await prisma.facility.delete({ where: { id } });
  } else {
    await prisma.facility.update({ where: { id }, data: { active: false } });
  }

  return NextResponse.json({ success: true });
}
