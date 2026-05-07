import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StickyPhone from "@/components/sticky-phone";
import {
  Phone,
  Star,
  ArrowRight,
  CheckCircle2,
  Plus,
  MapPin,
  Snowflake,
  Thermometer,
  Volume2,
  Wallet,
  Leaf,
  Smartphone,
  Users,
  Award,
  Shield,
  ShieldCheck,
  Zap,
  BadgeCheck,
} from "lucide-react";

const CalculatorSection = dynamic(
  () => import("@/components/calculator-section")
);
const LatestBlogSection = dynamic(
  () => import("@/components/latest-blog-section")
);
const ContactSection = dynamic(() => import("@/components/contact-section"));

export const revalidate = 60;  // refresh CMS data on demand within 60s for live preview

export const metadata: Metadata = {
  title: "PlayAir — Klimatyzacja Pruszków i okolice | Partner PBAC",
  description:
    "PlayAir — partner PBAC. Klimatyzacja, pompy ciepła i rekuperacja dla Pruszkowa oraz południowo-zachodniej Warszawy. Lokalna ekipa, zaplecze PBAC, darmowy pomiar.",
  alternates: { canonical: "/playair" },
  openGraph: {
    title: "PlayAir — Klimatyzacja Pruszków | Partner PBAC",
    description:
      "Lokalny partner PBAC dla Pruszkowa i okolic. Montaż klimatyzacji, pomp ciepła i rekuperacji.",
    type: "website",
    url: "https://pbac.pl/playair",
  },
};

interface Service {
  n: string;
  t: string;
  d: string;
  tags: string[];
}

interface Benefit {
  icon: typeof Snowflake;
  title: string;
  description: string;
}

interface Stat {
  icon: typeof Users;
  number: string;
  label: string;
  description: string;
}

interface Certificate {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}

interface ProcessStep {
  d: string;
  t: string;
  x: string;
}

interface PricingTier {
  tier: string;
  price: string;
  desc: string;
  feats: string[];
  featured: boolean;
}

interface Review {
  q: string;
  n: string;
  l: string;
}

interface Faq {
  q: string;
  a: string;
}

const PHONE_NUMBER = "+48 692 981 431";
const PHONE_HREF = "tel:+48692981431";

const heroStats: Array<[string, string]> = [
  ["847", "montaży"],
  ["< 60 min", "dojazd"],
  ["5 lat", "gwarancji"],
  ["10+", "marek"],
  ["24 h", "wycena"],
];

const services: Service[] = [
  {
    n: "01",
    t: "Montaż klimatyzacji",
    d: "Splity, multisplity, kasetony. Dobór po ekspozycji i metrażu — nie po katalogu.",
    tags: ["Samsung", "LG", "Daikin", "Gree", "Toshiba"],
  },
  {
    n: "02",
    t: "Pompy ciepła",
    d: "Powietrze-woda dla domów jednorodzinnych. Współpraca z elektrykami, hydraulikami i projektantami.",
    tags: ["Samsung", "Mitsubishi Heavy", "Fujitsu", "Neoheat"],
  },
  {
    n: "03",
    t: "Serwis i przeglądy",
    d: "Wszystkie marki, wszystkie urządzenia. Umowy SLA do 24 h reakcji.",
    tags: ["Czyszczenie", "Dezynfekcja", "Uzupełnianie czynnika", "SLA"],
  },
  {
    n: "04",
    t: "Rekuperacja",
    d: "Pełny projekt + montaż centrali wentylacyjnej w domu. Świeże powietrze bez otwierania okien.",
    tags: ["Projekt", "Montaż", "Kanały", "Odzysk ciepła 90%"],
  },
  {
    n: "05",
    t: "Doradztwo i wycena",
    d: "Pomiar u Ciebie, trzy warianty ofert, specyfikacja bez ukrytych kosztów.",
    tags: ["Wizja lokalna", "Fotoinwentaryzacja", "3 warianty", "Bez ukrytych opłat"],
  },
];

const benefits: Benefit[] = [
  {
    icon: Snowflake,
    title: "Chłodzenie",
    description:
      "Skuteczne chłodzenie pomieszczeń nawet w najgorętsze dni — komfort termiczny przez cały rok.",
  },
  {
    icon: Thermometer,
    title: "Grzanie zimą",
    description:
      "Klimatyzatory z pompą ciepła ogrzewają dom do -15 °C temperatury zewnętrznej.",
  },
  {
    icon: Volume2,
    title: "Cisza",
    description:
      "Poziom hałasu od 16 dB — ciszej niż szept. Idealne do sypialni i biura.",
  },
  {
    icon: Wallet,
    title: "Oszczędność",
    description:
      "Klasa energetyczna A+++ — nawet 3× tańsze ogrzewanie niż tradycyjne metody.",
  },
  {
    icon: Leaf,
    title: "Filtracja",
    description:
      "Filtry PM1.0, jonizacja i Cold Plasma oczyszczają powietrze z kurzu i alergenów.",
  },
  {
    icon: Smartphone,
    title: "Smart sterowanie",
    description:
      "WiFi + aplikacja — włącz chłodzenie w drodze do domu albo głosem przez asystenta.",
  },
];

