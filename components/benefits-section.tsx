"use client";

import { Snowflake, Volume2, Wallet, Leaf, Thermometer, Smartphone } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

const benefits = [
  {
    icon: Snowflake,
    title: "Chłodzenie",
    description:
      "Skuteczne chłodzenie pomieszczeń nawet w najgorętsze dni — komfort termiczny przez cały rok",
  },
  {
    icon: Thermometer,
    title: "Grzanie zimą",
    description:
      "Nowoczesne klimatyzatory z pompą ciepła ogrzewają dom do -15°C na zewnątrz",
  },
  {
    icon: Volume2,
    title: "Cisza",
    description:
      "Poziom hałasu od zaledwie 16 dB — ciszej niż szept, komfort w sypialni",
  },
  {
    icon: Wallet,
    title: "Oszczędność",
    description:
      "Klasa energetyczna A+++ — nawet 3x tańsze ogrzewanie niż tradycyjne metody",
  },
  {
    icon: Leaf,
    title: "Filtracja",
    description:
      "Zaawansowane filtry oczyszczają powietrze z kurzu, alergenów i bakterii",
  },
  {
    icon: Smartphone,
    title: "Smart sterowanie",
    description:
      "Steruj klimatyzacją z telefonu przez WiFi — włącz chłodzenie zanim wrócisz do domu",
  },
];

export default function BenefitsSection() {
  return (
    <section id="korzysci" className="relative py-20 px-4 overflow-hidden scroll-mt-20">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>
            Dlaczego <AuroraText>klimatyzacja</AuroraText>?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <FadeIn
                key={benefit.title}
                delay={index * 0.1}
                className="relative rounded-2xl border border-white/10 p-2"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
                  <div className="mb-4 size-12 rounded-xl gradient-icon flex items-center justify-center">
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
