import { prisma } from "@/src/lib/prisma";
import { PromoCodesManager } from "@/src/components/admin/promo-codes-manager";

export default async function KodyRabatowePage() {
  const [codes, promoOrders] = await Promise.all([
    prisma.promoCode.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true } } },
    }),
    prisma.order.findMany({
      where: { promoCodeId: { not: null } },
      select: {
        promoCodeId: true,
        discount: true,
        createdAt: true,
        promoCode: { select: { code: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serialized = codes.map((c) => ({
    id: c.id,
    code: c.code,
    type: c.type,
    value: c.value,
    maxUses: c.maxUses,
    usedCount: c.usedCount,
    active: c.active,
    source: c.source,
    validFrom: c.validFrom.toISOString(),
    validUntil: c.validUntil?.toISOString() || null,
    ordersCount: c._count.orders,
  }));

  // Build monthly usage stats: { "2026-05": { "RABAT10": { count: 3, totalDiscount: 6000 }, ... }, ... }
  const monthlyStats: Record<string, Record<string, { count: number; totalDiscount: number }>> = {};

  for (const o of promoOrders) {
    const month = o.createdAt.toISOString().slice(0, 7); // "2026-05"
    const code = o.promoCode?.code || "?";
    if (!monthlyStats[month]) monthlyStats[month] = {};
    if (!monthlyStats[month][code]) monthlyStats[month][code] = { count: 0, totalDiscount: 0 };
    monthlyStats[month][code].count++;
    monthlyStats[month][code].totalDiscount += o.discount;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Kody rabatowe</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Twórz i zarządzaj kodami rabatowymi</p>
      </div>
      <PromoCodesManager codes={serialized} monthlyStats={monthlyStats} />
    </div>
  );
}
