"use client";

import { useState } from "react";

interface Model {
  name: string;
  power: string;
  energyClass: string;
  noise: string;
  phase: string;
  price?: number;
  area?: string;
}

interface ProductVariantSelectorProps {
  models: Model[];
}

export default function ProductVariantSelector({ models }: ProductVariantSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = models[selectedIndex];

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
      {/* Variant select */}
      {models.length > 1 ? (
        <div className="mb-4">
          <label className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2 block">
            Wybierz wariant
          </label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/30"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.5)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
          >
            {models.map((model, i) => (
              <option key={model.name} value={i} className="bg-black text-white">
                {model.power} {model.area ? `· ${model.area}` : ""}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-4">
          <span className="text-sm text-white/60">{selected.power}</span>
          {selected.area && <span className="text-sm text-white/40 ml-2">· {selected.area}</span>}
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-3">
        {selected.price ? (
          <>
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {selected.price.toLocaleString("pl-PL")} zł
            </span>
            <span className="text-sm text-white/40">brutto z montażem</span>
          </>
        ) : (
          <span className="text-xl text-white/60">Zapytaj o cenę</span>
        )}
      </div>

      {/* Details row */}
      <div className="flex flex-wrap gap-3 text-xs text-white/50">
        <span className="rounded-full bg-white/10 px-3 py-1">{selected.energyClass}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">{selected.noise}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">{selected.phase}</span>
      </div>
    </div>
  );
}
