"use client";

import dynamic from "next/dynamic";
import { AuroraText } from "@/components/ui/aurora-text";
import { Phone } from "lucide-react";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={230}
          noiseIntensity={0.09}
          scanlineIntensity={0.55}
          speed={1.4}
          warpAmount={0.45}
          resolutionScale={1}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
        <div className="max-w-3xl">
          <p
            className="text-white/60 uppercase tracking-widest text-sm mb-6 animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: "0.1s" }}
          >
            Montaż i serwis · Warszawa i okolice
          </p>

          <h1
            className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: "0.3s" }}
          >
            <AuroraText>Klimatyzacja</AuroraText>
            <br />i pompy ciepła
          </h1>

          <p
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: "0.5s" }}
          >
            Certyfikowani instalatorzy Samsung, LG, Toshiba, Gree, Daikin i wielu
            innych marek. Dobór, montaż, serwis i wynajem klimatyzatorów.
            Bezpłatna wycena.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href="#wycena"
              className="inline-flex items-center justify-center gradient-button text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-opacity hover:opacity-90"
            >
              Umów montaż
            </a>
            <a
              href="/produkty"
              className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10"
            >
              Zobacz produkty
            </a>
          </div>

          <a
            href="tel:+48503151802"
            className="inline-flex items-center gap-3 mt-8 text-white/70 hover:text-white transition-colors animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: "0.9s" }}
          >
            <Phone className="w-5 h-5" />
            <span className="text-lg font-bold">+48 503 151 802</span>
          </a>
        </div>
      </div>
    </section>
  );
}
