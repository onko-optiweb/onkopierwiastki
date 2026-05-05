'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

const slides = [
  {
    image: '/images/mit-dobre-wyniki.webp',
    alt: 'Kobieta analizująca wyniki badań krwi — standardowa morfologia nie obejmuje pierwiastków nowotworowych',
    myth: '„Mam dobre wyniki"',
    fact: 'Standardowa morfologia i lipidogram nie obejmują pierwiastków powiązanych z ryzykiem nowotworowym.',
    conclusion: 'Te pierwiastki bada się oddzielnie.',
  },
  {
    image: '/images/mit-normy-uniwersalne.webp',
    alt: 'Tłum ludzi z wykresem statystycznym — normy różnią się między populacjami',
    myth: '„Normy są uniwersalne"',
    fact: 'Średnie stężenia różnią się między populacjami, płciami i grupami wiekowymi.',
    conclusion: 'Onkopierwiastki używają norm opracowanych wyłącznie dla populacji polskiej.',
  },
  {
    image: '/images/mit-dieta.webp',
    alt: 'Zdrowe warzywa i owoce — sama dieta nie gwarantuje optymalnego poziomu pierwiastków',
    myth: '„Zdrowa dieta wystarczy"',
    fact: 'Potrzebne jest indywidualne badanie dla określenia optymalnej diety / suplementacji.',
    conclusion: 'Dlatego potrzebne jest indywidualne badanie.',
  },
  {
    image: '/images/mit-brak-objawow.webp',
    alt: 'Kobieta trzymająca się za kark z bólu — niedobory pierwiastków rzadko dają objawy',
    myth: '„Zauważę, jeśli coś będzie nie tak"',
    fact: 'Istotne klinicznie niedobory i nadmiary pierwiastków rzadko dają objawy.',
    conclusion: 'Wykrywa je tylko badanie laboratoryjne.',
  },
];

export default function WhatAre() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <section className="py-14 lg:py-20 bg-[#FAFAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 max-w-[90%] mx-auto">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-[1.6rem] sm:text-4xl lg:text-5xl !leading-tight text-black mb-5">
            Ocena stężenia pierwiastków skutecznie wspiera profilaktykę nowotworów i obniża ryzyko zgonów w młodszym wieku.
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base">
            Sprawdź, które przekonania mogą dawać Ci <span className="text-[#122056] font-semibold">fałszywe poczucie bezpieczeństwa</span>.
          </p>
        </div>

        {/* Slider */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 px-2">
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-neutral-100">
                  {/* Image */}
                  <div className="relative h-[250px] md:h-[380px]">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                  </div>
                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                    {/* Myth */}
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X size={16} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-[#8a8fa6] text-xs font-semibold uppercase tracking-wider mb-1">Mit</p>
                        <p className="font-[family-name:var(--font-funnel)] font-bold text-black text-xl lg:text-2xl">{slide.myth}</p>
                      </div>
                    </div>

                    {/* Fact */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={16} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-green-600 text-xs font-semibold uppercase tracking-wider mb-1">Fakt</p>
                        <p className="text-[#122056] text-sm leading-relaxed font-medium">{slide.fact}</p>
                        <p className="text-green-600 text-sm font-semibold mt-2">{slide.conclusion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-[#EEEFFD] transition-colors"
          >
            <ChevronLeft size={18} className="text-[#122056]" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? 'w-8 bg-[#122056]' : 'w-2 bg-[#122056]/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-[#EEEFFD] transition-colors"
          >
            <ChevronRight size={18} className="text-[#122056]" />
          </button>
        </div>
      </div>
    </section>
  );
}
