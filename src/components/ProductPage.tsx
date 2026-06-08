'use client';

import { useState } from 'react';
import { IconCircleCheck, IconArrowRight, IconClock, IconFlask, IconShieldCheck, IconAlertTriangle } from '@tabler/icons-react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/src/data/products';

const elementInfo: Record<string, { name: string; desc: string }> = {
  As: { name: 'Arsen', desc: 'Metal ciężki — marker ekspozycji środowiskowej' },
  Se: { name: 'Selen', desc: 'Kluczowy antyoksydant wspierający układ odpornościowy' },
  Zn: { name: 'Cynk', desc: 'Niezbędny dla podziału komórek i naprawy DNA' },
  Cu: { name: 'Miedź', desc: 'Wpływa na metabolizm żelaza i tkankę łączną' },
  Cd: { name: 'Kadm', desc: 'Metal ciężki — marker ekspozycji na dym tytoniowy' },
  Pb: { name: 'Ołów', desc: 'Metal ciężki — marker ekspozycji środowiskowej' },
  Mn: { name: 'Mangan', desc: 'Kofaktor enzymów antyoksydacyjnych' },
};

function getProductElements(product: Product): string[] {
  const all = ['Se', 'Zn', 'Cu', 'As', 'Cd', 'Pb', 'Mn'];
  return all.filter((el) => product.elements.includes(el));
}

const tabs = [
  { id: 'about', label: 'O badaniu' },
  { id: 'elements', label: 'Co badamy?' },
  { id: 'why', label: 'Dlaczego warto?' },
  { id: 'how', label: 'Jak wykonać?' },
];

