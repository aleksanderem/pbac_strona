"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MapInner = dynamic(() => import("@/components/map-inner"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />,
});

const locations = [
  { name: "Warszawa", slug: "warszawa", lat: 52.2297, lng: 21.0122, main: true },
  { name: "Piaseczno", slug: "piaseczno", lat: 52.0713, lng: 20.8378, main: false },
  { name: "Legionowo", slug: "legionowo", lat: 52.4043, lng: 20.9209, main: false },
  { name: "Otwock", slug: "otwock", lat: 52.1053, lng: 21.2614, main: false },
  { name: "Pruszków", slug: "pruszkow", lat: 52.1707, lng: 20.8041, main: false },
  { name: "Grodzisk Mazowiecki", slug: "grodzisk-mazowiecki", lat: 52.1065, lng: 20.6231, main: false },
  { name: "Łomianki", slug: "lomianki", lat: 52.3346, lng: 20.8841, main: false },
  { name: "Nowy Dwór Mazowiecki", slug: "nowy-dwor-mazowiecki", lat: 52.4316, lng: 20.7161, main: false },
  { name: "Mińsk Mazowiecki", slug: "minsk-mazowiecki", lat: 52.1793, lng: 21.5726, main: false },
  { name: "Siedlce", slug: "siedlce", lat: 52.1676, lng: 22.2902, main: false },
  { name: "Węgrów", slug: "wegrow", lat: 52.4022, lng: 22.0209, main: false },
  { name: "Biała Podlaska", slug: "biala-podlaska", lat: 52.0324, lng: 23.1165, main: false },
  { name: "Kraków", slug: "krakow", lat: 50.0647, lng: 19.9450, main: false },
];

interface ServiceAreaMapProps {
  variant?: "montaz" | "serwis";
}

export default function ServiceAreaMap({ variant = "montaz" }: ServiceAreaMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-montserrat text-2xl sm:text-4xl font-bold mb-4">
          Nasz zasięg
        </h2>
        <p className="text-white/50 mb-8 max-w-2xl">
          Realizujemy {variant === "montaz" ? "montaż klimatyzacji" : "serwis klimatyzacji"} w Warszawie i 12 okolicznych miastach.
        </p>
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ height: "500px" }}>
          {mounted && <MapInner locations={locations} variant={variant} />}
        </div>
      </div>
    </section>
  );
}
