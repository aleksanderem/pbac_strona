"use client";

import dynamic from "next/dynamic";
import "@/components/LightPillar.css";

const LightPillar = dynamic(() => import("@/components/LightPillar"), { ssr: false });

export default function LightPillarHero() {
  return (
    <div className="absolute inset-0 z-0">
      <LightPillar
        topColor="#5227FF"
        bottomColor="#d7096d"
        intensity={0.9}
        rotationSpeed={0.3}
        glowAmount={0.005}
        pillarWidth={5}
        pillarHeight={0.1}
        noiseIntensity={1.7}
        pillarRotation={72}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
    </div>
  );
}
