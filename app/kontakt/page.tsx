import { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { getAllLocations } from "@/lib/locations";

const QuoteForm = dynamic(() => import("@/components/quote-form"));

export const metadata: Metadata = {
  title: "Kontakt — PBAC | Klimatyzacja Warszawa",
  description: "Skontaktuj się z PBAC. ☎ +48 503 151 802, biuro@pbac.pl. Marszałkowska 55/73, 00-676 Warszawa. Bezpłatna wycena klimatyzacji.",
  alternates: { canonical: "/kontakt" },
};

const contactInfo = [
  { icon: Phone, label: "Telefon", value: "+48 503 151 802", href: "tel:+48503151802" },
  { icon: Mail, label: "Email", value: "biuro@pbac.pl", href: "mailto:biuro@pbac.pl" },
  { icon: MapPin, label: "Adres", value: "Marszałkowska 55/73, 00-676 Warszawa" },
  { icon: Clock, label: "Godziny", value: "Pn–Pt 08:00–18:00" },
];

export default function KontaktPage() {
  const locations = getAllLocations();
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Kontakt" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://pbac.pl/#localbusiness",
    name: "PBAC",
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
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    }],
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[localBusinessSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      <section className="relative pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-12">Kontakt</h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <FadeIn>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Dane kontaktowe</h2>
              </FadeIn>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, idx) => (
                  <FadeIn key={item.label} delay={idx * 0.1}>
                    <div className="relative rounded-2xl border border-white/10 p-2">
                      <GlowingEffect spread={40} glow proximity={64} />
                      <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-5 flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-white/50 shrink-0" />
                        <div>
                          <div className="text-xs text-white/40 mb-0.5">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="font-bold hover:text-white/80 transition-colors">{item.value}</a>
                          ) : (
                            <span className="font-bold">{item.value}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.3}>
                <h3 className="font-montserrat text-lg font-bold mb-4">Obsługiwane miasta</h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/montaz/${l.slug}`}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
