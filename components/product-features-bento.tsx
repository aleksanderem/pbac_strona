"use client";

import dynamic from "next/dynamic";
import "./MagicBento.css";

const MagicBento = dynamic(() => import("@/components/MagicBento"), {
  ssr: false,
});

interface ProductFeaturesBentoProps {
  features: string[];
  advantages: { title: string; desc: string }[];
}

export default function ProductFeaturesBento({
  features,
  advantages,
}: ProductFeaturesBentoProps) {
  // Convert features + advantages into MagicBento card items
  const items = [
    ...advantages.map((adv) => ({
      color: "#060010",
      title: adv.title,
      description: adv.desc,
      label: "Zaleta",
    })),
    ...features.slice(0, Math.max(0, 6 - advantages.length)).map((f) => ({
      color: "#060010",
      title: f,
      description: "",
      label: "Cecha",
    })),
  ].slice(0, 6);

  return (
    <div className="flex justify-center">
      <MagicBento
        items={items}
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="179, 24, 83"
        disableAnimations={false}
      />
    </div>
  );
}
