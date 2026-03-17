import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { Clock, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Wynajem klimatyzatorów Warszawa | PBAC",
  description: "Wynajem klimatyzatorów przenośnych w Warszawie. Dostawa i odbiór. Na dni, tygodnie, miesiące. ☎ 503 151 802.",
  alternates: { canonical: "/wynajem-klimatyzatorow" },
};

export default function WynajemPage() {
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Wynajem klimatyzatorów" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wynajem klimatyzatorów Warszawa",
    description: "Wynajem klimatyzatorów przenośnych na dni, tygodnie lub miesiące z dostawą i odbiorem na terenie Warszawy.",
    provider: { "@id": "https://pbac.pl/#localbusiness" },
    areaServed: { "@type": "City", name: "Warszawa" },
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
              <Clock className="w-6 h-6 text-white/40" />
              <span className="text-white/50 text-sm">Wynajem krótko- i długoterminowy</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              Wynajem klimatyzatorów
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              Oferujemy wynajem klimatyzatorów przenośnych na krótkie i długie okresy. Idealne rozwiązanie na czas remontu, wydarzenia, sezonu letniego lub jako tymczasowe uzupełnienie stałej klimatyzacji. Dostarczamy i odbieramy sprzęt na terenie Warszawy i okolic.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-montserrat text-2xl font-bold mb-6">Co oferujemy?</h2>
            <div className="space-y-3 mb-12">
              {[
                "Klimatyzatory przenośne o mocy 2.5–5.0 kW (20–50 m²)",
                "Wynajem na dni, tygodnie lub miesiące",
                "Dostawa i odbiór na terenie Warszawy wliczone w cenę",
                "Urządzenia gotowe do użycia — podłącz i chłodź",
                "Elastyczne warunki przedłużenia wynajmu",
                "Możliwość wymiany na inny model w trakcie wynajmu",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="gradient-primary rounded-xl p-8 text-center">
              <h2 className="font-montserrat text-2xl font-bold mb-3">Zamów wynajem</h2>
              <p className="text-white/80 mb-6">Zadzwoń i podaj termin, lokalizację i wielkość pomieszczenia</p>
              <a
                href="tel:+48503151802"
                className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 font-bold text-sm hover:bg-white/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +48 503 151 802
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </main>
  );
}
