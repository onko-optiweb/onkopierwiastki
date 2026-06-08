'use client';

import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

const rows = [
  {
    label: 'Co mierzy',
    standard: 'Morfologia, lipidy, glukoza',
    onko: 'Pierwiastki + spersonalizowane normy',
  },
  {
    label: 'Zakresy referencyjne',
    standard: 'Uniwersalne',
    onko: 'Wyłącznie dla populacji polskiej',
  },
  {
    label: 'Personalizacja',
    standard: 'Brak',
    onko: 'Płeć, wiek, palenie, mutacje BRCA1',
  },
  {
    label: 'Podstawa naukowa',
    standard: 'Standardy ogólne',
    onko: '20+ patentów UP RP, 30+ publikacji PubMed',
  },
  {
    label: 'Wynik zawiera',
    standard: 'Liczby + ogólne normy',
    onko: 'Liczby + spersonalizowane zalecenia',
  },
];

export default function AboutTest() {
  return (
    <section id="czym-jest-badanie" className="py-14 lg:py-20 bg-[#FAFAFD] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src="/images/geny5.webp" alt="" className="absolute top-1/2 -right-20 -translate-y-1/2 w-[500px] h-auto opacity-30 lg:opacity-70" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Co odróżnia badanie pierwiastków od innych badań?
          </h2>
        </div>

        {/* Desktop — horizontal table */}
        <div className="hidden lg:block">
          {/* Header row */}
          <div className="grid grid-cols-[200px_1fr_1fr] gap-3 mb-3">
            <div />
            <div className="bg-white rounded-xl px-5 py-3 border border-neutral-200/60 text-center">
              <p className="text-[#8a8fa6] text-sm font-semibold">Standardowe badania</p>
            </div>
            <div className="bg-white rounded-xl px-5 py-3 border-2 border-[#5B65DC] text-center relative">
              <span className="absolute -top-2.5 right-4 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Rekomendowane</span>
              <p className="text-[#122056] text-sm font-bold">Badanie pierwiastków</p>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-[200px_1fr_1fr] gap-3 ${i < rows.length - 1 ? 'mb-2' : ''}`}>
              <div className="flex items-center px-2">
                <p className="text-[#122056] text-sm font-bold">{row.label}</p>
              </div>
              <div className="bg-red-50/40 rounded-xl px-5 py-3.5 flex items-center gap-2.5">
                <IconCircleX size={16} className="text-red-400 flex-shrink-0" stroke={1.5} />
                <p className="text-[#8a8fa6] text-sm">{row.standard}</p>
              </div>
              <div className="bg-green-50/40 rounded-xl px-5 py-3.5 flex items-center gap-2.5 border border-[#5B65DC]/10">
                <IconCircleCheck size={16} className="text-green-500 flex-shrink-0" stroke={1.5} />
                <p className="text-[#122056] text-sm font-medium">{row.onko}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — two sections */}
        <div className="lg:hidden space-y-6">
          {/* Inne badania */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IconCircleX size={18} className="text-red-400" stroke={1.5} />
              <p className="text-[#122056] font-bold text-base">Inne badania</p>
            </div>
            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-2 bg-red-50/40 rounded-xl px-4 py-3 border border-red-100/50">
                  <IconCircleX size={14} className="text-red-400 flex-shrink-0 mt-0.5" stroke={1.5} />
                  <div>
                    <span className="text-[#122056] text-xs font-bold">{row.label}: </span>
                    <span className="text-[#8a8fa6] text-[13px]">{row.standard}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BadamyPierwiastki */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IconCircleCheck size={18} className="text-green-500" stroke={1.5} />
              <p className="text-[#122056] font-bold text-base">Badanie pierwiastków</p>
              <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Rekomendowane</span>
            </div>
            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-2 bg-green-50/40 rounded-xl px-4 py-3 border border-green-100/50">
                  <IconCircleCheck size={14} className="text-green-500 flex-shrink-0 mt-0.5" stroke={1.5} />
                  <div>
                    <span className="text-[#122056] text-xs font-bold">{row.label}: </span>
                    <span className="text-[#122056] text-[13px] font-medium">{row.onko}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Polish norms */}
        <div className="mt-8 bg-[#EEEFFD]/50 rounded-2xl p-8 border border-[#EEEFFD]">
          <h3 className="font-[family-name:var(--font-funnel)] font-bold text-black text-lg mb-3">Dlaczego normy dla populacji polskiej?</h3>
          <p className="text-[#8a8fa6] text-sm leading-relaxed">
            Badania naukowe pokazują, że średnie stężenia pierwiastków różnią się w zależności od regionu, diety i nawyków. Normy ogólne mogą nie oddawać rzeczywistego obrazu Twojego ryzyka. Zakresy referencyjne badania pierwiastków zostały opracowane na podstawie wieloletnich badań populacji polskiej przez Międzynarodowe Centrum Nowotworów Dziedzicznych PUM w Szczecinie.
          </p>
        </div>

        <div className="text-center mt-10">
          <a
            href="/zamow"
            className="inline-flex items-center gap-2 bg-[#5B65DC] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm"
          >
            Zamów badanie pierwiastków
          </a>
        </div>
      </div>
    </section>
  );
}
