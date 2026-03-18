import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getLowestPrice, getProductsByBrand } from "@/lib/products";
import { getBrandBySlug } from "@/lib/brands";
import { getLatestArticles } from "@/lib/articles";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";
import { StripedPattern } from "@/components/ui/striped-pattern";
import ProductHero from "@/components/product-hero";
import ProductGallery from "@/components/product-gallery";
import ProductVariantSelector from "@/components/product-variant-selector";
import ProductCard from "@/components/product-card";
import ArticleCard from "@/components/article-card";
import { Phone, CheckCircle, ArrowRight, Wrench, Settings } from "lucide-react";
import type { Brand } from "@/types";

interface Props {
  params: Promise<{ marka: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ marka: p.brand, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Klimatyzator | PBAC Warszawa`,
    description: `${product.tagline}. ${product.powerRange}, czynnik ${product.refrigerant}. Montaż Warszawa. Cena od ${getLowestPrice(product)?.toLocaleString("pl-PL")} zł.`,
    alternates: { canonical: `/produkty/${product.brand}/${slug}` },
    openGraph: {
      title: `${product.name} — Klimatyzator | PBAC`,
      description: product.tagline,
      type: "website",
      siteName: "PBAC",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, marka } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.brand !== marka) notFound();

  const brand = getBrandBySlug(marka);
  const lowestPrice = getLowestPrice(product);
  const otherProducts = getProductsByBrand(marka as Brand).filter((p) => p.slug !== slug).slice(0, 3);
  const latestArticles = getLatestArticles(3);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Produkty", href: "/produkty" },
    { name: brand?.name || marka, href: `/produkty/${marka}` },
    { name: product.name },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://pbac.pl/produkty/${marka}/${slug}`,
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    brand: { "@type": "Brand", name: brand?.name || marka },
    category: "Klimatyzatory",
    url: `https://pbac.pl/produkty/${marka}/${slug}`,
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
    offers: lowestPrice
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "PLN",
          lowPrice: lowestPrice,
          highPrice: Math.max(...product.models.map((m) => m.price || 0)),
          offerCount: product.models.length,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", "@id": "https://pbac.pl/#organization" },
        }
      : undefined,
  };

  const faqSchema = product.faq && product.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[productSchema, buildBreadcrumbSchema(breadcrumbItems), ...(faqSchema ? [faqSchema] : [])]} />
      <Navbar />

      {/* ═══ HERO — MagicRings full width, image centered, info below ═══ */}
      <section className="relative pt-28 overflow-hidden">
        {/* Breadcrumb */}
        <div className="relative z-20 max-w-6xl mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* MagicRings + Product image — full width centered */}
        <FadeIn>
          <ProductHero
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            brandName={brand?.name || marka}
            warranty={product.warranty}
          />
        </FadeIn>

        {/* Product title + info centered below */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pb-12">
          <FadeIn delay={0.1}>
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              {product.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-4">{product.tagline}</p>
            {lowestPrice && (
              <p className="text-2xl sm:text-3xl font-bold mb-8">
                od <span className="text-white">{lowestPrice.toLocaleString("pl-PL")} zł</span>
              </p>
            )}
          </FadeIn>

          {/* Specs grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              {product.specs.filter((spec) => spec.label !== "Gwarancja").map((spec) => (
                <div key={spec.label} className="relative rounded-2xl border border-white/15 p-1">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-sm p-5 text-center">
                    <div className="text-xs text-white/50 mb-2 uppercase tracking-wider font-medium">{spec.label}</div>
                    <div className="text-xl font-bold text-white">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PRODUCT DETAILS: Gallery left, Variant selector + CTA right ═══ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: Gallery */}
            <FadeIn>
              <ProductGallery
                images={product.gallery || []}
                mainImage={product.imageUrl}
                productName={product.name}
              />
            </FadeIn>

            {/* RIGHT: Variant selector + CTA */}
            <div>
              <FadeIn delay={0.1}>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Wybierz wariant</h2>
                <ProductVariantSelector models={product.models} />
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a
                    href="tel:+48503151802"
                    className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90"
                  >
                    <Phone className="w-4 h-4" />
                    Zapytaj o ten produkt
                  </a>
                  <a
                    href="/#wycena"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors"
                  >
                    Bezpłatna wycena
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESCRIPTION (left) + FEATURES (right) ═══ */}
      <section className="relative py-16 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: Description */}
            <FadeIn>
              <h2 className="font-montserrat text-2xl font-bold mb-6">Opis</h2>
              <div className="space-y-5 text-white/70 leading-relaxed">
                {product.descriptionLong.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeIn>

            {/* RIGHT: Features */}
            <FadeIn delay={0.1}>
              <h2 className="font-montserrat text-2xl font-bold mb-6">Cechy i funkcje</h2>
              <div className="flex flex-col gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Advantages */}
          {product.advantages.length > 0 && (
            <div className="mt-12">
              <FadeIn>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Kluczowe zalety</h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.advantages.map((adv, idx) => (
                  <FadeIn key={adv.title} delay={idx * 0.1}>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 h-full">
                      <h3 className="font-montserrat font-bold mb-2">{adv.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{adv.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {product.faq && product.faq.length > 0 && (
            <div className="mt-12">
              <FadeIn>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Najczęstsze pytania</h2>
              </FadeIn>
              <div className="space-y-4">
                {product.faq.map((f, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="relative rounded-2xl border border-white/10 p-2">
                      <GlowingEffect spread={40} glow proximity={64} />
                      <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                        <h3 className="font-montserrat font-bold mb-2">{f.question}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{f.answer}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/montaz/warszawa", icon: Wrench, label: "Zamów montaż tego produktu", desc: "Profesjonalny montaż w Warszawie i okolicach" },
              { href: "/serwis/warszawa", icon: Settings, label: "Serwis i przeglądy", desc: "Czyszczenie, dezynfekcja, naprawy" },
            ].map((link) => (
              <FadeIn key={link.href}>
                <Link href={link.href} className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl gradient-icon flex items-center justify-center shrink-0">
                    <link.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-montserrat font-bold text-sm mb-1 group-hover:text-white transition-colors">{link.label}</div>
                    <div className="text-xs text-white/40">{link.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OTHER PRODUCTS FROM SAME BRAND ═══ */}
      {otherProducts.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <StripedPattern
            width={12}
            height={12}
            className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-8">
                Inne produkty <AuroraText>{brand?.name || marka}</AuroraText>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p, idx) => (
                <FadeIn key={p.slug} delay={idx * 0.1}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RELATED ARTICLES ═══ */}
      {latestArticles.length > 0 && (
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
                Powiązane artykuły
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((a, idx) => (
                <FadeIn key={a.slug} delay={idx * 0.1}>
                  <ArticleCard article={a} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ STICKY CTA MOBILE ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-black/90 backdrop-blur-md border-t border-white/10 p-3">
        <div className="flex gap-2 max-w-lg mx-auto">
          <a
            href="tel:+48503151802"
            className="flex-1 inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full py-3 font-bold text-sm"
          >
            <Phone className="w-4 h-4" />
            Zadzwoń
          </a>
          <a
            href="/#wycena"
            className="flex-1 inline-flex items-center justify-center border border-white/20 text-white rounded-full py-3 font-bold text-sm"
          >
            Wycena
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
