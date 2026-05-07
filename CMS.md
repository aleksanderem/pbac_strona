# PBAC CMS — Payload 3

Panel administracyjny dostępny pod `/admin`. Cała treść strony przeniesiona do
Payload CMS — blog, produkty, marki, miejscowości montażu/serwisu, opinie,
usługi, autorzy, ustawienia globalne (telefony, email, adres).

## Pierwsze logowanie

Przy pierwszym wejściu na `/admin` Payload poprosi o utworzenie konta
administratora. Wprowadź email (np. `aleksander@kolaboit.pl`) i hasło.
Konto otrzymuje rolę `admin` (pełne uprawnienia).

Kolejnych użytkowników (rola `editor` — tylko treść, bez struktury) dodajesz
w panelu: Users → New.

## Kolekcje

| Kolekcja        | Co zawiera                                              |
| --------------- | ------------------------------------------------------- |
| Articles        | Blog (63 wpisy) — tytuł, slug, lexical rich-text body, kategoria, autor, cover image, SEO meta |
| Authors         | Autorzy artykułów (1: Zespół PBAC)                      |
| Brands          | Marki klimatyzatorów (11: Samsung, LG, Toshiba…)        |
| Categories      | Kategorie blogowe (6, generowane z artykułów)           |
| Locations       | Miejscowości montażu/serwisu (13)                       |
| Media           | Uploady — zdjęcia z generacją wariantów (thumb/card/tablet/desktop) |
| Products        | Klimatyzatory (59 modeli) — relacja do Brands           |
| Services        | Usługi główne (4: montaż, serwis, wynajem, pompy ciepła) |
| Testimonials    | Opinie klientów (15)                                    |
| Users           | Użytkownicy panelu (admin/editor)                       |

## Globals

- **SiteSettings**: telefon główny (`+48 503 151 802`), telefon PlayAir
  (`+48 692 981 431`), email (`biuro@pbac.pl`), adres, social media.

## Środowisko

Wymagane zmienne (`.env.local` lokalnie, env vars w Vercelu na prod):

```
DATABASE_URI=postgres://user:pass@host:port/db
PAYLOAD_SECRET=<generowany openssl rand -base64 32>
```

`.env.local` jest w `.gitignore`. Nie commitować.

Node 22+ wymagane (Payload 3 + ESM tsx loader). Patrz `.nvmrc`.

## Skrypty

```bash
npm run dev                # dev server: site + /admin
npm run build              # production build (wymaga DB)
npm run seed               # ponowny import treści z lib/*.ts (idempotent)
npm run generate:types     # regeneruj payload-types.ts po zmianie kolekcji
npm run generate:importmap # regeneruj importMap dla admina
npm run migrate            # uruchom migracje SQL
npm run migrate:create     # wygeneruj nową migrację z różnic schemy
npm run migrate:status     # status migracji
```

## Architektura

- **Source of truth**: Postgres (przez Payload).
- **Public site**: pobiera dane przez `lib/cms/*` (server-only, cache'owane
  przez React `cache()`). Strony renderują się statycznie (SSG) przy buildzie.
- **Admin / API**: dynamiczne route'y SSR — `/admin/*`, `/api/*`,
  `/api/graphql`, `/api/graphql-playground`.
- **Client islands**: testimonials, navbar, contact form, CTA — są
  client components, ale otrzymują dane z server-wrappera, więc CMS jest
  ich źródłem prawdy.

## Edycja treści

1. Zaloguj do `/admin`.
2. Wybierz kolekcję z lewego menu.
3. Edytuj wpis lub kliknij "Create New".
4. Zapisz.

Zmiany na public site po następnym buildzie/deployu (ISR/revalidate można
dorzucić w przyszłości — obecnie strona pre-renderuje przy buildzie).

## Co dalej (poza tym MVP)

- Webhook Payload → Vercel deploy hook na `afterChange` (auto-rebuild).
- Migracja `lib/*.ts` → osobny katalog `lib/legacy/` (zachowane jako fallback,
  ale niewywoływane).
- Adapter Appwrite Storage dla `Media` (S3-kompatybilny — Appwrite ma `s3`
  endpoint).
- Localization (PL/EN per pole) jeśli będzie potrzebny EN.
