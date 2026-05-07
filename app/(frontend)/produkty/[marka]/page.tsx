import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import HeroBackground from "@/components/hero-background";
import ProductCard from "@/components/product-card";
import {
  getProductsByBrandAsync,
  getProductBrandsAsync,
  getAllBrandsAsync,
  getBrandBySlugAsync,
} from "@/lib/cms";
import type { Brand } from "@/types";
import { ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ marka: string }>;
}

export async function generateStaticParams() {
  const brands = await getProductBrandsAsync();
  return brands.map((brand) => ({ marka: brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marka } = await params;
  const brand = await getBrandBySlugAsync(marka);
  if (!brand) return {};
  const count = (await getProductsByBrandAsync(marka as Brand)).length;
  return {
    title: `Klimatyzatory ${brand.name} — ${count} modeli | PBAC`,
    description: `Katalog klimatyzatorów ${brand.name} w ofercie PBAC. ${count} modeli z cenami i specyfikacjami. Montaż Warszawa.`,
    alternates: { canonical: `/produkty/${marka}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { marka } = await params;
  const brand = await getBrandBySlugAsync(marka);
  if (!brand) notFound();

  const brandProducts = await getProductsByBrandAsync(marka as Brand);
  if (brandProducts.length === 0) notFound();

  const allBrands = (await getAllBrandsAsync()).filter((b) => b.slug !== marka);

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

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-4">
              Klimatyzatory <AuroraText className="font-montserrat">{brand.name}</AuroraText>
            </h1>
            <p className="text-lg text-white/70 mb-4">
              {brandProducts.length} {brandProducts.length === 1 ? "model" : brandProducts.length < 5 ? "modele" : "modeli"} w ofercie
            </p>
            <p className="text-white/60 leading-relaxed max-w-3xl">
              {brand.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandProducts.map((product, idx) => (
              <FadeIn key={product.slug} delay={idx * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OTHER BRANDS ═══ */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-montserrat text-2xl font-bold mb-8">Inne marki w ofercie</h2>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {allBrands.map((b) => (
              <Link key={b.slug} href={`/produkty/${b.slug}`} className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors">
                {b.name}
                <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
