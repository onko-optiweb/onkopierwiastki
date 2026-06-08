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
    q: 'Czy na badanie pierwiastków potrzebuję skierowania?',
    a: 'Nie — badanie pierwiastków zamawiasz online bez skierowania lekarskiego. Po złożeniu zamówienia na badamypierwiastki.pl zgłaszasz się do wybranej certyfikowanej placówki na pobranie krwi. Nie musisz konsultować się wcześniej z lekarzem, choć wynik warto omówić ze specjalistą.',
  },
  {
    q: 'Ile czeka się na wynik badania pierwiastków?',
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
    metaTitle: 'Badanie pierwiastków Wrocław | BadamyPierwiastki.pl (onkopierwiastki Wrocław)',
    metaDescription: 'Badanie pierwiastków we Wrocławiu: cena, przygotowanie, wynik PDF i informacje o placówkach. Badanie znane jako onkopierwiastki lub onkopakiet.',
    heroText: 'Badanie pierwiastków Wrocław — oznaczenie 6 pierwiastków śladowych we krwi w certyfikowanej placówce.',
    introText: 'Wrocław to jedno z miast, w którym możesz wykonać badanie pierwiastków w certyfikowanej placówce. Badanie obejmuje oznaczenie 6 pierwiastków śladowych — selenu, cynku, arsenu, miedzi, kadmu i ołowiu — których stężenie we krwi ma udowodniony związek z ryzykiem nowotworów złośliwych.',
    facilityDescription: 'Placówka DOLMED przy ul. Legnickiej 40 we Wrocławiu jest doskonale skomunikowana z centrum miasta — dojedziesz tramwajem lub autobusem. Placówka pobiera krew pełną zgodnie z protokołem laboratorium Innowacyjna Medycyna. Region dolnośląski charakteryzuje się specyficznym profilem środowiskowym — wieloletnia działalność przemysłowa, w tym górnictwo miedzi w Legnicko-Głogowskim Okręgu Miedziowym, może wpływać na ekspozycję mieszkańców na metale ciężkie.',
    cityFaq: [
      { q: 'Gdzie zrobić badanie pierwiastków we Wrocławiu?', a: 'Badanie pierwiastków możesz wykonać we Wrocławiu w certyfikowanych placówkach widocznych wyżej na tej stronie. Każda z nich pobiera krew pełną zgodnie z protokołem laboratorium Innowacyjna Medycyna — tylko w takich miejscach masz pewność wiarygodności wyniku.' },
      { q: 'Jaka jest cena badania pierwiastków we Wrocławiu?', a: 'Cena badania pierwiastków we Wrocławiu wynosi 200 zł za panel podstawowy (1–3 pierwiastki) lub 230 zł za panel rozszerzony (badanie 6 pierwiastków: Se, Zn, As, Cu, Cd, Pb). Cena obejmuje pobranie krwi, analizę ICP-MS i wynik PDF z zaleceniami.' },
      { q: 'Czy w placówkach we Wrocławiu jest parking?', a: 'Informacje o parkingu i dojazd znajdziesz przy każdej placówce na tej stronie. Wszystkie certyfikowane punkty pobrań we Wrocławiu są dobrze skomunikowane komunikacją miejską.' },
      { q: 'Czy badanie pierwiastków we Wrocławiu mogę wykonać w sobotę?', a: 'Certyfikowane placówki we Wrocławiu działają co do zasady w dni robocze. Aktualne godziny otwarcia sprawdzisz dzwoniąc pod numer telefonu podany przy danej placówce na tej stronie.' },
    ],
    seoText: `<h3>Badanie pierwiastków we Wrocławiu — innowacyjna profilaktyka nowotworowa</h3>
<p>Wrocław, stolica Dolnego Śląska z populacją przekraczającą 670 tysięcy mieszkańców, jest jednym z miast w Polsce, w którym można wykonać <strong>badanie pierwiastków</strong> w certyfikowanej placówce. <strong>Badanie pierwiastków Wrocław</strong> stanowi nowatorskie podejście do profilaktyki nowotworowej, oparte na ponad dwudziestu latach badań naukowych prowadzonych przez zespół prof. dr. hab. n. med. Jana Lubińskiego z Pomorskiego Uniwersytetu Medycznego w Szczecinie.</p>

<p><strong>Badanie pierwiastków</strong> dostępne we Wrocławiu obejmuje oznaczenie stężeń sześciu pierwiastków śladowych we krwi pełnej: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Każdy z tych pierwiastków odgrywa istotną rolę w procesach biologicznych organizmu, a ich nieprawidłowe stężenia — zarówno niedobór, jak i nadmiar — mogą wiązać się ze zwiększonym ryzykiem zachorowania na nowotwory złośliwe.</p>

<h3>Dlaczego warto wykonać badanie pierwiastków właśnie we Wrocławiu?</h3>
<p>Mieszkańcy Wrocławia i okolicznych miast Dolnego Śląska — Oleśnicy, Oławy, Trzebnicy, Środy Śląskiej czy Kątów Wrocławskich — mogą skorzystać z <strong>badania pierwiastków we Wrocławiu</strong> bez konieczności dalekich podróży. Certyfikowane <strong>placówki we Wrocławiu</strong> — DOLMED i Centrum Medyczne Polmed — są doskonale skomunikowane z centrum miasta.</p>

<p>Region dolnośląski charakteryzuje się specyficznym profilem środowiskowym — wieloletnia działalność przemysłowa, w tym górnictwo miedzi w Legnicko-Głogowskim Okręgu Miedziowym, może wpływać na ekspozycję mieszkańców na niektóre metale ciężkie. <strong>Badanie pierwiastków we krwi Wrocław</strong> pozwala ocenić, czy te czynniki środowiskowe przełożyły się na stężenia pierwiastków w organizmie.</p>

<h3>Badanie pierwiastków Wrocław — jak przebiega krok po kroku</h3>
<p>Proces wykonania <strong>badania pierwiastków we Wrocławiu</strong> jest prosty i nieinwazyjny. Pierwszy krok to zamówienie badania online na stronie badamypierwiastki.pl — wybierasz panel, placówkę we Wrocławiu i dokonujesz płatności. Następnie zgłaszasz się na pobranie krwi w wybranej certyfikowanej placówce.</p>

<p>Samo pobranie trwa kilka minut — potrzeba zaledwie 0,5 ml krwi pełnej. To mniej niż przy standardowej morfologii. Próbka jest zabezpieczana w specjalnych próbówkach zgodnie z protokołem laboratorium i transportowana do analizy metodą spektrometrii mas (ICP-MS) — najdokładniejszej dostępnej techniki oznaczania pierwiastków śladowych.</p>

<p>Wynik <strong>badania pierwiastków</strong> otrzymujesz na e-mail w formie szczegółowego raportu PDF w ciągu 15 dni roboczych. Raport zawiera nie tylko liczbowe stężenia każdego pierwiastka, ale również odniesienie do spersonalizowanych zakresów referencyjnych oraz konkretne zalecenia dietetyczne i suplementacyjne.</p>

<h3>Spersonalizowane zakresy referencyjne — czym różnią się od standardowych norm?</h3>
<p>To kluczowa przewaga <strong>badania pierwiastków</strong> nad standardowymi badaniami laboratoryjnymi. Typowe laboratorium podaje wynik w odniesieniu do uniwersalnych norm — takich samych dla 25-letniej kobiety i 65-letniego palacza. Tymczasem badania zespołu prof. Lubińskiego jednoznacznie wykazały, że optymalne zakresy stężeń pierwiastków różnią się znacząco w zależności od płci, wieku, statusu palenia i nosicielstwa mutacji BRCA1.</p>

<p>Zakresy referencyjne stosowane w <strong>badaniu pierwiastków</strong> zostały opracowane na podstawie wieloletnich badań prospektywnych obejmujących tysiące osób z polskiej populacji. Są chronione ponad dwudziestoma patentami i opisane w ponad trzydziestu publikacjach w recenzowanych czasopismach naukowych (PubMed). To nie są normy z podręcznika — to dane oparte na rzeczywistych obserwacjach polskiej populacji.</p>

<h3>Wyniki badań naukowych — co mówią liczby?</h3>
<p>Badania prowadzone na polskiej populacji wykazały spektakularną zależność między stężeniami pierwiastków a ryzykiem nowotworowym. U niepalących kobiet powyżej 60. roku życia optymalny poziom selenu wiązał się z 4,5-krotnie niższym ryzykiem raka. U palących mężczyzn powyżej 60 lat redukcja ryzyka sięgała nawet 11 razy. Pacjentki z rakiem piersi i niskim selenem miały 25-krotnie wyższe ryzyko zgonu w ciągu 10 lat.</p>

<p>Podobne zależności zaobserwowano dla pozostałych pierwiastków — cynku, arsenu, miedzi, kadmu i ołowiu. Dlatego <strong>badanie pierwiastków</strong> obejmuje wszystkie sześć jednocześnie — tylko pełny profil <strong>badania pierwiastków we krwi</strong> pozwala na rzetelną ocenę ryzyka nowotworowego.</p>

<h3>Badanie pierwiastków Wrocław — gdzie i jak się zbadać?</h3>
<p><strong>Badanie pierwiastków Wrocław</strong> to badanie dostępne w certyfikowanych placówkach działających w mieście — aktualna lista widoczna jest na tej stronie. Warto pamiętać, że <strong>badanie pierwiastków</strong> wymaga specjalnych próbówek i ścisłej procedury pobrania. Tylko w certyfikowanych punktach pobrań masz pewność, że materiał zostanie pobrany i zabezpieczony prawidłowo — standardowe laboratoria nie dysponują odpowiednim wyposażeniem do tego badania.</p>

<p>Jeśli żadna placówka we Wrocławiu nie jest dla Ciebie dogodna, możesz zamówić <strong>badanie pierwiastków</strong> online. Szczegóły znajdziesz na stronie zamówienia.</p>

<h3>Badanie pierwiastków Wrocław — podsumowanie</h3>
<p>Mieszkańcy Wrocławia i Dolnego Śląska mają dostęp do innowacyjnego badania profilaktycznego, które na podstawie jednego pobrania krwi dostarcza informacji o stężeniach sześciu kluczowych pierwiastków śladowych. Wynik <strong>badania pierwiastków</strong> z indywidualnymi zaleceniami, oparty na spersonalizowanych normach dla polskiej populacji, może stanowić istotny element świadomej profilaktyki nowotworowej. <strong>Badanie pierwiastków Wrocław</strong> jest dostępne bez skierowania — zamów online i przyjdź na pobranie.</p>`,
  },
  {
    slug: 'poznan',
    name: 'Poznań',
    nameLocative: 'w Poznaniu',
    nameGenitive: 'Poznania',
    region: 'Wielkopolska',
    metaTitle: 'Badanie pierwiastków Poznań | BadamyPierwiastki.pl (onkopierwiastki Poznań)',
    metaDescription: 'Badanie pierwiastków Poznań — sprawdź stężenie 6 pierwiastków śladowych we krwi. Certyfikowane placówki, cena od 200 zł, wynik PDF w 15 dni. Badanie znane jako onkopierwiastki lub onkopakiet.',
    heroText: 'Badanie pierwiastków Poznań — oznaczenie 6 pierwiastków śladowych we krwi w certyfikowanej placówce.',
    introText: 'Poznań to jedno z miast, w którym mieszkańcy Wielkopolski mogą skorzystać z badania pierwiastków. Analiza obejmuje pomiar stężeń selenu, cynku, arsenu, miedzi, kadmu i ołowiu — sześciu pierwiastków, których poziom we krwi według badań naukowych wpływa na ryzyko rozwoju nowotworów złośliwych.',
    facilityDescription: 'Certyfikowane placówki w Poznaniu realizują pobrania krwi pełnej według protokołu laboratorium Innowacyjna Medycyna. Wielkopolska, jako region o intensywnym rolnictwie i przemyśle spożywczym, wiąże się ze specyficznym profilem ekspozycji na pierwiastki śladowe — regularna kontrola ich stężeń we krwi jest szczególnie uzasadniona dla mieszkańców tego regionu.',
    cityFaq: [
      { q: 'Gdzie wykonać badanie pierwiastków w Poznaniu?', a: 'Badanie pierwiastków w Poznaniu dostępne jest w certyfikowanych placówkach wymienionych na tej stronie. Wszystkie punkty pobrań stosują specjalne próbówki i procedury wymagane przez laboratorium Innowacyjna Medycyna — gwarantuje to wiarygodność wyniku.' },
      { q: 'Ile kosztuje badanie pierwiastków w Poznaniu?', a: 'Cena badania pierwiastków w Poznaniu zaczyna się od 200 zł za panel podstawowy (1–3 pierwiastki). Panel rozszerzony obejmujący 6 pierwiastków (Se, Zn, As, Cu, Cd, Pb) kosztuje 230 zł. W cenie: pobranie krwi, analiza metodą ICP-MS oraz szczegółowy raport PDF z zaleceniami.' },
      { q: 'Jak dojechać do placówki badania pierwiastków w Poznaniu?', a: 'Certyfikowane placówki w Poznaniu znajdują się w lokalizacjach z dobrym dostępem komunikacji miejskiej. Dokładne adresy, numery telefonów i godziny otwarcia znajdziesz przy każdej placówce powyżej.' },
      { q: 'Czy w Poznaniu mogę wykonać badanie pierwiastków w weekend?', a: 'Placówki w Poznaniu przyjmują pacjentów głównie w dni robocze. Szczegółowe godziny otwarcia warto potwierdzić telefonicznie pod numerem podanym przy wybranej placówce.' },
    ],
    seoText: `<h3>Badanie pierwiastków w Poznaniu — profilaktyka oparta na nauce</h3>
<p>Poznań, stolica Wielkopolski zamieszkana przez ponad 530 tysięcy osób, oferuje mieszkańcom dostęp do <strong>badania pierwiastków</strong> w certyfikowanych placówkach medycznych. <strong>Badanie pierwiastków Poznań</strong> to nowoczesna forma profilaktyki nowotworowej, bazująca na ponad dwóch dekadach badań prowadzonych pod kierunkiem prof. dr. hab. n. med. Jana Lubińskiego z Pomorskiego Uniwersytetu Medycznego w Szczecinie.</p>

<p>Analiza obejmuje pomiar stężeń sześciu pierwiastków śladowych we krwi pełnej: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Każdy z nich pełni odrębną funkcję biologiczną, a odchylenia od normy — zarówno w górę, jak i w dół — mogą sygnalizować podwyższone ryzyko zachorowania na nowotwory złośliwe.</p>

<h3>Dlaczego mieszkańcy Poznania powinni rozważyć to badanie?</h3>
<p>Wielkopolska wyróżnia się intensywnym rolnictwem i przetwórstwem spożywczym, co wiąże się z określonym profilem ekspozycji środowiskowej na metale ciężkie i mikroelementy. <strong>Badanie pierwiastków w Poznaniu</strong> pozwala sprawdzić, czy codzienne narażenie przełożyło się na stężenia pierwiastków w organizmie. Z certyfikowanych placówek mogą korzystać również mieszkańcy pobliskich miast — Gniezna, Swarzędza, Kórnika, Śremu czy Leszna.</p>

<h3>Przebieg badania pierwiastków w Poznaniu</h3>
<p>Procedura jest szybka i komfortowa. Zamawiasz badanie online na badamypierwiastki.pl, wybierając panel i placówkę w Poznaniu. Następnie umawiasz się na pobranie krwi — wystarczy jedynie 0,5 ml krwi pełnej, pobieranej w specjalnych próbówkach. Próbka trafia do analizy metodą spektrometrii mas z plazmą indukcyjnie sprzężoną (ICP-MS) — najbardziej precyzyjną techniką oznaczania śladowych ilości pierwiastków.</p>

<p>Raport z wynikami dociera na Twój e-mail w ciągu 15 dni roboczych. Poza liczbowymi stężeniami znajdziesz w nim odniesienie do spersonalizowanych norm referencyjnych oraz konkretne wskazówki dotyczące diety i suplementacji.</p>

<h3>Czym normy w badaniu pierwiastków różnią się od laboratoryjnych?</h3>
<p>W typowym laboratorium wynik porównywany jest z jednym, ogólnym zakresem — niezależnie od tego, kim jest pacjent. <strong>Badanie pierwiastków</strong> stosuje inne podejście: normy opracowano na bazie długofalowych obserwacji tysięcy Polaków, z podziałem na grupy według płci, wieku, palenia i statusu mutacji BRCA1. Wyniki tych prac chronią liczne patenty, a ich wiarygodność potwierdzają dziesiątki recenzowanych publikacji naukowych.</p>

<h3>Jakie wyniki przyniosły dotychczasowe badania?</h3>
<p>Wieloletnie obserwacje zespołu ze Szczecina ujawniły silną korelację między pierwiastkami a zachorowalnością na nowotwory. Dla przykładu: kobiety po 60. roku życia, które nie palą i utrzymują prawidłowy selen, chorowały na raka nawet ponad czterokrotnie rzadziej. Wśród palących mężczyzn efekt ochronny odpowiedniego poziomu selenu był jeszcze wyraźniejszy. Z kolei niski selen u pacjentek z rakiem piersi wiązał się z drastycznie gorszym rokowaniem na przestrzeni 10 lat.</p>

<h3>Badanie pierwiastków Poznań — praktyczne informacje</h3>
<p><strong>Badanie pierwiastków w Poznaniu</strong> realizowane jest wyłącznie w certyfikowanych placówkach stosujących specjalne próbówki i ścisły protokół pobrania. Aktualna lista punktów pobrań dostępna jest na górze tej strony. Pamiętaj, że zwykłe laboratoria diagnostyczne nie dysponują wyposażeniem niezbędnym do tego badania — tylko certyfikowane placówki gwarantują prawidłowe pobranie i transport materiału.</p>

<p>Nie musisz mieć skierowania. Zamów <strong>badanie pierwiastków</strong> online, wybierz placówkę w Poznaniu i umów się na pobranie — wynik z indywidualnymi zaleceniami otrzymasz w 15 dni roboczych.</p>`,
  },
  {
    slug: 'warszawa',
    name: 'Warszawa',
    nameLocative: 'w Warszawie',
    nameGenitive: 'Warszawy',
    region: 'Mazowsze',
    metaTitle: 'Badanie pierwiastków Warszawa | BadamyPierwiastki.pl (onkopierwiastki Warszawa)',
    metaDescription: 'Badanie pierwiastków Warszawa — zbadaj 6 pierwiastków śladowych we krwi w certyfikowanych placówkach. Cena od 200 zł, wynik w 15 dni roboczych. Badanie znane jako onkopierwiastki lub onkopakiet.',
    heroText: 'Badanie pierwiastków Warszawa — zbadaj stężenie 6 pierwiastków śladowych w certyfikowanej placówce.',
    introText: 'Warszawa jako największe miasto Polski oferuje najszerszy wybór certyfikowanych placówek do wykonania badania pierwiastków. Badanie mierzy stężenia selenu, cynku, arsenu, miedzi, kadmu i ołowiu — pierwiastków, których poziom we krwi ma naukowo potwierdzony wpływ na ryzyko nowotworów złośliwych.',
    facilityDescription: 'W Warszawie działa kilka certyfikowanych placówek realizujących badanie pierwiastków — zarówno na Śródmieściu, Woli, Pradze, jak i na Mokotowie. Stolica, jako miasto o intensywnym ruchu komunikacyjnym i dużej gęstości zaludnienia, wiąże się z podwyższoną ekspozycją na metale ciężkie obecne w spalinach i pyłach zawieszonych — kontrola ich stężeń we krwi jest szczególnie istotna dla warszawiaków.',
    cityFaq: [
      { q: 'Gdzie wykonać badanie pierwiastków w Warszawie?', a: 'W Warszawie dostępnych jest kilka certyfikowanych placówek — ich pełna lista z adresami i telefonami widoczna jest na tej stronie. Każdy punkt pobrań stosuje dedykowane próbówki i protokół wymagany przez laboratorium Innowacyjna Medycyna.' },
      { q: 'Ile kosztuje badanie pierwiastków w Warszawie?', a: 'Badanie pierwiastków w Warszawie kosztuje od 200 zł (panel podstawowy, 1–3 pierwiastki) do 230 zł (panel rozszerzony — pełne 6 pierwiastków: Se, Zn, As, Cu, Cd, Pb). Cena obejmuje pobranie, analizę ICP-MS i raport PDF z indywidualnymi zaleceniami.' },
      { q: 'Która placówka w Warszawie jest najbliżej centrum?', a: 'Placówki na ul. Grzybowskiej i Twardej znajdują się w ścisłym centrum Warszawy, w pobliżu stacji metra Rondo ONZ i Świętokrzyska. Dokładne lokalizacje i godziny otwarcia znajdziesz powyżej.' },
      { q: 'Czy mogę zrobić badanie pierwiastków w Warszawie bez skierowania?', a: 'Tak — badanie pierwiastków nie wymaga skierowania od lekarza. Zamawiasz je online na badamypierwiastki.pl, a następnie zgłaszasz się do wybranej placówki w Warszawie na pobranie krwi.' },
    ],
    seoText: `<h3>Badanie pierwiastków Warszawa — innowacyjne badanie profilaktyczne w stolicy</h3>
<p><strong>Warszawa</strong>, zamieszkana przez blisko 1,8 miliona osób, dysponuje najgęstszą siecią certyfikowanych placówek do wykonania <strong>badania pierwiastków</strong> w Polsce. <strong>Badanie pierwiastków Warszawa</strong> to szansa na profilaktykę nowotworową opartą na ponad dwudziestu latach pracy naukowej zespołu prof. dr. hab. n. med. Jana Lubińskiego — jednego z dwóch najczęściej cytowanych polskich naukowców medycznych w światowym rankingu Research.com.</p>

<p>W ramach badania oznaczane są stężenia sześciu kluczowych pierwiastków śladowych: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Ich poziom we krwi — jak wykazują publikacje naukowe — może istotnie korelować z ryzykiem zachorowania na nowotwory złośliwe.</p>

<h3>Dlaczego badanie pierwiastków jest szczególnie ważne dla mieszkańców Warszawy?</h3>
<p>Stolica to metropolia o wysokim natężeniu ruchu samochodowego, rozbudowanej infrastrukturze przemysłowej i znacznej gęstości zabudowy. Codzienne narażenie na spaliny, pyły zawieszone PM2.5 i PM10 oraz zanieczyszczenia gleby sprawia, że mieszkańcy Warszawy mogą być bardziej eksponowani na metale ciężkie — zwłaszcza ołów, kadm i arsen. <strong>Badanie pierwiastków w Warszawie</strong> pozwala zweryfikować, czy te czynniki środowiskowe wpłynęły na stężenia pierwiastków w organizmie.</p>

<p>Z warszawskich placówek korzystają również pacjenci z okolicznych miejscowości — Piaseczna, Pruszkowa, Legionowa, Wołomina, Ząbek czy Marek — dzięki doskonałemu połączeniu komunikacją podmiejską i metrem.</p>

<h3>Jak wygląda badanie pierwiastków w Warszawie krok po kroku?</h3>
<p>Cała procedura jest prosta i zajmuje kilka minut. Na początku składasz zamówienie na badamypierwiastki.pl — wybierasz panel badawczy i jedną z warszawskich placówek. Po dokonaniu płatności umawiasz się na wizytę, podczas której personel pobierze 0,5 ml krwi pełnej do specjalnych próbówek. Materiał trafia do laboratorium, gdzie jest analizowany techniką ICP-MS — spektrometrią mas z plazmą indukcyjnie sprzężoną, uznawaną za złoty standard w oznaczaniu pierwiastków śladowych.</p>

<p>W ciągu 15 dni roboczych na Twój e-mail trafia raport PDF. Znajdziesz w nim wyniki liczbowe dla każdego z 6 pierwiastków, porównanie ze spersonalizowanymi normami oraz praktyczne rekomendacje żywieniowe i suplementacyjne.</p>

<h3>Spersonalizowane normy referencyjne — dlaczego to ma znaczenie?</h3>
<p>Większość laboratoriów diagnostycznych stosuje jednakowe zakresy prawidłowe dla wszystkich pacjentów. Tymczasem optymalny poziom selenu czy cynku jest inny dla 30-letniej kobiety, inny dla 65-letniego palacza, a jeszcze inny dla nosicielki mutacji BRCA1. Normy stosowane w <strong>badaniu pierwiastków</strong> uwzględniają te różnice — powstały w wyniku prospektywnych obserwacji obejmujących tysiące uczestników z polskiej populacji, są objęte ochroną patentową i opisane w recenzowanych czasopismach naukowych.</p>

<h3>Wyniki naukowe — konkretne liczby</h3>
<p>Publikacje zespołu prof. Lubińskiego dokumentują wyraźne zależności. Odpowiedni poziom selenu we krwi wiązał się nawet z kilkukrotnie niższym ryzykiem zachorowania na nowotwory złośliwe — szczególnie w grupie osób powyżej 60. roku życia. Wśród pacjentek onkologicznych z niskim selenem odnotowano znacząco gorsze rokowanie. Wyniki dotyczą nie tylko selenu — analogiczne korelacje potwierdzono dla cynku, miedzi, kadmu i pozostałych badanych pierwiastków.</p>

<h3>Badanie pierwiastków Warszawa — placówki i dostępność</h3>
<p><strong>Badanie pierwiastków w Warszawie</strong> można wykonać w kilku certyfikowanych punktach pobrań rozmieszczonych w różnych dzielnicach — od centrum (Grzybowska, Twarda) przez Pragę (Targowa) po Mokotów (Puławska) i Wolę. Pełna lista z adresami, telefonami i godzinami pracy widoczna jest na tej stronie.</p>

<p>Pamiętaj, że <strong>badanie pierwiastków</strong> wymaga specjalnego wyposażenia — dedykowanych próbówek i ścisłej procedury zabezpieczenia materiału. Nie wykonasz go w zwykłym laboratorium diagnostycznym. Tylko certyfikowane placówki dysponują odpowiednim sprzętem i przeszkolonym personelem.</p>

<p>Skierowanie nie jest potrzebne. Zamów <strong>badanie pierwiastków</strong> przez internet, wybierz dogodną placówkę w Warszawie i umów wizytę — spersonalizowany wynik z zaleceniami otrzymasz w ciągu 15 dni roboczych.</p>`,
  },
  {
    slug: 'tarnow',
    name: 'Tarnów',
    nameLocative: 'w Tarnowie',
    nameGenitive: 'Tarnowa',
    region: 'Małopolska',
    metaTitle: 'Badanie pierwiastków Tarnów | BadamyPierwiastki.pl (onkopierwiastki Tarnów)',
    metaDescription: 'Badanie pierwiastków Tarnów — wykonaj badanie 6 pierwiastków śladowych we krwi w certyfikowanej placówce. Od 200 zł, raport PDF w 15 dni. Badanie znane jako onkopierwiastki lub onkopakiet.',
    heroText: 'Badanie pierwiastków Tarnów — kontrola 6 pierwiastków śladowych we krwi w certyfikowanej placówce.',
    introText: 'Tarnów i okolice Małopolski wschodniej zyskały dostęp do badania pierwiastków w certyfikowanej placówce medycznej. Analiza pozwala ocenić stężenia selenu, cynku, arsenu, miedzi, kadmu i ołowiu — sześciu pierwiastków, których wpływ na ryzyko nowotworów złośliwych potwierdzają wieloletnie badania naukowe.',
    facilityDescription: 'Certyfikowana placówka w Tarnowie wykonuje pobrania krwi pełnej z użyciem dedykowanych próbówek, zgodnie z wytycznymi laboratorium Innowacyjna Medycyna. Tarnów i wschodnia Małopolska to region o mieszanym profilu środowiskowym — bliskość Zagłębia Krakowskiego i przemysł chemiczny w Mościcach historycznie wpływały na ekspozycję mieszkańców na wybrane metale ciężkie.',
    cityFaq: [
      { q: 'Gdzie zrobić badanie pierwiastków w Tarnowie?', a: 'Badanie pierwiastków w Tarnowie wykonasz w certyfikowanej placówce widocznej na tej stronie. Punkt pobrań stosuje specjalne próbówki i protokół laboratorium Innowacyjna Medycyna, co gwarantuje wiarygodność wyników.' },
      { q: 'Jaki jest koszt badania pierwiastków w Tarnowie?', a: 'Panel podstawowy (1–3 pierwiastki) kosztuje 200 zł, a panel rozszerzony z pełnym zestawem 6 pierwiastków (Se, Zn, As, Cu, Cd, Pb) — 230 zł. W cenę wliczony jest odbiór materiału, analiza ICP-MS i raport z zaleceniami.' },
      { q: 'Czy na badanie pierwiastków w Tarnowie trzeba się rejestrować?', a: 'Tak — najpierw zamawiasz badanie online na badamypierwiastki.pl, a następnie kontaktujesz się z placówką w Tarnowie telefonicznie, by umówić termin pobrania krwi.' },
      { q: 'Jak daleko od Krakowa jest placówka w Tarnowie?', a: 'Tarnów leży około 80 km na wschód od Krakowa — dojazd zajmuje niespełna godzinę autostradą A4. Placówka stanowi wygodną alternatywę dla mieszkańców wschodniej Małopolski.' },
    ],
    seoText: `<h3>Badanie pierwiastków w Tarnowie — diagnostyka pierwiastkowa w Małopolsce</h3>
<p><strong>Tarnów</strong>, drugie co do wielkości miasto Małopolski z populacją ponad 100 tysięcy mieszkańców, jest jednym z punktów na mapie Polski, w którym można wykonać <strong>badanie pierwiastków</strong>. <strong>Badanie pierwiastków Tarnów</strong> to możliwość skorzystania z zaawansowanej diagnostyki profilaktycznej, której fundamenty tworzono przez ponad dwie dekady w ośrodku naukowym prof. dr. hab. n. med. Jana Lubińskiego przy Pomorskim Uniwersytecie Medycznym w Szczecinie.</p>

<p><strong>Badanie pierwiastków</strong> w tarnowskiej placówce obejmuje analizę sześciu pierwiastków śladowych we krwi pełnej: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Ich stężenia — jak dowodzą publikacje naukowe — mogą stanowić istotny wskaźnik indywidualnego ryzyka nowotworowego.</p>

<h3>Specyfika regionu — dlaczego badanie ma znaczenie dla mieszkańców Tarnowa?</h3>
<p>Tarnów i okolice mają złożoną historię przemysłową. Zakłady chemiczne w Mościcach (dziś dzielnica Tarnowa), wieloletnia działalność zakładów azotowych oraz bliskość Górnośląsko-Zagłębiowskiego Okręgu Przemysłowego kształtowały środowiskowe narażenie na metale ciężkie. <strong>Badanie pierwiastków w Tarnowie</strong> umożliwia sprawdzenie, czy te czynniki odcisnęły ślad na stężeniach pierwiastków w organizmie. Z placówki korzystają również mieszkańcy Bochni, Brzeska, Dębicy, Ropczyc i Wojnicza.</p>

<h3>Jak przebiega badanie pierwiastków w Tarnowie?</h3>
<p>Proces jest nieskomplikowany. Wchodzisz na badamypierwiastki.pl, wybierasz odpowiedni panel badawczy i placówkę w Tarnowie, po czym realizujesz płatność online. Kolejny krok to wizyta w punkcie pobrań — personel pobiera niewielką ilość krwi pełnej (0,5 ml) do specjalnych, certyfikowanych próbówek. Materiał jest następnie transportowany do laboratorium, gdzie poddawany jest analizie ICP-MS — technice pozwalającej wykrywać pierwiastki w stężeniach rzędu części na miliard.</p>

<p>Wynik dociera na podany adres e-mail w formie rozbudowanego raportu PDF. Oprócz wartości liczbowych zawiera on interpretację w odniesieniu do indywidualnych norm referencyjnych oraz wskazówki dotyczące ewentualnych zmian w diecie lub suplementacji.</p>

<h3>Normy dopasowane do pacjenta — co wyróżnia to badanie?</h3>
<p>W odróżnieniu od standardowej diagnostyki laboratoryjnej, gdzie wynik porównywany jest z jednym, uniwersalnym zakresem, <strong>badanie pierwiastków</strong> korzysta z norm stworzonych specjalnie dla polskiej populacji. Zakresy te różnicują się według płci, przedziału wiekowego, statusu palenia tytoniu i obecności mutacji BRCA1. To efekt wieloletnich badań prospektywnych — ich wyniki są chronione patentami i opublikowane w wiodących czasopismach medycznych.</p>

<h3>Dowody naukowe — co wynika z badań?</h3>
<p>Wieloletnie obserwacje prowadzone na polskiej populacji wykazały, że utrzymywanie optymalnych stężeń pierwiastków — w szczególności selenu — może wiązać się z wielokrotnie niższym ryzykiem zachorowania na nowotwory. Zależność ta okazała się szczególnie silna u osób po 60. roku życia, zarówno wśród kobiet niepalących, jak i palących mężczyzn. Analiza obejmująca pacjentki onkologiczne potwierdziła z kolei, że niskie stężenie selenu istotnie pogarsza prognozę przeżycia.</p>

<h3>Badanie pierwiastków Tarnów — informacje praktyczne</h3>
<p><strong>Badanie pierwiastków w Tarnowie</strong> dostępne jest w certyfikowanej placówce wymienionej na tej stronie. Tylko w takim punkcie pobrań masz pewność, że materiał zostanie prawidłowo pobrany i zabezpieczony — standardowe laboratoria nie posiadają odpowiedniego wyposażenia do tego badania.</p>

<p>Zamów <strong>badanie pierwiastków</strong> online bez skierowania. Po złożeniu zamówienia zadzwoń do placówki w Tarnowie i umów termin pobrania — kompletny wynik z indywidualnymi rekomendacjami otrzymasz w ciągu 15 dni roboczych.</p>`,
  },
  {
    slug: 'bielsko-biala',
    name: 'Bielsko-Biała',
    nameLocative: 'w Bielsku-Białej',
    nameGenitive: 'Bielska-Białej',
    region: 'Podbeskidzie',
    metaTitle: 'Badanie pierwiastków Bielsko-Biała | BadamyPierwiastki.pl (onkopierwiastki Bielsko-Biała)',
    metaDescription: 'Badanie pierwiastków Bielsko-Biała — zbadaj 6 pierwiastków śladowych we krwi. Certyfikowana placówka, cena od 200 zł, wynik PDF w 15 dni. Badanie znane jako onkopierwiastki lub onkopakiet.',
    heroText: 'Badanie pierwiastków Bielsko-Biała — analiza 6 pierwiastków śladowych we krwi w certyfikowanej placówce.',
    introText: 'Bielsko-Biała oferuje mieszkańcom Podbeskidzia dostęp do badania pierwiastków w certyfikowanej placówce medycznej. Badanie obejmuje pomiar stężeń selenu, cynku, arsenu, miedzi, kadmu i ołowiu — pierwiastków, które według wieloletnich badań naukowych odgrywają rolę w kształtowaniu ryzyka nowotworowego.',
    facilityDescription: 'Certyfikowana placówka w Bielsku-Białej pobiera krew pełną zgodnie z wytycznymi laboratorium Innowacyjna Medycyna. Region Podbeskidzia, położony na styku Śląska i Małopolski, łączy wpływy przemysłowe z przyrodniczymi — badanie pierwiastków pozwala ocenić, jak te czynniki oddziałują na organizm mieszkańców.',
    cityFaq: [
      { q: 'Gdzie wykonać badanie pierwiastków w Bielsku-Białej?', a: 'Badanie pierwiastków w Bielsku-Białej dostępne jest w certyfikowanej placówce widocznej na tej stronie. Punkt pobrań korzysta z dedykowanych próbówek i stosuje protokół laboratorium Innowacyjna Medycyna.' },
      { q: 'Ile kosztuje badanie pierwiastków w Bielsku-Białej?', a: 'Panel podstawowy (1–3 pierwiastki) to koszt 200 zł, a rozszerzony panel 6 pierwiastków (Se, Zn, As, Cu, Cd, Pb) — 230 zł. Cena obejmuje pobranie krwi, analizę laboratoryjną ICP-MS i raport PDF z zaleceniami.' },
      { q: 'Czy mieszkańcy Cieszyna lub Żywca mogą skorzystać z placówki w Bielsku-Białej?', a: 'Tak — z certyfikowanej placówki w Bielsku-Białej korzystają również pacjenci z Cieszyna, Żywca, Andrychowa, Czechowic-Dziedzic i innych miast Podbeskidzia. Dojazd z tych miejscowości zajmuje zwykle 30–50 minut.' },
      { q: 'Jak przygotować się do badania pierwiastków w Bielsku-Białej?', a: 'Na pobranie krwi zgłoś się na czczo (minimum 6 godzin bez jedzenia). Przez 3 dni przed badaniem unikaj ryb morskich, owoców morza i ryżu. Poinformuj personel o ewentualnej suplementacji selenu, cynku lub miedzi.' },
    ],
    seoText: `<h3>Badanie pierwiastków Bielsko-Biała — badanie pierwiastków na Podbeskidziu</h3>
<p><strong>Bielsko-Biała</strong>, miasto u podnóża Beskidów zamieszkane przez blisko 170 tysięcy osób, jest jednym z ośrodków na południu Polski, w którym można wykonać <strong>badanie pierwiastków</strong>. <strong>Badanie pierwiastków Bielsko-Biała</strong> dają mieszkańcom Podbeskidzia możliwość skorzystania z profilaktyki opartej na wieloletnich odkryciach naukowych zespołu prof. dr. hab. n. med. Jana Lubińskiego z Pomorskiego Uniwersytetu Medycznego w Szczecinie.</p>

<p>Badanie polega na precyzyjnym pomiarze stężeń sześciu pierwiastków śladowych we krwi: <strong>selenu (Se), cynku (Zn), arsenu (As), miedzi (Cu), kadmu (Cd) i ołowiu (Pb)</strong>. Według ustaleń naukowych ich poziom w organizmie pozostaje w ścisłym związku z prawdopodobieństwem rozwoju nowotworów złośliwych.</p>

<h3>Bielsko-Biała i Podbeskidzie — kontekst środowiskowy</h3>
<p>Region Podbeskidzia leży na styku dwóch województw — śląskiego i małopolskiego. Historyczna obecność przemysłu włókienniczego, maszynowego i metalurgicznego w Bielsku-Białej, a także sąsiedztwo Górnośląskiego Okręgu Przemysłowego, mogły wpływać na ekspozycję mieszkańców na pierwiastki takie jak kadm czy ołów. Jednocześnie bliskość terenów górskich i mniejsze zagęszczenie niż w aglomeracji śląskiej tworzą odmienny profil środowiskowy. <strong>Badanie pierwiastków w Bielsku-Białej</strong> pozwala indywidualnie ocenić wpływ tych czynników na organizm.</p>

<p>Z placówki w Bielsku-Białej mogą korzystać również mieszkańcy Cieszyna, Żywca, Andrychowa, Czechowic-Dziedzic, Skoczowa czy Wadowic.</p>

<h3>Jak zamówić i wykonać badanie pierwiastków w Bielsku-Białej?</h3>
<p>Zamawiasz badanie na stronie badamypierwiastki.pl — wybierasz panel (podstawowy lub rozszerzony) oraz placówkę w Bielsku-Białej. Po opłaceniu kontaktujesz się z placówką, by ustalić termin wizyty. Samo pobranie trwa kilka minut — potrzeba zaledwie pół mililitra krwi pełnej. Próbka, zabezpieczona w specjalnych próbówkach, jest transportowana do laboratorium i analizowana metodą ICP-MS — spektrometrią mas pozwalającą wykryć nawet śladowe ilości pierwiastków.</p>

<p>Kompletny raport trafia na Twój e-mail w ciągu 15 dni roboczych. Zawiera wartości liczbowe, interpretację na tle indywidualnych norm i praktyczne zalecenia dotyczące diety oraz suplementacji.</p>

<h3>Dlaczego normy w badaniu pierwiastków są spersonalizowane?</h3>
<p>Klasyczne wyniki laboratoryjne odnoszą się do jednego zakresu prawidłowego, identycznego dla każdego. W <strong>badaniu pierwiastków</strong> normy są zróżnicowane — opracowano je na podstawie wieloletnich obserwacji polskiej populacji, z podziałem na grupy zdefiniowane przez płeć, wiek, palenie papierosów i obecność mutacji BRCA1. Ta precyzja — potwierdzona patentami i publikacjami w recenzowanych czasopismach — pozwala trafniej ocenić, czy wynik danego pacjenta mieści się w bezpiecznym zakresie.</p>

<h3>Co mówi nauka o związku pierwiastków z nowotworami?</h3>
<p>Badania zespołu ze Szczecina, prowadzone na tysiącach osób, pokazały jednoznaczne zależności. Prawidłowe stężenie selenu korelowało z kilkukrotnym obniżeniem ryzyka nowotworowego — efekt był najsilniejszy u osób starszych. Dane dotyczące miedzi, kadmu i ołowiu wskazują natomiast, że nadmiar tych pierwiastków może istotnie pogarszać rokowanie, zwłaszcza u pacjentów już zdiagnozowanych onkologicznie.</p>

<h3>Badanie pierwiastków Bielsko-Biała — najważniejsze informacje</h3>
<p>Certyfikowana placówka w <strong>Bielsku-Białej</strong> widoczna jest na tej stronie. Tylko w takim punkcie pobrań gwarantowane jest prawidłowe zabezpieczenie materiału — zwykłe laboratoria diagnostyczne nie dysponują odpowiednim sprzętem do tego badania.</p>

<p><strong>Badanie pierwiastków</strong> zamówisz online, bez skierowania. Wybierz placówkę w Bielsku-Białej, umów pobranie i odbierz spersonalizowany wynik z zaleceniami w 15 dni roboczych.</p>`,
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
