'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { IconChevronLeft, IconChevronRight, IconUser, IconUsers, IconDna, IconSmoking, IconStethoscope, IconSalad } from '@tabler/icons-react';
import { type ReactNode } from 'react';

const groups: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <IconUser size={22} stroke={1.5} />,
    title: 'Każda dorosła osoba',
    desc: 'Profilaktycznie, aby znać swój poziom ryzyka zachorowania na nowotwory złośliwe oraz zgonu niezależnie od przyczyny w młodszym wieku.',
  },
  {
    icon: <IconUsers size={22} stroke={1.5} />,
    title: 'Osoby z wywiadem rodzinnym',
    desc: 'W Twojej rodzinie występowały nowotwory, badanie pozwoli ocenić indywidualne ryzyko.',
  },
  {
    icon: <IconDna size={22} stroke={1.5} />,
    title: 'Nosicielki mutacji BRCA1',
    desc: 'Normy opracowane specjalnie dla tej grupy na podstawie wieloletnich badań.',
  },
  {
    icon: <IconSmoking size={22} stroke={1.5} />,
    title: 'Osoby palące',
    desc: 'Niektóre pierwiastki mają inne zakresy referencyjne dla palaczy - wynik uwzględnia ten czynnik.',
  },
  {
    icon: <IconStethoscope size={22} stroke={1.5} />,
    title: 'Pacjenci onkologiczni',
    desc: 'Zebrane przez nas dane zdecydowanie wskazują, że pierwiastki takie jak selen i cynk mają istotne znaczenie dla prognozowania przeżyć chorych z nowotworami złośliwymi o różnej lokalizacji. ',
  },
  {
    icon: <IconSalad size={22} stroke={1.5} />,
    title: 'Osoby na dietach eliminacyjnych',
    desc: 'Weganie i wegetarianie mogą mieć istotnie wyższe stężenie selenu i kadmu we krwi.',
  },
];

export default function ForWhom() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="dla-kogo" className="py-14 lg:py-20 bg-[#122056] relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/2150471457.webp" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#122056]/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with arrows */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-white mb-4">
              Kto powinien zbadać swoje pierwiastki?
            </h2>
            <p className="text-white/50 text-sm lg:text-base max-w-2xl">
              Badanie jest zalecane dla wszystkich dorosłych z populacji polskiej. W szczególności dla:
            </p>
          </div>
          <div className="hidden sm:flex gap-2 flex-shrink-0 ml-8">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <IconChevronLeft size={18} stroke={2} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <IconChevronRight size={18} stroke={2} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {groups.map((g, i) => (
              <div
                key={g.title}
                className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_33.333%] min-w-0 px-2"
              >
                <div
                  className={`h-full p-6 rounded-xl transition-all cursor-pointer ${
                    selectedIndex === i
                      ? 'bg-white/20'
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
                  onClick={() => scrollTo(i)}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white mb-4">
                    {g.icon}
                  </div>
                  <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-base mb-2">
                    {g.title}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    selectedIndex === i ? 'text-white/70' : 'text-white/45'
                  }`}>
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <p className="mt-8 text-white font-bold text-xs text-center max-w-3xl mx-auto leading-relaxed">
          UWAGA!!! Brak dotąd danych, które by udowodniły poprawę przeżyć chorych z nowotworami złośliwymi w wyniku optymalizacji stężeń pierwiastków.
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {groups.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${
                selectedIndex === i
                  ? 'w-6 h-1.5 bg-[#5B65DC]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Info */}
        <p className="mt-10 text-white/40 text-xs sm:text-sm text-center max-w-2xl mx-auto">
          <span className="text-white/70 font-semibold">Jak często powtarzać badanie?</span>{' '}
          Przy nieprawidłowych stężeniach — kontrola po 3–6 miesiącach. Gdy wyniki w normie — co 6–12 miesięcy.
        </p>
      </div>
    </section>
  );
}
