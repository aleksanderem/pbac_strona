"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, X, Loader2, AlertCircle } from "lucide-react";

export type PlayairCTAContext =
  | { kind: "general" }
  | { kind: "package"; packageName: string; priceLabel?: string }
  | { kind: "measurement" };

const EVENT_NAME = "playair:open-quote";

interface OpenEvent extends CustomEvent {
  detail: PlayairCTAContext;
}

function dispatchOpen(detail: PlayairCTAContext) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }));
}

interface CTAButtonProps {
  context: PlayairCTAContext;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function PlayairCTAButton({
  context,
  className,
  children,
  ariaLabel,
}: CTAButtonProps) {
  return (
    <button
      type="button"
      onClick={() => dispatchOpen(context)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function buildIntro(ctx: PlayairCTAContext): {
  heading: string;
  subject: string;
  prefilledMessage: string;
} {
  if (ctx.kind === "package") {
    return {
      heading: `Wybrałeś pakiet ${ctx.packageName}`,
      subject: `PlayAir Pruszków — wybór pakietu ${ctx.packageName}${ctx.priceLabel ? ` (${ctx.priceLabel})` : ""}`,
      prefilledMessage: `Interesuje mnie pakiet ${ctx.packageName}${ctx.priceLabel ? ` (${ctx.priceLabel})` : ""}. Proszę o kontakt i wycenę dostosowaną do mojego lokalu.`,
    };
  }
  if (ctx.kind === "measurement") {
    return {
      heading: "Umów darmowy pomiar",
      subject: "PlayAir Pruszków — zgłoszenie pomiaru",
      prefilledMessage:
        "Chcę umówić darmowy pomiar u mnie w lokalu. Proszę o kontakt w celu ustalenia terminu.",
    };
  }
  return {
    heading: "Zamów darmową wycenę",
    subject: "PlayAir Pruszków — zgłoszenie z formularza",
    prefilledMessage: "",
  };
}

export function PlayairQuoteModal() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<PlayairCTAContext>({ kind: "general" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    function handler(e: Event) {
      const ev = e as OpenEvent;
      setContext(ev.detail || { kind: "general" });
      setStatus("idle");
      setErrorMsg(null);
      setOpen(true);
    }
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const { heading, subject, prefilledMessage } = buildIntro(context);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((v, k) => {
      payload[k] = typeof v === "string" ? v : "";
    });
    const body = {
      ...payload,
      source: "playair-modal",
      subject,
      context: context.kind,
      packageName: context.kind === "package" ? context.packageName : undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          (data && typeof data.error === "string" ? data.error : null) ||
            "Nie udało się wysłać formularza. Spróbuj ponownie lub zadzwoń."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={heading}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-black/95 backdrop-blur-xl p-8 z-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div className="size-16 rounded-full gradient-primary flex items-center justify-center">
              <CheckCircle2 className="size-8 text-white" />
            </div>
            <h2 className="font-montserrat text-2xl font-bold">Dziękujemy!</h2>
            <p className="text-white/70">
              Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold hover:bg-white/90 transition-colors"
            >
              Zamknij
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-montserrat text-2xl font-bold mb-1">{heading}</h2>
            <p className="text-white/50 text-sm mb-6">
              Odpowiemy w ciągu 24 godzin. Pomiar darmowy w strefie Pruszków + 12 okolic.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Imię
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jan Kowalski"
                  className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="+48 500 000 000"
                    className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="email@example.com"
                    className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Adres / metraż
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="np. Pruszków, mieszkanie 55 m²"
                  className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Wiadomość
                </label>
                <textarea
                  name="message"
                  rows={3}
                  defaultValue={prefilledMessage}
                  placeholder="Opisz swoje potrzeby..."
                  className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none"
                />
              </div>

              {status === "error" && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-start gap-2">
                  <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-black rounded-xl px-6 py-4 font-bold text-sm hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                {status === "loading" ? "Wysyłanie..." : "Wyślij zapytanie"}
              </button>

              <p className="text-[11px] text-white/40 text-center">
                Wysyłając, akceptujesz przetwarzanie danych w celu kontaktu zwrotnego.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
