"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* DarkVeil animated background */}
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={230}
          noiseIntensity={0.09}
          scanlineIntensity={0.55}
          speed={1.4}
          scanlineFrequency={0}
          warpAmount={0.45}
          resolutionScale={1}
        />
      </div>
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 gradient-primary opacity-40" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div
          className="mb-6 animate-[fadeInUp_0.6s_ease-out_both]"
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-white/60 border border-white/20 rounded-full px-5 py-2">
            Montaż i serwis · Warszawa i okolice
          </span>
        </div>

        <h1
          className="font-montserrat text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-[fadeInUp_0.8s_ease-out_0.1s_both]"
        >
          <AuroraText className="font-montserrat">Klimatyzacja i pompy ciepła</AuroraText>
          <br />
          <span className="text-white/90">z profesjonalnym montażem</span>
        </h1>

        <p
          className="mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.3s_both]"
        >
          Certyfikowani instalatorzy Samsung, LG, Toshiba, Gree, Daikin i wielu
          innych marek. Dobór, montaż, serwis i wynajem klimatyzatorów.
          Bezpłatna wycena w 24h.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.8s_ease-out_0.5s_both]"
        >
          <Button
            asChild
            className="gradient-button rounded-full uppercase text-sm tracking-wider px-8 h-12 text-white border-0 hover:opacity-90 transition-opacity"
          >
            <a href="#wycena">Zamów darmową wycenę</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full uppercase text-sm tracking-wider px-8 h-12 text-white border-white/30 hover:bg-white/10 bg-transparent"
          >
            <a href="/produkty">Zobacz produkty</a>
          </Button>
        </div>

        <div
          className="mt-10 sm:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 sm:gap-8 text-white/50 text-sm animate-[fadeIn_1s_ease-out_0.8s_both]"
        >
          <div className="text-center">
            <p className="font-montserrat text-2xl font-bold text-white">10+</p>
            <p>marek premium</p>
          </div>
          <div className="text-center">
            <p className="font-montserrat text-2xl font-bold text-white">5 lat</p>
            <p>gwarancji</p>
          </div>
          <div className="text-center">
            <p className="font-montserrat text-2xl font-bold text-white">500+</p>
            <p>montaży rocznie</p>
          </div>
          <div className="text-center">
            <p className="font-montserrat text-2xl font-bold text-white">24h</p>
            <p>wycena gratis</p>
          </div>
        </div>
      </div>
    </section>
  );
}
