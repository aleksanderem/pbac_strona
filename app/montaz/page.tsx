import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MapPin } from "lucide-react";
import { getLocationsByService } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Montaż klimatyzacji — Warszawa i okolice | PBAC",
  description: "Profesjonalny montaż klimatyzacji w 13 miastach: Warszawa, Kraków, Siedlce, Piaseczno i inne. Certyfikowani instalatorzy PBAC. Bezpłatna wycena.",
  alternates: { canonical: "/montaz" },
};

export default function MontazIndexPage() {
  const montazLocations = getLocationsByService("montaz");
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Montaż klimatyzacji" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      <section className="relative pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-4">
              Montaż klimatyzacji
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-16 max-w-3xl">
              Realizujemy profesjonalny montaż klimatyzacji w 13 miastach. Wybierz swoją lokalizację, aby dowiedzieć się więcej o usługach dostępnych w Twoim regionie.
            </p>
          </FadeIn>

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
                    <p className="text-sm text-white/60 line-clamp-2">
                      {location.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
