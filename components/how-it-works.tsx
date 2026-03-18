"use client";

import { cn } from "@/lib/utils";
import { Phone, Settings, Wrench, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Kontakt i wycena",
    description: "Zadzwoń lub wypełnij formularz — przygotujemy bezpłatną wycenę montażu klimatyzacji w ciągu 24h.",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    title: "Dobór klimatyzatora",
    description: "Nasi specjaliści dobiorą optymalny model na podstawie metrażu, rozkładu pomieszczeń i Twoich potrzeb.",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    title: "Profesjonalny montaż",
    description: "Certyfikowani instalatorzy wykonają montaż zgodnie z najwyższymi standardami producenta. Próba szczelności i uruchomienie w cenie.",
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    title: "Serwis i gwarancja",
    description: "Zapewniamy pełen serwis gwarancyjny i pogwarancyjny — przeglądy, czyszczenie, naprawy. Gwarancja do 10 lat.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

function Feature({ title, description, icon, index }: { title: string; description: string; icon: React.ReactNode; index: number }) {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-white/10",
        (index === 0 || index === 4) && "lg:border-l border-white/10",
        index < 4 && "lg:border-b border-white/10"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white/50">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-[#3D5EFF] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white font-montserrat">
          {title}
        </span>
      </div>
      <p className="text-sm text-white/60 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="jak-dzialamy" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          Jak działamy?
        </h2>
        <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
          Od pierwszego kontaktu do uruchomienia klimatyzacji — 4 proste kroki
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
