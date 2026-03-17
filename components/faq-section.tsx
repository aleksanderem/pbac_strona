import FadeIn from "@/components/ui/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { FAQ } from "@/types";

export const homepageFaqs: FAQ[] = [
  {
    question: "Ile kosztuje montaż klimatyzacji?",
    answer: "Cena montażu zależy od modelu klimatyzatora, długości trasy rurowej, kondygnacji i warunków technicznych. Orientacyjnie montaż jednego klimatyzatora ściennego to koszt od 1500 zł za samo wykonanie. Urządzenie z montażem — od ok. 4000 zł. Bezpłatna wycena pozwala poznać dokładny koszt.",
  },
  {
    question: "Jak długo trwa montaż klimatyzacji?",
    answer: "Standardowy montaż jednego klimatyzatora ściennego trwa 4-8 godzin. Montaż systemu multisplit z kilkoma jednostkami wewnętrznymi to 1-2 dni robocze. Czas zależy od warunków technicznych i długości tras rurowych.",
  },
  {
    question: "Czy potrzebuję zgody spółdzielni na klimatyzację?",
    answer: "W blokach i budynkach wielorodzinnych zazwyczaj wymagana jest zgoda zarządcy lub spółdzielni na umieszczenie jednostki zewnętrznej na elewacji. Pomagamy w przygotowaniu dokumentów i doradzamy lokalizacje minimalizujące ingerencję w elewację.",
  },
  {
    question: "Jaki klimatyzator wybrać do mieszkania?",
    answer: "Dobór zależy od metrażu, nasłonecznienia, izolacji i budżetu. Dla pokoju 20-30 m² wystarczy model 2.5-3.5 kW. Polecamy Samsung Wind-Free (cisza od 16 dB) do sypialni i LG ArtCool do salonów. Nasi doradcy bezpłatnie pomogą dobrać optymalny model.",
  },
  {
    question: "Czy klimatyzator może grzać zimą?",
    answer: "Tak! Większość nowoczesnych klimatyzatorów wyposażona jest w pompę ciepła, która efektywnie ogrzewa pomieszczenie zimą. To jedno z najbardziej ekonomicznych źródeł ogrzewania — klasa A++ oznacza nawet 3-4 krotnie niższe koszty niż ogrzewanie elektryczne.",
  },
  {
    question: "Jak często trzeba serwisować klimatyzację?",
    answer: "Zalecamy przegląd minimum raz w roku — najlepiej przed sezonem letnim. Serwis obejmuje czyszczenie filtrów, dezynfekcję parownika, sprawdzenie ciśnienia czynnika i kontrolę szczelności. Regularny przegląd przedłuża żywotność urządzenia i utrzymuje jego efektywność.",
  },
  {
    question: "Ile prądu zużywa klimatyzator?",
    answer: "Nowoczesny klimatyzator inwerterowy klasy A++ zużywa ok. 0.5-1.5 kWh na godzinę pracy, co przy typowym użytkowaniu (6-8h dziennie przez 3 miesiące lata) daje koszt ok. 200-500 zł za sezon. To mniej niż grzejnik elektryczny o tej samej mocy.",
  },
  {
    question: "Czy montujecie klimatyzacje poza Warszawą?",
    answer: "Tak, obsługujemy 13 miast w regionie: Warszawę, Kraków, Siedlce, Mińsk Mazowiecki, Węgrów, Białą Podlaską, Otwock, Piaseczno, Grodzisk Mazowiecki, Legionowo, Łomianki, Nowy Dwór Mazowiecki i Pruszków. Dojazd wliczony w cenę montażu.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="relative py-20 px-4 overflow-hidden scroll-mt-20">
      <StripedPattern
        width={12}
        height={12}
        className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeIn className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          <h2>Najczęściej zadawane pytania</h2>
        </FadeIn>

        <FadeIn delay={0.2} className="relative rounded-2xl border border-white/10 p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-4">
            <Accordion type="single" collapsible className="space-y-2">
              {homepageFaqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border-white/10 bg-white/5 rounded-xl px-6"
                >
                  <AccordionTrigger className="text-base text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
