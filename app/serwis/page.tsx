import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
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
import HeroBackground from "@/components/hero-background";
import { getAllBrands } from "@/lib/brands";
import { testimonials } from "@/lib/testimonials";
import {
  Settings, MapPin, ArrowRight, Phone, Star,
  Droplets, Thermometer, Wrench, ClipboardList, ShieldCheck,
  Zap, Clock, BadgeCheck, CalendarCheck,
  Award, Users, Bug,
} from "lucide-react";
import { getLocationsByService } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Serwis klimatyzacji — przegląd, czyszczenie, naprawa | PBAC",
  description: "Profesjonalny serwis klimatyzacji: przeglądy, czyszczenie filtrów, dezynfekcja, uzupełnianie czynnika, naprawy. Wszystkie marki. Od 250 zł. Warszawa i okolice. ☎ 503 151 802.",
  alternates: { canonical: "/serwis" },
  openGraph: {
    title: "Serwis klimatyzacji — PBAC",
    description: "Kompleksowy serwis klimatyzacji: przeglądy, czyszczenie, dezynfekcja, naprawy. Wszystkie marki. ☎ 503 151 802.",
    type: "website",
    siteName: "PBAC",
  },
};

const serviceOverview = [
  { icon: Droplets, title: "Czyszczenie i dezynfekcja", desc: "Mycie filtrów, parownika i skraplacza. Dezynfekcja preparatem biobójczym eliminującym bakterie, grzyby pleśniowe i alergeny." },
  { icon: Thermometer, title: "Kontrola czynnika chłodniczego", desc: "Pomiar ciśnienia czynnika R32/R410A stacją manometryczną. Uzupełnianie w razie ubytku. Test szczelności wykrywający nieszczelności." },
  { icon: Wrench, title: "Diagnostyka i naprawy", desc: "Odczyt parametrów pracy sprężarki, kontrola elektroniki, wymiana uszkodzonych komponentów z oryginalnymi częściami zamiennymi." },
  { icon: ClipboardList, title: "Raport serwisowy", desc: "Pisemny protokół z wykonanych czynności, pomiarów, stanu technicznego urządzenia i zaleceń dotyczących dalszej eksploatacji." },
  { icon: ShieldCheck, title: "Gwarancja na usługę", desc: "Każdy serwis objęty gwarancją jakości. Protokół serwisowy stanowi dowód konserwacji wymagany przez gwarancję producenta." },
  { icon: CalendarCheck, title: "Umowy serwisowe", desc: "Roczne umowy serwisowe z dwoma przeglądami (wiosna/jesień), priorytetowymi terminami i rabatem na naprawy. Idealne dla firm." },
];

const pricingItems = [
  { service: "Przegląd jednego klimatyzatora ściennego", price: "250–400 zł", note: "Czyszczenie, dezynfekcja, kontrola czynnika, raport" },
  { service: "Serwis systemu multisplit (2–5 jednostek)", price: "od 200 zł / szt.", note: "Cena degresywna — im więcej jednostek, tym taniej" },
  { service: "Wyjazd awaryjny (weekend / wieczór)", price: "od 350 zł", note: "Dojazd, diagnostyka i drobna naprawa w cenie" },
  { service: "Roczna umowa serwisowa", price: "od 450 zł / rok", note: "2 przeglądy rocznie, priorytet, rabat na naprawy" },
  { service: "Uzupełnianie czynnika chłodniczego", price: "150–350 zł", note: "R32 lub R410A, z testem szczelności" },
];

