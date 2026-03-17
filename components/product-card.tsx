import Link from "next/link";
import type { Product } from "@/types";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Snowflake } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = product.models
    .map((m) => m.price)
    .filter((p): p is number => p !== undefined)
    .sort((a, b) => a - b)[0];

  return (
    <Link
      href={`/produkty/${product.brand}/${product.slug}`}
      className="group relative block rounded-2xl border border-white/10 p-2 transition-colors hover:border-white/20"
    >
      <GlowingEffect spread={40} glow proximity={64} />
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Snowflake className="w-16 h-16 text-white/10" />
            </div>
          )}
        </div>
        <div className="p-5">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 mb-3">
            {product.origin}
          </span>
          <h3 className="font-montserrat text-lg font-bold leading-tight line-clamp-2 mb-1 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-3">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between">
            {lowestPrice ? (
              <span className="text-lg font-bold text-white">
                od {lowestPrice.toLocaleString("pl-PL")} zł
              </span>
            ) : (
              <span className="text-sm text-white/50">Zapytaj o cenę</span>
            )}
            <span className="text-xs text-white/40">{product.powerRange}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
