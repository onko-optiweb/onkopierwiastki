'use client';

import { useState } from 'react';
import { FileText, Copy, Check, ChevronDown, BookOpen, Image, Search, Sparkles, Download } from 'lucide-react';

const blogPrompt = `Jesteś ekspertem SEO i copywriterem medycznym. Napisz artykuł blogowy na stronę badamypierwiastki.pl — stronę poświęconą badaniu stężenia pierwiastków śladowych we krwi (selen, cynk, arsen, miedź, kadm, ołów) pod kątem ryzyka nowotworowego. Badanie opracował prof. Jan Lubiński z Pomorskiego Uniwersytetu Medycznego w Szczecinie.

TEMAT ARTYKUŁU: [wpisz temat, np. "Rola selenu w profilaktyce nowotworowej"]

MATERIAŁY ŹRÓDŁOWE (wklej tutaj artykuły, notatki, linki, fragmenty publikacji — im więcej, tym lepiej):
[wklej tutaj swoje materiały]

WYMAGANIA:

1. TYTUŁ (H1):
   - Jeden główny tytuł artykułu
   - Powinien zawierać główne słowo kluczowe
   - Maks. 70 znaków
   - Podaj sam tekst, bez znaczników HTML

2. TREŚĆ ARTYKUŁU w HTML:
   - Używaj TYLKO tych znaczników: <h2>, <h3>, <p>, <strong>, <em>, <ul>, <li>, <ol>, <blockquote>, <a href="">
   - NIE dodawaj żadnych klas CSS, stylów inline ani atrybutów class=""
   - NIE używaj <h1> (tytuł jest osobno)
   - Struktura nagłówków: H2 to główne sekcje, H3 to podsekcje w ramach H2. Nigdy nie przeskakuj poziomów
   - Minimum 4 sekcje H2
   - Długość: 1500–3000 słów
   - Pogrubiaj (<strong>) kluczowe terminy — maks. 2-3 pogrubienia na akapit
   - Pisz przystępnym językiem, ale zachowaj wiarygodność medyczną
   - NIE obiecuj wyleczenia ani diagnozy
   - NIE podawaj konkretnych zakresów referencyjnych (chronione patentami)
   - Oficjalna nazwa marki: "BadamyPierwiastki.pl". Terminy "onkopierwiastki" i "onkopakiet" to potoczne określenia pacjentów — OK w celach SEO, ale NIE jako nazwa własna
   - Na końcu dodaj sekcję zachęcającą do badania (bez nachalnej reklamy)
   - Jeśli pasuje, linkuj: <a href="/zamow">Zamów badanie pierwiastków</a>

3. META TYTUŁ (meta title):
   - Maks. 60 znaków (bezwzględnie nie więcej niż 70)
   - Powinien zawierać główne słowo kluczowe
   - Spójny z tytułem H1, ale może być krótszy
   - Podaj sam tekst

4. META OPIS (meta description):
   - Maks. 155 znaków (bezwzględnie nie więcej niż 170)
   - Zachęcający, z CTA (np. "Dowiedz się więcej", "Sprawdź")
   - Powinien zawierać główne słowo kluczowe
   - Podaj sam tekst

5. TAGI:
   - 3–5 tagów po przecinku
   - Krótkie, 1-2 słowa każdy
   - Np.: selen, profilaktyka, nowotwory, pierwiastki śladowe

6. ZAJAWKA (excerpt):
   - 1-2 zdania streszczające artykuł
   - Maks. 200 znaków
   - Pojawi się na liście wpisów blogowych

FORMAT ODPOWIEDZI — podaj wynik dokładnie w tej kolejności:

TYTUŁ: [tytuł]

META TYTUŁ: [meta tytuł] ([X] znaków)

META OPIS: [meta opis] ([X] znaków)

TAGI: [tag1, tag2, tag3]

ZAJAWKA: [zajawka]

TREŚĆ HTML:
[tutaj cała treść artykułu w HTML]`;

