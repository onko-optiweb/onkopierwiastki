'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { IconArrowLeft, IconArrowRight, IconMapPin, IconPhone, IconClock, IconSearch, IconCircleCheck, IconTruck } from '@tabler/icons-react';
import { facilities } from '@/src/data/facilities';

type PanelType = 'profilaktyka' | 'onkologiczny';
type PanelTier = 'podstawowy' | 'rozszerzony';

const panels = {
  profilaktyka: {
    podstawowy: { price: 200, material: 'Krew pełna', elements: '1–3 pierwiastki do wyboru (As, Zn, Cd, Pb, Se, Cu)' },
    rozszerzony: { price: 230, material: 'Krew pełna', elements: 'Wszystkie 6 pierwiastków (As, Se, Zn, Cu, Cd, Pb)' },
  },
  onkologiczny: {
    podstawowy: { price: 200, material: 'Surowica', elements: 'Se, Zn, Mn, Cu z surowicy' },
    rozszerzony: { price: 230, material: 'Surowica + krew pełna', elements: 'Pełny zestaw z surowicy + As, Cd, Pb z krwi' },
  },
};

const FacilitiesMap = dynamic(() => import('@/src/components/FacilitiesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-[#EEEFFD]/30 rounded-xl animate-pulse flex items-center justify-center">
      <p className="text-[#8a8fa6] text-sm">Ładowanie mapy...</p>
    </div>
  ),
});

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [panelType, setPanelType] = useState<PanelType>('profilaktyka');
  const [panelTier, setPanelTier] = useState<PanelTier>('rozszerzony');
  const [facilityId, setFacilityId] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [query, setQuery] = useState('');

  const selectedPanel = panels[panelType][panelTier];
  const selectedFacility = facilities.find((f) => f.id === facilityId);

  const filtered = useMemo(() => {
    if (!query) return facilities;
    const q = query.toLowerCase();
    return facilities.filter(
      (f) => f.city.toLowerCase().includes(q) || f.name.toLowerCase().includes(q) || f.address.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelectFacility = useCallback((id: number) => {
    setFacilityId(id);
    setIsOnline(false);
  }, []);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return facilityId !== null || isOnline;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-[#122056] hover:opacity-70 transition-opacity">
            <IconArrowLeft size={18} stroke={2} />
            <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-10" />
          </a>
          <div className="flex items-center gap-2 text-xs text-[#8a8fa6]">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  s === step ? 'bg-[#5B65DC] text-white' : s < step ? 'bg-[#122056] text-white' : 'bg-[#EEEFFD] text-[#8a8fa6]'
                }`}>
                  {s < step ? '✓' : s}
                </span>
                {s < 3 && <div className={`w-8 h-px ${s < step ? 'bg-[#122056]' : 'bg-[#EEEFFD]'}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className={`mx-auto px-4 sm:px-6 py-10 ${step === 2 ? 'max-w-7xl' : 'max-w-3xl'}`}>
        {/* Step 1 — wybór panelu */}
        {step === 1 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Wybierz panel badawczy
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Dopasuj badanie do swojej sytuacji zdrowotnej. Placówkę wybierzesz w kolejnym kroku.</p>

            {/* Typ */}
            <div className="flex gap-2 mb-6">
              {(['profilaktyka', 'onkologiczny'] as PanelType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setPanelType(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    panelType === t ? 'bg-[#122056] text-white' : 'bg-[#EEEFFD] text-[#122056] hover:bg-[#e0e2f8]'
                  }`}
                >
                  {t === 'profilaktyka' ? 'Profilaktyka' : 'Pacjenci onkologiczni'}
                </button>
              ))}
            </div>

            {/* Wariant */}
            <div className="grid sm:grid-cols-2 gap-4">
              {(['podstawowy', 'rozszerzony'] as PanelTier[]).map((tier) => {
                const p = panels[panelType][tier];
                const selected = panelTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => setPanelTier(tier)}
                    className={`text-left p-6 rounded-xl border-2 transition-all ${
                      selected ? 'border-[#5B65DC] bg-white' : 'border-transparent bg-white hover:border-[#EEEFFD]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[#122056] text-base capitalize">{tier}</span>
                      {tier === 'rozszerzony' && (
                        <span className="bg-[#5B65DC] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Polecany</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">{p.price}</span>
                      <span className="text-[#8a8fa6] text-sm">zł</span>
                    </div>
                    <p className="text-[#8a8fa6] text-xs mb-1">{p.material}</p>
                    <p className="text-[#122056] text-sm">{p.elements}</p>
                    {selected && (
                      <div className="mt-3 flex items-center gap-1.5 text-[#5B65DC] text-xs font-semibold">
                        <IconCircleCheck size={14} stroke={2} />
                        Wybrany
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — wybór placówki + mapa */}
        {step === 2 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Wybierz placówkę
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Wskaż na mapie lub z listy, gdzie chcesz wykonać pobranie krwi.</p>

            {/* Map on mobile — top */}
            <div className="lg:hidden rounded-xl overflow-hidden border border-[#EEEFFD] h-[250px] mb-6">
              <FacilitiesMap
                facilities={filtered}
                activeId={facilityId}
                onSelect={handleSelectFacility}
              />
            </div>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
              {/* Left — search + list */}
              <div>
                {/* Search */}
                <div className="relative mb-4">
                  <IconSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8fa6]" stroke={1.5} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Wpisz miasto lub nazwę..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#8a8fa6]"
                  />
                </div>

                {/* Facility list */}
                <div className="space-y-2 max-h-[340px] overflow-y-auto mb-4">
                  {filtered.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleSelectFacility(f.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        facilityId === f.id && !isOnline
                          ? 'border-[#5B65DC] bg-white'
                          : 'border-transparent bg-white hover:border-[#EEEFFD]'
                      }`}
                    >
                      <p className="font-bold text-[#122056] text-sm">{f.name}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[#8a8fa6] text-xs">
                        <span className="flex items-center gap-1"><IconMapPin size={12} stroke={1.5} />{f.address}</span>
                        <span className="flex items-center gap-1"><IconPhone size={12} stroke={1.5} />{f.phone}</span>
                        <span className="flex items-center gap-1"><IconClock size={12} stroke={1.5} />{f.hours}</span>
                      </div>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-center text-[#8a8fa6] text-sm py-6">Nie znaleziono placówek dla &quot;{query}&quot;</p>
                  )}
                </div>

                {/* Separator */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-[#EEEFFD]" />
                  <span className="text-[#8a8fa6] text-xs font-semibold">lub</span>
                  <div className="flex-1 h-px bg-[#EEEFFD]" />
                </div>

                {/* Online option */}
                <button
                  onClick={() => { setIsOnline(true); setFacilityId(null); }}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    isOnline ? 'border-[#5B65DC] bg-white' : 'border-transparent bg-white hover:border-[#EEEFFD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5B65DC]/10 flex items-center justify-center flex-shrink-0">
                      <IconTruck size={20} className="text-[#5B65DC]" stroke={1.5} />
                    </div>
                    <div>
                      <p className="font-bold text-[#122056] text-sm">Zamów badanie online</p>
                      <p className="text-[#8a8fa6] text-xs mt-0.5">Nie ma placówki w Twoim mieście? Skierujemy Cię do najbliższego punktu — kurier odbierze materiał.</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Right — map (desktop) */}
              <div className="hidden lg:block rounded-xl overflow-hidden border border-[#EEEFFD] h-[540px] sticky top-24">
                <FacilitiesMap
                  facilities={filtered}
                  activeId={facilityId}
                  onSelect={handleSelectFacility}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — podsumowanie */}
        {step === 3 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Podsumowanie zamówienia
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Sprawdź dane przed przejściem do płatności.</p>

            <div className="bg-white rounded-xl p-6 space-y-5 mb-8">
              {/* Panel */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EEEFFD]">
                <div>
                  <p className="text-[#8a8fa6] text-xs mb-0.5">Panel badawczy</p>
                  <p className="text-[#122056] font-bold text-sm">
                    {panelType === 'profilaktyka' ? 'Profilaktyczny' : 'Onkologiczny'} — {panelTier}
                  </p>
                  <p className="text-[#8a8fa6] text-xs mt-0.5">{selectedPanel.elements}</p>
                </div>
                <button onClick={() => setStep(1)} className="text-[#5B65DC] text-xs font-semibold hover:underline">Zmień</button>
              </div>

              {/* Placówka */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EEEFFD]">
                <div>
                  <p className="text-[#8a8fa6] text-xs mb-0.5">Placówka</p>
                  {isOnline ? (
                    <p className="text-[#122056] font-bold text-sm">Zamówienie online — kurier</p>
                  ) : selectedFacility ? (
                    <>
                      <p className="text-[#122056] font-bold text-sm">{selectedFacility.name}</p>
                      <p className="text-[#8a8fa6] text-xs mt-0.5">{selectedFacility.address}</p>
                    </>
                  ) : null}
                </div>
                <button onClick={() => setStep(2)} className="text-[#5B65DC] text-xs font-semibold hover:underline">Zmień</button>
              </div>

              {/* Materiał */}
              <div className="pb-4 border-b border-[#EEEFFD]">
                <p className="text-[#8a8fa6] text-xs mb-0.5">Materiał</p>
                <p className="text-[#122056] font-bold text-sm">{selectedPanel.material}</p>
              </div>

              {/* Cena */}
              <div className="flex items-center justify-between">
                <p className="text-[#122056] font-bold text-base">Do zapłaty</p>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">{selectedPanel.price} <span className="text-base text-[#8a8fa6] font-normal">zł</span></p>
              </div>
            </div>

            <p className="text-[#8a8fa6] text-xs text-center mb-6">
              Cena brutto. Badanie zwolnione z VAT. Bez skierowania lekarskiego.
            </p>

            <button
              className="w-full bg-[#5B65DC] text-white font-semibold py-4 rounded-xl hover:bg-[#4a53c7] transition-colors text-base"
            >
              Przejdź do płatności — {selectedPanel.price} zł
            </button>

            <p className="text-[#8a8fa6] text-[11px] text-center mt-3">
              Płatność zostanie uruchomiona po wdrożeniu systemu PayU
            </p>
          </div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : window.location.href = '/'}
              className="flex items-center gap-2 text-[#8a8fa6] text-sm font-semibold hover:text-[#122056] transition-colors"
            >
              <IconArrowLeft size={16} stroke={2} />
              {step === 1 ? 'Wróć na stronę' : 'Wstecz'}
            </button>
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-[#5B65DC] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Dalej
              <IconArrowRight size={16} stroke={2} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
