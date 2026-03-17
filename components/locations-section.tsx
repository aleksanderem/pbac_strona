import Link from "next/link";
import FadeIn from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/locations";

export default function LocationsSection() {
  return (
    <section id="lokalizacje" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Obsługiwane lokalizacje
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Montaż klimatyzacji w Warszawie i 12 okolicznych miastach
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {locations.map((location, idx) => (
            <FadeIn key={location.slug} delay={idx * 0.05}>
              <Link
                href={`/montaz/${location.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:border-white/20 hover:bg-white/5"
              >
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors shrink-0" />
                <div>
                  <div className="font-montserrat text-sm font-bold group-hover:text-white transition-colors">
                    {location.name}
                  </div>
                  <div className="text-xs text-white/40">{location.region}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