const brandHighlights = [
  { brand: "Samsung", detail: "Serwis panelu Wind-Free (23 000 mikrootworów), diagnostyka SmartThings" },
  { brand: "LG", detail: "Diagnostyka Dual Inverter, kontrola Plasmaster Ionizer+" },
  { brand: "Toshiba", detail: "Test sprężarki Twin Rotary, kontrola powłoki Magic Coil" },
  { brand: "Gree", detail: "Serwis Cold Plasma, kalibracja czujnika I-Feel" },
  { brand: "Daikin", detail: "Diagnostyka Streamer Discharge, test inteligentnego oka" },
  { brand: "Haier", detail: "Kontrola lampy UV-C, serwis Self-Clean, diagnostyka hOn" },
  { brand: "Mitsubishi", detail: "Serwis MSZ/MUZ, diagnostyka i-see Sensor 3D" },
  { brand: "Kaisai / AUX", detail: "Przeglądy ekonomicznych modeli, wymiana filtrów" },
];

export default function SerwisIndexPage() {
  const serwisLocations = getLocationsByService("serwis");
  const brands = getAllBrands();
  const serwisTestimonials = testimonials.filter((t) => t.service === "serwis").slice(0, 6);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Serwis klimatyzacji" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Serwis klimatyzacji — PBAC",
    description: "Profesjonalny serwis, przegląd i naprawa klimatyzacji. Czyszczenie filtrów, dezynfekcja, uzupełnianie czynnika chłodniczego. Serwisujemy wszystkie marki.",
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://pbac.pl/#localbusiness",
      name: "PBAC",
      telephone: "+48503151802",
    },
    serviceType: "Serwis klimatyzacji",
    areaServed: serwisLocations.map((l) => ({ "@type": "City", name: l.name })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PLN",
      lowPrice: 250,
      highPrice: 800,
    },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[serviceSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Settings className="w-5 h-5 text-white/50" />
              <span className="text-white/50 text-sm">Przeglądy, czyszczenie, naprawy</span>
            </div>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Serwis <AuroraText className="font-montserrat">klimatyzacji</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
              Oferujemy kompleksowy serwis klimatyzacji: przeglądy okresowe, czyszczenie i dezynfekcja filtrów, uzupełnianie czynnika chłodniczego, diagnostyka i naprawy. Serwisujemy klimatyzatory wszystkich marek — Samsung, LG, Toshiba, Gree, Daikin, Haier i inne. Działamy na terenie Warszawy i okolicznych miejscowości.
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
            {[
              { icon: Users, number: "500+", label: "Wykonanych serwisów" },
              { icon: Award, number: "10+", label: "Serwisowanych marek" },
              { icon: Star, number: "4.9", label: "Średnia ocena" },
              { icon: ShieldCheck, number: "Od 250 zł", label: "Cena przeglądu" },
            ].map((stat, idx) => (
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

      {/* ═══ WHAT WE DO ═══ */}
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
              Co obejmuje nasz <AuroraText>serwis</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Kompleksowa obsługa serwisowa klimatyzatorów — od czyszczenia po naprawy awaryjne
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceOverview.map((item, idx) => (
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
        </div>
      </section>

      {/* ═══ WHY REGULAR SERVICE ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Dlaczego regularny serwis jest <AuroraText>niezbędny</AuroraText>?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-white/70 leading-relaxed">
              <p>
                Klimatyzator pracujący bez konserwacji staje się zagrożeniem zdrowotnym i finansowym. Wilgotne wnętrze wymiennika ciepła to idealne środowisko dla bakterii, grzybów pleśniowych i drożdży, które rozpylane z nawiewem trafiają bezpośrednio do dróg oddechowych. Objawy ekspozycji na zaniedbany klimatyzator obejmują chroniczny katar, podrażnienie oczu, bóle głowy i zaostrzenie astmy — szczególnie u dzieci i alergików.
              </p>
              <p>
                Finansowe konsekwencje braku serwisu są równie dotkliwe. Zabrudzone filtry i wymienniki zmuszają sprężarkę do intensywniejszej pracy, zwiększając zużycie energii o 20–30%. Żywotność klimatyzatora bez konserwacji skraca się z projektowych 10–15 lat do zaledwie 5–7 lat. Awaria sprężarki — najdroższego komponentu — kosztuje 2000–5000 zł, często więcej niż nowy klimatyzator.
              </p>
              <p>
                Producenci wymagają w warunkach gwarancji corocznego przeglądu serwisowego. Brak udokumentowanego serwisu może skutkować odmową uznania reklamacji. Każdy nasz przegląd kończy się protokołem, który stanowi dowód wykonanej konserwacji.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Bug, text: "Bakterie i pleśń w zaniedbanych klimatyzatorach" },
                { icon: Zap, text: "20–30% wyższe rachunki za prąd" },
                { icon: Clock, text: "Żywotność skrócona z 15 do 5 lat" },
                { icon: ShieldCheck, text: "Utrata gwarancji bez corocznego serwisu" },
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

      {/* ═══ PRICING ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Cennik serwisu <AuroraText>klimatyzacji</AuroraText>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Transparentne ceny bez ukrytych kosztów. Dojazd wliczony w cenę.
            </p>
          </FadeIn>
          <div className="space-y-3">
            {pricingItems.map((item, idx) => (
              <FadeIn key={item.service} delay={idx * 0.08}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex-1">
                    <h3 className="font-montserrat font-bold text-sm sm:text-base">{item.service}</h3>
                    <p className="text-xs text-white/40 mt-1">{item.note}</p>
                  </div>
                  <span className="font-montserrat font-bold text-green-400 text-sm shrink-0">{item.price}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANDS SERVICED ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[50%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Serwisujemy <AuroraText>wszystkie marki</AuroraText>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Znamy specyfikę każdego producenta — procedury serwisowe, diagnostykę i oryginalne części
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandHighlights.map((item, idx) => (
              <FadeIn key={item.brand} delay={idx * 0.05}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="w-5 h-5 text-green-400" />
                    <h3 className="font-montserrat font-bold text-sm">{item.brand}</h3>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{item.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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

      {/* ═══ TESTIMONIALS ═══ */}
      {serwisTestimonials.length > 0 && (
        <section className="py-16 overflow-hidden">
          <FadeIn>
            <h2 className="font-montserrat text-3xl font-bold text-center mb-10 px-4">
              Opinie klientów o naszym <AuroraText>serwisie</AuroraText>
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

      {/* ═══ LOCATIONS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="mb-12">
            <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
              Serwis klimatyzacji — <AuroraText>lokalizacje</AuroraText>
            </h2>
            <p className="text-white/60 text-lg text-center max-w-2xl mx-auto">Kliknij swoje miasto, aby zobaczyć szczegółowe informacje o usługach serwisowych w Twojej okolicy</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serwisLocations.map((location, idx) => (
              <FadeIn key={location.slug} delay={idx * 0.05}>
                <Link
                  href={`/serwis/${location.slug}`}
                  className="group relative block rounded-2xl border border-white/10 p-2"
                >
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                      <span className="text-xs text-white/40">{location.region}</span>
                    </div>
                    <h3 className="font-montserrat text-xl font-bold mb-2 group-hover:text-white transition-colors">
                      Serwis klimatyzacji {location.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-3 line-clamp-2">
                      Przeglądy, czyszczenie, dezynfekcja i naprawy klimatyzatorów w {location.name} i okolicach.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>Sprawdź szczegóły i cennik</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl font-bold mb-8">Powiązane usługi</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/produkty", label: "Katalog klimatyzatorów", desc: "Pełna oferta produktów" },
              { href: "/blog", label: "Poradnik klimatyzacyjny", desc: "Wiedza o klimatyzacji" },
              { href: "/klimatyzacja", label: "Montaż klimatyzacji", desc: "Profesjonalna instalacja" },
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
                Umów serwis klimatyzacji
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Zadzwoń lub wypełnij formularz — umówimy dogodny termin. Pełny przegląd z dezynfekcją od 250 zł.
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

      <ContactSection />
      <Footer />
    </main>
  );
}
