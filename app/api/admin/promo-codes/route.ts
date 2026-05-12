import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

const promoCodeSchema = z.object({
  code: z.string().min(2).max(50),
  type: z.enum(["PERCENT", "FIXED"]),
  value: z.number().int().positive().max(10000000),
  maxUses: z.number().int().positive().nullable().optional(),
  source: z.string().max(200).nullable().optional(),
  validUntil: z.string().nullable().optional(),
});

const promoCodeUpdateSchema = z.object({
  active: z.boolean().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  value: z.number().int().positive().max(10000000).optional(),
});

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const raw = await request.json();
  const parsed = promoCodeSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  const data = parsed.data;
  const code = await prisma.promoCode.create({
    data: {
      code: data.code.toUpperCase(),
      type: data.type,
      value: data.value,
      maxUses: data.maxUses || null,
      source: data.source || null,
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
    },
  });

  return NextResponse.json({ success: true, data: code });
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id, ...raw } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Brak ID kodu" }, { status: 400 });
  }

  const parsed = promoCodeUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  await prisma.promoCode.update({
    where: { id },
    data: {
      ...(parsed.data.active !== undefined ? { active: parsed.data.active } : {}),
      ...(parsed.data.maxUses !== undefined ? { maxUses: parsed.data.maxUses || null } : {}),
      ...(parsed.data.value !== undefined ? { value: parsed.data.value } : {}),
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Brak ID kodu" }, { status: 400 });
  }

  await prisma.promoCode.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
