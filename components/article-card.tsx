import Link from "next/link";
import type { Article } from "@/types";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Category → gradient mapping for fallback card backgrounds
const categoryGradients: Record<string, string> = {
  Klimatyzatory: "from-blue-900/80 via-cyan-800/60 to-indigo-900/80",
  "Pompy ciepła": "from-emerald-900/80 via-teal-800/60 to-green-900/80",
  Serwis: "from-amber-900/80 via-orange-800/60 to-red-900/80",
  Montaż: "from-violet-900/80 via-purple-800/60 to-fuchsia-900/80",
};
const defaultGradient = "from-slate-900/80 via-blue-900/60 to-indigo-900/80";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const hasImage = !!article.coverImage;
  const gradient = categoryGradients[article.category] || defaultGradient;

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative block rounded-2xl border border-white/10 p-2 transition-colors hover:border-white/20"
    >
      <GlowingEffect spread={40} glow proximity={64} />
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md">
        <div className="relative aspect-[16/9] overflow-hidden">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverImage}
              alt={article.coverAlt}
              className="absolute inset-0 z-10 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
          {/* Gradient fallback — always rendered behind image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            {/* Subtle dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            {/* Large semi-transparent category text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="text-[3.5rem] font-montserrat font-black uppercase leading-none text-white/[0.06] select-none tracking-wider">
                {article.category}
              </span>
            </div>
            {/* Gradient icon accent — bottom-right decorative glow */}
            <div className="absolute -bottom-6 -right-6 size-32 rounded-full gradient-icon opacity-20 blur-2xl" />
          </div>
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute top-3 left-3 z-30 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
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
