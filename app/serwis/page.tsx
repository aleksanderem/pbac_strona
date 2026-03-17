import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { Settings } from "lucide-react";
import { getLocationsByService } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Serwis klimatyzacji — Warszawa | PBAC",
  description: "Profesjonalny serwis klimatyzacji w Warszawie. Przeglądy, czyszczenie, naprawy wszystkich marek. ☎ 503 151 802.",
  alternates: { canonical: "/serwis" },
};

export default function SerwisIndexPage() {
  const serwisLocations = getLocationsByService("serwis");
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Serwis klimatyzacji" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />
      <section className="relative pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-4">Serwis klimatyzacji</h1>
            <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-3xl">
              Oferujemy kompleksowy serwis klimatyzacji: przeglądy okresowe, czyszczenie i dezynfekcja, uzupełnianie czynnika chłodniczego, diagnostyka i naprawy. Serwisujemy klimatyzatory wszystkich marek.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {serwisLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/serwis/${location.slug}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors"
              >
                <Settings className="w-5 h-5 text-white/40" />
                <span className="font-montserrat font-bold">Serwis klimatyzacji {location.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
