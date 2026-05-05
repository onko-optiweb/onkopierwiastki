import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();

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
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await request.json();

  await prisma.promoCode.update({
    where: { id },
    data: {
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.maxUses !== undefined ? { maxUses: data.maxUses || null } : {}),
      ...(data.value !== undefined ? { value: data.value } : {}),
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();

  await prisma.promoCode.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
