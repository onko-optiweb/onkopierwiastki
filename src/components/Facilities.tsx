'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { IconSearch, IconMapPin, IconPhone, IconClock } from '@tabler/icons-react';

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
}

// Dynamic import — Leaflet needs window
const FacilitiesMap = dynamic(() => import('./FacilitiesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-[#EEEFFD]/30 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-[#8a8fa6] text-sm">Ładowanie mapy...</p>
    </div>
  ),
});

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/facilities').then(r => r.json()).then(setFacilities).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!query) return facilities;
    const q = query.toLowerCase();
    return facilities.filter(
      (f) =>
        f.city.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q)
    );
  }, [query, facilities]);

  const handleSelect = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  return (
    <section id="placowki" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mb-4">
            Placówki referencyjne
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto">
            Onkopierwiastki to badanie wymagające specjalnych próbówek i procedur. Tylko w placówkach z naszej sieci masz pewność, że materiał zostanie pobrany zgodnie z protokołem laboratorium.
          </p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 items-start">
          {/* Left — search + list */}
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8fa6]" stroke={1.5} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wpisz miasto lub nazwę..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#8a8fa6]"
              />
            </div>

            {/* List — max 3 on mobile, scrollable on desktop */}
            <div className="flex flex-col gap-2 lg:max-h-[480px] lg:overflow-y-auto pr-1">
              {filtered.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => handleSelect(f.id)}
                  className={`text-left rounded-xl p-4 transition-all border ${i >= 3 ? 'hidden lg:block' : ''} ${
                    activeId === f.id
                      ? 'bg-[#5B65DC] border-[#5B65DC] text-white'
                      : 'bg-[#EEEFFD]/30 border-[#EEEFFD] hover:border-[#5B65DC]/30'
                  }`}
                >
                  <p className={`font-bold text-sm mb-2 ${
                    activeId === f.id ? 'text-white' : 'text-[#122056]'
                  }`}>
                    {f.name}
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <IconMapPin size={14} className={`flex-shrink-0 mt-0.5 ${activeId === f.id ? 'text-white/60' : 'text-[#5B65DC]'}`} stroke={1.5} />
                      <span className={`text-xs ${activeId === f.id ? 'text-white/80' : 'text-[#8a8fa6]'}`}>{f.address}, {f.postalCode} {f.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconPhone size={14} className={`flex-shrink-0 ${activeId === f.id ? 'text-white/60' : 'text-[#5B65DC]'}`} stroke={1.5} />
                      <span className={`text-xs ${activeId === f.id ? 'text-white/80' : 'text-[#8a8fa6]'}`}>{f.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock size={14} className={`flex-shrink-0 ${activeId === f.id ? 'text-white/60' : 'text-[#5B65DC]'}`} stroke={1.5} />
                      <span className={`text-xs ${activeId === f.id ? 'text-white/80' : 'text-[#8a8fa6]'}`}>{f.hours}</span>
                    </div>
                    {f.notes && (
                      <p className={`text-[11px] italic mt-1 ${activeId === f.id ? 'text-white/60' : 'text-[#5B65DC]/70'}`}>{f.notes}</p>
                    )}
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-[#8a8fa6] text-sm py-8">
                  Nie znaleziono placówek dla &quot;{query}&quot;
                </p>
              )}
            </div>

            <p className="text-[#8a8fa6] text-xs text-center">
              {filtered.length} {filtered.length === 1 ? 'placówka' : filtered.length < 5 ? 'placówki' : 'placówek'}
            </p>
          </div>

          {/* Right — map */}
          <div className="rounded-2xl overflow-hidden border border-[#EEEFFD] h-[500px] lg:h-[560px]">
            <FacilitiesMap
              facilities={filtered}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* Online CTA */}
        <div className="mt-10 bg-[#EEEFFD]/50 rounded-2xl p-8 text-center border border-[#EEEFFD]">
          <p className="text-[#122056] text-sm lg:text-base mb-4">
            <span className="font-bold">Nie ma placówki w Twoim mieście?</span>
          </p>
          <a
            href="#cennik"
            className="inline-flex items-center gap-2 bg-[#5B65DC] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm"
          >
            Zamów badanie online — kurier odbierze materiał z wybranego punktu
          </a>
        </div>
      </div>
    </section>
  );
}
