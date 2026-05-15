import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/src/lib/prisma';
import { siteConfig } from '@/src/siteConfig';
import { sanitizeHtml } from '@/src/lib/sanitize';
import { getCityBySlug, getAllCitySlugs, standardFaq } from '@/src/data/cities';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import Pricing from '@/src/components/Pricing';
import { ExpandableText } from '@/src/components/ExpandableText';
import { CollapsibleContent } from '@/src/components/CollapsibleContent';
import { FacilityDescription } from '@/src/components/FacilityDescription';
import {
  ChevronRight, MapPin, Phone, Clock, ArrowRight, ShieldCheck,
  FlaskConical, FileText, Calendar, AlertTriangle, Check, Mail,
  Microscope, Users, TestTube,
} from 'lucide-react';
import {
  IconAlertTriangle, IconReportMedical, IconSalad, IconPill,
  IconHeartRateMonitor, IconShieldCheck,
  IconUser, IconUsers, IconDna, IconSmoking, IconStethoscope,
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
    orderBy: { createdAt: 'asc' },
  });

  const facilityLogos: Record<string, string> = {
    'Dolnośląskie Centrum Medyczne DOLMED S.A.': '/images/dolmed logo.png',
    'Centrum Medyczne Polmed': '/images/polmed-logo.png',
  };

  const facilityDescriptions: Record<string, { teaser: string; full: string }> = {
    'Dolnośląskie Centrum Medyczne DOLMED S.A.': {
      teaser: 'DOLMED to jedna z największych prywatnych placówek medycznych na Dolnym Śląsku, oferująca kompleksową diagnostykę i specjalistyczną opiekę zdrowotną.',
      full: 'Dolnośląskie Centrum Medyczne DOLMED S.A. działa od ponad 30 lat i obsługuje pacjentów z Wrocławia oraz całego regionu dolnośląskiego. Placówka zatrudnia ponad 400 specjalistów i dysponuje nowoczesnym zapleczem diagnostycznym. Punkt pobrań działa od wczesnych godzin rannych, co umożliwia pobranie materiału na czczo przed pracą. DOLMED posiada certyfikat jakości i stosuje ścisłe procedury przechowywania i transportu próbek, wymagane przez laboratorium Innowacyjna Medycyna. Placówka jest doskonale skomunikowana z centrum Wrocławia — tramwaj i autobus zatrzymują się w bezpośrednim sąsiedztwie.',
    },
    'Centrum Medyczne Polmed': {
      teaser: 'Centrum Medyczne Polmed to ogólnopolska sieć przychodni oferująca szeroki zakres usług medycznych, w tym diagnostykę laboratoryjną i specjalistyczne konsultacje.',
      full: 'Centrum Medyczne Polmed to jedna z największych sieci prywatnych placówek medycznych w Polsce, działająca w kilkunastu miastach. Wrocławska placówka przy ul. Grabiszyńskiej 208 oferuje pełen zakres diagnostyki laboratoryjnej, w tym pobrania krwi zgodnie z wyspecjalizowanymi protokołami. Personel jest przeszkolony w zakresie obsługi specjalnych próbówek wymaganych do badania onkopierwiastków. Placówka przyjmuje pacjentów w szerokich godzinach, a rejestracja dostępna jest zarówno online, jak i telefonicznie.',
    },
  };

  const facilitiesWithLogo = facilities.map((f) => ({
    ...f,
    logo: facilityLogos[f.name] || null,
  }));

  // Combine city-specific + standard FAQ
  const allFaq = [...city.cityFaq, ...standardFaq];

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
    mainEntity: allFaq.map((item) => ({
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

        {/* ============================================================
            UNIQUE CONTENT — specific to each city
            ============================================================ */}

        {/* ====== HERO (unique) ====== */}
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
                { icon: FlaskConical, label: '6 pierwiastków', sub: 'z jednego pobrania krwi' },
                { icon: FileText, label: 'Wynik w 15 dni roboczych', sub: 'spersonalizowany raport PDF' },
                { icon: ShieldCheck, label: '20+ patentów', sub: 'badania PUM w Szczecinie' },
                { icon: Calendar, label: 'Bez skierowania', sub: 'zamów i umów termin pobrania' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-neutral-100">
                  <b.icon size={18} className="text-[#122056] shrink-0" />
                  <span className="text-sm"><strong className="text-[#122056]">{b.label}</strong> <span className="text-[#8a8fa6]">{b.sub}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PLACÓWKI (unique — data from DB) ====== */}
        <section id="placowki" className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Gdzie zrobić onkopakiet {city.nameLocative}? Punkt pobrań i placówka
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto text-center mb-4">
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
              <div className={`grid gap-5 ${facilitiesWithLogo.length === 1 ? 'max-w-xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto'}`}>
                {facilitiesWithLogo.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100 flex flex-col">
                    {/* Logo + Name */}
                    <div className="mb-5 pb-5 border-b border-neutral-100">
                      {f.logo
                        ? <img
                            src={f.logo}
                            alt={f.name}
                            className="block h-12 w-auto object-contain mb-3"
                          />
                        : <div className="w-10 h-10 rounded-full bg-[#EEEFFD] flex items-center justify-center mb-3"><FlaskConical size={18} className="text-[#5B65DC]" /></div>
                      }
                      <p className="font-bold text-[#122056] text-base leading-tight">{f.name}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin size={15} className="text-[#5B65DC] shrink-0 mt-0.5" />
                        <span className="text-[#4a4f65]">{f.address}, {f.postalCode} {f.city}</span>
                      </div>
                      {f.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={15} className="text-[#5B65DC] shrink-0" />
                          <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="text-[#5B65DC] font-semibold hover:underline">{f.phone}</a>
                        </div>
                      )}
                      {f.hours && (
                        <div className="flex items-center gap-2">
                          <Clock size={15} className="text-[#5B65DC] shrink-0" />
                          <span className="text-[#4a4f65]">{f.hours}</span>
                        </div>
                      )}
                      {f.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={15} className="text-[#5B65DC] shrink-0" />
                          <a href={`mailto:${f.email}`} className="text-[#5B65DC] font-semibold hover:underline">{f.email}</a>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {f.supportsBlood && (
                        <span className="inline-flex items-center gap-1.5 bg-[#EEEFFD] text-[#122056] text-xs font-medium px-3 py-1.5 rounded-full">
                          <TestTube size={12} /> Krew pełna
                        </span>
                      )}
                      {f.supportsSerum && (
                        <span className="inline-flex items-center gap-1.5 bg-[#EEEFFD] text-[#122056] text-xs font-medium px-3 py-1.5 rounded-full">
                          <FlaskConical size={12} /> Surowica
                        </span>
                      )}
                    </div>

                    {f.notes && <p className="text-[#8a8fa6] text-xs mt-3 italic">{f.notes}</p>}

                    {/* Description expandable */}
                    {facilityDescriptions[f.name] && (
                      <FacilityDescription
                        teaser={facilityDescriptions[f.name].teaser}
                        full={facilityDescriptions[f.name].full}
                      />
                    )}

                    {/* CTA */}
                    <div className="mt-5 flex flex-col sm:flex-row gap-2">
                      <Link href="/zamow" className="inline-flex items-center justify-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#4a53c7] transition-colors flex-1 text-center">
                        Zamów badanie <ArrowRight size={14} />
                      </Link>
                      {f.phone && (
                        <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 bg-white text-[#122056] text-sm font-semibold px-5 py-2.5 rounded-full border border-neutral-200 hover:border-[#5B65DC] transition-colors">
                          <Phone size={14} /> Zadzwoń
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            STANDARD CONTENT — same on every city page
            ============================================================ */}

        {/* ====== LABORATORIUM I METODA (standard) ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Laboratorium i metoda badania
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto text-center mb-10">
              Każda próbka pobrana {city.nameLocative} trafia do specjalistycznego laboratorium.
            </p>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              <div className="bg-[#FAFAFD] rounded-2xl p-7 border border-[#EEEFFD]">
                <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center mb-5">
                  <Microscope size={22} className="text-white" />
                </div>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base mb-2">Metoda ICP-MS</p>
                <p className="text-[#8a8fa6] text-sm leading-relaxed">Spektrometria mas z plazmą indukcyjnie sprzężoną (ICP-MS) — najdokładniejsza dostępna technika oznaczania pierwiastków śladowych we krwi. Wykrywa stężenia rzędu części na miliard.</p>
              </div>
              <div className="bg-[#FAFAFD] rounded-2xl p-7 border border-[#EEEFFD]">
                <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center mb-5">
                  <Users size={22} className="text-white" />
                </div>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base mb-2">Zespół prof. Lubińskiego</p>
                <p className="text-[#8a8fa6] text-sm leading-relaxed">Analizę wykonuje laboratorium Innowacyjna Medycyna we współpracy z Pomorskim Uniwersytetem Medycznym w Szczecinie. Ponad 20 lat badań, 20+ patentów, 30+ publikacji w PubMed.</p>
              </div>
              <div className="bg-[#FAFAFD] rounded-2xl p-7 border border-[#EEEFFD]">
                <div className="w-12 h-12 rounded-xl bg-[#122056] flex items-center justify-center mb-5">
                  <ShieldCheck size={22} className="text-white" />
                </div>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base mb-2">Normy dla Polaków</p>
                <p className="text-[#8a8fa6] text-sm leading-relaxed">Spersonalizowane zakresy referencyjne opracowane wyłącznie dla polskiej populacji. Uwzględniają płeć, wiek, palenie i mutację BRCA1 — to nie są uniwersalne normy laboratoryjne.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== JAKIE PIERWIASTKI BADAMY (standard) ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Badanie 6 pierwiastków we krwi — co obejmuje onkopakiet?
            </h2>
            <p className="text-[#8a8fa6] text-sm lg:text-base max-w-3xl mx-auto text-center mb-10">
              Onkopakiet oznacza stężenia sześciu pierwiastków śladowych, których poziom we krwi — według wieloletnich badań — wiąże się z ryzykiem nowotworów.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { symbol: 'Se', name: 'Selen', desc: 'Mikroelement niezbędny do produkcji enzymów antyoksydacyjnych i hormonów tarczycy. Jego optymalne stężenie chroni DNA i zmniejsza ryzyko nowotworów złośliwych — zarówno niedobór, jak i nadmiar są szkodliwe.' },
                { symbol: 'Zn', name: 'Cynk', desc: 'Pierwiastek wspierający odporność, naprawę DNA i gospodarkę hormonalną. Nieprawidłowe stężenie cynku wiąże się z kilkukrotnie wyższym ryzykiem zachorowania na nowotwory złośliwe.' },
                { symbol: 'As', name: 'Arsen', desc: 'Pierwiastek prozapalny powszechnie obecny w środowisku, żywności i wodzie. Naśladuje działanie estrogenów, indukuje wolne rodniki i zwiększa ryzyko nowotworowe nawet przy umiarkowanych stężeniach.' },
                { symbol: 'Cu', name: 'Miedź', desc: 'Niezbędna do pracy enzymów i transportu żelaza, lecz jej nadmiar u pacjentów onkologicznych pogarsza rokowanie. Metaloestrogen o udowodnionym wpływie na ryzyko nowotworów złośliwych.' },
                { symbol: 'Cd', name: 'Kadm', desc: 'Silny karcynogen grupy 1, uszkadzający DNA i hamujący jego naprawę. Główne źródło ekspozycji to palenie tytoniu oraz dieta — jego stężenie w organizmie rośnie przez całe życie.' },
                { symbol: 'Pb', name: 'Ołów', desc: 'Metal ciężki upośledzający układ odpornościowy i wywołujący stres oksydacyjny. Jako metaloestrogen zwiększa ryzyko nowotworów hormonozależnych u kobiet i mężczyzn.' },
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

        {/* ====== DLA KOGO (standard) ====== */}
        <section className="py-16 lg:py-20 bg-[#122056] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/2150471457.webp" alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-[#122056]/60" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-white mb-4 text-center">
              Komu szczególnie polecamy badanie onkopierwiastków?
            </h2>
            <p className="text-white/50 text-sm lg:text-base max-w-2xl mx-auto text-center mb-10">
              Onkopakiet jest przeznaczony dla wszystkich dorosłych osób z polskiej populacji. Szczególną korzyść odniosą:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <IconUser size={22} stroke={1.5} />, title: 'Każda dorosła osoba', desc: 'Profilaktycznie, aby znać swój poziom ryzyka zachorowania na nowotwory złośliwe oraz zgonu niezależnie od przyczyny w młodszym wieku.' },
                { icon: <IconUsers size={22} stroke={1.5} />, title: 'Osoby z wywiadem rodzinnym', desc: 'Dziedziczne predyspozycje nowotworowe zwiększają rolę profilaktyki pierwiastkowej w ocenie indywidualnego ryzyka.' },
                { icon: <IconDna size={22} stroke={1.5} />, title: 'Nosicielki mutacji BRCA1', desc: 'Zakresy optymalne opracowane specjalnie dla tej grupy na podstawie wieloletnich badań w Ośrodku w Szczecinie.' },
                { icon: <IconSmoking size={22} stroke={1.5} />, title: 'Osoby palące papierosy', desc: 'Palenie znacząco zaburza poziom kadmu i selenu — wynik uwzględnia ten czynnik w zakresach referencyjnych.' },
                { icon: <IconStethoscope size={22} stroke={1.5} />, title: 'Pacjenci onkologiczni', desc: 'Selen i cynk mają istotne znaczenie dla prognozowania przeżyć chorych z nowotworami złośliwymi o różnej lokalizacji.' },
                { icon: <IconSalad size={22} stroke={1.5} />, title: 'Osoby na dietach eliminacyjnych', desc: 'Weganie i wegetarianie mogą mieć istotnie wyższe stężenie selenu i kadmu we krwi — badanie to weryfikuje.' },
              ].map((g) => (
                <div key={g.title} className="bg-white/10 hover:bg-white/15 rounded-xl p-6 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white mb-4">
                    {g.icon}
                  </div>
                  <p className="font-[family-name:var(--font-funnel)] font-bold text-white text-base mb-2">{g.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-white font-bold text-xs text-center max-w-3xl mx-auto leading-relaxed">
              UWAGA!!! Brak dotąd danych, które by udowodniły poprawę przeżyć chorych z nowotworami złośliwymi w wyniku optymalizacji stężeń pierwiastków.
            </p>
          </div>
        </section>

        {/* ====== PRZYGOTOWANIE DO BADANIA (standard) ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Jak przygotować się do badania pierwiastków we krwi?
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
              <p className="text-[#8a8fa6] text-sm"><strong className="text-[#122056]">Ważne:</strong> Próbki wysyłane do laboratorium od poniedziałku do czwartku. Planuj pobranie odpowiednio, aby materiał dotarł w optymalnym czasie.</p>
            </div>
          </div>
        </section>

        {/* ====== CENNIK (standard — komponent ze strony głównej) ====== */}
        <Pricing />

        {/* ====== CO ZYSKASZ (standard) ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-4 text-center">
              Co zyskasz dzięki onkopakietowi?
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

        {/* ============================================================
            MIXED — city-specific FAQ + standard FAQ
            ============================================================ */}

        {/* ====== FAQ ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] mb-10 text-center">
              Najczęściej zadawane pytania — onkopierwiastki {city.name}
            </h2>
            <div className="space-y-3">
              {allFaq.map((item, i) => (
                <ExpandableText key={i} title={item.q}>
                  <p>{item.a}</p>
                </ExpandableText>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 lg:py-20 bg-[#FAFAFD]">
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

        {/* ====== DŁUGI TEKST SEO — rozwijany (unique) ====== */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CollapsibleContent title={`Badanie onkopierwiastków ${city.name} — kompletny przewodnik`}>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(city.seoText) }} />
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
