"use client";

import { Phone } from "lucide-react";

export default function StickyPhone() {
  return (
    <a
      href="tel:+48XXXXXXXXX"
      className="fixed bottom-6 right-6 z-50 md:hidden size-14 rounded-full gradient-button flex items-center justify-center shadow-lg shadow-pbac-navy/30 animate-pulse"
      aria-label="Zadzwoń do nas"
    >
      <Phone className="size-6 text-white" />
    </a>
  );
}
