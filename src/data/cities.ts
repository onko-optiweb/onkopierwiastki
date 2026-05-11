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
  faq: { q: string; a: string }[];
  seoText: string;
}

export const cities: CityData[] = [
  {
    slug: 'wroclaw',
    name: 'Wrocław',
    nameLocative: 'we Wrocławiu',
    nameGenitive: 'Wrocławia',
    region: 'Dolny Śląsk',
    metaTitle: 'Badanie onkopierwiastków Wrocław — gdzie się zbadać?',
    metaDescription: 'Onkopakiet we Wrocławiu: cena, przygotowanie do badania, wynik PDF i informacje o placówkach lub pobraniu materiału. Badanie onkopierwiastków Wrocław.',
    heroText: 'Onkopakiet Wrocław — badanie 6 pierwiastków w certyfikowanej placówce',
    introText: 'Wrocław to jedno z miast, w którym możesz wykonać badanie onkopierwiastków w certyfikowanej placówce referencyjnej. Badanie obejmuje oznaczenie 6 pierwiastków śladowych — selenu, cynku, arsenu, miedzi, kadmu i ołowiu — których stężenie we krwi ma udowodniony związek z ryzykiem nowotworów złośliwych.',
    faq: [
      { q: 'Gdzie zrobić onkopakiet we Wrocławiu?', a: 'Onkopakiet we Wrocławiu wykonasz w placówce referencyjnej DOLMED S.A. przy ul. Legnickiej 40. To jedyny certyfikowany punkt pobrań onkopakietu we Wrocławiu, który pobiera materiał zgodnie z protokołem laboratorium Innowacyjna Medycyna.' },
      { q: 'Jaka jest cena onkopakietu we Wrocławiu?', a: 'Cena onkopakietu we Wrocławiu wynosi 200 zł za panel podstawowy (1–3 pierwiastki) lub 230 zł za panel rozszerzony (badanie 6 pierwiastków: Se, Zn, As, Cu, Cd, Pb). Cena obejmuje pobranie krwi, analizę ICP-MS i wynik PDF z zaleceniami.' },
      { q: 'Czy na badanie onkopierwiastków we Wrocławiu potrzebuję skierowania?', a: 'Nie — onkopakiet we Wrocławiu wykonasz bez skierowania lekarskiego. Zamawiasz badanie online na onkopierwiastki.pl i zgłaszasz się do placówki DOLMED we Wrocławiu na pobranie krwi.' },
      { q: 'Jak przygotować się do onkopakietu we Wrocławiu?', a: 'Przed badaniem 6 pierwiastków we Wrocławiu należy być minimum 6 godzin na czczo i przez 3 dni unikać ryb morskich, owoców morza i ryżu (zawyżają arsen). Poinformuj personel placówki we Wrocławiu o suplementach z selenem lub cynkiem.' },
      { q: 'Ile czeka się na wynik onkopakietu zamówionego we Wrocławiu?', a: 'Wynik badania onkopierwiastków zamówionego we Wrocławiu otrzymasz na e-mail w formie PDF w ciągu 15 dni roboczych od dostarczenia próbki do laboratorium.' },
      { q: 'Czym onkopakiet Wrocław różni się od zwykłego badania pierwiastków?', a: 'Standardowe badanie pierwiastków we krwi stosuje uniwersalne normy. Onkopakiet dostępny we Wrocławiu wykorzystuje spersonalizowane zakresy referencyjne opracowane dla polskiej populacji — uwzględniają płeć, wiek, palenie i mutację BRCA1.' },
      { q: 'Czy onkopakiet we Wrocławiu wykrywa raka?', a: 'Nie — onkopakiet nie jest badaniem diagnostycznym nowotworu. Badanie 6 pierwiastków we krwi dostępne we Wrocławiu pokazuje stężenia pierwiastków śladowych i odnosi je do norm. Wynik może być sygnałem do dalszych konsultacji.' },
      { q: 'Czy mogę zamówić onkopakiet online i wykonać go we Wrocławiu?', a: 'Tak. Onkopakiet zamawiasz online na onkopierwiastki.pl, wybierasz placówkę DOLMED we Wrocławiu, płacisz online i umawiasz się na pobranie krwi. Cały proces jest prosty i nie wymaga skierowania.' },
    ],
    seoText: `<h3>Badanie onkopierwiastków we Wrocławiu — innowacyjna profilaktyka nowotworowa</h3>
<p>Wrocław, stolica Dolnego Śląska z populacją przekraczającą 670 tysięcy mieszkańców, jest jednym z miast w Polsce, w którym można wykonać badanie onkopierwiastków w certyfikowanej placówce referencyjnej. Badanie to stanowi nowatorskie podejście do profilaktyki nowotworowej, oparte na ponad dwudziestu latach badań naukowych prowadzonych przez zespół prof. dr. hab. n. med. Jana Lubińskiego z Pomorskiego Uniwersytetu Medycznego w Szczecinie.</p>

<p>Onkopakiet dostępny we Wrocławiu obejmuje oznaczenie stężeń sześciu pierwiastków śladowych we krwi pełnej lub surowicy: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Każdy z tych pierwiastków odgrywa istotną rolę w procesach biologicznych organizmu, a ich nieprawidłowe stężenia — zarówno niedobór, jak i nadmiar — mogą wiązać się ze zwiększonym ryzykiem zachorowania na nowotwory złośliwe.</p>

<h3>Dlaczego warto wykonać badanie onkopierwiastków właśnie we Wrocławiu?</h3>
<p>Mieszkańcy Wrocławia i okolicznych miast Dolnego Śląska — Oleśnicy, Oławy, Trzebnicy, Środy Śląskiej czy Kątów Wrocławskich — mogą skorzystać z badania onkopierwiastków bez konieczności dalekich podróży. Placówka referencyjna DOLMED przy ul. Legnickiej 40 jest doskonale skomunikowana z centrum miasta i oferuje wygodne godziny otwarcia.</p>

<p>Region dolnośląski charakteryzuje się specyficznym profilem środowiskowym — wieloletnia działalność przemysłowa, w tym górnictwo miedzi w Legnicko-Głogowskim Okręgu Miedziowym, może wpływać na ekspozycję mieszkańców na niektóre metale ciężkie. Badanie onkopierwiastków pozwala ocenić, czy te czynniki środowiskowe przełożyły się na stężenia pierwiastków w organizmie.</p>

<h3>Onkopakiet Wrocław — jak przebiega badanie krok po kroku</h3>
<p>Proces wykonania badania onkopierwiastków we Wrocławiu jest prosty i nieinwazyjny. Pierwszy krok to zamówienie badania online na stronie onkopierwiastki.pl — wybierasz panel (podstawowy lub rozszerzony), placówkę DOLMED we Wrocławiu i dokonujesz płatności. Następnie umawiasz się na pobranie krwi w placówce.</p>

<p>Samo pobranie trwa kilka minut — potrzeba zaledwie 0,5 ml krwi pełnej lub surowicy. To mniej niż przy standardowej morfologii. Próbka jest zabezpieczana w specjalnych próbówkach zgodnie z protokołem laboratorium i transportowana do analizy metodą spektrometrii mas (ICP-MS) — najdokładniejszej dostępnej techniki oznaczania pierwiastków śladowych.</p>

<p>Wynik otrzymujesz na e-mail w formie szczegółowego raportu PDF w ciągu 15 dni roboczych. Raport zawiera nie tylko liczbowe stężenia każdego pierwiastka, ale również odniesienie do spersonalizowanych zakresów referencyjnych oraz konkretne zalecenia dietetyczne i suplementacyjne.</p>

<h3>Spersonalizowane zakresy referencyjne — czym różnią się od standardowych norm?</h3>
<p>To kluczowa przewaga badania onkopierwiastków nad standardowymi badaniami laboratoryjnymi. Typowe laboratorium podaje wynik w odniesieniu do uniwersalnych norm — takich samych dla 25-letniej kobiety i 65-letniego palacza. Tymczasem badania zespołu prof. Lubińskiego jednoznacznie wykazały, że optymalne zakresy stężeń pierwiastków różnią się znacząco w zależności od płci, wieku, statusu palenia i nosicielstwa mutacji BRCA1.</p>

<p>Zakresy referencyjne stosowane w badaniu onkopierwiastków zostały opracowane na podstawie wieloletnich badań prospektywnych obejmujących tysiące osób z polskiej populacji. Są chronione ponad dwudziestoma patentami i opisane w ponad trzydziestu publikacjach w recenzowanych czasopismach naukowych (PubMed). To nie są normy z podręcznika — to dane oparte na rzeczywistych obserwacjach polskiej populacji.</p>

<h3>Wyniki badań naukowych — co mówią liczby?</h3>
<p>Badania prowadzone na polskiej populacji wykazały spektakularną zależność między stężeniami pierwiastków a ryzykiem nowotworowym. U niepalących kobiet powyżej 60. roku życia optymalny poziom selenu wiązał się z 4,5-krotnie niższym ryzykiem raka. U palących mężczyzn powyżej 60 lat redukcja ryzyka sięgała nawet 11 razy. Pacjentki z rakiem piersi i niskim selenem miały 25-krotnie wyższe ryzyko zgonu w ciągu 10 lat.</p>

<p>Podobne zależności zaobserwowano dla pozostałych pierwiastków — cynku, arsenu, miedzi, kadmu i ołowiu. Dlatego badanie obejmuje wszystkie sześć jednocześnie — tylko pełny profil pozwala na rzetelną ocenę ryzyka nowotworowego.</p>

<h3>Gdzie przebadać się na onkopierwiastki we Wrocławiu — praktyczne informacje</h3>
<p>Jedyną certyfikowaną placówką referencyjną we Wrocławiu jest Dolnośląskie Centrum Medyczne DOLMED S.A. przy ul. Legnickiej 40. Placówka jest czynna od poniedziałku do czwartku w godzinach 6:30–18:00. Dojazd komunikacją miejską jest wygodny — w pobliżu znajdują się przystanki tramwajowe i autobusowe.</p>

<p>Warto pamiętać, że badanie onkopierwiastków wymaga specjalnych próbówek i ścisłej procedury pobrania. Tylko w certyfikowanych placówkach referencyjnych masz pewność, że materiał zostanie pobrany i zabezpieczony prawidłowo. Standardowe laboratoria i punkty pobrań nie dysponują odpowiednim wyposażeniem do tego badania.</p>

<p>Alternatywnie, jeśli placówka we Wrocławiu jest dla Ciebie niedogodna, możesz zamówić badanie online z dostawą zestawu pobraniowego kurierem. Szczegóły znajdziesz na stronie zamówienia.</p>

<h3>Badanie onkopierwiastków Wrocław — podsumowanie</h3>
<p>Mieszkańcy Wrocławia i Dolnego Śląska mają dostęp do innowacyjnego badania profilaktycznego, które na podstawie jednego pobrania krwi dostarcza informacji o stężeniach sześciu kluczowych pierwiastków śladowych. Wynik z indywidualnymi zaleceniami, oparty na spersonalizowanych normach dla polskiej populacji, może stanowić istotny element świadomej profilaktyki nowotworowej. Badanie jest dostępne bez skierowania, a cały proces — od zamówienia po odbiór wyniku — jest prosty i nieinwazyjny.</p>`,
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
