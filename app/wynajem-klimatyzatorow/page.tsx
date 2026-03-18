import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { AuroraText } from "@/components/ui/aurora-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import HeroBackground from "@/components/hero-background";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock, Phone, Truck, Zap, CalendarDays, RefreshCw,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Wynajem klimatyzatorów Warszawa | PBAC",
  description: "Wynajem klimatyzatorów przenośnych w Warszawie. Dostawa i odbiór. Na dni, tygodnie, miesiące. ☎ 503 151 802.",
  alternates: { canonical: "/wynajem-klimatyzatorow" },
};

const rentalBenefits = [
  { icon: Truck, title: "Dostawa i odbiór", desc: "Dostarczamy i odbieramy klimatyzator na terenie Warszawy i okolic — wliczone w cenę wynajmu." },
  { icon: Zap, title: "Gotowe do użycia", desc: "Urządzenia w pełni przygotowane — podłącz do gniazdka i ciesz się chłodem w ciągu minut." },
  { icon: CalendarDays, title: "Elastyczne okresy", desc: "Wynajem na dni, tygodnie lub miesiące. Możliwość przedłużenia w dowolnym momencie." },
  { icon: RefreshCw, title: "Wymiana modelu", desc: "Możliwość wymiany na inny model w trakcie wynajmu — dopasuj moc do potrzeb." },
];

const steps = [
  { num: "01", title: "Kontakt", desc: "Zadzwoń lub napisz — podaj termin, lokalizację i wielkość pomieszczenia." },
  { num: "02", title: "Dobór i dostawa", desc: "Dobieramy klimatyzator o odpowiedniej mocy i dostarczamy pod wskazany adres." },
  { num: "03", title: "Użytkowanie", desc: "Podłączasz do gniazdka — urządzenie gotowe do pracy od razu." },
  { num: "04", title: "Odbiór", desc: "Po zakończeniu wynajmu odbieramy sprzęt z lokalizacji." },
];

const faqs = [
  { question: "Ile kosztuje wynajem klimatyzatora?", answer: "Cena zależy od mocy urządzenia i okresu wynajmu. Wynajem klimatyzatora przenośnego 2.5 kW na tydzień to koszt od 250 zł. Przy dłuższych okresach oferujemy atrakcyjne rabaty." },
  { question: "Jak szybko mogę otrzymać klimatyzator?", answer: "W sezonie letnim standardowy czas dostawy to 1-2 dni robocze. Poza sezonem — często dostawa tego samego lub następnego dnia." },
  { question: "Czy klimatyzator wymaga specjalnej instalacji?", answer: "Nie — klimatyzatory przenośne działają na zasadzie plug & play. Wystarczy podłączyć do gniazdka 230V i wyprowadzić wąż odprowadzający ciepłe powietrze przez okno (adapter w zestawie)." },
  { question: "Na jaką powierzchnię wystarczy klimatyzator przenośny?", answer: "Oferujemy modele o mocy 2.5–5.0 kW, odpowiednie dla pomieszczeń od 20 do 50 m². Doradzimy optymalny model dla Twojego pomieszczenia." },
];

export default function WynajemPage() {
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Wynajem klimatyzatorów" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wynajem klimatyzatorów Warszawa",
    description: "Wynajem klimatyzatorów przenośnych na dni, tygodnie lub miesiące z dostawą i odbiorem na terenie Warszawy.",
    provider: { "@id": "https://pbac.pl/#localbusiness" },
    areaServed: { "@type": "City", name: "Warszawa" },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[serviceSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <Breadcrumb items={breadcrumbItems} />
          <FadeIn>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Clock className="w-5 h-5 text-white/50" />
              <span className="text-white/50 text-sm">Wynajem krótko- i długoterminowy</span>
            </div>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Wynajem <AuroraText className="font-montserrat">klimatyzatorów</AuroraText>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
              Oferujemy wynajem klimatyzatorów przenośnych na krótkie i długie okresy. Idealne rozwiązanie na czas remontu, wydarzenia, sezonu letniego lub jako tymczasowe uzupełnienie stałej klimatyzacji. Dostawa i odbiór w Warszawie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+48503151802" className="inline-flex items-center justify-center gap-2 gradient-button text-white rounded-full px-8 py-4 font-bold text-sm transition-opacity hover:opacity-90">
                <Phone className="w-4 h-4" />
                +48 503 151 802
              </a>
              <a href="/#wycena" className="inline-flex items-center justify-center border border-white/20 text-white rounded-full px-8 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                Formularz wyceny
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Dlaczego <AuroraText>wynajem</AuroraText>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Elastyczne warunki, szybka dostawa i zero zobowiązań
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rentalBenefits.map((b, idx) => (
              <FadeIn key={b.title} delay={idx * 0.1}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <b.icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="font-montserrat text-lg font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS STEPS ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Jak to działa?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Od kontaktu do chłodzenia — 4 proste kroki
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <FadeIn key={step.num} delay={idx * 0.15}>
                <div className="relative rounded-2xl border border-white/10 p-2 h-full">
                  <GlowingEffect spread={40} glow proximity={64} />
                  <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-6 h-full">
                    <div className="font-montserrat text-5xl font-bold text-white/5 mb-2">{step.num}</div>
                    <h3 className="font-montserrat text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Najczęstsze pytania
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl border border-white/10 p-2">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-4">
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="border-white/10 bg-white/5 rounded-xl px-6">
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
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="gradient-primary rounded-2xl p-10 md:p-14 text-center">
              <Clock className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                Zamów wynajem klimatyzatora
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Zadzwoń i podaj termin, lokalizację i wielkość pomieszczenia
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+48503151802" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-10 py-4 font-bold text-sm hover:bg-white/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  +48 503 151 802
                </a>
                <Link href="/klimatyzacja" className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-10 py-4 font-bold text-sm hover:bg-white/10 transition-colors">
                  Montaż na stałe
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
