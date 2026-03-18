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
import HeroBackground from "@/components/hero-background";
import {
  Flame, ExternalLink, Leaf, PiggyBank, ThermometerSun, ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pompy ciepła — Montaż Warszawa | PBAC",
  description: "Sprzedaż i montaż pomp ciepła powietrze-woda w Warszawie. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat. Dofinansowanie Czyste Powietrze.",
  alternates: { canonical: "/pompy-ciepla" },
};

const benefits = [
  { icon: PiggyBank, title: "Oszczędność do 70%", desc: "Pompa ciepła pozwala zaoszczędzić nawet 70% kosztów ogrzewania w porównaniu z gazem lub olejem opałowym." },
  { icon: Leaf, title: "Ekologia", desc: "Zeroemisyjne źródło ciepła — brak spalania paliw kopalnych, czyste powietrze w domu i okolicy." },
  { icon: ThermometerSun, title: "Ogrzewanie i chłodzenie", desc: "Pompy ciepła powietrze-woda zapewniają ogrzewanie zimą oraz opcjonalne chłodzenie latem." },
  { icon: ShieldCheck, title: "Dofinansowanie", desc: "Pomoc w uzyskaniu dofinansowania z programów Czyste Powietrze i Moje Ciepło — nawet do 30 000 zł." },
];

export default function PompyCieplaPage() {
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Pompy ciepła" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pompy ciepła Warszawa",
    description: "Sprzedaż i montaż pomp ciepła powietrze-woda. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat.",
    provider: { "@id": "https://pbac.pl/#localbusiness" },
    areaServed: { "@type": "City", name: "Warszawa" },
    sameAs: "https://pompy.pbac.pl",
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
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white/50 text-sm">Ogrzewanie ekologiczne</span>
            </div>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <AuroraText className="font-montserrat">Pompy ciepła</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
              Pompa ciepła to jedno z najbardziej ekonomicznych i ekologicznych źródeł ogrzewania domu. Pozwala zaoszczędzić nawet do 70% kosztów ogrzewania w porównaniu z ogrzewaniem gazowym lub olejowym. W PBAC oferujemy profesjonalny dobór, sprzedaż i montaż pomp ciepła powietrze-woda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://pompy.pbac.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90"
              >
                Sprawdź ofertę pomp ciepła
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/kontakt" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                Kontakt
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
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
              Dlaczego <AuroraText>pompa ciepła</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Ekologiczne ogrzewanie z dofinansowaniem — oszczędzaj pieniądze i środowisko
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, idx) => (
              <FadeIn key={b.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <b.icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="font-montserrat text-lg font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DETAILS ═══ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p className="text-lg">
                Współpracujemy z czołowymi producentami: Samsung EHS R290, Mitsubishi Heavy Hydrolution, Fujitsu Waterstage i Neoheat. Każda instalacja obejmuje analizę zapotrzebowania cieplnego budynku, dobór optymalnego urządzenia, kompleksowy montaż hydrauliczny i elektryczny oraz uruchomienie z konfiguracją.
              </p>
              <p className="text-lg">
                Pomagamy również w uzyskaniu dofinansowania z programu Czyste Powietrze i Moje Ciepło. Ceny pomp ciepła z montażem zaczynają się od ok. 30 000 zł.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="gradient-primary rounded-2xl p-10 md:p-14 text-center">
              <Flame className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                Zainteresowany pompą ciepła?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Sprawdź naszą pełną ofertę pomp ciepła na dedykowanej stronie
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://pompy.pbac.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black rounded-full px-10 py-4 font-bold text-sm hover:bg-white/90 transition-colors"
                >
                  pompy.pbac.pl
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link href="/klimatyzacja" className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-10 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                  Klimatyzacja
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