const whyStats: Stat[] = [
  {
    icon: Users,
    number: "847",
    label: "Zrealizowanych montaży",
    description: "Setki zadowolonych klientów w Pruszkowie i okolicach",
  },
  {
    icon: Award,
    number: "10+",
    label: "Marek w ofercie",
    description: "Samsung, LG, Daikin, Gree, Mitsubishi, Toshiba i inne",
  },
  {
    icon: MapPin,
    number: "13",
    label: "Miejscowości w strefie",
    description: "Pruszków + 12 okolicznych miast — dojazd pod 60 minut",
  },
  {
    icon: Shield,
    number: "5 lat",
    label: "Gwarancji na montaż",
    description: "Pełna gwarancja producenta + osobna gwarancja PlayAir",
  },
];

const certificates: Certificate[] = [
  {
    icon: ShieldCheck,
    title: "Certyfikat F-GAZ",
    description:
      "Uprawnienia do obsługi fluorowanych gazów cieplarnianych — nr PL-FG-022345.",
  },
  {
    icon: Zap,
    title: "Uprawnienia SEP",
    description:
      "Kwalifikacje elektryczne do 1 kV — bezpieczne podłączenie zasilania.",
  },
  {
    icon: Award,
    title: "Autoryzowani instalatorzy",
    description:
      "Oficjalni instalatorzy Samsung, LG, Daikin oraz Mitsubishi Heavy.",
  },
  {
    icon: BadgeCheck,
    title: "Gwarancja partnerska PBAC",
    description:
      "Dodatkowa gwarancja na instalację do 5 lat w ramach współpracy z PBAC.",
  },
];

const zoneCities = [
  "Pruszków",
  "Piastów",
  "Ursus",
  "Włochy",
  "Raszyn",
  "Michałowice",
  "Nadarzyn",
  "Janki",
  "Piaseczno",
  "Ożarów M.",
  "Komorów",
  "Brwinów",
];

const mapPins: Array<[number, number, string, boolean?]> = [
  [170, 190, "Pruszków", true],
  [210, 170, "Piastów", false],
  [240, 180, "Ursus", false],
  [265, 200, "Włochy", false],
  [215, 225, "Raszyn", false],
  [150, 150, "Michałowice", false],
  [110, 200, "Nadarzyn", false],
  [260, 240, "Janki", false],
  [250, 275, "Piaseczno", false],
  [100, 120, "Ożarów", false],
];

const processSteps: ProcessStep[] = [
  {
    d: "Dzień 0",
    t: "Telefon lub formularz",
    x: "Odpowiadamy w ciągu 60 minut. Krótkie pytania o metraż, ekspozycję, potrzeby.",
  },
  {
    d: "Dzień 1–2",
    t: "Pomiar u Ciebie",
    x: "Darmowy dojazd. 45 minut. Fotoinwentaryzacja, pytania techniczne, porada.",
  },
  {
    d: "Dzień 3",
    t: "Trzy oferty",
    x: "Budget / Pro / Premium. Jasna specyfikacja, ceny, terminy. Zero ciśnienia.",
  },
  {
    d: "Dzień 5–7",
    t: "Montaż i start",
    x: "Wybrany termin, osłony na podłogi, 1–2 dni robocze, porządek na koniec.",
  },
  {
    d: "Po",
    t: "Serwis i opieka",
    x: "Rok gwarancji, umowa SLA, przegląd roczny. Jeden telefon, jedna ekipa.",
  },
];

const pricingTiers: PricingTier[] = [
  {
    tier: "Budget",
    price: "4 200",
    desc: "Pomieszczenie do 35 m², marka ekonomiczna.",
    feats: ["Split 2.5–3.5 kW", "Pompa ciepła", "3 lata gwarancji", "Montaż 1 dzień"],
    featured: false,
  },
  {
    tier: "Pro",
    price: "6 800",
    desc: "Samsung, LG, Gree z WiFi. Najczęstszy wybór.",
    feats: [
      "Split / multi 3.5–5 kW",
      "Sterowanie z app",
      "5 lat gwarancji",
      "Tryb 19 dB",
      "Filtr antyalergiczny",
    ],
    featured: true,
  },
  {
    tier: "Premium",
    price: "11 400",
    desc: "Daikin, Mitsubishi. Cicho, estetycznie, AI.",
    feats: [
      "Split / multi 5–7 kW",
      "AI adaptive",
      "10 lat gwarancji",
      "Design obudowa",
      "Serwis 24h priorytet",
    ],
    featured: false,
  },
];

