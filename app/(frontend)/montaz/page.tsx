import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import ServiceAreaMap from "@/components/service-area-map";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";
import HeroBackground from "@/components/hero-background";
import { MapPin, ArrowRight } from "lucide-react";
import { getLocationsByServiceAsync } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Montaż klimatyzacji — Warszawa i okolice | PBAC",
  description: "Profesjonalny montaż klimatyzacji w 13 miastach: Warszawa, Kraków, Siedlce, Piaseczno i inne. Certyfikowani instalatorzy PBAC. Bezpłatna wycena.",
  alternates: { canonical: "/montaz" },
};

export default async function MontazIndexPage() {
  const montazLocations = await getLocationsByServiceAsync("montaz");
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Montaż klimatyzacji" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-4">
              Montaż <AuroraText className="font-montserrat">klimatyzacji</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
              Realizujemy profesjonalny montaż klimatyzacji w {montazLocations.length} miastach. Wybierz swoją lokalizację, aby dowiedzieć się więcej o usługach dostępnych w Twoim regionie.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ LOCATIONS GRID ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {montazLocations.map((location, idx) => (
              <FadeIn key={location.slug} delay={idx * 0.05}>
                <Link
                  href={`/montaz/${location.slug}`}
                  className="group relative block rounded-2xl border border-white/10 p-2"
                >
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                      <span className="text-xs text-white/40">{location.region}</span>
                    </div>
                    <h2 className="font-montserrat text-xl font-bold mb-2 group-hover:text-white transition-colors">
                      Montaż klimatyzacji {location.name}
                    </h2>
                    <p className="text-sm text-white/60 line-clamp-2 mb-3">
                      {location.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>Sprawdź szczegóły</span>
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
              { href: "/serwis", label: "Serwis klimatyzacji", desc: "Przeglądy i naprawy" },
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

      <ServiceAreaMap variant="montaz" />
      <ContactSection />
      <Footer />
    </main>
  );
}
