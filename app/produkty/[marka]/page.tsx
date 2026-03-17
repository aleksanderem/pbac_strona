import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import ProductCard from "@/components/product-card";
import { getProductsByBrand, getProductBrands } from "@/lib/products";
import { getBrandBySlug } from "@/lib/brands";
import type { Brand } from "@/types";

interface Props {
  params: Promise<{ marka: string }>;
}

export async function generateStaticParams() {
  return getProductBrands().map((brand) => ({ marka: brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marka } = await params;
  const brand = getBrandBySlug(marka);
  if (!brand) return {};
  const count = getProductsByBrand(marka as Brand).length;
  return {
    title: `Klimatyzatory ${brand.name} — ${count} modeli | PBAC`,
    description: `Katalog klimatyzatorów ${brand.name} w ofercie PBAC. ${count} modeli z cenami i specyfikacjami. Montaż Warszawa.`,
    alternates: { canonical: `/produkty/${marka}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { marka } = await params;
  const brand = getBrandBySlug(marka);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(marka as Brand);
  if (brandProducts.length === 0) notFound();

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Produkty", href: "/produkty" },
    { name: brand.name },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Klimatyzatory ${brand.name}`,
    description: brand.description,
    url: `https://pbac.pl/produkty/${marka}`,
    numberOfItems: brandProducts.length,
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
              Klimatyzatory {brand.name}
            </h1>
            <p className="text-lg text-white/70 mb-4">
              {brandProducts.length} {brandProducts.length === 1 ? "model" : brandProducts.length < 5 ? "modele" : "modeli"} w ofercie · {brand.country}
            </p>
            <p className="text-white/60 leading-relaxed mb-12 max-w-3xl">
              {brand.description}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandProducts.map((product, idx) => (
              <FadeIn key={product.slug} delay={idx * 0.1}>
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
