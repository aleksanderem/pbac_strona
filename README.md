# PBAC — Klimatyzacja i Pompy Ciepła Warszawa

Strona firmowa PBAC — montaż i serwis klimatyzacji oraz pomp ciepła w Warszawie i okolicach. Projekt oparty o Next.js 16 (App Router) z React 19, TypeScript, Tailwind CSS 4 i shadcn/ui.

## Stack

- Next.js 16.1 (App Router, RSC, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4 + tw-animate-css
- shadcn/ui (Radix UI)
- MapLibre GL (mapa stref obsługi)
- Motion (animacje)
- Three.js / OGL (efekty 3D)
- Lucide React (ikony)

## Struktura projektu

```
app/                      Next.js App Router — strony i layout
  blog/                   Wpisy blogowe
  klimatyzacja/           Landing: klimatyzacja
  pompy-ciepla/           Landing: pompy ciepła
  montaz/                 Landing: montaż
  serwis/                 Landing: serwis
  wynajem-klimatyzatorow/ Landing: wynajem
  produkty/               Katalog produktów
  kontakt/                Strona kontaktowa
  polityka-prywatnosci/
components/               Komponenty React (sekcje, UI, mapa)
lib/                      Utility, dane (testimonials, faq)
public/                   Assety statyczne
types/                    Definicje typów
```

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja uruchomi się pod `http://localhost:3000`.

## Build produkcyjny

```bash
npm run build
npm run start
```

## SEO

Strona zawiera komplet metadanych SEO, `sitemap.ts`, `robots.ts`, `manifest.ts`, structured data (JSON-LD) oraz Open Graph / Twitter Cards. Canonical URL: `https://pbac.pl`.

## Licencja

Projekt prywatny — wszystkie prawa zastrzeżone PBAC.
