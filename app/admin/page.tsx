import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { ShoppingCart, MapPin, Tag, CreditCard, Clock, CheckCircle } from "lucide-react";

export default async function AdminDashboard() {
  const [orderStats, facilityCount, promoCount] = await Promise.all([
    prisma.order.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.facility.count({ where: { active: true } }),
    prisma.promoCode.count({ where: { active: true } }),
  ]);

  const totalOrders = orderStats.reduce((sum, s) => sum + s._count, 0);
  const pendingOrders = orderStats.find((s) => s.status === "PENDING")?._count || 0;
  const paidOrders = orderStats.find((s) => s.status === "PAID")?._count || 0;
  const completedOrders = orderStats.find((s) => s.status === "COMPLETED")?._count || 0;

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { facility: true },
  });

  const stats = [
    { label: "Wszystkie zamówienia", value: totalOrders, icon: ShoppingCart, href: "/admin/zamowienia", color: "bg-[#5B65DC]/10 text-[#5B65DC]" },
    { label: "Oczekujące", value: pendingOrders, icon: Clock, href: "/admin/zamowienia?status=PENDING", color: "bg-amber-50 text-amber-600" },
    { label: "Opłacone", value: paidOrders, icon: CreditCard, href: "/admin/zamowienia?status=PAID", color: "bg-emerald-50 text-emerald-600" },
    { label: "Zrealizowane", value: completedOrders, icon: CheckCircle, href: "/admin/zamowienia?status=COMPLETED", color: "bg-blue-50 text-blue-600" },
  ];

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Dashboard</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Przegląd zamówień i statystyk</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-[#122056]">{stat.value}</p>
            <p className="text-xs text-[#8a8fa6] mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/placowki" className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-[#EEEFFD] flex items-center justify-center">
            <MapPin size={20} className="text-[#5B65DC]" />
          </div>
          <div>
            <p className="font-bold text-[#122056] text-sm">Placówki</p>
            <p className="text-xs text-[#8a8fa6]">{facilityCount} aktywnych</p>
          </div>
        </Link>
        <Link href="/admin/kody-rabatowe" className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-[#EEEFFD] flex items-center justify-center">
            <Tag size={20} className="text-[#5B65DC]" />
          </div>
          <div>
            <p className="font-bold text-[#122056] text-sm">Kody rabatowe</p>
            <p className="text-xs text-[#8a8fa6]">{promoCount} aktywnych</p>
          </div>
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#122056]">Ostatnie zamówienia</h2>
          <Link href="/admin/zamowienia" className="text-xs text-[#5B65DC] font-semibold hover:underline">
            Zobacz wszystkie
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-[#8a8fa6] text-sm">
            Brak zamówień
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                    <th className="px-4 py-3 font-medium">Klient</th>
                    <th className="px-4 py-3 font-medium">Panel</th>
                    <th className="px-4 py-3 font-medium">Kwota</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#EEEFFD] last:border-0 hover:bg-[#FAFAFD]">
                      <td className="px-4 py-3">
                        <Link href={`/admin/zamowienia/${order.id}`} className="hover:text-[#5B65DC]">
                          <p className="font-medium text-[#122056]">{order.firstName} {order.lastName}</p>
                          <p className="text-[#8a8fa6] text-xs">{order.email}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[#122056]">
                        {order.panelType === "PROFILAKTYKA" ? "Profil." : "Onkol."} {order.panelTier.toLowerCase()}
                      </td>
                      <td className="px-4 py-3 font-medium text-[#122056]">
                        {((order.price - order.discount) / 100).toFixed(0)} zł
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[order.status] || ""}`}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8a8fa6] text-xs">
                        {order.createdAt.toLocaleDateString("pl-PL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
