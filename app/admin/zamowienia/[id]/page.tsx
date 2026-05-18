import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { OrderStatusActions } from "@/src/components/admin/order-status-actions";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  PAID: "bg-emerald-50 text-emerald-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<string, string> = {
  PENDING: "Oczekuje na płatność",
  PAID: "Opłacone",
  PROCESSING: "W realizacji",
  COMPLETED: "Zrealizowane",
  CANCELLED: "Anulowane",
  REFUNDED: "Zwrócone",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { facility: true, promoCode: true, payments: { take: 1 } },
  });

  if (!order) notFound();

  const finalPrice = (order.price - order.discount) / 100;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/zamowienia" className="text-[#8a8fa6] hover:text-[#122056] text-sm">
          &larr; Zamówienia
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#122056]">
            {order.firstName} {order.lastName}
          </h1>
          <p className="text-sm text-[#8a8fa6] mt-0.5">ID: {order.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || ""}`}>
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      {/* Dane klienta */}
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-[#122056] text-sm">Dane klienta</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#8a8fa6] text-xs">Imię i nazwisko</p>
            <p className="text-[#122056] font-medium">{order.firstName} {order.lastName}</p>
          </div>
          <div>
            <p className="text-[#8a8fa6] text-xs">Email</p>
            <p className="text-[#122056] font-medium">{order.email}</p>
          </div>
          <div>
            <p className="text-[#8a8fa6] text-xs">Telefon</p>
            <p className="text-[#122056] font-medium">{order.phone}</p>
          </div>
          <div>
            <p className="text-[#8a8fa6] text-xs">Adres</p>
            <p className="text-[#122056] font-medium">{order.address}</p>
          </div>
        </div>
      </div>

      {/* Badanie */}
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-[#122056] text-sm">Badanie</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#8a8fa6] text-xs">Panel</p>
            <p className="text-[#122056] font-medium">
              {order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — {order.panelTier.toLowerCase()}
            </p>
          </div>
          <div>
            <p className="text-[#8a8fa6] text-xs">Materiał</p>
            <p className="text-[#122056] font-medium">{order.material}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[#8a8fa6] text-xs">Pierwiastki</p>
            <p className="text-[#122056] font-medium">{order.elements}</p>
          </div>
          <div>
            <p className="text-[#8a8fa6] text-xs">Placówka</p>
            <p className="text-[#122056] font-medium">
              {order.isOnline ? "Zamówienie online — kurier" : order.facility?.name || "—"}
            </p>
            {order.facility && (
              <p className="text-[#8a8fa6] text-xs">{order.facility.address}, {order.facility.city}</p>
            )}
          </div>
        </div>
      </div>

      {/* Płatność */}
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-[#122056] text-sm">Płatność</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#8a8fa6] text-xs">Cena</p>
            <p className="text-[#122056] font-medium">{(order.price / 100).toFixed(0)} zł</p>
          </div>
          {order.discount > 0 && (
            <div>
              <p className="text-[#8a8fa6] text-xs">Rabat</p>
              <p className="text-emerald-600 font-medium">
                -{(order.discount / 100).toFixed(0)} zł
                {order.promoCode && <span className="text-[#8a8fa6] text-xs ml-1">({order.promoCode.code})</span>}
              </p>
            </div>
          )}
          <div>
            <p className="text-[#8a8fa6] text-xs">Do zapłaty</p>
            <p className="text-[#122056] font-bold text-lg">{finalPrice.toFixed(0)} zł</p>
          </div>
          {order.payuOrderId && (
            <div>
              <p className="text-[#8a8fa6] text-xs">PayU ID</p>
              <p className="text-[#122056] font-mono text-xs">{order.payuOrderId}</p>
            </div>
          )}
          <div>
            <p className="text-[#8a8fa6] text-xs">Złożone</p>
            <p className="text-[#122056] font-medium">{order.createdAt.toLocaleString("pl-PL")}</p>
          </div>
          {order.paidAt && (
            <div>
              <p className="text-[#8a8fa6] text-xs">Opłacone</p>
              <p className="text-[#122056] font-medium">{order.paidAt.toLocaleString("pl-PL")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status actions */}
      <OrderStatusActions orderId={order.id} currentStatus={order.status} hasFacilityEmail={!!order.facility?.email} />
    </div>
  );
}
