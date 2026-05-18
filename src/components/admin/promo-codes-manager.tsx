'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, BarChart3, Pencil, X, Check } from 'lucide-react';

interface PromoCode {
  id: string;
  code: string;
  type: string;
  value: number;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  source: string | null;
  validFrom: string;
  validUntil: string | null;
  ordersCount: number;
}

type MonthlyStats = Record<string, Record<string, { count: number; totalDiscount: number }>>;

const monthNames: Record<string, string> = {
  '01': 'Styczeń', '02': 'Luty', '03': 'Marzec', '04': 'Kwiecień',
  '05': 'Maj', '06': 'Czerwiec', '07': 'Lipiec', '08': 'Sierpień',
  '09': 'Wrzesień', '10': 'Październik', '11': 'Listopad', '12': 'Grudzień',
};

function formatMonth(key: string) {
  const [year, month] = key.split('-');
  return `${monthNames[month] || month} ${year}`;
}

export function PromoCodesManager({ codes, monthlyStats = {} }: { codes: PromoCode[]; monthlyStats?: MonthlyStats }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'PERCENT' as 'PERCENT' | 'FIXED', value: '', maxUses: '', source: '', validUntil: '', unlimited: true, noExpiry: true });
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ code: '', type: 'PERCENT' as 'PERCENT' | 'FIXED', value: '', maxUses: '', source: '', validUntil: '', usedCount: '' });
  const router = useRouter();

  const startEdit = (c: PromoCode) => {
    setEditingId(c.id);
    setEditForm({
      code: c.code,
      type: c.type as 'PERCENT' | 'FIXED',
      value: c.type === 'FIXED' ? String(c.value / 100) : String(c.value),
      maxUses: c.maxUses ? String(c.maxUses) : '',
      source: c.source || '',
      validUntil: c.validUntil ? c.validUntil.split('T')[0] : '',
      usedCount: String(c.usedCount),
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setLoading(true);
    await fetch('/api/admin/promo-codes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        code: editForm.code,
        type: editForm.type,
        value: editForm.type === 'FIXED' ? Math.round(parseFloat(editForm.value) * 100) : parseInt(editForm.value),
        maxUses: editForm.maxUses ? parseInt(editForm.maxUses) : null,
        source: editForm.source || null,
        validUntil: editForm.validUntil || null,
        usedCount: parseInt(editForm.usedCount) || 0,
      }),
    });
    setEditingId(null);
    setLoading(false);
    router.refresh();
  };

  const months = useMemo(() => Object.keys(monthlyStats).sort().reverse(), [monthlyStats]);

  const visibleStats = useMemo(() => {
    if (selectedMonth === 'ALL') {
      // Merge all months
      const merged: Record<string, { count: number; totalDiscount: number }> = {};
      for (const monthData of Object.values(monthlyStats)) {
        for (const [code, data] of Object.entries(monthData)) {
          if (!merged[code]) merged[code] = { count: 0, totalDiscount: 0 };
          merged[code].count += data.count;
          merged[code].totalDiscount += data.totalDiscount;
        }
      }
      return merged;
    }
    return monthlyStats[selectedMonth] || {};
  }, [selectedMonth, monthlyStats]);

  const handleCreate = async () => {
    if (!form.code || !form.value) return;
    setLoading(true);

    await fetch('/api/admin/promo-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: form.code,
        type: form.type,
        value: form.type === 'FIXED' ? Math.round(parseFloat(form.value) * 100) : parseInt(form.value),
        maxUses: form.unlimited ? null : (form.maxUses ? parseInt(form.maxUses) : null),
        source: form.source || null,
        validUntil: form.noExpiry ? null : (form.validUntil || null),
      }),
    });

    setForm({ code: '', type: 'PERCENT', value: '', maxUses: '', source: '', validUntil: '', unlimited: true, noExpiry: true });
    setShowForm(false);
    setLoading(false);
    router.refresh();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await fetch('/api/admin/promo-codes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active }),
    });
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Usunąć kod rabatowy?')) return;
    await fetch('/api/admin/promo-codes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  const inputCls = "w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm";

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-[#5B65DC] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4a53c7] transition-colors mb-4"
      >
        <Plus size={16} />
        Nowy kod
      </button>

      {showForm && (
        <div className="bg-white rounded-xl p-5 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">Kod</label>
              <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="RABAT10" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">Typ</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'PERCENT' | 'FIXED' })} className={inputCls}>
                <option value="PERCENT">Procentowy (%)</option>
                <option value="FIXED">Kwotowy (zł)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">
                Wartość {form.type === 'PERCENT' ? '(%)' : '(zł)'}
              </label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder={form.type === 'PERCENT' ? '10' : '20'} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">Limit użyć</label>
              <input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value, unlimited: false })} placeholder="100" disabled={form.unlimited} className={`${inputCls} ${form.unlimited ? 'opacity-40' : ''}`} />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input type="checkbox" checked={form.unlimited} onChange={(e) => { setForm({ ...form, unlimited: e.target.checked, maxUses: e.target.checked ? '' : form.maxUses }); }}
                  className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer" />
                <span className="text-xs text-[#8a8fa6]">Bez limitu</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">Źródło (opcj.)</label>
              <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="facebook_maj" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#122056] mb-1">Ważny do</label>
              <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value, noExpiry: false })} disabled={form.noExpiry} className={`${inputCls} ${form.noExpiry ? 'opacity-40' : ''}`} />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input type="checkbox" checked={form.noExpiry} onChange={(e) => { setForm({ ...form, noExpiry: e.target.checked, validUntil: e.target.checked ? '' : form.validUntil }); }}
                  className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer" />
                <span className="text-xs text-[#8a8fa6]">Bezterminowo</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} disabled={loading || !form.code || !form.value} className="bg-[#5B65DC] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4a53c7] disabled:opacity-40">
              {loading ? 'Tworzę...' : 'Utwórz kod'}
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm text-[#8a8fa6] hover:text-[#122056]">
              Anuluj
            </button>
          </div>
        </div>
      )}

      {codes.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-[#8a8fa6] text-sm">Brak kodów rabatowych</div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                  <th className="px-4 py-3 font-medium">Kod</th>
                  <th className="px-4 py-3 font-medium">Rabat</th>
                  <th className="px-4 py-3 font-medium">Użycia</th>
                  <th className="px-4 py-3 font-medium">Źródło</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => (
                  editingId === c.id ? (
                    <tr key={c.id} className="border-b border-[#EEEFFD] bg-[#FAFAFD]">
                      <td className="px-3 py-2">
                        <input value={editForm.code} onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase() })}
                          className="w-24 px-2 py-1 rounded border border-[#EEEFFD] text-xs font-mono font-bold" />
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <select value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value as 'PERCENT' | 'FIXED' })}
                            className="px-1 py-1 rounded border border-[#EEEFFD] text-xs w-16">
                            <option value="PERCENT">%</option>
                            <option value="FIXED">zł</option>
                          </select>
                          <input type="number" value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                            className="w-16 px-2 py-1 rounded border border-[#EEEFFD] text-xs" />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1 items-center">
                          <input type="number" value={editForm.usedCount} onChange={(e) => setEditForm({ ...editForm, usedCount: e.target.value })}
                            className="w-12 px-2 py-1 rounded border border-[#EEEFFD] text-xs" />
                          <span className="text-[#8a8fa6] text-xs">/</span>
                          <input type="number" value={editForm.maxUses} onChange={(e) => setEditForm({ ...editForm, maxUses: e.target.value })}
                            placeholder="∞" className="w-12 px-2 py-1 rounded border border-[#EEEFFD] text-xs" />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <input value={editForm.source} onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                          placeholder="—" className="w-20 px-2 py-1 rounded border border-[#EEEFFD] text-xs" />
                      </td>
                      <td className="px-3 py-2">
                        <button onClick={() => toggleActive(c.id, c.active)}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                          {c.active ? 'Aktywny' : 'Nieaktywny'}
                        </button>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button onClick={handleUpdate} disabled={loading} className="text-emerald-600 hover:text-emerald-800">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-[#8a8fa6] hover:text-red-500">
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                  <tr key={c.id} className="border-b border-[#EEEFFD] last:border-0">
                    <td className="px-4 py-3 font-mono font-bold text-[#122056]">{c.code}</td>
                    <td className="px-4 py-3 text-[#122056]">
                      {c.type === 'PERCENT' ? `${c.value}%` : `${(c.value / 100).toFixed(0)} zł`}
                    </td>
                    <td className="px-4 py-3 text-[#8a8fa6]">
                      {c.usedCount}{c.maxUses ? ` / ${c.maxUses}` : ''}
                    </td>
                    <td className="px-4 py-3 text-[#8a8fa6] text-xs">{c.source || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(c.id, c.active)}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {c.active ? 'Aktywny' : 'Nieaktywny'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(c)} className="text-[#8a8fa6] hover:text-[#5B65DC]">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="text-[#8a8fa6] hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly usage stats */}
      <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#5B65DC]" />
              <h2 className="font-bold text-[#122056] text-sm">Statystyki użycia kodów</h2>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#EEEFFD] text-sm text-[#122056] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none"
            >
              <option value="ALL">Wszystkie miesiące</option>
              {months.map((m) => (
                <option key={m} value={m}>{formatMonth(m)}</option>
              ))}
            </select>
          </div>

          {Object.keys(visibleStats).length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-[#8a8fa6] text-sm">
              Brak użyć kodów {selectedMonth !== 'ALL' ? `w ${formatMonth(selectedMonth)}` : ''}
            </div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EEEFFD] text-left text-xs text-[#8a8fa6]">
                      <th className="px-4 py-3 font-medium">Kod</th>
                      <th className="px-4 py-3 font-medium">Użycia</th>
                      <th className="px-4 py-3 font-medium">Łączny rabat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(visibleStats)
                      .sort(([, a], [, b]) => b.count - a.count)
                      .map(([code, data]) => (
                      <tr key={code} className="border-b border-[#EEEFFD] last:border-0">
                        <td className="px-4 py-3 font-mono font-bold text-[#122056]">{code}</td>
                        <td className="px-4 py-3 text-[#122056]">{data.count}</td>
                        <td className="px-4 py-3 text-emerald-600 font-medium">{(data.totalDiscount / 100).toFixed(0)} zł</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#EEEFFD] bg-[#FAFAFD]">
                      <td className="px-4 py-3 font-bold text-[#122056] text-xs">Suma</td>
                      <td className="px-4 py-3 font-bold text-[#122056]">
                        {Object.values(visibleStats).reduce((s, d) => s + d.count, 0)}
                      </td>
                      <td className="px-4 py-3 font-bold text-emerald-600">
                        {(Object.values(visibleStats).reduce((s, d) => s + d.totalDiscount, 0) / 100).toFixed(0)} zł
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
