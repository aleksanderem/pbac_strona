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
    <div className="relative w-full flex flex-col items-center justify-center" style={{ minHeight: "70vh" }}>
      {/* MagicRings — full bleed, large and dramatic */}
      <div className="absolute inset-0 z-0">
        <MagicRings
          color="#B31853"
          colorTwo="#3D5EFF"
          ringCount={12}
          speed={0.8}
          attenuation={6}
          lineThickness={2.5}
          baseRadius={0.15}
          radiusStep={0.08}
          scaleRate={0.15}
          opacity={0.8}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.2}
          fadeIn={0.5}
          fadeOut={0.7}
          followMouse={true}
          mouseInfluence={0.15}
          hoverScale={1.15}
          parallax={0.05}
          clickBurst={true}
        />
      </div>

      {/* Product image — centered, floating above rings */}
      <div className="relative z-10 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-h-[50vh] max-w-[55%] object-contain drop-shadow-[0_12px_60px_rgba(179,24,83,0.4)]"
        />
      </div>
    </div>
  );
}
