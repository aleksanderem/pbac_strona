import type { Metadata } from "next";
import { Montserrat, Chivo } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pbac.pl"),
  title: "PBAC — Klimatyzacja, Pompy Ciepła | Montaż i Serwis Warszawa",
  description:
    "Profesjonalny montaż i serwis klimatyzacji w Warszawie i okolicach. Samsung, LG, Toshiba, Gree, Daikin i inne. Bezpłatna wycena.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/pbac-logo.png",
    apple: "/images/pbac-logo.png",
  },
  openGraph: {
    siteName: "PBAC",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "PBAC — Klimatyzacja i Pompy Ciepła Warszawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PBAC — Klimatyzacja, Pompy Ciepła | Montaż i Serwis Warszawa",
    description:
      "Profesjonalny montaż i serwis klimatyzacji w Warszawie i okolicach. Bezpłatna wycena.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <head>
        <link rel="preconnect" href="https://ezicons.com" />
        <link rel="dns-prefetch" href="https://ezicons.com" />
      </head>
      <body
        className={`${montserrat.variable} ${chivo.variable} font-chivo bg-black text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
        >
          Przejdź do treści
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://pbac.pl/#organization",
            name: "PBAC",
            url: "https://pbac.pl",
            logo: {
              "@type": "ImageObject",
              url: "https://pbac.pl/images/pbac-logo.png",
              width: 184,
              height: 150,
            },
            description:
              "Profesjonalny montaż i serwis klimatyzacji oraz pomp ciepła w Warszawie i okolicach.",
            telephone: "+48503151802",
            email: "biuro@pbac.pl",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Marszałkowska 55/73",
              postalCode: "00-676",
              addressLocality: "Warszawa",
              addressRegion: "mazowieckie",
              addressCountry: "PL",
            },
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 52.2297,
                longitude: 21.0122,
              },
              geoRadius: "50000",
            },
            sameAs: ["https://pompy.pbac.pl"],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+48503151802",
              contactType: "customer service",
              availableLanguage: "Polish",
              areaServed: "PL",
            },
          }}
        />
        {children}
        <Script
          src="https://ezicons.com/sdk.js"
          data-key="iek_oYNmSmglKJTtwcB1AHUMdI2XDxW98DHP"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
