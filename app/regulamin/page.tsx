import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/siteConfig';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Regulamin serwisu',
  description: 'Regulamin serwisu internetowego onkopierwiastki.pl — zasady składania zamówień, płatności, realizacji badań i ochrony danych osobowych.',
  alternates: { canonical: '/regulamin' },
  openGraph: {
    title: `Regulamin serwisu | ${siteConfig.name}`,
    description: 'Zasady składania zamówień, płatności, realizacji badań i ochrony danych osobowych.',
    url: `${siteConfig.domain}/regulamin`,
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

function P({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="text-[#3a3f5c] text-sm leading-relaxed mb-3 pl-8 relative">
      <span className="absolute left-0 text-[#8a8fa6] font-medium text-xs tabular-nums">{n}.</span>
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-14 mb-3 space-y-1 text-[#3a3f5c] text-sm leading-relaxed">{children}</ul>;
}

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      {/* Header */}
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
          <span className="text-[#122056] font-medium">Regulamin</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-[#122056] mb-2">
            Regulamin serwisu internetowego
          </h1>
          <p className="text-[#8a8fa6] text-sm">
            www.onkopierwiastki.pl &middot; wersja 1.0, obowiązuje od dnia 1 maja 2026 r.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8">

          {/* §1 */}
          <Section id="s1" title="§1. Postanowienia ogólne">
            <P n={1}>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem www.onkopierwiastki.pl (dalej: &bdquo;Serwis&rdquo;), w tym zasady składania zamówień, świadczenia usług oraz ochronę danych osobowych użytkowników.</P>
            <P n={2}>Operatorem Serwisu i podmiotem świadczącym usługi jest Innowacyjna Medycyna sp. z o.o.</P>
            <Ul>
              <li>Siedziba: 71-253 Szczecin, ul. Akacjowa 2</li>
              <li>NIP: 8522608584, REGON: 321548146</li>
              <li>Adres korespondencyjny laboratorium: Grzepnica, ul. Alabastrowa 8, 72-003 Dobra</li>
              <li>Adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></li>
            </Ul>
            <P n={3}>Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu. Przed złożeniem zamówienia Użytkownik zobowiązany jest zapoznać się z jego treścią.</P>
            <P n={4}>Z usług Serwisu mogą korzystać wyłącznie osoby pełnoletnie, które ukończyły 18 rok życia.</P>
            <P n={5}>Regulamin jest udostępniony nieodpłatnie na stronie Serwisu w formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie.</P>
          </Section>

          {/* §2 */}
          <Section id="s2" title="§2. Definicje">
            <P n={6}><strong>Użytkownik</strong> &ndash; pełnoletnia osoba fizyczna korzystająca z Serwisu w celu złożenia zamówienia na badanie.</P>
            <P n={7}><strong>Badanie</strong> &ndash; usługa diagnostyczna polegająca na oznaczeniu stężeń pierwiastków (onkopierwiastków) we krwi pełnej lub surowicy, realizowana przez laboratorium Innowacyjna Medycyna sp. z o.o.</P>
            <P n={8}><strong>Zamówienie</strong> &ndash; oświadczenie woli Użytkownika złożone za pośrednictwem Serwisu, zmierzające do zawarcia umowy o wykonanie Badania.</P>
            <P n={9}><strong>Placówka referencyjna</strong> &ndash; punkt pobrania materiału biologicznego współpracujący z Operatorem, wskazany Użytkownikowi po złożeniu Zamówienia.</P>
            <P n={10}><strong>Wynik</strong> &ndash; raport PDF zawierający wyniki Badania, przekazywany Użytkownikowi drogą elektroniczną.</P>
            <P n={11}><strong>Panel badawczy</strong> &ndash; zestaw pierwiastków objętych danym Badaniem, zgodny z ofertą przedstawioną w Serwisie.</P>
          </Section>

          {/* §3 */}
          <Section id="s3" title="§3. Przedmiot usługi">
            <P n={12}>Za pośrednictwem Serwisu Użytkownik może zamówić badanie oznaczenia stężeń onkopierwiastków we krwi lub surowicy, realizowane przez laboratorium Innowacyjna Medycyna sp. z o.o.</P>
            <P n={13}>Oferta Serwisu obejmuje następujące panele badawcze:</P>
            <Ul>
              <li>Onkopakiet do 3 wybranych pierwiastków we krwi pełnej (As, Zn, Cd, Pb, Se, Cu)</li>
              <li>Onkopakiet do 6 wybranych pierwiastków we krwi pełnej (As, Zn, Cd, Pb, Se, Cu)</li>
              <li>Onkopakiet do 3 wybranych pierwiastków w surowicy (As, Zn, Se, Mn, Cu)</li>
              <li>Onkopakiet do 5 wybranych pierwiastków w surowicy (As, Zn, Se, Mn, Cu)</li>
            </Ul>
            <P n={14}>Wyniki Badań opracowywane są w oparciu o zakresy referencyjne ustalone wyłącznie dla populacji polskiej, opracowane przez Międzynarodowe Centrum Nowotworów Dziedzicznych Pomorskiego Uniwersytetu Medycznego w Szczecinie i chronione patentami Urzędu Patentowego Rzeczypospolitej Polskiej.</P>
            <P n={15}>Badanie nie stanowi diagnozy medycznej i nie zastępuje konsultacji lekarskiej. Wyniki należy omawiać z lekarzem.</P>
            <P n={16}>Serwis nie wymaga skierowania lekarskiego do złożenia Zamówienia.</P>
          </Section>

          {/* §4 */}
          <Section id="s4" title="§4. Składanie zamówień i zawarcie umowy">
            <P n={17}>Zamówienie składa się poprzez wypełnienie formularza dostępnego w Serwisie, wybór panelu badawczego oraz dokonanie płatności.</P>
            <P n={18}>Warunkiem złożenia Zamówienia jest:</P>
            <Ul>
              <li>Podanie prawdziwych danych osobowych (imię, nazwisko, PESEL, adres e-mail, nr telefonu)</li>
              <li>Wybór panelu badawczego</li>
              <li>Zaakceptowanie niniejszego Regulaminu</li>
              <li>Dokonanie płatności</li>
            </Ul>
            <P n={19}>Umowa o wykonanie Badania zostaje zawarta z chwilą potwierdzenia przez Operatora przyjęcia Zamówienia drogą e-mail.</P>
            <P n={20}>Po złożeniu Zamówienia Użytkownik otrzymuje informację o wskazanej Placówce referencyjnej, w której powinien się zgłosić na pobranie materiału.</P>
            <P n={21}>Zamówienia realizowane są w dniach roboczych od poniedziałku do czwartku. Pobrania dokonane w piątek lub w święta będą wysyłane w następnym dostępnym dniu roboczym.</P>
          </Section>

          {/* §5 */}
          <Section id="s5" title="§5. Ceny i płatności">
            <P n={22}>Ceny Badań podane są w Serwisie i wyrażone są w złotych polskich. Badania diagnostyczne są zwolnione z podatku VAT na podstawie art. 43 ust. 1 pkt 18 ustawy o podatku od towarów i usług.</P>
            <P n={23}>Płatność za Badanie realizowana jest z góry, przed pobraniem materiału, za pośrednictwem systemu płatności online obsługiwanego przez PayU S.A. z siedzibą w Poznaniu (60-166), przy ul. Grunwaldzkiej 182, wpisaną do rejestru przedsiębiorców prowadzonego przez Sąd Rejonowy Poznań &ndash; Nowe Miasto i Wilda w Poznaniu, VIII Wydział Gospodarczy Krajowego Rejestru Sądowego pod numerem KRS 0000274399, będącą krajową instytucją płatniczą nadzorowaną przez Komisję Nadzoru Finansowego. Dostępne metody płatności: karta płatnicza (Visa, Mastercard), szybki przelew online (BLIK, przelewy bankowe). Szczegółowe zasady realizacji płatności określa regulamin PayU dostępny pod adresem: <a href="https://www.payu.pl" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] hover:underline">www.payu.pl</a>.</P>
            <P n={24}>Operator nie ponosi odpowiedzialności za nieprawidłowości w przetwarzaniu płatności wynikające z błędów dostawcy systemu płatności.</P>
            <P n={25}>Potwierdzenie płatności jest równoznaczne z potwierdzeniem złożenia Zamówienia.</P>
          </Section>

          {/* §6 */}
          <Section id="s6" title="§6. Realizacja Badania">
            <P n={26}>Po złożeniu Zamówienia i dokonaniu płatności Użytkownik zgłasza się do wskazanej Placówki referencyjnej na pobranie materiału biologicznego.</P>
            <P n={27}>Przed pobraniem materiału Użytkownik zobowiązany jest:</P>
            <Ul>
              <li>Przebywać na czczo co najmniej 6 godzin przed pobraniem</li>
              <li>Przez 3 dni przed pobraniem nie spożywać ryb morskich, owoców morza ani ryżu (w przypadku badania arsenu)</li>
              <li>Poinformować personel placówki o przyjmowanych suplementach zawierających badane pierwiastki</li>
            </Ul>
            <P n={28}>Niespełnienie wymogów przygotowania do Badania może wpłynąć na wiarygodność wyników. Operator nie ponosi odpowiedzialności za błędne wyniki spowodowane nieprawidłowym przygotowaniem się Użytkownika do Badania.</P>
            <P n={29}>Transport materiału do laboratorium zapewnia Operator we własnym zakresie.</P>
            <P n={30}>Czas realizacji Badania wynosi do 15 dni roboczych od dnia dostarczenia materiału do laboratorium. W przypadku zamówień przekraczających 5 000 w miesiącu czas realizacji może ulec proporcjonalnemu wydłużeniu, o czym Użytkownik zostanie poinformowany e-mailem.</P>
            <P n={31}>Wynik Badania przekazywany jest Użytkownikowi w formie pliku PDF, zabezpieczonego hasłem, na adres e-mail podany przy składaniu Zamówienia.</P>
            <P n={32}>Materiał pobrany od Użytkownika przechowywany jest przez co najmniej 2 miesiące w temperaturze -20°C.</P>
          </Section>

          {/* §7 */}
          <Section id="s7" title="§7. Odstąpienie od umowy i zwroty">
            <P n={33}>Zgodnie z art. 38 pkt 1 ustawy z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014 poz. 827 ze zm.), prawo odstąpienia od umowy zawartej na odległość nie przysługuje Użytkownikowi w odniesieniu do usług w zakresie opieki zdrowotnej, które ze względu na ich charakter nie mogą zostać zwrócone lub uległyby szybkiemu zepsuciu.</P>
            <P n={34}>W szczególności: po dokonaniu pobrania materiału biologicznego i jego wysyłce do laboratorium odstąpienie od umowy nie jest możliwe.</P>
            <P n={35}>Jeżeli Zamówienie nie zostało jeszcze zrealizowane (przed pobraniem materiału), Użytkownik może anulować Zamówienie kontaktując się z Operatorem na adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>. W takim przypadku Operator zwraca pełną kwotę płatności w terminie 14 dni.</P>
          </Section>

          {/* §8 */}
          <Section id="s8" title="§8. Reklamacje">
            <P n={36}>Użytkownik ma prawo złożyć reklamację dotyczącą Badania lub obsługi Zamówienia za pośrednictwem formularza reklamacyjnego dostępnego na stronie Serwisu lub na adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>.</P>
            <P n={37}>Reklamacja powinna zawierać:</P>
            <Ul>
              <li>Imię i nazwisko Użytkownika</li>
              <li>Numer Zamówienia</li>
              <li>Opis problemu i żądanie Użytkownika</li>
            </Ul>
            <P n={38}>Operator rozpatruje reklamację w terminie 14 dni roboczych od jej otrzymania i informuje Użytkownika o sposobie jej rozpatrzenia drogą e-mail.</P>
            <P n={39}>W przypadku uzasadnionej reklamacji dotyczącej wyników Badania, laboratorium dokona korekty lub powtórzy Badanie w terminie do 7 dni roboczych na koszt Operatora.</P>
            <P n={40}>Operator nie ponosi odpowiedzialności za wyniki spowodowane nieprawidłowym przygotowaniem się Użytkownika do Badania lub nieprawidłowym dostarczeniem materiału przez Placówkę referencyjną.</P>
          </Section>

          {/* §9 */}
          <Section id="s9" title="§9. Ochrona danych osobowych (RODO)">
            <P n={41}>Administratorem danych osobowych Użytkowników jest Innowacyjna Medycyna sp. z o.o. z siedzibą w Szczecinie (71-253), ul. Akacjowa 2.</P>
            <P n={42}>Dane osobowe Użytkowników przetwarzane są w następujących celach i na następujących podstawach prawnych:</P>
            <Ul>
              <li>Realizacja Zamówienia i świadczenie usługi Badania &ndash; art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
              <li>Realizacja obowiązków prawnych (m.in. przechowywanie dokumentacji medycznej) &ndash; art. 6 ust. 1 lit. c RODO</li>
              <li>Kontakt w sprawie Zamówienia i obsługa reklamacji &ndash; art. 6 ust. 1 lit. b RODO</li>
              <li>Marketing usług własnych (za zgodą) &ndash; art. 6 ust. 1 lit. a RODO</li>
            </Ul>
            <P n={43}>Dane osobowe przechowywane są przez okres niezbędny do realizacji celów przetwarzania, nie krócej niż 5 lat od realizacji Badania (wymogi przepisów dotyczących dokumentacji medycznej).</P>
            <P n={44}>Użytkownikowi przysługują następujące prawa:</P>
            <Ul>
              <li>Prawo dostępu do swoich danych</li>
              <li>Prawo do sprostowania danych</li>
              <li>Prawo do usunięcia danych (o ile nie jest to sprzeczne z obowiązkami prawnymi)</li>
              <li>Prawo do ograniczenia przetwarzania</li>
              <li>Prawo do przenoszenia danych</li>
              <li>Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa)</li>
            </Ul>
            <P n={45}>Dane osobowe Użytkowników nie są sprzedawane ani udostępniane osobom trzecim, za wyjątkiem podmiotów bezpośrednio uczestniczących w realizacji usługi (Placówka referencyjna, laboratorium) oraz na żądanie uprawnionych organów.</P>
            <P n={46}>W przypadku naruszenia ochrony danych osobowych Operator niezwłocznie powiadomi Użytkownika oraz podejmie działania naprawcze zgodnie z obowiązującymi przepisami.</P>
            <P n={47}>Dane kontaktowe Inspektora Ochrony Danych (jeśli dotyczy) oraz wszelkie pytania dotyczące przetwarzania danych można kierować na adres: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></P>
          </Section>

          {/* §10 */}
          <Section id="s10" title="§10. Polityka plików cookies">
            <P n={48}>Serwis wykorzystuje pliki cookies (ciasteczka) &ndash; małe pliki tekstowe zapisywane na urządzeniu Użytkownika podczas przeglądania Serwisu.</P>
            <P n={49}>Serwis stosuje następujące rodzaje plików cookies:</P>
            <Ul>
              <li><strong>Niezbędne</strong> &ndash; konieczne do prawidłowego działania Serwisu (logowanie, koszyk, sesja)</li>
              <li><strong>Analityczne</strong> &ndash; umożliwiające analizę ruchu i zachowania Użytkowników (m.in. Google Analytics)</li>
              <li><strong>Marketingowe</strong> &ndash; umożliwiające wyświetlanie spersonalizowanych reklam (za zgodą Użytkownika)</li>
            </Ul>
            <P n={50}>Przy pierwszej wizycie w Serwisie Użytkownik jest informowany o stosowaniu cookies i może wyrazić zgodę na poszczególne kategorie lub je odrzucić. Zgoda może być cofnięta w dowolnym momencie poprzez ustawienia przeglądarki lub panel zarządzania cookies dostępny w Serwisie.</P>
            <P n={51}>Pliki cookies niezbędne nie wymagają zgody Użytkownika i są zawsze aktywne.</P>
            <P n={52}>Użytkownik może również samodzielnie zarządzać plikami cookies poprzez ustawienia przeglądarki internetowej. Wyłączenie cookies może utrudnić korzystanie z niektórych funkcji Serwisu.</P>
          </Section>

          {/* §11 */}
          <Section id="s11" title="§11. Odpowiedzialność Operatora">
            <P n={53}>Operator dokłada należytej staranności w świadczeniu usług, zgodnie z zasadami wiedzy medycznej i aktualnymi standardami diagnostycznymi.</P>
            <P n={54}>Operator nie ponosi odpowiedzialności za:</P>
            <Ul>
              <li>Szkody wynikające z nieprawidłowego przygotowania się Użytkownika do Badania</li>
              <li>Nieprawidłowe wyniki spowodowane błędami po stronie Placówki referencyjnej</li>
              <li>Opóźnienia w dostarczeniu materiału spowodowane przez firmę kurierską</li>
              <li>Przerwy techniczne w działaniu Serwisu wynikające z przyczyn niezależnych od Operatora</li>
            </Ul>
            <P n={55}>Badanie jest usługą diagnostyczną. Wyniki nie stanowią diagnozy medycznej. Operator nie ponosi odpowiedzialności za decyzje zdrowotne podjęte przez Użytkownika na podstawie wyników Badania bez konsultacji lekarskiej.</P>
          </Section>

          {/* §12 */}
          <Section id="s12" title="§12. Postanowienia końcowe">
            <P n={56}>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy Kodeksu cywilnego, ustawy o prawach konsumenta oraz inne powszechnie obowiązujące przepisy prawa polskiego.</P>
            <P n={57}>Spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Operatora (Szczecin), z zastrzeżeniem, że dla Użytkowników będących konsumentami właściwym jest sąd wynikający z przepisów Kodeksu postępowania cywilnego.</P>
            <P n={58}>Użytkownik będący konsumentem ma prawo skorzystać z pozasądowych metod rozstrzygania sporów, w szczególności za pośrednictwem platformy ODR (Online Dispute Resolution) dostępnej pod adresem: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] hover:underline">https://ec.europa.eu/consumers/odr</a></P>
            <P n={59}>Operator zastrzega sobie prawo do zmiany Regulaminu. O każdej zmianie Użytkownicy zostaną poinformowani z co najmniej 14-dniowym wyprzedzeniem poprzez komunikat w Serwisie lub wiadomość e-mail. Zmiany nie dotyczą Zamówień złożonych przed datą wejścia zmian w życie.</P>
            <P n={60}>Nieważność lub bezskuteczność któregokolwiek postanowienia Regulaminu nie wpływa na ważność pozostałych postanowień.</P>
            <P n={61}>Regulamin sporządzono w języku polskim. W przypadku sprzeczności wersji językowych, wersja polska ma pierwszeństwo.</P>
          </Section>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-[#EEEFFD] text-center text-[#8a8fa6] text-xs">
            Innowacyjna Medycyna sp. z o.o. &middot; www.onkopierwiastki.pl &middot; <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>
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
            { '@type': 'ListItem', position: 2, name: 'Regulamin', item: `${siteConfig.domain}/regulamin` },
          ],
        }) }}
      />
    </div>
  );
}
