"use client";

import { useRef, useState, useEffect } from "react";

const COMPARISON_RATES = [
  { name: "vs Ogrzewanie elektr.", costPerM2: 80, color: "#ef4444" },
  { name: "vs Wentylatory + grzejniki", costPerM2: 65, color: "#f97316" },
  { name: "vs Klimatyzator przenośny", costPerM2: 50, color: "#eab308" },
  { name: "vs Gaz + brak chłodzenia", costPerM2: 45, color: "#a3a3a3" },
];
const AC_COST_PER_M2 = 22;
const YEARS = 10;

interface CostRaceChartProps {
  area?: number;
  insulationMult?: number;
}

export default function CostRaceChart({ area = 60, insulationMult = 1 }: CostRaceChartProps) {
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
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const acAnnual = Math.round(area * AC_COST_PER_M2 * insulationMult);

  const sources = COMPARISON_RATES.map((r) => {
    const annualCost = Math.round(area * r.costPerM2 * insulationMult);
    const savingsPerYear = annualCost - acAnnual;
    const totalSavings = savingsPerYear * YEARS;
    return { ...r, annualCost, savingsPerYear, totalSavings };
  });

  const maxSavings = sources[0].totalSavings;

  return (
    <div ref={ref}>
      <div
        className="w-full space-y-5"
        style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out" }}
      >
        <div className="flex items-center justify-between text-xs text-white/40 mb-1">
          <span>Oszczędności po {YEARS} latach vs klimatyzacja</span>
          <span>lokal {area} m²</span>
        </div>

        {sources.map((source, i) => {
          const pct = (source.totalSavings / maxSavings) * 100;
          return (
            <div key={source.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: source.color }}
                  />
                  <span className="text-white/70">{source.name}</span>
                </div>
                <span className="font-montserrat font-bold text-green-400 tabular-nums">
                  +{source.totalSavings.toLocaleString("pl-PL")} zł
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: source.color,
                    width: inView ? `${pct}%` : "0%",
                    transition: `width 1.2s ease-out ${0.2 + i * 0.15}s`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/30">
                <span>{source.savingsPerYear.toLocaleString("pl-PL")} zł/rok taniej</span>
                <span>{source.annualCost.toLocaleString("pl-PL")} vs {acAnnual.toLocaleString("pl-PL")} zł/rok</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
