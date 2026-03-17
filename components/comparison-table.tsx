"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

const headers = ["Cecha", "Split (ścienny)", "Multisplit", "Kasetonowy", "Przenośny"];

const rows = [
  ["Zastosowanie", "1 pomieszczenie", "2–5 pomieszczeń", "Biura, sklepy", "Tymczasowe"],
  ["Wydajność", "Bardzo wysoka", "Wysoka", "Bardzo wysoka", "Niska"],
  ["Montaż", "Wymagany", "Wymagany", "Wymagany", "Brak"],
  ["Poziom hałasu", "16–25 dB", "19–28 dB", "25–35 dB", "45–55 dB"],
  ["Grzanie", "Tak (do -15°C)", "Tak (do -15°C)", "Tak", "Niektóre modele"],
  ["Klasa energ.", "A+++ / A++", "A++ / A+", "A+ / A", "A / B"],
  ["Cena orientac.", "od 4 000 zł", "od 10 000 zł", "od 8 000 zł", "od 1 200 zł"],
];

export default function ComparisonTable() {
  return (
    <section id="porownanie" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] z-0 fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>Porównanie typów klimatyzacji</h2>
        </FadeIn>

        {/* Desktop table */}
        <FadeIn delay={0.2} className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="gradient-primary">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-montserrat font-bold text-white first:rounded-tl-xl last:rounded-tr-xl"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={row[0]}
                  className={rowIndex % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={`px-6 py-4 text-sm border-b border-white/10 ${
                        cellIndex === 0 ? "text-white font-medium" : "text-white/70"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        {/* Mobile cards */}
        <div className="md:hidden space-y-6">
          {headers.slice(1).map((type, typeIndex) => (
            <FadeIn
              key={type}
              delay={typeIndex * 0.1}
              className="relative rounded-2xl border border-white/10 p-2"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
              <h3 className="font-montserrat text-lg font-bold mb-4">{type}</h3>
              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row[0]} className="flex justify-between text-sm">
                    <span className="text-white/50">{row[0]}</span>
                    <span className="text-white/80">{row[typeIndex + 1]}</span>
                  </div>
                ))}
              </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
