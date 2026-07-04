"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { About } from "../About";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  /* ── Overlay darkens as user scrolls ─────────────────────────────────
     Start: rgba(22,20,18, 0.48) → End: rgba(22,20,18, 0.65)            */
  const overlayOpacity = useTransform(scrollY, [0, vh * 0.40], [0.48, 0.65]);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Patel Tent — Luxury Wedding & Event Management"
      className="relative w-full bg-[#14100C]"
    >
      {/* ── STICKY BACKDROP ────────────────────────────────────────────── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden z-0">

        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <HeroBackground overlayOpacity={overlayOpacity} />
        </div>

        {/* Hero text content — individual element fades handled inside HeroContent */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* ── OVERLAY REVEAL (Second Fold) ───────────────────────────────── */}
      <div className="relative z-20 w-full bg-[#F3EBE1] min-h-screen mt-[50vh]">
        <About />
      </div>
    </section>
  );
}
