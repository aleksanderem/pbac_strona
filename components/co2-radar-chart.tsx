"use client";

import { useRef, useState, useEffect } from "react";

const co2Data = [
  { name: "Węgiel", value: 8.2 },
  { name: "Olej opałowy", value: 5.8 },
  { name: "Gaz ziemny", value: 4.5 },
  { name: "Ogrzew. elektr.", value: 3.9 },
  { name: "Klimatyzator", value: 2.8 },
  { name: "Pompa ciepła", value: 1.4 },
];

const MAX = 10;
const CX = 150;
const CY = 140;
const R = 110;
const PUMP_VALUE = 1.4;
const RINGS = 4;
const N = co2Data.length;

function polarToXY(i: number, value: number) {
  const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
  const r = (value / MAX) * R;
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const p = polarToXY(i, v);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

export default function Co2RadarChart() {
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

  const dataPoints = polygonPoints(co2Data.map((d) => d.value));
  const pumpPoints = polygonPoints(co2Data.map(() => PUMP_VALUE));
  const zeroPoints = polygonPoints(co2Data.map(() => 0));

  return (
    <div ref={ref}>
      <div
        className="w-full flex flex-col items-center"
        style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out" }}
      >
        <svg viewBox="0 0 300 300" className="w-full max-w-[350px] h-auto">
          <defs>
            <linearGradient id="co2-red" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(239,68,68,0.25)" />
              <stop offset="100%" stopColor="rgba(239,68,68,0.05)" />
            </linearGradient>
            <linearGradient id="co2-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0.08)" />
            </linearGradient>
          </defs>

          {/* Grid rings */}
          {Array.from({ length: RINGS }, (_, ring) => {
            const val = (MAX / RINGS) * (ring + 1);
            const pts = polygonPoints(co2Data.map(() => val));
            return (
              <polygon
                key={ring}
                points={pts}
                fill={ring % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)"}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5}
              />
            );
          })}

          {/* Axis lines */}
          {co2Data.map((_, i) => {
            const p = polarToXY(i, MAX);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={0.5}
              />
            );
          })}

          {/* Data area — traditional emissions */}
          <polygon
            points={inView ? dataPoints : zeroPoints}
            fill="url(#co2-red)"
            stroke="#ef4444"
            strokeWidth={2}
            style={{ transition: "points 1.2s ease-out" }}
          />

          {/* Data area — heat pump */}
          <polygon
            points={inView ? pumpPoints : zeroPoints}
            fill="url(#co2-green)"
            stroke="#22c55e"
            strokeWidth={2}
            style={{ transition: "points 1.2s ease-out 0.3s" }}
          />

          {/* Data dots — traditional */}
          {co2Data.map((d, i) => {
            const p = polarToXY(i, d.value);
            return (
              <circle
                key={`red-${i}`}
                cx={p.x}
                cy={p.y}
                r={3}
                fill="#ef4444"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.3s ease-out ${1 + i * 0.05}s`,
                }}
              />
            );
          })}

          {/* Data dots — pump */}
          {co2Data.map((_, i) => {
            const p = polarToXY(i, PUMP_VALUE);
            return (
              <circle
                key={`green-${i}`}
                cx={p.x}
                cy={p.y}
                r={3}
                fill="#22c55e"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.3s ease-out ${1.3 + i * 0.05}s`,
                }}
              />
            );
          })}

          {/* Axis labels */}
          {co2Data.map((d, i) => {
            const p = polarToXY(i, MAX + 1.5);
            return (
              <text
                key={`label-${i}`}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize={9}
              >
                {d.name}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-2 rounded-sm bg-red-500" />
            <span className="text-white/50 text-xs">Emisja tradycyjna</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-2 rounded-sm bg-green-500" />
            <span className="text-white/50 text-xs">Pompa ciepła</span>
          </div>
        </div>
      </div>
    </div>
  );
}
