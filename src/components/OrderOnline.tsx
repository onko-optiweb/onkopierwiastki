export default function OrderOnline() {
  return (
    <section id="zamow" className="py-16 lg:py-24 bg-[#122056] relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/53430.webp" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#122056]/50" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-white mb-4">
            Zamów badanie onkopierwiastków online
          </h2>
          <p className="text-white/50 text-sm lg:text-base max-w-xl mx-auto">
            Wybierz panel, zapłać online, a my skierujemy Cię do najbliższej placówki referencyjnej.
          </p>
        </div>

        {/* Steps — horizontal with line */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden mb-12">
          {[
            { number: '01', title: 'Wybierz panel', desc: 'Podstawowy lub rozszerzony, krew lub surowica' },
            { number: '02', title: 'Zapłać online', desc: 'Bezpieczna płatność PayU' },
            { number: '03', title: 'Przyjdź na pobranie', desc: 'Do wskazanej placówki referencyjnej' },
            { number: '04', title: 'Odbierz wynik', desc: 'PDF na e-mail w 15 dni roboczych' },
          ].map((step) => (
            <div key={step.title} className="bg-[#122056] p-6 lg:p-8 text-center">
              <span className="text-[#5B65DC] font-bold text-sm tracking-widest">{step.number}</span>
              <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-base mt-2 mb-1">{step.title}</p>
              <p className="text-white/40 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/zamow"
            className="inline-flex items-center justify-center bg-[#5B65DC] text-white font-semibold px-10 py-4 rounded-xl hover:bg-[#4a53c7] transition-colors text-base shadow-lg shadow-[#5B65DC]/20"
          >
            Zamów teraz — 230 zł
          </a>
          <p className="text-white/25 text-xs mt-3">
            Płatność zostanie uruchomiona po wdrożeniu systemu PayU
          </p>
        </div>
      </div>
    </section>
  );
}
