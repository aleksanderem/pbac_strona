"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { StripedPattern } from "@/components/ui/striped-pattern";
import FadeIn from "@/components/ui/fade-in";

const pricingData = [
  {
    service: "Dodatkowy metr instalacji wraz z kablem oraz korytem",
    price: "80 zł netto",
  },
  {
    service:
      "Wykucie metra bruzdy w cegle w celu schowania instalacji w ścianę",
    price: "60 zł netto",
  },
  {
    service: "Wykucie metra bruzdy w betonie",
    price: "180 zł netto",
  },
  {
    service: "Przeróbki elektryczne",
    price: "do uzgodnienia na miejscu",
  },
  {
    service: "Doprowadzenie metra zasilania z rozdzielni w korycie",
    price: "35 zł netto",
  },
  {
    service: "Dodatkowy przewiert przez ścianę z pustaka lub cegły",
    price: "70 zł netto",
  },
  {
    service: "Pompka skroplin (mini Orange) wraz z instalacją",
    price: "350 zł netto",
  },
  {
    service: "Cena podnośnika koszowego",
    price: "do uzgodnienia na miejscu",
  },
  {
    service: "Przegląd gwarancyjny urządzenia",
    price: "140 zł netto",
  },
  {
    service: "Naprawy budowlane",
    price: "do uzgodnienia na miejscu",
  },
];

export default function PricingTable() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>
            <AuroraText>Cennik</AuroraText> usług dodatkowych
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-white/10 backdrop-blur-md">
                  <th className="font-montserrat text-left text-sm font-bold px-6 py-4 text-white/90">
                    Usługa
                  </th>
                  <th className="font-montserrat text-right text-sm font-bold px-6 py-4 text-white/90 whitespace-nowrap">
                    Cena
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={row.service}
                    className={`border-t border-white/5 transition-colors hover:bg-white/5 ${
                      index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-white/70 leading-relaxed">
                      {row.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-white/90 whitespace-nowrap">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
