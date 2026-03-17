import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Snowflake, Thermometer, Wifi, Volume2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Klimatyzacja — Montaż i Serwis Warszawa | PBAC",
  description: "Profesjonalny montaż i serwis klimatyzacji w Warszawie. Split, multisplit, kasetonowe. Samsung, LG, Toshiba, Gree, Daikin. Bezpłatna wycena.",
  alternates: { canonical: "/klimatyzacja" },
};

const features = [
  { icon: Snowflake, title: "Chłodzenie", desc: "Efektywne chłodzenie pomieszczeń od 15 do 100+ m² z klasą energetyczną A++" },
  { icon: Thermometer, title: "Grzanie", desc: "Pompa ciepła powietrze-powietrze — ekonomiczne ogrzewanie zimą" },
  { icon: Volume2, title: "Cisza", desc: "Nowoczesne modele pracują od 16 dB — ciszej niż szept" },
  { icon: Wifi, title: "Smart", desc: "Sterowanie przez WiFi i aplikację — Samsung SmartThings, LG ThinQ" },
];

export default function KlimatyzacjaPage() {
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

      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <GridPattern className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" width={40} height={40} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-6">
              Klimatyzacja — montaż i serwis
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              PBAC oferuje kompleksowe usługi klimatyzacyjne w Warszawie i okolicach. Montujemy klimatyzatory ścienne, multisplit, kasetonowe i kanałowe ponad 10 marek premium. Każda instalacja obejmuje profesjonalny dobór urządzenia, montaż zgodny z wytycznymi producenta, uruchomienie i konfigurację.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              Współpracujemy z najlepszymi producentami: Samsung, LG, Toshiba, Gree, Daikin, Haier, AUX, Kaisai, Mitsubishi Electric i GE. Oferujemy bezpłatną wycenę i doradztwo w doborze optymalnego rozwiązania.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {features.map((f, idx) => (
              <FadeIn key={f.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                    <f.icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="font-montserrat text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-white/60">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/produkty" className="inline-flex items-center justify-center gradient-button text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-opacity hover:opacity-90">
                Zobacz katalog produktów
              </Link>
              <Link href="/montaz/warszawa" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10">
                Montaż w Warszawie
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </main>
  );
}
