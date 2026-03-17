import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative block rounded-2xl border border-white/10 p-2 transition-colors hover:border-white/20"
    >
      <GlowingEffect spread={40} glow proximity={64} />
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute top-3 left-3 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            {article.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-montserrat text-lg font-bold leading-tight line-clamp-2 mb-2 group-hover:text-white transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{article.readingTime} min czytania</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
