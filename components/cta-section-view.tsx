"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Phone, ArrowRight, X, CheckCircle2, Loader2 } from "lucide-react";
import type { Testimonial } from "@/types";

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={{ "--background": "#000000", "--color": "rgba(255, 255, 255, 0.15)", "--height": "1px", "--width": "5px", "--fade-stop": "90%", "--offset": offset || "200px", maskComposite: "exclude" } as React.CSSProperties}
    className={cn(
      "absolute w-[calc(100%+var(--offset))] h-[var(--height)] left-[calc(var(--offset)/2*-1)]",
      "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
      "[background-size:var(--width)_var(--height)]",
      "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
      "[mask-composite:exclude]",
      "z-30",
      className
    )}
  />
);

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={{ "--background": "#000000", "--color": "rgba(255, 255, 255, 0.15)", "--height": "5px", "--width": "1px", "--fade-stop": "90%", "--offset": offset || "150px", maskComposite: "exclude" } as React.CSSProperties}
    className={cn(
      "absolute h-[calc(100%+var(--offset))] w-[var(--width)] top-[calc(var(--offset)/2*-1)]",
      "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
      "[background-size:var(--width)_var(--height)]",
      "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
      "[mask-composite:exclude]",
      "z-30",
      className
    )}
  />
);

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const body = new FormData(e.currentTarget);
    try {
      await fetch("https://formsubmit.co/biuro@pbac.pl", {
        method: "POST",
        mode: "no-cors",
        body,
      });
    } catch {
      // no-cors fetch never throws on HTTP errors; only catch network failures
    }
    setStatus("success");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-black/95 backdrop-blur-xl p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        {status === "success" ? (
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div className="size-16 rounded-full gradient-primary flex items-center justify-center">
              <CheckCircle2 className="size-8 text-white" />
            </div>
            <h2 className="font-montserrat text-2xl font-bold">Dziękujemy!</h2>
            <p className="text-white/70">Skontaktujemy się z Tobą w ciągu 24 godzin.</p>
            <button onClick={onClose} className="mt-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold hover:bg-white/90">
              Zamknij
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-montserrat text-2xl font-bold mb-2">Zamów darmową wycenę</h2>
            <p className="text-white/50 text-sm mb-6">Odpowiemy w ciągu 24h</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="Darmowa wycena — pbac.pl" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Imię</label>
                <input type="text" name="name" required placeholder="Jan Kowalski" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Telefon</label>
                  <input type="tel" name="phone" required placeholder="+48 500 000 000" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" />
                </div>
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Metraż</label>
                  <input type="text" name="area" placeholder="np. 40 m²" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Wiadomość</label>
                <textarea name="message" rows={3} placeholder="Opisz swoje potrzeby..." className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none" />
              </div>
              <button type="submit" disabled={status === "loading"} className="w-full bg-white text-black rounded-xl px-6 py-4 font-bold text-sm hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                {status === "loading" ? "Wysyłanie..." : "Wyślij zapytanie"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CTASectionView({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const testimonial = testimonials[0];

  return (
    <>
      <section className="w-full grid grid-cols-1 md:grid-cols-3 my-20 md:my-32 justify-start relative z-20 max-w-7xl mx-auto">
        <GridLineHorizontal className="top-0" offset="200px" />
        <GridLineHorizontal className="bottom-0 top-auto" offset="200px" />
        <GridLineVertical className="left-0" offset="80px" />
        <GridLineVertical className="left-auto right-0" offset="80px" />
        <div className="md:col-span-2 p-8 md:p-14">
          <h2 className="text-left text-white/70 text-xl md:text-3xl tracking-tight font-medium">
            Profesjonalna klimatyzacja{" "}
            <span className="font-bold text-white">
              od certyfikowanych instalatorów
            </span>
          </h2>
          <p className="text-left text-white/70 mt-4 max-w-lg text-xl md:text-3xl tracking-tight font-medium">
            Bezpłatna wycena, <span className="text-[#3D5EFF]">montaż w 7 dni</span>,{" "}
            <span className="text-[#B31853]">gwarancja do 10 lat</span>.
          </p>

          <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="mt-8 flex space-x-2 items-center group text-base px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
            >
              <span>Zamów darmową wycenę</span>
              <ArrowRight className="group-hover:translate-x-1 h-4 w-4 transition-transform duration-200" />
            </button>
            <a
              href="tel:+48503151802"
              className="mt-8 flex space-x-2 items-center group text-base px-6 py-3 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>503 151 802</span>
            </a>
          </div>
        </div>
        <div className="border-t md:border-t-0 md:border-l border-dashed border-white/15 p-8 md:p-14 flex flex-col justify-center">
          <p className="text-base text-white/70 leading-relaxed">
            &ldquo;{testimonial.body}&rdquo;
          </p>
          <div className="flex flex-col text-sm items-start mt-4 gap-1">
            <p className="font-bold text-white">{testimonial.name}</p>
            {testimonial.location && (
              <p className="text-white/50">{testimonial.location}</p>
            )}
          </div>
        </div>
      </section>
      <QuoteModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
