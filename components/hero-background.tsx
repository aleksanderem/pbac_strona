"use client";

import dynamic from "next/dynamic";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), { ssr: false });

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <DarkVeil
        hueShift={230}
        noiseIntensity={0.09}
        scanlineIntensity={0.55}
        speed={1.4}
        warpAmount={0.45}
        resolutionScale={1}
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
