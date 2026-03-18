"use client";

import { useState } from "react";
import type { Article } from "@/types";
import ArticleCard from "@/components/article-card";
import FadeIn from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

interface BlogFilterProps {
  articles: Article[];
  categories: string[];
}

export default function BlogFilter({ articles, categories }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  const popular = articles.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
      {/* SIDEBAR */}
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-24 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Kategorie
            </h3>
            <div className="flex flex-row flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`text-left rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  activeCategory === null
                    ? "bg-white/10 text-white font-bold border border-white/20"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                Wszystkie ({articles.length})
              </button>
              {categories.map((cat) => {
                const count = articles.filter((a) => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                    className={`text-left rounded-lg px-4 py-2.5 text-sm transition-colors ${
                      activeCategory === cat
                        ? "bg-white/10 text-white font-bold border border-white/20"
                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular articles */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Popularne artykuły
            </h3>
            <div className="space-y-3">
              {popular.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 mt-0.5 transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-montserrat font-bold mb-2">
              Potrzebujesz porady?
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Nasi specjaliści pomogą dobrać klimatyzator do Twoich potrzeb.
            </p>
            <a
              href="tel:+48503151802"
              className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              503 151 802
            </a>
          </div>
        </div>
      </aside>

      {/* ARTICLES GRID */}
      <div className="order-1 lg:order-2">
        {/* Active category heading */}
        {activeCategory && (
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-montserrat text-2xl font-bold">
                {activeCategory}
                <span className="text-white/40 text-lg ml-2">({filtered.length})</span>
              </h2>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Wyczyść filtr
              </button>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((article, idx) => (
            <FadeIn key={article.slug} delay={Math.min(idx * 0.05, 0.4)}>
              <ArticleCard article={article} />
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg">Brak artykułów w tej kategorii</p>
          </div>
        )}
      </div>
    </div>
  );
}
