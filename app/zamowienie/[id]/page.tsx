import { prisma } from "@/src/lib/prisma";
import { formatPrice } from "@/src/lib/format-price";
import { notFound } from "next/navigation";

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: "Oczekuje na płatność", color: "text-amber-700", bg: "bg-amber-50" },
  PAID: { label: "Opłacone", color: "text-emerald-700", bg: "bg-emerald-50" },
  PROCESSING: { label: "W realizacji", color: "text-blue-700", bg: "bg-blue-50" },
  COMPLETED: { label: "Zrealizowane", color: "text-emerald-700", bg: "bg-emerald-50" },
  CANCELLED: { label: "Anulowane", color: "text-red-700", bg: "bg-red-50" },
  REFUNDED: { label: "Zwrócone", color: "text-gray-700", bg: "bg-gray-50" },
};

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      facility: true,
      payments: { take: 1 },
    },
  });

  if (!order) notFound();

  const status = statusMap[order.status] || statusMap.PENDING;
  const finalPrice = order.price - order.discount;
  const panelName = `${order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${order.panelTier.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <a href="/" className="flex items-center gap-3 text-[#122056] hover:opacity-70 transition-opacity">
            <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-10" />
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
          Status zamówienia
        </h1>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 ${status.color} ${status.bg}`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          {status.label}
        </div>

        <div className="bg-white rounded-xl p-6 space-y-5">
          {/* Panel */}
          <div className="pb-4 border-b border-[#EEEFFD]">
            <p className="text-[#8a8fa6] text-xs mb-0.5">Panel badawczy</p>
            <p className="text-[#122056] font-bold text-sm">{panelName}</p>
            <p className="text-[#8a8fa6] text-xs mt-0.5">{order.elements}</p>
          </div>

          {/* Placówka */}
          <div className="pb-4 border-b border-[#EEEFFD]">
            <p className="text-[#8a8fa6] text-xs mb-0.5">Placówka</p>
            {order.isOnline ? (
              <p className="text-[#122056] font-bold text-sm">Zamówienie online — kurier</p>
            ) : order.facility ? (
              <>
                <p className="text-[#122056] font-bold text-sm">{order.facility.name}</p>
                <p className="text-[#8a8fa6] text-xs mt-0.5">{order.facility.address}</p>
              </>
            ) : (
              <p className="text-[#122056] font-bold text-sm">—</p>
            )}
          </div>

          {/* Dane klienta */}
          <div className="pb-4 border-b border-[#EEEFFD]">
            <p className="text-[#8a8fa6] text-xs mb-0.5">Dane klienta</p>
            <p className="text-[#122056] font-bold text-sm">{order.firstName} {order.lastName}</p>
            <p className="text-[#8a8fa6] text-xs mt-0.5">{order.email} &middot; {order.phone}</p>
          </div>

          {/* Cena */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#122056] font-bold text-base">Kwota</p>
              {order.discount > 0 && (
                <p className="text-[#8a8fa6] text-xs">Rabat: -{formatPrice(order.discount)}</p>
              )}
            </div>
            <p className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">
              {formatPrice(finalPrice)}
            </p>
          </div>

          {/* Data */}
          <div className="pt-4 border-t border-[#EEEFFD] flex justify-between text-xs text-[#8a8fa6]">
            <span>Złożone: {order.createdAt.toLocaleDateString("pl-PL")}</span>
            {order.paidAt && <span>Opłacone: {order.paidAt.toLocaleDateString("pl-PL")}</span>}
          </div>
        </div>

        {/* Skontaktuj się z placówką — po opłaceniu */}
        {(order.status === "PAID" || order.status === "PROCESSING" || order.status === "COMPLETED") && order.facility && !order.isOnline && (
          <div className="mt-6 bg-[#5B65DC]/5 border border-[#5B65DC]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#122056] text-base mb-1">Umów się na pobranie krwi</h2>
            <p className="text-[#8a8fa6] text-sm mb-4">
              Zadzwoń do placówki podanej poniżej i umów się na termin pobrania krwi. Powołaj się na badanie z <strong className="text-[#122056]">onkopierwiastki.pl</strong> i podaj swoje imię oraz nazwisko.
            </p>
            <div className="bg-white rounded-xl p-5 space-y-3">
              <div>
                <p className="text-[#8a8fa6] text-xs">Placówka</p>
                <p className="text-[#122056] font-bold text-sm">{order.facility.name}</p>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Adres</p>
                <p className="text-[#122056] font-medium text-sm">
                  {order.facility.address}, {order.facility.postalCode} {order.facility.city}
                </p>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Telefon</p>
                <a href={`tel:${order.facility.phone.replace(/\s/g, '')}`} className="text-[#5B65DC] font-bold text-lg hover:underline">
                  {order.facility.phone}
                </a>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Godziny</p>
                <p className="text-[#122056] font-medium text-sm">{order.facility.hours}</p>
              </div>
            </div>
          </div>
        )}

        {/* Online — informacja po opłaceniu */}
        {(order.status === "PAID" || order.status === "PROCESSING") && order.isOnline && (
          <div className="mt-6 bg-[#5B65DC]/5 border border-[#5B65DC]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#122056] text-base mb-1">Co dalej?</h2>
            <p className="text-[#8a8fa6] text-sm">
              Skontaktujemy się z Tobą mailowo z instrukcjami dotyczącymi pobrania i wysyłki materiału.
            </p>
          </div>
        )}

        {/* Potwierdzenie do pobrania */}
        {order.status !== "PENDING" && order.status !== "CANCELLED" && (
          <div className="mt-6 text-center">
            <a
              href={`/zamowienie/${order.id}/potwierdzenie`}
              className="inline-flex items-center gap-2 bg-[#EEEFFD] text-[#122056] text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#e0e2f8] transition-colors"
            >
              Pobierz potwierdzenie zamówienia
            </a>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#5B65DC] text-sm font-semibold hover:underline"
          >
            Wróć na stronę główną
          </a>
        </div>
      </main>
    </div>
  );
}
