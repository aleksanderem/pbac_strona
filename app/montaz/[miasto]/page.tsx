import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getLocationBySlug, getLocationsByService, getAllLocations } from "@/lib/locations";
import { getAllBrands } from "@/lib/brands";
import dynamic from "next/dynamic";
import LightPillarHero from "@/components/light-pillar-hero";
import CircularText from "@/components/CircularText";

const PricingTable = dynamic(() => import("@/components/pricing-table"));
const DetailedInstallation = dynamic(() => import("@/components/detailed-installation"));
import { testimonials } from "@/lib/testimonials";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { Marquee } from "@/components/ui/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin, Phone, CheckCircle, Star, Wrench, ShieldCheck,
  ClipboardList, Thermometer, Snowflake, Settings, Award, Users,
} from "lucide-react";

interface Props {
  params: Promise<{ miasto: string }>;
}

export async function generateStaticParams() {
  return getLocationsByService("montaz").map((l) => ({ miasto: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location) return {};
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: `/montaz/${miasto}` },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      type: "website",
      siteName: "PBAC",
    },
  };
}

const processSteps = [
  { icon: Phone, title: "Kontakt i wycena", desc: "Bezpłatna wycena na podstawie metrażu, zdjęć i potrzeb. Wycena w 24h." },
  { icon: ClipboardList, title: "Dobór urządzenia", desc: "Specjalista dobiera klimatyzator dopasowany do pomieszczenia i budżetu." },
  { icon: Wrench, title: "Montaż", desc: "Profesjonalna instalacja zgodna z wytycznymi producenta. 4-8h pracy." },
  { icon: ShieldCheck, title: "Uruchomienie i gwarancja", desc: "Konfiguracja, szkolenie obsługi, pełna gwarancja." },
];

const stats = [
  { icon: Users, number: "500+", label: "Montaży" },
  { icon: Award, number: "10+", label: "Marek" },
  { icon: Star, number: "4.9", label: "Ocena" },
  { icon: ShieldCheck, number: "5 lat", label: "Gwarancja" },
];

