'use client';

import { useState } from 'react';
import { IconFlask, IconAlertTriangle, IconHeartbeat, IconMicroscope, IconStethoscope, IconLeaf, IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

interface ElementData {
  symbol: string;
  name: string;
  number: number;
  intro: string;
  actions: string[];
  isMetalloestrogen?: boolean;
  cancerSignificance: string;
  cancerDetail: string;
  abnormalIntro?: string;
  abnormalWarning: string;
  abnormalEffects: string[];
  optimizationUp?: { title: string; items: string[] };
  optimizationDown?: { title: string; items: string[] };
  optimizationGeneral?: { title: string; items: string[] };
  optimalFactors: string[];
  includesSmoking: boolean;
  nameGenitive: string;
}

const elements: ElementData[] = [
  {
    symbol: 'Se',
    name: 'Selen',
    nameGenitive: 'selenu',
    number: 34,
    intro: 'Selen – niezbędny mikroelement, którego stężenie w organizmie nie może być ani za niskie, ani za wysokie. Niezbędny dla zdrowia i odporności.',
    actions: [
      'neutralizuje wolne rodniki',
      'obniża poziom stresu oksydacyjnego',
      'jest składnikiem enzymów antyoksydacyjnych',
      'wspiera pracę układu odpornościowego',
      'bierze udział w produkcji hormonów tarczycy',
    ],
    cancerSignificance: 'Szczególne znaczenie Se w prewencji nowotworów',
    cancerDetail: 'Optymalne stężenie selenu pomaga chronić DNA przed uszkodzeniami, zmniejsza przewlekły stan zapalny. Nieprawidłowe stężenie selenu jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe oraz z kilkukrotnie wyższym ryzykiem zgonów w młodszym wieku.',
    abnormalIntro: 'Zarówno niedobór, jak i nadmiar selenu może mieć niekorzystny wpływ na organizm człowieka.',
    abnormalWarning: 'Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety, ani suplementacji.',
    abnormalEffects: [
      'spada odporność',
      'zwiększa się narażenie na stres oksydacyjny',
      'mogą pojawiać się zaburzenia funkcji tarczycy',
    ],
    optimizationUp: {
      title: 'Metody zwiększenia stężenia selenu:',
      items: [
        'Poprzez modyfikację diety: orzechy (brazylijskie, nerkowce, włoskie), rośliny strączkowe (soczewica, fasola, groch)',
        'Poprzez suplementację: preparaty zawierające selenian (IV) sodu',
      ],
    },
    optimizationDown: {
      title: 'Metody zmniejszenia stężenia selenu:',
      items: [
        'Czasowe wykluczenie z diety produktów bogatych w selen',
        'Odstawienie lub zmiana stosowanych suplementów diety, jeśli w ich składzie jest selen',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'historii palenia', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: true,
  },
  {
    symbol: 'Zn',
    name: 'Cynk',
    nameGenitive: 'cynku',
    number: 30,
    intro: 'Cynk – niezbędny pierwiastek, który chroni komórki przed stresem oksydacyjnym i może działać ochronnie przeciw nowotworom.',
    actions: [
      'bierze udział w procesach odpornościowych',
      'zmniejsza poziom stresu oksydacyjnego',
      'reguluje poziom insuliny i testosteronu',
      'odpowiada za prawidłową kondycję włosów, skóry, paznokci',
    ],
    cancerSignificance: 'Szczególne znaczenie Zn w prewencji nowotworów',
    cancerDetail: 'Cynk wspiera naprawę uszkodzeń DNA i zwiększa odporność w walce z nieprawidłowymi komórkami. Nieprawidłowe stężenie cynku jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe.',
    abnormalWarning: 'Zarówno niedobór, jak i nadmiar cynku może mieć niekorzystny wpływ na organizm człowieka. Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety ani suplementacji.',
    abnormalEffects: [
      'wzrasta ryzyko uszkodzeń DNA',
      'pojawiają się zaburzenia odporności',
      'występuje nieprawidłowe gojenie się ran',
      'dochodzi do zaburzeń gospodarki hormonalnej, w tym obniżenia płodności',
    ],
    optimizationUp: {
      title: 'Metody zwiększenia stężenia cynku:',
      items: [
        'Poprzez modyfikację diety: zwiększenie spożycia czerwonego mięsa, podrobów, ziaren i produktów pełnoziarnistych',
        'Poprzez suplementację: pikolinian cynku, siarczan cynku, cytrynian cynku, orotan cynku',
      ],
    },
    optimizationDown: {
      title: 'Metody zmniejszenia stężenia cynku:',
      items: [
        'Czasowe wykluczenie lub ograniczenie spożycia z diety produktów bogatych w cynk',
        'Odstawienie lub zmiana stosowanych suplementów diety zawierających cynk',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'historii palenia', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: true,
  },
  {
    symbol: 'As',
    name: 'Arsen',
    nameGenitive: 'arsenu',
    number: 33,
    intro: 'Arsen – pierwiastek prozapalny, powszechnie występujący w środowisku, żywności (np. ryż, ryby) i wodzie. Do środowiska trafia głównie przez działalność człowieka np. górnictwo, hutnictwo, pestycydy.',
    actions: [
      'indukuje powstawanie wolnych rodników (reaktywnych form tlenu)',
      'reguluje cykl życia komórek (indukuje proces apoptozy, wpływa na proliferację komórek)',
    ],
    isMetalloestrogen: true,
    cancerSignificance: 'Szczególne znaczenie As w prewencji nowotworów',
    cancerDetail: 'Nieprawidłowe stężenie arsenu jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe.',
    abnormalWarning: 'Nieprawidłowe stężenie arsenu może mieć niekorzystny wpływ na organizm człowieka. Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety.',
    abnormalEffects: [],
    optimizationGeneral: {
      title: 'Metody optymalizowania stężenia arsenu:',
      items: [
        'Odpowiednia zawartość w diecie produktów bogatych w arsen (ryby słonowodne, owoce morza, ryż, kakao)',
        'Kontrola suplementów/preparatów wytwarzanych z organizmów morskich (tran, oleje rybne, wyciągi z wątroby rekina)',
        'Unikanie owoców i warzyw uprawianych nieekologicznie',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: false,
  },
  {
    symbol: 'Cu',
    name: 'Miedź',
    nameGenitive: 'miedzi',
    number: 29,
    intro: 'Miedź – niezbędny pierwiastek, którego stężenie w organizmie nie może być ani za niskie, ani za wysokie. Pełni funkcję ochronną przed niekorzystnym wpływem na organizm reaktywnych form tlenu. Niezbędny czynnik do prawidłowego działania enzymów.',
    actions: [
      'wchodzi w skład kluczowych reakcji enzymatycznych',
      'reguluje transport żelaza',
      'reguluje pracę układu nerwowego',
      'uczestniczy w reakcjach antyoksydacyjnych',
    ],
    isMetalloestrogen: true,
    cancerSignificance: 'Szczególne znaczenie Cu w prewencji nowotworów i prognozowaniu przeżyć u pacjentów onkologicznych',
    cancerDetail: 'Nieprawidłowe stężenie miedzi jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe. Miedź jest markerem prognostycznym przeżyć u pacjentów onkologicznych.',
    abnormalWarning: 'Zarówno niedobór, jak i nadmiar miedzi może mieć niekorzystny wpływ na organizm człowieka. Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety ani suplementacji.',
    abnormalEffects: [
      'zwiększa się narażenie na stres oksydacyjny',
      'możliwe osłabienie, spadek odporności i anemia',
      'nieprawidłowe działanie enzymów',
      'wysokie stężenie Cu może wskazywać na stany zapalne lub proces nowotworowy',
    ],
    optimizationGeneral: {
      title: 'Możliwe przyczyny nieprawidłowego stężenia miedzi:',
      items: [
        'Odpowiednia zawartość w diecie produktów bogatych (np. wątroba, płatki zbożowe, fasola) i ubogich w Cu (np. mleko, kukurydza, kalafior)',
        'Kontrola suplementów/preparatów zawierających w składzie miedź',
        'Efektywność regulacji stężenia Cu we krwi jest słabo poznana, badania nad tym trwają',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'historii palenia', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: true,
  },
  {
    symbol: 'Cd',
    name: 'Kadm',
    nameGenitive: 'kadmu',
    number: 48,
    intro: 'Kadm – bardzo istotny czynnik toksykologiczny. Silnie związany z paleniem papierosów, a także z dietą.',
    actions: [
      'uszkadza DNA',
      'indukuje stres oksydacyjny',
      'hamuje naprawę DNA oraz metylację',
    ],
    isMetalloestrogen: true,
    cancerSignificance: 'Szczególne znaczenie kadmu w prewencji nowotworów i przedwczesnych zgonów',
    cancerDetail: 'Nieprawidłowe stężenie kadmu jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe oraz wyższym ryzykiem przedwczesnych zgonów.',
    abnormalWarning: 'Nieprawidłowe stężenie kadmu może mieć niekorzystny wpływ na organizm człowieka. Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety.',
    abnormalEffects: [
      'zwiększa się ryzyko zachorowania na nowotwory złośliwe',
      'zwiększa się ryzyko przedwczesnych zgonów',
    ],
    optimizationGeneral: {
      title: 'Metody optymalizacji stężenia kadmu:',
      items: [
        'Odpowiednia zawartość w diecie produktów bogatych (nasiona słonecznika, wątroba) oraz ubogich w kadm (wołowina, wieprzowina)',
        'Efektywność modyfikacji stężenia kadmu we krwi jest słabo poznana, trwają badania',
        'Palenie czynne/bierne istotnie podwyższa stężenie kadmu',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'historii palenia', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: true,
  },
  {
    symbol: 'Pb',
    name: 'Ołów',
    nameGenitive: 'ołowiu',
    number: 82,
    intro: 'Ołów – metal ciężki, znany jako jeden z najważniejszych toksycznych pierwiastków śladowych.',
    actions: [
      'zwiększa upośledzenie układu immunologicznego',
      'zwiększa narażenie na stres oksydacyjny',
    ],
    isMetalloestrogen: true,
    cancerSignificance: 'Szczególne znaczenie ołowiu w prewencji nowotworów',
    cancerDetail: 'Nieprawidłowe stężenie ołowiu jest związane z kilkukrotnie zwiększonym ryzykiem zachorowania na nowotwory złośliwe.',
    abnormalWarning: 'Nieprawidłowe stężenie ołowiu może mieć niekorzystny wpływ na organizm człowieka. Bez znajomości jego aktualnego stężenia, nie należy wprowadzać modyfikacji diety.',
    abnormalEffects: [],
    optimizationGeneral: {
      title: 'Metody optymalizacji stężenia ołowiu:',
      items: [
        'Efektywność modyfikacji stężenia ołowiu we krwi jest słabo poznana (trwają próby kliniczne dotyczące odtruwania z ołowiu)',
        'Wśród osób, które są narażone zawodowo na ekspozycję bądź uczęszczają na strzelnicę stężenie Pb może być wysokie',
      ],
    },
    optimalFactors: ['wieku pacjenta', 'płci', 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)'],
    includesSmoking: false,
  },
];

const slideTitles = [
  { label: 'Jak działa?', icon: IconStethoscope },
  { label: 'Nieprawidłowe stężenie', icon: IconAlertTriangle },
  { label: 'Optymalne stężenia', icon: IconHeartbeat },
  { label: 'Badania naukowe', icon: IconMicroscope },
];

function Slide1({ el }: { el: ElementData }) {
  return (
    <div className="space-y-4">
      <p className="text-[#444] text-sm leading-relaxed">{el.intro}</p>

      <div className="space-y-2">
        {el.actions.map((a, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5 flex-shrink-0 text-sm">&#10003;</span>
            <span className="text-[#444] text-sm leading-relaxed">{a}</span>
          </div>
        ))}
        {el.isMetalloestrogen && (
          <div className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5 flex-shrink-0 text-sm">&#9888;</span>
            <span className="text-[#444] text-sm leading-relaxed">jest metaloestrogenem (naśladuje działanie estrogenu)</span>
          </div>
        )}
      </div>

      <div className="bg-[#EEEFFD]/50 rounded-xl p-4 border border-[#EEEFFD]">
        <p className="text-[#122056] text-xs font-bold mb-1">{el.cancerSignificance}</p>
        <p className="text-[#444] text-sm leading-relaxed">{el.cancerDetail}</p>
      </div>
    </div>
  );
}

function Slide2({ el }: { el: ElementData }) {
  return (
    <div className="space-y-4">
      {el.abnormalEffects.length > 0 && (
        <div className="space-y-2">
          {el.abnormalEffects.map((e, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0 text-sm">&#9888;</span>
              <span className="text-[#444] text-sm leading-relaxed">{e}</span>
            </div>
          ))}
        </div>
      )}

      {el.abnormalIntro && (
        <p className="text-[#444] text-sm leading-relaxed">{el.abnormalIntro}</p>
      )}

      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <p className="text-red-800 text-sm font-semibold">Uwaga! {el.abnormalWarning}</p>
      </div>

      {el.optimizationUp && (
        <div>
          <p className="text-[#122056] text-sm font-bold mb-2">{el.optimizationUp.title}</p>
          <ul className="space-y-1.5">
            {el.optimizationUp.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <IconLeaf size={14} className="text-green-500 mt-0.5 flex-shrink-0" stroke={1.5} />
                <span className="text-[#444] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {el.optimizationDown && (
        <div>
          <p className="text-[#122056] text-sm font-bold mb-2">{el.optimizationDown.title}</p>
          <ul className="space-y-1.5">
            {el.optimizationDown.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <IconChevronRight size={14} className="text-[#5B65DC] mt-0.5 flex-shrink-0" stroke={1.5} />
                <span className="text-[#444] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {el.optimizationGeneral && (
        <div>
          <p className="text-[#122056] text-sm font-bold mb-2">{el.optimizationGeneral.title}</p>
          <ul className="space-y-1.5">
            {el.optimizationGeneral.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <IconChevronRight size={14} className="text-[#5B65DC] mt-0.5 flex-shrink-0" stroke={1.5} />
                <span className="text-[#444] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Slide3({ el }: { el: ElementData }) {
  const factors: { icon: string; label: string }[] = [
    { icon: '⏳', label: 'wieku pacjenta' },
    { icon: '♀️ / ♂️', label: 'płci' },
  ];
  if (el.includesSmoking) {
    factors.push({ icon: '🚬', label: 'historii palenia' });
  }
  factors.push({ icon: '🧬', label: 'wyniku badania DNA na obecność mutacji genu BRCA1 (u kobiet)' });

  return (
    <div className="space-y-4">
      <p className="text-[#444] text-sm leading-relaxed">
        Optymalne stężenia {el.nameGenitive} dla osób dorosłych ustalane z uwzględnieniem:
      </p>

      <div className="space-y-2">
        {factors.map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 border border-[#EEEFFD]">
            <span className="text-base flex-shrink-0">{f.icon}</span>
            <span className="text-[#122056] text-sm">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#122056] rounded-xl p-5 text-white">
        <p className="text-sm leading-relaxed mb-2">
          Zespół Read-Gene S.A. na podstawie badań naukowych prowadzonych we współpracy z Pomorskim Uniwersytetem Medycznym w Szczecinie opracował i nadal aktualizuje optymalne normy stężenia {el.nameGenitive}.
        </p>
        <p className="text-xs text-white/60 leading-relaxed">
          Zalecane zakresy stężeń ustalane są na podstawie badań własnych. Są to badania asocjacyjne prospektywne nad korelacją stężenia pierwiastków z zapadalnością na nowotwory złośliwe i śmiertelnością niezależnie od przyczyny.
        </p>
      </div>
    </div>
  );
}

function Slide4({ el }: { el: ElementData }) {
  return (
    <div className="space-y-4">
      <p className="text-[#444] text-sm font-medium">Badane grupy pacjentów (kohorty):</p>
      <div className="space-y-2">
        {[
          'dorosłe kobiety – nosicielki mutacji genu BRCA1',
          'pozostałe grupy kobiet bez nowotworów złośliwych w wieku powyżej 40 lat',
          'mężczyźni bez nowotworów złośliwych w wieku powyżej 40 lat',
          'pacjenci z nowotworami złośliwymi (w celach prognostycznych co do przeżyć)',
        ].map((group, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[#5B65DC] mt-0.5 flex-shrink-0 text-sm">➡</span>
            <span className="text-[#444] text-sm leading-relaxed">{group}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 border border-[#EEEFFD]">
        <p className="text-[#122056] text-sm font-bold mb-1">Przygotowanie do badania:</p>
        <p className="text-[#444] text-sm">
          min. 4 godziny na czczo | na 3 dni przed badaniem wykluczenie z diety ryb, owoców morza, ryżu
        </p>
      </div>

      <div className="text-center pt-2">
        <p className="text-[#444] text-sm mb-3">
          Myślisz o sprawdzeniu stężenia {el.nameGenitive} i poznaniu indywidualnych zaleceń?
        </p>
        <a
          href="/zamow"
          className="inline-flex items-center gap-2 bg-[#5B65DC] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm"
        >
          Zamów badanie
          <IconChevronRight size={16} stroke={2} />
        </a>
      </div>
    </div>
  );
}

export default function Elements() {
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const el = elements[active];

  const handleElementChange = (i: number) => {
    setActive(i);
    setSlide(0);
  };

  const slides = [
    <Slide1 key="s1" el={el} />,
    <Slide2 key="s2" el={el} />,
    <Slide3 key="s3" el={el} />,
    <Slide4 key="s4" el={el} />,
  ];

  return (
    <section id="pierwiastki" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Co dokładnie badamy?
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            Badanie pierwiastków obejmuje 6 kluczowych pierwiastków. Kliknij w wybrany pierwiastek, by poznać szczegóły.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <IconFlask size={18} className="text-[#5B65DC]" stroke={1.5} />
          <p className="text-[#122056] text-sm font-bold">Panel dla osób zdrowych — krew pełna</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-5">
          {/* Left: element selector */}
          <div className="relative">
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-1 gap-2">
              {elements.map((e, i) => (
                <button
                  key={e.symbol}
                  onClick={() => handleElementChange(i)}
                  className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-left transition-all border ${
                    active === i
                      ? 'bg-[#122056] text-white border-[#122056]'
                      : 'bg-[#EEEFFD]/50 text-[#122056] hover:bg-[#EEEFFD] border-[#EEEFFD]'
                  }`}
                >
                  <span className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center font-bold text-xs lg:text-sm flex-shrink-0 ${
                    active === i ? 'bg-white/15 text-white' : 'bg-white text-[#5B65DC]'
                  }`}>
                    {e.symbol}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs lg:text-sm font-bold truncate ${active === i ? 'text-white' : 'text-[#122056]'}`}>{e.name}</p>
                    <p className={`text-[10px] lg:text-[11px] hidden lg:block ${active === i ? 'text-white/50' : 'text-[#8a8fa6]'}`}>Nr {e.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: detail with inner slider */}
          <div className="bg-[#EEEFFD]/30 rounded-2xl border border-[#EEEFFD] flex flex-col min-w-0">
            {/* Header with element info */}
            <div className="p-5 sm:p-8 pb-0 sm:pb-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#122056] flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-[8px] sm:text-[9px] opacity-50">{el.number}</span>
                  <span className="text-lg sm:text-xl font-bold -mt-0.5">{el.symbol}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-funnel)] font-bold text-black text-lg sm:text-2xl">{el.name}</h3>
                  <p className="text-[#8a8fa6] text-xs">Pierwiastek nr {el.number} w układzie okresowym</p>
                </div>
              </div>

              {/* Slide tabs */}
              <div className="flex gap-1 overflow-x-auto pb-0 -mb-px">
                {slideTitles.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl whitespace-nowrap transition-colors ${
                        slide === i
                          ? 'bg-white text-[#122056] border border-[#EEEFFD] border-b-white'
                          : 'text-[#8a8fa6] hover:text-[#122056]'
                      }`}
                    >
                      <Icon size={14} stroke={1.5} />
                      <span className={slide === i ? '' : 'hidden sm:inline'}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slide content */}
            <div className="bg-white rounded-b-2xl border-t border-[#EEEFFD] p-5 sm:p-8 flex-1">
              {slides[slide]}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-[#EEEFFD]/30 rounded-b-2xl">
              <button
                onClick={() => setSlide(Math.max(0, slide - 1))}
                disabled={slide === 0}
                className="flex items-center gap-1 text-sm text-[#5B65DC] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
              >
                <IconChevronLeft size={16} stroke={2} />
                Wstecz
              </button>
              <div className="flex gap-1.5">
                {slideTitles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      slide === i ? 'bg-[#5B65DC]' : 'bg-[#5B65DC]/20'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlide(Math.min(3, slide + 1))}
                disabled={slide === 3}
                className="flex items-center gap-1 text-sm text-[#5B65DC] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
              >
                Dalej
                <IconChevronRight size={16} stroke={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
