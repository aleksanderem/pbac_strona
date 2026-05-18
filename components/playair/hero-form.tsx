"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlayairHeroFormProps {
  zoneCities: readonly string[];
}

export default function PlayairHeroForm({ zoneCities }: PlayairHeroFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      source: "playair-hero",
      subject: "PlayAir Pruszków — zgłoszenie z formularza",
    };
    fd.forEach((v, k) => {
      payload[k] = typeof v === "string" ? v : "";
    });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          (data && typeof data.error === "string" ? data.error : null) ||
            "Nie udało się wysłać. Spróbuj ponownie lub zadzwoń."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="size-14 rounded-full gradient-primary flex items-center justify-center">
          <CheckCircle2 className="size-7 text-white" />
        </div>
        <h3 className="font-montserrat text-xl font-bold">Dziękujemy!</h3>
        <p className="text-white/70 text-sm">
          Skontaktujemy się z Tobą w ciągu 60 minut w godzinach pracy.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" />
      <div>
        <Label htmlFor="pa-name" className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
          Imię
        </Label>
        <Input
          id="pa-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jan Kowalski"
          className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <Label htmlFor="pa-phone" className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
            Telefon
          </Label>
          <Input
            id="pa-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+48 692 981 431"
            className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
          />
        </div>
        <div>
          <Label htmlFor="pa-city" className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
            Miasto
          </Label>
          <select
            id="pa-city"
            name="city"
            defaultValue="Pruszków"
            className="bg-white/[0.05] border border-white/10 text-white h-11 w-full rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {zoneCities.map((c) => (
              <option key={c} value={c} className="bg-black">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="pa-email" className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
          Email <span className="text-white/30">(opcjonalnie)</span>
        </Label>
        <Input
          id="pa-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jan@example.com"
          className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 h-11"
        />
      </div>
      <div>
        <Label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 block">Usługa</Label>
        <div className="grid grid-cols-2 gap-1.5">
          {["Klimatyzacja", "Pompa ciepła", "Serwis", "Rekuperacja"].map((s, i) => (
            <label key={s} className="relative cursor-pointer">
              <input
                type="radio"
                name="serviceType"
                value={s}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="block text-center text-xs font-medium px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-white/90 hover:bg-white/10 peer-checked:gradient-primary peer-checked:border-transparent peer-checked:text-white transition-colors">
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="gradient-button mt-2 h-12 rounded-lg text-white text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 className="size-4 animate-spin" />}
        {status === "loading" ? "Wysyłanie..." : "Umów wizytę →"}
      </Button>
      <p className="text-[11px] text-white/40 text-center">
        Odpowiadamy w ciągu 60 minut w godz. pracy
      </p>
    </form>
  );
}