export default function ProductPage({ product, otherProducts }: { product: Product; otherProducts: Product[] }) {
  const elements = getProductElements(product);
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#FAFAFD]">

      {/* ============ PRODUCT HERO ============ */}
      <section className="pt-16 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#8a8fa6] mb-8">
            <a href="/" className="hover:text-[#122056] transition-colors">Strona główna</a>
            <span className="text-[10px]">›</span>
            <a href="/#cennik" className="hover:text-[#122056] transition-colors">Badania</a>
            <span className="text-[10px]">›</span>
            <span className="text-[#122056] font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
            {/* LEFT — product image (clean, no overlays) */}
            <div className="rounded-2xl overflow-hidden bg-[#EEEFFD] aspect-[4/3] lg:aspect-[4/5]">
              <img
                src="/images/2150471457.webp"
                alt="Struktura DNA — badanie pierwiastków"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT — sticky product details */}
            <div className="lg:sticky lg:top-24">
              <span className="text-[#5B65DC] text-xs font-semibold uppercase tracking-wider">
                {product.panelType === 'profilaktyka' ? 'Badanie z krwi' : 'Badanie z surowicy'}
              </span>

              <h1 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mt-3 mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-[#8a8fa6] text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price + CTA */}
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-[#8a8fa6] text-xs mb-1">Cena</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-funnel)] font-bold text-5xl text-black">{product.price}</span>
                    <span className="text-[#8a8fa6] text-sm">,00 zł</span>
                  </div>
                </div>
                <a
                  href={product.orderUrl}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#5B65DC] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#4a53c7] transition-colors text-base"
                >
                  Zamów badanie
                  <ArrowRight size={18} />
                </a>
              </div>

              <p className="text-[#8a8fa6] text-xs mb-6">Cena brutto. Badanie zwolnione z VAT. Bez skierowania.</p>

              {/* Elements grid */}
              <div className="mb-6">
                <p className="text-[#122056] text-xs font-semibold uppercase tracking-wider mb-3">Badane pierwiastki</p>
                <div className="grid grid-cols-2 gap-2">
                  {elements.map((el) => (
                    <div key={el} className="flex items-center gap-3 bg-[#FAFAFD] rounded-xl px-4 py-3 border border-[#EEEFFD]">
                      <div className="w-9 h-9 rounded-lg bg-[#122056] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{el}</span>
                      </div>
                      <div>
                        <p className="text-[#122056] font-semibold text-sm leading-tight">{elementInfo[el]?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features — 2 columns */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <IconCircleCheck size={16} className="text-[#5B65DC] flex-shrink-0 mt-0.5" stroke={1.5} />
                    <span className="text-[#122056] text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* Quick info bar */}
              <div className="flex items-center gap-4 text-[#8a8fa6] text-xs py-4 border-t border-neutral-100">
                <span className="flex items-center gap-1.5"><IconClock size={14} stroke={1.5} /> Do 15 dni roboczych</span>
                <span className="w-px h-3 bg-neutral-200" />
                <span className="flex items-center gap-1.5"><IconFlask size={14} stroke={1.5} /> {product.material}</span>
                <span className="w-px h-3 bg-neutral-200" />
                <span className="flex items-center gap-1.5"><IconShieldCheck size={14} stroke={1.5} /> Polskie normy</span>
              </div>

              {/* Trust proof */}
              <div className="mt-4 bg-[#FAFAFD] rounded-2xl p-5 border border-[#EEEFFD]">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {['bg-[#5B65DC]', 'bg-[#7a82e5]', 'bg-[#122056]'].map((bg, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                        {['JL', 'PU', 'MC'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#122056] font-bold text-sm">Ponad 15 000 przebadanych pacjentów</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} className="w-3.5 h-3.5 text-[#5B65DC] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[#8a8fa6] text-[11px] ml-1">5.0 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TABBED CONTENT ============ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex gap-1 border-b border-neutral-200 mb-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors rounded-t-lg ${
                  activeTab === tab.id
                    ? 'bg-[#122056] text-white'
                    : 'text-[#8a8fa6] hover:text-[#122056] hover:bg-[#EEEFFD]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: O badaniu */}
          {activeTab === 'about' && (
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-3xl">
                <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-6">
                  {product.name} — badanie poziomu pierwiastków {product.material === 'Krew pełna' ? 'we krwi pełnej' : product.material === 'Surowica' ? 'w surowicy' : 'z surowicy i krwi pełnej'}
                </h2>

                <div className="prose prose-sm text-[#122056]/80 space-y-4">
                  <p>
                    {product.panelType === 'profilaktyka'
                      ? 'W ramach oferowanego badania sprawdzane jest stężenie we krwi pełnej mikroelementów, które badania naukowe wiążą ze zwiększonym ryzykiem zachorowania na nowotwory złośliwe oraz zgonu niezależnie od przyczyny w młodszym wieku.'
                      : 'Panel onkologiczny jest przeznaczony dla pacjentów z rozpoznaną chorobą nowotworową. Badanie mierzy stężenie kluczowych pierwiastków śladowych z surowicy krwi, wspierając monitorowanie stanu zdrowia.'}
                  </p>
                  <p>
                    Mikroelementy takie jak selen, cynk, miedź, arsen, ołów i kadm mają wpływ na procesy biologiczne organizmu — wpływają one pośrednio lub bezpośrednio na poziom stresu oksydacyjnego lub gospodarkę hormonalną poprzez oddziaływanie na enzymy, w mechanizmach zależnych od czynników genetycznych.
                  </p>
                  <p>
                    Stężenia referencyjne dla mikroelementów badanych w ramach oferowanego testu zostały ustalone na podstawie badań własnych laboratorium wykonującego (READ-GENE S.A.) lub w oparciu o dane literaturowe.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src="/images/geny5.webp"
                  alt="Struktura DNA"
                  className="w-[280px] h-auto opacity-60"
                />
              </div>
            </div>
          )}

          {/* Tab: Co badamy? */}
          {activeTab === 'elements' && (
            <div>
              <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-3">
                Pierwiastki śladowe oznaczane w badaniu
              </h2>
              <p className="text-[#8a8fa6] text-sm mb-8 max-w-2xl">{product.elements}</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {elements.map((el) => (
                  <div key={el} className="flex items-start gap-4 bg-[#FAFAFD] rounded-xl p-5 border border-[#EEEFFD]">
                    <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{el}</span>
                    </div>
                    <div>
                      <p className="text-[#122056] font-bold text-sm">{elementInfo[el]?.name}</p>
                      <p className="text-[#8a8fa6] text-xs mt-0.5">{elementInfo[el]?.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Dlaczego warto? */}
          {activeTab === 'why' && (
            <div>
              <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-6">
                Kiedy warto wykonać to badanie?
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: 'Profilaktyka nowotworowa', desc: 'Aby poznać swój indywidualny profil pierwiastków śladowych, zanim pojawią się jakiekolwiek objawy.' },
                  { title: 'Wywiad rodzinny', desc: 'Gdy w Twojej rodzinie występowały nowotwory — badanie pozwoli ocenić, czy stężenia pierwiastków odbiegają od wartości referencyjnych.' },
                  { title: 'Ocena suplementacji', desc: 'Zanim zaczniesz lub w trakcie suplementacji — zobaczysz, czy potrzebujesz selenu, cynku, czy może ich stężenie jest wystarczające.' },
                  { title: 'Dieta eliminacyjna', desc: 'Osoby na dietach roślinnych mogą mieć istotnie inne stężenia pierwiastków — badanie da obiektywny obraz.' },
                  ...(product.panelType === 'onkologiczny' ? [
                    { title: 'Po leczeniu onkologicznym', desc: 'Monitorowanie stężeń pierwiastków wspiera ocenę u pacjentów po terapii onkologicznej.' },
                    { title: 'W trakcie leczenia', desc: 'Regularna kontrola poziomu pierwiastków śladowych jako element wspomagający proces terapeutyczny.' },
                  ] : [
                    { title: 'Ekspozycja na metale ciężkie', desc: 'Pracujesz w przemyśle, mieszkasz w mieście o dużym zanieczyszczeniu — sprawdź poziom arsenu, kadmu i ołowiu.' },
                    { title: 'Planowanie ciąży', desc: 'Optymalne stężenia pierwiastków śladowych mają znaczenie dla zdrowia reprodukcyjnego.' },
                  ]),
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-[#FAFAFD] rounded-xl p-5 border border-[#EEEFFD]">
                    <IconCircleCheck size={20} className="text-[#5B65DC] flex-shrink-0 mt-0.5" stroke={1.5} />
                    <div>
                      <p className="text-[#122056] font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-[#8a8fa6] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Jak wykonać? */}
          {activeTab === 'how' && (
            <div className="max-w-3xl">
              <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-8">
                Jak przygotować się do badania?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Przed pobraniem',
                    items: [
                      'Co najmniej 4 godziny na czczo',
                      'Przez 3 dni nie spożywaj ryb morskich, owoców morza i ryżu',
                    ],
                  },
                  {
                    step: '02',
                    title: 'W placówce',
                    items: [
                      `Pobranie ${product.material === 'Krew pełna' ? 'krwi pełnej' : product.material === 'Surowica' ? 'surowicy' : 'surowicy i krwi pełnej'}`,
                      'Materiał oznaczany kodem zlecenia',
                      'Kurier odbiera próbkę od placówki',
                    ],
                  },
                  {
                    step: '03',
                    title: 'Wynik',
                    items: [
                      'PDF z wynikami i zaleceniami na Twój e-mail',
                      'Do 15 dni roboczych od dostarczenia próbki do laboratorium',
                    ],
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{s.step}</span>
                    </div>
                    <div>
                      <p className="text-[#122056] font-bold text-base mb-2">{s.title}</p>
                      <ul className="space-y-1.5">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[#8a8fa6] text-sm">
                            <IconCircleCheck size={14} className="text-[#5B65DC] flex-shrink-0 mt-0.5" stroke={1.5} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-amber-50 rounded-xl p-5 flex items-start gap-3 border border-amber-200">
                <IconAlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" stroke={1.5} />
                <p className="text-amber-800 text-sm leading-relaxed">
                  Na pobranie krwi należy zgłosić się na czczo. Pacjent nie powinien również spożywać owoców morza, ryb i ryżu oraz produktów na bazie ryb, ryżu i olejów rybnych w ciągu 3 dni przed pobraniem.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="py-12 bg-[#122056]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl">{product.name}</p>
            <p className="text-white/60 text-sm mt-1">{product.elements}</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-[family-name:var(--font-funnel)] font-bold text-4xl text-white">{product.price} <span className="text-lg text-white/60">zł</span></span>
            <a
              href={product.orderUrl}
              className="inline-flex items-center gap-2.5 bg-[#5B65DC] text-white font-semibold pl-7 pr-2.5 py-2.5 rounded-full hover:bg-[#4a53c7] transition-colors text-sm"
            >
              Zamów badanie
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ OTHER PRODUCTS ============ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mb-3">
              Inne badania pierwiastków
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-xl mx-auto">
              Sprawdź pozostałe panele dopasowane do różnych potrzeb zdrowotnych.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <a
                key={p.slug}
                href={`/badanie/${p.slug}/`}
                className="group relative bg-white rounded-2xl p-7 border border-[#EEEFFD] hover:border-[#5B65DC]/30 hover:shadow-lg transition-all"
              >
                {p.popular && (
                  <span className="absolute top-4 right-4 bg-[#5B65DC] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Polecany
                  </span>
                )}

                <p className="text-[#5B65DC] text-xs font-semibold uppercase tracking-wider mb-2">
                  {p.panelType === 'profilaktyka' ? 'Krew' : 'Surowica'}
                </p>

                <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-lg mb-3">{p.name}</p>

                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-[family-name:var(--font-funnel)] font-bold text-4xl text-black">{p.price}</span>
                  <span className="text-[#8a8fa6] text-sm">zł</span>
                </div>

                <p className="text-[#8a8fa6] text-xs mb-1">{p.material}</p>
                <p className="text-[#8a8fa6] text-xs mb-5 line-clamp-2">{p.description}</p>

                <span className="inline-flex items-center gap-1.5 text-[#5B65DC] text-sm font-semibold group-hover:underline">
                  Szczegóły badania
                  <IconArrowRight size={14} stroke={2} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
