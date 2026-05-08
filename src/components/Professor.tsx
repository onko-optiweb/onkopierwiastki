import Image from 'next/image';
import { IconQuote } from '@tabler/icons-react';

const stats = [
  { value: '700+', label: 'publikacji naukowych' },
  { value: '100+', label: 'patentów przyznanych i zgłoszonych' },
  { value: '30+ lat', label: 'badań nad genetyką nowotworów' },
];

export default function Professor() {
  return (
    <section id="o-badaniu" className="py-20 lg:py-28 bg-[#FAFAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-72 sm:w-80 lg:w-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/IMG_6439.webp"
                  alt="Prof. dr hab. n. med. Jan Lubiński — twórca badania onkopierwiastków"
                  width={400}
                  height={530}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md px-4 py-3 border border-[#EEEFFD]">
                <p className="text-[#122056] font-bold text-sm">Top 2 w Polsce</p>
                <p className="text-[#8a8fa6] text-[11px]">Ranking Research.com 2023</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-[#5B65DC] font-semibold text-sm mb-2">Twórca badania</p>
              <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-1">
                Prof. dr hab. n. med. Jan Lubiński
              </h2>
              <p className="text-[#8a8fa6] text-sm">
                Założyciel Międzynarodowego Centrum Nowotworów Dziedzicznych, PUM Szczecin
              </p>
            </div>

            {/* Bio card */}
            <div className="bg-white rounded-xl p-5 border border-[#EEEFFD]">
              <p className="text-[#122056] text-sm leading-relaxed">
                Uznany ekspert w dziedzinie genetyki klinicznej nowotworów, autor ponad 700 publikacji naukowych
                w renomowanych czasopismach międzynarodowych. W 2023 roku zajął <strong>drugie miejsce w rankingu
                najlepszych naukowców w dyscyplinie medycyna wśród Polaków</strong> i 1962 na świecie (Research.com).
                Główny współautor blisko 100 polskich zgłoszeń patentowych oraz 40 przyznanych
                i skomercjalizowanych patentów wykorzystywanych w codziennej diagnostyce.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-[#EEEFFD] text-center">
                  <p className="font-bold text-[#122056] text-lg">{stat.value}</p>
                  <p className="text-[#8a8fa6] text-[11px] leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="relative bg-[#122056] rounded-xl p-6 text-white">
              <IconQuote size={28} className="text-[#5B65DC] mb-2" stroke={1.5} />
              <p className="text-sm leading-relaxed text-white/90">
                Badania prowadzone w naszym Ośrodku na polskiej populacji wykazały, że optymalne stężenia
                wybranych pierwiastków mogą znacząco, nawet kilkukrotnie, obniżyć ryzyko zachorowania
                na nowotwory złośliwe. Ich odpowiednie stężenie można wspierać poprzez dobrze zbilansowaną
                dietę lub suplementację.
              </p>
              <p className="mt-3 text-white/50 text-xs">
                Prof. Jan Lubiński, PUM Szczecin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
