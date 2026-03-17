import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import ArticleCard from "@/components/article-card";
import { getAllArticles, getCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog — Baza wiedzy o klimatyzacji | PBAC",
  description: "Poradniki, artykuły i porady dotyczące klimatyzacji: dobór, montaż, serwis, oszczędzanie energii. Baza wiedzy PBAC.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const articles = getAllArticles();
  const categories = getCategories();
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

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <FadeIn>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-4">
              Blog — Baza wiedzy
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-3xl">
              Niezbędna wiedza przed zakupem klimatyzatora. Poradniki, porównania i odpowiedzi na najczęstsze pytania.
            </p>
          </FadeIn>

          {articles.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="text-center py-20 text-white/40">
                <p className="text-lg">Artykuły wkrótce</p>
              </div>
            </FadeIn>
          ) : (
            <>
              {categories.length > 1 && (
                <FadeIn delay={0.1}>
                  <div className="flex flex-wrap gap-2 mb-12">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
                      Wszystkie
                    </span>
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                  <FadeIn key={article.slug} delay={Math.min(idx * 0.05, 0.5)}>
                    <ArticleCard article={article} />
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
