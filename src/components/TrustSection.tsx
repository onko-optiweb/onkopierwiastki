import { IconArrowRight, IconShieldCheck, IconReportMedical, IconSalad, IconPill, IconHeartRateMonitor, IconAlertTriangle } from '@tabler/icons-react';

const benefits = [
  {
    icon: IconAlertTriangle,
    title: 'Dowiesz się, czy Twój organizm wysyła sygnały ostrzegawcze',
    desc: 'Nieprawidłowe stężenia pierwiastków mogą wskazywać na podwyższone ryzyko nowotworu — zanim pojawią się jakiekolwiek objawy.',
  },
  {
    icon: IconReportMedical,
    title: 'Otrzymasz konkretne zalecenia, nie tylko liczby',
    desc: 'Raport PDF z wynikami zawiera jasne wskazówki — co zmienić w diecie, czy potrzebna suplementacja, jakie badania wykonać dalej.',
  },
  {
    icon: IconSalad,
    title: 'Będziesz wiedzieć, co jeść i czego unikać',
    desc: 'Niedobór selenu? Nadmiar kadmu? Wynik powie Ci, jakie zmiany dietetyczne mogą obniżyć Twoje indywidualne ryzyko.',
  },
  {
    icon: IconPill,
    title: 'Przestaniesz suplementować na ślepo',
    desc: 'Zamiast zgadywać — zobaczysz czarno na białym, czy potrzebujesz selenu, cynku, czy może ich masz za dużo.',
  },
  {
    icon: IconHeartRateMonitor,
    title: 'Zyskasz kontrolę nad swoim zdrowiem',
    desc: 'Regularne monitorowanie pozwala śledzić, czy wdrożone zmiany działają. To badanie, które daje Ci realne narzędzie do działania.',
  },
  {
    icon: IconShieldCheck,
    title: 'Podejmiesz rozmowę z lekarzem z twardymi danymi',
    desc: 'Zamiast "wydaje mi się" — przyjdziesz z wynikami opartymi na 20+ patentach i 30+ publikacjach naukowych PubMed.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Co zyskasz dzięki badaniu?
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            To nie jest kolejne badanie krwi. To konkretna informacja, która zmienia sposób, w jaki dbasz o siebie.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
