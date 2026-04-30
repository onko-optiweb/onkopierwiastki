'use client';

import { useState } from 'react';
import { IconFlask, IconUsers, IconMan } from '@tabler/icons-react';

const elementsHealthy = [
  { symbol: 'Se', name: 'Selen', number: 34, desc: 'Pierwiastek istotny dla odporności organizmu. Badania wskazują na związek niedoboru z podwyższonym ryzykiem nowotworów.', facts: ['Wspiera działanie enzymów antyoksydacyjnych chroniących komórki przed uszkodzeniami', 'Jest składnikiem selenoprotein, które uczestniczą w regulacji odpowiedzi immunologicznej'] },
  { symbol: 'Zn', name: 'Cynk', number: 30, desc: 'Pierwiastek kluczowy dla wielu procesów biologicznych. Badania wiążą jego nieprawidłowe stężenie u kobiet z podwyższonym ryzykiem nowotworów.', facts: ['Bierze udział w ponad 300 reakcjach enzymatycznych w organizmie człowieka', 'Odgrywa rolę w naprawie DNA i prawidłowym podziale komórek'] },
  { symbol: 'As', name: 'Arsen', number: 33, desc: 'Pierwiastek, którego stężenie poniżej normy u kobiet po 40. r.ż. może być według badań sygnałem do dalszej diagnostyki jelita grubego.', facts: ['W śladowych ilościach występuje naturalnie w glebie, wodzie i pożywieniu', 'Jego stężenie we krwi może być zaburzone przez spożycie ryb morskich i owoców morza'] },
  { symbol: 'Cu', name: 'Miedź', number: 29, desc: 'Pierwiastek o znaczeniu prognostycznym u pacjentów onkologicznych. Według badań nadmiar może być markerem ryzyka.', facts: ['Uczestniczy w produkcji energii komórkowej i tworzeniu tkanki łącznej', 'Wpływa na metabolizm żelaza i prawidłowe funkcjonowanie układu nerwowego'] },
  { symbol: 'Cd', name: 'Kadm', number: 48, desc: 'Pierwiastek związany m.in. z paleniem tytoniu i niektórymi pokarmami. Podwyższone stężenie według badań wiąże się z ryzykiem onkologicznym.', facts: ['Dym papierosowy jest jednym z głównych źródeł ekspozycji na kadm w populacji', 'Kumuluje się w organizmie — jego okres półtrwania w nerkach wynosi 10–30 lat'] },
  { symbol: 'Pb', name: 'Ołów', number: 82, desc: 'Pierwiastek, którego nadmiar według badań wiąże się ze zwiększonym ryzykiem u nosicielek mutacji BRCA1.', facts: ['Może przenikać do organizmu z zanieczyszczonego powietrza, wody i starych instalacji', 'Nawet niskie stężenia mogą wpływać na procesy komórkowe związane z ryzykiem onkologicznym'] },
];

export default function Elements() {
  const [active, setActive] = useState(0);

  return (
    <section id="pierwiastki" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Co dokładnie badamy?
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            W zależności od Twojej sytuacji zdrowotnej dobieramy odpowiedni panel badawczy.
          </p>
        </div>

        {/* Panel profilaktyczny — 6 pierwiastków */}
        <div className="mb-6 flex items-center gap-2">
          <IconFlask size={18} className="text-[#5B65DC]" stroke={1.5} />
          <p className="text-[#122056] text-sm font-bold">Panel dla osób zdrowych — krew pełna</p>
        </div>

        {/* Mobile: grid of 6 small buttons + detail below */}
        {/* Desktop: side tabs + detail right */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-5 mb-14">
          {/* Element selector */}
          <div className="relative">
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-1 gap-2">
              {elementsHealthy.map((el, i) => (
                <button
                  key={el.symbol}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-left transition-all border ${
                    active === i
                      ? 'bg-[#122056] text-white border-[#122056]'
                      : 'bg-[#EEEFFD]/50 text-[#122056] hover:bg-[#EEEFFD] border-[#EEEFFD]'
                  }`}
                >
                  <span className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center font-bold text-xs lg:text-sm flex-shrink-0 ${
                    active === i ? 'bg-white/15 text-white' : 'bg-white text-[#5B65DC]'
                  }`}>
                    {el.symbol}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs lg:text-sm font-bold truncate ${active === i ? 'text-white' : 'text-[#122056]'}`}>{el.name}</p>
                    <p className={`text-[10px] lg:text-[11px] hidden lg:block ${active === i ? 'text-white/50' : 'text-[#8a8fa6]'}`}>Nr {el.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active element detail */}
          <div className="bg-[#EEEFFD]/30 rounded-2xl p-5 sm:p-8 lg:p-10 border border-[#EEEFFD] flex flex-col justify-center lg:min-h-[380px] min-w-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#122056] flex flex-col items-center justify-center text-white flex-shrink-0">
                <span className="text-[8px] sm:text-[10px] opacity-50">{elementsHealthy[active].number}</span>
                <span className="text-lg sm:text-2xl font-bold -mt-0.5">{elementsHealthy[active].symbol}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-funnel)] font-bold text-black text-lg sm:text-2xl">{elementsHealthy[active].name}</h3>
                <p className="text-[#8a8fa6] text-xs">Pierwiastek nr {elementsHealthy[active].number} w układzie okresowym</p>
              </div>
            </div>
            <p className="text-[#8a8fa6] text-sm leading-relaxed mb-5">{elementsHealthy[active].desc}</p>

            {/* Facts */}
            <p className="text-[#122056] text-xs font-bold uppercase tracking-wider mb-2">Ciekawostki</p>
            <div className="space-y-2.5">
              {elementsHealthy[active].facts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl px-3 sm:px-4 py-3">
                  <span className="w-6 h-6 rounded-full bg-[#5B65DC]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#5B65DC] text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-[#122056] text-sm leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel onkologiczny */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-[#EEEFFD]/30 rounded-2xl p-5 sm:p-7 border border-[#EEEFFD]">
            <div className="flex items-center gap-2 mb-4">
              <IconUsers size={18} className="text-[#5B65DC]" stroke={1.5} />
              <p className="text-[#122056] text-sm font-bold">Panel onkologiczny — kobiety</p>
            </div>
            <p className="text-[#8a8fa6] text-sm leading-relaxed mb-3">
              Se, Zn, Mn, Cu z surowicy
            </p>
            <p className="text-[#8a8fa6] text-xs">
              + opcjonalnie As, Cd, Pb z krwi pełnej — monitoring ryzyka kolejnego nowotworu
            </p>
          </div>
          <div className="bg-[#EEEFFD]/30 rounded-2xl p-5 sm:p-7 border border-[#EEEFFD]">
            <div className="flex items-center gap-2 mb-4">
              <IconMan size={18} className="text-[#5B65DC]" stroke={1.5} />
              <p className="text-[#122056] text-sm font-bold">Panel onkologiczny — mężczyźni</p>
            </div>
            <p className="text-[#8a8fa6] text-sm leading-relaxed mb-3">
              As, Se, Zn, Cu z surowicy
            </p>
            <p className="text-[#8a8fa6] text-xs">
              + opcjonalnie Cd, Pb z krwi pełnej — monitoring ryzyka kolejnego nowotworu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
