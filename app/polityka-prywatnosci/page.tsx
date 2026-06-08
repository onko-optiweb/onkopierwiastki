import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/siteConfig';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description: 'Polityka prywatności serwisu badamypierwiastki.pl — informacje o przetwarzaniu danych osobowych, prawach użytkowników i plikach cookies.',
  alternates: { canonical: '/polityka-prywatnosci' },
  openGraph: {
    title: `Polityka prywatności | ${siteConfig.name}`,
    description: 'Informacje o przetwarzaniu danych osobowych, prawach użytkowników i plikach cookies.',
    url: `${siteConfig.domain}/polityka-prywatnosci`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-[family-name:var(--font-funnel)] font-bold text-xl text-[#122056] mb-4 mt-10">{title}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[#3a3f5c] text-sm leading-relaxed mb-3">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-3 space-y-1 text-[#3a3f5c] text-sm leading-relaxed">{children}</ul>;
}

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-[#122056] hover:opacity-70 transition-opacity">
            <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-10" />
          </Link>
          <Link href="/zamow" className="text-[#5B65DC] text-sm font-semibold hover:underline">
            Zamów badanie
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#8a8fa6] mb-6">
          <Link href="/" className="hover:text-[#122056] transition-colors">Strona główna</Link>
          <ChevronRight size={14} />
          <span className="text-[#122056] font-medium">Polityka prywatności</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-[#122056] mb-2">
            Polityka prywatności
          </h1>
          <p className="text-[#8a8fa6] text-sm">
            www.badamypierwiastki.pl &middot; obowiązuje od dnia 1 maja 2026 r.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8">

          <Section id="administrator" title="1. Administrator danych osobowych">
            <P>Administratorem Twoich danych osobowych jest:</P>
            <div className="bg-[#FAFAFD] rounded-xl p-4 mb-4 text-sm text-[#3a3f5c] space-y-1">
              <p className="font-bold text-[#122056]">Innowacyjna Medycyna Spółka z Ograniczoną Odpowiedzialnością</p>
              <p>ul. Akacjowa 2, 71-253 Szczecin, Polska</p>
              <p>KRS: 0000509855 &middot; NIP: 8522608584 &middot; REGON: 321548146</p>
              <p>E-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></p>
            </div>
            <P>W sprawach dotyczących ochrony danych osobowych możesz kontaktować się z nami pod adresem e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>.</P>
          </Section>

          <Section id="zakres" title="2. Zakres i cele przetwarzania danych">
            <P>Przetwarzamy Twoje dane osobowe w następujących celach:</P>
            <Ul>
              <li><strong>Realizacja zamówienia i wykonanie badania</strong> &ndash; przetwarzanie jest niezbędne do wykonania umowy (art. 6 ust. 1 lit. b RODO). Zakres: imię, nazwisko, PESEL, adres e-mail, numer telefonu, adres zamieszkania.</li>
              <li><strong>Wystawienie faktury</strong> &ndash; w przypadku zaznaczenia opcji &bdquo;Faktura na firmę&rdquo; przetwarzamy dodatkowo nazwę firmy i NIP (art. 6 ust. 1 lit. c RODO &ndash; obowiązek prawny).</li>
              <li><strong>Przechowywanie dokumentacji medycznej</strong> &ndash; wymagane przepisami prawa przez okres co najmniej 5 lat (art. 6 ust. 1 lit. c RODO).</li>
              <li><strong>Kontakt w sprawie zamówienia i obsługa reklamacji</strong> &ndash; niezbędne do wykonania umowy (art. 6 ust. 1 lit. b RODO).</li>
              <li><strong>Marketing usług własnych</strong> &ndash; wyłącznie za Twoją zgodą (art. 6 ust. 1 lit. a RODO). Zgodę możesz wycofać w dowolnym momencie.</li>
              <li><strong>Analiza ruchu na stronie</strong> &ndash; za Twoją zgodą wyrażoną w banerze cookies (art. 6 ust. 1 lit. a RODO).</li>
            </Ul>
          </Section>

          <Section id="pesel" title="3. PESEL">
            <P>Numer PESEL jest przetwarzany wyłącznie w celu jednoznacznej identyfikacji pacjenta przy realizacji badania diagnostycznego, zgodnie z wymogami dokumentacji medycznej. PESEL nie jest wykorzystywany w żadnym innym celu.</P>
            <P>Jeśli nie posiadasz numeru PESEL (np. obcokrajowcy), możesz zaznaczyć opcję &bdquo;Brak numeru PESEL&rdquo; w formularzu zamówienia.</P>
          </Section>

          <Section id="odbiorcy" title="4. Odbiorcy danych">
            <P>Twoje dane osobowe mogą być przekazywane następującym kategoriom odbiorców:</P>
            <Ul>
              <li><strong>Placówki certyfikowane</strong> &ndash; punkty pobrań krwi współpracujące z Administratorem, w zakresie niezbędnym do realizacji badania.</li>
              <li><strong>Laboratorium</strong> &ndash; Innowacyjna Medycyna sp. z o.o. (adres laboratorium: Grzepnica, ul. Alabastrowa 8, 72-003 Dobra).</li>
              <li><strong>Dostawcy usług IT</strong> &ndash; hosting (Vercel), baza danych (Supabase), system płatności (PayU S.A.).</li>
              <li><strong>Organy publiczne</strong> &ndash; na żądanie uprawnionych organów, w przypadkach przewidzianych prawem.</li>
            </Ul>
            <P>Twoje dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach marketingowych.</P>
          </Section>

          <Section id="okres" title="5. Okres przechowywania danych">
            <Ul>
              <li><strong>Dane związane z zamówieniem i badaniem</strong> &ndash; przez okres co najmniej 5 lat od realizacji badania (wymogi dokumentacji medycznej).</li>
              <li><strong>Dane do faktury</strong> &ndash; przez okres wymagany przepisami podatkowymi (5 lat od końca roku podatkowego).</li>
              <li><strong>Dane marketingowe</strong> &ndash; do czasu wycofania zgody.</li>
              <li><strong>Dane analityczne (cookies)</strong> &ndash; zgodnie z okresem ważności plików cookies (patrz sekcja 8).</li>
            </Ul>
          </Section>

          <Section id="prawa" title="6. Twoje prawa">
            <P>Na podstawie RODO przysługują Ci następujące prawa:</P>
            <Ul>
              <li><strong>Prawo dostępu</strong> &ndash; możesz uzyskać informację, czy i jakie Twoje dane przetwarzamy.</li>
              <li><strong>Prawo do sprostowania</strong> &ndash; możesz żądać poprawienia nieprawidłowych danych.</li>
              <li><strong>Prawo do usunięcia</strong> (&bdquo;prawo do bycia zapomnianym&rdquo;) &ndash; możesz żądać usunięcia danych, o ile nie jest to sprzeczne z obowiązkami prawnymi (np. przechowywanie dokumentacji medycznej).</li>
              <li><strong>Prawo do ograniczenia przetwarzania</strong> &ndash; możesz żądać ograniczenia przetwarzania w określonych przypadkach.</li>
              <li><strong>Prawo do przenoszenia danych</strong> &ndash; możesz otrzymać swoje dane w ustrukturyzowanym formacie.</li>
              <li><strong>Prawo do sprzeciwu</strong> &ndash; możesz wnieść sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie.</li>
              <li><strong>Prawo do wycofania zgody</strong> &ndash; w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed wycofaniem.</li>
              <li><strong>Prawo do wniesienia skargi</strong> &ndash; do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" className="text-[#5B65DC] hover:underline" target="_blank" rel="noopener noreferrer">uodo.gov.pl</a>).</li>
            </Ul>
            <P>Aby skorzystać ze swoich praw, skontaktuj się z nami: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>.</P>
          </Section>

          <Section id="bezpieczenstwo" title="7. Bezpieczeństwo danych">
            <P>Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych, w tym:</P>
            <Ul>
              <li>Szyfrowanie transmisji danych (SSL/TLS)</li>
              <li>Szyfrowanie haseł (bcrypt)</li>
              <li>Ograniczenie dostępu do danych wyłącznie do upoważnionych osób</li>
              <li>Regularne kopie zapasowe bazy danych</li>
              <li>Przechowywanie materiału biologicznego w temperaturze -20°C przez co najmniej 2 miesiące</li>
            </Ul>
            <P>W przypadku naruszenia ochrony danych osobowych niezwłocznie powiadomimy Cię oraz podejmiemy działania naprawcze zgodnie z obowiązującymi przepisami.</P>
          </Section>

          <Section id="cookies" title="8. Pliki cookies">
            <P>Serwis wykorzystuje pliki cookies (ciasteczka) &ndash; małe pliki tekstowe zapisywane na Twoim urządzeniu.</P>
            <P><strong>Rodzaje cookies:</strong></P>
            <Ul>
              <li><strong>Niezbędne</strong> &ndash; konieczne do prawidłowego działania strony (sesja, logowanie). Nie wymagają zgody. Zawsze aktywne.</li>
              <li><strong>Analityczne</strong> &ndash; Google Analytics 4. Pozwalają analizować ruch na stronie i poprawiać jej działanie. Wymagają Twojej zgody.</li>
              <li><strong>Marketingowe</strong> &ndash; umożliwiają wyświetlanie spersonalizowanych reklam. Wymagają Twojej zgody.</li>
            </Ul>
            <P><strong>Zarządzanie zgodą:</strong></P>
            <P>Przy pierwszej wizycie wyświetlamy baner cookies, w którym możesz zaakceptować wszystkie kategorie, wybrać tylko niezbędne lub dostosować preferencje. Zgodę możesz zmienić w dowolnym momencie, usuwając pliki cookies z przeglądarki.</P>
            <P><strong>Google Consent Mode v2:</strong></P>
            <P>Stosujemy Google Consent Mode v2, który domyślnie blokuje śledzenie do momentu wyrażenia zgody. Po zaakceptowaniu analitycznych lub marketingowych cookies odpowiednie usługi Google są aktywowane.</P>
            <P>Możesz również samodzielnie zarządzać cookies poprzez ustawienia przeglądarki. Wyłączenie cookies niezbędnych może utrudnić korzystanie z niektórych funkcji serwisu.</P>
          </Section>

          <Section id="platnosci" title="9. Płatności">
            <P>Płatności online realizowane są za pośrednictwem systemu PayU S.A. (ul. Grunwaldzka 186, 60-166 Poznań, KRS: 0000274399). Dane karty płatniczej przetwarzane są wyłącznie przez PayU &ndash; Administrator nie ma dostępu do pełnych danych karty.</P>
            <P>PayU przetwarza dane zgodnie z własną polityką prywatności dostępną na stronie <a href="https://www.payu.pl" className="text-[#5B65DC] hover:underline" target="_blank" rel="noopener noreferrer">payu.pl</a>.</P>
          </Section>

          <Section id="przekazywanie" title="10. Przekazywanie danych poza EOG">
            <P>W związku z korzystaniem z usług firm technologicznych (Vercel, Supabase), Twoje dane mogą być przetwarzane na serwerach zlokalizowanych poza Europejskim Obszarem Gospodarczym (EOG). W takim przypadku transfer danych odbywa się na podstawie standardowych klauzul umownych (SCC) zatwierdzonych przez Komisję Europejską lub decyzji o adekwatności, zapewniających odpowiedni poziom ochrony danych.</P>
          </Section>

          <Section id="dzieci" title="11. Dane dzieci">
            <P>Serwis badamypierwiastki.pl jest przeznaczony wyłącznie dla osób pełnoletnich (powyżej 18 roku życia). Nie przetwarzamy świadomie danych osobowych osób niepełnoletnich.</P>
          </Section>

          <Section id="zmiany" title="12. Zmiany polityki prywatności">
            <P>Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Prywatności. O istotnych zmianach poinformujemy za pośrednictwem komunikatu na stronie lub wiadomości e-mail z co najmniej 14-dniowym wyprzedzeniem.</P>
            <P>Aktualna wersja Polityki Prywatności jest zawsze dostępna na stronie <a href="/polityka-prywatnosci" className="text-[#5B65DC] hover:underline">badamypierwiastki.pl/polityka-prywatnosci</a>.</P>
          </Section>

          <Section id="kontakt" title="13. Kontakt">
            <P>W sprawach dotyczących ochrony danych osobowych możesz skontaktować się z nami:</P>
            <div className="bg-[#FAFAFD] rounded-xl p-4 text-sm text-[#3a3f5c] space-y-1">
              <p className="font-bold text-[#122056]">Innowacyjna Medycyna sp. z o.o.</p>
              <p>ul. Akacjowa 2, 71-253 Szczecin</p>
              <p>E-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></p>
            </div>
          </Section>

          <div className="mt-10 pt-6 border-t border-[#EEEFFD] text-center text-[#8a8fa6] text-xs">
            Innowacyjna Medycyna sp. z o.o. &middot; www.badamypierwiastki.pl &middot; <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>
          </div>

        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Strona główna', item: siteConfig.domain },
            { '@type': 'ListItem', position: 2, name: 'Polityka prywatności', item: `${siteConfig.domain}/polityka-prywatnosci` },
          ],
        }) }}
      />
    </div>
  );
}
