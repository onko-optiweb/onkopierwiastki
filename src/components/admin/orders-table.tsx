'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconTrash, IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type Order = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panelType: string;
  panelTier: string;
  isOnline: boolean;
  price: number;
  discount: number;
  status: string;
  createdAt: string;
  facilityName: string | null;
};

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  PROCESSING: 'bg-blue-50 text-blue-700',
  COMPLETED: 'bg-emerald-50 text-emerald-700',
  CANCELLED: 'bg-red-50 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Oczekuje',
  PAID: 'Opłacone',
  PROCESSING: 'W realizacji',
  COMPLETED: 'Zrealizowane',
  CANCELLED: 'Anulowane',
  REFUNDED: 'Zwrócone',
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === orders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(orders.map((o) => o.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Usunąć ${selected.size} zamówień? Tej operacji nie można cofnąć.`)) return;

    setDeleting(true);
    try {
      const res = await fetch('/api/admin/orders/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      if (res.ok) {
        setSelected(new Set());
        router.refresh();
      }
    } catch {
      alert('Błąd usuwania zamówień');
    }
    setDeleting(false);
  };

  return (
    <>
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span className="text-sm text-red-700 font-medium">Zaznaczono: {selected.size}</span>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {deleting ? <IconLoader2 size={14} className="animate-spin" /> : <IconTrash size={14} />}
            Usuń zaznaczone
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && selected.size === orders.length}
                    onChange={toggleAll}
                    className="rounded border-[#EEEFFD]"
                  />
                </th>
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
                    <input
                      type="checkbox"
                      checked={selected.has(order.id)}
                      onChange={() => toggleOne(order.id)}
                      className="rounded border-[#EEEFFD]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/zamowienia/${order.id}`} className="hover:text-[#5B65DC]">
                      <p className="font-medium text-[#122056]">{order.firstName} {order.lastName}</p>
                      <p className="text-[#8a8fa6] text-xs">{order.email}</p>
                      <p className="text-[#8a8fa6] text-xs">{order.phone}</p>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#122056] whitespace-nowrap">
                    {order.panelType === 'PROFILAKTYKA' ? 'Profil.' : 'Onkol.'} {order.panelTier.toLowerCase()}
                  </td>
                  <td className="px-4 py-3 text-[#8a8fa6] text-xs">
                    {order.isOnline ? 'Online' : order.facilityName || '—'}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#122056] whitespace-nowrap">
                    {((order.price - order.discount) / 100).toFixed(0)} zł
                    {order.discount > 0 && (
                      <span className="text-emerald-600 text-[11px] ml-1">(-{(order.discount / 100).toFixed(0)})</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[order.status] || ''}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8a8fa6] text-xs whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
