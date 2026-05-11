import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/src/lib/prisma';
import { siteConfig } from '@/src/siteConfig';
import { getCityBySlug, getAllCitySlugs } from '@/src/data/cities';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import Pricing from '@/src/components/Pricing';
import { ExpandableText } from '@/src/components/ExpandableText';
import { CollapsibleContent } from '@/src/components/CollapsibleContent';
import {
  ChevronRight, MapPin, Phone, Clock, ArrowRight, ShieldCheck,
  FlaskConical, FileText, Calendar, AlertTriangle, Check,
} from 'lucide-react';
import {
  IconAlertTriangle, IconReportMedical, IconSalad, IconPill,
  IconHeartRateMonitor, IconShieldCheck, IconArrowRight,
} from '@tabler/icons-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/miasto/${slug}` },
    openGraph: {
      title: `${city.metaTitle} | ${siteConfig.name}`,
      description: city.metaDescription,
      url: `${siteConfig.domain}/miasto/${slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const facilities = await prisma.facility.findMany({
    where: { city: { contains: city.name, mode: 'insensitive' }, active: true },
    orderBy: { name: 'asc' },
  });

  // Logo mapping per facility name
  const facilityLogos: Record<string, string> = {
    'Dolnośląskie Centrum Medyczne DOLMED S.A.': '/images/dolmed logo.png',
  };

  const facilitiesWithLogo = facilities.map((f) => ({
    ...f,
    logo: facilityLogos[f.name] || null,
  }));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: `Badanie onkopierwiastków ${city.name}`, item: `${siteConfig.domain}/miasto/${slug}` },
    ],
  };

  const localBusinessJsonLd = facilities.map((f) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: f.name,
    address: { '@type': 'PostalAddress', streetAddress: f.address, addressLocality: f.city, postalCode: f.postalCode, addressCountry: 'PL' },
    telephone: f.phone,
    geo: { '@type': 'GeoCoordinates', latitude: f.lat, longitude: f.lng },
    openingHours: f.hours,
    url: `${siteConfig.domain}/miasto/${slug}`,
  }));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#8a8fa6]">
            <Link href="/" className="hover:text-[#122056] transition-colors">Strona główna</Link>
            <ChevronRight size={14} />
            <span className="text-[#122056] font-medium">Onkopierwiastki {city.name}</span>
          </nav>
        </div>

        {/* ====== HERO ====== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="lg:flex-1">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[#5B65DC]" />
                <span className="text-[#5B65DC] text-sm font-semibold">{city.name} · {city.region}</span>
              </div>
              <h1 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#122056] leading-tight mb-5">
                {city.heroText}
              </h1>
              <p className="text-[#4a4f65] text-[15px] leading-relaxed mb-4">
                {city.introText}
              </p>
              <p className="text-[#4a4f65] text-[15px] leading-relaxed mb-8">
                Wystarczy jedno pobranie krwi w certyfikowanej placówce {city.nameLocative} — otrzymasz spersonalizowany wynik z zaleceniami oparty na normach opracowanych wyłącznie dla polskiej populacji.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/zamow" className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#4a53c7] transition-colors">
                  Zamów badanie {city.nameLocative} <ArrowRight size={14} />
                </Link>
                <a href="#placowki" className="inline-flex items-center gap-2 bg-white text-[#122056] text-sm font-semibold px-6 py-3 rounded-full border border-neutral-200 hover:border-[#5B65DC] transition-colors">
                  <MapPin size={14} /> Placówka {city.nameLocative}
                </a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-[320px] lg:shrink-0 space-y-3">
              {[
                { icon: FlaskConical, text: '6 pierwiastków z jednego pobrania krwi' },
                { icon: FileText, text: 'Spersonalizowany wynik w 15 dni roboczych' },
                { icon: ShieldCheck, text: '20+ patentów — badania PUM w Szczecinie' },
                { icon: Calendar, text: 'Bez skierowania — zamów i przyjdź' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-neutral-100">
                  <b.icon size={18} className="text-[#5B65DC] shrink-0" />
                  <span className="text-[#122056] text-sm">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TRUST BAR ====== */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { value: '1 badanie', label: 'Sześć pierwiastków oznaczanych jednocześnie' },
                { value: '15 dni', label: 'Raport PDF z indywidualnymi zaleceniami' },
                { value: '100%', label: 'Wyłącznie w certyfikowanych placówkach' },
              ].map((item) => (
                <div key={item.value} className="bg-[#EEEFFD]/50 rounded-2xl p-6 border border-[#EEEFFD]">
                  <span className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">{item.value}</span>
                  <p className="text-[#8a8fa6] text-sm mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PLACÓWKI ====== */}
        <section id="placowki" className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Gdzie zrobić onkopakiet {city.nameLocative}? Punkt pobrań i placówka
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto text-center mb-10">
              Badanie onkopierwiastków {city.nameLocative} wymaga pobrania materiału w certyfikowanej placówce referencyjnej — tylko tam specjalne próbówki i procedury gwarantują wiarygodność wyniku.
            </p>
            {facilities.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-neutral-100 text-center max-w-xl mx-auto">
                <p className="text-[#8a8fa6] mb-4">Aktualnie brak placówek referencyjnych {city.nameLocative}.</p>
                <Link href="/zamow" className="inline-flex items-center gap-2 text-[#5B65DC] text-sm font-semibold hover:underline">
                  Zamów badanie online — kurier odbierze materiał <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl mx-auto">
                {facilitiesWithLogo.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100">
                    <div className="flex items-center gap-4 mb-4">
                      {f.logo && <img src={f.logo} alt={f.name} className="h-10 object-contain" />}
                      <p className="font-bold text-[#122056] text-lg">{f.name}</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin size={15} className="text-[#5B65DC] shrink-0 mt-0.5" />
                        <span className="text-[#4a4f65]">{f.address}, {f.postalCode} {f.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={15} className="text-[#5B65DC] shrink-0" />
                        <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="text-[#5B65DC] font-semibold hover:underline">{f.phone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-[#5B65DC] shrink-0" />
                        <span className="text-[#4a4f65]">{f.hours}</span>
                      </div>
                    </div>
                    {f.notes && <p className="text-[#8a8fa6] text-xs mt-3 italic">{f.notes}</p>}
                    <div className="mt-5">
                      <Link href="/zamow" className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#4a53c7] transition-colors">
                        Zamów badanie w tej placówce <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ====== JAKIE PIERWIASTKI BADAMY ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Badanie 6 pierwiastków we krwi {city.nameLocative} — co obejmuje onkopakiet?
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto text-center mb-10">
              Onkopakiet dostępny {city.nameLocative} oznacza stężenia sześciu pierwiastków śladowych, których poziom we krwi — według wieloletnich badań — wiąże się z ryzykiem nowotworów.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { symbol: 'Se', name: 'Selen', desc: 'Wbudowany w selenoproteiny chroniące komórki przed stresem oksydacyjnym. Wspiera odporność i reguluje pracę tarczycy.' },
                { symbol: 'Zn', name: 'Cynk', desc: 'Składnik dysmutaz ponadtlenkowych (SOD). Neutralizuje wolne rodniki i pełni funkcję detoksykacyjną wobec metali ciężkich.' },
                { symbol: 'As', name: 'Arsen', desc: 'Karcynogen grupy 1 (IARC). Pierwiastek prozapalny — nawet niewielki wzrost stężenia może podnosić ryzyko nowotworu.' },
                { symbol: 'Cu', name: 'Miedź', desc: 'Kofaktor enzymatyczny i metaloestrogen. Nadmiar miedzi u pacjentów onkologicznych koreluje z gorszym rokowaniem.' },
                { symbol: 'Cd', name: 'Kadm', desc: 'Bezpośrednio uszkadza DNA powodując mutacje i aberracje chromosomowe. Karcynogen grupy 1, silnie powiązany z paleniem.' },
                { symbol: 'Pb', name: 'Ołów', desc: 'Generuje reaktywne formy tlenu i upośledza układ immunologiczny. Metaloestrogen zwiększający ryzyko u kobiet i mężczyzn.' },
              ].map((el) => (
                <div key={el.symbol} className="bg-[#FAFAFD] rounded-xl p-6 border border-[#EEEFFD]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-lg bg-[#122056] flex items-center justify-center text-white font-bold text-sm">{el.symbol}</span>
                    <p className="font-bold text-[#122056]">{el.name}</p>
                  </div>
                  <p className="text-[#8a8fa6] text-sm leading-relaxed">{el.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== DLA KOGO ====== */}
        <section className="py-16 lg:py-20 bg-[#122056] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/2150471457.webp" alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-[#122056]/60" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-white mb-4 text-center">
              Dla kogo jest badanie onkopierwiastków {city.nameLocative}?
            </h2>
            <p className="text-white/50 text-sm lg:text-base max-w-2xl mx-auto text-center mb-10">
              Onkopakiet {city.name} jest przeznaczony dla wszystkich dorosłych osób z polskiej populacji. Szczególną korzyść odniosą:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { emoji: '👤', title: 'Dorośli po 40. roku życia', desc: 'Ryzyko nowotworów rośnie z wiekiem — profilaktyka przynosi największe efekty właśnie w tym okresie.' },
                { emoji: '👨‍👩‍👧', title: 'Osoby z rakiem w rodzinie', desc: 'Dziedziczne predyspozycje nowotworowe zwiększają rolę profilaktyki pierwiastkowej w ocenie ryzyka.' },
                { emoji: '🧬', title: 'Nosicielki mutacji BRCA1', desc: 'Zakresy optymalne opracowane specjalnie dla nosicielek — na podstawie lat obserwacji w Ośrodku w Szczecinie.' },
                { emoji: '🚬', title: 'Osoby palące papierosy', desc: 'Palenie znacząco zaburza poziom kadmu i selenu — wynik uwzględnia ten czynnik w zakresach referencyjnych.' },
                { emoji: '🩺', title: 'Chorzy onkologicznie', desc: 'Stężenia selenu i cynku mają udowodnione znaczenie prognostyczne dla przeżyć pacjentów z nowotworami.' },
                { emoji: '🥗', title: 'Wegetarianie i weganie', desc: 'Diety eliminacyjne mogą prowadzić do zmian stężeń pierwiastków — badanie weryfikuje rzeczywisty stan.' },
              ].map((g) => (
                <div key={g.title} className="bg-white/10 rounded-xl p-6">
                  <span className="text-2xl mb-3 block">{g.emoji}</span>
                  <p className="font-bold text-white text-sm mb-2">{g.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-white font-bold text-xs text-center max-w-3xl mx-auto leading-relaxed">
              UWAGA!!! Brak dotąd danych, które by udowodniły poprawę przeżyć chorych z nowotworami złośliwymi w wyniku optymalizacji stężeń pierwiastków.
            </p>
          </div>
        </section>

        {/* ====== PRZYGOTOWANIE DO BADANIA ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Jak przygotować się do badania pierwiastków we krwi {city.nameLocative}?
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto text-center mb-10">
              Przygotowanie jest proste — trzy kroki dzielą Cię od wyniku.
            </p>
            <div className="grid md:grid-cols-3 gap-px bg-[#122056]/10 max-w-4xl mx-auto rounded-xl overflow-hidden">
              {[
                { n: '01', title: 'Przed pobraniem', items: ['Minimum 6 godzin na czczo', 'Przez 3 dni unikaj ryb morskich, owoców morza i ryżu', 'Poinformuj personel o suplementach z Se, Zn, Cu'] },
                { n: '02', title: 'W placówce', items: ['Pobranie 0,5 ml krwi pełnej lub surowicy', 'Materiał zabezpieczany w specjalnych próbówkach', 'Próbka transportowana do laboratorium'] },
                { n: '03', title: 'Odbiór wyniku', items: ['PDF z wynikami i zaleceniami na e-mail', 'Do 15 dni roboczych od dostarczenia próbki', 'Normy dopasowane do Twojego profilu'] },
              ].map((step) => (
                <div key={step.n} className="bg-white p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#5B65DC] font-bold text-xs tracking-widest">{step.n}</span>
                    <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base">{step.title}</p>
                  </div>
                  <div className="space-y-0">
                    {step.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 py-2 border-t border-neutral-100">
                        <div className="w-1 h-1 rounded-full bg-[#5B65DC] flex-shrink-0 mt-1.5" />
                        <p className="text-[#8a8fa6] text-sm leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 mt-6 max-w-4xl mx-auto border border-neutral-100">
              <AlertTriangle size={18} className="text-[#5B65DC] shrink-0 mt-0.5" />
              <p className="text-[#8a8fa6] text-sm"><strong className="text-[#122056]">Co może zaburzyć wynik?</strong> Transfuzja krwi, badanie z kontrastem, niestosowanie się do zaleceń. W razie wątpliwości skonsultuj się z personelem placówki {city.nameLocative}.</p>
            </div>
          </div>
        </section>

        {/* ====== CENNIK — komponent ze strony głównej ====== */}
        <Pricing />

        {/* ====== CO ZYSKASZ ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Co zyskasz dzięki onkopakietowi {city.nameLocative}?
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto text-center mb-10">
              To nie kolejne badanie krwi. To spersonalizowana informacja, która zmienia podejście do profilaktyki.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: IconAlertTriangle, title: 'Poznasz sygnały ostrzegawcze organizmu', desc: 'Nieprawidłowe stężenia mogą wskazywać na podwyższone ryzyko — zanim pojawią się jakiekolwiek objawy choroby.' },
                { icon: IconReportMedical, title: 'Otrzymasz konkretne wskazówki', desc: 'Wynik PDF zawiera jasne zalecenia — co zmienić w diecie, czy suplementować, jakie dalsze badania rozważyć.' },
                { icon: IconSalad, title: 'Dowiesz się, co jeść i czego unikać', desc: 'Niedobór selenu? Nadmiar kadmu? Raport wskaże, jakie zmiany żywieniowe mogą obniżyć Twoje ryzyko.' },
                { icon: IconPill, title: 'Koniec z suplementacją na ślepo', desc: 'Zamiast zgadywać — zobaczysz czarno na białym, czy potrzebujesz selenu, cynku, czy może masz ich za dużo.' },
                { icon: IconHeartRateMonitor, title: 'Zyskasz kontrolę nad zdrowiem', desc: 'Regularne monitorowanie pozwala śledzić efekty wdrożonych zmian — badanie daje realne narzędzie do działania.' },
                { icon: IconShieldCheck, title: 'Twarde dane do rozmowy z lekarzem', desc: 'Zamiast domysłów — wyniki oparte na 20+ patentach i 30+ publikacjach naukowych w PubMed.' },
              ].map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-7 border border-neutral-100">
                  <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center mb-5">
                    <b.icon size={22} className="text-white" stroke={1.5} />
                  </div>
                  <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base mb-2 leading-snug">{b.title}</p>
                  <p className="text-[#8a8fa6] text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== OPINIE ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-10 text-center">
              Opinie pacjentów o badaniu onkopierwiastków
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { text: 'Zamówiłam online, pobranie trwało chwilę, a wynik przyszedł z konkretnymi wskazówkami — wreszcie wiem, nad czym pracować ze swoim lekarzem.', name: 'Anna K.', role: 'Nauczycielka' },
                { text: 'Z mutacją BRCA1 szukałam czegoś więcej niż morfologia. Onkopierwiastki pokazały mi dane, których żadne inne badanie wcześniej nie dostarczyło.', name: 'Magdalena W.', role: 'Farmaceutka' },
                { text: 'Jako wieloletni palacz badanie kadmu otworzyło mi oczy. Mam plan — konkretna dieta, konsultacja z lekarzem, kontrola za pół roku.', name: 'Krzysztof M.', role: 'Przedsiębiorca' },
              ].map((t) => (
                <div key={t.name} className="bg-[#FAFAFD] rounded-xl p-6 border border-neutral-100">
                  <p className="text-[#4a4f65] text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-semibold text-[#122056] text-sm">{t.name}</p>
                  <p className="text-[#8a8fa6] text-xs">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-10 text-center">
              Najczęściej zadawane pytania — onkopierwiastki {city.name}
            </h2>
            <div className="space-y-3">
              {city.faq.map((item, i) => (
                <ExpandableText key={i} title={item.q}>
                  <p>{item.a}</p>
                </ExpandableText>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-[#EEEFFD] rounded-2xl p-8 lg:p-10 text-center">
              <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-[#122056] mb-3">
                Zamów onkopakiet {city.name} — badanie onkopierwiastków online
              </h2>
              <p className="text-[#8a8fa6] text-sm mb-6 max-w-xl mx-auto">
                Jedno pobranie krwi. Sześć pierwiastków. Spersonalizowany raport z zaleceniami dietetycznymi i suplementacyjnymi w 15 dni roboczych.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/zamow" className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#4a53c7] transition-colors">
                  Zamów badanie online <ArrowRight size={14} />
                </Link>
                <Link href="/#placowki" className="inline-flex items-center gap-2 bg-white text-[#122056] text-sm font-semibold px-6 py-3 rounded-full border border-neutral-200 hover:border-[#5B65DC] transition-colors">
                  <MapPin size={14} /> Wszystkie placówki w Polsce
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== DŁUGI TEKST SEO — rozwijany ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CollapsibleContent title={`Badanie onkopierwiastków ${city.name} — kompletny przewodnik`}>
              <div dangerouslySetInnerHTML={{ __html: city.seoText }} />
            </CollapsibleContent>
          </div>
        </section>

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {localBusinessJsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
