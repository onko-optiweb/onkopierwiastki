export interface CityData {
  slug: string;
  name: string;
  nameLocative: string;
  nameGenitive: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroText: string;
  introText: string;
  /** 2-3 sentences unique to this city/facility */
  facilityDescription: string;
  /** City-specific FAQ (2+ questions unique to city) */
  cityFaq: { q: string; a: string }[];
  seoText: string;
}

/** Standard FAQ — same on every city page */
export const standardFaq: { q: string; a: string }[] = [
  {
    q: 'Czy na badanie onkopierwiastków potrzebuję skierowania?',
    a: 'Nie — badanie onkopierwiastków zamawiasz online bez skierowania lekarskiego. Po złożeniu zamówienia na onkopierwiastki.pl zgłaszasz się do wybranej certyfikowanej placówki na pobranie krwi. Nie musisz konsultować się wcześniej z lekarzem, choć wynik warto omówić ze specjalistą.',
  },
  {
    q: 'Ile czeka się na wynik badania onkopierwiastków?',
    a: 'Wynik otrzymasz na e-mail w formie szczegółowego raportu PDF w ciągu 15 dni roboczych od dostarczenia próbki do laboratorium. Raport zawiera stężenia 6 pierwiastków, odniesienie do spersonalizowanych norm oraz indywidualne zalecenia dietetyczne i suplementacyjne.',
  },
];

