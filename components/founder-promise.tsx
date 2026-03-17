"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { DotPattern } from "@/components/ui/dot-pattern";
import FadeIn from "@/components/ui/fade-in";

const antiPromises = [
  {
    title: "Nieterminowość",
    text: "W PBAC uważamy, że terminy są kluczowe dla sukcesu każdego projektu. Dlatego też, traktujemy je jak świętość, niezależnie od skali zadania czy jego złożoności. Dbamy o punktualność i terminowość na każdym etapie naszej pracy, zapewniając naszym klientom pewność, że ich projekty zostaną ukończone na czas.",
  },
  {
    title: "Chodzenie na skróty",
    text: "Chodzenie na skróty nie jest opcją, którą wybieramy w PBAC. Nasi klienci dostają rozwiązania, które będą sprawnie działać przez lata. Stawiamy na jakość, żeby nasza klimatyzacja poprawiała jakość życia klienta, a nie przysparzała problemów technicznych. Zakładamy klimatyzację tak, jak sami chcielibyśmy mieć to zrobione w swoich mieszkaniach.",
  },
];

export default function FounderPromise() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Part A — Founder promise */}
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>
            Nasza <AuroraText>obietnica</AuroraText>!
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center mb-24">
          <FadeIn direction="left" className="lg:col-span-3">
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Nazywam się Piotr Brzeziński i jestem założycielem firmy PBAC.
              Firma którą budowałem wraz z rewelacyjnym zespołem opiera się na
              solidnych fundamentach profesjonalizmu i rzetelności. Twój komfort
              i zadowolenie są dla nas najważniejsze, dlatego dbamy o klienta w
              każdym aspekcie naszej działalności. Podążamy za najnowszymi
              trendami i technologiami, aby zapewnić Ci najlepsze rozwiązania.
              Budujemy relacje oparte na zaufaniu i transparentności, co pozwala
              nam tworzyć trwałe więzi z naszymi klientami.
            </p>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-2 flex justify-center">
            <div className="relative size-48 sm:size-56 rounded-full gradient-icon flex items-center justify-center shadow-2xl">
              <span className="font-montserrat text-5xl sm:text-6xl font-bold text-white">
                PB
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Part B — Anti-promises */}
        <FadeIn className="font-montserrat text-xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
          <h3>
            Współpracując z nami, nie dowiesz się co to jest
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {antiPromises.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.15}
              className="relative rounded-2xl border border-white/10 p-2"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 sm:p-8">
                <h4 className="font-montserrat text-xl sm:text-2xl font-bold mb-4 line-through decoration-white/40 decoration-2">
                  {item.title}
                </h4>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
