import { IconArrowRight, IconReportMedical, IconSalad, IconPill, IconAlertTriangle, IconFlask } from '@tabler/icons-react';

const benefits = [
  {
    icon: IconAlertTriangle,
    title: 'Dowiesz się, czy Twój organizm wysyła sygnały ostrzegawcze zanim sam je zauważysz',
    desc: 'Nieprawidłowe stężenia pierwiastków mogą wskazywać na podwyższone ryzyko chorób.',
  },
  {
    icon: IconReportMedical,
    title: 'Otrzymasz zalecenia, nie tylko liczby',
    desc: 'Raport PDF z wynikami zawiera wskazówki — co zmienić w diecie / suplementacji, czy potrzebna jest suplementacja i/lub jakie badania wykonać dalej.',
  },
  {
    icon: IconSalad,
    title: 'Będziesz wiedzieć, co jeść i czego unikać',
    desc: 'Niedobór selenu? Nadmiar cynku? Wynik wskaże Ci, jakie zmiany dietetyczne mogą obniżyć Twoje indywidualne ryzyko.',
  },
  {
    icon: IconPill,
    title: 'Przestaniesz suplementować w ciemno',
    desc: 'Zamiast zgadywać — zobaczysz czarno na białym, czy potrzebujesz selenu, cynku, czy może masz ich za dużo.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Co zyskasz dzięki naszemu badaniu pierwiastków?
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            To nie jest kolejne badanie krwi. To nowe informacje, które zmieniają sposób, w jaki dbasz o siebie.
          </p>
        </div>

        {/* Wide banner card */}
        <div className="mb-5 bg-[#122056] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-[#5B65DC] flex items-center justify-center flex-shrink-0">
            <IconFlask size={28} className="text-white" stroke={1.5} />
          </div>
          <div>
            <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-lg mb-3">
              Otrzymasz wynik z normami dla populacji polskiej
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-2">
              Wartości pierwiastków podawane jako optymalne mogą różnić się pomiędzy poszczególnymi laboratoriami.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-2">
              Jedyne normy ustalone na wieloletnich obserwacjach tysięcy pacjentów w Polsce pochodzą z naszego Ośrodka. Wyniki oparte na 20+ patentach i 40+ publikacjach naukowych.
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              Zalecane normy mogą ulec zmianie w wyniku dalszych badań prowadzonych w naszym Ośrodku.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group bg-[#FAFAFD] rounded-2xl p-7 border border-[#EEEFFD] hover:border-[#5B65DC]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center mb-5">
                <b.icon size={22} className="text-white" stroke={1.5} />
              </div>
              <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base mb-2 leading-snug">
                {b.title}
              </p>
              <p className="text-[#8a8fa6] text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#cennik"
            className="inline-flex items-center gap-2 bg-[#5B65DC] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm"
          >
            Zbadaj się — sprawdź cennik
            <IconArrowRight size={18} stroke={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
