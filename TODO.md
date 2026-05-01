# Onkopierwiastki.pl — Lista zadań

## Status: DEPLOY + FAZA 2

---

## FAZA 0 — Setup projektu ✅
- [x] Skopiować boilerplate NextJS jako bazę
- [x] Zmienić na tryb serwerowy (API routes)
- [x] Skonfigurować fonty (Funnel Display + DM Sans)
- [x] Skonfigurować kolory (granat #122056, akcent #5B65DC, light #EEEFFD, bg #FAFAFD)
- [x] Przenieść grafiki do /public/images/
- [x] Git repo + pierwszy commit
- [ ] Push na GitHub (onko-optiweb/onkopierwiastki)
- [ ] Dodać Prisma + PostgreSQL (Vercel Postgres)
- [ ] Dodać NextAuth (panel admina)

## FAZA 1 — Landing Page ✅
- [x] Nawigacja — sticky menu, CTA → /zamow
- [x] Hero — CTA, trust bar, grafika
- [x] Sekcja mitów — slider drag & drop (Embla Carousel)
- [x] CTA Banner — "Jedno pobranie krwi. Wynik w 15 dni..."
- [x] Co odróżnia onkopierwiastki — tabela porównawcza + przycisk CTA
- [x] Statystyki — animowane liczniki, tło DNA 53430.webp
- [x] Co dokładnie badamy — karty pierwiastków (grid 3x2 mobile) + przycisk CTA
- [x] Kto powinien się zbadać — slider, tło DNA, karty z emoji
- [x] CTA Banner — "Zbadaj swoje onkopierwiastki..."
- [x] Opinie pacjentów
- [x] Jak się przygotować — 3 kroki, tło DNA
- [x] Co zyskasz dzięki badaniu — 6 kart korzyści perswazyjnych
- [x] Cennik — toggle profilaktyka/onkologiczny
- [x] Placówki referencyjne — mapa Leaflet + wyszukiwarka
- [x] Zamów badanie online — 4 kroki, tło 53430.webp
- [x] FAQ — accordion + JSON-LD FAQPage
- [x] Footer + FinalCTA
- [x] Wszystkie sekcje ciemne z tłami DNA (ForWhom, Preparation, Statistics, OrderOnline)
- [x] Polskie znaki poprawione wszędzie
- [x] DaisyUI pomarańczowe kolory naprawione (hardcoded hex zamiast klas DaisyUI)

## FAZA 2 — System zamówień i płatności
- [x] Strona /zamow — 3-krokowy formularz (panel → placówka+mapa → podsumowanie)
- [x] Wybór panelu badawczego (profilaktyka/onkologiczny, podstawowy/rozszerzony)
- [x] Wybór placówki z mapą Leaflet (desktop: obok listy, mobile: na górze)
- [x] Opcja "Zamów online" gdy brak placówki w mieście
- [ ] **Formularz danych klienta** — imię, nazwisko, email, telefon (dodać jako step 3, podsumowanie → step 4)
- [ ] **Prisma + PostgreSQL** — modele: Order, Facility, Payment
- [ ] **PayU API routes** — create order, notify webhook
- [ ] **Integracja PayU** — redirect do płatności
- [ ] **Strona statusu zamówienia** — /zamowienie/[id]
- [ ] **Email potwierdzenia** — po złożeniu i po opłaceniu

## FAZA 3 — Placówki z bazy danych
- [x] Mapa interaktywna Leaflet/OpenStreetMap
- [x] Wyszukiwarka + lista
- [x] Wspólne dane (src/data/facilities.ts)
- [ ] **Model Facility w Prisma** — przenieść z hardcoded do DB
- [ ] **API routes** — GET /api/facilities, POST/PUT/DELETE (admin)
- [ ] **Dynamiczne ładowanie z DB**

## FAZA 4 — Panel admina
- [ ] Logowanie (NextAuth)
- [ ] Dashboard — statystyki zamówień
- [ ] Lista zamówień — filtrowanie, statusy
- [ ] Zarządzanie placówkami — CRUD z mapą
- [ ] Ustawienia (dane firmy, cennik)
- [ ] Eksport CSV

## FAZA 5 — SEO i prawo
- [x] Meta tagi, Open Graph, canonical URLs
- [x] JSON-LD: MedicalBusiness + FAQPage
- [x] Sitemap.xml i robots.txt
- [ ] Core Web Vitals (LCP, CLS, INP)
- [ ] Cookie banner (RODO)
- [ ] Polityka prywatności
- [ ] Regulamin zakupu

## FAZA 6 — Deploy i produkcja
- [ ] **Deploy na Vercel** — domena techniczna ← TERAZ
- [ ] **Vercel Postgres** — podpiąć bazę
- [ ] Testy PayU (sandbox)
- [ ] Responsywność — finalne poprawki
- [ ] Podpięcie domeny onkopierwiastki.pl
- [ ] SSL, monitoring

---

## CO TERAZ ROBIĆ (po kolei)
1. ⬜ Push na GitHub → `git push -u origin main`
2. ⬜ Deploy na Vercel → vercel.com/new → import repo
3. ⬜ Vercel Postgres → Storage → Create Database → Connect
4. ⬜ Prisma setup → schema + modele (Order, Facility, Payment)
5. ⬜ Formularz danych klienta w /zamow (step 3)
6. ⬜ PayU integracja (potrzebne klucze API)
7. ⬜ Panel admina

## POTRZEBNE OD KLIENTA
- Konto PayU + klucze API (POS ID, MD5, Client ID/Secret)
- Lista prawdziwych placówek (nazwy, adresy, telefony, godziny)
- Regulamin zakupu — czy ma być?
- Email/SMTP do powiadomień
