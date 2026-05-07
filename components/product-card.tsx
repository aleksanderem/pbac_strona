import { formatPLN } from "@/lib/utils";

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

  const brandName = product.brand.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Link
      href={`/produkty/${product.brand}/${product.slug}`}
      className="group relative block rounded-2xl border border-white/10 p-2 transition-colors hover:border-white/20"
    >
      <GlowingEffect spread={40} glow proximity={64} />
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md">
        {/* Brand name above image */}
        <div className="px-4 pt-3 pb-1">
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {brandName}
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="absolute inset-0 w-full h-full object-contain p-4"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Snowflake className="w-16 h-16 text-white/10" />
            </div>
          )}
        </div>
        <div className="p-4 pt-2">
          <h3 className="font-montserrat text-lg font-bold leading-tight line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-2">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between">
            {lowestPrice ? (
              <span className="text-lg font-bold text-white">
                od {formatPLN(lowestPrice)} zł
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