const reviews: Review[] = [
  {
    q: "Po 3 latach użytkowania klimatyzacja zaczęła dziwnie pachnieć. Serwis przyjechał następnego dnia, wymienił filtry i wykonał dezynfekcję. Problem zniknął od razu.",
    n: "Ewa Szymańska",
    l: "Pruszków · serwis",
  },
  {
    q: "Zamontowali mi dwa klimatyzatory LG ArtCool w domu jednorodzinnym. Fachowe doradztwo przy doborze mocy, szybki termin realizacji. Cena zgodna z wyceną, bez niespodzianek.",
    n: "Anna Wiśniewska",
    l: "Piaseczno · dom",
  },
  {
    q: "Montaż pompy ciepła i klimatyzacji w nowym domu. Ogarnęli wszystko kompleksowo — dobór urządzeń, instalacja hydrauliczna i elektryczna, uruchomienie. Gorąco polecam!",
    n: "Robert Jabłoński",
    l: "Grodzisk Maz. · dom",
  },
];

const faqs: Faq[] = [
  {
    q: "Ile kosztuje montaż klimatyzacji?",
    a: "Orientacyjnie od 4 200 zł za montaż w jednym pomieszczeniu. Ostateczna cena po darmowym pomiarze u Ciebie.",
  },
  {
    q: "Ile trwa montaż?",
    a: "1 dzień roboczy dla pojedynczego splita, 2 dni dla multisplita. Pompa ciepła — 2–4 dni z podłączeniem hydraulicznym.",
  },
  {
    q: "Jaką markę polecacie?",
    a: "Zależy od budżetu i priorytetów. Samsung / LG w klasie Pro, Daikin / Mitsubishi w Premium. Na wizycie pokażemy konkrety.",
  },
  {
    q: "Czy obsługujecie moją miejscowość?",
    a: "Pruszków, Piastów, Ursus, Włochy, Raszyn, Michałowice, Nadarzyn, Janki, Piaseczno, Ożarów Maz., Komorów, Brwinów, Grodzisk Maz.",
  },
  {
    q: "Jak wygląda gwarancja?",
    a: "3–10 lat na urządzenie (w zależności od klasy), 5 lat na montaż. Przeglądy coroczne przedłużają gwarancję producenta.",
  },
];

const founderAntiPromises = [
  {
    title: "Nieterminowość",
    text: "W PlayAir traktujemy terminy jak świętość. Pomiar w ciągu 48 h, oferta w 3 dni, montaż w terminie z kalendarza — nie z widzimisię. Jeśli coś ma się przesunąć, dzwonimy pierwsi i tłumaczymy dlaczego.",
  },
  {
    title: "Chodzenie na skróty",
    text: "Montujemy tak, jakbyśmy montowali sobie. Trasy rurek prowadzone estetycznie, wieszaki na zewnątrz w pionie, porządna izolacja termiczna, odprowadzenie skroplin bez kompromisów. Tanie obejścia wracają po roku — my wracamy tylko na przegląd.",
  },
];

