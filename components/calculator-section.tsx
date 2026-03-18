"use client";

import { useState, useMemo } from "react";
import { Zap, Flame } from "lucide-react";
import dynamic from "next/dynamic";
const CostRaceChart = dynamic(() => import("@/components/cost-race-chart"), { ssr: false });
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

// Annual cooling cost per m² for traditional methods (PLN)
const COOLING_COSTS: Record<string, { label: string; costPerM2: number; icon: typeof Flame }> = {
  wentylatory: { label: "Wentylatory + grzejniki elektr.", costPerM2: 65, icon: Zap },
  przenosny: { label: "Klimatyzator przenośny", costPerM2: 50, icon: Zap },
  gaz: { label: "Gaz + brak chłodzenia", costPerM2: 45, icon: Flame },
  elektryczne: { label: "Ogrzewanie elektryczne", costPerM2: 80, icon: Zap },
};

// Split AC with heat pump: cost per m² (SCOP ~4, avg electricity price) for heating+cooling
const AC_COST_PER_M2 = 22;

// Insulation multiplier
const INSULATION_MULT: Record<string, { label: string; mult: number }> = {
  dobra: { label: "Dobra (po termomodernizacji)", mult: 0.85 },
  srednia: { label: "Średnia", mult: 1.0 },
  slaba: { label: "Słaba (stary budynek)", mult: 1.25 },
};

