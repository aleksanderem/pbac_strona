"use client";

import dynamic from "next/dynamic";
import "@/components/MagicRings.css";

const MagicRings = dynamic(() => import("@/components/MagicRings"), { ssr: false });

interface ProductHeroProps {
  imageUrl: string;
  imageAlt: string;
  name?: string;
}

export default function ProductHero({ imageUrl, imageAlt }: ProductHeroProps) {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: "500px" }}>
      {/* MagicRings — exact reactbits.dev params */}
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
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      {/* Product image centered */}
      <div className="relative z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-h-[420px] max-w-[500px] object-contain drop-shadow-[0_12px_60px_rgba(179,24,83,0.3)]"
        />
      </div>
    </div>
  );
}
