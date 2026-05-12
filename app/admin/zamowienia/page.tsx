import { prisma } from "@/src/lib/prisma";
import { autoCancelStaleOrders } from "@/src/actions/orders";
import Link from "next/link";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  PAID: "bg-emerald-50 text-emerald-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-600",
};

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
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                  <th className="px-4 py-3 font-medium">Klient</th>
                  <th className="px-4 py-3 font-medium">Panel</th>
                  <th className="px-4 py-3 font-medium">Placówka</th>
                  <th className="px-4 py-3 font-medium">Kwota</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#EEEFFD] last:border-0 hover:bg-[#FAFAFD]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/zamowienia/${order.id}`} className="hover:text-[#5B65DC]">
                        <p className="font-medium text-[#122056]">{order.firstName} {order.lastName}</p>
                        <p className="text-[#8a8fa6] text-xs">{order.email}</p>
                        <p className="text-[#8a8fa6] text-xs">{order.phone}</p>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#122056] whitespace-nowrap">
                      {order.panelType === "PROFILAKTYKA" ? "Profil." : "Onkol."} {order.panelTier.toLowerCase()}
                    </td>
                    <td className="px-4 py-3 text-[#8a8fa6] text-xs">
                      {order.isOnline ? "Online" : order.facility?.name || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#122056] whitespace-nowrap">
                      {((order.price - order.discount) / 100).toFixed(0)} zł
                      {order.discount > 0 && (
                        <span className="text-emerald-600 text-[11px] ml-1">(-{(order.discount / 100).toFixed(0)})</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[order.status] || ""}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8a8fa6] text-xs whitespace-nowrap">
                      {order.createdAt.toLocaleDateString("pl-PL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-[#8a8fa6]">Łącznie: {orders.length} zamówień</p>
    </div>
  );
}
