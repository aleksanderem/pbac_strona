import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BrandCardProps {
  name: string;
  origin: string;
  series: string;
  description: string;
  features: string[];
  highlight: string;
  power?: string;
  imageUrl: string;
  imageAlt: string;
  slug?: string;
}

export default function BrandCard({
  name,
  origin,
  series,
  description,
  features,
  highlight,
  power,
  imageUrl,
  imageAlt,
  slug,
}: BrandCardProps) {
  return (
    <div className="pt-16 h-full">
      <Card className="relative bg-white/10 backdrop-blur-md border-0 rounded-xl overflow-visible h-full">
        {/* Floating product image — overflows above card */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[80%] h-48 pointer-events-none z-10">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain drop-shadow-[0_10px_30px_rgba(179,24,83,0.15)]"
            sizes="(max-width: 768px) 80vw, 40vw"
          />
        </div>

        {/* Gradient header area behind image bottom */}
        <div className="h-36 rounded-t-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />

        {/* Name + highlight badge */}
        <div className="px-6 pb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-montserrat text-xl font-bold text-white">{name}</h3>
            <p className="text-white/50 text-sm">{origin}</p>
          </div>
          <span className="text-xs gradient-button text-white px-3 py-1 rounded-full shrink-0 mt-1">
            {highlight}
          </span>
        </div>

        <CardHeader className="pb-2 pt-0">
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-white/40 text-xs uppercase tracking-wider">Seria </span>
              <span className="text-white/80">{series}</span>
            </div>
            {power && (
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                <span className="text-white/40 text-xs uppercase tracking-wider">Moc </span>
                <span className="text-white/80">{power}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-white/70 text-sm leading-relaxed">
            {description}
          </p>

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Kluczowe cechy</p>
            <ul className="grid grid-cols-1 gap-2">
              {features.map((feature) => (
                <li key={feature} className="text-white/60 text-sm flex items-start gap-2">
                  <span
                    className="mt-1.5 size-1.5 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(120deg, #3D5EFF 0%, #DF396F 100%)",
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {slug && (
            <Link
              href={`/produkty/${slug}`}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mt-2 group"
            >
              Dowiedz się więcej
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
