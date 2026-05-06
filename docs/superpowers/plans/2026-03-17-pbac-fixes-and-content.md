# PBAC Fixes, Missing Content & Visual Polish

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical bugs, import missing content from pbac.pl, and polish visuals.

**Architecture:** Static Next.js 16 site with `output: "export"`. All data in TypeScript files under `lib/`. Dark theme, Tailwind v4, shadcn/ui, motion/react animations. Form submission via Resend API (client-side POST since no server). New content sections are server components unless they need interactivity.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (Radix), motion/react, Lucide icons

---

## Task 1: Fix sticky phone placeholder

**Files:**
- Modify: `components/sticky-phone.tsx:8`

- [ ] Change `tel:+48XXXXXXXXX` to `tel:+48503151802`
- [ ] Commit

---

## Task 2: Fix quote form — Resend integration

**Files:**
- Modify: `components/quote-form.tsx:165`

- [ ] Replace Formspree URL with Resend API endpoint. Since this is a static export (no API routes), use client-side fetch to `https://api.resend.com/emails` with the API key passed as env var at build time, OR use a simple mailto fallback. Given static export constraint, change to `mailto:biuro@pbac.pl` with pre-filled subject/body as interim solution, then add a note about needing a serverless function for Resend.
- [ ] Actually: create a simple form action that opens mailto with form data serialized, OR use Resend's email sending from client (requires exposing API key which is bad). Best approach: keep form UI but submit to a Resend-powered endpoint the user will set up. For now fix the placeholder to show a clear error message or use FormSubmit.co as a free relay.
- [ ] Commit

---

## Task 3: Fix mega menu responsive issues

**Files:**
- Modify: `components/navbar.tsx`

- [ ] Replace hardcoded `min-w-[720px]` / `min-w-[680px]` / `min-w-[640px]` with responsive max-w and proper positioning that doesn't overflow viewport
- [ ] Fix Blog dropdown offset from `-left-20` to consistent positioning (use right-0 or calculated left based on position)
- [ ] Add `max-w-[calc(100vw-2rem)]` safety to all dropdowns
- [ ] Test on 1024px, 1280px, 1440px widths
- [ ] Commit

---

## Task 4: Fix blog article card fallbacks

**Files:**
- Modify: `components/article-card.tsx:11`

- [ ] Remove the `!article.coverImage.startsWith("/images/blog/")` hack
- [ ] Create a proper fallback: gradient background using article category color + category name as large text overlay
- [ ] Commit

---

## Task 5: Create OG default image

**Files:**
- Create: `public/images/og-default.png`

- [ ] Generate a 1200x630 gradient image with PBAC logo and tagline using canvas/sharp or a simple HTML-to-image approach
- [ ] Commit

---

## Task 6: New component — PricingTable (cennik usług)

**Files:**
- Create: `components/pricing-table.tsx`
- Modify: `app/page.tsx` (add to homepage)

- [ ] Create PricingTable component with data from pbac.pl:
  - Dodatkowy metr instalacji: 80 zł netto
  - Wykucie bruzdy w cegle: 60 zł netto
  - Wykucie bruzdy w betonie: 180 zł netto
  - Przeróbki elektryczne: do uzgodnienia
  - Metr zasilania z rozdzielni: 35 zł netto
  - Przewiert przez ścianę: 70 zł netto
  - Pompka skroplin mini Orange: 350 zł netto
  - Podnośnik koszowy: do uzgodnienia
  - Przegląd gwarancyjny: 140 zł netto
  - Naprawy budowlane: do uzgodnienia
- [ ] Style: dark glassmorphic table, GlowingEffect border, AuroraText heading
- [ ] Add to homepage after HowItWorks section
- [ ] Commit

---

## Task 7: New component — FounderPromise (obietnica Piotra)

**Files:**
- Create: `components/founder-promise.tsx`
- Modify: `app/page.tsx`

- [ ] Content from pbac.pl: "Nazywam się Piotr Brzeziński i jestem założycielem firmy PBAC. Firma którą budowałem wraz z rewelacyjnym zespołem opiera się na solidnych fundamentach profesjonalizmu i rzetelności. Twój komfort i zadowolenie są dla nas najważniejsze..."
- [ ] Two-column layout: text left, placeholder for photo right (or gradient avatar)
- [ ] Add AntiPromises below: "Nieterminowość" and "Chodzenie na skróty" cards
- [ ] Add to homepage before TestimonialsSection
- [ ] Commit

---

## Task 8: New component — CertificatesSection

**Files:**
- Create: `components/certificates-section.tsx`
- Modify: `app/page.tsx`

- [ ] Section heading: "Certyfikaty i gwarancja jakości"
- [ ] Subheading from pbac.pl content
- [ ] Grid of certificate placeholders (since actual cert images are lazy-loaded SVG placeholders on old site, use descriptive cards: F-GAZ, UDT, Elektryczne etc.)
- [ ] Add to homepage after FounderPromise
- [ ] Commit

---

## Task 9: New component — DetailedInstallation (8 kroków)

**Files:**
- Create: `components/detailed-installation.tsx`
- Modify: `app/klimatyzacja/page.tsx`

- [ ] 8 steps from pbac.pl:
  1. Przygotowanie miejsca montażu
  2. Wykonanie otworu w ścianie zewnętrznej
  3. Przygotowanie instalacji (freonowa, skropliny, zasilanie)
  4. Montaż jednostki wewnętrznej (do 3m)
  5. Połączenie urządzeń
  6. Próba szczelności
  7. Uruchomienie urządzeń
  8. Sprawdzenie + szkolenie domowników
- [ ] Numbered steps with icons, vertical timeline style
- [ ] Add to klimatyzacja page
- [ ] Commit

---

## Task 10: New component — ServiceTabs (serwis okresowy/naprawa)

**Files:**
- Create: `components/service-tabs.tsx`
- Modify: `app/page.tsx`

- [ ] Two tabs using shadcn Tabs:
  Tab 1 "Serwis okresowy": Przegląd serwisowy, Napełnienie klimatyzacji, Czyszczenie
  Tab 2 "Naprawa i prace serwisowe": Diagnoza usterek, Naprawa, Zmiana miejsca
- [ ] Add to homepage in ServicesSection area
- [ ] Commit

---

## Task 11: Warsaw districts on montaż pages

**Files:**
- Modify: `app/montaz/[miasto]/page.tsx`

- [ ] Add districts list for Warszawa: Mokotów, Rembertów, Wesoła, Wilanów, Włochy, Żoliborz, Ursus, Praga-Północ, Wawer, Ochota, Białołęka, Śródmieście, Bemowo, Targówek, Bielany, Wola, Ursynów, Praga-Południe
- [ ] Show only on warszawa page (conditional on miasto slug)
- [ ] Commit

---

## Task 12: Visual polish — Testimonials simplification

**Files:**
- Modify: `components/testimonials-section.tsx`

- [ ] Reduce from 10 marquees to 4
- [ ] Replace 3D transforms with simpler layout on mobile (flat grid or single horizontal marquee)
- [ ] Keep desktop 3D effect but lighter
- [ ] Commit

---

## Task 13: Visual polish — Navbar mobile UX

**Files:**
- Modify: `components/navbar.tsx`

- [ ] Add explicit close button in mobile panel
- [ ] Ensure mobile backdrop has z-index
- [ ] Commit

---

## Task 14: Final build verification

- [ ] Run `npm run build` — must pass with 0 errors
- [ ] Verify page count (should be 170+)
- [ ] Commit all remaining changes
