import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { ids } = await request.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  // Decrement promo code usage for orders that used one
  const orders = await prisma.order.findMany({
    where: { id: { in: ids } },
    select: { promoCodeId: true },
  });

  const promoIds = orders
    .map((o) => o.promoCodeId)
    .filter((id): id is string => !!id);

  // Count occurrences per promo code
  const promoCounts = new Map<string, number>();
  for (const id of promoIds) {
    promoCounts.set(id, (promoCounts.get(id) || 0) + 1);
  }

  // Decrement each promo code
  for (const [promoId, count] of promoCounts) {
    await prisma.promoCode.update({
      where: { id: promoId },
      data: { usedCount: { decrement: count } },
    });
  }

  // Delete payments then orders
  await prisma.payment.deleteMany({ where: { orderId: { in: ids } } });
  await prisma.order.deleteMany({ where: { id: { in: ids } } });

  return NextResponse.json({ deleted: ids.length });
}