export const cities: CityData[] = [
  {
    slug: 'wroclaw',
    name: 'Wrocław',
    nameLocative: 'we Wrocławiu',
    nameGenitive: 'Wrocławia',
    region: 'Dolny Śląsk',
    metaTitle: 'Badanie onkopierwiastków Wrocław | Onkopierwiastki Wrocław | Onkopierwiastki.pl',
    metaDescription: 'Badanie onkopierwiastków we Wrocławiu: cena, przygotowanie, wynik PDF i informacje o placówkach. Onkopierwiastki Wrocław.',
    heroText: 'Onkopierwiastki Wrocław — badanie 6 pierwiastków w certyfikowanych placówkach.',
    introText: 'Wrocław to jedno z miast, w którym możesz wykonać badanie onkopierwiastków w certyfikowanej placówce. Badanie obejmuje oznaczenie 6 pierwiastków śladowych — selenu, cynku, arsenu, miedzi, kadmu i ołowiu — których stężenie we krwi ma udowodniony związek z ryzykiem nowotworów złośliwych.',
    facilityDescription: 'Placówka DOLMED przy ul. Legnickiej 40 we Wrocławiu jest doskonale skomunikowana z centrum miasta — dojedziesz tramwajem lub autobusem. Placówka pobiera krew pełną zgodnie z protokołem laboratorium Innowacyjna Medycyna. Region dolnośląski charakteryzuje się specyficznym profilem środowiskowym — wieloletnia działalność przemysłowa, w tym górnictwo miedzi w Legnicko-Głogowskim Okręgu Miedziowym, może wpływać na ekspozycję mieszkańców na metale ciężkie.',
    cityFaq: [
      { q: 'Gdzie zrobić badanie onkopierwiastków we Wrocławiu?', a: 'Badanie onkopierwiastków możesz wykonać we Wrocławiu w certyfikowanych placówkach widocznych wyżej na tej stronie. Każda z nich pobiera krew pełną zgodnie z protokołem laboratorium Innowacyjna Medycyna — tylko w takich miejscach masz pewność wiarygodności wyniku.' },
      { q: 'Jaka jest cena badania onkopierwiastków we Wrocławiu?', a: 'Cena badania onkopierwiastków we Wrocławiu wynosi 200 zł za panel podstawowy (1–3 pierwiastki) lub 230 zł za panel rozszerzony (badanie 6 pierwiastków: Se, Zn, As, Cu, Cd, Pb). Cena obejmuje pobranie krwi, analizę ICP-MS i wynik PDF z zaleceniami.' },
      { q: 'Czy w placówkach we Wrocławiu jest parking?', a: 'Informacje o parkingu i dojazd znajdziesz przy każdej placówce na tej stronie. Wszystkie certyfikowane punkty pobrań we Wrocławiu są dobrze skomunikowane komunikacją miejską.' },
      { q: 'Czy badanie onkopierwiastków we Wrocławiu mogę wykonać w sobotę?', a: 'Certyfikowane placówki we Wrocławiu działają co do zasady w dni robocze. Aktualne godziny otwarcia sprawdzisz dzwoniąc pod numer telefonu podany przy danej placówce na tej stronie.' },
    ],
    seoText: `<h3>Badanie onkopierwiastków we Wrocławiu — innowacyjna profilaktyka nowotworowa</h3>
<p>Wrocław, stolica Dolnego Śląska z populacją przekraczającą 670 tysięcy mieszkańców, jest jednym z miast w Polsce, w którym można wykonać <strong>badanie onkopierwiastków</strong> w certyfikowanej placówce. <strong>Badanie onkopierwiastków Wrocław</strong> stanowi nowatorskie podejście do profilaktyki nowotworowej, oparte na ponad dwudziestu latach badań naukowych prowadzonych przez zespół prof. dr. hab. n. med. Jana Lubińskiego z Pomorskiego Uniwersytetu Medycznego w Szczecinie.</p>

<p><strong>Badanie onkopierwiastków</strong> dostępne we Wrocławiu obejmuje oznaczenie stężeń sześciu pierwiastków śladowych we krwi pełnej: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Każdy z tych pierwiastków odgrywa istotną rolę w procesach biologicznych organizmu, a ich nieprawidłowe stężenia — zarówno niedobór, jak i nadmiar — mogą wiązać się ze zwiększonym ryzykiem zachorowania na nowotwory złośliwe.</p>

<h3>Dlaczego warto wykonać badanie onkopierwiastków właśnie we Wrocławiu?</h3>
<p>Mieszkańcy Wrocławia i okolicznych miast Dolnego Śląska — Oleśnicy, Oławy, Trzebnicy, Środy Śląskiej czy Kątów Wrocławskich — mogą skorzystać z <strong>badania onkopierwiastków we Wrocławiu</strong> bez konieczności dalekich podróży. Certyfikowane <strong>placówki we Wrocławiu</strong> — DOLMED i Centrum Medyczne Polmed — są doskonale skomunikowane z centrum miasta.</p>

<p>Region dolnośląski charakteryzuje się specyficznym profilem środowiskowym — wieloletnia działalność przemysłowa, w tym górnictwo miedzi w Legnicko-Głogowskim Okręgu Miedziowym, może wpływać na ekspozycję mieszkańców na niektóre metale ciężkie. <strong>Badanie pierwiastków we krwi Wrocław</strong> pozwala ocenić, czy te czynniki środowiskowe przełożyły się na stężenia pierwiastków w organizmie.</p>

<h3>Badanie onkopierwiastków Wrocław — jak przebiega krok po kroku</h3>
<p>Proces wykonania <strong>badania onkopierwiastków we Wrocławiu</strong> jest prosty i nieinwazyjny. Pierwszy krok to zamówienie badania online na stronie onkopierwiastki.pl — wybierasz panel, placówkę we Wrocławiu i dokonujesz płatności. Następnie zgłaszasz się na pobranie krwi w wybranej certyfikowanej placówce.</p>

<p>Samo pobranie trwa kilka minut — potrzeba zaledwie 0,5 ml krwi pełnej. To mniej niż przy standardowej morfologii. Próbka jest zabezpieczana w specjalnych próbówkach zgodnie z protokołem laboratorium i transportowana do analizy metodą spektrometrii mas (ICP-MS) — najdokładniejszej dostępnej techniki oznaczania pierwiastków śladowych.</p>

<p>Wynik <strong>badania onkopierwiastków</strong> otrzymujesz na e-mail w formie szczegółowego raportu PDF w ciągu 15 dni roboczych. Raport zawiera nie tylko liczbowe stężenia każdego pierwiastka, ale również odniesienie do spersonalizowanych zakresów referencyjnych oraz konkretne zalecenia dietetyczne i suplementacyjne.</p>

<h3>Spersonalizowane zakresy referencyjne — czym różnią się od standardowych norm?</h3>
<p>To kluczowa przewaga <strong>badania onkopierwiastków</strong> nad standardowymi badaniami laboratoryjnymi. Typowe laboratorium podaje wynik w odniesieniu do uniwersalnych norm — takich samych dla 25-letniej kobiety i 65-letniego palacza. Tymczasem badania zespołu prof. Lubińskiego jednoznacznie wykazały, że optymalne zakresy stężeń pierwiastków różnią się znacząco w zależności od płci, wieku, statusu palenia i nosicielstwa mutacji BRCA1.</p>

<p>Zakresy referencyjne stosowane w <strong>badaniu onkopierwiastków</strong> zostały opracowane na podstawie wieloletnich badań prospektywnych obejmujących tysiące osób z polskiej populacji. Są chronione ponad dwudziestoma patentami i opisane w ponad trzydziestu publikacjach w recenzowanych czasopismach naukowych (PubMed). To nie są normy z podręcznika — to dane oparte na rzeczywistych obserwacjach polskiej populacji.</p>

<h3>Wyniki badań naukowych — co mówią liczby?</h3>
<p>Badania prowadzone na polskiej populacji wykazały spektakularną zależność między stężeniami pierwiastków a ryzykiem nowotworowym. U niepalących kobiet powyżej 60. roku życia optymalny poziom selenu wiązał się z 4,5-krotnie niższym ryzykiem raka. U palących mężczyzn powyżej 60 lat redukcja ryzyka sięgała nawet 11 razy. Pacjentki z rakiem piersi i niskim selenem miały 25-krotnie wyższe ryzyko zgonu w ciągu 10 lat.</p>

<p>Podobne zależności zaobserwowano dla pozostałych pierwiastków — cynku, arsenu, miedzi, kadmu i ołowiu. Dlatego <strong>badanie onkopierwiastków</strong> obejmuje wszystkie sześć jednocześnie — tylko pełny profil <strong>badania pierwiastków we krwi</strong> pozwala na rzetelną ocenę ryzyka nowotworowego.</p>

<h3>Onkopierwiastki Wrocław — gdzie i jak się zbadać?</h3>
<p><strong>Onkopierwiastki Wrocław</strong> to badanie dostępne w certyfikowanych placówkach działających w mieście — aktualna lista widoczna jest na tej stronie. Warto pamiętać, że <strong>badanie onkopierwiastków</strong> wymaga specjalnych próbówek i ścisłej procedury pobrania. Tylko w certyfikowanych punktach pobrań masz pewność, że materiał zostanie pobrany i zabezpieczony prawidłowo — standardowe laboratoria nie dysponują odpowiednim wyposażeniem do tego badania.</p>

<p>Jeśli żadna placówka we Wrocławiu nie jest dla Ciebie dogodna, możesz zamówić <strong>badanie onkopierwiastków</strong> online. Szczegóły znajdziesz na stronie zamówienia.</p>

<h3>Badanie onkopierwiastków Wrocław — podsumowanie</h3>
<p>Mieszkańcy Wrocławia i Dolnego Śląska mają dostęp do innowacyjnego badania profilaktycznego, które na podstawie jednego pobrania krwi dostarcza informacji o stężeniach sześciu kluczowych pierwiastków śladowych. Wynik <strong>badania onkopierwiastków</strong> z indywidualnymi zaleceniami, oparty na spersonalizowanych normach dla polskiej populacji, może stanowić istotny element świadomej profilaktyki nowotworowej. <strong>Badanie onkopierwiastków Wrocław</strong> jest dostępne bez skierowania — zamów online i przyjdź na pobranie.</p>`,
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
