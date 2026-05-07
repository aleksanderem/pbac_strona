import { Metadata } from "next";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { StripedPattern } from "@/components/ui/striped-pattern";
import HeroBackground from "@/components/hero-background";
import BlogFilter from "@/components/blog-filter";
import { getAllArticlesAsync, getCategoriesAsync } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog — Baza wiedzy o klimatyzacji | PBAC",
  description: "Poradniki, artykuły i porady dotyczące klimatyzacji: dobór, montaż, serwis, oszczędzanie energii. Baza wiedzy PBAC.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const articles = await getAllArticlesAsync();
  const categories = await getCategoriesAsync();
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Blog" },
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog PBAC — Baza wiedzy o klimatyzacji",
    description: "Poradniki, artykuły i porady dotyczące klimatyzacji.",
    url: "https://pbac.pl/blog",
    publisher: { "@id": "https://pbac.pl/#organization" },
    inLanguage: "pl-PL",
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[blogSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-4">
              <AuroraText className="font-montserrat">Blog</AuroraText> — Baza wiedzy
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl">
              Niezbędna wiedza przed zakupem klimatyzatora. Poradniki, porównania i odpowiedzi na najczęstsze pytania.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CATEGORY FILTER + ARTICLES ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20 text-white/40">
                <p className="text-lg">Artykuły wkrótce</p>
              </div>
            </FadeIn>
          ) : (
            <BlogFilter articles={articles} categories={categories} />
          )}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