export default function CalculatorSection() {
  const [area, setArea] = useState("60");
  const [method, setMethod] = useState("przenosny");
  const [insulation, setInsulation] = useState("srednia");
  const [showResult, setShowResult] = useState(true);

  const result = useMemo(() => {
    const m2 = parseFloat(area) || 0;
    if (m2 <= 0) return null;

    const methodData = COOLING_COSTS[method];
    const insulMult = INSULATION_MULT[insulation]?.mult ?? 1;

    const currentCost = Math.round(m2 * methodData.costPerM2 * insulMult);
    const acCost = Math.round(m2 * AC_COST_PER_M2 * insulMult);
    const savings = currentCost - acCost;
    const savingsPercent = Math.round((savings / currentCost) * 100);

    return {
      currentCost,
      acCost,
      savings,
      savingsPercent,
      methodLabel: methodData.label,
      savingsIn10Years: savings * 10,
    };
  }, [area, method, insulation]);

  return (
    <section id="kalkulator" className="relative py-20 px-4 overflow-hidden scroll-mt-20">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] z-0 fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Ile zaoszczędzisz z <AuroraText>klimatyzacją</AuroraText>?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Sprawdź, ile możesz zaoszczędzić rocznie dzięki klimatyzacji z pompą
            ciepła — chłodzenie latem i grzanie zimą w jednym urządzeniu.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: inputs */}
          <FadeIn
            direction="left"
            className="relative rounded-2xl border border-white/10 p-2 h-full"
          >
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <Card className="bg-white/10 backdrop-blur-md border-0 rounded-xl h-full">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-xl gradient-icon flex items-center justify-center">
                    {/* @ts-expect-error web component */}
                    <easier-icon name="calculator" variant="twotone" corners="rounded" size="20" color="#ffffff" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-white">
                    Parametry Twojego lokalu
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Powierzchnia (m²)</Label>
                  <Input
                    type="number"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      setShowResult(false);
                    }}
                    placeholder="np. 60"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 hover:bg-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Obecna metoda chłodzenia/grzania</Label>
                  <Select
                    value={method}
                    onValueChange={(v) => {
                      setMethod(v);
                      setShowResult(false);
                    }}
                  >
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10">
                      {Object.entries(COOLING_COSTS).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Izolacja budynku</Label>
                  <Select
                    value={insulation}
                    onValueChange={(v) => {
                      setInsulation(v);
                      setShowResult(false);
                    }}
                  >
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10">
                      {Object.entries(INSULATION_MULT).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <button
                  onClick={() => setShowResult(true)}
                  className="w-full gradient-button text-white py-3 rounded-xl text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Oblicz oszczędności
                </button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Right: results */}
          <FadeIn
            direction="right"
            delay={0.2}
            className="h-full"
          >
            {showResult && result ? (
              <div
                className="relative rounded-2xl border border-white/10 p-2 h-full animate-[fadeIn_0.4s_ease-out_both]"
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-4 space-y-4 h-full flex flex-col">
                  {/* Savings highlight */}
                  <div className="gradient-primary rounded-xl p-6 text-center">
                    {/* @ts-expect-error web component */}
                    <easier-icon name="chart-decrease" variant="twotone" corners="rounded" size="32" color="#ffffff" style={{ display: "block", margin: "0 auto 8px" }} />
                    <p className="text-white/80 text-sm">Roczna oszczędność</p>
                    <p className="font-montserrat text-4xl font-bold text-white mt-1">
                      {result.savings.toLocaleString("pl-PL")} zł
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      to {result.savingsPercent}% mniej niż {result.methodLabel.toLowerCase()}
                    </p>
                  </div>

                  {/* Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                        Obecna metoda
                      </p>
                      <p className="font-montserrat text-2xl font-bold text-red-400">
                        {result.currentCost.toLocaleString("pl-PL")} zł
                      </p>
                      <p className="text-white/40 text-xs mt-1">rocznie</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                        Klimatyzacja
                      </p>
                      <p className="font-montserrat text-2xl font-bold text-green-400">
                        {result.acCost.toLocaleString("pl-PL")} zł
                      </p>
                      <p className="text-white/40 text-xs mt-1">rocznie</p>
                    </div>
                  </div>

                  {/* 10 year projection */}
                  <div className="bg-white/5 rounded-xl p-5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                      Oszczędności w ciągu 10 lat
                    </p>
                    <p className="font-montserrat text-3xl font-bold text-white">
                      {result.savingsIn10Years.toLocaleString("pl-PL")} zł
                    </p>
                    <p className="text-white/50 text-sm mt-2">
                      Przy obecnych cenach energii. Klimatyzacja z pompą ciepła
                      to najtańszy sposób na chłodzenie i ogrzewanie.
                    </p>
                  </div>

                  <Button
                    asChild
                    className="w-full gradient-button rounded-xl uppercase text-sm tracking-wider h-12 text-white border-0 hover:opacity-90 transition-opacity"
                  >
                    <a href="#wycena">Zamów wycenę dopasowaną do Twojego lokalu</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full flex items-center justify-center">
                  <div className="text-center text-white/30">
                    {/* @ts-expect-error web component */}
                    <easier-icon name="calculator" variant="twotone" corners="rounded" size="64" color="rgba(255,255,255,0.3)" className="mx-auto mb-4" />
                    <p className="font-montserrat text-lg">
                      Uzupełnij dane i kliknij &quot;Oblicz&quot;
                    </p>
                    <p className="text-sm mt-2">
                      Wyniki pojawią się tutaj
                    </p>
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>

        {/* ── Savings over time chart ── */}
        {showResult && result && (
          <div
            className="mt-8 relative rounded-2xl border border-white/10 p-2 animate-[fadeInUp_0.6s_ease-out_both]"
          >
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl gradient-icon flex items-center justify-center">
                  {/* @ts-expect-error web component */}
                  <easier-icon name="thermometer" variant="twotone" corners="rounded" size="20" color="#ffffff" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-white">
                    Oszczędności w czasie
                  </h3>
                  <p className="text-white/40 text-sm">
                    ile zaoszczędzisz z klimatyzacją — 10 lat
                  </p>
                </div>
              </div>
              <CostRaceChart
                area={parseFloat(area) || 60}
                insulationMult={INSULATION_MULT[insulation]?.mult ?? 1}
              />
              <p className="text-white/30 text-xs mt-2">
                * Oszczędności przy stałych cenach energii. Wzrost cen zwiększy oszczędności.
              </p>
            </div>
          </div>
        )}

        <FadeIn delay={0.4} direction="none" className="text-center text-white/30 text-xs mt-8">
          <p>
            * Szacunkowe obliczenia oparte na średnich cenach energii w Polsce (2026).
            Rzeczywiste oszczędności zależą od wielu czynników. Skontaktuj się z nami
            po dokładną wycenę.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
