'use client';

import { useState } from 'react';
import { IconCircleCheck } from '@tabler/icons-react';
import { getSlugForPanel } from '@/src/data/products';

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
    desc: 'Panel prognostyczny dla kobiet z chorobą nowotworową.',
    material: 'Surowica',
    btnStyle: 'outline' as const,
    features: [
      'Se, Zn, Mn, Cu z surowicy',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Prognozowanie przeżyć chorych z nowotworami złośliwymi',
    ],
  },
  {
    name: 'Mężczyźni',
    price: 200,
    desc: 'Panel prognostyczny dla mężczyzn z chorobą nowotworową.',
    material: 'Surowica',
    btnStyle: 'filled' as const,
    features: [
      'Se, Zn, As, Cu z surowicy',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Prognozowanie przeżyć chorych z nowotworami złośliwymi',
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
            Wybierz odpowiedni pakiet
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-xl mx-auto">

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
              Krew
            </button>
            <button
              onClick={() => setTab('onkologiczny')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'onkologiczny'
                  ? 'bg-[#122056] text-white shadow-lg'
                  : 'text-[#122056] hover:bg-white/50'
              }`}
            >
              Surowica
            </button>
          </div>
        </div>

        {/* Info block */}
        <div className="bg-white/95 rounded-2xl border border-neutral-200/60 p-6 lg:p-8 mb-6">
          {tab === 'profilaktyka' ? (
            <div>
              <p className="text-[#122056] font-semibold text-sm mb-3">Wskazania do badania pierwiastków we krwi:</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-[#8a8fa6] text-sm"><span className="text-[#5B65DC] mt-0.5">•</span>dorosłe kobiety — nosicielki mutacji genu BRCA1</li>
                <li className="flex items-start gap-2 text-[#8a8fa6] text-sm"><span className="text-[#5B65DC] mt-0.5">•</span>pozostałe grupy kobiet bez nowotworów złośliwych w wieku zwłaszcza &gt; 40 lat</li>
                <li className="flex items-start gap-2 text-[#8a8fa6] text-sm"><span className="text-[#5B65DC] mt-0.5">•</span>mężczyźni bez nowotworów złośliwych w wieku zwłaszcza &gt; 40 lat</li>
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-[#122056] font-semibold text-sm mb-3">Wskazania do badania pierwiastków z surowicy:</p>
              <ul className="space-y-1.5 mb-4">
                <li className="flex items-start gap-2 text-[#8a8fa6] text-sm"><span className="text-[#5B65DC] mt-0.5">•</span>pacjenci z nowotworami złośliwymi (w celach prognostycznych co do przeżyć)</li>
              </ul>
              <p className="text-[#8a8fa6] text-sm leading-relaxed">
                Uwaga! Badanie panelu pierwiastków według aktualnych danych nie ma na celu monitorowania leczenia.
              </p>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative bg-white/95 rounded-2xl border border-neutral-200/60 overflow-hidden"
            >
              {('popular' in plan && (plan as { popular?: boolean }).popular) ? (
                <div className="absolute top-4 right-4 bg-[#5B65DC] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Polecany
                </div>
              ) : null}

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
                  href={`/badanie/${getSlugForPanel(tab, plan.name === 'Kobiety' ? 'podstawowy' : plan.name === 'Mężczyźni' ? 'rozszerzony' : plan.name.toLowerCase())}/`}
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
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <p className="text-[#122056] font-semibold text-xs mb-1">Uwaga!</p>
          <p className="text-[#8a8fa6] text-xs leading-relaxed">
            Celem zasadniczym jest profilaktyka zachorowań na nowotwory i obniżenie ryzyka zgonów (z jakiejkolwiek przyczyny, ang. all-cause mortality). Postępowanie profilaktyczne oparte o stężenie pierwiastków nie zastępuje innych form profilaktyki.
          </p>
        </div>
      </div>
    </section>
  );
}
