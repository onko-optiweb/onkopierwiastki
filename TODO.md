# Onkopierwiastki.pl — Lista zadań

## Status: FAZA 2 W TOKU

---

## FAZA 0 — Setup projektu
- [x] Skopiować boilerplate NextJS jako bazę
- [x] Zmienić `output: 'export'` na tryb serwerowy (potrzebny do PayU, API routes)
- [x] Skonfigurować fonty (Funnel Display + DM Sans)
- [x] Skonfigurować kolory w Tailwind/DaisyUI (granat #122056, akcent #5B65DC, light #EEEFFD, bg #FAFAFD)
- [x] Przenieść grafiki z hero HTML do /public/images/
- [ ] Dodać Prisma + bazę danych PostgreSQL (Vercel Postgres)
- [ ] Dodać NextAuth (panel admina)

## FAZA 1 — Landing Page ✅
- [x] Nawigacja — sticky menu
- [x] Hero — CTA, trust bar, grafika
- [x] Sekcja mitów — slider drag & drop (Embla Carousel)
- [x] CTA Banner
- [x] Co odróżnia onkopierwiastki — tabela porównawcza
- [x] Statystyki — animowane liczniki, ciemne tło
- [x] Co dokładnie badamy — interaktywne karty pierwiastków
- [x] Kto powinien się zbadać — slider z tłem DNA
- [x] Opinie pacjentów
- [x] Jak się przygotować — 3 kroki, tło DNA
- [x] Co zyskasz dzięki badaniu — 6 kart korzyści
- [x] Cennik — toggle profilaktyka/onkologiczny
- [x] Placówki referencyjne — mapa Leaflet + wyszukiwarka
- [x] Zamów badanie online — 4 kroki, tło DNA
- [x] FAQ — accordion + JSON-LD FAQPage
- [x] Footer — dane firmy, linki, disclaimer
- [x] FinalCTA

## FAZA 2 — System zamówień i płatności
- [x] Strona /zamow — 3-krokowy formularz (panel → placówka → podsumowanie)
- [x] Wybór panelu badawczego (profilaktyka/onkologiczny, podstawowy/rozszerzony)
- [x] Wybór placówki z mapą interaktywną + opcja zamówienia online
- [ ] **Prisma + PostgreSQL (Vercel Postgres)** — modele: Order, Facility, Payment
- [ ] **PayU API routes** — create order, notify webhook
- [ ] **Formularz danych klienta** — imię, nazwisko, email, telefon (step między placówką a podsumowaniem)
- [ ] **Integracja PayU** — redirect do płatności po kliknięciu "Przejdź do płatności"
- [ ] **Strona statusu zamówienia** — /zamowienie/[id] (potwierdzenie, oczekiwanie, opłacone)
- [ ] **Email potwierdzenia** — po złożeniu i po opłaceniu zamówienia

## FAZA 3 — Mapa placówek (z admina)
- [x] Mapa interaktywna Leaflet/OpenStreetMap
- [x] Wyszukiwarka po mieście/nazwie
- [x] Lista placówek z filtrami
- [x] Wspólne dane placówek (src/data/facilities.ts) — do przeniesienia do DB
- [ ] **Model Facility w Prisma** — CRUD z panelu admina
- [ ] **API routes** — GET /api/facilities, POST/PUT/DELETE (admin)
- [ ] **Dynamiczne ładowanie placówek z DB** zamiast hardcoded

## FAZA 4 — Panel admina
- [ ] Logowanie admina (NextAuth)
- [ ] Dashboard — statystyki zamówień, płatności
- [ ] Lista zamówień — filtrowanie, statusy, szczegóły
- [ ] Zarządzanie placówkami — dodawanie, edycja, usuwanie (mapa z pinem)
- [ ] Ustawienia strony (dane firmy, cennik)
- [ ] Eksport danych (CSV)

## FAZA 5 — SEO i optymalizacja
- [x] Meta tagi, Open Graph, canonical URLs
- [x] JSON-LD: MedicalBusiness + FAQPage
- [x] Sitemap.xml i robots.txt
- [ ] Optymalizacja Core Web Vitals (LCP, CLS, INP)
- [ ] Cookie banner (RODO)
- [ ] Polityka prywatności + Regulamin

## FAZA 6 — Deploy i testy
- [ ] **Deploy na Vercel** — domena techniczna
- [ ] **Vercel Postgres** — podpiąć bazę
- [ ] Testy płatności PayU (sandbox)
- [ ] Testy formularzy i walidacji
- [ ] Responsywność — finalne poprawki
- [ ] Podpięcie domeny onkopierwiastki.pl
- [ ] SSL, monitoring

---

## NASTĘPNE KROKI (priorytet)
1. Zainicjować git repo + deploy na Vercel (domena techniczna)
2. Vercel Postgres + Prisma setup
3. Model danych (Order, Facility, Payment)
4. PayU integracja
5. Panel admina

## DECYZJE DO PODJĘCIA
- Czy jest już konto PayU? (potrzebne klucze API: POS ID, MD5, Client ID/Secret)
- Lista placówek — skąd brać dane? Jest jakiś plik/arkusz?
- Czy strona będzie miała regulamin zakupu?
- Email do powiadomień — jaki serwer SMTP / usługa?
