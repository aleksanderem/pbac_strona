import Link from "next/link";
import FadeIn from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";
import { brands } from "@/lib/brands";

export default function BrandsSection() {
  return (
    <section id="marki" className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Pracujemy z najlepszymi markami
          </h2>
          <p className="text-center text-white/60 text-lg max-w-2xl mx-auto">
            Ponad 10 producentów klimatyzatorów — od ekonomicznych po premium
          </p>
        </FadeIn>
      </div>

      <Marquee className="[--gap:3rem] [--duration:30s]" pauseOnHover>
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/produkty/${brand.slug}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 hover:bg-white/10 transition-colors shrink-0"
          >
            <span className="font-montserrat text-lg font-bold text-white/70 hover:text-white transition-colors">
              {brand.name}
            </span>
            <span className="text-xs text-white/30">{brand.country}</span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
