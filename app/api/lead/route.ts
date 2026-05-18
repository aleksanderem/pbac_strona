import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.LEAD_INBOX || "biuro@pbac.pl";
const FROM = process.env.LEAD_FROM || "PBAC Leads <leads@mailer.kolabogroup.pl>";

type LeadPayload = {
  source?: string;
  subject?: string;
  context?: string;
  packageName?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  message?: string;
  city?: string;
  area?: string;
  rooms?: string;
  serviceType?: string;
  buildingType?: string;
  preferredBrand?: string;
  additionalInfo?: string;
  consent?: boolean | string;
  honeypot?: string;
  // Allow arbitrary string fields so any form can post extra context
  [key: string]: unknown;
};

const FIELD_LABELS: Record<string, string> = {
  source: "Źródło",
  context: "Kontekst",
  packageName: "Pakiet",
  name: "Imię i nazwisko",
  phone: "Telefon",
  email: "Email",
  address: "Adres / metraż",
  city: "Miasto",
  area: "Powierzchnia",
  rooms: "Liczba pomieszczeń",
  serviceType: "Rodzaj usługi",
  buildingType: "Typ budynku",
  preferredBrand: "Preferowana marka",
  additionalInfo: "Dodatkowe informacje",
  message: "Wiadomość",
  consent: "Zgoda RODO",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "tak" : "nie";
  return String(value);
}

function buildHtml(payload: LeadPayload, request: Request): string {
  const rows = Object.entries(payload)
    .filter(([key]) => key !== "honeypot" && !key.startsWith("_"))
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] || key;
      return `<tr><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#6b7280;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;color:#111827">${escapeHtml(formatValue(value))}</td></tr>`;
    })
    .join("");

  const meta = [
    `Origin: ${escapeHtml(request.headers.get("origin") || "—")}`,
    `Referer: ${escapeHtml(request.headers.get("referer") || "—")}`,
    `User-Agent: ${escapeHtml(request.headers.get("user-agent") || "—")}`,
  ].join("<br />");

  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;background:#f9fafb;padding:24px;color:#111827"><div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb"><div style="padding:20px 24px;background:linear-gradient(135deg,#3D5EFF,#B31853);color:#ffffff"><div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.8">Nowy lead</div><div style="font-size:18px;font-weight:700;margin-top:4px">${escapeHtml(payload.subject || "Zgłoszenie z formularza")}</div></div><table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table><div style="padding:14px 24px;color:#9ca3af;font-size:11px;line-height:1.6">${meta}</div></div></body></html>`;
}

function buildText(payload: LeadPayload): string {
  return Object.entries(payload)
    .filter(([key]) => key !== "honeypot" && !key.startsWith("_"))
    .map(([key, value]) => `${FIELD_LABELS[key] || key}: ${formatValue(value)}`)
    .join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 503 }
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (payload.honeypot) {
    // Honeypot triggered — silently accept to avoid telling the bot.
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name || "").trim();
  const contact = (payload.email || payload.phone || "").trim();
  if (!name || !contact) {
    return NextResponse.json(
      { ok: false, error: "Brakuje imienia lub kontaktu." },
      { status: 400 }
    );
  }

  const subject = payload.subject?.trim() || "Nowy lead — pbac.pl";
  const replyToCandidate = (payload.email || "").trim();
  const replyTo =
    replyToCandidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyToCandidate)
      ? replyToCandidate
      : undefined;

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html: buildHtml(payload, request),
      text: buildText(payload),
      replyTo,
    });
    if (error) {
      console.error("[lead] resend error", error);
      return NextResponse.json(
        { ok: false, error: "Nie udało się wysłać. Spróbuj ponownie." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[lead] resend exception", err);
    return NextResponse.json(
      { ok: false, error: "Nie udało się wysłać. Spróbuj ponownie." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
