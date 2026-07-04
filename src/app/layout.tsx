import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",       // prevent FOUT — text shows in fallback font immediately
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",       // prevent FOUT
  preload: true,
});

import { JsonLd } from "@/components/SEO/JsonLd";
import { Analytics } from "@/components/SEO/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { SmoothScrolling } from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pateltent.com"),
  title: {
    template: "%s | Patel Tent & Event Management",
    default: "Patel Tent & Event Management | Luxury Wedding Decoration & Event Planner in Udaipur",
  },
  description: "Patel Tent & Event Management offers premium wedding decoration, luxury tent setups, mandap design, reception decor, and event management services in Udaipur, Rajasthan.",
  keywords: ["Wedding Decoration", "Event Management", "Luxury Wedding", "Tent House", "Mandap Decoration", "Wedding Planner", "Udaipur", "Rajasthan"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.pateltent.com",
    title: "Patel Tent & Event Management | Luxury Wedding Decoration",
    description: "Patel Tent & Event Management offers premium wedding decoration, luxury tent setups, mandap design, reception decor, and event management services in Udaipur.",
    siteName: "Patel Tent & Event Management",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image in public folder
        width: 1200,
        height: 630,
        alt: "Patel Tent Luxury Wedding Decoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patel Tent & Event Management | Luxury Wedding",
    description: "Premium wedding decoration, luxury tent setups, and event management in Udaipur.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.pateltent.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Preconnect to Cloudinary CDN — reduces DNS/TCP/TLS time for all images & videos */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Preconnect to Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased bg-brand-bg text-brand-primary overflow-x-hidden w-full relative"
        suppressHydrationWarning
      >
        <SmoothScrolling>
          {children}
          <JsonLd />
          <Analytics />
          <CookieConsent />
          <ConfettiOverlay />
        </SmoothScrolling>
      </body>
    </html>
  );
}
