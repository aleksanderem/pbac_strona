"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MarkerPopup,
  MapControls,
} from "@/components/ui/map";
import Link from "next/link";

interface Location {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  main: boolean;
}

interface MapInnerProps {
  locations: Location[];
  variant: string;
}

export default function MapInner({ locations, variant }: MapInnerProps) {
  return (
    <Map center={[21.0122, 52.2297]} zoom={8}>
      <MapControls />
      {locations.map((loc) => (
        <MapMarker key={loc.slug} longitude={loc.lng} latitude={loc.lat}>
          <MarkerContent>
            <div
              className={`rounded-full border-2 border-white shadow-lg ${
                loc.main ? "size-5 bg-[#B31853]" : "size-3.5 bg-[#3D5EFF]"
              }`}
            />
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
