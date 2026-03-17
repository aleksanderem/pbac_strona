"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, Phone, Wrench, ThermometerSun, Building2, BookOpen, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestArticles, getCategories } from "@/lib/articles";
import { brands } from "@/lib/brands";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), { ssr: false });

const PHONE_NUMBER = "+48 503 151 802";
const PHONE_HREF = "tel:+48503151802";

// ── Klimatyzacja mega menu data ─────────────────────────────────────────
const klimatyzacjaServices = [
  {
    label: "Montaż klimatyzacji",
    description: "Profesjonalny montaż z gwarancją",
    href: "/klimatyzacja",
    icon: Wrench,
  },
  {
    label: "Serwis klimatyzacji",
    description: "Przeglądy i naprawy urządzeń",
    href: "/serwis/warszawa",
    icon: ThermometerSun,
  },
  {
    label: "Wynajem klimatyzatorów",
    description: "Wynajem na wydarzenia i biura",
    href: "/wynajem-klimatyzatorow",
    icon: Building2,
  },
];

const featuredBrands = [
  { name: "Samsung", slug: "samsung", logo: "/images/brands/samsung-logo.png" },
  { name: "Gree", slug: "gree", logo: "/images/brands/gree-logo.png" },
  { name: "Daikin", slug: "daikin", logo: "/images/brands/daikin-logo.png" },
  { name: "Kaisai", slug: "kaisai", logo: "/images/brands/kaisai-logo.png" },
  { name: "Mitsubishi", slug: "mitsubishi-electric", logo: "/images/brands/mitsubishi-logo.png" },
];

// ── Produkty mega menu data ─────────────────────────────────────────────
const productBrands = brands.slice(0, 8).map((b) => ({
  name: b.name,
  slug: b.slug,
  logo: b.logo,
}));

const productQuickLinks = [
  { label: "Klimatyzatory ścienne", href: "/produkty" },
  { label: "Multisplit", href: "/produkty" },
  { label: "Klimatyzatory kasetonowe", href: "/produkty" },
];

// ── Blog mega menu data (static at module level) ────────────────────────
const latestArticles = getLatestArticles(3);
const blogCategories = getCategories();

// ── Types ───────────────────────────────────────────────────────────────
type DropdownId = "klimatyzacja" | "produkty" | "blog" | null;

// ── Helpers ─────────────────────────────────────────────────────────────
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// ── Spring animation config ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dropdownVariants: any = {
  hidden: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15, ease: "easeIn" } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 350, damping: 28, mass: 0.8 } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12, ease: "easeIn" } },
};

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const mobilePanelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" as const } },
};

const mobileSubVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.15, ease: "easeIn" as const } },
};

