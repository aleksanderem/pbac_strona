"use client";

import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
import { Marquee } from "@/components/ui/marquee";
import { StripedPattern } from "@/components/ui/striped-pattern";
import FadeIn from "@/components/ui/fade-in";
import type { Testimonial } from "@/types";

function ReviewCard({
  name,
  location,
  body,
}: {
  name: string;
  location?: string;
  body: string;
}) {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.08]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="w-8 h-8 rounded-full gradient-icon flex items-center justify-center text-xs font-bold text-white">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          {location && (
            <p className="text-xs font-medium text-white/40">{location}</p>
          )}
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white/70">{body}</blockquote>
    </figure>
  );
}

export default function TestimonialsSectionView({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="relative py-20 overflow-hidden">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 w-full">
        <FadeIn className="text-center mb-12 px-4">
          <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Co mówią <AuroraText>nasi klienci</AuroraText>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Zaufało nam ponad 500 klientów z Warszawy i okolic. Sprawdź, jak
            oceniają nasze montaże klimatyzacji.
          </p>
        </FadeIn>

        {/* Desktop: 4 vertical marquees */}
        <div className="relative hidden md:flex h-[500px] w-screen left-1/2 -translate-x-1/2 flex-row items-center justify-center gap-5 overflow-hidden">
          <Marquee pauseOnHover vertical className="[--duration:60s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:60s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:60s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name + "-rev"} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:60s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.name + "-rev"} {...review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black" />
        </div>

        {/* Mobile: 2 horizontal marquees */}
        <div className="relative flex md:hidden h-[400px] w-screen left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-4 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black" />
        </div>
      </div>
    </section>
  );
}
