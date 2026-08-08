"use client";

import Image from "next/image";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./servicesData";

export function Services() {
  return (
    <section
      id="services"
      aria-label="Our Services & Expertise"
      className="relative w-full bg-[#F3EBE1] py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Top Left Frame Ornament */}
      <div className="absolute top-0 left-0 w-[240px] h-[240px] md:w-[450px] md:h-[450px] pointer-events-none opacity-30 z-0">
        <Image src="/frame-ornament.png" alt="" fill sizes="(max-width: 768px) 240px, 450px" className="object-contain object-left-top select-none" aria-hidden="true" />
      </div>
      {/* Top Right Frame Ornament */}
      <div className="absolute top-0 right-0 w-[240px] h-[240px] md:w-[450px] md:h-[450px] pointer-events-none opacity-30 z-0 scale-x-[-1]">
        <Image src="/frame-ornament.png" alt="" fill sizes="(max-width: 768px) 240px, 450px" className="object-contain object-left-top select-none" aria-hidden="true" />
      </div>
      {/* Bottom Left Frame Ornament */}
      <div className="absolute bottom-0 left-0 w-[240px] h-[240px] md:w-[450px] md:h-[450px] pointer-events-none opacity-30 z-0 scale-y-[-1]">
        <Image src="/frame-ornament.png" alt="" fill sizes="(max-width: 768px) 240px, 450px" className="object-contain object-left-top select-none" aria-hidden="true" />
      </div>
      {/* Bottom Right Frame Ornament */}
      <div className="absolute bottom-0 right-0 w-[240px] h-[240px] md:w-[450px] md:h-[450px] pointer-events-none opacity-30 z-0 rotate-180">
        <Image src="/frame-ornament.png" alt="" fill sizes="(max-width: 768px) 240px, 450px" className="object-contain object-left-top select-none" aria-hidden="true" />
      </div>

      {/* Decorative vertical line */}
      <div aria-hidden="true" className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-[#B8945A]/25" />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-brand-accent/50" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary/60">
              Our Expertise
            </span>
            <span className="h-px w-8 bg-brand-accent/50" />
          </span>

          <h2
            className="text-brand-primary text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.1] tracking-[-0.03em] mb-4 max-w-[700px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Every craft, refined into
            <span className="italic font-light"> a single celebration</span>
          </h2>

          <p className="text-brand-muted font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.01em] max-w-[520px]">
            From the first sketch to the final flourish, our services are handled entirely in-house — so every element of your day carries the same unmistakable signature.
          </p>
        </div>

        {/* ── 3×2 uniform grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

