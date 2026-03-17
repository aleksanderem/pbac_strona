"use client";

import {
  CalendarCheck,
  Fuel,
  SprayCan,
  SearchCheck,
  Wrench,
  ArrowRightLeft,
} from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const periodicServices = [
  {
    icon: CalendarCheck,
    title: "Przegląd serwisowy",
    description:
      "Dwa razy do roku każdy klimatyzator powinien przejść przegląd serwisowy",
  },
  {
    icon: Fuel,
    title: "Napełnienie klimatyzacji",
    description: "Nabijanie klimatyzacji dowolnym czynnikiem",
  },
  {
    icon: SprayCan,
    title: "Czyszczenie klimatyzacji",
    description: "Należy regularnie czyścić i dbać o klimatyzację",
  },
];

const repairServices = [
  {
    icon: SearchCheck,
    title: "Diagnoza usterek",
    description:
      "Przejrzenie klimatyzacji, zlokalizowanie i zdiagnozowanie usterki",
  },
  {
    icon: Wrench,
    title: "Naprawa klimatyzacji",
    description:
      "Kompleksowa naprawa znalezionych usterek w klimatyzacji",
  },
  {
    icon: ArrowRightLeft,
    title: "Zmiana miejsca",
    description:
      "Przeniesienie klimatyzatora w inne miejsce w domu lub biurze",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className="relative rounded-2xl border border-white/10 p-2">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
        <div className="mb-4 size-12 rounded-xl gradient-icon flex items-center justify-center">
          <Icon className="size-6 text-white" />
        </div>
        <h3 className="font-montserrat text-lg font-bold mb-2">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  );
}

export default function ServiceTabs() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          <h2>
            Zakres <AuroraText>serwisu</AuroraText>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Tabs defaultValue="periodic" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="periodic" className="font-montserrat">
                  Serwis okresowy
                </TabsTrigger>
                <TabsTrigger value="repair" className="font-montserrat">
                  Naprawa i prace serwisowe
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="periodic">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {periodicServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="repair">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {repairServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </section>
  );
}
