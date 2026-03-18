import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
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
import { Marquee } from "@/components/ui/marquee";
import HeroBackground from "@/components/hero-background";
import ProductCard from "@/components/product-card";
import ArticleCard from "@/components/article-card";
import { getFeaturedProducts } from "@/lib/products";
import { getLatestArticles } from "@/lib/articles";
import { getAllBrands } from "@/lib/brands";
import { testimonials } from "@/lib/testimonials";
import {
  Snowflake, Thermometer, Wifi, Volume2, ShieldCheck, Wind,
  Phone, Star, ArrowRight,
} from "lucide-react";

const QuoteForm = dynamic(() => import("@/components/quote-form"));
const DetailedInstallation = dynamic(() => import("@/components/detailed-installation"));
const PricingTable = dynamic(() => import("@/components/pricing-table"));

export const metadata: Metadata = {
  title: "Klimatyzacja — Montaż i Serwis Warszawa | PBAC",
  description: "Profesjonalny montaż i serwis klimatyzacji w Warszawie. Split, multisplit, kasetonowe. Samsung, LG, Toshiba, Gree, Daikin. Bezpłatna wycena.",
  alternates: { canonical: "/klimatyzacja" },
};

const features = [
  { icon: Snowflake, title: "Chłodzenie", desc: "Efektywne chłodzenie pomieszczeń od 15 do 100+ m² z klasą energetyczną A++" },
  { icon: Thermometer, title: "Grzanie zimą", desc: "Pompa ciepła powietrze-powietrze — ekonomiczne ogrzewanie nawet przy -15°C" },
  { icon: Volume2, title: "Cisza", desc: "Nowoczesne modele pracują od 16 dB — ciszej niż szept" },
  { icon: Wifi, title: "Smart sterowanie", desc: "Sterowanie przez WiFi i aplikację — Samsung SmartThings, LG ThinQ" },
  { icon: Wind, title: "Filtracja powietrza", desc: "Filtry PM1.0, jonizacja, Cold Plasma — czyste powietrze bez alergenów" },
  { icon: ShieldCheck, title: "Gwarancja do 10 lat", desc: "Gwarancja producenta na urządzenie + osobna gwarancja PBAC na instalację" },
];

export default function KlimatyzacjaPage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const latestArticles = getLatestArticles(3);
  const brands = getAllBrands();
  const montazTestimonials = testimonials.filter((t) => t.service === "montaz").slice(0, 6);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Klimatyzacja" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Montaż klimatyzacji Warszawa",
    description: "Profesjonalny montaż klimatyzatorów ściennych, multisplit, kasetonowych i kanałowych w Warszawie i okolicach.",
    provider: { "@id": "https://pbac.pl/#localbusiness" },
    areaServed: { "@type": "City", name: "Warszawa" },
    offers: { "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: 4000, highPrice: 15000 },
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
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-6">
              <AuroraText className="font-montserrat">Klimatyzacja</AuroraText>{" "}
              <span className="text-white/90">— montaż i serwis</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
              PBAC oferuje kompleksowe usługi klimatyzacyjne w Warszawie i okolicach. Montujemy klimatyzatory ścienne, multisplit, kasetonowe i kanałowe ponad 10 marek premium. Bezpłatna wycena w 24h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#wycena" className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90">
                Zamów darmową wycenę
              </a>
              <Link href="/produkty" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                Zobacz produkty
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FEATURES with GlowingEffect ═══ */}
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
              Dlaczego <AuroraText>klimatyzacja</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Nowoczesna klimatyzacja to nie tylko chłodzenie — to komfort przez cały rok, czyste powietrze i oszczędność energii.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <FadeIn key={f.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <f.icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="font-montserrat text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-white/60">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {featured.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <StripedPattern
            width={12}
            height={12}
            className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
                Polecane klimatyzatory
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Najczęściej wybierane modele przez naszych klientów
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {featured.map((product, idx) => (
                <FadeIn key={product.slug} delay={idx * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4}>
              <div className="text-center">
                <Link href="/produkty" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10">
                  Zobacz wszystkie produkty
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ TESTIMONIALS ═══ */}
      {montazTestimonials.length > 0 && (
        <section className="py-16 overflow-hidden">
          <FadeIn>
            <h2 className="font-montserrat text-3xl font-bold text-center mb-10 px-4">
              Co mówią <AuroraText>nasi klienci</AuroraText>
            </h2>
          </FadeIn>
          <Marquee className="[--gap:1.5rem] [--duration:35s]" pauseOnHover>
            {montazTestimonials.map((t) => (
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

      {/* ═══ BLOG ARTICLES ═══ */}
      {latestArticles.length > 0 && (
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
                Poradnik klimatyzacyjny
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Przydatna wiedza przed zakupem klimatyzatora
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {latestArticles.map((article, idx) => (
                <FadeIn key={article.slug} delay={idx * 0.1}>
                  <ArticleCard article={article} />
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <Link href="/blog" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10">
                  Wszystkie artykuły
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl font-bold mb-8">Powiązane usługi</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/montaz/warszawa", label: "Montaż w Warszawie", desc: "Profesjonalny montaż klimatyzacji z dojazdem" },
              { href: "/serwis/warszawa", label: "Serwis klimatyzacji", desc: "Przeglądy, czyszczenie, naprawy" },
              { href: "/produkty", label: "Katalog produktów", desc: `${brands.length} marek w ofercie` },
              { href: "/wynajem-klimatyzatorow", label: "Wynajem", desc: "Klimatyzatory przenośne na wynajem" },
            ].map((link, idx) => (
              <FadeIn key={link.href} delay={idx * 0.1}>
                <Link href={link.href} className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors">
                  <div className="flex-1">
                    <div className="font-montserrat font-bold text-sm mb-1 group-hover:text-white transition-colors">{link.label}</div>
                    <div className="text-xs text-white/40">{link.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DETAILED INSTALLATION ═══ */}
      <DetailedInstallation />

      {/* ═══ PRICING TABLE ═══ */}
      <PricingTable />

      {/* ═══ QUOTE FORM ═══ */}
      

      <ContactSection />
      <Footer />
    </main>
  );
}
