import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getLocationBySlug, getLocationsByService } from "@/lib/locations";
import { getAllBrands } from "@/lib/brands";
import { testimonials } from "@/lib/testimonials";
import dynamic from "next/dynamic";
import HeroBackground from "@/components/hero-background";

const PricingTable = dynamic(() => import("@/components/pricing-table"));
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Settings, Phone, CheckCircle, Star, ShieldCheck,
  Wrench, Droplets, Thermometer, ClipboardList, Award, Users,
  ArrowRight, AlertTriangle, Zap, Heart, Clock, BadgeCheck,
  CircleDollarSign, CalendarCheck, Volume2, ThermometerSun,
  Bug, Wind,
} from "lucide-react";

interface Props {
  params: Promise<{ miasto: string }>;
}

export async function generateStaticParams() {
  return getLocationsByService("serwis").map((l) => ({ miasto: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location) return {};
  return {
    title: `Serwis klimatyzacji ${location.name} — przegląd, czyszczenie, naprawa | PBAC`,
    description: `Profesjonalny serwis i przegląd klimatyzacji w ${location.name}. Czyszczenie filtrów, dezynfekcja, uzupełnianie czynnika, naprawa. Wszystkie marki. Od 250 zł. ☎ 503 151 802.`,
    alternates: { canonical: `/serwis/${miasto}` },
    openGraph: {
      title: `Serwis klimatyzacji ${location.name} — PBAC`,
      description: `Kompleksowy serwis klimatyzacji w ${location.name}. Przeglądy, czyszczenie, dezynfekcja, naprawy. ☎ 503 151 802.`,
      type: "website",
      siteName: "PBAC",
    },
  };
}

const serviceItems = [
  { icon: Droplets, title: "Czyszczenie i dezynfekcja", desc: "Mycie filtrów, parownika i skraplacza. Dezynfekcja eliminująca bakterie i grzyby." },
  { icon: Thermometer, title: "Sprawdzenie czynnika", desc: "Kontrola ciśnienia i poziomu czynnika chłodniczego. Uzupełnianie w razie potrzeby." },
  { icon: Wrench, title: "Diagnostyka i naprawy", desc: "Diagnostyka parametrów pracy, wykrywanie usterek, naprawa z oryginalnymi częściami." },
  { icon: ClipboardList, title: "Raport z przeglądu", desc: "Szczegółowy raport z wykonanych czynności, stanu urządzenia i zaleceń serwisowych." },
];

const stats = [
  { icon: Users, number: "500+", label: "Serwisów" },
  { icon: Award, number: "10+", label: "Marek" },
  { icon: Star, number: "4.9", label: "Ocena" },
  { icon: ShieldCheck, number: "Gwarancja", label: "na usługę" },
];

const detailedServiceSteps = [
  {
    icon: Zap,
    title: "Kontrola przyłączy elektrycznych",
    desc: "Sprawdzamy stan okablowania, złączy, bezpieczników i zabezpieczeń przeciwprzepięciowych. Kontrola poboru prądu przez sprężarkę i wentylatory pozwala wykryć anomalie świadczące o zużyciu komponentów, zanim dojdzie do awarii. Weryfikujemy poprawność uziemienia i stan izolacji przewodów.",
  },
  {
    icon: Thermometer,
    title: "Test ciśnieniowy układu chłodniczego",
    desc: "Za pomocą stacji manometrycznej mierzymy ciśnienie czynnika chłodniczego po stronie ssawnej i tłocznej. Porównujemy odczyty z wartościami nominalnymi producenta. Odchylenie ciśnienia o więcej niż 10% oznacza nieszczelność lub nadmiar czynnika — oba stany obniżają wydajność i mogą uszkodzić sprężarkę.",
  },
  {
    icon: Wind,
    title: "Czyszczenie i wymiana filtrów",
    desc: "Demontujemy filtry powietrza, myjemy je roztworem dezynfekującym i suszymy. Filtr katalityczny i filtr węglowy sprawdzamy pod kątem zużycia — jeśli stracił skuteczność, wymieniamy na nowy. Czyste filtry to nie tylko lepsze powietrze w pomieszczeniu, ale też o 15–25% niższe zużycie energii przez klimatyzator.",
  },
  {
    icon: Droplets,
    title: "Mycie parownika i skraplacza",
    desc: "Parownik (wymiennik jednostki wewnętrznej) pokrywa się kurzem, pyłkami i nalotem biologicznym, który blokuje przepływ powietrza i obniża moc chłodniczą. Czyścimy go preparatem pianotwórczym, który rozpuszcza osady bez uszkadzania aluminiowych lameli. Skraplacz jednostki zewnętrznej myjemy myjką ciśnieniową, usuwając liście, owady i osady.",
  },
  {
    icon: Bug,
    title: "Czyszczenie odpływu skroplin",
    desc: "Wąż odprowadzający skropliny (kondensat) to jeden z najczęstszych punktów awarii — zatkany odpływ powoduje wyciek wody z jednostki wewnętrznej. Przedmuchujemy drenaż sprężonym powietrzem, czyścimy tackę ociekową i sprawdzamy, czy woda odpływa swobodnie. Przy okazji kontrolujemy pompkę skroplin, jeśli jest zainstalowana.",
  },
  {
    icon: ThermometerSun,
    title: "Pomiar wydajności chłodniczej i grzewczej",
    desc: "Po czyszczeniu uruchamiamy klimatyzator i mierzymy temperaturę nawiewu oraz powrotu powietrza. Różnica temperatur (delta T) powinna wynosić 8–12°C w trybie chłodzenia. Sprawdzamy również tryb grzania i funkcję odszraniania. Mierzymy natężenie przepływu powietrza anemometrem, porównując z danymi katalogowymi.",
  },
  {
    icon: ShieldCheck,
    title: "Dezynfekcja środkiem antygrzybicznym",
    desc: "Końcowym etapem serwisu jest dezynfekcja parownika i kanałów nawiewowych specjalistycznym preparatem biobójczym, zatwierdzonym do stosowania w systemach klimatyzacyjnych. Środek eliminuje bakterie, grzyby pleśniowe, drożdże i alergeny, które rozwijają się w wilgotnym środowisku wymiennika ciepła. Dezynfekcja jest szczególnie ważna dla alergików i rodzin z małymi dziećmi.",
  },
];

const warningSignItems = [
  {
    icon: Volume2,
    title: "Nietypowe dźwięki",
    desc: "Trzaski, buczenie, piszczenie lub stukanie mogą wskazywać na zużyte łożyska wentylatora, luzujące się elementy obudowy lub problem ze sprężarką. Każdy nowy, powtarzający się dźwięk to sygnał wymagający diagnostyki.",
  },
  {
    icon: Wind,
    title: "Nieprzyjemny zapach",
    desc: "Stęchły, pleśniowy lub kwaśny zapach z nawiewu to znak, że na parowniku lub w tackce ociekowej rozwinęły się kolonie grzybów i bakterii. Oprócz dyskomfortu stanowią realne zagrożenie zdrowotne, szczególnie dla alergików i astmatyków.",
  },
  {
    icon: ThermometerSun,
    title: "Słabsze chłodzenie lub grzanie",
    desc: "Jeśli klimatyzator nie osiąga ustawionej temperatury lub potrzebuje na to znacznie więcej czasu niż wcześniej, prawdopodobną przyczyną jest brak czynnika chłodniczego, zabrudzone wymienniki lub usterka sprężarki inwerterowej.",
  },
  {
    icon: Droplets,
    title: "Wycieki wody",
    desc: "Woda kapiąca z jednostki wewnętrznej to najczęściej zatkany odpływ skroplin lub uszkodzona pompka kondensatu. Problem narasta stopniowo — im dłużej jest ignorowany, tym większe ryzyko zalania ściany i podłogi, a także rozwoju pleśni.",
  },
  {
    icon: AlertTriangle,
    title: "Kody błędów na wyświetlaczu",
    desc: "Migające diody LED lub kody błędów na pilocie/panelu jednostki wewnętrznej to sygnały diagnostyczne producenta. Oznaczają konkretne usterki — od problemów z czujnikiem temperatury po awarię płyty sterującej. Nie ignoruj ich, nawet jeśli klimatyzator nadal działa.",
  },
  {
    icon: Zap,
    title: "Wyższe rachunki za prąd",
    desc: "Nagły wzrost zużycia energii elektrycznej przy niezmienionym użytkowaniu klimatyzatora wskazuje na spadek jego wydajności. Najczęstsze przyczyny to brak czynnika, zabrudzone filtry lub wymienniki, a także usterka inwertera — każda z nich wymaga serwisu.",
  },
];

const brandServiceNotes = [
  {
    brand: "Samsung",
    model: "WindFree",
    notes: [
      "Czyszczenie 23 000 mikrootworów panelu Wind-Free z osadów kurzu i pyłków",
      "Weryfikacja funkcji samooczyszczania (Auto Clean) — test cyklu suszenia parownika",
      "Diagnostyka modułu Wi-Fi i połączenia z aplikacją SmartThings",
      "Kontrola czujnika ruchu i funkcji automatycznego kierowania nawiewu",
      "Sprawdzenie filtra HD i filtra dezodoryzującego — wymiana przy utracie skuteczności",
    ],
  },
  {
    brand: "LG",
    model: "Dual Inverter",
    notes: [
      "Diagnostyka sprężarki Dual Inverter — odczyt parametrów pracy z płyty sterującej",
      "Sprawdzenie funkcji Plasmaster Ionizer+ — kontrola generatora jonów",
      "Test trybu AI Auto Comfort — kalibracja czujnika obecności i aktywności",
      "Weryfikacja połączenia z aplikacją LG ThinQ i aktualizacja firmware",
      "Kontrola systemu ochrony przed korozją lameli Gold Fin",
    ],
  },
  {
    brand: "Toshiba",
    model: "Daiseikai / Shorai Edge",
    notes: [
      "Kontrola sprężarki rotacyjnej Twin Rotary — pomiar wibracji i temperatury pracy",
      "Sprawdzenie systemu samooczyszczania Magic Coil — test hydrofobowej powłoki parownika",
      "Diagnostyka filtra plazmowego Plasma IAQ — pomiar skuteczności neutralizacji drobnoustrojów",
      "Test trybu Ultra Silent (16 dB) — kontrola prędkości wentylatora przy minimalnym nawiewie",
      "Weryfikacja czujnika jakości powietrza i funkcji automatycznego oczyszczania",
    ],
  },
  {
    brand: "Gree",
    model: "Fairy / Clivia / Amber",
    notes: [
      "Kontrola systemu Cold Plasma — pomiar emisji jonów i skuteczności eliminacji bakterii",
      "Sprawdzenie filtra katalitycznego i filtra z aktywnym węglem — wymiana co 2–3 sezony",
      "Diagnostyka modułu Wi-Fi Gree+ — test połączenia i responsywności sterowania",
      "Weryfikacja funkcji I-Feel (czujnik w pilocie) — kalibracja pomiaru temperatury",
      "Test trybu grzania przy niskich temperaturach zewnętrznych — pomiar COP",
    ],
  },
  {
    brand: "Daikin",
    model: "Stylish / Comfora / Perfera",
    notes: [
      "Diagnostyka sprężarki Swing — odczyt parametrów z płyty głównej (BRC1E63)",
      "Sprawdzenie oczyszczacza Streamer Discharge — pomiar zdolności rozkładu alergenów",
      "Kontrola czujnika inteligentnego oka (Intelligent Eye) — test detekcji obecności",
      "Weryfikacja funkcji Daikin Online Controller — status połączenia chmurowego",
      "Test trybu Econo i funkcji programowania tygodniowego",
    ],
  },
  {
    brand: "Haier",
    model: "Flexis Plus / Jade",
    notes: [
      "Kontrola lampy UV-C do dezynfekcji (model Jade) — pomiar mocy UV i wymiana żarnika",
      "Sprawdzenie funkcji samooczyszczania Self-Clean — test cyklu zamrażania i suszenia",
      "Diagnostyka modułu hOn (Haier Smart Home) — weryfikacja połączenia Wi-Fi",
      "Test filtra antybakteryjnego IFD — ocena stopnia zabrudzenia i przepustowości",
      "Weryfikacja funkcji 3D Airflow — kontrola ruchomych klap nawiewowych",
    ],
  },
];

const frequencyData = [
  {
    icon: Heart,
    type: "Mieszkanie / dom",
    frequency: "Minimum 1 raz w roku",
    details: "Optymalny termin to kwiecień–maj, przed sezonem intensywnego użytkowania. W przypadku alergików lub rodzin z małymi dziećmi zalecamy przegląd dwa razy w roku — wiosną i jesienią.",
  },
  {
    icon: ClipboardList,
    type: "Biuro / lokal usługowy",
    frequency: "2 razy w roku",
    details: "Klimatyzacja pracująca 8–10 godzin dziennie przez cały rok wymaga przeglądu co 6 miesięcy. Regularna konserwacja zapobiega przestojom, które kosztują firmę utratę produktywności i dyskomfort pracowników.",
  },
  {
    icon: Wrench,
    type: "Restauracja / hotel / handel",
    frequency: "3–4 razy w roku (kwartalnie)",
    details: "Obiekty gastronomiczne i hotelowe generują wysokie obciążenie cieplne i wilgotność, co przyspiesza zabrudzenie wymienników. Kwartalne przeglądy to standard w branży HoReCa, często wymagany przez sanepid.",
  },
  {
    icon: CalendarCheck,
    type: "Serwerownia / obiekt 24/7",
    frequency: "Co 2–3 miesiące",
    details: "Klimatyzacja pracująca bez przerwy wymaga najczęstszej konserwacji. Awaria w serwerowni oznacza ryzyko przegrzania sprzętu i utratę danych. Przeglądy profilaktyczne co 2–3 miesiące minimalizują to ryzyko.",
  },
];

export default async function SerwisPage({ params }: Props) {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location || !location.services.includes("serwis")) notFound();

  const brands = getAllBrands();
  const allSerwisLocations = getLocationsByService("serwis").filter((l) => l.slug !== location.slug);
  const serwisTestimonials = testimonials.filter((t) => t.service === "serwis").slice(0, 6);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Serwis", href: "/serwis" },
    { name: location.name },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Serwis klimatyzacji ${location.name}`,
    description: `Profesjonalny serwis, przegląd i naprawa klimatyzacji w ${location.name}. Czyszczenie filtrów, dezynfekcja, uzupełnianie czynnika chłodniczego. Serwisujemy Samsung, LG, Toshiba, Gree, Daikin, Haier i inne marki.`,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://pbac.pl/#localbusiness",
      name: "PBAC",
      telephone: "+48503151802",
    },
    areaServed: { "@type": "City", name: location.name },
    serviceType: "Serwis klimatyzacji",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PLN",
      lowPrice: 250,
      highPrice: 800,
      description: "Serwis jednego klimatyzatora ściennego od 250 PLN",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: `PBAC — Serwis klimatyzacji ${location.name}`,
    url: `https://pbac.pl/serwis/${location.slug}`,
    telephone: "+48503151802",
    email: "montaz@pbac.pl",
    areaServed: { "@type": "City", name: location.name },
    geo: { "@type": "GeoCoordinates", latitude: location.coordinates.lat, longitude: location.coordinates.lng },
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, bestRating: 5, reviewCount: serwisTestimonials.length || 10 },
  };

  const faqSchema = location.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[serviceSchema, localBusinessSchema, buildBreadcrumbSchema(breadcrumbItems), ...(faqSchema ? [faqSchema] : [])]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Settings className="w-5 h-5 text-white/50" />
              <span className="text-white/50 text-sm">Serwis klimatyzacji</span>
            </div>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Serwis klimatyzacji <AuroraText>{location.name}</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
              Oferujemy kompleksowy serwis klimatyzacji w {location.name}: okresowe przeglądy, czyszczenie i dezynfekcja filtrów, uzupełnianie czynnika chłodniczego, diagnostyka usterek oraz naprawy. Serwisujemy klimatyzatory wszystkich marek — Samsung, LG, Toshiba, Gree, Daikin, Haier i inne. Regularny serwis przedłuża żywotność urządzenia, obniża rachunki za prąd i zapewnia czyste powietrze w pomieszczeniu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+48503151802" className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90">
                <Phone className="w-4 h-4" />
                +48 503 151 802
              </a>
              <a href="/#wycena" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                Formularz wyceny
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <FadeIn key={stat.label} delay={idx * 0.1}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center shrink-0">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-montserrat text-2xl font-bold"><AuroraText>{stat.number}</AuroraText></div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURE IMAGE — serwis hero ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/images/serwis/serwis-hero.jpg" alt="Serwis klimatyzacji — technik PBAC podczas przeglądu" className="w-full h-64 sm:h-80 md:h-96 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 font-montserrat font-bold text-lg sm:text-xl">Kompleksowy serwis klimatyzacji</p>
                <p className="text-white/60 text-sm mt-1">Przegląd, czyszczenie, dezynfekcja i naprawa — wszystkie marki</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 1: Dlaczego regularny serwis jest niezbędny ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Dlaczego regularny <AuroraText>serwis klimatyzacji</AuroraText> jest niezbędny?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Klimatyzator to urządzenie, które wymaga okresowej konserwacji — tak jak samochód wymaga wymiany oleju i filtrów
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-6 text-white/70 leading-relaxed text-base">
              <p>
                Klimatyzator pracujący bez regularnego serwisu staje się zagrożeniem zdrowotnym i finansowym. Wewnątrz jednostki wewnętrznej panuje wilgotne, ciemne środowisko — idealne warunki do rozwoju bakterii, grzybów pleśniowych i drożdży. Badania Narodowego Instytutu Zdrowia Publicznego wskazują, że zaniedbane klimatyzatory mogą być siedliskiem Legionelli, Aspergillusa i Staphylococcusa, które rozpylane z nawiewem trafiają bezpośrednio do dróg oddechowych domowników. Objawy to chroniczny katar, kaszel, podrażnienie oczu, bóle głowy, a u osób z astmą — zaostrzenie choroby. Szczególnie narażone są dzieci, osoby starsze i alergicy.
              </p>
              <p>
                Aspekt finansowy jest równie istotny. Zabrudzone filtry i wymienniki ciepła zmuszają sprężarkę do intensywniejszej pracy, aby osiągnąć ustawioną temperaturę. Według danych Europejskiego Stowarzyszenia Producentów Klimatyzacji (EPEE), brudny klimatyzator zużywa o 20–30% więcej energii elektrycznej niż urządzenie po serwisie. Przy rocznym koszcie prądu za klimatyzację wynoszącym 400–800 zł, zaniedbanie serwisu oznacza przepłacanie 80–240 zł rocznie — kwota, która szybko przekracza koszt samego przeglądu.
              </p>
              <p>
                Żywotność klimatyzatora bez serwisu skraca się dramatycznie. Producenci projektują urządzenia na 10–15 lat eksploatacji, ale brak konserwacji redukuje ten czas do 5–7 lat. Zużyte łożyska wentylatorów, zatkane odpływy skroplin i niedobór czynnika chłodniczego prowadzą do awarii sprężarki — najdroższego komponentu, którego wymiana kosztuje 2000–5000 zł, czyli często więcej niż nowy klimatyzator.
              </p>
              <p>
                Warto pamiętać również o warunkach gwarancji. Większość producentów — Samsung, LG, Toshiba, Gree, Daikin — wymaga w regulaminie gwarancji corocznego przeglądu serwisowego wykonanego przez autoryzowaną firmę. Brak udokumentowanego serwisu może być podstawą do odmowy uznania reklamacji gwarancyjnej. Każdy nasz przegląd kończy się protokołem, który stanowi dowód wykonanej konserwacji.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Bug, text: "Bakterie i pleśń — zagrożenie zdrowotne przy braku dezynfekcji" },
                { icon: Zap, text: "20–30% wyższe rachunki za prąd przy brudnych filtrach" },
                { icon: Clock, text: "Żywotność skrócona z 15 do 5–7 lat bez konserwacji" },
                { icon: ShieldCheck, text: "Utrata gwarancji producenta przy braku corocznego serwisu" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <item.icon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 2: Co obejmuje przegląd — krok po kroku ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Co obejmuje przegląd <AuroraText>klimatyzacji</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Szczegółowy, 7-etapowy proces serwisowy — od diagnostyki elektrycznej po dezynfekcję. Każdy krok wykonywany przez certyfikowanego technika.
            </p>
          </FadeIn>

          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {serviceItems.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <item.icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="font-montserrat text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Czyszczenie image break */}
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-16">
              <img src="/images/serwis/klimatyzator-gree.webp" alt="Czyszczenie i dezynfekcja klimatyzatora podczas serwisu" className="w-full h-56 sm:h-72 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white/90 font-montserrat font-bold">Profesjonalne czyszczenie i dezynfekcja</p>
                <p className="text-white/60 text-xs mt-0.5">Mycie parownika, filtrów i odpływu skroplin preparatami biobójczymi</p>
              </div>
            </div>
          </FadeIn>

          {/* Detailed step-by-step */}
          <FadeIn className="mb-8">
            <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-center mb-2">
              7 etapów profesjonalnego serwisu
            </h3>
            <p className="text-white/50 text-center text-sm">Każdy etap wykonywany zgodnie z procedurami producenta urządzenia</p>
          </FadeIn>
          <div className="space-y-4 max-w-4xl mx-auto">
            {detailedServiceSteps.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.05}>
                <div className="flex gap-4 sm:gap-6 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-icon flex items-center justify-center">
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-white/30 font-mono">0{idx + 1}</span>
                      <h4 className="font-montserrat font-bold text-sm sm:text-base">{step.title}</h4>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Checklist */}
          <FadeIn delay={0.4}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Czyszczenie i dezynfekcja filtrów powietrza",
                "Mycie parownika preparatem pianotwórczym",
                "Mycie skraplacza myjką ciśnieniową",
                "Sprawdzenie ciśnienia czynnika chłodniczego",
                "Kontrola szczelności instalacji freonowej",
                "Czyszczenie i drożenie odpływu skroplin",
                "Diagnostyka parametrów pracy sprężarki",
                "Kontrola przyłączy elektrycznych i uziemienia",
                "Sprawdzenie pilota i funkcji sterowania WiFi",
                "Dezynfekcja środkiem biobójczym",
                "Pomiar temperatury nawiewu i powrotu",
                "Raport z przeglądu i zalecenia serwisowe",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 3: Kiedy wezwać serwis — sygnały ostrzegawcze ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Kiedy wezwać <AuroraText>serwis klimatyzacji</AuroraText> w {location.name}?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Nie czekaj na awarię. Te sygnały ostrzegawcze oznaczają, że Twój klimatyzator potrzebuje interwencji serwisowej.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {warningSignItems.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="font-montserrat text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.6}>
            <div className="mt-12 text-center">
              <p className="text-white/50 text-sm mb-4">Zauważyłeś któryś z tych symptomów? Nie zwlekaj — im szybciej zareagujesz, tym niższy koszt naprawy.</p>
              <a href="tel:+48503151802" className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90">
                <Phone className="w-4 h-4" />
                Zadzwoń: 503 151 802
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 4: Ile kosztuje serwis w [miasto] ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 bottom-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ile kosztuje serwis klimatyzacji w <AuroraText>{location.name}</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Transparentne ceny bez ukrytych kosztów. Dojazd w obrębie {location.name} wliczony w cenę usługi.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                icon: Settings,
                title: "Przegląd jednego klimatyzatora ściennego",
                price: "250–400 zł",
                details: "Pełny przegląd obejmujący czyszczenie filtrów, mycie parownika, dezynfekcję, kontrolę czynnika chłodniczego i raport serwisowy. Cena zależy od stopnia zabrudzenia i dostępności urządzenia.",
              },
              {
                icon: Wrench,
                title: "Serwis systemu multisplit (2–5 jednostek)",
                price: "od 200 zł / jednostka",
                details: "Przy serwisie wielu jednostek wewnętrznych z jednej wizyty oferujemy cenę degresywną. Im więcej jednostek, tym niższa stawka za każdą. Serwis jednostki zewnętrznej w cenie.",
              },
              {
                icon: AlertTriangle,
                title: "Wyjazd awaryjny (poza standardowym terminem)",
                price: "od 350 zł",
                details: "Awaria w weekend lub wieczorem? Oferujemy wyjazdy awaryjne z gwarantowanym czasem reakcji. Cena obejmuje dojazd, diagnostykę i drobną naprawę. Części zamienne wyceniane osobno.",
              },
              {
                icon: CalendarCheck,
                title: "Roczna umowa serwisowa",
                price: "od 450 zł / rok",
                details: "Umowa obejmuje dwa przeglądy rocznie (wiosna i jesień), priorytetowe terminy, 10% zniżki na naprawy i części zamienne. Idealna dla firm i właścicieli systemów multisplit.",
              },
              {
                icon: Thermometer,
                title: "Uzupełnianie czynnika chłodniczego",
                price: "150–350 zł",
                details: "Cena zależy od rodzaju czynnika (R32 jest tańszy niż R410A) i ilości wymaganego uzupełnienia. Przy uzupełnianiu czynnika zawsze wykonujemy test szczelności, aby wyeliminować przyczynę ubytku.",
              },
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div className="flex gap-4 sm:gap-6 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-icon flex items-center justify-center">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="font-montserrat font-bold text-sm sm:text-base">{item.title}</h3>
                      <span className="font-montserrat font-bold text-sm text-green-400 shrink-0">{item.price}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <CircleDollarSign className="w-8 h-8 text-white/40 mx-auto mb-3" />
              <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
                Dokładna wycena serwisu zależy od modelu klimatyzatora, stopnia zabrudzenia i zakresu prac. Skontaktuj się z nami, opisz urządzenie i sytuację — podamy cenę przed przyjazdem, bez niespodzianek. Dla stałych klientów i systemów wielojednostkowych oferujemy indywidualne rabaty.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 5: Serwisujemy wszystkie marki ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Serwisujemy klimatyzatory <AuroraText>wszystkich marek</AuroraText>
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Każda marka ma swoją specyfikę serwisową. Nasi technicy znają procedury producenta i dysponują odpowiednimi narzędziami diagnostycznymi.
            </p>
          </FadeIn>

          {/* Brand product images */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {["Samsung", "Mitsubishi", "Kaisai"].map((brand) => (
                <div key={brand} className="relative rounded-2xl overflow-hidden border border-white/10 gradient-primary p-8 flex items-center justify-center h-48">
                  <p className="text-white font-montserrat font-bold text-2xl">{brand}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {brandServiceNotes.map((brandInfo, idx) => (
              <FadeIn key={brandInfo.brand} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <BadgeCheck className="w-6 h-6 text-white/60" />
                      <div>
                        <h3 className="font-montserrat text-lg font-bold">{brandInfo.brand}</h3>
                        <span className="text-xs text-white/40">{brandInfo.model}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {brandInfo.notes.map((note) => (
                        <li key={note} className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <p className="mt-10 text-center text-white/50 text-sm max-w-2xl mx-auto">
              Serwisujemy również marki: Mitsubishi Electric, Mitsubishi Heavy, Fujitsu, Panasonic, Hisense, Midea, Kaisai, AUX, Rotenso, Vivax i inne. Jeśli Twojej marki nie ma na liście — zadzwoń, z dużym prawdopodobieństwem również ją obsługujemy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BRANDS MARQUEE ═══ */}
      <section className="py-12 overflow-hidden border-y border-white/10">
        <Marquee className="[--gap:2rem] [--duration:25s]" pauseOnHover>
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/produkty/${brand.slug}`} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition-colors shrink-0">
              <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain" loading="lazy" />
              <span className="font-montserrat font-bold text-white/70 hover:text-white transition-colors">{brand.name}</span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* ═══ SECTION 6: Jak często serwisować ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 bottom-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_70%,white,transparent)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Jak często serwisować <AuroraText>klimatyzację</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Częstotliwość serwisu zależy od intensywności użytkowania i rodzaju obiektu. Poniżej znajdziesz zalecenia dla różnych typów budynków.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {frequencyData.map((item, idx) => (
              <FadeIn key={item.type} delay={idx * 0.1}>
                <div className="flex gap-4 sm:gap-6 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-icon flex items-center justify-center">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <h3 className="font-montserrat font-bold text-sm sm:text-base">{item.type}</h3>
                      <span className="text-xs font-bold text-green-400 bg-green-400/10 rounded-full px-3 py-0.5 w-fit">{item.frequency}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-montserrat font-bold text-base mb-3">Kiedy najlepiej zaplanować serwis?</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Optymalny moment na przegląd klimatyzacji to wiosna — kwiecień lub maj — zanim nadejdą upały i klimatyzator zacznie pracować na pełnych obrotach. Serwis wykonany przed sezonem gwarantuje, że urządzenie będzie gotowe, gdy będzie najbardziej potrzebne. W {location.name} sezon klimatyzacyjny trwa zwykle od maja do września. Drugi dobry moment to jesień (październik–listopad), po intensywnym sezonie — przegląd jesienny pozwala oczyścić urządzenie z nagromadzonych zanieczyszczeń i przygotować je do trybu grzania w chłodniejszych miesiącach. Wiosną terminy serwisowe są krótsze niż w szczycie sezonu (czerwiec–sierpień), kiedy czas oczekiwania wydłuża się do 1–2 tygodni.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 7: Proces serwisu w [miasto] ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[50%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Jak wygląda serwis klimatyzacji w <AuroraText>{location.name}</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Od kontaktu do czystego, sprawnego klimatyzatora — cały proces krok po kroku
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: Phone,
                title: "Kontakt i umówienie terminu",
                desc: `Zadzwoń, napisz lub wypełnij formularz na stronie. Opisz model klimatyzatora i objawy (jeśli są). Umówimy termin serwisu w ${location.name} — zwykle w ciągu 2–5 dni roboczych, a w sezonie do 1–2 tygodni. Przed wizytą potwierdzimy godzinę telefonicznie.`,
              },
              {
                step: "02",
                icon: Wrench,
                title: "Przyjazd technika i diagnostyka",
                desc: "Technik przyjeżdża z kompletnym wyposażeniem: stacja manometryczna, mierniki elektryczne, środki czyszczące, preparat dezynfekujący, myjka ciśnieniowa. Zaczyna od oględzin i diagnostyki — sprawdza parametry pracy, ciśnienie czynnika, stan filtrów i odpływu skroplin.",
              },
              {
                step: "03",
                icon: Droplets,
                title: "Czyszczenie i konserwacja",
                desc: "Demontaż filtrów, mycie parownika preparatem pianotwórczym, czyszczenie lameli skraplacza myjką ciśnieniową, udrożnienie odpływu skroplin. Każdy element jest czyszczony zgodnie z procedurą producenta urządzenia. Prace trwają 60–90 minut na jedną jednostkę.",
              },
              {
                step: "04",
                icon: ShieldCheck,
                title: "Dezynfekcja i test końcowy",
                desc: "Po czyszczeniu dezynfekujemy parownik i kanały nawiewowe środkiem biobójczym. Uruchamiamy klimatyzator, mierzymy temperaturę nawiewu i przepływ powietrza. Sprawdzamy wszystkie tryby pracy — chłodzenie, grzanie, osuszanie, wentylację. Klient otrzymuje raport z przeglądu.",
              },
            ].map((item, idx) => (
              <FadeIn key={item.step} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                    <div className="flex gap-4 sm:gap-6">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-montserrat text-3xl font-bold text-white/5 text-center mt-1">{item.step}</div>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      {serwisTestimonials.length > 0 && (
        <section className="py-16 overflow-hidden">
          <FadeIn>
            <h2 className="font-montserrat text-3xl font-bold text-center mb-10 px-4">
              Opinie klientów z {location.name} i okolic
            </h2>
          </FadeIn>
          <Marquee className="[--gap:1.5rem] [--duration:35s]" pauseOnHover>
            {serwisTestimonials.map((t) => (
              <div key={t.name} className="w-80 shrink-0 rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.body}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-sm font-bold">{t.name}</span>
                  {t.location && <span className="text-xs text-white/40">{t.location}</span>}
                </div>
              </div>
            ))}
          </Marquee>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      {location.faq.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <StripedPattern
            width={12}
            height={12}
            className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                Najczęstsze pytania — serwis klimatyzacji {location.name}
              </h2>
              <p className="text-white/60">Odpowiedzi na pytania klientów z {location.name} i okolic</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl border border-white/10 p-2">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    {location.faq.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border-white/10 bg-white/5 rounded-xl px-6">
                        <AccordionTrigger className="text-left font-montserrat font-bold text-sm sm:text-base py-5 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/60 text-sm leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ OTHER LOCATIONS ═══ */}
      {allSerwisLocations.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-2xl font-bold mb-8">
                Serwis klimatyzacji w innych miastach
              </h2>
            </FadeIn>
            <div className="flex flex-wrap gap-3">
              {allSerwisLocations.map((l) => (
                <Link key={l.slug} href={`/serwis/${l.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/produkty", label: "Katalog klimatyzatorów", desc: "Pełna oferta produktów" },
              { href: "/blog", label: "Poradnik klimatyzacyjny", desc: "Wiedza o klimatyzacji" },
              { href: `/montaz/${location.slug}`, label: `Montaż w ${location.name}`, desc: "Profesjonalna instalacja" },
            ].map((link) => (
              <FadeIn key={link.href}>
                <Link href={link.href} className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors">
                  <div className="flex-1">
                    <div className="font-montserrat font-bold text-sm mb-1">{link.label}</div>
                    <div className="text-xs text-white/40">{link.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="gradient-primary rounded-2xl p-10 md:p-14 text-center">
              <Settings className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                Umów serwis klimatyzacji w {location.name}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Zadzwoń lub napisz — umówimy dogodny termin. Pełny przegląd z dezynfekcją od 250 zł.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+48503151802" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-10 py-4 font-bold text-sm hover:bg-white/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  +48 503 151 802
                </a>
                <a href="/#wycena" className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-10 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                  Formularz wyceny online
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PricingTable />

      <Footer />
    </main>
  );
}
