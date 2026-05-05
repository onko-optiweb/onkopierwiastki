'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const transitions: Record<string, { label: string; next: string; color: string }[]> = {
  PENDING: [
    { label: "Oznacz jako opłacone", next: "PAID", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
    { label: "Anuluj", next: "CANCELLED", color: "bg-red-50 text-red-700 hover:bg-red-100" },
  ],
  PAID: [
    { label: "W realizacji", next: "PROCESSING", color: "bg-blue-600 text-white hover:bg-blue-700" },
    { label: "Zrealizowane", next: "COMPLETED", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
  ],
  PROCESSING: [
    { label: "Zrealizowane", next: "COMPLETED", color: "bg-emerald-600 text-white hover:bg-emerald-700" },
  ],
  COMPLETED: [],
  CANCELLED: [],
  REFUNDED: [],
};

export function OrderStatusActions({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const actions = transitions[currentStatus] || [];
  if (actions.length === 0) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (!confirm(`Czy na pewno chcesz zmienić status na "${newStatus}"?`)) return;
    setLoading(true);

    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="font-bold text-[#122056] text-sm mb-3">Zmień status</h2>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.next}
            onClick={() => handleStatusChange(action.next)}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${action.color}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
