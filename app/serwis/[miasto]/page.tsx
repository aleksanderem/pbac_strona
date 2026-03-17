import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLocationBySlug, getLocationsByService } from "@/lib/locations";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Settings, Phone, CheckCircle } from "lucide-react";

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

export default async function SerwisPage({ params }: Props) {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location || !location.services.includes("serwis")) notFound();

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

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[serviceSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <GridPattern className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" width={40} height={40} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Settings className="w-6 h-6 text-white/40" />
              <span className="text-white/50 text-sm">Serwis klimatyzacji</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              Serwis klimatyzacji {location.name}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              Oferujemy kompleksowy serwis klimatyzacji w {location.name}: okresowe przeglądy, czyszczenie i dezynfekcja filtrów, uzupełnianie czynnika chłodniczego, diagnostyka usterek oraz naprawy. Serwisujemy klimatyzatory wszystkich marek.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-montserrat text-2xl font-bold mb-6">Co obejmuje serwis?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
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

          <FadeIn delay={0.3}>
            <div className="gradient-primary rounded-xl p-8 text-center">
              <h2 className="font-montserrat text-2xl font-bold mb-3">
                Umów serwis klimatyzacji w {location.name}
              </h2>
              <p className="text-white/80 mb-6">Zadzwoń lub napisz — umówimy dogodny termin</p>
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
