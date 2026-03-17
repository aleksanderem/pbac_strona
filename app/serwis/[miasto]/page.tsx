import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getLocationBySlug, getLocationsByService } from "@/lib/locations";
import { getAllBrands } from "@/lib/brands";
import { testimonials } from "@/lib/testimonials";
import HeroBackground from "@/components/hero-background";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
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
  Settings, Phone, CheckCircle, Star, ShieldCheck,
  Wrench, Droplets, Thermometer, ClipboardList, Award, Users,
  ArrowRight,
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
    title: `Serwis klimatyzacji ${location.name} — PBAC`,
    description: `Profesjonalny serwis i przegląd klimatyzacji w ${location.name}. Czyszczenie, dezynfekcja, uzupełnianie czynnika. ☎ 503 151 802.`,
    alternates: { canonical: `/serwis/${miasto}` },
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
    description: `Profesjonalny serwis, przegląd i naprawa klimatyzacji w ${location.name}. Czyszczenie filtrów, dezynfekcja, uzupełnianie czynnika chłodniczego.`,
    provider: { "@type": "HVACBusiness", "@id": "https://pbac.pl/#localbusiness" },
    areaServed: { "@type": "City", name: location.name },
    serviceType: "Serwis klimatyzacji",
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
      <JsonLd data={[serviceSchema, buildBreadcrumbSchema(breadcrumbItems), ...(faqSchema ? [faqSchema] : [])]} />
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
              Oferujemy kompleksowy serwis klimatyzacji w {location.name}: okresowe przeglądy, czyszczenie i dezynfekcja filtrów, uzupełnianie czynnika chłodniczego, diagnostyka usterek oraz naprawy. Serwisujemy klimatyzatory wszystkich marek.
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

      {/* ═══ SERVICE ITEMS ═══ */}
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
              Co obejmuje <AuroraText>serwis</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Kompleksowa obsługa serwisowa klimatyzatorów wszystkich marek
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          {/* Detailed checklist */}
          <FadeIn delay={0.4}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Czyszczenie i dezynfekcja filtrów",
                "Mycie parownika i skraplacza",
                "Sprawdzenie ciśnienia czynnika",
                "Kontrola szczelności instalacji",
                "Czyszczenie odpływu skroplin",
                "Diagnostyka parametrów pracy",
                "Uzupełnianie czynnika (w razie potrzeby)",
                "Raport z przeglądu i zalecenia",
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

      {/* ═══ BRANDS MARQUEE ═══ */}
      <section className="py-12 overflow-hidden border-y border-white/10">
        <FadeIn>
          <h2 className="font-montserrat text-2xl font-bold text-center mb-8 px-4">
            Serwisujemy klimatyzatory <AuroraText>wszystkich marek</AuroraText>
          </h2>
        </FadeIn>
        <Marquee className="[--gap:2rem] [--duration:25s]" pauseOnHover>
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/produkty/${brand.slug}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition-colors shrink-0">
              <span className="font-montserrat font-bold text-white/70 hover:text-white transition-colors">{brand.name}</span>
              <span className="text-xs text-white/30">{brand.country}</span>
            </Link>
          ))}
        </Marquee>
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
                Najczęstsze pytania — {location.name}
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
                Zadzwoń lub napisz — umówimy dogodny termin
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

      <Footer />
    </main>
  );
}
