import { Metadata } from "next";
import dynamic from "next/dynamic";
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
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getAllLocationsAsync } from "@/lib/cms";

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

export default async function KontaktPage() {
  const locations = await getAllLocationsAsync();
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

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-6">
              <AuroraText className="font-montserrat">Kontakt</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
              Skontaktuj się z nami telefonicznie, mailowo lub wypełnij formularz wyceny. Odpowiadamy w ciągu 24h.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CONTACT INFO + FORM ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <FadeIn>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-8">Dane kontaktowe</h2>
              </FadeIn>
              <div className="space-y-4 mb-10">
                {contactInfo.map((item, idx) => (
                  <FadeIn key={item.label} delay={idx * 0.1}>
                    <div className="relative rounded-2xl border border-white/10 p-2">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                      <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl gradient-icon flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
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

              <FadeIn delay={0.4}>
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
              
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
