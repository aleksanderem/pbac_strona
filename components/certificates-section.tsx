"use client";

import { ShieldCheck, Zap, Award, BadgeCheck } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

const certificates = [
  {
    icon: ShieldCheck,
    title: "Certyfikat F-GAZ",
    description:
      "Uprawnienia do obsługi substancji zubożających warstwę ozonową oraz fluorowanych gazów cieplarnianych",
  },
  {
    icon: Zap,
    title: "Uprawnienia elektryczne",
    description:
      "Kwalifikacje SEP do 1kV — bezpieczne podłączenie zasilania klimatyzatorów",
  },
  {
    icon: Award,
    title: "Certyfikat UDT",
    description:
      "Uprawnienia Urzędu Dozoru Technicznego do napełniania i odzysku czynników chłodniczych",
  },
  {
    icon: BadgeCheck,
    title: "Gwarancja PBAC",
    description:
      "Dodatkowa gwarancja na instalację — do 5 lat ochrony oprócz gwarancji producenta",
  },
];

export default function CertificatesSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            <AuroraText>Certyfikaty</AuroraText> i gwarancja jakości
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Nasi fachowcy doradzą taki wybór jednostki wewnętrznej i
            zewnętrznej, aby jej montaż był w pełni bezpieczny, a sama
            klimatyzacja była jak najmniej uciążliwa
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <FadeIn
                key={cert.title}
                delay={index * 0.1}
                className="relative rounded-2xl border border-white/10 p-2"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full flex flex-col items-center text-center">
                  <div className="mb-5 size-14 rounded-xl gradient-icon flex items-center justify-center">
                    <Icon className="size-7 text-white" />
                  </div>
                  <h3 className="font-montserrat text-lg font-bold mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
