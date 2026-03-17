import Link from "next/link";
import FadeIn from "@/components/ui/fade-in";
import ArticleCard from "@/components/article-card";
import { getLatestArticles } from "@/lib/articles";

export default function LatestBlogSection() {
  const latest = getLatestArticles(3);
  if (latest.length === 0) return null;

  return (
    <section id="blog" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Baza wiedzy
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Poradniki, porównania i odpowiedzi na pytania o klimatyzację
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {latest.map((article, idx) => (
            <FadeIn key={article.slug} delay={idx * 0.1}>
              <ArticleCard article={article} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10"
            >
              Wszystkie artykuły
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
