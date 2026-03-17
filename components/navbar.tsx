"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), { ssr: false });

const PHONE_NUMBER = "+48 503 151 802";
const PHONE_HREF = "tel:+48503151802";

interface NavLink {
  label: string;
  href: string;
}

interface NavDropdown {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavDropdown;

function isDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

const navItems: NavItem[] = [
  {
    label: "Klimatyzacja",
    children: [
      { label: "Montaż klimatyzacji", href: "/klimatyzacja" },
      { label: "Serwis klimatyzacji", href: "/serwis/warszawa" },
      { label: "Wynajem klimatyzatorów", href: "/wynajem-klimatyzatorow" },
    ],
  },
  { label: "Pompy ciepła", href: "/pompy-ciepla" },
  { label: "Produkty", href: "/produkty" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function isDropdownActive(pathname: string, dropdown: NavDropdown): boolean {
  return dropdown.children.some((child) => isActive(pathname, child.href));
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleDropdownEnter() {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDesktopDropdownOpen(true);
  }

  function handleDropdownLeave() {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 150);
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      role="navigation"
      aria-label="Nawigacja główna"
    >
      {/* DarkVeil animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <DarkVeil
          hueShift={230}
          noiseIntensity={0.06}
          scanlineIntensity={0.3}
          speed={0.8}
          scanlineFrequency={0}
          warpAmount={0.35}
          resolutionScale={0.5}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="PBAC - Strona główna">
            <Image
              src="/images/pbac-logo.png"
              alt="PBAC"
              width={56}
              height={46}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              isDropdown(item) ? (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isDropdownActive(pathname, item)
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                    aria-expanded={desktopDropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        desktopDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop dropdown panel */}
                  <div
                    className="absolute left-0 top-full pt-1 transition-[opacity,transform] duration-200 ease-out"
                    style={{
                      opacity: desktopDropdownOpen ? 1 : 0,
                      transform: desktopDropdownOpen
                        ? "translateY(0)"
                        : "translateY(-4px)",
                      pointerEvents: desktopDropdownOpen ? "auto" : "none",
                    }}
                  >
                    <div className="w-56 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-xl shadow-black/40">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
                            isActive(pathname, child.href)
                              ? "text-white bg-white/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive(pathname, item.href)
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA phone button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="gradient-button rounded-full uppercase text-xs tracking-wider px-6 h-9 text-white border-0 hover:opacity-90 transition-opacity"
            >
              <a href={PHONE_HREF} aria-label={`Zadzwoń: ${PHONE_NUMBER}`}>
                <Phone className="size-3.5" />
                {PHONE_NUMBER}
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
        style={{
          maxHeight: mobileOpen ? "600px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="relative px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) =>
            isDropdown(item) ? (
              <div key={item.label}>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    isDropdownActive(pathname, item)
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileDropdownOpen((prev) => !prev)}
                  aria-expanded={mobileDropdownOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile dropdown sub-links */}
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
                  style={{
                    maxHeight: mobileDropdownOpen ? "200px" : "0px",
                    opacity: mobileDropdownOpen ? 1 : 0,
                  }}
                >
                  <div className="pl-4 py-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(pathname, child.href)
                            ? "text-white bg-white/10"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  isActive(pathname, item.href)
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          <div className="pt-3 mt-2 border-t border-white/10">
            <Button
              asChild
              className="gradient-button rounded-full uppercase text-xs tracking-wider px-6 h-10 text-white border-0 w-full hover:opacity-90 transition-opacity"
            >
              <a
                href={PHONE_HREF}
                onClick={() => setMobileOpen(false)}
                aria-label={`Zadzwoń: ${PHONE_NUMBER}`}
              >
                <Phone className="size-4" />
                {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
