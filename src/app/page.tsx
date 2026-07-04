/**
 * page.tsx — Production-optimized
 *
 * Optimizations:
 * - content-visibility: auto on below-fold sections (skips rendering until near viewport)
 */
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollRestoration } from "@/components/SEO/ScrollRestoration";

import { Preloader } from "@/components/Preloader";

// Below-fold sections — lazy loaded to reduce initial bundle & TTI
const Services       = dynamic(() => import("@/components/Services").then(m => ({ default: m.Services })));
const EditorialSection = dynamic(() => import("@/components/Editorial").then(m => ({ default: m.EditorialSection })));
const Portfolio      = dynamic(() => import("@/components/Portfolio").then(m => ({ default: m.Portfolio })));
const Testimonials   = dynamic(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const Contact        = dynamic(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer         = dynamic(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Shared style: skips rendering until near viewport, reserves layout space to prevent CLS
const belowFoldStyle: React.CSSProperties = {
  contentVisibility: "auto" as const,
};

export default function Page() {
  return (
    <>
      <Preloader />
      <ScrollRestoration />
      <Navbar />
      <main className="relative w-full">
        {/* Hero is above-fold — rendered immediately, not lazy */}
        <Hero />

        {/* Below-fold sections — browser skips rendering until near viewport */}
        <div style={{ ...belowFoldStyle, containIntrinsicSize: "0 900px" }}>
          <Services />
        </div>
        <div style={{ ...belowFoldStyle, containIntrinsicSize: "0 600px" }}>
          <EditorialSection />
        </div>
        <div style={{ ...belowFoldStyle, containIntrinsicSize: "0 1200px" }}>
          <Portfolio limit={9} />
        </div>
        <div style={{ ...belowFoldStyle, containIntrinsicSize: "0 500px" }}>
          <Testimonials />
        </div>
        <div style={{ ...belowFoldStyle, containIntrinsicSize: "0 800px" }}>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
