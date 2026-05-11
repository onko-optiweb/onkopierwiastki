'use client';

import { useState } from 'react';
import { IconCircleCheck } from '@tabler/icons-react';

const profilaktyka = [
  {
    name: 'Podstawowy',
    price: 200,
    desc: 'Dla osób, które chcą zbadać wybrane pierwiastki.',
    material: 'Krew pełna',
    btnStyle: 'outline' as const,
    features: [
      '1–3 pierwiastki do wyboru',
      'As, Zn, Cd, Pb, Se lub Cu',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Bez skierowania lekarskiego',
    ],
  },
  {
    name: 'Rozszerzony',
    price: 230,
    popular: true,
    desc: 'Pełny panel profilaktyczny — najczęściej wybierany.',
    material: 'Krew pełna',
    btnStyle: 'filled' as const,
    features: [
      'Wszystkie 6 pierwiastków',
      'As, Se, Zn, Cu, Cd, Pb',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Bez skierowania lekarskiego',
      'Kompleksowy obraz ryzyka',
    ],
  },
];

const onkologiczny = [
  {
    name: 'Kobiety',
    price: 200,
    desc: 'Panel monitorujący dla kobiet z chorobą nowotworową.',
    material: 'Surowica',
    btnStyle: 'outline' as const,
    features: [
      'Se, Zn, Mn, Cu z surowicy',
      'Opcjonalnie: As, Cd, Pb z krwi',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Monitoring ryzyka kolejnego nowotworu',
    ],
  },
  {
    name: 'Rozszerzony',
    price: 230,
    popular: true,
    desc: 'Pełny panel onkologiczny z krwi i surowicy.',
    material: 'Surowica + krew pełna',
    btnStyle: 'filled' as const,
    features: [
      'Pełny zestaw z surowicy',
      'Dodatkowe As, Cd, Pb z krwi',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Kompleksowy monitoring',
      'Bez skierowania lekarskiego',
    ],
  },
];

export default function Pricing() {
  const [tab, setTab] = useState<'profilaktyka' | 'onkologiczny'>('profilaktyka');
  const plans = tab === 'profilaktyka' ? profilaktyka : onkologiczny;

  return (
    <section id="cennik" className="py-20 lg:py-28 bg-[#FAFAFD] relative overflow-hidden">
      {/* DNA background — both sides */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/images/genebackground.webp"
          alt=""
          className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-auto opacity-75"
        />
        <img
          src="/images/genebackground.webp"
          alt=""
          className="absolute top-1/2 -left-20 -translate-y-1/2 w-[600px] h-auto opacity-75 -scale-x-100"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Wybierz odpowiedni panel
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-xl mx-auto">
            Dwa rodzaje badania dopasowane do Twojej sytuacji zdrowotnej.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#EEEFFD] rounded-full p-1 flex gap-1">
            <button
              onClick={() => setTab('profilaktyka')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'profilaktyka'
                  ? 'bg-[#122056] text-white shadow-lg'
                  : 'text-[#122056] hover:bg-white/50'
              }`}
            >
              Profilaktyka
            </button>
            <button
              onClick={() => setTab('onkologiczny')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'onkologiczny'
                  ? 'bg-[#122056] text-white shadow-lg'
                  : 'text-[#122056] hover:bg-white/50'
              }`}
            >
              Pacjenci onkologiczni
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative bg-white/95 rounded-2xl border border-neutral-200/60 overflow-hidden"
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-[#5B65DC] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Najpopularniejszy
                </div>
              )}

              {/* Top section */}
              <div className="p-8 pb-6">
                <p className="font-[family-name:var(--font-funnel)] font-bold text-black text-xl mb-4">
                  {plan.name}
                </p>

                <p className="text-[#8a8fa6] text-xs mb-1">Cena od</p>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-[family-name:var(--font-funnel)] font-bold text-5xl text-black">
                    {plan.price}
                  </span>
                  <span className="text-[#8a8fa6] text-sm">zł / {plan.material.toLowerCase()}</span>
                </div>

                <p className="text-[#8a8fa6] text-sm mb-6">{plan.desc}</p>

                <a
                  href={`/zamow?typ=${tab}&wariant=${plan.name === 'Kobiety' ? 'podstawowy' : plan.name.toLowerCase()}`}
                  className={`block text-center text-sm font-semibold py-3.5 rounded-full transition-colors ${
                    plan.btnStyle === 'filled'
                      ? 'bg-[#5B65DC] text-white hover:bg-[#4a53c7]'
                      : 'bg-white text-[#122056] border-2 border-[#122056] hover:bg-[#122056] hover:text-white'
                  }`}
                >
                  Zamów badanie
                </a>
              </div>

              {/* Divider */}
              <div className="mx-8 border-t border-neutral-100" />

              {/* Features */}
              <div className="p-8 pt-6">
                <p className="text-[#122056] text-xs font-semibold mb-4">Co otrzymasz:</p>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <IconCircleCheck
                        size={17}
                        className="text-[#5B65DC] flex-shrink-0 mt-0.5"
                        stroke={1.5}
                      />
                      <span className="text-[#8a8fa6] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#8a8fa6] text-xs text-center mt-8">
          Ceny brutto. Badanie zwolnione z podatku VAT. Bez skierowania lekarskiego.
        </p>
      </div>
    </section>
  );
}
