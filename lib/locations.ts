import type { Location } from "@/types";

export const locations: Location[] = [
  {
    slug: "warszawa",
    name: "Warszawa",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Warszawa — PBAC | Certyfikowani instalatorzy",
    metaDescription: "Profesjonalny montaż klimatyzacji w Warszawie. Samsung, LG, Toshiba, Gree, Daikin. Bloki, domy, biura. Bezpłatna wycena ☎ 503 151 802.",
    description: "Warszawa to nasz główny obszar działania. Realizujemy montaże klimatyzacji we wszystkich dzielnicach stolicy — od Mokotowa i Ursynowa, przez Śródmieście i Wolę, po Białołękę i Targówek. Znamy specyfikę warszawskich budynków: bloki z wielkiej płyty, kamienice na Pradze, nowoczesne apartamentowce na Wilanowie i domy jednorodzinne na obrzeżach.",
    sections: [
      {
        heading: "Klimatyzacja w blokach i apartamentowcach",
        content: "Montaż klimatyzacji w warszawskich blokach wymaga znajomości przepisów spółdzielni i wspólnot mieszkaniowych. Pomagamy w uzyskaniu zgody na montaż jednostki zewnętrznej, doradzamy lokalizację minimalizującą hałas dla sąsiadów i dobieramy modele o najcichszej pracy — od 16 dB. Mamy doświadczenie z budynkami z wielkiej płyty, nowoczesnymi apartamentowcami i kamienicami.",
      },
      {
        heading: "Klimatyzacja w biurach i lokalach",
        content: "Warszawa jako centrum biznesowe generuje ogromne zapotrzebowanie na klimatyzację biurową. Montujemy systemy split i multisplit w biurach, gabinetach, restauracjach i sklepach. Realizację planujemy poza godzinami pracy, aby nie zakłócać funkcjonowania firmy. Oferujemy również regularne umowy serwisowe dla klientów biznesowych.",
      },
      {
        heading: "Domy jednorodzinne w Warszawie i okolicach",
        content: "Właściciele domów jednorodzinnych na Wilanowie, Wawrze, Białołęce czy w podwarszawskich miejscowościach coraz częściej decydują się na klimatyzację jako uzupełnienie ogrzewania. Montujemy systemy multi-split obsługujące wiele pomieszczeń z jednej jednostki zewnętrznej, co jest ekonomicznym rozwiązaniem dla większych domów.",
      },
    ],
    faq: [
      { question: "Czy montujecie klimatyzację we wszystkich dzielnicach Warszawy?", answer: "Tak, realizujemy montaże we wszystkich dzielnicach Warszawy — od centrum po obrzeża. Dojazd w granicach miasta jest bezpłatny." },
      { question: "Ile kosztuje montaż klimatyzacji w Warszawie?", answer: "Cena montażu zależy od modelu, długości trasy rurowej i warunków technicznych. Bezpłatna wycena pozwala poznać dokładny koszt. Orientacyjnie: montaż jednego klimatyzatora ściennego to koszt od 1500 zł." },
      { question: "Jak szybko możecie zamontować klimatyzację?", answer: "W sezonie letnim terminy realizacji to zwykle 1-2 tygodnie od zamówienia. Poza sezonem — często w ciągu kilku dni." },
    ],
    coordinates: { lat: 52.2297, lng: 21.0122 },
    services: ["montaz", "serwis"],
  },
  {
    slug: "krakow",
    name: "Kraków",
    region: "małopolskie",
    metaTitle: "Montaż klimatyzacji Kraków — PBAC",
    metaDescription: "Montaż klimatyzacji w Krakowie. Profesjonalni instalatorzy, najlepsze marki. Bezpłatna wycena ☎ 503 151 802.",
    description: "Kraków to drugie miasto, w którym świadczymy usługi montażu klimatyzacji. Krakowska zabudowa — od historycznych kamienic na Kazimierzu po nowoczesne osiedla na Ruczaju i Bronowicach — wymaga indywidualnego podejścia do każdej instalacji.",
    sections: [
      {
        heading: "Klimatyzacja w zabytkowej zabudowie",
        content: "Krakowskie kamienice i budynki w strefie ochrony konserwatorskiej wymagają szczególnej uwagi przy montażu klimatyzacji. Doradzamy rozwiązania minimalizujące ingerencję w elewację i pomagamy z formalnościami wymaganymi przez konserwatora zabytków.",
      },
      {
        heading: "Nowoczesne osiedla i biura",
        content: "Na nowych osiedlach i w biurowcach Krakowa montujemy klimatyzatory ścienne i multisplit. Współpracujemy z deweloperami i zarządcami nieruchomości, zapewniając instalacje zgodne z wymogami budynku.",
      },
    ],
    faq: [
      { question: "Czy dojeżdżacie do Krakowa z Warszawy?", answer: "Tak, realizujemy montaże w Krakowie. Planujemy prace tak, aby zminimalizować koszty dojazdu, łącząc zamówienia z jednego regionu." },
    ],
    coordinates: { lat: 50.0647, lng: 19.9450 },
    services: ["montaz"],
  },
  {
    slug: "siedlce",
    name: "Siedlce",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Siedlce — PBAC",
    metaDescription: "Montaż klimatyzacji w Siedlcach i okolicach. Samsung, LG, Gree. Bezpłatna wycena ☎ 503 151 802.",
    description: "Siedlce i okolice to region, w którym systematycznie realizujemy montaże klimatyzacji. Obsługujemy zarówno domy jednorodzinne, jak i lokale usługowe w centrum miasta.",
    sections: [
      {
        heading: "Klimatyzacja dla domów i firm w Siedlcach",
        content: "W Siedlcach montujemy klimatyzatory ścienne w domach jednorodzinnych, mieszkaniach i lokalach usługowych. Dobieramy urządzenia odpowiednie do warunków — od ekonomicznych modeli Kaisai i AUX po premium Samsungi i Toshiby.",
      },
    ],
    faq: [
      { question: "Jaki jest koszt dojazdu do Siedlec?", answer: "Dojazd do Siedlec jest wliczony w cenę montażu. Nie naliczamy dodatkowych opłat za transport." },
    ],
    coordinates: { lat: 52.1676, lng: 22.2900 },
    services: ["montaz"],
  },
  {
    slug: "minsk-mazowiecki",
    name: "Mińsk Mazowiecki",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Mińsk Mazowiecki — PBAC",
    metaDescription: "Montaż klimatyzacji w Mińsku Mazowieckim. Profesjonalny montaż, najlepsze marki. ☎ 503 151 802.",
    description: "Mińsk Mazowiecki i gminy ościenne to obszar, który obsługujemy regularnie. Bliskość Warszawy pozwala nam oferować szybkie terminy realizacji.",
    sections: [
      {
        heading: "Klimatyzacja w Mińsku Mazowieckim",
        content: "W Mińsku Mazowieckim i okolicach montujemy klimatyzatory w domach jednorodzinnych i budynkach wielorodzinnych. Dynamiczny rozwój budownictwa jednorodzinnego w tym rejonie sprawia, że coraz więcej właścicieli nowych domów decyduje się na klimatyzację już na etapie budowy.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.1793, lng: 21.5614 },
    services: ["montaz"],
  },
  {
    slug: "wegrow",
    name: "Węgrów",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Węgrów — PBAC",
    metaDescription: "Montaż klimatyzacji w Węgrowie i okolicach. Bezpłatna wycena ☎ 503 151 802.",
    description: "Węgrów i powiat węgrowski to region, w którym realizujemy montaże klimatyzacji dla klientów indywidualnych i firmowych.",
    sections: [
      {
        heading: "Usługi klimatyzacyjne w Węgrowie",
        content: "W Węgrowie i okolicznych miejscowościach montujemy klimatyzatory ścienne we wszystkich typach budynków. Oferujemy pełen zakres usług — od doradztwa i wyceny, przez montaż, po serwis gwarancyjny i pogwarancyjny.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.3970, lng: 22.0183 },
    services: ["montaz"],
  },
  {
    slug: "biala-podlaska",
    name: "Biała Podlaska",
    region: "lubelskie",
    metaTitle: "Montaż klimatyzacji Biała Podlaska — PBAC",
    metaDescription: "Montaż klimatyzacji w Białej Podlaskiej. Profesjonalni instalatorzy, najlepsze marki. ☎ 503 151 802.",
    description: "Biała Podlaska to najdalej na wschód wysunięte miasto w naszym obszarze działania. Realizujemy tu montaże klimatyzacji planując prace z wyprzedzeniem, aby zapewnić efektywną logistykę.",
    sections: [
      {
        heading: "Klimatyzacja w Białej Podlaskiej",
        content: "Mieszkańcy Białej Podlaskiej mogą skorzystać z naszych usług montażu klimatyzacji w domach, mieszkaniach i obiektach komercyjnych. Oferujemy szeroki wybór klimatyzatorów od ekonomicznych po premium, z montażem i pełną gwarancją.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.0324, lng: 23.1148 },
    services: ["montaz"],
  },
  {
    slug: "otwock",
    name: "Otwock",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Otwock — PBAC",
    metaDescription: "Montaż klimatyzacji w Otwocku. Bliskość Warszawy, szybkie terminy. ☎ 503 151 802.",
    description: "Otwock i okolice (Józefów, Karczew, Celestynów) to popularny obszar podmiejski, gdzie montujemy klimatyzację głównie w domach jednorodzinnych i willach.",
    sections: [
      {
        heading: "Klimatyzacja w domach w Otwocku",
        content: "Otwock ze swoją luźną zabudową jednorodzinną i willową to idealne miejsce dla instalacji klimatyzacyjnych. Jednostki zewnętrzne można swobodnie umieścić na elewacji lub na gruncie, bez ograniczeń typowych dla zabudowy blokowej. Montujemy systemy split i multisplit pokrywające cały dom.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.1053, lng: 21.2613 },
    services: ["montaz"],
  },
  {
    slug: "piaseczno",
    name: "Piaseczno",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Piaseczno — PBAC",
    metaDescription: "Montaż klimatyzacji w Piasecznie i okolicach. Domy, mieszkania, biura. ☎ 503 151 802.",
    description: "Piaseczno i gminy ościenne (Lesznowola, Konstancin-Jeziorna, Góra Kalwaria) to jeden z najdynamiczniej rozwijających się regionów pod Warszawą, gdzie zapotrzebowanie na klimatyzację stale rośnie.",
    sections: [
      {
        heading: "Klimatyzacja w Piasecznie i okolicach",
        content: "Dynamiczny rozwój budownictwa jednorodzinnego i osiedli w rejonie Piaseczna generuje duże zapotrzebowanie na klimatyzację. Montujemy zarówno w nowo budowanych domach (instalacja na etapie budowy), jak i w istniejących budynkach. W Konstancinie-Jeziornej obsługujemy również prestiżowe posiadłości wymagające rozbudowanych systemów multisplit.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.0726, lng: 21.0234 },
    services: ["montaz"],
  },
  {
    slug: "grodzisk-mazowiecki",
    name: "Grodzisk Mazowiecki",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Grodzisk Mazowiecki — PBAC",
    metaDescription: "Montaż klimatyzacji w Grodzisku Mazowieckim. Profesjonalnie i w dobrej cenie. ☎ 503 151 802.",
    description: "Grodzisk Mazowiecki i okolice (Milanówek, Brwinów, Podkowa Leśna) to obszar, w którym regularnie realizujemy instalacje klimatyzacyjne.",
    sections: [
      {
        heading: "Klimatyzacja w Grodzisku Mazowieckim",
        content: "W Grodzisku Mazowieckim i sąsiednich miejscowościach montujemy klimatyzację w domach jednorodzinnych, bliźniakach i szeregówkach. Region ten charakteryzuje się dużym udziałem nowego budownictwa, gdzie klimatyzacja jest planowana już na etapie projektu.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.1056, lng: 20.6314 },
    services: ["montaz"],
  },
  {
    slug: "legionowo",
    name: "Legionowo",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Legionowo — PBAC",
    metaDescription: "Montaż klimatyzacji w Legionowie. Szybkie terminy, konkurencyjne ceny. ☎ 503 151 802.",
    description: "Legionowo to miasto blisko Warszawy, w którym montujemy klimatyzację zarówno w blokach, jak i w domach jednorodzinnych. Bliskość stolicy pozwala na szybkie terminy realizacji.",
    sections: [
      {
        heading: "Klimatyzacja w Legionowie",
        content: "W Legionowie obsługujemy klientów mieszkających w blokach, domach jednorodzinnych i lokalach usługowych. Pomagamy z formalnościami w spółdzielniach mieszkaniowych i doradzamy optymalne lokalizacje dla jednostek zewnętrznych.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.4018, lng: 20.9252 },
    services: ["montaz"],
  },
  {
    slug: "lomianki",
    name: "Łomianki",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Łomianki — PBAC",
    metaDescription: "Montaż klimatyzacji w Łomiankach i Dziekanowie Leśnym. ☎ 503 151 802.",
    description: "Łomianki i Dziekanów Leśny to prestiżowa lokalizacja pod Warszawą, gdzie montujemy klimatyzację głównie w domach jednorodzinnych i willach.",
    sections: [
      {
        heading: "Klimatyzacja w Łomiankach",
        content: "Łomianki to rejon o przeważającej zabudowie jednorodzinnej, gdzie klimatyzacja jest standardem w nowo budowanych domach. Montujemy systemy multisplit obsługujące wiele pomieszczeń, dobierając urządzenia premium dla wymagających klientów.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.3393, lng: 20.8836 },
    services: ["montaz"],
  },
  {
    slug: "nowy-dwor-mazowiecki",
    name: "Nowy Dwór Mazowiecki",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Nowy Dwór Mazowiecki — PBAC",
    metaDescription: "Montaż klimatyzacji w Nowym Dworze Mazowieckim. ☎ 503 151 802.",
    description: "Nowy Dwór Mazowiecki i okolice to region, w którym realizujemy montaże klimatyzacji dla klientów indywidualnych i firm.",
    sections: [
      {
        heading: "Klimatyzacja w Nowym Dworze Mazowieckim",
        content: "W Nowym Dworze Mazowieckim oferujemy montaż klimatyzatorów ściennych we wszystkich typach budynków. Zapewniamy dobór urządzenia, profesjonalny montaż, uruchomienie i serwis gwarancyjny.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.4295, lng: 20.7162 },
    services: ["montaz"],
  },
  {
    slug: "pruszkow",
    name: "Pruszków",
    region: "mazowieckie",
    metaTitle: "Montaż klimatyzacji Pruszków — PBAC",
    metaDescription: "Montaż klimatyzacji w Pruszkowie i okolicach. Bliskość Warszawy, szybka realizacja. ☎ 503 151 802.",
    description: "Pruszków i okolice (Piastów, Ożarów Mazowiecki) to gęsto zabudowany region pod Warszawą, gdzie klimatyzacja cieszy się rosnącą popularnością.",
    sections: [
      {
        heading: "Klimatyzacja w Pruszkowie",
        content: "W Pruszkowie montujemy klimatyzację w blokach, domach jednorodzinnych, biurach i lokalach handlowych. Miasto ma mieszaną zabudowę, co wymaga elastycznego podejścia do każdej instalacji. Pomagamy mieszkańcom bloków z uzyskaniem zgody wspólnoty na montaż jednostki zewnętrznej.",
      },
    ],
    faq: [],
    coordinates: { lat: 52.1709, lng: 20.8093 },
    services: ["montaz"],
  },
];

export function getAllLocations(): Location[] {
  return locations;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationsByService(service: "montaz" | "serwis"): Location[] {
  return locations.filter((l) => l.services.includes(service));
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
