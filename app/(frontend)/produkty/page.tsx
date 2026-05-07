import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import HeroBackground from "@/components/hero-background";
import ProductCard from "@/components/product-card";
import {
  getAllProductsAsync,
  getFeaturedProductsAsync,
  getAllBrandsAsync,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Klimatyzatory — Katalog produktów | PBAC",
  description: "Katalog klimatyzatorów: Samsung, LG, Toshiba, Gree, Daikin, Haier, AUX, Kaisai. Ceny, specyfikacje, porównanie. Bezpłatna wycena.",
  alternates: { canonical: "/produkty" },
};

export default async function ProduktyPage() {
  const products = await getAllProductsAsync();
  const featured = await getFeaturedProductsAsync();
  const brands = await getAllBrandsAsync();
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Produkty" },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Katalog klimatyzatorów PBAC",
    description: "Pełny katalog klimatyzatorów dostępnych w ofercie PBAC.",
    url: "https://pbac.pl/produkty",
    numberOfItems: products.length,
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[collectionSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-4">
              Katalog <AuroraText className="font-montserrat">klimatyzatorów</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl">
              {products.length} klimatyzatorów od {brands.length} producentów. Znajdź idealny model dla swojego domu lub biura.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BRAND FILTER PILLS ═══ */}
      <section className="border-b border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white font-bold">
                Wszystkie ({products.length})
              </span>
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/produkty/${brand.slug}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {featured.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <DotPattern
            width={20}
            height={20}
            cr={1}
            className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-8">
                Polecane
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product, idx) => (
                <FadeIn key={product.slug} delay={idx * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ALL PRODUCTS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-8">
              Wszystkie klimatyzatory
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <FadeIn key={product.slug} delay={Math.min(idx * 0.05, 0.5)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
