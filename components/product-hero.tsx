"use client";

import dynamic from "next/dynamic";
import "@/components/MagicRings.css";

const MagicRings = dynamic(() => import("@/components/MagicRings"), { ssr: false });

interface ProductHeroProps {
  imageUrl: string;
  imageAlt: string;
  brandName?: string;
}

export default function ProductHero({ imageUrl, imageAlt, brandName }: ProductHeroProps) {
  return (
    <div className="relative w-full" style={{ height: "500px" }}>
      {/* MagicRings background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <MagicRings
          color="#ff4080"
          colorTwo="#6B8AFF"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0}
          hoverScale={1}
          parallax={0}
          clickBurst={false}
        />
      </div>

      {/* Content layered on top — brand at top, product centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center">
        {/* Brand name pinned to top */}
        {brandName && (
          <div className="pt-6">
            <span className="text-sm font-medium text-white/60 uppercase tracking-widest">
              {brandName}
            </span>
          </div>
        )}

        {/* Product image fills remaining space, centered */}
        <div className="flex-1 flex items-center justify-center px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-h-[400px] max-w-[600px] object-contain drop-shadow-[0_12px_60px_rgba(179,24,83,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}
