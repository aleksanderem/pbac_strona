import type { BrandInfo, Brand } from "@/types";

export const brands: BrandInfo[] = [
  {
    slug: "samsung",
    name: "Samsung",
    description:
      "Samsung to jeden z największych producentów klimatyzatorów na świecie, znany z innowacyjnej technologii Wind-Free, która eliminuje nieprzyjemne podmuchy zimnego powietrza. Klimatyzatory Samsung wyróżniają się zaawansowanym sterowaniem przez aplikację SmartThings, filtrami oczyszczającymi powietrze oraz niskim poziomem hałasu od 16 dB. Seria Wind-Free Elite, Avant i Comfort to flagowe modele cieszące się ogromną popularnością w Polsce.",
    logo: "/images/brands/samsung-logo.png",
    country: "Korea Południowa",
  },
  {
    slug: "lg",
    name: "LG",
    description:
      "LG Electronics oferuje szeroką gamę klimatyzatorów ściennych, od designerskiej serii ArtCool z wymiennymi panelami przednimi, po ekonomiczne modele Standard Plus. Klimatyzatory LG wyposażone są w sprężarki inwerterowe Dual Inverter, które zapewniają cichą pracę i niskie zużycie energii. Seria ArtCool Gallery pozwala zastąpić panel przedni własnym zdjęciem lub obrazem, łącząc funkcjonalność z estetyką wnętrza.",
    logo: "/images/brands/lg-logo.svg",
    country: "Korea Południowa",
  },
  {
    slug: "toshiba",
    name: "Toshiba",
    description:
      "Toshiba to pionier technologii klimatyzacyjnych z ponad 50-letnim doświadczeniem. Flagowy model Daiseikai 9 osiąga najwyższą klasę energetyczną A+++ zarówno w trybie chłodzenia, jak i grzania. Seria Shorai Edge wyróżnia się nowoczesnym wzornictwem dostępnym w wersji czarnej i białej, natomiast Haori oferuje wymienne panele tkaninowe. Klimatyzatory Toshiba są cenione za niezawodność i cichą pracę.",
    logo: "/images/brands/toshiba-logo.svg",
    country: "Japonia",
  },
  {
    slug: "gree",
    name: "Gree",
    description:
      "Gree Electric Appliances to największy producent klimatyzatorów na świecie pod względem wolumenu produkcji. W ofercie PBAC znajdują się linie Clivia, Fairy, Amber, Pular, Soyal i Lomo Luxury Plus — pokrywające segment od ekonomicznego po premium. Klimatyzatory Gree łączą konkurencyjną cenę z solidną jakością wykonania, oferując funkcje takie jak jonizacja powietrza, filtr Cold Plasma i sterowanie Wi-Fi.",
    logo: "/images/brands/gree-logo.png",
    country: "Chiny",
  },
  {
    slug: "haier",
    name: "Haier",
    description:
      "Haier to globalny lider w branży AGD, a jego klimatyzatory wyróżniają się zaawansowaną technologią samooczyszczania i oczyszczania powietrza. Seria Flexis Plus oferuje elegancki design w matowym białym wykończeniu, Jade Plus wyposażony jest w lampę UV-C do dezynfekcji, a Arctic Expert Plus to model dedykowany do pracy w ekstremalnie niskich temperaturach. Klimatyzatory Haier oferują doskonały stosunek jakości do ceny.",
    logo: "/images/brands/haier-logo.svg",
    country: "Chiny",
  },
  {
    slug: "aux",
    name: "AUX",
    description:
      "AUX Group to jeden z wiodących chińskich producentów klimatyzatorów, dostarczający urządzenia w atrakcyjnych cenach bez kompromisów w jakości. Linie Q-Smart, Halo i J-Smart oferują nowoczesne wzornictwo, sterowanie Wi-Fi i efektywność energetyczną klasy A++. AUX to doskonały wybór dla klientów szukających sprawdzonej klimatyzacji w przystępnym budżecie.",
    logo: "/images/brands/aux-logo.svg",
    country: "Chiny",
  },
  {
    slug: "kaisai",
    name: "Kaisai",
    description:
      "Kaisai to marka klimatyzatorów produkowanych przez grupę Midea, dystrybuowana w Polsce przez firmę Klima-Therm. Modele Ice, Fly i Geo oferują prosty montaż, niski poziom hałasu i konkurencyjne ceny. Kaisai Ice Black to popularny wybór wśród klientów ceniących ciemny design, który komponuje się z nowoczesnymi wnętrzami. Wszystkie modele obsługują tryb grzania.",
    logo: "/images/brands/kaisai-logo.png",
    country: "Chiny",
  },
  {
    slug: "daikin",
    name: "Daikin",
    description:
      "Daikin to japoński producent premium, uznawany za lidera technologii klimatyzacyjnych w Europie. Model Stylish wyróżnia się nagrodą Red Dot Design Award za wzornictwo, a technologia Coanda zapewnia równomierny rozpływ powietrza wzdłuż sufitu. Klimatyzatory Daikin są znane z wyjątkowej trwałości, cichej pracy i najwyższej efektywności energetycznej.",
    logo: "/images/brands/daikin-logo.png",
    country: "Japonia",
  },
  {
    slug: "mitsubishi-electric",
    name: "Mitsubishi Electric",
    description:
      "Mitsubishi Electric oferuje klimatyzatory ścienne klasy premium, znane z niezawodności i zaawansowanych systemów filtracji powietrza. Seria Diamond to flagowa linia dostępna w kilku wariantach kolorystycznych — Natural White, Pearl White i Ruby Red. Model Premium White to sprawdzony bestseller łączący wysoką efektywność energetyczną z eleganckim wzornictwem.",
    logo: "/images/brands/mitsubishi-logo.png",
    country: "Japonia",
  },
  {
    slug: "mitsubishi-heavy",
    name: "Mitsubishi Heavy",
    description:
      "Mitsubishi Heavy Industries to oddzielna gałąź koncernu Mitsubishi, specjalizująca się w przemysłowych i domowych systemach klimatyzacyjnych. Klimatyzatory Mitsubishi Heavy Premium i Diamond SRK wyróżniają się solidną konstrukcją, zaawansowanym systemem 3D Auto oraz wyjątkowo cichą pracą. To wybór dla klientów oczekujących japońskiej jakości i trwałości.",
    logo: "/images/brands/mitsubishi-heavy-logo.svg",
    country: "Japonia",
  },
  {
    slug: "ge",
    name: "GE Appliances",
    description:
      "GE Appliances (General Electric) to amerykański producent oferujący klimatyzatory ścienne o nowoczesnym designie i konkurencyjnych cenach. Modele Future White i Prime łączą prostotę obsługi z efektywnym chłodzeniem i grzaniem. Klimatyzatory GE to dobry wybór dla klientów ceniących rozpoznawalność marki i sprawdzoną technologię.",
    logo: "/images/brands/ge-logo.svg",
    country: "USA",
  },
];

export function getAllBrands(): BrandInfo[] {
  return brands;
}

export function getBrandBySlug(slug: string): BrandInfo | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandSlugs(): Brand[] {
  return brands.map((b) => b.slug);
}
