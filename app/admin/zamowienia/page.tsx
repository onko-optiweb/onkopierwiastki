import { prisma } from "@/src/lib/prisma";
import { autoCancelStaleOrders } from "@/src/actions/orders";
import Link from "next/link";
import { OrdersTable } from "@/src/components/admin/orders-table";

const statusLabels: Record<string, string> = {
  PENDING: "Oczekuje",
  PAID: "Opłacone",
  PROCESSING: "W realizacji",
  COMPLETED: "Zrealizowane",
  CANCELLED: "Anulowane",
  REFUNDED: "Zwrócone",
};

const allStatuses = ["ALL", "PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED", "REFUNDED"];

export default async function ZamowieniaPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;

  // Auto-anuluj zamówienia PENDING starsze niż 1h
  await autoCancelStaleOrders();

  const where = filterStatus && filterStatus !== "ALL"
    ? { status: filterStatus as any }
    : {};

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { facility: true, promoCode: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Zamówienia</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Zarządzaj zamówieniami badań</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {allStatuses.map((s) => (
          <Link
            key={s}
            href={s === "ALL" ? "/admin/zamowienia" : `/admin/zamowienia?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              (filterStatus === s || (!filterStatus && s === "ALL"))
                ? "bg-[#122056] text-white"
                : "bg-[#EEEFFD] text-[#122056] hover:bg-[#e0e2f8]"
            }`}
          >
            {s === "ALL" ? "Wszystkie" : statusLabels[s] || s}
          </Link>
        ))}
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-[#8a8fa6] text-sm">
          Brak zamówień{filterStatus && filterStatus !== "ALL" ? ` ze statusem "${statusLabels[filterStatus]}"` : ""}
        </div>
      ) : (
        <OrdersTable orders={orders.map((o) => ({
          id: o.id,
          firstName: o.firstName,
          lastName: o.lastName,
          email: o.email,
          phone: o.phone,
          panelType: o.panelType,
          panelTier: o.panelTier,
          isOnline: o.isOnline,
          price: o.price,
          discount: o.discount,
          status: o.status,
          createdAt: o.createdAt.toISOString(),
          facilityName: o.facility?.name || null,
        }))} />
      )}

      <p className="text-xs text-[#8a8fa6]">Łącznie: {orders.length} zamówień</p>
    </div>
  );
}
