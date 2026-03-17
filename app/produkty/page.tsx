import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import ProductCard from "@/components/product-card";
import { getAllProducts } from "@/lib/products";
import { getAllBrands } from "@/lib/brands";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Klimatyzatory — Katalog produktów | PBAC",
  description: "Katalog klimatyzatorów: Samsung, LG, Toshiba, Gree, Daikin, Haier, AUX, Kaisai. Ceny, specyfikacje, porównanie. Bezpłatna wycena.",
  alternates: { canonical: "/produkty" },
};

export default function ProduktyPage() {
  const products = getAllProducts();
  const brands = getAllBrands();
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

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-4">
              Katalog klimatyzatorów
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-3xl">
              {products.length} klimatyzatorów od {brands.length} producentów. Znajdź idealny model dla swojego domu lub biura.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <FadeIn key={product.slug} delay={Math.min(idx * 0.05, 0.5)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
