'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const questions = [
  { q: 'Czy badanie onkopierwiastków zastępuje mammografię, cytologię lub kolonoskopię?', a: 'Nie. Badanie onkopierwiastków to badanie uzupełniające — nie zastępuje rekomendowanych badań przesiewowych. To dodatkowa informacja wspierająca profilaktykę nowotworową i podejmowanie świadomych decyzji zdrowotnych.' },
  { q: 'Czy mogę wykonać badanie onkopierwiastków, jeśli mam zdiagnozowany nowotwór?', a: 'Tak — istnieje dedykowany panel onkologiczny z surowicy dla pacjentów z nowotworem. Skonsultuj wybór panelu z lekarzem prowadzącym.' },
  { q: 'Dlaczego przed badaniem onkopierwiastków nie wolno jeść ryb i owoców morza?', a: 'Przez 3 dni przed pobraniem krwi należy unikać ryb morskich, owoców morza i ryżu. Zawierają one organiczne formy arsenu, które mogą zakłócić oznaczenie tego pierwiastka w badaniu.' },
  { q: 'Czy do badania onkopierwiastków potrzebuję skierowania od lekarza?', a: 'Nie. Badanie onkopierwiastków możesz wykonać samodzielnie, bez skierowania lekarskiego. Wystarczy złożyć zamówienie przez stronę onkopierwiastki.pl i zgłosić się do wybranej placówki referencyjnej.' },
  { q: 'Jak długo przechowywany jest materiał po badaniu onkopierwiastków?', a: 'Co najmniej 2 miesiące w temperaturze −20°C w laboratorium Innowacyjna Medycyna — umożliwia to ewentualną weryfikację wyników.' },
  { q: 'Co zrobić, gdy wynik badania onkopierwiastków jest poza zakresem normy?', a: 'Wynik poza zakresem referencyjnym jest wskazaniem do konsultacji lekarskiej, nie diagnozą. W raporcie znajdziesz konkretne zalecenia dietetyczne, suplementacyjne lub kierunki dalszej diagnostyki, które warto omówić z lekarzem prowadzącym.' },
  { q: 'Dlaczego przed badaniem onkopierwiastków muszę być na czczo?', a: 'Aby wyeliminować wpływ posiłku na stężenia pierwiastków we krwi. Zalecamy co najmniej 6 godzin bez jedzenia przed pobraniem materiału.' },
  { q: 'Czy normy onkopierwiastków są takie same dla wszystkich?', a: 'Nie — i to kluczowa różnica tego badania. Zakresy referencyjne uwzględniają płeć, wiek, palenie tytoniu i nosicielstwo mutacji BRCA1. Normy zostały opracowane wyłącznie dla populacji polskiej przez zespół prof. Lubińskiego z PUM w Szczecinie.' },
  { q: 'Ile trwa oczekiwanie na wynik badania onkopierwiastków?', a: 'Do 15 dni roboczych od dostarczenia próbki do laboratorium Innowacyjna Medycyna w Grzepnicy.' },
  { q: 'Czy badanie onkopierwiastków wykrywa nowotwór?', a: 'Nie. Badanie onkopierwiastków pokazuje stężenia pierwiastków we krwi i odnosi je do zakresów referencyjnych opracowanych dla populacji polskiej. Nie jest to badanie diagnostyczne nowotworu. Wynik może być natomiast cennym sygnałem do dalszych konsultacji i działań profilaktycznych.' },
  { q: 'Co zawiera wynik badania onkopierwiastków?', a: 'Wynik w formie PDF zawiera: liczbowe stężenia każdego badanego pierwiastka, odniesienie do zakresów referencyjnych dopasowanych do Twojej płci, wieku i innych zmiennych, oraz konkretne zalecenia dietetyczne, suplementacyjne lub kierunki dalszej diagnostyki.' },
  { q: 'Czy badanie onkopierwiastków boli?', a: 'Pobranie polega na standardowym nakłuciu żyły — tak jak przy zwykłej morfologii. Wystarczy 0,5 ml krwi pełnej.' },
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
