"use client";

import dynamic from "next/dynamic";
import "@/components/MagicRings.css";

const MagicRings = dynamic(() => import("@/components/MagicRings"), { ssr: false });

interface ProductHeroProps {
  imageUrl: string;
  imageAlt: string;
  brandName?: string;
  warranty?: string;
}

export default function ProductHero({ imageUrl, imageAlt, brandName, warranty }: ProductHeroProps) {
  return (
    <div className="relative w-full" style={{ height: "500px" }}>
      {/* MagicRings background */}
      <div style={{ position: "absolute", width: "100vw", height: "860px", top: "-140px", left: "50%", transform: "translateX(-50%)" }}>
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
        {/* Warranty badge + brand name pinned to top */}
        <div className="pt-6 flex flex-col items-center gap-2">
          {warranty && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white/80">
              <svg className="size-3.5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              {warranty}
            </span>
          )}
        </div>

        {/* Product image fills remaining space, centered */}
        <div className="flex-1 flex items-center justify-center px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-h-[400px] max-w-[800px] w-full object-contain drop-shadow-[0_12px_60px_rgba(179,24,83,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}
