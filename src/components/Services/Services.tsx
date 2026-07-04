"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./servicesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Separate featured (first), wide, and normal services
  const featured = SERVICES.filter((s) => s.span === "featured");
  const rest = SERVICES.filter((s) => s.span !== "featured");

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services & Expertise"
      className="relative w-full bg-brand-bg py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Top Left Frame Ornament */}
      <div 
        className="absolute top-0 left-0 w-[320px] h-[320px] md:w-[600px] md:h-[600px] pointer-events-none opacity-90 z-0"
        style={{
          maskImage: 'url(/frame-ornament.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top left',
          backgroundColor: '#E6D8C3', // Subtle beige watermark color
          WebkitMaskImage: 'url(/frame-ornament.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top left',
        }}
      />

      {/* Top Right Frame Ornament (Flipped horizontally) */}
      <div 
        className="absolute top-0 right-0 w-[320px] h-[320px] md:w-[600px] md:h-[600px] pointer-events-none opacity-90 z-0 scale-x-[-1]"
        style={{
          maskImage: 'url(/frame-ornament.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top left', // Keep top left because we are flipping the whole div
          backgroundColor: '#E6D8C3',
          WebkitMaskImage: 'url(/frame-ornament.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top left',
        }}
      />

      {/* Bottom Left Frame Ornament (Flipped vertically) */}
      <div 
        className="absolute bottom-0 left-0 w-[320px] h-[320px] md:w-[600px] md:h-[600px] pointer-events-none opacity-90 z-0 scale-y-[-1]"
        style={{
          maskImage: 'url(/frame-ornament.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top left',
          backgroundColor: '#E6D8C3',
          WebkitMaskImage: 'url(/frame-ornament.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top left',
        }}
      />

      {/* Bottom Right Frame Ornament (Flipped both horizontally & vertically -> rotate-180) */}
      <div 
        className="absolute bottom-0 right-0 w-[320px] h-[320px] md:w-[600px] md:h-[600px] pointer-events-none opacity-90 z-0 rotate-180"
        style={{
          maskImage: 'url(/frame-ornament.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'top left',
          backgroundColor: '#E6D8C3',
          WebkitMaskImage: 'url(/frame-ornament.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top left',
        }}
      />

      {/* Faint decorative vertical line */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-[#B8945A]/25"
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <span className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-brand-accent/50" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary/60">
              Our Expertise
            </span>
            <span className="h-px w-8 bg-brand-accent/50" />
          </span>

          <h2
            className="
              text-brand-primary
              text-[28px] md:text-[36px] lg:text-[42px]
              font-bold
              leading-[1.1]
              tracking-[-0.03em]
              mb-4
              max-w-[700px]
            "
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Every craft, refined into
            <span className="italic font-light"> a single celebration</span>
          </h2>

          <p
            className="
              text-brand-muted
              font-sans
              text-[15px]
              font-normal
              leading-[1.7]
              tracking-[-0.01em]
              max-w-[520px]
            "
          >
            From the first sketch to the final flourish, our services are handled entirely in-house — so every element of your day carries the same unmistakable signature.
          </p>
        </div>

        {/* ── Featured Card (full-width hero) ── */}
        {featured.length > 0 && (
          <div className="mb-4 md:mb-6">
            <ServiceCard service={featured[0]} index={0} />
          </div>
        )}

        {/* ── Remaining services grid ── */}
        <div
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 md:gap-5 lg:gap-6
          "
        >
          {rest.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