interface KnowledgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function KnowledgeCard({ title, description, icon, children, defaultOpen = false }: KnowledgeCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-neutral-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-[#EEEFFD] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-[#122056]">{title}</h2>
          <p className="text-sm text-[#8a8fa6] mt-0.5">{description}</p>
        </div>
        <ChevronDown
          size={20}
          className={`text-[#8a8fa6] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="border-t border-neutral-200 p-5">
          {children}
        </div>
      )}
    </div>
  );
}

function CopyButton({ text, label = 'Kopiuj' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-[#EEEFFD] text-[#5B65DC] hover:bg-[#dfe0fa]'
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Skopiowano!' : label}
    </button>
  );
}

export function KnowledgeBase() {
  return (
    <div className="space-y-4">

      {/* Claude Project setup */}
      <KnowledgeCard
        title="Projekt Claude AI — pisz z wiedzą o firmie"
        description="Jak stworzyć projekt w Claude, który zna BadamyPierwiastki.pl"
        icon={<Sparkles size={20} className="text-[#5B65DC]" />}
        defaultOpen
      >
        <div className="space-y-6">
          <p className="text-sm text-[#4a4f65] leading-relaxed">
            Możesz stworzyć <strong>projekt w Claude</strong>, który będzie znał wszystkie informacje o firmie, badaniu, pierwiastkach, cenach i zasadach komunikacji.
            Dzięki temu każdy prompt (np. pisanie bloga, postów social media, odpowiedzi na pytania) będzie od razu uwzględniał kontekst badania pierwiastków.
          </p>

          {/* Step 1 — download */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">1</span>
              Pobierz dokument wiedzy o firmie
            </h3>
            <p className="text-sm text-[#4a4f65] mb-3">
              Kliknij poniższy przycisk, aby pobrać plik z kompletną bazą wiedzy o BadamyPierwiastki.pl.
            </p>
            <a
              href="/docs/baza-wiedzy-onkopierwiastki.md"
              download="baza-wiedzy-onkopierwiastki.md"
              className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#4a53c7] transition-colors"
            >
              <Download size={16} />
              Pobierz bazę wiedzy (.md)
            </a>
          </div>

          {/* Step 2 — create project */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">2</span>
              Stwórz projekt w Claude i wgraj materiały
            </h3>
            <div className="text-sm text-[#4a4f65] space-y-2">
              <ol className="space-y-3 ml-4 list-decimal list-inside">
                <li>
                  Wejdź na{' '}
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline">claude.ai</a>
                  {' '}i zaloguj się
                </li>
                <li>
                  W lewym panelu kliknij <strong>&quot;Projects&quot;</strong> (Projekty), a następnie <strong>&quot;Create project&quot;</strong>
                </li>
                <li>
                  Nadaj nazwę, np. <strong>&quot;BadamyPierwiastki.pl&quot;</strong>
                </li>
                <li>
                  W ustawieniach projektu znajdź sekcję <strong>&quot;Project knowledge&quot;</strong> i kliknij <strong>&quot;Add content&quot;</strong> → <strong>&quot;Upload files&quot;</strong>
                </li>
                <li>
                  Wgraj pobrany plik <code className="bg-neutral-100 px-1 rounded">baza-wiedzy-onkopierwiastki.md</code>
                </li>
                <li>
                  <strong>Wgraj też WSZYSTKIE materiały od profesora</strong> — całą paczkę plików, które masz na dysku: PDF-y, prezentacje, publikacje, drzewko decyzyjne, posty, odpowiedzi PTOK. Im więcej materiałów źródłowych, tym bardziej merytoryczne treści AI wygeneruje
                </li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>Ważne:</strong> Wgraj wszystkie materiały naukowe i marketingowe, które masz od profesora — pliki PDF z publikacjami, prezentacje z konferencji (RIGA, Barcelona), rozdziały z książek o mikroelementach, drzewko decyzyjne, listę publikacji PTOK, posty o 6 pierwiastkach. Claude będzie je traktować jako wiarygodne źródło wiedzy i tworzył treści oparte na faktach naukowych, a nie na ogólnych informacjach z internetu.
              </p>
            </div>
          </div>

          {/* Step 3 — custom instructions */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">3</span>
              Dodaj instrukcję systemową (opcjonalnie)
            </h3>
            <p className="text-sm text-[#4a4f65] mb-3">
              W ustawieniach projektu, w polu <strong>&quot;Custom instructions&quot;</strong>, wklej poniższy tekst.
              Dzięki temu Claude będzie automatycznie stosować się do zasad marki.
            </p>
            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CopyButton text={`Jesteś asystentem firmy Innowacyjna Medycyna sp. z o.o., operatorem strony badamypierwiastki.pl. Pomagasz tworzyć treści marketingowe, wpisy blogowe, posty social media i odpowiedzi na pytania klientów.\n\nZASADY:\n- Ton: profesjonalny, medycznie wiarygodny, ale przystępny. Empowerment, nie straszenie.\n- Oficjalna nazwa marki: "BadamyPierwiastki.pl". Terminy "onkopierwiastki" i "onkopakiet" to potoczne określenia pacjentów — używaj ich w celach SEO, ale NIE jako nazwy własnej produktu.\n- Wzorzec: "Badanie BadamyPierwiastki.pl — znane wśród pacjentów jako onkopierwiastki lub onkopakiet".\n- Zawsze używaj "certyfikowana placówka" (NIGDY "certyfikowana placówka referencyjna").\n- Nie obiecuj wyleczenia ani diagnozy.\n- Nie podawaj konkretnych zakresów referencyjnych — są chronione patentami UP RP.\n- Wszystkie twierdzenia medyczne muszą pochodzić z materiałów w bazie wiedzy projektu.\n- Gdy piszesz artykuł blogowy w HTML, używaj TYLKO: <h2>, <h3>, <p>, <strong>, <em>, <ul>, <li>, <ol>, <blockquote>, <a href="">. Bez klas CSS.\n- Meta tytuł: maks. 60 znaków. Meta opis: maks. 155 znaków.\n- Strona zamówienia: /zamow`} label="Kopiuj instrukcję" />
              </div>
              <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 pr-40 text-xs text-[#4a4f65] overflow-x-auto max-h-52 overflow-y-auto whitespace-pre-wrap leading-relaxed">{`Jesteś asystentem firmy Innowacyjna Medycyna sp. z o.o., operatorem strony badamypierwiastki.pl. Pomagasz tworzyć treści marketingowe, wpisy blogowe, posty social media i odpowiedzi na pytania klientów.

ZASADY:
- Ton: profesjonalny, medycznie wiarygodny, ale przystępny. Empowerment, nie straszenie.
- Oficjalna nazwa marki: "BadamyPierwiastki.pl". Terminy "onkopierwiastki" i "onkopakiet" to potoczne określenia pacjentów — używaj ich w celach SEO, ale NIE jako nazwy własnej produktu.
- Wzorzec: "Badanie BadamyPierwiastki.pl — znane wśród pacjentów jako onkopierwiastki lub onkopakiet".
- Zawsze używaj "certyfikowana placówka" (NIGDY "certyfikowana placówka referencyjna").
- Nie obiecuj wyleczenia ani diagnozy.
- Nie podawaj konkretnych zakresów referencyjnych — są chronione patentami UP RP.
- Wszystkie twierdzenia medyczne muszą pochodzić z materiałów w bazie wiedzy projektu.
- Gdy piszesz artykuł blogowy w HTML, używaj TYLKO: <h2>, <h3>, <p>, <strong>, <em>, <ul>, <li>, <ol>, <blockquote>, <a href="">. Bez klas CSS.
- Meta tytuł: maks. 60 znaków. Meta opis: maks. 155 znaków.
- Strona zamówienia: /zamow`}</pre>
            </div>
          </div>

          {/* What you can do */}
          <div className="bg-[#EEEFFD] rounded-lg p-4">
            <h3 className="font-semibold text-[#122056] mb-2">Co możesz robić w projekcie Claude?</h3>
            <ul className="text-sm text-[#4a4f65] space-y-1">
              <li>• <strong>Pisać wpisy blogowe</strong> — &quot;Napisz artykuł o roli selenu w profilaktyce nowotworowej&quot;</li>
              <li>• <strong>Tworzyć posty na social media</strong> — &quot;Napisz 5 postów na Facebook promujących badanie&quot;</li>
              <li>• <strong>Odpowiadać na pytania klientów</strong> — &quot;Klient pyta, czy badanie jest bolesne. Napisz odpowiedź.&quot;</li>
              <li>• <strong>Pisać opisy do reklam</strong> — &quot;Napisz 3 warianty tekstu reklamowego na Meta Ads&quot;</li>
              <li>• <strong>Tworzyć e-maile</strong> — &quot;Napisz e-mail powitalny dla nowego klienta po zamówieniu&quot;</li>
            </ul>
          </div>
        </div>
      </KnowledgeCard>

      {/* Blog writing */}
      <KnowledgeCard
        title="Pisanie wpisów blogowych"
        description="Prompt AI + instrukcja wklejania do panelu admina"
        icon={<FileText size={20} className="text-[#5B65DC]" />}
      >
        <div className="space-y-6">
          {/* Step 1 */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">1</span>
              Przygotuj materiały
            </h3>
            <p className="text-sm text-[#4a4f65] leading-relaxed">
              Zbierz artykuły naukowe, notatki, własną wiedzę na dany temat. Im więcej informacji podasz AI, tym lepszy będzie artykuł.
              Możesz wkleić fragmenty publikacji, linki do badań, własne notatki — wszystko, co dotyczy tematu.
            </p>
          </div>

          {/* Step 2 — prompt */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">2</span>
              Skopiuj prompt i wklej do Claude lub ChatGPT
            </h3>
            <p className="text-sm text-[#4a4f65] mb-3">
              Wejdź na <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline">claude.ai</a> lub{' '}
              <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline">chatgpt.com</a>,
              wklej poniższy prompt, uzupełnij temat i materiały źródłowe w miejscach oznaczonych <code className="bg-neutral-100 px-1 rounded">[...]</code>, i wyślij.
            </p>

            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CopyButton text={blogPrompt} label="Kopiuj prompt" />
              </div>
              <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 pr-36 text-xs text-[#4a4f65] overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {blogPrompt}
              </pre>
            </div>
          </div>

          {/* Step 3 — wklejanie */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#5B65DC] text-white text-xs flex items-center justify-center">3</span>
              Wklej wynik do panelu admina
            </h3>
            <div className="text-sm text-[#4a4f65] space-y-2">
              <p>Wejdź do <a href="/admin/blog/nowy" className="text-[#5B65DC] underline">Admin → Blog → Nowy wpis</a> i wypełnij pola:</p>
              <ul className="space-y-1.5 ml-4">
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Tytuł</strong> — wklej TYTUŁ z odpowiedzi AI</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Slug</strong> — wygeneruje się automatycznie</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Zajawka</strong> — wklej ZAJAWKĘ</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Treść (HTML)</strong> — wklej całą TREŚĆ HTML</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Meta tytuł</strong> — wklej META TYTUŁ (bez liczby znaków)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Meta opis</strong> — wklej META OPIS (bez liczby znaków)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Tagi</strong> — wklej TAGI (po przecinku)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5B65DC] font-bold">→</span>
                  <span><strong>Obrazek okładki</strong> — kliknij „Dodaj obrazek" i wybierz plik z dysku</span>
                </li>
              </ul>
              <p>Zaznacz <strong>„Opublikowany"</strong> i kliknij <strong>„Zapisz"</strong>.</p>
            </div>
          </div>

          {/* Limits table */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2">Limity znaków</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#EEEFFD]">
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Pole</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Zalecane</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Maksymalnie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr><td className="px-3 py-2 text-[#4a4f65]">Meta tytuł</td><td className="px-3 py-2 text-[#4a4f65]">do 60</td><td className="px-3 py-2 text-[#4a4f65]">70</td></tr>
                  <tr><td className="px-3 py-2 text-[#4a4f65]">Meta opis</td><td className="px-3 py-2 text-[#4a4f65]">do 155</td><td className="px-3 py-2 text-[#4a4f65]">170</td></tr>
                  <tr><td className="px-3 py-2 text-[#4a4f65]">Zajawka</td><td className="px-3 py-2 text-[#4a4f65]">do 200</td><td className="px-3 py-2 text-[#4a4f65]">—</td></tr>
                  <tr><td className="px-3 py-2 text-[#4a4f65]">Tagi</td><td className="px-3 py-2 text-[#4a4f65]">3–5 tagów</td><td className="px-3 py-2 text-[#4a4f65]">po przecinku</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO tips */}
          <div className="bg-[#EEEFFD] rounded-lg p-4">
            <h3 className="font-semibold text-[#122056] mb-2 flex items-center gap-2">
              <Search size={16} className="text-[#5B65DC]" />
              Wskazówki SEO
            </h3>
            <ul className="text-sm text-[#4a4f65] space-y-1.5">
              <li>• <strong>Jedno główne słowo kluczowe na artykuł</strong> — umieść je w tytule, meta tytule, pierwszym akapicie i przynajmniej jednym H2</li>
              <li>• <strong>Wyczerpuj temat</strong> — Google premiuje artykuły, które pokrywają temat kompleksowo</li>
              <li>• <strong>Sprawdź „Ludzie też pytają"</strong> w Google — te pytania to świetne nagłówki H2/H3</li>
              <li>• <strong>Linkuj wewnętrznie</strong> — do strony /zamow i do innych wpisów blogowych</li>
              <li>• <strong>Nie kopiuj treści</strong> z innych stron — artykuł musi być oryginalny</li>
              <li>• <strong>Nazwa marki: BadamyPierwiastki.pl</strong> — terminy „onkopierwiastki" i „onkopakiet" OK jako potoczne określenia pacjentów (SEO), ale NIE jako nazwa produktu</li>
            </ul>
          </div>
        </div>
      </KnowledgeCard>

      {/* Image for blog */}
      <KnowledgeCard
        title="Obrazki do wpisów blogowych"
        description="Skąd brać obrazki, licencje komercyjne, Freepik, Unsplash, Pexels"
        icon={<Image size={20} className="text-[#5B65DC]" />}
      >
        <div className="text-sm text-[#4a4f65] space-y-4">
          <p>Obrazki do wpisów blogowych dodaje się przez <strong>upload pliku</strong> — w edytorze wpisu kliknij przycisk „Dodaj obrazek okładki" i wybierz plik z dysku (JPG, PNG, WebP).</p>

          {/* Freepik */}
          <div className="bg-[#EEEFFD] rounded-lg p-4">
            <h3 className="font-semibold text-[#122056] mb-2">Freepik.com — nasze główne źródło grafik</h3>
            <p className="mb-2">
              <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline font-semibold">Freepik.com</a>
              {' '}to serwis, z którego korzystamy. Oferuje zdjęcia, wektory, ilustracje i grafiki generowane AI.
            </p>
            <ul className="space-y-1 ml-4 text-xs">
              <li>• <strong>Darmowy plan:</strong> Można pobierać do 3 grafik dziennie, ale <strong>wymagana jest atrybucja</strong> (link do Freepik w stopce artykułu lub strony)</li>
              <li>• <strong>Premium (zalecany):</strong> Bez limitu pobrań, <strong>bez obowiązku atrybucji</strong>, dostęp do większej bazy i lepszych grafik</li>
              <li>• <strong>Licencja komercyjna:</strong> Zarówno darmowa jak i Premium pozwalają na użycie komercyjne (na stronach firmowych, blogach, reklamach)</li>
            </ul>
            <p className="mt-2 text-xs"><strong>Warto mieć Premium</strong> — oszczędza czas i nie trzeba dodawać atrybucji pod każdym obrazkiem.</p>
          </div>

          {/* Unsplash */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2">Unsplash.com — darmowe zdjęcia bez atrybucji</h3>
            <p className="mb-2">
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline">Unsplash.com</a>
              {' '}— darmowe zdjęcia wysokiej jakości.
            </p>
            <ul className="space-y-1 ml-4 text-xs">
              <li>• <strong>Licencja:</strong> Unsplash License — darmowe do użytku komercyjnego i niekomercyjnego</li>
              <li>• <strong>Atrybucja:</strong> NIE jest wymagana (ale mile widziana)</li>
              <li>• <strong>Ograniczenie:</strong> Nie wolno sprzedawać zdjęć bez znaczącej modyfikacji (np. jako print, tapeta). Na blogu — w pełni OK</li>
              <li>• <strong>Idealne do:</strong> Zdjęcia laboratoriów, medycyny, zdrowia, nauki</li>
            </ul>
          </div>

          {/* Pexels */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2">Pexels.com — darmowe zdjęcia i wideo</h3>
            <p className="mb-2">
              <a href="https://www.pexels.com/pl-pl/" target="_blank" rel="noopener noreferrer" className="text-[#5B65DC] underline">Pexels.com</a>
              {' '}— darmowe zdjęcia i wideo od fotografów.
            </p>
            <ul className="space-y-1 ml-4 text-xs">
              <li>• <strong>Licencja:</strong> Pexels License — darmowe do użytku komercyjnego i niekomercyjnego</li>
              <li>• <strong>Atrybucja:</strong> NIE jest wymagana (ale mile widziana)</li>
              <li>• <strong>Ograniczenie:</strong> Nie wolno sprzedawać zdjęć niemodyfikowanych ani sugerować, że osoby na zdjęciach polecają produkt</li>
              <li>• <strong>Uwaga:</strong> Nie używaj zdjęć osób z Pexels w kontekście sugerującym, że dana osoba wykonała badanie pierwiastków — to naruszenie licencji</li>
            </ul>
          </div>

          {/* Comparison table */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2">Porównanie serwisów</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#EEEFFD]">
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Serwis</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Komercyjnie</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Atrybucja</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#122056]">Koszt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="px-3 py-2 font-semibold">Freepik</td>
                    <td className="px-3 py-2 text-green-700">Tak</td>
                    <td className="px-3 py-2">Darmowy: tak / Premium: nie</td>
                    <td className="px-3 py-2">Darmowy (3/dzien) lub Premium ~$10/mc</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Unsplash</td>
                    <td className="px-3 py-2 text-green-700">Tak</td>
                    <td className="px-3 py-2">Nie wymagana</td>
                    <td className="px-3 py-2">Darmowy (bez limitu)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Pexels</td>
                    <td className="px-3 py-2 text-green-700">Tak</td>
                    <td className="px-3 py-2">Nie wymagana</td>
                    <td className="px-3 py-2">Darmowy (bez limitu)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to add image */}
          <div>
            <h3 className="font-semibold text-[#122056] mb-2">Jak dodać obrazek do wpisu</h3>
            <ol className="space-y-1 ml-4 list-decimal list-inside">
              <li>Wyszukaj zdjęcie na wybranym serwisie (np. „blood test", „laboratory", „health", „dna")</li>
              <li>Pobierz zdjęcie na dysk (przycisk Download / Pobierz)</li>
              <li>W edytorze wpisu kliknij <strong>„Dodaj obrazek okładki"</strong></li>
              <li>Wybierz pobrany plik z dysku — obrazek załaduje się automatycznie</li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Na co zwracać uwagę:</strong><br />
              • Zalecana proporcja obrazka to <strong>4:3</strong> (np. 1200x900 px) — obrazek zostanie przycięty do tej proporcji<br />
              • Nie używaj zdjęć z widocznymi twarzami pacjentów w kontekście &quot;wykonałem badanie&quot; — to może sugerować rekomendację<br />
              • Szukaj zdjęć o tematyce: laboratorium, probówki, krew, DNA, nauka, zdrowie, profilaktyka<br />
              • Unikaj tanich zdjęć stockowych z uśmiechniętymi ludźmi ze stetoskopem — nie pasują do naszej marki
            </p>
          </div>
        </div>
      </KnowledgeCard>

      {/* General info */}
      <KnowledgeCard
        title="Zasady komunikacji marki"
        description="Co wolno, czego nie wolno, terminologia"
        icon={<BookOpen size={20} className="text-[#5B65DC]" />}
      >
        <div className="text-sm text-[#4a4f65] space-y-4">
          <div>
            <h3 className="font-semibold text-[#122056] mb-2 text-green-700">✓ Co MOŻNA pisać</h3>
            <ul className="space-y-1 ml-4">
              <li>• Informacje o badaniu i pierwiastkach (selen, cynk, arsen, miedź, kadm, ołów)</li>
              <li>• Odwoływanie się do badań naukowych prof. Lubińskiego i PUM Szczecin</li>
              <li>• Informacja o patentach UP RP i publikacjach PubMed</li>
              <li>• Zachęcanie do profilaktyki i badań kontrolnych</li>
              <li>• Termin: <strong>badanie pierwiastków</strong> / <strong>BadamyPierwiastki.pl</strong></li>
              <li>• Termin: <strong>certyfikowana placówka</strong></li>
              <li>• Potoczne określenia pacjentów: <strong>onkopierwiastki</strong>, <strong>onkopakiet</strong> (tylko jako potoczne nazwy, NIE jako marka)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#122056] mb-2 text-red-600">✗ Czego NIE WOLNO pisać</h3>
            <ul className="space-y-1 ml-4">
              <li>• Obietnic wyleczenia, diagnozy lub gwarancji zdrowotnych</li>
              <li>• Konkretnych zakresów referencyjnych (chronione patentami)</li>
              <li>• Twierdzeń medycznych spoza materiałów źródłowych</li>
              <li>• Używania „onkopierwiastki" lub „onkopakiet" jako <strong>nazwy własnej</strong> produktu — to potoczne określenia pacjentów, nie marka</li>
              <li>• Terminu <strong className="line-through">„certyfikowana placówka referencyjna"</strong> — wystarczy „certyfikowana placówka"</li>
            </ul>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
            <p className="text-xs text-[#8a8fa6]">
              <strong>Disclaimer (wymagany na stronie):</strong> Badanie pierwiastków jest badaniem diagnostycznym. Wyniki nie stanowią diagnozy medycznej i nie zastępują konsultacji lekarskiej. Zakresy referencyjne opracowane przez Międzynarodowe Centrum Nowotworów Dziedzicznych PUM w Szczecinie są chronione patentami Urzędu Patentowego RP.
            </p>
          </div>
        </div>
      </KnowledgeCard>
    </div>
  );
}
