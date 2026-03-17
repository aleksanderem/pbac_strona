"use client";

import { useState } from "react";
import type { Article } from "@/types";
import ArticleCard from "@/components/article-card";
import FadeIn from "@/components/ui/fade-in";

interface BlogFilterProps {
  articles: Article[];
  categories: string[];
}

export default function BlogFilter({ articles, categories }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  return (
    <>
      {categories.length > 1 && (
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeCategory === null
                  ? "border-white/20 bg-white/10 text-white font-bold"
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
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
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeCategory === cat
                      ? "border-white/20 bg-white/10 text-white font-bold"
                      : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </FadeIn>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, idx) => (
          <FadeIn key={article.slug} delay={Math.min(idx * 0.05, 0.5)}>
            <ArticleCard article={article} />
          </FadeIn>
        ))}
      </div>
    </>
  );
}
