"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";

// Lazy load map components to avoid SSR issues with MapLibre
const MapInner = dynamic(
  () => import("@/components/ui/map").then((mod) => {
    const { Map, MapMarker, MarkerContent, MarkerTooltip, MarkerPopup, MapControls } = mod;

    function MapComponent({ locations, variant }: { locations: Location[]; variant: string }) {
      return (
        <Map center={[21.0122, 52.2297]} zoom={8}>
          <MapControls />
          {locations.map((loc) => (
            <MapMarker key={loc.slug} longitude={loc.lng} latitude={loc.lat}>
              <MarkerContent>
                <div className={`rounded-full border-2 border-white shadow-lg ${loc.main ? "size-5 bg-[#B31853]" : "size-3.5 bg-[#3D5EFF]"}`} />
              </MarkerContent>
              <MarkerTooltip>{loc.name}</MarkerTooltip>
              <MarkerPopup>
                <div className="space-y-2 min-w-[160px]">
                  <p className="font-bold text-sm">{loc.name}</p>
                  <Link
                    href={`/${variant}/${loc.slug}`}
                    className="inline-block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {variant === "montaz" ? "Montaż" : "Serwis"} w {loc.name} →
                  </Link>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      );
    }

    return MapComponent;
  }),
  { ssr: false, loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" /> }
);

interface Location {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  main: boolean;
}

const locations: Location[] = [
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
        <div className="rounded-2xl border border-white/10 overflow-hidden h-[500px]">
          {mounted ? (
            <MapInner locations={locations} variant={variant} />
          ) : (
            <div className="w-full h-full bg-white/5 animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}
