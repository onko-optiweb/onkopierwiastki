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
  code: z.string().min(2).max(50).optional(),
  type: z.enum(["PERCENT", "FIXED"]).optional(),
  source: z.string().max(200).nullable().optional(),
  validUntil: z.string().nullable().optional(),
  usedCount: z.number().int().min(0).optional(),
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

  const updateData: Record<string, unknown> = {};
  if (parsed.data.active !== undefined) updateData.active = parsed.data.active;
  if (parsed.data.maxUses !== undefined) updateData.maxUses = parsed.data.maxUses || null;
  if (parsed.data.value !== undefined) updateData.value = parsed.data.value;
  if (parsed.data.code) updateData.code = parsed.data.code.toUpperCase();
  if (parsed.data.type) updateData.type = parsed.data.type;
  if (parsed.data.source !== undefined) updateData.source = parsed.data.source || null;
  if (parsed.data.validUntil !== undefined) updateData.validUntil = parsed.data.validUntil ? new Date(parsed.data.validUntil) : null;
  if (parsed.data.usedCount !== undefined) updateData.usedCount = parsed.data.usedCount;

  await prisma.promoCode.update({
    where: { id },
    data: updateData,
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
