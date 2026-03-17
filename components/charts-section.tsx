"use client";

import { useRef, useEffect, useState } from "react";
import { TrendingDown, Leaf } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import dynamic from "next/dynamic";
const Co2RadarChart = dynamic(() => import("@/components/co2-radar-chart"), { ssr: false });
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

/* ── data ─────────────────────────────────────────────── */

const annualCosts = [
  { label: "Ogrzewanie elektryczne", value: 9600, color: "#ef4444" },
  { label: "Olej opałowy", value: 6600, color: "#f97316" },
  { label: "Gaz ziemny", value: 5400, color: "#eab308" },
  { label: "Węgiel", value: 4800, color: "#a3a3a3" },
  { label: "Klimatyzator (split)", value: 4200, color: "#60a5fa" },
  { label: "Pompa ciepła", value: 2160, color: "#22c55e" },
];
const maxCost = Math.max(...annualCosts.map((d) => d.value));

/* ── animated bar ─────────────────────────────────────── */

function AnimatedBar({
  pct,
  color,
  delay,
  inView,
}: {
  pct: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          background: color,
          width: inView ? `${pct}%` : "0%",
          transition: `width 1s ease-out ${delay}s`,
        }}
      />
    </div>
  );
}

/* ── section ──────────────────────────────────────────── */

export default function ChartsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dane" className="relative py-20 px-4 overflow-hidden" ref={ref}>
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] z-0 fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            <AuroraText>Pompa ciepła</AuroraText> w liczbach
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Twarde dane, które potwierdzają przewagę pompy ciepła nad tradycyjnym
            ogrzewaniem i klimatyzacją. Obliczenia dla domu 120 m² ze średnią
            izolacją.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ── chart 1: annual costs ── */}
          <FadeIn className="relative rounded-2xl border border-white/10 p-2 h-full">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl gradient-icon flex items-center justify-center">
                <TrendingDown className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg text-white">
                  Roczny koszt ogrzewania
                </h3>
                <p className="text-white/40 text-sm">dom 120 m², średnia izolacja</p>
              </div>
            </div>
            <div className="space-y-4">
              {annualCosts.map((item, i) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{item.label}</span>
                    <span className="font-montserrat font-bold" style={{ color: item.color }}>
                      {item.value.toLocaleString("pl-PL")} zł
                    </span>
                  </div>
                  <AnimatedBar
                    pct={(item.value / maxCost) * 100}
                    color={item.color}
                    delay={i * 0.1}
                    inView={inView}
                  />
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4">
              * Dane szacunkowe na podstawie średnich cen energii w Polsce (2025)
            </p>
            </div>
          </FadeIn>

          {/* ── chart 2: CO₂ emissions radar ── */}
          <FadeIn delay={0.1} className="relative rounded-2xl border border-white/10 p-2 h-full">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl gradient-icon flex items-center justify-center">
                <Leaf className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg text-white">
                  Emisja CO₂ rocznie
                </h3>
                <p className="text-white/40 text-sm">wpływ na środowisko</p>
              </div>
            </div>
            <Co2RadarChart />
            <p className="text-white/30 text-xs mt-2">
              * Obliczenia uwzględniają polski mix energetyczny (2025)
            </p>
            </div>
          </FadeIn>
        </div>

        {/* ── summary highlight ── */}
        <FadeIn delay={0.4} className="mt-10 gradient-primary rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-montserrat text-4xl font-bold text-white">60%</p>
              <p className="text-white/70 text-sm mt-1">mniejsze rachunki vs gaz</p>
            </div>
            <div>
              <p className="font-montserrat text-4xl font-bold text-white">83%</p>
              <p className="text-white/70 text-sm mt-1">mniej CO₂ vs węgiel</p>
            </div>
            <div>
              <p className="font-montserrat text-4xl font-bold text-white">4×</p>
              <p className="text-white/70 text-sm mt-1">więcej ciepła z 1 kWh prądu</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
