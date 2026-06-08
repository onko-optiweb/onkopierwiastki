const testimonials = [
  {
    text: 'Badanie zamówiłam online i wszystko przeszło bardzo sprawnie. Wynik dostałam w PDF z konkretnymi zaleceniami — wreszcie wiem, co mogę poprawić w swojej codziennej diecie.',
    name: 'Anna K.',
    role: 'Nauczycielka',
    initials: 'AK',
  },
  {
    text: 'Jako nosicielka mutacji BRCA1 szukałam czegoś więcej niż standardowa morfologia. Badanie pierwiastków dało mi informacje, których żadne inne badanie wcześniej nie pokazało.',
    name: 'Magdalena W.',
    role: 'Farmaceutka',
    initials: 'MW',
  },
  {
    text: 'Normy dopasowane do populacji polskiej to coś, co mnie przekonało. Wyniki były jasne i zrozumiałe, a personel w placówce okazał się bardzo profesjonalny i pomocny.',
    name: 'Tomasz R.',
    role: 'Inżynier',
    initials: 'TR',
  },
  {
    text: 'Palę od lat i martwię się o zdrowie. Badanie kadmu i selenu dało mi konkretną wiedzę — teraz wiem, nad czym pracować z lekarzem i co zmienić w swoim stylu życia.',
    name: 'Krzysztof M.',
    role: 'Przedsiębiorca',
    initials: 'KM',
  },
  {
    text: 'Byłam zaskoczona, jak szybko dostałam wyniki. 12 dni i miałam pełen raport z zaleceniami dietetycznymi i suplementacyjnymi. Polecam każdej kobiecie po 40. roku życia.',
    name: 'Ewa S.',
    role: 'Księgowa',
    initials: 'ES',
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 lg:py-20 bg-[#FAFAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#5B65DC] text-xs font-semibold uppercase tracking-wider bg-white rounded-full px-4 py-1.5 border border-[#EEEFFD] inline-block mb-4">
            Opinie pacjentów
          </span>
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black">
            Co mówią nasi pacjenci?
          </h2>
        </div>

        {/* Bento grid — 3 cols with center image */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-neutral-100 flex flex-col justify-between min-h-[200px]">
                <p className="text-[#8a8fa6] text-sm leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#122056] flex items-center justify-center text-white text-[10px] font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#122056] text-sm font-bold">{t.name}</p>
                    <p className="text-[#8a8fa6] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center column — testimonial + image fills remaining space */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 flex flex-col justify-between min-h-[200px]">
              <p className="text-[#8a8fa6] text-sm leading-relaxed mb-5">{testimonials[2].text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#5B65DC] flex items-center justify-center text-white text-[10px] font-bold">
                  {testimonials[2].initials}
                </div>
                <div>
                  <p className="text-[#122056] text-sm font-bold">{testimonials[2].name}</p>
                  <p className="text-[#8a8fa6] text-xs">{testimonials[2].role}</p>
                </div>
              </div>
            </div>

            {/* Image — fills remaining space */}
            <div className="rounded-2xl overflow-hidden relative flex-1">
              <img
                src="/images/mit-normy-uniwersalne.webp"
                alt="Tysiące pacjentów zaufało badaniu pierwiastków"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#5B65DC] flex items-center justify-center">
                    <span className="text-white text-[10px]">★</span>
                  </div>
                  <span className="text-[#122056] text-xs font-bold">15 000+ pacjentów</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {testimonials.slice(3, 5).map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-neutral-100 flex flex-col justify-between min-h-[200px]">
                <p className="text-[#8a8fa6] text-sm leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#122056] flex items-center justify-center text-white text-[10px] font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#122056] text-sm font-bold">{t.name}</p>
                    <p className="text-[#8a8fa6] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
