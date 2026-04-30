'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const questions = [
  { q: 'Czy potrzebuję skierowania od lekarza?', a: 'Nie. Badanie onkopierwiastków możesz wykonać samodzielnie, bez skierowania.' },
  { q: 'Czy badanie wykrywa raka?', a: 'Nie. Badanie pokazuje stężenia pierwiastków we krwi i odnosi je do zakresów referencyjnych. Nie jest to badanie diagnostyczne nowotworu. Wynik może być natomiast cennym sygnałem do dalszych konsultacji i działań profilaktycznych.' },
  { q: 'Co dokładnie dostanę po badaniu?', a: 'Wynik w formie PDF zawiera: liczbowe stężenia każdego badanego pierwiastka, odniesienie do zakresów referencyjnych dopasowanych do Twojej płci, wieku i innych zmiennych, oraz konkretne zalecenia (dietetyczne, suplementacyjne lub kierunki dalszej diagnostyki).' },
  { q: 'Ile trwa oczekiwanie na wynik?', a: 'Do 15 dni roboczych od dostarczenia próbki do laboratorium.' },
  { q: 'Czy badanie boli?', a: 'Pobranie polega na standardowym nakłuciu żyły. Wystarczy 0,5 ml krwi pełnej.' },
  { q: 'Dlaczego muszę być na czczo?', a: 'Aby wyeliminować wpływ posiłku na stężenia pierwiastków. Zalecamy co najmniej 6 godzin bez jedzenia.' },
  { q: 'Dlaczego przez 3 dni nie wolno jeść ryb i owoców morza?', a: 'Zawierają one organiczne formy arsenu, które mogą zakłócić oznaczenie tego pierwiastka.' },
  { q: 'Czy normy są takie same dla wszystkich?', a: 'Nie — i to kluczowa różnica tego badania. Zakresy referencyjne uwzględniają płeć, wiek, palenie tytoniu i nosicielstwo mutacji BRCA1. Normy zostały opracowane wyłącznie dla populacji polskiej.' },
  { q: 'Co jeśli wynik jest poza normą?', a: 'Wynik poza zakresem referencyjnym jest wskazaniem do konsultacji lekarskiej, nie diagnozą. W raporcie znajdziesz zalecenia dietetyczne, suplementacyjne lub kierunki dalszej diagnostyki, które warto omówić z lekarzem prowadzącym.' },
  { q: 'Jak długo przechowywany jest mój materiał?', a: 'Co najmniej 2 miesiące w temperaturze −20°C — umożliwia to ewentualną weryfikację wyników.' },
  { q: 'Czy mogę wykonać badanie, jeśli mam już zdiagnozowany nowotwór?', a: 'Tak — istnieje dedykowany panel z surowicy dla pacjentów onkologicznych. Skonsultuj go z lekarzem prowadzącym.' },
  { q: 'Czy badanie zastępuje mammografię, cytologię lub kolonoskopię?', a: 'Nie. Onkopierwiastki to badanie uzupełniające — nie zastępuje rekomendowanych badań przesiewowych. To dodatkowa informacja do podejmowania świadomych decyzji zdrowotnych.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mb-12 text-center">
          Najczęściej zadawane pytania
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {questions.map((item, i) => (
            <div key={i} className="bg-[#FAFAFD] rounded-xl border border-neutral-100 overflow-hidden self-start">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-[#122056] text-sm pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#8a8fa6] flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#8a8fa6] text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: questions.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
