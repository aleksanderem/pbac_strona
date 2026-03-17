"use client";

import { StripedPattern } from "@/components/ui/striped-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

const steps = [
  {
    number: "01",
    title: "Kontakt i wycena",
    description:
      "Zadzwoń lub wypełnij formularz — przygotujemy bezpłatną wycenę montażu klimatyzacji.",
  },
  {
    number: "02",
    title: "Dobór klimatyzatora",
    description:
      "Nasi specjaliści dobiorą optymalny model na podstawie metrażu, rozkładu pomieszczeń i Twoich potrzeb.",
  },
  {
    number: "03",
    title: "Profesjonalny montaż",
    description:
      "Certyfikowani instalatorzy wykonają montaż zgodnie z najwyższymi standardami producenta.",
  },
  {
    number: "04",
    title: "Serwis i gwarancja",
    description:
      "Zapewniamy pełen serwis gwarancyjny i pogwarancyjny — przeglądy, czyszczenie, naprawy.",
  },
];

export default function HowItWorks() {
  return (
    <section id="jak-dzialamy" className="relative py-20 px-4 overflow-hidden">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>Jak działamy?</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-white/10" />

          {steps.map((step, index) => (
            <FadeIn
              key={step.number}
              delay={index * 0.15}
              className="relative rounded-2xl border border-white/10 p-2"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 text-center">
              <span
                className="font-montserrat text-5xl md:text-6xl font-bold inline-block mb-4"
                style={{
                  background: "linear-gradient(120deg, #3D5EFF 0%, #DF396F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {step.number}
              </span>
              <h3 className="font-montserrat text-lg font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
