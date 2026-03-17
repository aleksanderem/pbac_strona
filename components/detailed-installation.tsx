"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import FadeIn from "@/components/ui/fade-in";

const steps = [
  {
    number: "01",
    title: "Przygotowanie miejsca montażu",
  },
  {
    number: "02",
    title:
      "Wykonanie otworu w ścianie zewnętrznej, przez który zostaną wyprowadzone rury i kable",
  },
  {
    number: "03",
    title: "Przygotowanie pełnej instalacji",
    substeps: [
      "Instalacja freonowa",
      "Grawitacyjnie podłączony odpływ skroplin",
      "Zasilanie jednostki",
    ],
  },
  {
    number: "04",
    title:
      "Montaż i instalacja jednostki wewnętrznej w wybranym miejscu (do 3 m wysokości)",
  },
  {
    number: "05",
    title: "Połączenie urządzeń",
  },
  {
    number: "06",
    title: "Próba szczelności",
  },
  {
    number: "07",
    title: "Uruchomienie urządzeń klimatyzacyjnych",
  },
  {
    number: "08",
    title:
      "Sprawdzenie działania systemu klimatyzacji oraz szkolenie domowników z obsługi",
  },
];

export default function DetailedInstallation() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>
            Przebieg <AuroraText>montażu</AuroraText>
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.08}>
                <div className="relative flex items-start gap-5 sm:gap-6">
                  {/* Number circle */}
                  <div className="relative z-10 flex-shrink-0 size-12 sm:size-16 rounded-full gradient-icon flex items-center justify-center shadow-lg">
                    <span className="font-montserrat text-sm sm:text-lg font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2 sm:pt-3.5 flex-1">
                    <h3 className="font-montserrat text-base sm:text-lg font-semibold text-white/90 leading-snug">
                      {step.title}
                    </h3>
                    {step.substeps && (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {step.substeps.map((sub, i) => (
                          <li
                            key={i}
                            className="text-white/60 text-sm leading-relaxed flex items-center gap-2"
                          >
                            <span className="size-1.5 rounded-full bg-white/30 flex-shrink-0" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
