import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  PENDING: "Oczekuje",
  PAID: "Opłacone",
  PROCESSING: "W realizacji",
  COMPLETED: "Zrealizowane",
  CANCELLED: "Anulowane",
  REFUNDED: "Zwrócone",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  PAID: "bg-emerald-50 text-emerald-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-600",
};

export default async function KlienciPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email: selectedEmail } = await searchParams;

  // Get all orders grouped by email
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { facility: true },
  });

  // Group by email
  const clientMap = new Map<string, {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    pesel: string;
    noPesel: boolean;
    orders: typeof orders;
    totalSpent: number;
    lastOrder: Date;
  }>();

  for (const order of orders) {
    const key = order.email.toLowerCase();
    const existing = clientMap.get(key);
    if (existing) {
      existing.orders.push(order);
      existing.totalSpent += order.price - order.discount;
      if (order.createdAt > existing.lastOrder) {
        existing.lastOrder = order.createdAt;
        existing.firstName = order.firstName;
        existing.lastName = order.lastName;
        existing.phone = order.phone;
        existing.address = order.address;
      }
    } else {
      clientMap.set(key, {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        pesel: order.pesel,
        noPesel: order.noPesel,
        orders: [order],
        totalSpent: order.price - order.discount,
        lastOrder: order.createdAt,
      });
    }
  }

  const clients = Array.from(clientMap.values()).sort(
    (a, b) => b.lastOrder.getTime() - a.lastOrder.getTime()
  );

  const selectedClient = selectedEmail
    ? clientMap.get(selectedEmail.toLowerCase())
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Klienci</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">
          {clients.length} {clients.length === 1 ? "klient" : "klientów"} &middot; {orders.length} zamówień łącznie
        </p>
      </div>

      {selectedClient ? (
        /* Detail view */
        <div className="space-y-6 max-w-3xl">
          <Link href="/admin/klienci" className="text-[#8a8fa6] hover:text-[#122056] text-sm">
            &larr; Wszyscy klienci
          </Link>

          <div className="bg-white rounded-xl p-6">
            <h2 className="font-bold text-[#122056] text-lg mb-4">
              {selectedClient.firstName} {selectedClient.lastName}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#8a8fa6] text-xs">E-mail</p>
                <p className="text-[#122056] font-medium">{selectedClient.email}</p>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Telefon</p>
                <p className="text-[#122056] font-medium">{selectedClient.phone}</p>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Adres</p>
                <p className="text-[#122056] font-medium">{selectedClient.address}</p>
              </div>
              {!selectedClient.noPesel && selectedClient.pesel && (
                <div>
                  <p className="text-[#8a8fa6] text-xs">PESEL</p>
                  <p className="text-[#122056] font-medium">{selectedClient.pesel}</p>
                </div>
              )}
              <div>
                <p className="text-[#8a8fa6] text-xs">Łącznie wydane</p>
                <p className="text-[#122056] font-bold">{(selectedClient.totalSpent / 100).toFixed(0)} zł</p>
              </div>
              <div>
                <p className="text-[#8a8fa6] text-xs">Zamówienia</p>
                <p className="text-[#122056] font-bold">{selectedClient.orders.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#122056] text-sm mb-3">Historia zamówień</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                      <th className="px-4 py-3 font-medium">Data</th>
                      <th className="px-4 py-3 font-medium">Panel</th>
                      <th className="px-4 py-3 font-medium">Placówka</th>
                      <th className="px-4 py-3 font-medium">Kwota</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClient.orders.map((order) => (
                      <tr key={order.id} className="border-b border-[#EEEFFD] last:border-0 hover:bg-[#FAFAFD]">
                        <td className="px-4 py-3 text-[#122056] whitespace-nowrap">
                          <Link href={`/admin/zamowienia/${order.id}`} className="hover:text-[#5B65DC]">
                            {order.createdAt.toLocaleDateString("pl-PL")}
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
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[order.status] || ""}`}>
                            {statusLabels[order.status] || order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List view */
        <>
          {clients.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-[#8a8fa6] text-sm">Brak klientów</div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                      <th className="px-4 py-3 font-medium">Klient</th>
                      <th className="px-4 py-3 font-medium">E-mail</th>
                      <th className="px-4 py-3 font-medium">Telefon</th>
                      <th className="px-4 py-3 font-medium">Zamówienia</th>
                      <th className="px-4 py-3 font-medium">Wydane</th>
                      <th className="px-4 py-3 font-medium">Ostatnie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c.email} className="border-b border-[#EEEFFD] last:border-0 hover:bg-[#FAFAFD]">
                        <td className="px-4 py-3">
                          <Link href={`/admin/klienci?email=${encodeURIComponent(c.email)}`} className="hover:text-[#5B65DC]">
                            <p className="font-medium text-[#122056]">{c.firstName} {c.lastName}</p>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-[#8a8fa6] text-xs">{c.email}</td>
                        <td className="px-4 py-3 text-[#8a8fa6] text-xs whitespace-nowrap">{c.phone}</td>
                        <td className="px-4 py-3 text-[#122056] font-medium">{c.orders.length}</td>
                        <td className="px-4 py-3 text-[#122056] font-medium whitespace-nowrap">
                          {(c.totalSpent / 100).toFixed(0)} zł
                        </td>
                        <td className="px-4 py-3 text-[#8a8fa6] text-xs whitespace-nowrap">
                          {c.lastOrder.toLocaleDateString("pl-PL")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
