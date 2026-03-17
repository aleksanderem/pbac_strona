"use client";

import BrandCard from "@/components/brand-card";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

const brands = [
  {
    slug: "samsung",
    name: "Samsung Wind-Free",
    origin: "Samsung Climate Solutions (Korea Południowa)",
    series: "Wind-Free Elite · Avant · Comfort",
    power: "2,5–7 kW",
    description:
      "Samsung Wind-Free to flagowa linia klimatyzatorów Samsung, wyposażona w innowacyjną technologię bezpodmuchowego chłodzenia — powietrze rozprowadzane jest przez tysiące mikrootworów, eliminując nieprzyjemne podmuchy zimnego powietrza. Zaawansowany filtr PM1.0 oczyszcza powietrze z pyłków, kurzu i alergenów. Sterowanie przez aplikację SmartThings i integracja z asystentami głosowymi umożliwiają wygodne zarządzanie klimatem w domu.",
    features: [
      "Technologia Wind-Free — chłodzenie bez podmuchu",
      "Filtr PM1.0 eliminujący 99% zanieczyszczeń",
      "WiFi + SmartThings — sterowanie głosem i z telefonu",
      "Tryb cichy od 16 dB(A) — ciszej niż szept",
      "Klasa energetyczna A+++ w trybie chłodzenia",
    ],
    highlight: "Bestseller",
    imageUrl: "/images/products/samsung-wind-free.png",
    imageAlt: "Klimatyzator Samsung Wind-Free Elite — jednostka wewnętrzna",
  },
  {
    slug: "lg",
    name: "LG ArtCool / Dual Inverter",
    origin: "LG Electronics (Korea Południowa)",
    series: "ArtCool Gallery · ArtCool Mirror · Standard Plus",
    power: "2,5–7 kW",
    description:
      "LG oferuje szeroką gamę klimatyzatorów ściennych od designerskiej serii ArtCool z wymiennymi panelami przednimi po ekonomiczne modele Standard Plus. Sprężarka Dual Inverter zapewnia cichą pracę, niskie zużycie energii i 10-letnią gwarancję na kompresor. Seria ArtCool Gallery pozwala zastąpić panel przedni własnym zdjęciem lub obrazem, łącząc funkcjonalność z estetyką wnętrza.",
    features: [
      "Sprężarka Dual Inverter z 10-letnią gwarancją",
      "ArtCool Gallery — wymienny panel z Twoim zdjęciem",
      "Jonizator Plasmaster Plus oczyszczający powietrze",
      "WiFi + ThinQ — zdalne sterowanie z aplikacji",
      "Klasa energetyczna A+++ / SEER do 8,5",
    ],
    highlight: "Design premium",
    imageUrl: "/images/products/lg-artcool.png",
    imageAlt: "Klimatyzator LG ArtCool Gallery — jednostka wewnętrzna",
  },
  {
    slug: "toshiba",
    name: "Toshiba Daiseikai / Shorai Edge",
    origin: "Toshiba (Japonia)",
    series: "Daiseikai 9 · Shorai Edge · Haori",
    power: "2,5–7 kW",
    description:
      "Toshiba to pionier technologii klimatyzacyjnych z ponad 50-letnim doświadczeniem. Flagowy model Daiseikai 9 osiąga najwyższą klasę energetyczną A+++ zarówno w trybie chłodzenia, jak i grzania. Seria Shorai Edge wyróżnia się nowoczesnym wzornictwem w wersji czarnej i białej, a Haori oferuje wymienne panele tkaninowe. Klimatyzatory Toshiba są cenione za niezawodność i cichą pracę od 18 dB.",
    features: [
      "Daiseikai 9 — A+++ chłodzenie i grzanie",
      "Shorai Edge — nowoczesny design w czerni lub bieli",
      "Haori — wymienne panele tkaninowe do aranżacji",
      "Samooczyszczanie jednostki wewnętrznej",
      "Cicha praca od 18 dB(A)",
    ],
    highlight: "Japońska jakość",
    imageUrl: "/images/products/toshiba-shorai.png",
    imageAlt: "Klimatyzator Toshiba Shorai Edge — jednostka wewnętrzna",
  },
  {
    slug: "gree",
    name: "Gree",
    origin: "Gree Electric Appliances (Chiny)",
    series: "Clivia · Fairy · Amber · Pular",
    power: "2,5–7 kW",
    description:
      "Gree to największy producent klimatyzatorów na świecie pod względem wolumenu produkcji. Linie Clivia, Fairy, Amber i Pular pokrywają segment od ekonomicznego po premium. Klimatyzatory Gree łączą konkurencyjną cenę z solidną jakością, oferując jonizację powietrza, filtr Cold Plasma i sterowanie WiFi. Doskonały wybór w przystępnym budżecie z pełną funkcjonalnością.",
    features: [
      "Największy producent klimatyzatorów na świecie",
      "Jonizacja powietrza Cold Plasma",
      "WiFi i sterowanie z aplikacji w standardzie",
      "Tryb grzania do -15°C temperatury zewnętrznej",
      "Najlepszy stosunek ceny do jakości",
    ],
    highlight: "Najlepsza cena",
    imageUrl: "/images/products/gree-clivia.png",
    imageAlt: "Klimatyzator Gree Clivia — jednostka wewnętrzna",
  },
];

export default function BrandsSection() {
  return (
    <section id="marki" className="relative py-20 px-4 overflow-hidden scroll-mt-20">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Marki, którym ufamy
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Oferujemy klimatyzatory wiodących światowych producentów. Każda marka
            została przetestowana i dobrana pod kątem niezawodności, efektywności
            energetycznej i komfortu użytkowania.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <FadeIn
              key={brand.name}
              delay={index * 0.1}
              className="relative rounded-2xl border border-white/10 p-2 overflow-visible h-full"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <BrandCard {...brand} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
