import type { Product, Brand } from "@/types";
import { scrapedProducts } from "./products-scraped";
import { greeProducts } from "./products-gree";
import { haierProducts } from "./products-haier";
import { lgToshibaProducts } from "./products-lg-toshiba";

// Samsung products inline (5), rest imported from sub-files
const samsungProducts: Product[] = [
  // ═══════════════════════════════════════════════
  // SAMSUNG (5 products)
  // ═══════════════════════════════════════════════
  {
    slug: "samsung-wind-free-elite",
    name: "Samsung Wind-Free™ Elite",
    brand: "samsung",
    category: "scienny",
    tagline: "Technologia Wind-Free™ z AI Auto Comfort — chłodzenie bez przeciągów",
    origin: "Samsung Climate Solutions",
    description: "Samsung Wind-Free™ Elite to flagowy klimatyzator ścienny Samsung z technologią Wind-Free™ eliminującą nieprzyjemne przeciągi i zapewniającą ciszę od 16 dB.",
    descriptionLong: [
      "Flagowa seria Wind-Free Elite należy do absolutnej czołówki klimatyzatorów dostępnych na polskim rynku. Osiąga współczynnik SEER 8,5 i SCOP 5,1 — wartości, które przekładają się na klasę energetyczną A+++ w trybie grzania i A++ w chłodzeniu. W praktyce oznacza to jedno z najniższych zużyć energii wśród urządzeń tej kategorii, co w skali roku może oznaczać kilkaset złotych oszczędności na rachunkach.",
      "Sercem urządzenia jest opatentowana technologia Wind-Free, która rozprowadza schłodzone powietrze przez 23 000 mikrootworów w panelu przednim. Dzięki temu klimatyzator eliminuje uczucie przeciągu — powietrze rozchodzi się delikatnie i równomiernie, niemal niezauważalnie. Poziom hałasu jednostki wewnętrznej w trybie Wind-Free spada do zaledwie 16 dB(A), co jest ciszej niż odgłos spadającego liścia. To czyni go doskonałym wyborem do sypialni, gabinetów i pokoi dziecięcych.",
      "Funkcja AI Auto Comfort wykorzystuje algorytmy sztucznej inteligencji do analizy warunków panujących w pomieszczeniu — temperatury, wilgotności i obecności osób — a następnie automatycznie dobiera optymalne parametry pracy. Pilot SolarCell ładuje się energią słoneczną, eliminując potrzebę wymiany baterii. Filtr Tri-Care o właściwościach antybakteryjnych, antywirusowych i antyalergicznych dba o czystość nawiewanego powietrza.",
      "Sterowanie odbywa się wygodnie przez aplikację SmartThings, która umożliwia zdalne zarządzanie klimatyzatorem z poziomu smartfona — także poza domem. Jednostka wewnętrzna o wymiarach 889 x 299 x 215 mm jest kompaktowa i dyskretna. Samsung udziela 3-letniej gwarancji na całe urządzenie oraz dodatkowych 5 lat na sprężarkę, co potwierdza trwałość i niezawodność konstrukcji.",
    ],
    highlight: "Flagowy model",
    features: [
      "Technologia Wind-Free™ — chłodzenie bez przeciągów",
      "AI Auto Comfort — automatyczne dostosowanie pracy",
      "Poziom hałasu od zaledwie 16 dB",
      "Klasa energetyczna A+++/A++",
      "Sterowanie przez SmartThings",
      "Funkcja Self-Cleaning",
      "Tryb Good Sleep",
      "Triple Protector Plus",
      "Pilot SolarCell — bez baterii",
    ],
    advantages: [
      { title: "Wind-Free™", desc: "Tysiące mikrootworów rozprowadzają powietrze bez przeciągów", icon: "energy" },
      { title: "AI Auto Comfort", desc: "Sztuczna inteligencja automatycznie analizuje warunki i dostosowuje parametry", icon: "wifi-full-signal" },
      { title: "Cisza od 16 dB", desc: "Najcichszy klimatyzator w ofercie Samsung — ciszej niż szept", icon: "volume-low" },
      { title: "A+++ i SmartThings", desc: "Najwyższa klasa energetyczna i pełna kontrola zdalna", icon: "tick-02" },
    ],
    specs: [
      { label: "Klasa chłodzenie", value: "A++", icon: "tick-02" },
      { label: "Klasa grzanie", value: "A+++", icon: "tick-02" },
      { label: "Czynnik", value: "R32", icon: "leaf-02" },
      { label: "Hałas", value: "od 16 dB", icon: "volume-low" },
      { label: "WiFi", value: "SmartThings", icon: "wifi-full-signal" },
      { label: "Gwarancja", value: "3 + 5 lat", icon: "shield-02" },
    ],
    models: [
      { name: "Wind-Free Elite 2,5 kW", power: "2,5 kW", energyClass: "A++/A+++", noise: "16 dB", phase: "230V", price: 7148, area: "20–30 m²" },
      { name: "Wind-Free Elite 3,5 kW", power: "3,5 kW", energyClass: "A++/A+++", noise: "16 dB", phase: "230V", price: 7718, area: "30–40 m²" },
    ],
    refrigerant: "R32",
    refrigerantNote: "GWP = 675 · ekologiczny czynnik nowej generacji",
    powerRange: "2,5 – 3,5 kW",
    warranty: "3 lata gwarancji + 5 lat na sprężarkę",
    imageUrl: "/images/products/samsung-wind-free-elite.png",
    imageAlt: "Klimatyzator Samsung Wind-Free Elite",
    gallery: [],
    faq: [
      { question: "Czym jest technologia Wind-Free™?", answer: "Wind-Free™ to opatentowana technologia Samsung rozprowadzająca powietrze przez tysiące mikrootworów w panelu przednim, eliminując uczucie przeciągu." },
      { question: "Czy Wind-Free Elite może grzać zimą?", answer: "Tak. Wyposażony w pompę ciepła powietrze-powietrze, efektywnie ogrzewa pomieszczenie zimą. Klasa A+++ w trybie grzania." },
    ],
  },
  {
    slug: "samsung-wind-free-avant",
    name: "Samsung Wind-Free™ Avant",
    brand: "samsung",
    category: "scienny",
    tagline: "Wind-Free™ z zasięgiem 15 metrów i ciszą od 16 dB",
    origin: "Samsung Climate Solutions",
    description: "Samsung Wind-Free™ Avant z technologią Wind-Free™ rozprowadzającą powietrze na dystansie do 15 metrów. Cisza od 16 dB, klasa A++, czynnik R32.",
    descriptionLong: [
      "W ofercie Samsung model Avant zajmuje pozycję pomiędzy flagowym Elite a budżetowym Comfort — i dla wielu użytkowników stanowi optymalny kompromis. Przy SEER 7,3 i SCOP 4,6 osiąga klasę energetyczną A++ zarówno w chłodzeniu, jak i grzaniu, a jednocześnie oferuje pełen pakiet technologii Wind-Free w cenie o kilkaset złotych niższej niż Elite.",
      "Zasięg nawiewu do 15 metrów wyróżnia Avant na tle konkurencji — powietrze dociera równomiernie nawet do odległych zakątków dużych pomieszczeń. Czujnik ruchu MDS (Motion Detection Sensor) wykrywa obecność osób w pomieszczeniu i automatycznie kieruje strumień powietrza tak, aby nie wiał bezpośrednio na użytkownika. Gdy pomieszczenie jest puste, klimatyzator przechodzi w tryb oszczędzania energii.",
      "Jednostka wewnętrzna o wymiarach 889 x 299 x 215 mm zachowuje kompaktową formę identyczną jak w modelu Elite. Dostępne warianty mocy od 2,5 do 6,5 kW pozwalają dobrać odpowiedni model do pomieszczeń od 20 aż do 90 m². Filtr Tri-Care zapewnia ochronę antybakteryjną, antywirusową i antyalergiczną, a funkcja samoczyszczenia Self-Cleaning automatycznie osusza wymiennik ciepła po zakończeniu pracy, zapobiegając rozwojowi pleśni.",
      "Sterowanie przez aplikację SmartThings umożliwia zdalne włączanie klimatyzatora w drodze z pracy — wracasz do idealnie schłodzonego mieszkania. Avant korzysta z ekologicznego czynnika R32 o niskim potencjale tworzenia efektu cieplarnianego (GWP 675) i pracuje z poziomem hałasu od zaledwie 16 dB(A), co w trybie Wind-Free czyni go praktycznie niesłyszalnym.",
    ],
    highlight: "Zasięg 15 metrów",
    features: ["Wind-Free™ do 15m", "AI Auto Comfort z WiFi", "Cisza od 16 dB", "Klasa A++", "SmartThings", "Czujnik ruchu MDS"],
    advantages: [
      { title: "Zasięg 15m", desc: "Równomierny nawiew na dużym dystansie", icon: "energy" },
      { title: "Cisza 16 dB", desc: "Poniżej progu percepcji hałasu", icon: "volume-low" },
      { title: "4 warianty mocy", desc: "Od 2,5 do 6,5 kW", icon: "tick-02" },
    ],
    specs: [
      { label: "Klasa", value: "A++/A++", icon: "tick-02" },
      { label: "Czynnik", value: "R32", icon: "leaf-02" },
      { label: "Hałas", value: "od 16 dB", icon: "volume-low" },
      { label: "WiFi", value: "SmartThings", icon: "wifi-full-signal" },
    ],
    models: [
      { name: "Avant 2,5 kW", power: "2,5 kW", energyClass: "A++/A++", noise: "16 dB", phase: "230V", price: 6555, area: "20–30 m²" },
      { name: "Avant 3,5 kW", power: "3,5 kW", energyClass: "A++/A++", noise: "16 dB", phase: "230V", price: 7250, area: "30–40 m²" },
      { name: "Avant 5,0 kW", power: "5,0 kW", energyClass: "A++/A++", noise: "16 dB", phase: "230V", price: 9800, area: "40–60 m²" },
      { name: "Avant 6,5 kW", power: "6,5 kW", energyClass: "A++/A++", noise: "16 dB", phase: "230V", price: 12557, area: "60–90 m²" },
    ],
    refrigerant: "R32",
    refrigerantNote: "GWP = 675",
    powerRange: "2,5 – 6,5 kW",
    warranty: "3 lata + 5 lat sprężarka",
    imageUrl: "/images/products/samsung-wind-free-avant.png",
    imageAlt: "Klimatyzator Samsung Wind-Free Avant",
    gallery: [],
  },
  {
    slug: "samsung-wind-free-comfort",
    name: "Samsung Wind-Free™ Comfort",
    brand: "samsung",
    category: "scienny",
    tagline: "23 000 mikrootworów — chłodzenie bez przeciągów w przystępnej cenie",
    origin: "Samsung Climate Solutions",
    description: "Samsung Wind-Free™ Comfort z 23 000 mikrootworami, ciszą od 19 dB i klasą A++. Najlepszy stosunek ceny do technologii Wind-Free™.",
    descriptionLong: [
      "Nie każdy potrzebuje flagowego modelu, aby cieszyć się chłodzeniem bez przeciągów. Samsung Wind-Free Comfort przenosi opatentowaną technologię 23 000 mikrootworów do segmentu cenowego poniżej 6 000 zł, czyniąc bezprzeciągowe chłodzenie dostępnym dla znacznie szerszego grona odbiorców. Przy SEER 6,4–6,8 i SCOP 3,8–4,0 osiąga klasę A++ w chłodzeniu i A+ w grzaniu.",
      "Panel przedni z 23 000 mikrootworami rozprowadza schłodzone powietrze delikatnie i równomiernie — bez koncentracji strumienia w jednym kierunku. Poziom hałasu od 19 dB(A) w trybie cichym jest porównywalny z szeptem, dzięki czemu Comfort sprawdza się również w sypialniach. Jednostka wewnętrzna o wymiarach 820 x 299 x 215 mm (model 3,5 kW) jest nieco kompaktowa niż modele Avant i Elite.",
      "Funkcja AI Auto Cooling inteligentnie zarządza mocą chłodzenia w zależności od warunków w pomieszczeniu. Do dyspozycji użytkownika jest również tryb Good Sleep, który stopniowo dostosowuje temperaturę w nocy zgodnie z naturalnym rytmem snu. Sterowanie odbywa się przez aplikację SmartThings z wbudowanym modułem Wi-Fi.",
      "Comfort to idealna propozycja dla osób, które szukają sprawdzonej technologii Samsung Wind-Free bez nadpłacania za funkcje premium. Cztery warianty mocy — od 2,5 do 6,5 kW — pokrywają pomieszczenia od 20 do 90 m². Czynnik chłodniczy R32 zapewnia wysoką wydajność przy minimalnym wpływie na środowisko.",
    ],
    highlight: "23 000 mikrootworów",
    features: ["WindFree™ 23 000 mikrootworów", "AI Auto Cooling", "Cisza od 19 dB", "Klasa A++/A+", "SmartThings"],
    advantages: [
      { title: "23 000 mikrootworów", desc: "Delikatne rozprowadzanie powietrza", icon: "energy" },
      { title: "Najlepsza cena", desc: "Wind-Free™ w przystępnym budżecie", icon: "tick-02" },
    ],
    specs: [
      { label: "Klasa", value: "A++/A+", icon: "tick-02" },
      { label: "Czynnik", value: "R32", icon: "leaf-02" },
      { label: "Hałas", value: "od 19 dB", icon: "volume-low" },
    ],
    models: [
      { name: "Comfort 2,5 kW", power: "2,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 5776, area: "20–30 m²" },
      { name: "Comfort 3,5 kW", power: "3,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 6193, area: "30–40 m²" },
      { name: "Comfort 5,0 kW", power: "5,0 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 8584, area: "40–60 m²" },
      { name: "Comfort 6,5 kW", power: "6,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 10798, area: "60–90 m²" },
    ],
    refrigerant: "R32",
    refrigerantNote: "GWP = 675",
    powerRange: "2,5 – 6,5 kW",
    warranty: "3 lata + 5 lat sprężarka",
    imageUrl: "/images/products/samsung-wind-free-comfort.png",
    imageAlt: "Klimatyzator Samsung Wind-Free Comfort",
    gallery: [],
  },
  {
    slug: "samsung-cebu",
    name: "Samsung Cebu",
    brand: "samsung",
    category: "scienny",
    tagline: "Inteligentna klimatyzacja z AI Auto Comfort i Digital Inverter Boost",
    origin: "Samsung Climate Solutions",
    description: "Samsung Cebu z Digital Inverter Boost (43% szybsze chłodzenie), AI Auto Comfort, ciszą od 19 dB. Optymalny stosunek ceny do jakości.",
    descriptionLong: ["Samsung Cebu z technologią Digital Inverter Boost osiąga docelową temperaturę 43% szybciej. AI Auto Comfort, WiFi SmartThings, klasa A++/A+."],
    highlight: "43% szybsze chłodzenie",
    features: ["Digital Inverter Boost", "AI Auto Comfort", "Cisza od 19 dB", "SmartThings WiFi", "Czujnik ruchu MDS"],
    advantages: [
      { title: "Digital Inverter Boost", desc: "43% szybsze osiąganie docelowej temperatury", icon: "energy" },
      { title: "Cena/jakość", desc: "Najlepszy stosunek w ofercie Samsung", icon: "tick-02" },
    ],
    specs: [
      { label: "Klasa", value: "A++/A+", icon: "tick-02" },
      { label: "Czynnik", value: "R32", icon: "leaf-02" },
      { label: "Hałas", value: "od 19 dB", icon: "volume-low" },
    ],
    models: [
      { name: "Cebu 2,5 kW", power: "2,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 5028, area: "20–30 m²" },
      { name: "Cebu 3,5 kW", power: "3,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 5390, area: "30–40 m²" },
      { name: "Cebu 5,0 kW", power: "5,0 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 7342, area: "40–60 m²" },
      { name: "Cebu 6,5 kW", power: "6,5 kW", energyClass: "A++/A+", noise: "19 dB", phase: "230V", price: 9139, area: "60–90 m²" },
    ],
    refrigerant: "R32",
    refrigerantNote: "GWP = 675",
    powerRange: "2,5 – 6,5 kW",
    warranty: "3 lata + 5 lat sprężarka",
    imageUrl: "/images/products/samsung-cebu.png",
    imageAlt: "Klimatyzator Samsung Cebu",
    gallery: [],
  },
  {
    slug: "samsung-ar35",
    name: "Samsung AR35",
    brand: "samsung",
    category: "scienny",
    tagline: "Elegancki design, sprawdzona technologia w najlepszej cenie",
    origin: "Samsung Climate Solutions",
    description: "Samsung AR35 — najbardziej przystępny cenowo klimatyzator Samsung z WiFi, SmartThings i klasą A++. Cisza od 20 dB.",
    descriptionLong: ["Samsung AR35 to najtańszy model Samsung z pełnym wyposażeniem. Opływowa obudowa, Digital Inverter, klasa A++/A+, sterowanie SmartThings."],
    highlight: "Najlepsza cena",
    features: ["Digital Inverter", "Cisza od 20 dB", "Klasa A++/A+", "SmartThings WiFi", "Fast Cooling", "Good Sleep"],
    advantages: [
      { title: "Najlepsza cena", desc: "Od 4218 zł z WiFi i SmartThings", icon: "tick-02" },
      { title: "Do 7 kW", desc: "Najwyższa moc w ofercie ściennych Samsung", icon: "energy" },
    ],
    specs: [
      { label: "Klasa", value: "A++/A+", icon: "tick-02" },
      { label: "Czynnik", value: "R32", icon: "leaf-02" },
      { label: "Hałas", value: "od 20 dB", icon: "volume-low" },
    ],
    models: [
      { name: "AR35 2,6 kW", power: "2,6 kW", energyClass: "A++/A+", noise: "20 dB", phase: "230V", price: 4218, area: "20–30 m²" },
      { name: "AR35 3,5 kW", power: "3,5 kW", energyClass: "A++/A+", noise: "20 dB", phase: "230V", price: 4465, area: "30–40 m²" },
      { name: "AR35 5,3 kW", power: "5,3 kW", energyClass: "A++/A+", noise: "20 dB", phase: "230V", price: 6439, area: "40–60 m²" },
      { name: "AR35 7,0 kW", power: "7,0 kW", energyClass: "A++/A+", noise: "20 dB", phase: "230V", price: 7435, area: "60–90 m²" },
    ],
    refrigerant: "R32",
    refrigerantNote: "GWP = 675",
    powerRange: "2,6 – 7,0 kW",
    warranty: "3 lata + 5 lat sprężarka",
    imageUrl: "/images/products/samsung-ar35.png",
    imageAlt: "Klimatyzator Samsung AR35",
    gallery: [],
  },
];

// Merge all product sources
export const products: Product[] = [
  ...samsungProducts,
  ...scrapedProducts,
  ...greeProducts,
  ...haierProducts,
  ...lgToshibaProducts,
];

// Helper functions
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: Brand): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getFeaturedProducts(): Product[] {
  const featured = [
    "samsung-wind-free-elite",
    "lg-artcool-gallery",
    "toshiba-haori",
    "gree-clivia-silver",
    "daikin-stylish-white",
    "kaisai-ice-black",
  ];
  return featured
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 6);
}

export function getProductBrands(): Brand[] {
  return [...new Set(products.map((p) => p.brand))];
}

export function getLowestPrice(product: Product): number | undefined {
  const prices = product.models.map((m) => m.price).filter((p): p is number => p !== undefined);
  return prices.length > 0 ? Math.min(...prices) : undefined;
}
