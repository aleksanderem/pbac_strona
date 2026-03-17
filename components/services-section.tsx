import Link from "next/link";
import { Wrench, Settings, Flame, Clock } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";

const iconMap = {
  Wrench,
  Settings,
  Flame,
  Clock,
};

const services = [
  {
    name: "Montaż klimatyzacji",
    description: "Profesjonalny montaż klimatyzatorów ściennych i multisplit z doborem urządzenia, instalacją i uruchomieniem.",
    icon: "Wrench" as const,
    link: "/klimatyzacja",
  },
  {
    name: "Serwis klimatyzacji",
    description: "Przeglądy, czyszczenie filtrów, uzupełnianie czynnika i naprawy klimatyzatorów wszystkich marek.",
    icon: "Settings" as const,
    link: "/serwis/warszawa",
  },
  {
    name: "Pompy ciepła",
    description: "Sprzedaż i montaż pomp ciepła powietrze-woda. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat.",
    icon: "Flame" as const,
    link: "/pompy-ciepla",
  },
  {
    name: "Wynajem klimatyzatorów",
    description: "Wynajem klimatyzatorów przenośnych na dni, tygodnie lub miesiące z dostawą w Warszawie.",
    icon: "Clock" as const,
    link: "/wynajem-klimatyzatorow",
  },
];

export default function ServicesSection() {
  return (
    <section id="uslugi" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Nasze usługi
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Kompleksowa obsługa klimatyzacji i pomp ciepła — od doradztwa i wyceny, przez montaż, po serwis gwarancyjny
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];
            return (
              <FadeIn key={service.name} delay={idx * 0.1}>
                <Link
                  href={service.link}
                  className="group relative block rounded-2xl border border-white/10 p-2 h-full"
                >
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-montserrat text-xl font-bold mb-3 group-hover:text-white transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <span className="inline-block mt-4 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                      Dowiedz się więcej →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
