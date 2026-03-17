"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/ui/fade-in";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      // Formspree endpoint — replace FORM_ID with actual Formspree form ID
      const res = await fetch("https://formspree.io/f/FORM_ID", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="wycena" className="relative py-20 px-4 overflow-hidden scroll-mt-20">
      <GridPattern
        className="absolute inset-0 z-0 fill-white/[0.03] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        width={40}
        height={40}
      />
      <div className="relative z-10 max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Bezpłatna wycena
          </h2>
          <p className="text-center text-white/60 text-lg mb-12">
            Opisz swoje potrzeby, a przygotujemy indywidualną ofertę
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative rounded-2xl border border-white/10 p-2">
            <GlowingEffect spread={60} glow proximity={80} />
            <div className="relative rounded-xl bg-white/10 backdrop-blur-md p-8">
              {status === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-montserrat text-xl font-bold mb-2">
                    Wiadomość wysłana!
                  </h3>
                  <p className="text-white/60">
                    Skontaktujemy się z Tobą w ciągu 24 godzin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-white/70 mb-2">
                        Imię i nazwisko
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-white/70 mb-2">
                        Telefon
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="+48 500 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
                      placeholder="jan@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm text-white/70 mb-2">
                      Rodzaj usługi
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors"
                    >
                      <option value="">Wybierz usługę</option>
                      <option value="montaz">Montaż klimatyzacji</option>
                      <option value="serwis">Serwis klimatyzacji</option>
                      <option value="wynajem">Wynajem klimatyzatora</option>
                      <option value="pompy">Pompy ciepła</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-white/70 mb-2">
                      Wiadomość
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors resize-none"
                      placeholder="Opisz swoje potrzeby: metraż, liczba pomieszczeń, typ budynku..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 shrink-0"
                    />
                    <label htmlFor="consent" className="text-xs text-white/50">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie.{" "}
                      <a href="/polityka-prywatnosci" className="underline hover:text-white/70">
                        Polityka prywatności
                      </a>
                    </label>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Wystąpił błąd. Spróbuj ponownie lub zadzwoń: +48 503 151 802
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full gradient-button text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {status === "submitting" ? "Wysyłanie..." : "Wyślij zapytanie"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
