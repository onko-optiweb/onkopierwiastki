import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin serwisu | Onkopierwiastki.pl',
  description: 'Regulamin serwisu internetowego onkopierwiastki.pl — zasady składania zamówień, płatności, realizacji badań i ochrony danych osobowych.',
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
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-[#122056] mb-2">
            Regulamin serwisu internetowego
          </h1>
          <p className="text-[#8a8fa6] text-sm">
            www.onkopierwiastki.pl &middot; wersja 1.0, obowiazuje od dnia 1 maja 2026 r.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8">

          {/* §1 */}
          <Section id="s1" title="&sect;1. Postanowienia ogolne">
            <P n={1}>Niniejszy Regulamin okresla zasady korzystania z serwisu internetowego dostepnego pod adresem www.onkopierwiastki.pl (dalej: &bdquo;Serwis&rdquo;), w tym zasady skladania zamowien, swiadczenia uslug oraz ochrone danych osobowych uzytkownikow.</P>
            <P n={2}>Operatorem Serwisu i podmiotem swiadczacym uslugi jest Innowacyjna Medycyna sp. z o.o.</P>
            <Ul>
              <li>Siedziba: 71-253 Szczecin, ul. Akacjowa 2</li>
              <li>NIP: 8522608584, REGON: 321548146</li>
              <li>Adres korespondencyjny laboratorium: Grzepnica, ul. Alabastrowa 8, 72-003 Dobra</li>
              <li>Adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></li>
            </Ul>
            <P n={3}>Korzystanie z Serwisu oznacza akceptacje niniejszego Regulaminu. Przed zlozeniem zamowienia Uzytkownik zobowiazany jest zapoznac sie z jego trescia.</P>
            <P n={4}>Z uslug Serwisu moga korzystac wylacznie osoby pelnoletnie, ktore ukonczyly 18 rok zycia.</P>
            <P n={5}>Regulamin jest udostepniony nieodplatnie na stronie Serwisu w formie umozliwiajacej jego pobranie, utrwalenie i wydrukowanie.</P>
          </Section>

          {/* §2 */}
          <Section id="s2" title="&sect;2. Definicje">
            <P n={6}><strong>Uzytkownik</strong> &ndash; pelnoletnia osoba fizyczna korzystajaca z Serwisu w celu zlozenia zamowienia na badanie.</P>
            <P n={7}><strong>Badanie</strong> &ndash; usluga diagnostyczna polegajaca na oznaczeniu stezen pierwiastkow (onkopierwiastkow) we krwi pelnej lub surowicy, realizowana przez laboratorium Innowacyjna Medycyna sp. z o.o.</P>
            <P n={8}><strong>Zamowienie</strong> &ndash; oswiadczenie woli Uzytkownika zlozone za posrednictwem Serwisu, zmierzajace do zawarcia umowy o wykonanie Badania.</P>
            <P n={9}><strong>Placowka referencyjna</strong> &ndash; punkt pobrania materialu biologicznego wspolpracujacy z Operatorem, wskazany Uzytkownikowi po zlozeniu Zamowienia.</P>
            <P n={10}><strong>Wynik</strong> &ndash; raport PDF zawierajacy wyniki Badania, przekazywany Uzytkownikowi droga elektroniczna.</P>
            <P n={11}><strong>Panel badawczy</strong> &ndash; zestaw pierwiastkow objetych danym Badaniem, zgodny z oferta przedstawiona w Serwisie.</P>
          </Section>

          {/* §3 */}
          <Section id="s3" title="&sect;3. Przedmiot uslugi">
            <P n={12}>Za posrednictwem Serwisu Uzytkownik moze zamowic badanie oznaczenia stezen onkopierwiastkow we krwi lub surowicy, realizowane przez laboratorium Innowacyjna Medycyna sp. z o.o.</P>
            <P n={13}>Oferta Serwisu obejmuje nastepujace panele badawcze:</P>
            <Ul>
              <li>Onkopakiet do 3 wybranych pierwiastkow we krwi pelnej (As, Zn, Cd, Pb, Se, Cu)</li>
              <li>Onkopakiet do 6 wybranych pierwiastkow we krwi pelnej (As, Zn, Cd, Pb, Se, Cu)</li>
              <li>Onkopakiet do 3 wybranych pierwiastkow w surowicy (As, Zn, Se, Mn, Cu)</li>
              <li>Onkopakiet do 5 wybranych pierwiastkow w surowicy (As, Zn, Se, Mn, Cu)</li>
            </Ul>
            <P n={14}>Wyniki Badan opracowywane sa w oparciu o zakresy referencyjne ustalone wylacznie dla populacji polskiej, opracowane przez Miedzynarodowe Centrum Nowotworow Dziedzicznych Pomorskiego Uniwersytetu Medycznego w Szczecinie i chronione patentami Urzedu Patentowego Rzeczypospolitej Polskiej.</P>
            <P n={15}>Badanie nie stanowi diagnozy medycznej i nie zastepuje konsultacji lekarskiej. Wyniki nalezy omawiac z lekarzem.</P>
            <P n={16}>Serwis nie wymaga skierowania lekarskiego do zlozenia Zamowienia.</P>
          </Section>

          {/* §4 */}
          <Section id="s4" title="&sect;4. Skladanie zamowien i zawarcie umowy">
            <P n={17}>Zamowienie sklada sie poprzez wypelnienie formularza dostepnego w Serwisie, wybor panelu badawczego oraz dokonanie platnosci.</P>
            <P n={18}>Warunkiem zlozenia Zamowienia jest:</P>
            <Ul>
              <li>Podanie prawdziwych danych osobowych (imie, nazwisko, PESEL, adres e-mail, nr telefonu)</li>
              <li>Wybor panelu badawczego</li>
              <li>Zaakceptowanie niniejszego Regulaminu</li>
              <li>Dokonanie platnosci</li>
            </Ul>
            <P n={19}>Umowa o wykonanie Badania zostaje zawarta z chwila potwierdzenia przez Operatora przyjecia Zamowienia droga e-mail.</P>
            <P n={20}>Po zlozeniu Zamowienia Uzytkownik otrzymuje informacje o wskazanej Placowce referencyjnej, w ktorej powinien sie zglosic na pobranie materialu.</P>
            <P n={21}>Zamowienia realizowane sa w dniach roboczych od poniedzialku do czwartku. Pobrania dokonane w piatek lub w swieta beda wysylane w nastepnym dostepnym dniu roboczym.</P>
          </Section>

          {/* §5 */}
          <Section id="s5" title="&sect;5. Ceny i platnosci">
            <P n={22}>Ceny Badan podane sa w Serwisie i wyrazone sa w zlotych polskich. Badania diagnostyczne sa zwolnione z podatku VAT na podstawie art. 43 ust. 1 pkt 18 ustawy o podatku od towarow i uslug.</P>
            <P n={23}>Platnosc za Badanie realizowana jest z gory, przed pobraniem materialu, za posrednictwem systemu platnosci online (karta platnicza, przelew online).</P>
            <P n={24}>Operator nie ponosi odpowiedzialnosci za nieprawidlowosci w przetwarzaniu platnosci wynikajace z bledow dostawcy systemu platnosci.</P>
            <P n={25}>Potwierdzenie platnosci jest rownoznaczne z potwierdzeniem zlozenia Zamowienia.</P>
          </Section>

          {/* §6 */}
          <Section id="s6" title="&sect;6. Realizacja Badania">
            <P n={26}>Po zlozeniu Zamowienia i dokonaniu platnosci Uzytkownik zglasza sie do wskazanej Placowki referencyjnej na pobranie materialu biologicznego.</P>
            <P n={27}>Przed pobraniem materialu Uzytkownik zobowiazany jest:</P>
            <Ul>
              <li>Przebywac na czczo co najmniej 6 godzin przed pobraniem</li>
              <li>Przez 3 dni przed pobraniem nie spozywac ryb morskich, owocow morza ani ryzu (w przypadku badania arsenu)</li>
              <li>Poinformowac personel placowki o przyjmowanych suplementach zawierajacych badane pierwiastki</li>
            </Ul>
            <P n={28}>Niespelnienie wymogow przygotowania do Badania moze wplynac na wiarygodnosc wynikow. Operator nie ponosi odpowiedzialnosci za bledne wyniki spowodowane nieprawidlowym przygotowaniem sie Uzytkownika do Badania.</P>
            <P n={29}>Transport materialu do laboratorium zapewnia Operator we wlasnym zakresie.</P>
            <P n={30}>Czas realizacji Badania wynosi do 15 dni roboczych od dnia dostarczenia materialu do laboratorium. W przypadku zamowien przekraczajacych 5 000 w miesiacu czas realizacji moze ulec proporcjonalnemu wydluzeniu, o czym Uzytkownik zostanie poinformowany e-mailem.</P>
            <P n={31}>Wynik Badania przekazywany jest Uzytkownikowi w formie pliku PDF, zabezpieczonego haslem, na adres e-mail podany przy skladaniu Zamowienia.</P>
            <P n={32}>Material pobrany od Uzytkownika przechowywany jest przez co najmniej 2 miesiace w temperaturze -20&deg;C.</P>
          </Section>

          {/* §7 */}
          <Section id="s7" title="&sect;7. Odstapienie od umowy i zwroty">
            <P n={33}>Zgodnie z art. 38 pkt 1 ustawy z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014 poz. 827 ze zm.), prawo odstapienia od umowy zawartej na odleglosc nie przysluguje Uzytkownikowi w odniesieniu do uslug w zakresie opieki zdrowotnej, ktore ze wzgledu na ich charakter nie moga zostac zwrocone lub uleglby szybkiemu zepsuciu.</P>
            <P n={34}>W szczegolnosci: po dokonaniu pobrania materialu biologicznego i jego wysylce do laboratorium odstapienie od umowy nie jest mozliwe.</P>
            <P n={35}>Jezeli Zamowienie nie zostalo jeszcze zrealizowane (przed pobraniem materialu), Uzytkownik moze anulowac Zamowienie kontaktujac sie z Operatorem na adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>. W takim przypadku Operator zwraca pelna kwote platnosci w terminie 14 dni.</P>
          </Section>

          {/* §8 */}
          <Section id="s8" title="&sect;8. Reklamacje">
            <P n={36}>Uzytkownik ma prawo zlozyc reklamacje dotyczaca Badania lub obslugi Zamowienia za posrednictwem formularza reklamacyjnego dostepnego na stronie Serwisu lub na adres e-mail: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>.</P>
            <P n={37}>Reklamacja powinna zawierac:</P>
            <Ul>
              <li>Imie i nazwisko Uzytkownika</li>
              <li>Numer Zamowienia</li>
              <li>Opis problemu i zadanie Uzytkownika</li>
            </Ul>
            <P n={38}>Operator rozpatruje reklamacje w terminie 14 dni roboczych od jej otrzymania i informuje Uzytkownika o sposobie jej rozpatrzenia droga e-mail.</P>
            <P n={39}>W przypadku uzasadnionej reklamacji dotyczacej wynikow Badania, laboratorium dokona korekty lub powtorzy Badanie w terminie do 7 dni roboczych na koszt Operatora.</P>
            <P n={40}>Operator nie ponosi odpowiedzialnosci za wyniki spowodowane nieprawidlowym przygotowaniem sie Uzytkownika do Badania lub nieprawidlowym dostarczeniem materialu przez Placowke referencyjna.</P>
          </Section>

          {/* §9 */}
          <Section id="s9" title="&sect;9. Ochrona danych osobowych (RODO)">
            <P n={41}>Administratorem danych osobowych Uzytkownikow jest Innowacyjna Medycyna sp. z o.o. z siedziba w Szczecinie (71-253), ul. Akacjowa 2.</P>
            <P n={42}>Dane osobowe Uzytkownikow przetwarzane sa w nastepujacych celach i na nastepujacych podstawach prawnych:</P>
            <Ul>
              <li>Realizacja Zamowienia i swiadczenie uslugi Badania &ndash; art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
              <li>Realizacja obowiazkow prawnych (m.in. przechowywanie dokumentacji medycznej) &ndash; art. 6 ust. 1 lit. c RODO</li>
              <li>Kontakt w sprawie Zamowienia i obsluga reklamacji &ndash; art. 6 ust. 1 lit. b RODO</li>
              <li>Marketing uslug wlasnych (za zgoda) &ndash; art. 6 ust. 1 lit. a RODO</li>
            </Ul>
            <P n={43}>Dane osobowe przechowywane sa przez okres niezbedny do realizacji celow przetwarzania, nie krocej niz 5 lat od realizacji Badania (wymogi przepisow dotyczacych dokumentacji medycznej).</P>
            <P n={44}>Uzytkownikowi przysluguja nastepujace prawa:</P>
            <Ul>
              <li>Prawo dostepu do swoich danych</li>
              <li>Prawo do sprostowania danych</li>
              <li>Prawo do usuniecia danych (o ile nie jest to sprzeczne z obowiazkami prawnymi)</li>
              <li>Prawo do ograniczenia przetwarzania</li>
              <li>Prawo do przenoszenia danych</li>
              <li>Prawo do wniesienia skargi do Prezesa Urzedu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa)</li>
            </Ul>
            <P n={45}>Dane osobowe Uzytkownikow nie sa sprzedawane ani udostepniane osobom trzecim, za wyjatkiem podmiotow bezposrednio uczestniczacych w realizacji uslugi (Placowka referencyjna, laboratorium) oraz na zadanie uprawnionych organow.</P>
            <P n={46}>W przypadku naruszenia ochrony danych osobowych Operator niezwlocznie powiadomi Uzytkownika oraz podejmie dzialania naprawcze zgodnie z obowiazujacymi przepisami.</P>
            <P n={47}>Dane kontaktowe Inspektora Ochrony Danych (jesli dotyczy) oraz wszelkie pytania dotyczace przetwarzania danych mozna kierowac na adres: <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a></P>
          </Section>

          {/* §10 */}
          <Section id="s10" title="&sect;10. Polityka plikow cookies">
            <P n={48}>Serwis wykorzystuje pliki cookies (ciasteczka) &ndash; male pliki tekstowe zapisywane na urzadzeniu Uzytkownika podczas przegladania Serwisu.</P>
            <P n={49}>Serwis stosuje nastepujace rodzaje plikow cookies:</P>
            <Ul>
              <li><strong>Niezbedne</strong> &ndash; konieczne do prawidlowego dzialania Serwisu (logowanie, koszyk, sesja)</li>
              <li><strong>Analityczne</strong> &ndash; umozliwiajace analize ruchu i zachowania Uzytkownikow (m.in. Google Analytics)</li>
              <li><strong>Marketingowe</strong> &ndash; umozliwiajace wyswietlanie spersonalizowanych reklam (za zgoda Uzytkownika)</li>
            </Ul>
            <P n={50}>Przy pierwszej wizycie w Serwisie Uzytkownik jest informowany o stosowaniu cookies i moze wyrazic zgode na poszczegolne kategorie lub je odrzucic. Zgoda moze byc cofnieta w dowolnym momencie poprzez ustawienia przegladarki lub panel zarzadzania cookies dostepny w Serwisie.</P>
            <P n={51}>Pliki cookies niezbedne nie wymagaja zgody Uzytkownika i sa zawsze aktywne.</P>
            <P n={52}>Uzytkownik moze rowniez samodzielnie zarzadzac plikami cookies poprzez ustawienia przegladarki internetowej. Wylaczenie cookies moze utrudnic korzystanie z niektorych funkcji Serwisu.</P>
          </Section>

          {/* §11 */}
          <Section id="s11" title="&sect;11. Odpowiedzialnosc Operatora">
            <P n={53}>Operator doklada nalezytej starannosci w swiadczeniu uslug, zgodnie z zasadami wiedzy medycznej i aktualnymi standardami diagnostycznymi.</P>
            <P n={54}>Operator nie ponosi odpowiedzialnosci za:</P>
            <Ul>
              <li>Szkody wynikajace z nieprawidlowego przygotowania sie Uzytkownika do Badania</li>
              <li>Nieprawidlowe wyniki spowodowane bledami po stronie Placowki referencyjnej</li>
              <li>Opoznienia w dostarczeniu materialu spowodowane przez firme kurierska</li>
              <li>Przerwy techniczne w dzialaniu Serwisu wynikajace z przyczyn niezaleznych od Operatora</li>
            </Ul>
            <P n={55}>Badanie jest usluga diagnostyczna. Wyniki nie stanowia diagnozy medycznej. Operator nie ponosi odpowiedzialnosci za decyzje zdrowotne podjete przez Uzytkownika na podstawie wynikow Badania bez konsultacji lekarskiej.</P>
          </Section>

          {/* §12 */}
          <Section id="s12" title="&sect;12. Postanowienia koncowe">
            <P n={56}>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie maja przepisy Kodeksu cywilnego, ustawy o prawach konsumenta oraz inne powszechnie obowiazujace przepisy prawa polskiego.</P>
            <P n={57}>Spory wynikajace z korzystania z Serwisu beda rozstrzygane przez sad wlasciwy dla siedziby Operatora (Szczecin), z zastrzezeniem, ze dla Uzytkownikow bedacych konsumentami wlasciwym jest sad wynikajacy z przepisow Kodeksu postepowania cywilnego.</P>
            <P n={58}>Uzytkownik bedacy konsumentem ma prawo skorzystac z pozasadowych metod rozstrzygania sporow, w szczegolnosci za posrednictwem platformy ODR (Online Dispute Resolution).</P>
            <P n={59}>Operator zastrzega sobie prawo do zmiany Regulaminu. O kazdej zmianie Uzytkownicy zostana poinformowani z co najmniej 14-dniowym wyprzedzeniem poprzez komunikat w Serwisie lub wiadomosc e-mail. Zmiany nie dotycza Zamowien zlozonych przed data wejscia zmian w zycie.</P>
            <P n={60}>Niewaznosc lub bezskutecznosc ktoregokolwiek postanowienia Regulaminu nie wplywa na waznosc pozostalych postanowien.</P>
            <P n={61}>Regulamin sporzadzono w jezyku polskim. W przypadku sprzecznosci wersji jezykowych, wersja polska ma pierwszenstwo.</P>
          </Section>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-[#EEEFFD] text-center text-[#8a8fa6] text-xs">
            Innowacyjna Medycyna sp. z o.o. &middot; www.onkopierwiastki.pl &middot; <a href="mailto:kontakt@onkopierwiastki.pl" className="text-[#5B65DC] hover:underline">kontakt@onkopierwiastki.pl</a>
          </div>

        </div>
      </main>
    </div>
  );
}
