import type { GlobalConfig } from "payload";

import { homeUrl as fallbackUrl } from "../livePreviewUrl";

const playairPreviewUrl = (): string =>
  fallbackUrl().replace(/\/(\?|$)/, "/playair$1");

export const PlayairLanding: GlobalConfig = {
  slug: "playair-landing",
  label: "Strona partnera (PlayAir Pruszków)",
  access: { read: () => true },
  admin: {
    livePreview: { url: playairPreviewUrl },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroBadge", type: "text", defaultValue: "Wolne terminy w tym tygodniu · Pruszków + 12 okolic" },
            { name: "heroTitle1", type: "text", defaultValue: "Klimat," },
            { name: "heroTitle2", type: "text", defaultValue: "który grzeje." },
            { name: "heroTitle3", type: "text", defaultValue: "Dosłownie." },
            {
              name: "heroIntro",
              type: "textarea",
              defaultValue:
                "PlayAir — klimatyzacja, pompy ciepła i rekuperacja dla domów i mieszkań na południu i zachodzie Warszawy. Lokalny zespół. Zaplecze partnerskie PBAC.",
            },
            {
              name: "heroStats",
              type: "array",
              label: "Statystyki w hero (pasek)",
              defaultValue: [
                { value: "847", label: "montaży" },
                { value: "< 60 min", label: "dojazd" },
                { value: "5 lat", label: "gwarancji" },
                { value: "10+", label: "marek" },
                { value: "24 h", label: "wycena" },
              ],
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            { name: "heroFormTitle", type: "text", defaultValue: "Darmowy, bez zobowiązań" },
            { name: "heroFormSubtitle", type: "text", defaultValue: "Pomiar u Ciebie" },
          ],
        },
        {
          label: "Usługi",
          fields: [
            { name: "servicesHeading1", type: "text", defaultValue: "Robimy pięć rzeczy." },
            { name: "servicesHeading2", type: "text", defaultValue: "I robimy je porządnie." },
            {
              name: "services",
              type: "array",
              label: "Lista usług",
              defaultValue: [
                {
                  number: "01",
                  title: "Montaż klimatyzacji",
                  description:
                    "Splity, multisplity, kasetony. Dobór po ekspozycji i metrażu — nie po katalogu.",
                  tags: ["Samsung", "LG", "Daikin", "Gree", "Toshiba"].map((t) => ({ tag: t })),
                },
                {
                  number: "02",
                  title: "Pompy ciepła",
                  description:
                    "Powietrze-woda dla domów jednorodzinnych. Współpraca z elektrykami, hydraulikami i projektantami.",
                  tags: ["Samsung", "Mitsubishi Heavy", "Fujitsu", "Neoheat"].map((t) => ({ tag: t })),
                },
                {
                  number: "03",
                  title: "Serwis i przeglądy",
                  description:
                    "Wszystkie marki, wszystkie urządzenia. Umowy SLA do 24 h reakcji.",
                  tags: ["Czyszczenie", "Dezynfekcja", "Uzupełnianie czynnika", "SLA"].map((t) => ({ tag: t })),
                },
                {
                  number: "04",
                  title: "Rekuperacja",
                  description:
                    "Pełny projekt + montaż centrali wentylacyjnej w domu. Świeże powietrze bez otwierania okien.",
                  tags: ["Projekt", "Montaż", "Kanały", "Odzysk ciepła 90%"].map((t) => ({ tag: t })),
                },
                {
                  number: "05",
                  title: "Doradztwo i wycena",
                  description:
                    "Pomiar u Ciebie, trzy warianty ofert, specyfikacja bez ukrytych kosztów.",
                  tags: ["Wizja lokalna", "Fotoinwentaryzacja", "3 warianty", "Bez ukrytych opłat"].map((t) => ({ tag: t })),
                },
              ],
              fields: [
                { name: "number", type: "text", required: true, label: "Numer (np. 01)" },
                { name: "title", type: "text", required: true, label: "Tytuł" },
                { name: "description", type: "textarea", required: true, label: "Opis" },
                {
                  name: "tags",
                  type: "array",
                  label: "Tagi",
                  fields: [{ name: "tag", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Korzyści",
          fields: [
            { name: "benefitsHeading", type: "text", defaultValue: "Dlaczego klimatyzacja?" },
            {
              name: "benefitsIntro",
              type: "textarea",
              defaultValue:
                "Sześć konkretnych powodów, dla których warto zainwestować w nowoczesny klimatyzator — bez marketingowego ściemniania.",
            },
            {
              name: "benefits",
              type: "array",
              label: "Korzyści (z ikoną Lucide)",
              defaultValue: [
                { icon: "Snowflake", title: "Chłodzenie", description: "Skuteczne chłodzenie pomieszczeń nawet w najgorętsze dni — komfort termiczny przez cały rok." },
                { icon: "Thermometer", title: "Grzanie zimą", description: "Klimatyzatory z pompą ciepła ogrzewają dom do -15 °C temperatury zewnętrznej." },
                { icon: "Volume2", title: "Cisza", description: "Poziom hałasu od 16 dB — ciszej niż szept. Idealne do sypialni i biura." },
                { icon: "Wallet", title: "Oszczędność", description: "Klasa energetyczna A+++ — nawet 3× tańsze ogrzewanie niż tradycyjne metody." },
                { icon: "Leaf", title: "Filtracja", description: "Filtry PM1.0, jonizacja i Cold Plasma oczyszczają powietrze z kurzu i alergenów." },
                { icon: "Smartphone", title: "Smart sterowanie", description: "WiFi + aplikacja — włącz chłodzenie w drodze do domu albo głosem przez asystenta." },
              ],
              fields: [
                { name: "icon", type: "text", required: true, label: "Nazwa ikony Lucide (Snowflake, Thermometer, ...)" },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Strefa obsługi",
          fields: [
            {
              name: "zoneCities",
              type: "array",
              label: "Miejscowości w strefie (chip)",
              defaultValue: [
                "Pruszków", "Piastów", "Ursus", "Włochy", "Raszyn", "Michałowice",
                "Nadarzyn", "Janki", "Piaseczno", "Ożarów M.", "Komorów", "Brwinów",
              ].map((c) => ({ name: c })),
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Dlaczego PlayAir",
          fields: [
            { name: "whyHeading", type: "text", defaultValue: "Dlaczego PlayAir?" },
            {
              name: "whyIntro",
              type: "textarea",
              defaultValue:
                "Lokalny zespół z zapleczem PBAC — liczby, które budują zaufanie w okolicach Pruszkowa.",
            },
            {
              name: "whyStats",
              type: "array",
              label: "Statystyki",
              defaultValue: [
                { icon: "Users", number: "847", label: "Zrealizowanych montaży", description: "Setki zadowolonych klientów w Pruszkowie i okolicach" },
                { icon: "Award", number: "10+", label: "Marek w ofercie", description: "Samsung, LG, Daikin, Gree, Mitsubishi, Toshiba i inne" },
                { icon: "MapPin", number: "13", label: "Miejscowości w strefie", description: "Pruszków + 12 okolicznych miast — dojazd pod 60 minut" },
                { icon: "Shield", number: "5 lat", label: "Gwarancji na montaż", description: "Pełna gwarancja producenta + osobna gwarancja PlayAir" },
              ],
              fields: [
                { name: "icon", type: "text", required: true, label: "Nazwa ikony Lucide" },
                { name: "number", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Proces",
          fields: [
            { name: "processHeading", type: "text", defaultValue: "Od telefonu do chłodnego powietrza — siedem dni." },
            {
              name: "processIntro",
              type: "textarea",
              defaultValue: "Pięć kroków, jeden zespół, jeden telefon. Bez przekazywania między działami.",
            },
            {
              name: "processSteps",
              type: "array",
              label: "Kroki",
              defaultValue: [
                { day: "Dzień 0", title: "Telefon lub formularz", description: "Odpowiadamy w ciągu 60 minut. Krótkie pytania o metraż, ekspozycję, potrzeby." },
                { day: "Dzień 1–2", title: "Pomiar u Ciebie", description: "Darmowy dojazd. 45 minut. Fotoinwentaryzacja, pytania techniczne, porada." },
                { day: "Dzień 3", title: "Trzy oferty", description: "Budget / Pro / Premium. Jasna specyfikacja, ceny, terminy. Zero ciśnienia." },
                { day: "Dzień 5–7", title: "Montaż i start", description: "Wybrany termin, osłony na podłogi, 1–2 dni robocze, porządek na koniec." },
                { day: "Po", title: "Serwis i opieka", description: "Rok gwarancji, umowa SLA, przegląd roczny. Jeden telefon, jedna ekipa." },
              ],
              fields: [
                { name: "day", type: "text", required: true, label: "Etykieta (np. Dzień 0)" },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Cennik",
          fields: [
            { name: "pricingHeading1", type: "text", defaultValue: "Trzy klasy." },
            { name: "pricingHeading2", type: "text", defaultValue: "Jedna jakość montażu." },
            {
              name: "pricingNote",
              type: "textarea",
              defaultValue: "Ceny orientacyjne dla jednego pomieszczenia do 40 m². Ostateczna cena po darmowym pomiarze.",
            },
            {
              name: "pricingTiers",
              type: "array",
              label: "Klasy cennika",
              defaultValue: [
                { tier: "Budget", price: "4 200", description: "Pomieszczenie do 35 m², marka ekonomiczna.", features: ["Split 2.5–3.5 kW", "Pompa ciepła", "3 lata gwarancji", "Montaż 1 dzień"].map((f) => ({ feature: f })), featured: false },
                { tier: "Pro", price: "6 800", description: "Samsung, LG, Gree z WiFi. Najczęstszy wybór.", features: ["Split / multi 3.5–5 kW", "Sterowanie z app", "5 lat gwarancji", "Tryb 19 dB", "Filtr antyalergiczny"].map((f) => ({ feature: f })), featured: true },
                { tier: "Premium", price: "11 400", description: "Daikin, Mitsubishi. Cicho, estetycznie, AI.", features: ["Split / multi 5–7 kW", "AI adaptive", "10 lat gwarancji", "Design obudowa", "Serwis 24h priorytet"].map((f) => ({ feature: f })), featured: false },
              ],
              fields: [
                { name: "tier", type: "text", required: true },
                { name: "price", type: "text", required: true, label: "Cena (np. 6 800)" },
                { name: "description", type: "textarea", required: true },
                {
                  name: "features",
                  type: "array",
                  label: "Cechy",
                  fields: [{ name: "feature", type: "text", required: true }],
                },
                { name: "featured", type: "checkbox", label: "Wyróżniony pakiet (środek)" },
              ],
            },
          ],
        },
        {
          label: "Obietnica",
          fields: [
            { name: "promiseHeading", type: "text", defaultValue: "Nasza obietnica." },
            {
              name: "promiseText",
              type: "textarea",
              defaultValue:
                "Jesteśmy z Pruszkowa. PlayAir powstał z myślą o lokalnej społeczności — z certyfikowanym zapleczem instalacyjnym i serwisowym PBAC. Nie jesteśmy kolejnym adresem na trasie — jesteśmy sąsiadami. Kiedy coś nie działa, odbieramy telefon. Kiedy kończymy montaż, sprzątamy jak u siebie.",
            },
            { name: "promiseAntiHeading", type: "text", defaultValue: "Współpracując z nami, nie dowiesz się co to jest" },
            {
              name: "founderAntiPromises",
              type: "array",
              label: "Anty-obietnice (czego u nas nie ma)",
              defaultValue: [
                { title: "Nieterminowość", text: "W PlayAir traktujemy terminy jak świętość. Pomiar w ciągu 48 h, oferta w 3 dni, montaż w terminie z kalendarza — nie z widzimisię. Jeśli coś ma się przesunąć, dzwonimy pierwsi i tłumaczymy dlaczego." },
                { title: "Chodzenie na skróty", text: "Montujemy tak, jakbyśmy montowali sobie. Trasy rurek prowadzone estetycznie, wieszaki na zewnątrz w pionie, porządna izolacja termiczna, odprowadzenie skroplin bez kompromisów. Tanie obejścia wracają po roku — my wracamy tylko na przegląd." },
              ],
              fields: [
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Certyfikaty",
          fields: [
            { name: "certificatesHeading", type: "text", defaultValue: "Certyfikaty i gwarancja jakości" },
            {
              name: "certificatesIntro",
              type: "textarea",
              defaultValue:
                "PlayAir montuje zgodnie z wymogami producentów i prawa UE — w tle mamy zaplecze certyfikowane PBAC. Każdy montaż to pełna dokumentacja i gwarancja.",
            },
            {
              name: "certificates",
              type: "array",
              label: "Certyfikaty",
              defaultValue: [
                { icon: "ShieldCheck", title: "Certyfikat F-GAZ", description: "Uprawnienia do obsługi fluorowanych gazów cieplarnianych — nr PL-FG-022345." },
                { icon: "Zap", title: "Uprawnienia SEP", description: "Kwalifikacje elektryczne do 1 kV — bezpieczne podłączenie zasilania." },
                { icon: "Award", title: "Autoryzowani instalatorzy", description: "Oficjalni instalatorzy Samsung, LG, Daikin oraz Mitsubishi Heavy." },
                { icon: "BadgeCheck", title: "Gwarancja partnerska PBAC", description: "Dodatkowa gwarancja na instalację do 5 lat w ramach współpracy z PBAC." },
              ],
              fields: [
                { name: "icon", type: "text", required: true, label: "Nazwa ikony Lucide" },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Opinie & FAQ",
          fields: [
            { name: "reviewsHeading", type: "text", defaultValue: "4.9 / 5" },
            { name: "reviewsSubheading", type: "text", defaultValue: "na podstawie 180 opinii Google" },
            {
              name: "reviews",
              type: "array",
              label: "Opinie (override z testimoniali)",
              defaultValue: [
                { quote: "Po 3 latach użytkowania klimatyzacja zaczęła dziwnie pachnieć. Serwis przyjechał następnego dnia, wymienił filtry i wykonał dezynfekcję. Problem zniknął od razu.", name: "Ewa Szymańska", location: "Pruszków · serwis" },
                { quote: "Zamontowali mi dwa klimatyzatory LG ArtCool w domu jednorodzinnym. Fachowe doradztwo przy doborze mocy, szybki termin realizacji. Cena zgodna z wyceną, bez niespodzianek.", name: "Anna Wiśniewska", location: "Piaseczno · dom" },
                { quote: "Montaż pompy ciepła i klimatyzacji w nowym domu. Ogarnęli wszystko kompleksowo — dobór urządzeń, instalacja hydrauliczna i elektryczna, uruchomienie. Gorąco polecam!", name: "Robert Jabłoński", location: "Grodzisk Maz. · dom" },
              ],
              fields: [
                { name: "quote", type: "textarea", required: true },
                { name: "name", type: "text", required: true },
                { name: "location", type: "text", required: true },
              ],
            },
            { name: "faqHeading", type: "text", defaultValue: "Najczęstsze pytania." },
            {
              name: "faqs",
              type: "array",
              label: "FAQ",
              defaultValue: [
                { question: "Ile kosztuje montaż klimatyzacji?", answer: "Orientacyjnie od 4 200 zł za montaż w jednym pomieszczeniu. Ostateczna cena po darmowym pomiarze u Ciebie." },
                { question: "Ile trwa montaż?", answer: "1 dzień roboczy dla pojedynczego splita, 2 dni dla multisplita. Pompa ciepła — 2–4 dni z podłączeniem hydraulicznym." },
                { question: "Jaką markę polecacie?", answer: "Zależy od budżetu i priorytetów. Samsung / LG w klasie Pro, Daikin / Mitsubishi w Premium. Na wizycie pokażemy konkrety." },
                { question: "Czy obsługujecie moją miejscowość?", answer: "Pruszków, Piastów, Ursus, Włochy, Raszyn, Michałowice, Nadarzyn, Janki, Piaseczno, Ożarów Maz., Komorów, Brwinów, Grodzisk Maz." },
                { question: "Jak wygląda gwarancja?", answer: "3–10 lat na urządzenie (w zależności od klasy), 5 lat na montaż. Przeglądy coroczne przedłużają gwarancję producenta." },
              ],
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "CTA & kontakt",
          fields: [
            { name: "ctaHeading1", type: "text", defaultValue: "Pomiar w tym tygodniu." },
            { name: "ctaHeading2", type: "text", defaultValue: "Chłodne lato pewne." },
            { name: "ctaButton", type: "text", defaultValue: "Umów pomiar" },
            { name: "ctaFooterNote", type: "text", defaultValue: "Darmowy dojazd w strefie Pruszków + 12 okolic" },
            { name: "phoneNumber", type: "text", defaultValue: "+48 692 981 431", label: "Telefon (display)" },
            { name: "phoneHref", type: "text", defaultValue: "tel:+48692981431", label: "Telefon (tel:)" },
          ],
        },
      ],
    },
  ],
};
