import { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/json-ld";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import { testimonials } from "@/lib/testimonials";
import { homepageFaqs } from "@/components/faq-section";

const WhyPbacSection = dynamic(() => import("@/components/why-pbac-section"));
const HowWeWorkSection = dynamic(() => import("@/components/how-we-work-section"));
const LocationsSection = dynamic(() => import("@/components/locations-section"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"));
const QuoteForm = dynamic(() => import("@/components/quote-form"));
const FaqSection = dynamic(() => import("@/components/faq-section"));
const Footer = dynamic(() => import("@/components/footer"));
const StickyPhone = dynamic(() => import("@/components/sticky-phone"));

export const metadata: Metadata = {
  title: "PBAC — Klimatyzacja, Pompy Ciepła | Montaż i Serwis Warszawa",
  description:
    "Montaż klimatyzacji od 4000 zł. Samsung, LG, Toshiba, Gree, Daikin — certyfikowani instalatorzy w Warszawie i okolicach. Bezpłatna wycena.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PBAC — Klimatyzacja, Pompy Ciepła | Montaż i Serwis Warszawa",
    description:
      "Montaż klimatyzacji od 4000 zł. Samsung, LG, Toshiba, Gree, Daikin — certyfikowani instalatorzy w Warszawie.",
    type: "website",
    siteName: "PBAC",
    url: "https://pbac.pl",
    images: [
      {
        url: "https://pbac.pl/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "PBAC — Klimatyzacja i Pompy Ciepła Warszawa",
      },
    ],
  },
};

export default function Home() {
  const ratingValue =
    Math.round(
      (testimonials.reduce((sum, t) => sum + t.rating, 0) /
        testimonials.length) *
        100
    ) / 100;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://pbac.pl/#localbusiness",
    name: "PBAC — Montaż klimatyzacji i pomp ciepła",
    image: "https://pbac.pl/images/pbac-logo.png",
    url: "https://pbac.pl",
    telephone: "+48503151802",
    email: "biuro@pbac.pl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marszałkowska 55/73",
      postalCode: "00-676",
      addressLocality: "Warszawa",
      addressRegion: "mazowieckie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.2297,
      longitude: 21.0122,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: { "@type": "City", name: "Warszawa" },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 52.2297,
        longitude: 21.0122,
      },
      geoRadius: "50000",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount: testimonials.length,
      ratingCount: testimonials.length,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.body,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://pbac.pl/#website",
    name: "PBAC — Klimatyzacja i Pompy Ciepła Warszawa",
    url: "https://pbac.pl",
    description:
      "Profesjonalny montaż i serwis klimatyzacji w Warszawie. Samsung, LG, Toshiba, Gree, Daikin. Wycena gratis.",
    publisher: { "@id": "https://pbac.pl/#organization" },
    inLanguage: "pl-PL",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://pbac.pl/#faq",
    mainEntity: homepageFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Jak zamówić montaż klimatyzacji w PBAC",
    description:
      "Proces zamawiania montażu klimatyzacji w 4 prostych krokach — od kontaktu po serwis gwarancyjny.",
    totalTime: "P7D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Kontakt i wycena",
        text: "Skontaktuj się z nami telefonicznie lub przez formularz, a przygotujemy bezpłatną wycenę.",
        url: "https://pbac.pl/#wycena",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Dobór urządzenia",
        text: "Nasi specjaliści dobiorą optymalny klimatyzator na podstawie metrażu i potrzeb.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Profesjonalny montaż",
        text: "Realizujemy montaż zgodnie z najwyższymi standardami producenta.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Serwis i gwarancja",
        text: "Zapewniamy pełen serwis gwarancyjny i pogwarancyjny.",
      },
    ],
  };

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Montaż klimatyzacji",
      description: "Profesjonalny montaż klimatyzatorów ściennych, kasetonowych i kanałowych z doborem urządzenia i uruchomieniem.",
      provider: { "@id": "https://pbac.pl/#localbusiness" },
      areaServed: { "@type": "City", name: "Warszawa" },
      offers: { "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: 4000, highPrice: 15000 },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Serwis klimatyzacji",
      description: "Przeglądy, czyszczenie, dezynfekcja i naprawy klimatyzatorów wszystkich marek.",
      provider: { "@id": "https://pbac.pl/#localbusiness" },
      areaServed: { "@type": "City", name: "Warszawa" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Pompy ciepła",
      description: "Sprzedaż i montaż pomp ciepła powietrze-woda. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat.",
      provider: { "@id": "https://pbac.pl/#localbusiness" },
      areaServed: { "@type": "City", name: "Warszawa" },
      sameAs: "https://pompy.pbac.pl",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Wynajem klimatyzatorów",
      description: "Wynajem klimatyzatorów przenośnych na dni, tygodnie lub miesiące z dostawą w Warszawie.",
      provider: { "@id": "https://pbac.pl/#localbusiness" },
      areaServed: { "@type": "City", name: "Warszawa" },
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://pbac.pl" },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-black text-white">
      <JsonLd
        data={[
          websiteSchema,
          localBusinessSchema,
          faqSchema,
          howToSchema,
          ...serviceSchemas,
          breadcrumbSchema,
        ]}
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyPbacSection />
      <HowWeWorkSection />
      <LocationsSection />
      <TestimonialsSection />
      <QuoteForm />
      <FaqSection />
      <Footer />
      <StickyPhone />
    </main>
  );
}
