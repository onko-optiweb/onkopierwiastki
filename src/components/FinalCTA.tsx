import { X, Check, MapPin, ShoppingCart } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-black mb-12 text-center">
          Co teraz zrobisz?
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Path A — close */}
          <div className="bg-white rounded-2xl p-8 border border-neutral-200/60">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
              <X size={22} className="text-neutral-400" />
            </div>
            <p className="font-[family-name:var(--font-funnel)] font-bold text-black text-xl mb-3">Zamknij tę stronę</p>
            <p className="text-[#8a8fa6] text-sm leading-relaxed">
              Wracasz do punktu wyjścia. Nadal nie wiesz, jakie masz stężenie selenu, cynku, miedzi, arsenu, kadmu i ołowiu — pierwiastków, które nauka wiąże z ryzykiem nowotworowym i zgonu w młodszym wieku.
            </p>
          </div>

          {/* Path B — test */}
          <div className="bg-[#122056] rounded-2xl p-8 border border-[#1a2d6e]">
            <div className="w-12 h-12 rounded-full bg-[#5B65DC]/20 flex items-center justify-center mb-5">
              <Check size={22} className="text-[#5B65DC]" />
            </div>
            <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-xl mb-3">Zbadaj się teraz</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Zbadaj swoje pierwiastki i otrzymaj spersonalizowany profil pierwiastkowy + zalecenia. Zyskujesz wiedzę, którą możesz wykorzystać do działań profilaktycznych lub prognozy co do zgonów w młodszym wieku.
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <a href="#placowki" className="group inline-flex items-center justify-center gap-2.5 bg-[#122056] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1a2d6e] transition-all text-sm">
            <MapPin size={16} className="group-hover:rotate-[360deg] transition-transform duration-500" />
            Znajdź placówkę w swoim mieście
          </a>
          <a href="#cennik" className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#122056] font-semibold px-8 py-4 rounded-full border border-neutral-200 hover:border-[#5B65DC] transition-all text-sm">
            <ShoppingCart size={16} className="group-hover:rotate-[360deg] transition-transform duration-500" />
            Zamów badanie online — od 200 zł
          </a>
        </div>

        <p className="text-[#8a8fa6] text-xs text-center mt-6">
          Bez skierowania. Wynik w 15 dni roboczych. Sieć placówek w całej Polsce.
        </p>
      </div>
    </section>
  );
}
