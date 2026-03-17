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
    <div className="relative w-full flex flex-col items-center justify-center py-8 sm:py-12">
      {/* MagicRings background — absolutely positioned behind everything */}
      <div className="absolute inset-0 z-0">
        <MagicRings
          color="#B31853"
          colorTwo="#3D5EFF"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.5}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.15}
          hoverScale={1.1}
          parallax={0.05}
          clickBurst={true}
        />
      </div>

      {/* Product image — centered on top of rings */}
      <div className="relative z-10 flex items-center justify-center min-h-[30vh] sm:min-h-[40vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-h-[35vh] sm:max-h-[45vh] max-w-[70%] object-contain drop-shadow-[0_8px_40px_rgba(179,24,83,0.3)]"
        />
      </div>
    </div>
  );
}