// ══════════════════════════════════════════════════════════════════════════
// Navbar Component
// ══════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<DropdownId>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Close everything on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDropdownEnter = useCallback((id: DropdownId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  const toggleMobileSection = useCallback((id: DropdownId) => {
    setMobileSection((prev) => (prev === id ? null : id));
  }, []);

  // ── Active state checks ─────────────────────────────────────────────
  const isKlimaActive =
    isActive(pathname, "/klimatyzacja") ||
    isActive(pathname, "/serwis") ||
    isActive(pathname, "/wynajem-klimatyzatorow") ||
    isActive(pathname, "/montaz");
  const isProduktyActive = isActive(pathname, "/produkty");
  const isBlogActive = isActive(pathname, "/blog");

  const navButtonClass = (active: boolean) =>
    `flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
      active
        ? "text-white bg-white/10"
        : "text-white/70 hover:text-white hover:bg-white/5"
    }`;

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════
  return (
    <nav
      ref={navRef}
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

          {/* ── Desktop Navigation ───────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Klimatyzacja dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("klimatyzacja")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={navButtonClass(isKlimaActive)}
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "klimatyzacja" ? null : "klimatyzacja"
                  )
                }
                aria-expanded={activeDropdown === "klimatyzacja"}
                aria-haspopup="true"
              >
                Klimatyzacja
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "klimatyzacja" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "klimatyzacja" && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute -left-4 top-full pt-2"
                  >
                    <div className="w-[680px] max-w-[calc(100vw-2rem)] z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/50">
                      <div className="flex gap-6">
                        {/* Left column: Services */}
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Usługi
                          </p>
                          <div className="flex flex-col gap-1">
                            {klimatyzacjaServices.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className={`group flex items-start gap-3 p-3 rounded-xl transition-colors ${
                                  isActive(pathname, service.href)
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                                  <service.icon className="size-4 text-cyan-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                                    {service.label}
                                  </p>
                                  <p className="text-xs text-white/50 mt-0.5">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-white/10" />

                        {/* Right column: Featured brands */}
                        <div className="w-[260px]">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Popularne marki
                          </p>
                          <div className="flex flex-col gap-1">
                            {featuredBrands.map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/produkty/${brand.slug}`}
                                className={`group flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                  isActive(pathname, `/produkty/${brand.slug}`)
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div className="size-14 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={64}
                                    height={64}
                                    className="size-12 object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                  {brand.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/produkty"
                            className="mt-3 flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            Zobacz wszystkie marki
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Produkty dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("produkty")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={navButtonClass(isProduktyActive)}
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "produkty" ? null : "produkty"
                  )
                }
                aria-expanded={activeDropdown === "produkty"}
                aria-haspopup="true"
              >
                Produkty
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "produkty" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "produkty" && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute -left-4 top-full pt-2"
                  >
                    <div className="w-[640px] max-w-[calc(100vw-2rem)] z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/50">
                      <div className="flex gap-6">
                        {/* Brands grid */}
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Marki klimatyzatorów
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {productBrands.map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/produkty/${brand.slug}`}
                                className={`group flex items-center gap-2.5 p-2.5 rounded-lg transition-colors ${
                                  isActive(pathname, `/produkty/${brand.slug}`)
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div className="size-14 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={64}
                                    height={64}
                                    className="size-12 object-contain"
                                  />
                                </div>
                                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                  {brand.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-white/10" />

                        {/* Quick links */}
                        <div className="w-[180px]">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Kategorie
                          </p>
                          <div className="flex flex-col gap-1">
                            {productQuickLinks.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-2 p-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <Tag className="size-3.5 text-white/40" />
                                {link.label}
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <Link
                              href="/produkty"
                              className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              Wszystkie produkty
                              <ArrowRight className="size-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("blog")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={navButtonClass(isBlogActive)}
                onClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "blog" ? null : "blog"
                  )
                }
                aria-expanded={activeDropdown === "blog"}
                aria-haspopup="true"
              >
                Blog
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "blog" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "blog" && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full pt-2"
                  >
                    <div className="w-[560px] max-w-[calc(100vw-2rem)] z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/50">
                      <div className="flex gap-6">
                        {/* Recent articles */}
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Najnowsze artykuły
                          </p>
                          <div className="flex flex-col gap-1">
                            {latestArticles.map((article) => (
                              <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className={`group flex items-start gap-3 p-3 rounded-xl transition-colors ${
                                  isActive(pathname, `/blog/${article.slug}`)
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                {article.coverImage && (
                                  <div className="size-12 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                    <Image
                                      src={article.coverImage}
                                      alt={article.coverAlt || article.title}
                                      width={48}
                                      height={48}
                                      className="size-12 object-cover"
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                  </p>
                                  <p className="text-xs text-white/40 mt-1">
                                    {article.readingTime} min czytania
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-white/10" />

                        {/* Categories */}
                        <div className="w-[190px]">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            Kategorie
                          </p>
                          <div className="flex flex-col gap-1">
                            {blogCategories.slice(0, 6).map((category) => (
                              <Link
                                key={category}
                                href={`/blog?kategoria=${encodeURIComponent(category)}`}
                                className="flex items-center gap-2 p-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <BookOpen className="size-3.5 text-white/40" />
                                <span className="truncate">{category}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <Link
                              href="/blog"
                              className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              Wszystkie artykuły
                              <ArrowRight className="size-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct links */}
            <Link
              href="/pompy-ciepla"
              className={navButtonClass(isActive(pathname, "/pompy-ciepla"))}
            >
              Pompy ciepła
            </Link>
            <Link
              href="/kontakt"
              className={navButtonClass(isActive(pathname, "/kontakt"))}
            >
              Kontakt
            </Link>
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

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
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

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              style={{ top: 64 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              variants={mobilePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 lg:hidden overflow-y-auto"
              style={{ top: 64 }}
            >
              <div className="p-5 flex flex-col gap-1">
                {/* Close button */}
                <button
                  type="button"
                  className="self-end mb-2 flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Zamknij menu"
                >
                  Zamknij
                  <X className="size-5" />
                </button>
                {/* ── Mobile: Klimatyzacja ───────────────────────────── */}
                <div>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isKlimaActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => toggleMobileSection("klimatyzacja")}
                    aria-expanded={mobileSection === "klimatyzacja"}
                  >
                    Klimatyzacja
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        mobileSection === "klimatyzacja" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSection === "klimatyzacja" && (
                      <motion.div
                        variants={mobileSubVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="pl-2 py-2 flex flex-col gap-1">
                          <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/40">
                            Usługi
                          </p>
                          {klimatyzacjaServices.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                                isActive(pathname, service.href)
                                  ? "text-white bg-white/10"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              <service.icon className="size-4 text-cyan-400" />
                              {service.label}
                            </Link>
                          ))}

                          <p className="px-3 py-1 mt-2 text-xs font-medium uppercase tracking-wider text-white/40">
                            Popularne marki
                          </p>
                          {featuredBrands.slice(0, 4).map((brand) => (
                            <Link
                              key={brand.slug}
                              href={`/produkty/${brand.slug}`}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className="size-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                                <Image
                                  src={brand.logo}
                                  alt={brand.name}
                                  width={48}
                                  height={48}
                                  className="size-8 object-contain"
                                />
                              </div>
                              {brand.name}
                            </Link>
                          ))}
                          <Link
                            href="/produkty"
                            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-cyan-400"
                            onClick={() => setMobileOpen(false)}
                          >
                            Zobacz wszystkie marki
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Mobile: Produkty ───────────────────────────────── */}
                <div>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isProduktyActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => toggleMobileSection("produkty")}
                    aria-expanded={mobileSection === "produkty"}
                  >
                    Produkty
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        mobileSection === "produkty" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSection === "produkty" && (
                      <motion.div
                        variants={mobileSubVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="pl-2 py-2 flex flex-col gap-1">
                          {productBrands.map((brand) => (
                            <Link
                              key={brand.slug}
                              href={`/produkty/${brand.slug}`}
                              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(pathname, `/produkty/${brand.slug}`)
                                  ? "text-white bg-white/10"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className="size-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                                <Image
                                  src={brand.logo}
                                  alt={brand.name}
                                  width={48}
                                  height={48}
                                  className="size-8 object-contain"
                                />
                              </div>
                              {brand.name}
                            </Link>
                          ))}
                          <Link
                            href="/produkty"
                            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-cyan-400"
                            onClick={() => setMobileOpen(false)}
                          >
                            Wszystkie produkty
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Mobile: Blog ───────────────────────────────────── */}
                <div>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isBlogActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => toggleMobileSection("blog")}
                    aria-expanded={mobileSection === "blog"}
                  >
                    Blog
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        mobileSection === "blog" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSection === "blog" && (
                      <motion.div
                        variants={mobileSubVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="pl-2 py-2 flex flex-col gap-1">
                          <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/40">
                            Kategorie
                          </p>
                          {blogCategories.slice(0, 5).map((category) => (
                            <Link
                              key={category}
                              href={`/blog?kategoria=${encodeURIComponent(category)}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <BookOpen className="size-3.5 text-white/40" />
                              {category}
                            </Link>
                          ))}
                          <Link
                            href="/blog"
                            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-cyan-400"
                            onClick={() => setMobileOpen(false)}
                          >
                            Wszystkie artykuły
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Mobile: Direct links ───────────────────────────── */}
                <Link
                  href="/pompy-ciepla"
                  className={`px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(pathname, "/pompy-ciepla")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Pompy ciepła
                </Link>
                <Link
                  href="/kontakt"
                  className={`px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(pathname, "/kontakt")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Kontakt
                </Link>

                {/* ── Mobile: CTA ────────────────────────────────────── */}
                <div className="pt-4 mt-3 border-t border-white/10">
                  <Button
                    asChild
                    className="gradient-button rounded-full uppercase text-xs tracking-wider px-6 h-11 text-white border-0 w-full hover:opacity-90 transition-opacity"
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
