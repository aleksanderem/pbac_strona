import FadeIn from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

function TestimonialCard({ name, body, rating, location }: {
  name: string;
  body: string;
  rating: number;
  location?: string;
}) {
  return (
    <div className="w-80 shrink-0 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
          />
        ))}
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">
        &ldquo;{body}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <span className="font-montserrat text-sm font-bold">{name}</span>
        {location && (
          <span className="text-xs text-white/40">{location}</span>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="opinie" className="relative py-20 overflow-hidden">
      <StripedPattern
        className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4 px-4">
            Opinie naszych klientów
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto px-4">
            Zaufało nam ponad 500 klientów w Warszawie i okolicach
          </p>
        </FadeIn>

        <Marquee className="[--gap:1.5rem] [--duration:40s]" pauseOnHover>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
