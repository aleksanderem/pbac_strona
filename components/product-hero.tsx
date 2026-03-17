"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import "@/components/MagicRings.css";

const MagicRings = dynamic(() => import("@/components/MagicRings"), { ssr: false });

interface ProductHeroProps {
  imageUrl: string;
  imageAlt: string;
  name: string;
}

export default function ProductHero({ imageUrl, imageAlt, name }: ProductHeroProps) {
  return (
    <div className="relative aspect-square rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
      {/* MagicRings background */}
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
          opacity={0.6}
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
      {/* Product image floating above rings */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="relative z-10 object-contain p-8 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        priority
      />
    </div>
  );
}