export default function PlayAirPage() {
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Partnerzy", href: "/playair" },
    { name: "PlayAir — Pruszków" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PlayAir — klimatyzacja Pruszków i okolice",
    description:
      "Lokalny partner PBAC dla Pruszkowa i południowo-zachodniej Warszawy: montaż klimatyzacji, pomp ciepła i rekuperacji.",
    provider: { "@id": "https://pbac.pl/#organization" },
    areaServed: { "@type": "City", name: "Pruszków" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PLN",
      lowPrice: 4200,
      highPrice: 15000,
    },
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <JsonLd data={[serviceSchema, buildBreadcrumbSchema(breadcrumbItems)]} />

      {/* ═══ PLAYAIR HEADER ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/playair"
            className="flex items-center gap-3 group"
            aria-label="PlayAir Pruszków — strona główna"
          >
            <Image
              src="/playair/assets/playair-logo.svg"
              alt="PlayAir"
              width={120}
              height={40}
              priority
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline-block h-5 w-px bg-white/15" />
            <span className="hidden sm:inline-block text-[10px] tracking-[0.22em] uppercase text-white/55 group-hover:text-white/80 transition-colors">
              Pruszków
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-white/65">
            <a href="#uslugi" className="hover:text-white transition-colors">
              Usługi
            </a>
            <a href="#strefa" className="hover:text-white transition-colors">
              Strefa
            </a>
            <a href="#cennik" className="hover:text-white transition-colors">
              Cennik
            </a>
            <a href="#opinie" className="hover:text-white transition-colors">
              Opinie
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center text-[10px] tracking-[0.18em] uppercase text-white/40 hover:text-white/80 transition-colors"
            >
              Partner&nbsp;PBAC
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full gradient-button text-white px-4 sm:px-5 h-9 text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
              aria-label={`Zadzwoń: ${PHONE_NUMBER}`}
            >
              <Phone className="size-3.5" />
              <span className="hidden sm:inline">{PHONE_NUMBER}</span>
              <span className="sm:hidden">Zadzwoń</span>
            </a>
          </div>
        </div>
      </header>

      {/* ═══ HERO — SPLIT ═══ */}
      <section className="relative pt-28 pb-24 border-b border-white/5 overflow-hidden">
        {/* Decorative gradient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-32 size-[520px] rounded-full blur-[140px] opacity-30 gradient-primary"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 -right-24 size-[420px] rounded-full blur-[130px] opacity-25 gradient-icon"
        />
        <DotPattern
          width={24}
          height={24}
          cr={1}
          className="absolute inset-0 fill-white/[0.025] [mask-image:radial-gradient(900px_circle_at_50%_20%,#ffffff66,transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center mt-8 lg:min-h-[560px]">
            {/* Left — big type */}
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/playair/assets/playair-logo.svg"
                  alt="PlayAir"
                  width={158}
                  height={77}
                  priority
                  className="h-11 w-auto"
                />
                <div className="h-8 w-px bg-white/15" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">
                  Pruszków
                </span>
              </div>
              <div className="inline-flex items-center gap-3 pl-2.5 pr-3.5 py-2 border border-white/10 rounded-full text-xs text-white/70 mb-8 bg-white/[0.03] backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" />
                <span>Wolne terminy w tym tygodniu · Pruszków + 12 okolic</span>
              </div>

              <h1 className="font-montserrat font-bold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Klimat,
                <br />
                <AuroraText className="font-montserrat">który grzeje.</AuroraText>
                <br />
                <span className="text-white/60 font-medium text-[0.55em] tracking-[-0.02em]">
                  Dosłownie.
                </span>
              </h1>

              <p className="mt-8 text-lg text-white/65 leading-relaxed max-w-[520px]">
                PlayAir — klimatyzacja, pompy ciepła i rekuperacja dla domów i mieszkań
                na południu i zachodzie Warszawy. Lokalny zespół. Zaplecze partnerskie{" "}
                <span className="text-white/90 font-semibold">PBAC</span>.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={PHONE_HREF}
                  aria-label={`Zadzwoń: ${PHONE_NUMBER}`}
                  className="group inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40 transition-colors"
                >
                  <span className="size-9 rounded-full gradient-icon flex items-center justify-center">
                    <Phone className="size-4 text-white" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/50">
                      Zadzwoń teraz
                    </span>
                    <span className="font-montserrat text-base font-bold tracking-tight">
                      {PHONE_NUMBER}
                    </span>
                  </span>
                </a>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                    Partner
                  </span>
                  <Link
                    href="/"
                    className="px-4 py-2 border border-white/15 rounded-md font-montserrat text-sm font-bold tracking-widest hover:border-white/30 hover:bg-white/5 transition-colors"
                  >
                    PBAC
                  </Link>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-white/70">
                    4.9 · 180 opinii Google
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Right — form card */}
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="gradient-primary absolute -inset-5 blur-[60px] opacity-30 rounded-[40px] pointer-events-none" />
                <div className="relative rounded-2xl border border-white/10 p-2">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-xl p-8">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                      Pomiar u Ciebie
                    </div>
                    <h3 className="font-montserrat text-2xl font-bold tracking-tight mb-6">
                      Darmowy, bez zobowiązań
                    </h3>

                    <form
                      className="flex flex-col gap-3.5"
                      action="https://formsubmit.co/biuro@pbac.pl"
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="_subject"
                        value="PlayAir Pruszków — zgłoszenie z formularza"
                      />
                      <input
                        type="hidden"
                        name="_next"
                        value="https://pbac.pl/playair?sent=1"
                      />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                      />
                      <div>
                        <Label
                          htmlFor="pa-name"
                          className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block"
                        >
                          Imię
                        </Label>
                        <Input
                          id="pa-name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Jan Kowalski"
                          className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <Label
                            htmlFor="pa-phone"
                            className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block"
                          >
                            Telefon
                          </Label>
                          <Input
                            id="pa-phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            placeholder="+48 692 981 431"
                            className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="pa-city"
                            className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block"
                          >
                            Miasto
                          </Label>
                          <select
                            id="pa-city"
                            name="city"
                            defaultValue="Pruszków"
                            className="bg-white/[0.05] border border-white/10 text-white h-11 w-full rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                          >
                            {zoneCities.map((c) => (
                              <option key={c} value={c} className="bg-black">
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="pa-email"
                          className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block"
                        >
                          Email <span className="text-white/30">(opcjonalnie)</span>
                        </Label>
                        <Input
                          id="pa-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jan@example.com"
                          className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
                          Usługa
                        </Label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            "Klimatyzacja",
                            "Pompa ciepła",
                            "Serwis",
                            "Rekuperacja",
                          ].map((s, i) => (
                            <label
                              key={s}
                              className="relative cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="service"
                                value={s}
                                defaultChecked={i === 0}
                                className="peer sr-only"
                              />
                              <span className="block text-center text-xs font-medium px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-white/90 hover:bg-white/10 peer-checked:gradient-primary peer-checked:border-transparent peer-checked:text-white transition-colors">
                                {s}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="gradient-button mt-2 h-12 rounded-lg text-white text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90"
                      >
                        Umów wizytę →
                      </Button>
                      <p className="text-[11px] text-white/40 text-center">
                        Odpowiadamy w ciągu 60 minut w godz. pracy
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Ticker stats */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-5 gap-6">
            {heroStats.map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2.5">
                <div className="font-montserrat text-2xl font-bold tracking-tight">
                  {n}
                </div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-white/40">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USŁUGI — EDITORIAL LIST ═══ */}
      <section id="uslugi" className="relative py-28 overflow-hidden scroll-mt-20">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] text-white/20 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_2fr] gap-12 mb-16">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                § 01
              </div>
              <div className="font-montserrat text-sm font-bold tracking-[0.1em] uppercase text-white/60">
                Usługi
              </div>
            </div>
            <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1]">
              Robimy pięć rzeczy.
              <br />
              <span className="text-white/40">I robimy je porządnie.</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {services.map((s, i) => (
              <Link
                key={s.n}
                href="/klimatyzacja"
                className={`group grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_360px_60px] gap-6 md:gap-10 items-center py-8 border-b border-white/10 ${
                  i === 0 ? "border-t border-white/10" : ""
                } hover:bg-white/[0.02] transition-colors -mx-4 px-4`}
              >
                <div className="font-montserrat text-sm font-bold tracking-wider text-white/30">
                  {s.n} /
                </div>
                <div>
                  <div className="font-montserrat text-2xl md:text-3xl font-bold tracking-tight mb-1.5">
                    {s.t}
                  </div>
                  <div className="text-sm text-white/55 leading-relaxed">{s.d}</div>
                </div>
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 border border-white/10 rounded-full text-[11px] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowRight className="size-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto md:ml-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS — DLACZEGO KLIMATYZACJA ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/[0.02] [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              Dlaczego <AuroraText>klimatyzacja</AuroraText>?
            </h2>
            <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
              Sześć konkretnych powodów, dla których warto zainwestować w nowoczesny
              klimatyzator — bez marketingowego ściemniania.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <FadeIn
                  key={b.title}
                  delay={i * 0.08}
                  className="relative rounded-2xl border border-white/10 p-2"
                >
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative rounded-xl bg-white/[0.06] backdrop-blur-md p-6 h-full">
                    <div className="mb-4 size-12 rounded-xl gradient-icon flex items-center justify-center">
                      <Icon className="size-6 text-white" />
                    </div>
                    <h3 className="font-montserrat text-xl font-bold mb-2">
                      {b.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STREFA — LOCAL HERO ═══ */}
      <section id="strefa" className="relative py-28 overflow-hidden scroll-mt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A337F]/15 to-transparent pointer-events-none"
        />
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[70%] text-white/15 [mask-image:radial-gradient(800px_circle_at_30%_30%,white,transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — typography */}
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                § 02 — Strefa obsługi
              </div>
              <h2 className="font-montserrat font-bold tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] mb-4">
                <AuroraText className="font-montserrat">Pruszków</AuroraText>
                <br />
                <span className="text-white/30 font-medium text-[0.32em] tracking-tight">
                  + południowy-zachód Warszawy
                </span>
              </h2>
              <p className="text-[15px] text-white/65 leading-[1.7] mb-8 max-w-[480px]">
                Mieszkamy i pracujemy tam, gdzie Ty. Na pomiar wpadamy w tym tygodniu,
                na awaryjny serwis pod 24 h. Bez trasy przez całe miasto.
              </p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="font-montserrat text-5xl font-bold tracking-tight">
                    <AuroraText className="font-montserrat">13</AuroraText>
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    miejscowości w strefie
                  </div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="font-montserrat text-5xl font-bold tracking-tight">
                    <AuroraText className="font-montserrat">25 km</AuroraText>
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    promień bazy · Pruszków
                  </div>
                </div>
              </div>
            </div>

            {/* Right — SVG map + city grid */}
            <div>
              <div className="relative rounded-2xl border border-white/10 p-2">
                <GlowingEffect spread={40} glow proximity={64} />
                <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[11px] tracking-[0.15em] uppercase text-white/50">
                      Mapa strefy
                    </div>
                    <div className="flex gap-2.5 text-[10px] text-white/50">
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#B31853]" />
                        Baza
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#3D5EFF]" />
                        Strefa
                      </span>
                    </div>
                  </div>
                  <svg viewBox="0 0 500 340" className="w-full block">
                    <defs>
                      <radialGradient id="pbHeatPlayair" cx="0.35" cy="0.5">
                        <stop offset="0%" stopColor="#B31853" stopOpacity="0.45" />
                        <stop offset="70%" stopColor="#3D5EFF" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#3D5EFF" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none">
                      <path d="M0 170 Q150 150 280 170 T500 160" />
                      <path d="M170 0 Q180 150 200 180 T220 340" />
                      <path d="M0 80 Q150 200 500 250" strokeDasharray="2 4" />
                      <path d="M0 260 Q200 220 500 280" strokeDasharray="2 4" />
                    </g>
                    <path
                      d="M280 80 Q360 100 380 180 Q400 250 340 290 Q260 310 200 280 Q160 250 180 190 Q200 100 280 80 Z"
                      fill="rgba(255,255,255,0.02)"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                    />
                    <text
                      x="290"
                      y="170"
                      fill="rgba(255,255,255,0.3)"
                      fontSize="10"
                      fontFamily="Montserrat"
                      letterSpacing="2"
                    >
                      WARSZAWA
                    </text>
                    <circle cx="170" cy="190" r="140" fill="url(#pbHeatPlayair)" />
                    <circle
                      cx="170"
                      cy="190"
                      r="140"
                      fill="none"
                      stroke="#3D5EFF"
                      strokeWidth="1"
                      strokeDasharray="3 5"
                      opacity="0.5"
                    />
                    {mapPins.map(([x, y, n, main]) => (
                      <g key={n}>
                        <circle
                          cx={x}
                          cy={y}
                          r={main ? 7 : 3.5}
                          fill={main ? "#B31853" : "#3D5EFF"}
                        />
                        {main && (
                          <circle
                            cx={x}
                            cy={y}
                            r="14"
                            fill="none"
                            stroke="#B31853"
                            strokeWidth="1"
                            opacity="0.6"
                          >
                            <animate
                              attributeName="r"
                              values="7;24;7"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.8;0;0.8"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        <text
                          x={x + 10}
                          y={y + 3}
                          fill={main ? "#fff" : "rgba(255,255,255,0.7)"}
                          fontSize={main ? 13 : 10}
                          fontFamily="Montserrat"
                          fontWeight={main ? 700 : 500}
                        >
                          {n}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {zoneCities.map((m) => (
                  <div
                    key={m}
                    className="text-xs text-white/60 px-3 py-1.5 flex items-center gap-2"
                  >
                    <span className="size-1 rounded-full bg-[#B31853]" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY PLAYAIR — STATS CARDS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/[0.02] [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
              Dlaczego <AuroraText>PlayAir</AuroraText>?
            </h2>
            <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
              Lokalny zespół z zapleczem PBAC — liczby, które budują zaufanie w okolicach
              Pruszkowa.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <FadeIn key={stat.label} delay={idx * 0.1}>
                  <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                    <GlowingEffect spread={40} glow proximity={64} />
                    <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 text-center h-full flex flex-col">
                      <div className="size-12 rounded-xl gradient-icon flex items-center justify-center mx-auto mb-4">
                        <Icon className="size-6 text-white" />
                      </div>
                      <div className="font-montserrat text-3xl font-bold mb-1">
                        <AuroraText>{stat.number}</AuroraText>
                      </div>
                      <div className="font-montserrat text-sm font-bold text-white/80 mb-2">
                        {stat.label}
                      </div>
                      <p className="text-xs text-white/50">{stat.description}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CALCULATOR (PBAC home) ═══ */}
      <CalculatorSection />

      {/* ═══ PROCES — TIMELINE ═══ */}
      <section className="relative py-28 overflow-hidden">
        <DotPattern
          width={24}
          height={24}
          cr={1}
          className="absolute inset-x-0 top-0 h-[80%] fill-white/[0.018] [mask-image:radial-gradient(700px_circle_at_30%_40%,white,transparent)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                § 03 — Proces
              </div>
              <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">
                Od telefonu do chłodnego powietrza —{" "}
                <AuroraText className="font-montserrat">siedem dni.</AuroraText>
              </h2>
            </div>
            <p className="text-sm text-white/55 max-w-[320px] leading-relaxed">
              Pięć kroków, jeden zespół, jeden telefon. Bez przekazywania między
              działami.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 top-[26px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {processSteps.map((s, i) => (
                <FadeIn key={s.t} delay={i * 0.06}>
                  <div className="relative h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative size-[52px] shrink-0 rounded-full gradient-primary flex items-center justify-center font-montserrat text-lg font-bold ring-4 ring-black">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold">
                        {s.d}
                      </div>
                    </div>
                    <div className="relative rounded-2xl border border-white/10 p-2 h-[calc(100%-72px)]">
                      <GlowingEffect spread={30} glow proximity={48} />
                      <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-md p-5 h-full">
                        <h3 className="font-montserrat text-lg font-bold tracking-tight mb-2 leading-tight">
                          {s.t}
                        </h3>
                        <p className="text-[13px] text-white/60 leading-relaxed">
                          {s.x}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CENNIK — EDITORIAL TABLE ═══ */}
      <section id="cennik" className="relative py-28 bg-white/[0.02] overflow-hidden border-y border-white/5 scroll-mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(179,24,83,0.1),transparent_60%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                § 04 — Cennik
              </div>
              <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">
                Trzy klasy.
                <br />
                <AuroraText className="font-montserrat">
                  Jedna jakość montażu.
                </AuroraText>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-[360px] leading-relaxed">
              Ceny orientacyjne dla jednego pomieszczenia do 40 m². Ostateczna cena po
              darmowym pomiarze.
            </p>
          </div>

          <div className="grid md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
            {pricingTiers.map((p, i) => (
              <div
                key={p.tier}
                className={`relative p-10 ${
                  i < 2 ? "md:border-r md:border-white/10" : ""
                } ${
                  i < pricingTiers.length - 1
                    ? "border-b md:border-b-0 border-white/10"
                    : ""
                } ${p.featured ? "gradient-primary" : ""}`}
              >
                {p.featured && (
                  <div className="absolute top-6 right-6 text-[10px] font-bold font-montserrat tracking-[0.15em] uppercase px-2.5 py-1 bg-black/35 rounded-full">
                    Polecane
                  </div>
                )}
                <div className="font-montserrat text-[11px] font-bold tracking-[0.2em] uppercase opacity-70 mb-5">
                  {p.tier}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm opacity-70">od</span>
                  <span className="font-montserrat text-5xl md:text-[3.5rem] font-bold tracking-[-0.04em]">
                    {p.price}
                  </span>
                  <span className="text-lg opacity-70">zł</span>
                </div>
                <p
                  className={`text-[13px] leading-relaxed mb-7 ${
                    p.featured ? "text-white/85" : "text-white/55"
                  }`}
                >
                  {p.desc}
                </p>
                <div className="h-px bg-white/15 mb-5" />
                <ul className="flex flex-col gap-2.5">
                  {p.feats.map((f) => (
                    <li
                      key={f}
                      className={`text-[13px] flex items-center gap-2.5 ${
                        p.featured ? "text-white/90" : "text-white/75"
                      }`}
                    >
                      <span className="w-3 h-px bg-current opacity-40" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    p.featured
                      ? "mt-8 w-full h-11 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-bold uppercase tracking-[0.1em]"
                      : "mt-8 w-full h-11 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-[0.1em]"
                  }
                  variant={p.featured ? "default" : "outline"}
                >
                  Wybierz →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER PROMISE ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/[0.02] [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
            <FadeIn direction="left" className="lg:col-span-7">
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                § 07 — Lokalny zespół
              </div>
              <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] mb-6">
                Nasza <AuroraText className="font-montserrat">obietnica</AuroraText>.
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                Jesteśmy z Pruszkowa. PlayAir powstał z myślą o lokalnej
                społeczności — z certyfikowanym zapleczem instalacyjnym
                i serwisowym{" "}
                <span className="text-white/90 font-semibold">PBAC</span>. Nie
                jesteśmy kolejnym adresem na trasie — jesteśmy sąsiadami. Kiedy
                coś nie działa, odbieramy telefon. Kiedy kończymy montaż,
                sprzątamy jak u siebie.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40 transition-colors"
                >
                  <Phone className="size-4 text-white/80" />
                  <span className="font-montserrat font-bold text-sm">
                    {PHONE_NUMBER}
                  </span>
                </a>
                <span className="text-sm text-white/55">
                  Pomiar w 48 h · darmowy dojazd
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="lg:col-span-5">
              <div className="relative">
                <div className="gradient-primary absolute -inset-6 blur-[80px] opacity-25 rounded-[40px] pointer-events-none" />
                <div className="relative rounded-2xl border border-white/10 p-2">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-xl p-7">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-montserrat text-6xl font-bold tracking-[-0.04em]">
                        <AuroraText className="font-montserrat">5 lat</AuroraText>
                      </span>
                      <span className="text-sm text-white/55">
                        gwarancji na montaż
                      </span>
                    </div>
                    <p className="text-[13px] text-white/60 leading-relaxed mb-6">
                      Pełna gwarancja producenta plus dodatkowa gwarancja
                      partnerska PBAC na każdą instalację PlayAir.
                    </p>
                    <div className="h-px bg-white/10 mb-5" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="size-4 text-white/70 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold tracking-wider uppercase text-white/85">
                            F-GAZ
                          </div>
                          <div className="text-[11px] text-white/45 leading-snug">
                            Certyfikat instalatora
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Zap className="size-4 text-white/70 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold tracking-wider uppercase text-white/85">
                            SEP do 1 kV
                          </div>
                          <div className="text-[11px] text-white/45 leading-snug">
                            Uprawnienia elektryczne
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Award className="size-4 text-white/70 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold tracking-wider uppercase text-white/85">
                            Autoryzacje
                          </div>
                          <div className="text-[11px] text-white/45 leading-snug">
                            Samsung · LG · Daikin · MHI
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BadgeCheck className="size-4 text-white/70 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold tracking-wider uppercase text-white/85">
                            Partner PBAC
                          </div>
                          <div className="text-[11px] text-white/45 leading-snug">
                            Zaplecze instalacyjne
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="font-montserrat text-xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
            <h3>Współpracując z nami, nie dowiesz się co to jest</h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founderAntiPromises.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.15}
                className="relative rounded-2xl border border-white/10 p-2"
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 sm:p-8 h-full">
                  <h4 className="font-montserrat text-xl sm:text-2xl font-bold mb-4 line-through decoration-white/40 decoration-2">
                    {item.title}
                  </h4>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATES ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/[0.02] [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              <AuroraText>Certyfikaty</AuroraText> i gwarancja jakości
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              PlayAir montuje zgodnie z wymogami producentów i prawa UE — w tle mamy
              zaplecze certyfikowane PBAC. Każdy montaż to pełna dokumentacja
              i gwarancja.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <FadeIn
                  key={cert.title}
                  delay={index * 0.1}
                  className="relative rounded-2xl border border-white/10 p-2"
                >
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full flex flex-col items-center text-center">
                    <div className="mb-5 size-14 rounded-xl gradient-icon flex items-center justify-center">
                      <Icon className="size-7 text-white" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ OPINIE + FAQ ═══ */}
      <section id="opinie" className="relative py-28 overflow-hidden scroll-mt-20">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] text-white/15 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          {/* Opinie */}
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
              § 05 — Opinie
            </div>
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1] mb-10">
              <AuroraText className="font-montserrat">4.9 / 5</AuroraText>
              <br />
              <span className="text-2xl sm:text-3xl text-white/50 font-medium">
                na podstawie 180 opinii Google
              </span>
            </h2>
            <div className="flex flex-col gap-4">
              {reviews.map((t) => (
                <div
                  key={t.n}
                  className="relative rounded-2xl border border-white/10 p-2"
                >
                  <GlowingEffect spread={30} glow proximity={48} />
                  <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-md p-6 border-l-2 border-[#B31853]">
                    <p className="text-sm leading-relaxed text-white/85 mb-3">
                      &quot;{t.q}&quot;
                    </p>
                    <div className="text-xs text-white/50">
                      <span className="font-montserrat font-bold text-white/80">
                        {t.n}
                      </span>{" "}
                      · {t.l}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="scroll-mt-20">
            <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
              § 06 — FAQ
            </div>
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1] mb-10">
              Najczęstsze pytania.
            </h2>
            <div className="relative rounded-2xl border border-white/10 p-2">
              <GlowingEffect spread={30} glow proximity={48} />
              <div className="relative rounded-xl bg-white/[0.04] backdrop-blur-md px-6 py-2">
                {faqs.map((f, i) => (
                  <details
                    key={f.q}
                    className="group border-t border-white/10 py-5 first:border-t-0 [&[open]_.faq-plus]:rotate-45"
                    open={i === 0}
                  >
                    <summary className="font-montserrat text-base font-semibold cursor-pointer list-none flex justify-between items-center">
                      {f.q}
                      <Plus className="faq-plus size-5 text-white/40 transition-transform" />
                    </summary>
                    <p className="text-sm text-white/60 leading-[1.7] mt-3">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LATEST BLOG (PBAC) ═══ */}
      <LatestBlogSection />

      {/* ═══ CTA MEGA ═══ */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative px-6 sm:px-12 lg:px-16 py-20 lg:py-28 border border-white/10 rounded-3xl overflow-hidden">
            <div className="gradient-primary absolute inset-0 opacity-30" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.15), transparent 60%)",
              }}
            />
            <DotPattern
              width={20}
              height={20}
              cr={1}
              className="absolute inset-0 fill-white/[0.04] [mask-image:radial-gradient(500px_circle_at_20%_50%,white,transparent)]"
            />
            <Image
              src="/playair/assets/playair-logo.svg"
              alt=""
              width={800}
              height={400}
              className="absolute -right-10 -bottom-10 h-[240px] w-auto opacity-10 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-5">
                Gotowy?
              </div>
              <h2 className="font-montserrat font-bold tracking-[-0.03em] leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] mb-6">
                Pomiar w tym tygodniu.
                <br />
                <span className="text-white/70">Chłodne lato pewne.</span>
              </h2>
              <div className="flex flex-wrap gap-3 mt-10">
                <Button className="h-14 rounded-full bg-white text-black hover:bg-white/90 px-7 text-[13px] font-bold tracking-[0.1em] uppercase">
                  Umów pomiar <ArrowRight className="size-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-full border-white/30 bg-transparent text-white hover:bg-white/5 px-7 text-[13px] font-bold tracking-[0.1em] uppercase"
                >
                  <a href={PHONE_HREF} aria-label={`Zadzwoń: ${PHONE_NUMBER}`}>
                    <Phone className="size-4" />
                    {PHONE_NUMBER}
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/70">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Darmowy dojazd w strefie Pruszków + 12 okolic
                <span className="h-3 w-px bg-white/20" />
                <MapPin className="size-3.5 text-white/40" />
                Pruszków, Piastów, Ursus, Włochy, Raszyn…
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT (PBAC) ═══ */}
      <ContactSection />

      <Footer />
      <StickyPhone />
    </main>
  );
}