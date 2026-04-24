import Image from "next/image";
import Link from "next/link";

const uslugiLinks = [
  { label: "Montaż klimatyzacji", href: "/klimatyzacja" },
  { label: "Serwis klimatyzacji", href: "/serwis/warszawa" },
  { label: "Pompy ciepła", href: "/pompy-ciepla" },
  { label: "Wynajem klimatyzatorów", href: "/wynajem-klimatyzatorow" },
  { label: "Produkty", href: "/produkty" },
  { label: "Partner: PlayAir Pruszków", href: "/playair" },
];

const lokalizacjeLinks = [
  { label: "Warszawa", href: "/montaz/warszawa" },
  { label: "Kraków", href: "/montaz/krakow" },
  { label: "Siedlce", href: "/montaz/siedlce" },
  { label: "Piaseczno", href: "/montaz/piaseczno" },
  { label: "Legionowo", href: "/montaz/legionowo" },
  { label: "Otwock", href: "/montaz/otwock" },
  { label: "Pruszków", href: "/montaz/pruszkow" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A337F]/20 border-t border-white/10">
      {/* Gradient top border */}
      <div className="h-px gradient-primary" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Company */}
          <div>
            <Image
              src="/images/pbac-logo.png"
              alt="PBAC"
              width={49}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-white/50 text-sm leading-relaxed">
              Profesjonalny montaż i serwis klimatyzacji oraz pomp ciepła w
              Warszawie i okolicach.
            </p>
            <a
              href="tel:+48503151802"
              className="mt-3 inline-block text-white/50 text-sm hover:text-white transition-colors"
            >
              +48 503 151 802
            </a>
          </div>

          {/* Column 2: Usługi */}
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4">
              Usługi
            </h4>
            <ul className="space-y-2">
              {uslugiLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lokalizacje */}
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4">
              Lokalizacje
            </h4>
            <ul className="space-y-2">
              {lokalizacjeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>Marszałkowska 55/73</li>
              <li>00-676 Warszawa</li>
              <li>
                <a
                  href="mailto:biuro@pbac.pl"
                  className="hover:text-white transition-colors"
                >
                  biuro@pbac.pl
                </a>
              </li>
              <li>
                <a
                  href="tel:+48503151802"
                  className="hover:text-white transition-colors"
                >
                  +48 503 151 802
                </a>
              </li>
              <li>Pn-Pt 08:00-18:00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>&copy; 2026 PBAC. Wszelkie prawa zastrzeżone.</span>
          <Link
            href="/polityka-prywatnosci"
            className="hover:text-white transition-colors"
          >
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
