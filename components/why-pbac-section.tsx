import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Shield, MapPin, Award, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Zrealizowanych montaży",
    description: "Setki zadowolonych klientów w Warszawie i okolicach",
  },
  {
    icon: Award,
    number: "10+",
    label: "Marek w ofercie",
    description: "Samsung, LG, Toshiba, Gree, Daikin, Haier i inne",
  },
  {
    icon: MapPin,
    number: "13",
    label: "Obsługiwanych miast",
    description: "Warszawa, Kraków i 11 miast w regionie mazowieckim",
  },
  {
    icon: Shield,
    number: "5 lat",
    label: "Gwarancji na sprężarkę",
    description: "Pełna gwarancja producenta z profesjonalnym serwisem PBAC",
  },
];

export default function WhyPbacSection() {
  return (
    <section id="dlaczego-pbac" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        className="absolute inset-0 z-0 fill-white/[0.03] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Dlaczego <AuroraText>PBAC</AuroraText>?
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Doświadczenie, certyfikaty i setki zrealizowanych montaży — to nas wyróżnia
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.1}>
              <div className="relative rounded-2xl border border-white/10 p-2">
                <GlowingEffect spread={40} glow proximity={64} />
                <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 text-center">
                  <div className="w-12 h-12 rounded-xl gradient-icon flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-montserrat text-3xl font-bold mb-1">
                    <AuroraText>{stat.number}</AuroraText>
                  </div>
                  <div className="font-montserrat text-sm font-bold text-white/80 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-white/50">{stat.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
