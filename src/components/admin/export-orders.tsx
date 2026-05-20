'use client';

import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';

export function ExportOrders() {
  const now = new Date();
  const [month, setMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);

  const months: { value: string; label: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
    months.push({ value: val, label });
  }

  const download = () => {
    window.location.href = `/api/admin/orders/export?month=${month}`;
  };

  const downloadAll = () => {
    window.location.href = `/api/admin/orders/export`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-[#EEEFFD] text-xs text-[#122056] bg-white focus:border-[#5B65DC] outline-none"
      >
        {months.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <button
        onClick={download}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122056] text-white text-xs font-semibold hover:bg-[#1a2d6e] transition-colors"
      >
        <IconDownload size={14} /> Eksport CSV
      </button>
      <button
        onClick={downloadAll}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#122056] text-xs font-semibold border border-[#EEEFFD] hover:border-[#5B65DC] transition-colors"
      >
        Wszystkie
      </button>
    </div>
  );
}
