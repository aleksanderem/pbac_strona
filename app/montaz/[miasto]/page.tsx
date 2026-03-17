import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLocationBySlug, getLocationsByService } from "@/lib/locations";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MapPin, Phone, CheckCircle } from "lucide-react";

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

export default async function MontazPage({ params }: Props) {
  const { miasto } = await params;
  const location = getLocationBySlug(miasto);
  if (!location || !location.services.includes("montaz")) notFound();

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
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://pbac.pl/#localbusiness",
      name: "PBAC",
      telephone: "+48503151802",
    },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.region,
      },
    },
    serviceType: "Montaż klimatyzacji",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: `PBAC — Montaż klimatyzacji ${location.name}`,
    url: `https://pbac.pl/montaz/${location.slug}`,
    telephone: "+48503151802",
    email: "montaz@pbac.pl",
    areaServed: { "@type": "City", name: location.name },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[serviceSchema, localBusinessSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <GridPattern
          className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          width={40}
          height={40}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <MapPin className="w-6 h-6 text-white/40" />
              <span className="text-white/50 text-sm">{location.region}</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
              Montaż klimatyzacji {location.name}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              {location.description}
            </p>
          </FadeIn>

          {location.sections.map((section, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="mb-10">
                <h2 className="font-montserrat text-2xl font-bold mb-4">
                  {section.heading}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.3}>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 mb-12">
              <h2 className="font-montserrat text-2xl font-bold mb-6">
                Dlaczego PBAC w {location.name}?
              </h2>
              <ul className="space-y-3">
                {[
                  "Bezpłatna wycena i doradztwo w doborze urządzenia",
                  "Ponad 10 marek klimatyzatorów w ofercie",
                  "Montaż zgodny z wytycznymi producenta",
                  "Gwarancja na urządzenie i instalację",
                  "Serwis pogwarancyjny i przeglądy okresowe",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {location.faq.length > 0 && (
            <FadeIn delay={0.4}>
              <h2 className="font-montserrat text-2xl font-bold mb-6">
                Najczęstsze pytania — {location.name}
              </h2>
              <div className="space-y-4 mb-12">
                {location.faq.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 className="font-montserrat font-bold mb-2">{faq.question}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.5}>
            <div className="gradient-primary rounded-xl p-8 text-center">
              <h2 className="font-montserrat text-2xl font-bold mb-3">
                Zamów montaż klimatyzacji w {location.name}
              </h2>
              <p className="text-white/80 mb-6">
                Zadzwoń lub wypełnij formularz — bezpłatna wycena w 24h
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+48503151802"
                  className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 font-bold text-sm hover:bg-white/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +48 503 151 802
                </a>
                <a
                  href="/#wycena"
                  className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-8 py-3 font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  Formularz wyceny
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
