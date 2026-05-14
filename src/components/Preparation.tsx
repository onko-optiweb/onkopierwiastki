import { IconAlertTriangle } from '@tabler/icons-react';

const steps = [
  {
    number: '01',
    title: 'Przed pobraniem',
    items: [
      'Co najmniej 6 godzin na czczo',
      'Przez 3 dni nie spożywaj ryb morskich, owoców morza i ryżu',
      'Poinformuj personel o suplementach z badanymi pierwiastkami',
    ],
  },
  {
    number: '02',
    title: 'W placówce',
    items: [
      'Pobranie krwi pełnej lub surowicy',
      'Materiał oznaczany kodem zlecenia',
      'Kurier odbiera próbkę od placówki',
    ],
  },
  {
    number: '03',
    title: 'Wynik',
    items: [
      'PDF z wynikami i zaleceniami na e-mail',
      'Do 15 dni roboczych od dostarczenia próbki',
    ],
  },
];

export default function Preparation() {
  return (
    <section id="przygotowanie" className="py-16 lg:py-24 bg-[#122056] relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/2150471457.webp" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#122056]/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-white mb-4">
            Jak się przygotować do badania onkopierwiastków?
          </h2>
          <p className="text-white/50 text-sm lg:text-base max-w-xl mx-auto">
            Trzy proste kroki — od przygotowania do odbioru wyniku.
          </p>
        </div>

        {/* Horizontal steps — grid with dividers */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10 max-w-4xl mx-auto rounded-xl overflow-hidden">
          {steps.map((step) => (
            <div key={step.title} className="bg-[#122056] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#5B65DC] font-bold text-xs tracking-widest">{step.number}</span>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-base">
                  {step.title}
                </p>
              </div>
              <div className="space-y-0">
                {step.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 py-2 border-t border-white/[0.06]">
                    <div className="w-1 h-1 rounded-full bg-[#5B65DC] flex-shrink-0 mt-1.5" />
                    <p className="text-white/55 text-sm leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <p className="mt-10 text-center max-w-3xl mx-auto">
          <IconAlertTriangle size={16} className="text-[#5B65DC] inline-block mr-1.5 -mt-0.5" stroke={1.5} />
          <span className="text-white/70 font-semibold text-xs">Co może wpłynąć na wynik?</span>{' '}
          <span className="text-white/40 text-xs">
            Transfuzja krwi, badanie z kontrastem, niestosowanie się do zaleceń dietetycznych. Skonsultuj się z personelem placówki.
          </span>
        </p>
      </div>
    </section>
  );
}
