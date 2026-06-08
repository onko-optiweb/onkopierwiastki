'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { IconArrowLeft, IconArrowRight, IconMapPin, IconPhone, IconClock, IconSearch, IconCircleCheck, IconTag, IconLoader2 } from '@tabler/icons-react';
import NoFacilityForm from '@/src/components/NoFacilityForm';
import { createOrder } from '@/src/actions/orders';
import { getRecaptchaToken } from '@/src/lib/recaptcha';
import { useUtm } from '@/src/hooks/useUtm';
import posthog from 'posthog-js';

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
  supportsBlood: boolean;
  supportsSerum: boolean;
}

type PanelType = 'profilaktyka' | 'onkologiczny';
type PanelTier = 'podstawowy' | 'rozszerzony';

const panels = {
  profilaktyka: {
    podstawowy: { price: 200, material: 'Krew pełna', elements: '1–3 pierwiastki do wyboru (As, Zn, Cd, Pb, Se, Cu)' },
    rozszerzony: { price: 230, material: 'Krew pełna', elements: 'Wszystkie 6 pierwiastków (As, Se, Zn, Cu, Cd, Pb)' },
  },
  onkologiczny: {
    podstawowy: { price: 200, material: 'Surowica', elements: 'Se, Zn, Mn, Cu z surowicy' },
    rozszerzony: { price: 200, material: 'Surowica', elements: 'Se, Zn, As, Cu z surowicy' },
  },
};

const STEPS = 4;

const FacilitiesMap = dynamic(() => import('@/src/components/FacilitiesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-[#EEEFFD]/30 rounded-xl animate-pulse flex items-center justify-center">
      <p className="text-[#8a8fa6] text-sm">Ładowanie mapy...</p>
    </div>
  ),
});

export default function OrderPageWrapper() {
  return (
    <Suspense>
      <OrderPage />
    </Suspense>
  );
}

