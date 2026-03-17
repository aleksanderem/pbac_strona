import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { Flame, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Pompy ciepła — Montaż Warszawa | PBAC",
  description: "Sprzedaż i montaż pomp ciepła powietrze-woda w Warszawie. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat. Dofinansowanie Czyste Powietrze.",
  alternates: { canonical: "/pompy-ciepla" },
};

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

      <section className="relative pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-white/50 text-sm">Ogrzewanie ekologiczne</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              Pompy ciepła
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Pompa ciepła to jedno z najbardziej ekonomicznych i ekologicznych źródeł ogrzewania domu. Pozwala zaoszczędzić nawet do 70% kosztów ogrzewania w porównaniu z ogrzewaniem gazowym lub olejowym. W PBAC oferujemy profesjonalny dobór, sprzedaż i montaż pomp ciepła powietrze-woda.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Współpracujemy z czołowymi producentami: Samsung EHS R290, Mitsubishi Heavy Hydrolution, Fujitsu Waterstage i Neoheat. Każda instalacja obejmuje analizę zapotrzebowania cieplnego budynku, dobór optymalnego urządzenia, kompleksowy montaż hydrauliczny i elektryczny oraz uruchomienie z konfiguracją.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              Pomagamy również w uzyskaniu dofinansowania z programu Czyste Powietrze i Moje Ciepło. Ceny pomp ciepła z montażem zaczynają się od ok. 30 000 zł.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a
              href="https://pompy.pbac.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 gradient-button text-white rounded-full uppercase text-sm tracking-wider px-10 py-5 font-bold transition-opacity hover:opacity-90"
            >
              Sprawdź ofertę pomp ciepła
              <ExternalLink className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </main>
  );
}