export default async function MontazPage({ params }: Props) {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location || !location.services.includes("montaz")) notFound();

  const brands = getAllBrands();
  const allLocations = getAllLocations().filter((l) => l.slug !== location.slug && l.services.includes("montaz"));
  const cityTestimonials = testimonials.filter((t) => t.service === "montaz").slice(0, 6);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Montaż", href: "/montaz" },
    { name: location.name },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Montaż klimatyzacji ${location.name}`,
    description: location.description,
    provider: { "@type": "HVACBusiness", "@id": "https://pbac.pl/#localbusiness", name: "PBAC", telephone: "+48503151802" },
    areaServed: { "@type": "City", name: location.name, containedInPlace: { "@type": "AdministrativeArea", name: location.region } },
    serviceType: "Montaż klimatyzacji",
    offers: { "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: 4000, highPrice: 15000 },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: `PBAC — Montaż klimatyzacji ${location.name}`,
    url: `https://pbac.pl/montaz/${location.slug}`,
    telephone: "+48503151802",
    email: "montaz@pbac.pl",
    areaServed: { "@type": "City", name: location.name },
    geo: { "@type": "GeoCoordinates", latitude: location.coordinates.lat, longitude: location.coordinates.lng },
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, bestRating: 5, reviewCount: cityTestimonials.length || 10 },
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

      {/* ═══ HERO with LightPillar ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <LightPillarHero />
        {/* Circular text badge */}
        <div className="absolute top-40 right-12 xl:right-24 z-20 hidden lg:block opacity-80">
          <CircularText text="MONTAŻ * GRATIS * " onHover="speedUp" spinDuration={20} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
            {/* Left: Text */}
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-white/50" />
                <span className="text-white/50 text-sm">{location.region}</span>
              </div>
              <span className="inline-block rounded-full bg-green-500/20 border border-green-500/30 px-4 py-1.5 text-sm font-bold text-green-300 mb-6">
                Montaż gratis
              </span>
              <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white">
                Montaż klimatyzacji {location.name}
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10">
                {location.description}
              </p>
              <a href="tel:+48503151802" className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-8 py-4 font-bold text-sm hover:bg-white/90 transition-colors">
                <Phone className="w-4 h-4" />
                +48 503 151 802
              </a>
            </FadeIn>

            {/* Right: Contact form */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-xl p-8">
                <h2 className="font-montserrat text-xl font-bold mb-6">Umów się na bezpłatną wycenę w miejscu montażu</h2>
                <form action="https://formsubmit.co/ajax/biuro@pbac.pl" method="POST" className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Imię</label>
                    <input type="text" name="name" required className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Telefon</label>
                    <input type="tel" name="phone" required className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" placeholder="+48 500 000 000" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Metraż pomieszczenia</label>
                    <input type="text" name="area" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" placeholder="np. 40 m²" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Wiadomość</label>
                    <textarea name="message" rows={3} className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none" placeholder="Opisz swoje potrzeby..." />
                  </div>
                  <input type="hidden" name="_subject" value={`Wycena montażu — ${location.name}`} />
                  <button type="submit" className="w-full bg-white text-black rounded-xl px-6 py-4 font-bold text-sm hover:bg-white/90 transition-colors">
                    Wyślij zapytanie
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Montaży zrealizowanych" },
              { number: "10+", label: "Marek w ofercie" },
              { number: "4.9", label: "Ocena klientów" },
              { number: "5 lat", label: "Gwarancja na instalację" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HERO IMAGE BREAK ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/images/montaz/montaz-hero.png" alt="Klimatyzator zamontowany na ścianie" className="w-full h-64 sm:h-80 md:h-96 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 font-montserrat font-bold text-lg sm:text-xl">Profesjonalny montaż klimatyzacji</p>
                <p className="text-white/60 text-sm mt-1">Wykonywany zgodnie z wytycznymi producenta przez certyfikowanych techników</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CONTENT SECTIONS with alternating patterns + images ═══ */}
      {location.sections.map((section, idx) => {
        const patterns = [GridPattern, DotPattern, StripedPattern, GridPattern, DotPattern, StripedPattern, GridPattern, DotPattern];
        const Pattern = patterns[idx % patterns.length];
        const isEven = idx % 2 === 0;

        const sectionImages = [
          { src: "/images/montaz/montaz-blok.jpg", alt: "Klimatyzacja zamontowana w mieszkaniu" },
          { src: "/images/montaz/montaz-biuro.jpg", alt: "Klimatyzacja w biurze" },
          { src: "/images/montaz/montaz-dom.jpg", alt: "Klimatyzacja w domu" },
        ];
        const sectionImage = idx < sectionImages.length ? sectionImages[idx] : null;

        return (
          <section key={idx} className="relative py-16 px-4 overflow-hidden">
            <Pattern className={`absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_${isEven ? 'center' : 'top'},white,transparent)]`} {...(Pattern === GridPattern ? { width: 40, height: 40 } : {})} />
            <div className="relative z-10 max-w-7xl mx-auto">
              <FadeIn delay={0.1}>
                {sectionImage ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {isEven ? (
                      <>
                        <div>
                          <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                            {section.heading}
                          </h2>
                          <div className="text-white/70 leading-relaxed space-y-4">
                            {section.content.split("\n\n").map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10">
                          <img src={sectionImage.src} alt={sectionImage.alt} className="w-full h-64 lg:h-full min-h-[16rem] object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <p className="absolute bottom-4 left-4 text-white/80 font-montserrat font-bold text-sm">{sectionImage.alt}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 order-last lg:order-first">
                          <img src={sectionImage.src} alt={sectionImage.alt} className="w-full h-64 lg:h-full min-h-[16rem] object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <p className="absolute bottom-4 left-4 text-white/80 font-montserrat font-bold text-sm">{sectionImage.alt}</p>
                        </div>
                        <div>
                          <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                            {section.heading}
                          </h2>
                          <div className="text-white/70 leading-relaxed space-y-4">
                            {section.content.split("\n\n").map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="max-w-7xl mx-auto">
                    <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                      {section.heading}
                    </h2>
                    <div className="text-white/70 leading-relaxed space-y-4">
                      {section.content.split("\n\n").map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>
          </section>
        );
      })}

      {/* ═══ PROCESS STEPS with GlowingEffect ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GridPattern className="absolute inset-0 z-0 fill-white/[0.03] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" width={40} height={40} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-4">
              Jak wygląda montaż w <AuroraText>{location.name}</AuroraText>?
            </h2>
            <p className="text-center text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Od kontaktu do uruchomienia klimatyzacji — 4 proste kroki
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.15}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <div className="font-montserrat text-5xl font-bold text-white/5 mb-2">0{idx + 1}</div>
                    <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CTA ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-4">
              Gotowy na montaż?
            </h2>
            <p className="text-white/60 mb-6">Bezpłatna wycena w 24h. Montaż w ciągu 3-7 dni od zamówienia.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+48503151802" className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm">
                <Phone className="w-4 h-4" />
                Zadzwoń teraz
              </a>
              <a href="/#wycena" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                Formularz wyceny
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BRANDS MARQUEE ═══ */}
      <section className="py-12 overflow-hidden border-y border-white/10">
        <FadeIn>
          <h2 className="font-montserrat text-2xl font-bold text-center mb-8 px-4">
            Montujemy klimatyzatory <AuroraText>najlepszych marek</AuroraText>
          </h2>
        </FadeIn>
        <Marquee className="[--gap:2rem] [--duration:25s]" pauseOnHover>
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/produkty/${brand.slug}`} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition-colors shrink-0">
              <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain" loading="lazy" />
              <span className="font-montserrat font-bold text-white/70 hover:text-white transition-colors">{brand.name}</span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* ═══ WHY PBAC with GlowingEffect cards ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-12">
              Dlaczego klienci wybierają <AuroraText>PBAC</AuroraText> w {location.name}?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, title: "Bezpłatna wycena w 24h", desc: "Wyślij metraż i zdjęcia — przygotujemy wycenę z doborem urządzenia w ciągu jednego dnia roboczego." },
              { icon: Award, title: "Ponad 10 marek w ofercie", desc: "Samsung, LG, Toshiba, Gree, Daikin, Haier, AUX, Kaisai, Mitsubishi — dobieramy markę do potrzeb i budżetu." },
              { icon: Wrench, title: "Montaż zgodny ze standardami", desc: "Każda instalacja realizowana zgodnie z wytycznymi producenta. Próba szczelności, próżnia, uruchomienie z protokołem." },
              { icon: ShieldCheck, title: "Gwarancja do 10 lat", desc: "Gwarancja producenta na urządzenie i osobna gwarancja PBAC na instalację. Serwis pogwarancyjny bez ograniczeń." },
              { icon: Settings, title: "Serwis i przeglądy", desc: "Regularny serwis przedłuża żywotność klimatyzatora. Oferujemy przeglądy sezonowe i umowy serwisowe dla firm." },
              { icon: Thermometer, title: "Chłodzenie i grzanie", desc: "Wszystkie montowane przez nas klimatyzatory posiadają funkcję grzania — pompa ciepła powietrze-powietrze." },
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow proximity={64} />
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

      {/* ═══ TESTIMONIALS ═══ */}
      {cityTestimonials.length > 0 && (
        <section className="py-16 overflow-hidden">
          <FadeIn>
            <h2 className="font-montserrat text-3xl font-bold text-center mb-10 px-4">
              Opinie klientów z {location.name} i okolic
            </h2>
          </FadeIn>
          <Marquee className="[--gap:1.5rem] [--duration:35s]" pauseOnHover>
            {cityTestimonials.map((t) => (
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

      {/* ═══ WARSAW DISTRICTS ═══ */}
      {miasto === "warszawa" && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-center mb-8">
                Działamy we wszystkich dzielnicach <AuroraText>Warszawy</AuroraText>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Mokotów", "Rembertów", "Wesoła", "Wilanów", "Włochy", "Żoliborz",
                  "Ursus", "Praga-Północ", "Wawer", "Ochota", "Białołęka", "Śródmieście",
                  "Bemowo", "Targówek", "Bielany", "Wola", "Ursynów", "Praga-Południe",
                ].map((district) => (
                  <span
                    key={district}
                    className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/70"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ FAQ ACCORDION with GlowingEffect ═══ */}
      {location.faq.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <StripedPattern className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-4">
                Najczęstsze pytania przed montażem — {location.name}
              </h2>
              <p className="text-center text-white/60 mb-12">
                Odpowiedzi na najczęstsze wątpliwości naszych klientów
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl border border-white/10 p-2">
                <GlowingEffect spread={40} glow proximity={64} />
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
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl font-bold mb-8">
              Montaż klimatyzacji w innych miastach
            </h2>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {allLocations.map((l) => (
              <Link key={l.slug} href={`/montaz/${l.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA GRADIENT ═══ */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="gradient-primary rounded-2xl p-10 md:p-14 text-center">
              <Snowflake className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                Zamów montaż klimatyzacji w {location.name}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Zadzwoń lub wypełnij formularz — przygotujemy bezpłatną wycenę w ciągu 24 godzin
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

      <DetailedInstallation />
      <PricingTable />

      <ContactSection />
      <Footer />
    </main>
  );
}
