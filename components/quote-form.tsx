"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import FadeIn from "@/components/ui/fade-in";

interface QuoteFormData {
  serviceType: string;
  buildingType: string;
  area: string;
  rooms: string;
  preferredBrand: string;
  additionalInfo: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  consent: boolean;
}

const INITIAL_DATA: QuoteFormData = {
  serviceType: "",
  buildingType: "",
  area: "",
  rooms: "",
  preferredBrand: "",
  additionalInfo: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  consent: false,
};

const STEP_LABELS = [
  "Rodzaj usługi",
  "Twój lokal",
  "Preferencje",
  "Dane kontaktowe",
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "size-3 rounded-full transition-all duration-300",
              i === current
                ? "gradient-primary scale-125"
                : i < current
                  ? "bg-pbac-magenta/60"
                  : "bg-white/20"
            )}
          />
          {i < total - 1 && (
            <div
              className={cn(
                "h-px w-8 transition-colors duration-300",
                i < current ? "bg-pbac-magenta/60" : "bg-white/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-white/80">{label}</Label>
      {children}
    </div>
  );
}

const selectTriggerClass =
  "w-full bg-white/5 border-white/10 text-white hover:bg-white/10";
const selectContentClass = "bg-neutral-900 border-white/10";
const inputClass =
  "bg-white/5 border-white/10 text-white placeholder:text-white/40 hover:bg-white/10";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL_DATA);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  function update(fields: Partial<QuoteFormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function validateStep(): string[] {
    const errs: string[] = [];
    if (step === 0) {
      if (!formData.serviceType) errs.push("Wybierz rodzaj usługi");
      if (!formData.buildingType) errs.push("Wybierz typ budynku");
    } else if (step === 1) {
      if (!formData.area) errs.push("Podaj powierzchnię");
      if (!formData.rooms) errs.push("Wybierz liczbę pomieszczeń");
    } else if (step === 3) {
      if (!formData.name || formData.name.length < 2)
        errs.push("Podaj imię i nazwisko (min. 2 znaki)");
      if (!formData.phone) errs.push("Podaj numer telefonu");
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errs.push("Podaj poprawny adres e-mail");
      if (!formData.consent)
        errs.push("Wymagana zgoda na przetwarzanie danych");
    }
    return errs;
  }

  function goNext() {
    const errs = validateStep();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setErrors([]);
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    const errs = validateStep();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setStatus("loading");
    try {
      // formsubmit.co/ajax is blocked by Cloudflare CORS preflight; the
      // plain endpoint with no-cors still delivers the payload.
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        body.append(k, typeof v === "boolean" ? (v ? "tak" : "nie") : String(v));
      });
      body.append("_subject", "Wycena ze strony pbac.pl");
      body.append("_template", "table");
      body.append("_captcha", "false");
      await fetch("https://formsubmit.co/biuro@pbac.pl", {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="wycena" className="relative py-20 px-4 overflow-hidden">
        <DotPattern
          width={18}
          height={18}
          cr={0.6}
          className="absolute inset-x-0 top-0 h-[60%] z-0 fill-pbac-magenta/[0.04] [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="size-20 rounded-full gradient-primary flex items-center justify-center">
              <CheckCircle className="size-10 text-white" />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-white">
              Dziękujemy!
            </h3>
            <p className="text-white/70 text-lg">
              Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wycena" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={18}
        height={18}
        cr={0.6}
        className="absolute inset-0 fill-pbac-magenta/[0.04] [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10 max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white text-center mb-4">
            Zamów <AuroraText>darmową wycenę</AuroraText>
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-lg mx-auto">
            Wypełnij formularz, a nasz specjalista skontaktuje się z Tobą w
            ciągu 24 godzin z indywidualną ofertą.
          </p>

          <div className="relative rounded-2xl border border-white/10 p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <Card className="bg-white/10 backdrop-blur-md border-0 rounded-xl">
            <CardContent className="pt-6">
              <StepIndicator current={step} total={4} />

              <p className="text-center text-sm text-white/50 mb-6">
                Krok {step + 1} z 4 &mdash; {STEP_LABELS[step]}
              </p>

              {errors.length > 0 && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {errors.map((e, i) => (
                    <p key={i} className="text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle className="size-4 shrink-0" />
                      {e}
                    </p>
                  ))}
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    Wystąpił błąd. Spróbuj ponownie lub zadzwoń do nas.
                  </p>
                </div>
              )}

              <div
                key={step}
                className="space-y-5"
                style={{
                  animation: `slideIn${direction > 0 ? "Right" : "Left"} 0.3s ease-out both`,
                }}
              >
                {step === 0 && (
                  <>
                    <FieldGroup label="Rodzaj usługi">
                      <Select
                        value={formData.serviceType}
                        onValueChange={(v) => update({ serviceType: v })}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Wybierz usługę" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="montaz-klima">Montaż klimatyzacji</SelectItem>
                          <SelectItem value="serwis-klima">Serwis klimatyzacji</SelectItem>
                          <SelectItem value="wynajem">Wynajem klimatyzatora</SelectItem>
                          <SelectItem value="pompy-ciepla">Pompy ciepła</SelectItem>
                          <SelectItem value="multisplit">System multisplit</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                    <FieldGroup label="Typ budynku">
                      <Select
                        value={formData.buildingType}
                        onValueChange={(v) => update({ buildingType: v })}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Wybierz typ budynku" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                          <SelectItem value="dom">Dom jednorodzinny</SelectItem>
                          <SelectItem value="biuro">Biuro / lokal usługowy</SelectItem>
                          <SelectItem value="inny">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                  </>
                )}

                {step === 1 && (
                  <>
                    <FieldGroup label="Powierzchnia (m²)">
                      <Input
                        type="number"
                        placeholder="np. 60"
                        value={formData.area}
                        onChange={(e) => update({ area: e.target.value })}
                        className={inputClass}
                      />
                    </FieldGroup>
                    <FieldGroup label="Liczba pomieszczeń do klimatyzacji">
                      <Select
                        value={formData.rooms}
                        onValueChange={(v) => update({ rooms: v })}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Wybierz liczbę pomieszczeń" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="1">1 pomieszczenie</SelectItem>
                          <SelectItem value="2">2 pomieszczenia</SelectItem>
                          <SelectItem value="3">3 pomieszczenia</SelectItem>
                          <SelectItem value="4">4 pomieszczenia</SelectItem>
                          <SelectItem value="5+">5 lub więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                  </>
                )}

                {step === 2 && (
                  <>
                    <FieldGroup label="Preferowana marka">
                      <Select
                        value={formData.preferredBrand}
                        onValueChange={(v) => update({ preferredBrand: v })}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="lg">LG</SelectItem>
                          <SelectItem value="toshiba">Toshiba</SelectItem>
                          <SelectItem value="gree">Gree</SelectItem>
                          <SelectItem value="daikin">Daikin</SelectItem>
                          <SelectItem value="haier">Haier</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                          <SelectItem value="pomoz">Pomóż mi wybrać</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                    <FieldGroup label="Dodatkowe informacje">
                      <Textarea
                        placeholder="np. Piętro, ekspozycja okien, dodatkowe wymagania..."
                        value={formData.additionalInfo}
                        onChange={(e) => update({ additionalInfo: e.target.value })}
                        className={cn(inputClass, "min-h-24")}
                      />
                    </FieldGroup>
                  </>
                )}

                {step === 3 && (
                  <>
                    <FieldGroup label="Imię i nazwisko">
                      <Input
                        type="text"
                        placeholder="Imię i nazwisko"
                        value={formData.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className={inputClass}
                      />
                    </FieldGroup>
                    <FieldGroup label="Telefon">
                      <Input
                        type="tel"
                        placeholder="+48 xxx xxx xxx"
                        value={formData.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        className={inputClass}
                      />
                    </FieldGroup>
                    <FieldGroup label="E-mail">
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => update({ email: e.target.value })}
                        className={inputClass}
                      />
                    </FieldGroup>
                    <FieldGroup label="Miasto">
                      <Input
                        type="text"
                        placeholder="np. Warszawa"
                        value={formData.city}
                        onChange={(e) => update({ city: e.target.value })}
                        className={inputClass}
                      />
                    </FieldGroup>
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => update({ consent: e.target.checked })}
                        className="mt-1 size-4 rounded border-white/20 accent-pbac-magenta"
                      />
                      <label htmlFor="consent" className="text-sm text-white/60 cursor-pointer">
                        Wyrażam zgodę na przetwarzanie danych osobowych w celu
                        przygotowania wyceny.{" "}
                        <a href="/polityka-prywatnosci" className="underline hover:text-white/80">
                          Polityka prywatności
                        </a>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <Button
                    variant="outline"
                    onClick={goBack}
                    className="border-white/10 text-white hover:bg-white/5"
                  >
                    Wstecz
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={goNext}
                    className="gradient-button text-white px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Dalej
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="gradient-button text-white px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {status === "loading" && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    Wyślij zapytanie
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
