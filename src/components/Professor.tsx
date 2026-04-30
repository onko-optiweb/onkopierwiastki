import { IconFileText, IconExternalLink, IconCertificate, IconArticle, IconDna, IconFlask } from '@tabler/icons-react';

const highlights = [
  {
    icon: IconCertificate,
    value: '20+',
    label: 'patentów UP RP',
    desc: 'Ochrona zakresów referencyjnych',
  },
  {
    icon: IconArticle,
    value: '30+',
    label: 'publikacji PubMed',
    desc: 'Recenzowane prace naukowe',
  },
  {
    icon: IconDna,
    value: 'BRCA1',
    label: 'mutacje uwzględnione',
    desc: 'Normy dla nosicielek',
  },
  {
    icon: IconFlask,
    value: '6',
    label: 'pierwiastków',
    desc: 'Kompleksowy panel badawczy',
  },
];

const patents = [
  { pat: 'PAT.246176', desc: 'Znaczenie stężenia miedzi w surowicy u mężczyzn z rakiem prostaty' },
  { pat: 'PAT.243865', desc: 'Znaczenie optymalnego stężenia ołowiu w kontekście ryzyka onkologicznego' },
];

export default function Professor() {
  return (
    <section id="o-badaniu" className="py-20 lg:py-28 bg-[#FAFAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top — heading + subtitle */}
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Badanie opracowane przez
            <br className="hidden sm:block" />
            <span className="text-[#5B65DC]"> prof. Jana Lubińskiego</span>
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            Międzynarodowe Centrum Nowotworów Dziedzicznych Pomorskiego Uniwersytetu Medycznego w Szczecinie
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Left — professor card */}
          <div className="bg-white rounded-2xl border border-[#EEEFFD] p-8 lg:p-10">
            {/* Professor info */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#122056] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">JL</span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-lg">
                  prof. dr hab. n. med. Jan Lubiński
                </h3>
                <p className="text-[#8a8fa6] text-sm">
                  Twórca i kierownik Centrum Nowotworów Dziedzicznych PUM
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm leading-relaxed text-[#8a8fa6] mb-8">
              <p>
                Metodologia badania onkopierwiastków powstała w Międzynarodowym Centrum Nowotworów Dziedzicznych PUM w Szczecinie — jednym z wiodących ośrodków onkologii dziedzicznej w Europie.
              </p>
              <p className="text-[#122056]">
                Zakresy referencyjne uwzględniają kluczowe zmienne: <strong>płeć i wiek</strong>, <strong>status palenia tytoniu</strong>, <strong>nosicielstwo mutacji BRCA1</strong> oraz specyfikę populacji polskiej — co czyni to badanie wyjątkowym na skalę światową.
              </p>
            </div>

            {/* Patents */}
            <p className="text-[#122056] text-xs font-bold uppercase tracking-wider mb-3">Wybrane patenty</p>
            <div className="space-y-2.5 mb-8">
              {patents.map((p) => (
                <div key={p.pat} className="flex items-start gap-3 bg-[#EEEFFD]/40 rounded-xl px-4 py-3.5 border border-[#EEEFFD]">
                  <IconFileText size={18} className="text-[#5B65DC] flex-shrink-0 mt-0.5" stroke={1.5} />
                  <div>
                    <span className="text-[#122056] font-bold text-sm">{p.pat}</span>
                    <p className="text-[#8a8fa6] text-xs mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.read-gene.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#5B65DC] font-semibold text-sm hover:underline"
            >
              Pełny wykaz publikacji: read-gene.com
              <IconExternalLink size={16} stroke={1.5} />
            </a>
          </div>

          {/* Right — highlight cards */}
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="bg-white rounded-2xl p-5 border border-[#EEEFFD] flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEEFFD] flex items-center justify-center mb-4">
                  <h.icon size={20} className="text-[#5B65DC]" stroke={1.5} />
                </div>
                <span className="font-[family-name:var(--font-funnel)] font-bold text-2xl text-[#122056]">
                  {h.value}
                </span>
                <span className="font-semibold text-[#122056] text-sm mt-0.5">{h.label}</span>
                <span className="text-[#8a8fa6] text-xs mt-1">{h.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
