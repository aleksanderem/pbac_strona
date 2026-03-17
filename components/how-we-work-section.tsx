import FadeIn from "@/components/ui/fade-in";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { Phone, ClipboardList, Wrench, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Kontakt i wycena",
    description: "Skontaktuj się z nami telefonicznie lub przez formularz. Przygotujemy bezpłatną wycenę dopasowaną do Twojego domu lub biura.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Dobór urządzenia",
    description: "Nasi specjaliści dobiorą optymalny klimatyzator na podstawie metrażu, izolacji, nasłonecznienia i Twoich preferencji.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Profesjonalny montaż",
    description: "Realizujemy montaż zgodnie z najwyższymi standardami producenta — wiercenie, prowadzenie rur, podłączenie i uruchomienie.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Serwis i gwarancja",
    description: "Po montażu zapewniamy pełen serwis gwarancyjny i pogwarancyjny. Regularny przegląd wydłuża żywotność urządzenia.",
  },
];

export default function HowWeWorkSection() {
  return (
    <section id="jak-pracujemy" className="relative py-20 px-4 overflow-hidden">
      <StripedPattern
        className="absolute inset-0 z-0 fill-white/[0.02] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Jak pracujemy
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Od pierwszego kontaktu do uruchomienia klimatyzacji — 4 proste kroki
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.15}>
              <div className="relative text-center">
                <div className="font-montserrat text-6xl font-bold text-white/5 absolute -top-4 left-1/2 -translate-x-1/2">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl gradient-icon flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