function OrderPage() {
  const searchParams = useSearchParams();
  const utm = useUtm();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [step, setStep] = useState(1);
  const [panelType, setPanelType] = useState<PanelType>(() => {
    const typ = searchParams.get('typ');
    return typ === 'onkologiczny' ? 'onkologiczny' : 'profilaktyka';
  });
  const [panelTier, setPanelTier] = useState<PanelTier>(() => {
    const wariant = searchParams.get('wariant');
    return wariant === 'podstawowy' ? 'podstawowy' : 'rozszerzony';
  });
  const [facilityId, setFacilityId] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/facilities').then(r => r.json()).then(setFacilities).catch(() => {});
  }, []);

  // Step 3 — dane klienta
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pesel, setPesel] = useState('');
  const [noPesel, setNoPesel] = useState(false);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [needInvoice, setNeedInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [nip, setNip] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  // Kod rabatowy
  const [promoCode, setPromoCode] = useState('');
  const [promoResult, setPromoResult] = useState<{ valid: boolean; discount?: number; label?: string; error?: string } | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedPanel = panels[panelType][panelTier];
  const priceInGrosze = selectedPanel.price * 100;
  const discount = promoResult?.valid ? promoResult.discount! : 0;
  const finalPrice = selectedPanel.price - discount / 100;
  const selectedFacility = facilities.find((f) => f.id === facilityId);

  // Deselect facility if it doesn't support the new material
  useEffect(() => {
    if (facilityId && selectedFacility) {
      const material = selectedPanel.material;
      const supported =
        material === 'Krew pełna' ? selectedFacility.supportsBlood :
        material === 'Surowica' ? selectedFacility.supportsSerum :
        material === 'Surowica + krew pełna' ? (selectedFacility.supportsBlood && selectedFacility.supportsSerum) :
        true;
      if (!supported) {
        setFacilityId(null);
        setIsOnline(false);
      }
    }
  }, [panelType, panelTier]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if facility supports selected material
  const facilitySupported = useCallback((f: Facility) => {
    const material = selectedPanel.material;
    if (material === 'Krew pełna') return f.supportsBlood;
    if (material === 'Surowica') return f.supportsSerum;
    if (material === 'Surowica + krew pełna') return f.supportsBlood && f.supportsSerum;
    return true;
  }, [selectedPanel.material]);

  // Facilities filtered by search query (all shown, supported first)
  const filtered = useMemo(() => {
    let list = facilities;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) => f.city.toLowerCase().includes(q) || f.name.toLowerCase().includes(q) || f.address.toLowerCase().includes(q)
      );
    }
    // Sort: supported first, then unsupported
    return [...list].sort((a, b) => {
      const aOk = facilitySupported(a) ? 0 : 1;
      const bOk = facilitySupported(b) ? 0 : 1;
      return aOk - bOk;
    });
  }, [query, facilities, facilitySupported]);

  // Only supported facilities for the map
  const mapFacilities = useMemo(() => filtered.filter(facilitySupported), [filtered, facilitySupported]);

  const handleSelectFacility = useCallback((id: number) => {
    setFacilityId(id);
    setIsOnline(false);
  }, []);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v: string) => /^[\d\s\-+()]{7,}$/.test(v);
  const isValidPesel = (v: string) => /^\d{11}$/.test(v);
  const isValidPostalCode = (v: string) => /^\d{2}-\d{3}$/.test(v);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return facilityId !== null;
    if (step === 3) {
      const peselOk = noPesel || isValidPesel(pesel);
      const invoiceOk = !needInvoice || (companyName.trim().length >= 2 && nip.trim().length >= 10);
      return (
        firstName.trim().length >= 2 &&
        lastName.trim().length >= 2 &&
        isValidEmail(email) &&
        isValidPhone(phone) &&
        peselOk &&
        street.trim().length >= 2 &&
        houseNumber.trim().length >= 1 &&
        isValidPostalCode(postalCode) &&
        city.trim().length >= 2 &&
        invoiceOk &&
        acceptTerms
      );
    }
    return false;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim(), price: priceInGrosze }),
      });
      const data = await res.json();
      setPromoResult(data);
    } catch {
      setPromoResult({ valid: false, error: 'Błąd połączenia' });
    }
    setPromoLoading(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const recaptchaToken = await getRecaptchaToken('ORDER');
      const result = await createOrder({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: `${street.trim()} ${houseNumber.trim()}${apartmentNumber.trim() ? '/' + apartmentNumber.trim() : ''}, ${postalCode} ${city.trim()}`,
        pesel: noPesel ? '' : pesel,
        noPesel,
        needInvoice,
        companyName: needInvoice ? companyName.trim() : '',
        nip: needInvoice ? nip.trim() : '',
        panelType: panelType === 'profilaktyka' ? 'PROFILAKTYKA' : 'ONKOLOGICZNY',
        panelTier: panelTier === 'podstawowy' ? 'PODSTAWOWY' : 'ROZSZERZONY',
        material: selectedPanel.material,
        elements: selectedPanel.elements,
        facilityId: facilityId,
        isOnline,
        price: priceInGrosze,
        promoCode: promoResult?.valid ? promoCode.trim().toUpperCase() : null,
        acceptTerms: true,
        acceptMarketing,
        recaptchaToken,
        utmSource: utm.utmSource,
        utmMedium: utm.utmMedium,
        utmCampaign: utm.utmCampaign,
        referrer: utm.referrer,
      });

      if (result.success && result.data) {
        // PostHog: identify user + track order
        try {
          posthog.identify(email.trim(), {
            name: `${firstName.trim()} ${lastName.trim()}`,
            phone: phone.trim(),
          });
          posthog.capture('order_created', {
            order_id: result.data.orderId,
            order_number: result.data.orderNumber,
            panel_type: panelType,
            panel_tier: panelTier,
            price: priceInGrosze / 100,
            discount: promoResult?.valid ? promoResult.discount! / 100 : 0,
            facility: facilityId ? facilities.find(f => f.id === facilityId)?.name : 'online',
            promo_code: promoResult?.valid ? promoCode.trim().toUpperCase() : null,
            utm_source: utm.utmSource,
            utm_medium: utm.utmMedium,
            utm_campaign: utm.utmCampaign,
          });
        } catch {}

        if (result.data.redirectUrl) {
          window.location.href = result.data.redirectUrl;
        } else {
          window.location.href = `/zamowienie/${result.data.orderId}`;
        }
      } else {
        setSubmitError(result.error || 'Nie udało się złożyć zamówienia');
      }
    } catch {
      setSubmitError('Błąd połączenia z serwerem');
    }
    setSubmitting(false);
  };

  const stepLabels = ['Panel', 'Placówka', 'Dane', 'Podsumowanie'];

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-[#122056] hover:opacity-70 transition-opacity">
            <IconArrowLeft size={18} stroke={2} />
            <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-10" />
          </a>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#8a8fa6]">
            {Array.from({ length: STEPS }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    s === step ? 'bg-[#5B65DC] text-white' : s < step ? 'bg-[#122056] text-white' : 'bg-[#EEEFFD] text-[#8a8fa6]'
                  }`}>
                    {s < step ? '\u2713' : s}
                  </span>
                  <span className="text-[9px] hidden sm:block">{stepLabels[s - 1]}</span>
                </div>
                {s < STEPS && <div className={`w-5 sm:w-8 h-px ${s < step ? 'bg-[#122056]' : 'bg-[#EEEFFD]'}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className={`mx-auto px-4 sm:px-6 pt-6 ${step === 2 ? 'max-w-7xl' : 'max-w-3xl'}`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#8a8fa6]">
          <a href="/" className="hover:text-[#122056] transition-colors">Strona główna</a>
          <span className="text-[10px]">›</span>
          <span className="text-[#122056] font-medium">Zamów badanie</span>
        </nav>
      </div>

      <main className={`mx-auto px-4 sm:px-6 py-8 ${step === 2 ? 'max-w-7xl' : 'max-w-3xl'}`}>
        {/* Step 1 — wybor panelu */}
        {step === 1 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Wybierz panel badawczy
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Dopasuj badanie do swojej sytuacji zdrowotnej.</p>

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
                  {t === 'profilaktyka' ? 'Krew' : 'Surowica'}
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
                      <span className="font-bold text-[#122056] text-base capitalize">
                        {panelType === 'onkologiczny' && tier === 'podstawowy' ? 'Kobiety' :
                         panelType === 'onkologiczny' && tier === 'rozszerzony' ? 'Mężczyźni' : tier}
                      </span>
                      {tier === 'rozszerzony' && panelType === 'profilaktyka' && (
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

            <div className="mt-8 bg-[#EEEFFD]/50 rounded-xl p-5 flex items-center gap-3">
              <IconMapPin size={20} className="text-[#5B65DC] flex-shrink-0" stroke={2} />
              <p className="text-[#122056] text-sm font-semibold">Placówkę do pobrania krwi wybierzesz w kolejnym kroku.</p>
            </div>
          </div>
        )}

        {/* Step 2 — wybor placowki + mapa */}
        {step === 2 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Wybierz placówkę
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Wskaż na mapie lub z listy, gdzie chcesz wykonać pobranie krwi.</p>

            {/* Map on mobile — top */}
            <div className="lg:hidden rounded-xl overflow-hidden border border-[#EEEFFD] h-[250px] mb-6">
              <FacilitiesMap
                facilities={mapFacilities}
                activeId={facilityId}
                onSelect={handleSelectFacility}
              />
            </div>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
              {/* Left — search + list */}
              <div className="lg:h-[540px] flex flex-col">
                {/* Search */}
                <div className="relative mb-4 flex-shrink-0">
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
                <div className="space-y-2 max-h-[45vh] lg:max-h-none lg:flex-1 overflow-y-auto mb-4">
                  {filtered.map((f) => {
                    const supported = facilitySupported(f);
                    const materialLabel = selectedPanel.material === 'Krew pełna' ? 'krwi pełnej' :
                      selectedPanel.material === 'Surowica' ? 'surowicy' : 'krwi pełnej i surowicy';
                    return (
                      <div
                        key={f.id}
                        role="button"
                        tabIndex={supported ? 0 : -1}
                        onClick={() => supported && handleSelectFacility(f.id)}
                        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && supported) { e.preventDefault(); handleSelectFacility(f.id); } }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          !supported
                            ? 'border-transparent bg-neutral-50 opacity-50 cursor-not-allowed'
                            : facilityId === f.id && !isOnline
                              ? 'border-[#5B65DC] bg-white cursor-pointer'
                              : 'border-transparent bg-white hover:border-[#EEEFFD] cursor-pointer'
                        }`}
                      >
                        <p className={`font-bold text-sm ${supported ? 'text-[#122056]' : 'text-neutral-400'}`}>{f.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs">
                          <span className={`flex items-center gap-1 ${supported ? 'text-[#8a8fa6]' : 'text-neutral-300'}`}><IconMapPin size={12} stroke={1.5} />{f.address}, {f.postalCode} {f.city}</span>
                          <span className={`flex items-center gap-1 ${supported ? 'text-[#8a8fa6]' : 'text-neutral-300'}`}><IconPhone size={12} stroke={1.5} />{f.phone}</span>
                          <span className={`flex items-center gap-1 ${supported ? 'text-[#8a8fa6]' : 'text-neutral-300'}`}><IconClock size={12} stroke={1.5} />{f.hours}</span>
                        </div>
                        {!supported && (
                          <p className="text-red-400 text-[11px] font-semibold mt-1.5">
                            Placówka nie obsługuje badania z {materialLabel}
                          </p>
                        )}
                        {supported && facilityId === f.id && (
                          <div className="mt-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); setStep(step + 1); }}
                              className="w-full flex items-center justify-center gap-2 bg-[#5B65DC] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#4a53c7] transition-colors"
                            >
                              Wybieram tę placówkę
                              <IconArrowRight size={13} stroke={2} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {filtered.length === 0 && (
                    <p className="text-center text-[#8a8fa6] text-sm py-6">Nie znaleziono placówek dla &quot;{query}&quot;</p>
                  )}
                </div>

              </div>

              {/* Right — map (desktop) */}
              <div className="hidden lg:block rounded-xl overflow-hidden border border-[#EEEFFD] h-[540px] sticky top-24">
                <FacilitiesMap
                  facilities={mapFacilities}
                  activeId={facilityId}
                  onSelect={handleSelectFacility}
                />
              </div>
            </div>

            {/* Navigation — above NoFacilityForm */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-[#8a8fa6] text-sm font-semibold hover:text-[#122056] transition-colors"
              >
                <IconArrowLeft size={16} stroke={2} />
                Wstecz
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

            <NoFacilityForm />
          </div>
        )}

        {/* Step 3 — dane klienta */}
        {step === 3 && (
          <div>
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-2">
              Twoje dane
            </h1>
            <p className="text-[#8a8fa6] text-sm mb-8">Podaj dane potrzebne do realizacji zamówienia.</p>

            <div className="bg-white rounded-xl p-6 space-y-5">
              {/* Sekcja: Dane osobowe */}
              <h2 className="font-bold text-[#122056] text-sm">Dane osobowe</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Imię <span className="text-red-500">*</span>
                  </label>
                  <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Imię"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Nazwisko <span className="text-red-500">*</span>
                  </label>
                  <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nazwisko"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Adres e-mail <span className="text-red-500">*</span>
                  </label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Numer telefonu <span className="text-red-500">*</span>
                  </label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+48"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
              </div>

              {/* PESEL */}
              <div>
                <label htmlFor="pesel" className="block text-xs font-semibold text-[#122056] mb-1.5">
                  PESEL {!noPesel && <span className="text-red-500">*</span>}
                </label>
                <input id="pesel" type="text" value={pesel} onChange={(e) => setPesel(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="00000000000" disabled={noPesel} maxLength={11}
                  className={`w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6] ${noPesel ? 'opacity-40' : ''}`} />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input type="checkbox" checked={noPesel} onChange={(e) => { setNoPesel(e.target.checked); if (e.target.checked) setPesel(''); }}
                    className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer" />
                  <span className="text-xs text-[#8a8fa6]">Brak numeru PESEL</span>
                </label>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#EEEFFD]" />

              {/* Sekcja: Adres */}
              <h2 className="font-bold text-[#122056] text-sm">Adres zamieszkania</h2>

              <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_auto] gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="street" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Ulica <span className="text-red-500">*</span>
                  </label>
                  <input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Ulica"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
                <div>
                  <label htmlFor="houseNumber" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Nr domu <span className="text-red-500">*</span>
                  </label>
                  <input id="houseNumber" type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="Nr domu"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
                <div>
                  <label htmlFor="apartmentNumber" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Nr mieszkania
                  </label>
                  <input id="apartmentNumber" type="text" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder="Nr mieszkania"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Kod pocztowy <span className="text-red-500">*</span>
                  </label>
                  <input id="postalCode" type="text" value={postalCode}
                    onChange={(e) => {
                      let v = e.target.value.replace(/[^\d-]/g, '');
                      if (v.length === 2 && !v.includes('-') && postalCode.length < v.length) v += '-';
                      setPostalCode(v.slice(0, 6));
                    }}
                    placeholder="XX-XXX" maxLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-[#122056] mb-1.5">
                    Miasto <span className="text-red-500">*</span>
                  </label>
                  <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Miasto"
                    className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-white placeholder:text-[#c5c8d6]" />
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#EEEFFD]" />

              {/* Checkboxy */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer flex-shrink-0" />
                  <span className="text-sm text-[#122056] leading-relaxed">
                    Akceptuję <a href="/regulamin" className="text-[#5B65DC] underline hover:no-underline">regulamin</a> oraz <a href="/polityka-prywatnosci" className="text-[#5B65DC] underline hover:no-underline">politykę prywatności</a>. <span className="text-red-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={acceptMarketing} onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer flex-shrink-0" />
                  <span className="text-sm text-[#8a8fa6] leading-relaxed">
                    Wyrażam zgodę na przetwarzanie danych osobowych, w tym profilowanie w celu przesyłania na wskazany adres e-mail zindywidualizowanych informacji dot. akcji profilaktycznych w zakresie ochrony zdrowia i informacji z tym związanych.
                  </span>
                </label>
              </div>
            </div>

            <p className="text-[#8a8fa6] text-[11px] mt-4">
              <span className="text-red-500">*</span> Pola wymagane
            </p>
          </div>
        )}

        {/* Step 4 — podsumowanie */}
        {step === 4 && (
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
                    {panelType === 'profilaktyka' ? 'Profilaktyczny' : 'Onkologiczny'} — {panelType === 'onkologiczny' && panelTier === 'podstawowy' ? 'Kobiety' : panelType === 'onkologiczny' && panelTier === 'rozszerzony' ? 'Mężczyźni' : panelTier}
                  </p>
                  <p className="text-[#8a8fa6] text-xs mt-0.5">{selectedPanel.elements}</p>
                </div>
                <button onClick={() => setStep(1)} className="text-[#5B65DC] text-xs font-semibold hover:underline">Zmień</button>
              </div>

              {/* Placowka */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EEEFFD]">
                <div>
                  <p className="text-[#8a8fa6] text-xs mb-0.5">Placówka</p>
                  {selectedFacility ? (
                    <>
                      <p className="text-[#122056] font-bold text-sm">{selectedFacility.name}</p>
                      <p className="text-[#8a8fa6] text-xs mt-0.5">{selectedFacility.address}</p>
                    </>
                  ) : null}
                </div>
                <button onClick={() => setStep(2)} className="text-[#5B65DC] text-xs font-semibold hover:underline">Zmień</button>
              </div>

              {/* Dane klienta */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EEEFFD]">
                <div>
                  <p className="text-[#8a8fa6] text-xs mb-0.5">Dane klienta</p>
                  <p className="text-[#122056] font-bold text-sm">{firstName} {lastName}</p>
                  <p className="text-[#8a8fa6] text-xs mt-0.5">{email} &middot; {phone}</p>
                  {!noPesel && pesel && <p className="text-[#8a8fa6] text-xs">PESEL: {pesel}</p>}
                  <p className="text-[#8a8fa6] text-xs">
                    {street} {houseNumber}{apartmentNumber ? '/' + apartmentNumber : ''}, {postalCode} {city}
                  </p>
                </div>
                <button onClick={() => setStep(3)} className="text-[#5B65DC] text-xs font-semibold hover:underline">Zmień</button>
              </div>

              {/* Material */}
              <div className="pb-4 border-b border-[#EEEFFD]">
                <p className="text-[#8a8fa6] text-xs mb-0.5">Materiał</p>
                <p className="text-[#122056] font-bold text-sm">{selectedPanel.material}</p>
              </div>

              {/* Kod rabatowy */}
              <div className="pb-4 border-b border-[#EEEFFD]">
                <p className="text-[#8a8fa6] text-xs mb-2">Kod rabatowy</p>
                {promoResult?.valid ? (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-emerald-700 text-sm font-semibold">Kod {promoCode} zastosowany: {promoResult.label}</p>
                    </div>
                    <button
                      onClick={() => { setPromoCode(''); setPromoResult(null); }}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Usuń kod
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <IconTag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" stroke={1.5} />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoResult(null); }}
                          placeholder="Wpisz kod"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm bg-[#FAFAFD] placeholder:text-[#c5c8d6] uppercase"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={!promoCode.trim() || promoLoading}
                        className="px-5 py-2.5 rounded-xl bg-[#EEEFFD] text-[#122056] text-sm font-semibold hover:bg-[#e0e2f8] transition-colors disabled:opacity-40"
                      >
                        {promoLoading ? 'Sprawdzam...' : 'Zastosuj'}
                      </button>
                    </div>
                    {promoResult && !promoResult.valid && (
                      <p className="text-xs mt-2 text-red-500">{promoResult.error}</p>
                    )}
                  </>
                )}
              </div>

              {/* Cena */}
              <div>
                {discount > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#8a8fa6] text-sm">Cena</p>
                    <p className="text-[#8a8fa6] text-sm line-through">{selectedPanel.price} zł</p>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-emerald-600 text-sm">Rabat</p>
                    <p className="text-emerald-600 text-sm font-semibold">-{(discount / 100).toFixed(0)} zł</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-[#122056] font-bold text-base">Do zapłaty</p>
                  <p className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">{finalPrice} <span className="text-base text-[#8a8fa6] font-normal">zł</span></p>
                </div>
              </div>
            </div>

            <p className="text-[#8a8fa6] text-xs text-center mb-6">
              Cena brutto. Badanie zwolnione z VAT. Bez skierowania lekarskiego.
            </p>

            {submitError && (
              <div className="bg-red-50 text-red-700 text-sm rounded-xl p-4 mb-4">
                {submitError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#5B65DC] text-white font-semibold py-4 rounded-xl hover:bg-[#4a53c7] transition-colors text-base disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <IconLoader2 size={20} className="animate-spin" />
                  Przetwarzanie...
                </>
              ) : (
                `Zamów i zapłać — ${finalPrice} zł`
              )}
            </button>
          </div>
        )}

        {/* Navigation */}
        {step < STEPS && step !== 2 && (
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

        {step === STEPS && (
          <div className="flex justify-start mt-6">
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-[#8a8fa6] text-sm font-semibold hover:text-[#122056] transition-colors"
            >
              <IconArrowLeft size={16} stroke={2} />
              Wstecz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
