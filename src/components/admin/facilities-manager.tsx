'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, X, MapPin } from 'lucide-react';

interface Facility {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  notes: string;
  supportsBlood: boolean;
  supportsSerum: boolean;
  active: boolean;
}

const emptyForm = { name: '', address: '', postalCode: '', city: '', phone: '', hours: '', lat: '', lng: '', notes: '', supportsBlood: true, supportsSerum: true };

function FacilityForm({ editId, form, setForm, loading, geocoding, onSave, onClose, onGeocode }: {
  editId: number | null;
  form: typeof emptyForm;
  setForm: (f: typeof emptyForm) => void;
  loading: boolean;
  geocoding: boolean;
  onSave: () => void;
  onClose: () => void;
  onGeocode: () => void;
}) {
  const inputCls = "w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm";

  return (
    <div className="bg-white rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#122056] text-sm">{editId ? 'Edytuj placówkę' : 'Nowa placówka'}</h3>
        <button onClick={onClose} className="text-[#8a8fa6] hover:text-[#122056]"><X size={18} /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#122056] mb-1">Nazwa</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ALAB Laboratoria" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#122056] mb-1">Ulica z numerem</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="ul. Przykładowa 10" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#122056] mb-1">Kod pocztowy</label>
          <input value={form.postalCode} onChange={(e) => {
            let v = e.target.value.replace(/[^\d-]/g, '');
            if (v.length === 2 && !v.includes('-') && form.postalCode.length < v.length) v += '-';
            setForm({ ...form, postalCode: v.slice(0, 6) });
          }} placeholder="XX-XXX" maxLength={6} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#122056] mb-1">Miasto</label>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Szczecin" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#122056] mb-1">Telefon</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+48 91 000 00 00" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#122056] mb-1">Godziny</label>
          <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="pon–pt 7:00–15:00" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-[#122056]">Współrzędne</label>
            <button type="button" onClick={onGeocode} disabled={geocoding || !form.address || !form.city}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#5B65DC] hover:underline disabled:opacity-40 disabled:no-underline">
              <MapPin size={12} />
              {geocoding ? 'Szukam...' : 'Pobierz z adresu'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" step="any" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} placeholder="Lat (53.4285)" className={inputCls} />
            <input type="number" step="any" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} placeholder="Lng (14.5528)" className={inputCls} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#122056] mb-1">Informacje dodatkowe (opcj.)</label>
          <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="np. budynek Przychodni, wejście od tyłu" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#122056] mb-2">Obsługiwane materiały</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.supportsBlood} onChange={(e) => setForm({ ...form, supportsBlood: e.target.checked })}
                className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer" />
              <span className="text-sm text-[#122056]">Krew pełna</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.supportsSerum} onChange={(e) => setForm({ ...form, supportsSerum: e.target.checked })}
                className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer" />
              <span className="text-sm text-[#122056]">Surowica</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} disabled={loading || !form.name || !form.city} className="bg-[#5B65DC] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4a53c7] disabled:opacity-40">
          {loading ? 'Zapisuję...' : editId ? 'Zapisz zmiany' : 'Dodaj placówkę'}
        </button>
        <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-[#8a8fa6] hover:text-[#122056]">Anuluj</button>
      </div>
    </div>
  );
}

export function FacilitiesManager({ facilities }: { facilities: Facility[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const router = useRouter();

  const geocodeAddress = async () => {
    if (!form.address || !form.city) return;
    setGeocoding(true);
    try {
      const q = encodeURIComponent(`${form.address}, ${form.postalCode} ${form.city}, Polska`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`, {
        headers: { 'User-Agent': 'Onkopierwiastki-Admin/1.0' },
      });
      const data = await res.json();
      if (data.length > 0) {
        setForm((prev) => ({ ...prev, lat: data[0].lat, lng: data[0].lon }));
      } else {
        alert('Nie znaleziono lokalizacji dla podanego adresu');
      }
    } catch {
      alert('Błąd geokodowania');
    }
    setGeocoding(false);
  };

  const openEdit = (f: Facility) => {
    setEditId(f.id);
    setForm({ name: f.name, address: f.address, postalCode: f.postalCode, city: f.city, phone: f.phone, hours: f.hours, lat: String(f.lat), lng: String(f.lng), notes: f.notes, supportsBlood: f.supportsBlood, supportsSerum: f.supportsSerum });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.name || !form.city) return;
    setLoading(true);

    const body = {
      ...(editId ? { id: editId } : {}),
      name: form.name,
      address: form.address,
      postalCode: form.postalCode,
      city: form.city,
      phone: form.phone,
      hours: form.hours,
      lat: parseFloat(form.lat) || 0,
      lng: parseFloat(form.lng) || 0,
      notes: form.notes,
      supportsBlood: form.supportsBlood,
      supportsSerum: form.supportsSerum,
    };

    await fetch('/api/admin/facilities', {
      method: editId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    closeForm();
    setLoading(false);
    router.refresh();
  };

  const handleToggleActive = async (id: number, active: boolean) => {
    await fetch('/api/admin/facilities', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active }),
    });
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Usunąć placówkę na stałe? Tej operacji nie można cofnąć.')) return;
    await fetch('/api/admin/facilities', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, permanent: true }),
    });
    router.refresh();
  };

  // "New" form shows at top only when adding (not editing)
  const showNewForm = showForm && editId === null;

  return (
    <div>
      <button
        onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
        className="flex items-center gap-2 bg-[#5B65DC] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4a53c7] transition-colors mb-4"
      >
        <Plus size={16} />
        Nowa placówka
      </button>

      {showNewForm && (
        <div className="mb-6">
          <FacilityForm
            editId={null}
            form={form}
            setForm={setForm}
            loading={loading}
            geocoding={geocoding}
            onSave={handleSave}
            onClose={closeForm}
            onGeocode={geocodeAddress}
          />
        </div>
      )}

      {facilities.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-[#8a8fa6] text-sm">Brak placówek</div>
      ) : (
        <div className="grid gap-3">
          {facilities.map((f) => (
            editId === f.id && showForm ? (
              <FacilityForm
                key={f.id}
                editId={editId}
                form={form}
                setForm={setForm}
                loading={loading}
                geocoding={geocoding}
                onSave={handleSave}
                onClose={closeForm}
                onGeocode={geocodeAddress}
              />
            ) : (
              <div key={f.id} className={`bg-white rounded-xl p-4 flex items-center justify-between ${!f.active ? 'opacity-50' : ''}`}>
                <div>
                  <p className="font-bold text-[#122056] text-sm">{f.name}</p>
                  <p className="text-[#8a8fa6] text-xs">{f.address}, {f.postalCode} {f.city}</p>
                  <p className="text-[#8a8fa6] text-xs">{f.phone} &middot; {f.hours}</p>
                  {f.notes && <p className="text-[#5B65DC] text-xs mt-0.5">{f.notes}</p>}
                  <div className="flex gap-1.5 mt-1">
                    {f.supportsBlood && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-600">Krew</span>}
                    {f.supportsSerum && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-600">Surowica</span>}
                    {!f.supportsBlood && !f.supportsSerum && <span className="text-[10px] text-red-400">Brak materiałów!</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(f)} className="text-[#8a8fa6] hover:text-[#5B65DC] p-1" title="Edytuj">
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleToggleActive(f.id, f.active)}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${f.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {f.active ? 'Aktywna' : 'Nieaktywna'}
                  </button>
                  <button onClick={() => handleDelete(f.id)} className="text-[#8a8fa6] hover:text-red-500 p-1" title="Usuń na stałe">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
