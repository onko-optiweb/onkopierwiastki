import { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: 'Potwierdzenie zamówienia',
  robots: { index: false, follow: false },
};

export default async function PotwierdzeniePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { facility: true },
  });

  if (!order) notFound();
  if (order.status === "PENDING" || order.status === "CANCELLED") notFound();

  const finalPrice = ((order.price - order.discount) / 100).toFixed(2);
  const panelName = `${order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${order.panelTier.toLowerCase()}`;
  const paidDate = order.paidAt
    ? order.paidAt.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })
    : order.createdAt.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      {/* Print button — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-neutral-100 px-4 sm:px-6 py-3 flex items-center justify-between max-w-[800px] mx-auto">
        <a href={`/zamowienie/${id}`} className="text-[#8a8fa6] text-sm hover:text-[#122056]">&larr; Wróć</a>
        <PrintButton />
      </div>

      {/* Document — A4 styled */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-10 print:px-0 print:py-0">
        <div className="bg-white rounded-xl print:rounded-none p-8 sm:p-12 print:p-[2cm] print:shadow-none shadow-sm">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-12 mb-3" />
              <p className="text-[#8a8fa6] text-[11px]">Innowacyjna Medycyna sp. z o.o.</p>
              <p className="text-[#8a8fa6] text-[11px]">ul. Akacjowa 2, 71-253 Szczecin</p>
              <p className="text-[#8a8fa6] text-[11px]">NIP: 8522608584</p>
            </div>
            <div className="text-right">
              <p className="text-[#8a8fa6] text-[11px]">Data wystawienia</p>
              <p className="text-[#122056] font-medium text-sm">{paidDate}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center font-bold text-[#122056] text-xl mb-8 uppercase tracking-wide">
            Potwierdzenie zamówienia badania
          </h1>

          {/* Content */}
          <div className="text-sm text-[#3a3f5c] leading-relaxed space-y-4 mb-10">
            <p>
              Niniejszym potwierdzamy, że:
            </p>

            <div className="bg-[#FAFAFD] print:bg-transparent print:border print:border-gray-200 rounded-lg p-5 space-y-2">
              <div className="grid grid-cols-[120px_1fr] gap-1">
                <span className="text-[#8a8fa6] text-xs">Imię i nazwisko:</span>
                <span className="font-semibold text-[#122056]">{order.firstName} {order.lastName}</span>
              </div>
              {!order.noPesel && order.pesel && (
                <div className="grid grid-cols-[120px_1fr] gap-1">
                  <span className="text-[#8a8fa6] text-xs">PESEL:</span>
                  <span className="font-semibold text-[#122056]">{order.pesel}</span>
                </div>
              )}
              <div className="grid grid-cols-[120px_1fr] gap-1">
                <span className="text-[#8a8fa6] text-xs">Adres:</span>
                <span className="font-semibold text-[#122056]">{order.address}</span>
              </div>
            </div>

            <p>
              dokonał/a w dniu <strong>{paidDate}</strong> zapłaty za badanie diagnostyczne w ramach serwisu badamypierwiastki.pl.
            </p>
          </div>

          {/* Order details */}
          <table className="w-full text-sm border-collapse mb-10">
            <thead>
              <tr className="border-b-2 border-[#122056] text-left">
                <th className="py-2 text-[#122056] font-semibold">Opis</th>
                <th className="py-2 text-[#122056] font-semibold text-right">Kwota</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#EEEFFD]">
                <td className="py-3">
                  <p className="font-medium text-[#122056]">Panel badawczy: {panelName}</p>
                  <p className="text-[#8a8fa6] text-xs mt-0.5">{order.elements}</p>
                  <p className="text-[#8a8fa6] text-xs">Materiał: {order.material}</p>
                </td>
                <td className="py-3 text-right font-medium text-[#122056]">
                  {(order.price / 100).toFixed(2)} zł
                </td>
              </tr>
              {order.discount > 0 && (
                <tr className="border-b border-[#EEEFFD]">
                  <td className="py-3 text-emerald-600">Rabat</td>
                  <td className="py-3 text-right text-emerald-600">-{(order.discount / 100).toFixed(2)} zł</td>
                </tr>
              )}
              <tr>
                <td className="py-3 font-bold text-[#122056]">Do zapłaty</td>
                <td className="py-3 text-right font-bold text-[#122056] text-base">{finalPrice} zł</td>
              </tr>
            </tbody>
          </table>

          {/* Facility */}
          {order.facility && !order.isOnline && (
            <div className="mb-10">
              <p className="text-xs text-[#8a8fa6] mb-1">Placówka pobrania:</p>
              <p className="text-sm text-[#122056] font-medium">{order.facility.name}</p>
              <p className="text-sm text-[#3a3f5c]">{order.facility.address}, {order.facility.postalCode} {order.facility.city}</p>
              <p className="text-sm text-[#3a3f5c]">Tel: {order.facility.phone}</p>
            </div>
          )}

          {/* Note */}
          <div className="border-t border-[#EEEFFD] pt-6 text-[11px] text-[#8a8fa6] space-y-1">
            <p>Badanie diagnostyczne zwolnione z VAT na podstawie art. 43 ust. 1 pkt 18 ustawy o podatku od towarów i usług.</p>
            <p>Niniejszy dokument stanowi potwierdzenie złożenia i opłacenia zamówienia. Nie jest fakturą VAT.</p>
            <p>Numer zamówienia: {order.id}</p>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-[#EEEFFD] flex items-center justify-between text-[10px] text-[#8a8fa6]">
            <span>www.badamypierwiastki.pl</span>
            <span>kontakt@onkopierwiastki.pl</span>
            <span>Innowacyjna Medycyna sp. z o.o.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
