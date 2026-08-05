"use client";

import { useRef } from "react";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./servicesData";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = SERVICES.filter((s) => s.span === "featured");
  const rest = SERVICES.filter((s) => s.span !== "featured");

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services & Expertise"
      className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #FCFBF9 0%, #F7F4EE 100%)",
        contentVisibility: "auto",
        containIntrinsicSize: "0 1200px",
      }}
    >
      {/* ── Corner ornaments (reduced opacity for light bg) ── */}
      {[
        "top-0 left-0",
        "top-0 right-0 scale-x-[-1]",
        "bottom-0 left-0 scale-y-[-1]",
        "bottom-0 right-0 rotate-180",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-[200px] h-[200px] md:w-[380px] md:h-[380px] pointer-events-none opacity-20 z-0`}
          aria-hidden="true"
        >
          <img
            src="/frame-ornament.png"
            alt=""
            className="w-full h-full object-contain object-top-left select-none"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-14"
        style={{ background: "linear-gradient(180deg, transparent, rgba(184,148,90,0.35))" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          {/* Eyebrow */}
          <span className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: "rgba(184,148,90,0.50)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "#9B8872", fontFamily: "'Inter', sans-serif" }}
            >
              Our Expertise
            </span>
            <span className="h-px w-8" style={{ background: "rgba(184,148,90,0.50)" }} />
          </span>

          <h2
            className="text-[28px] md:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-[-0.03em] mb-5 max-w-[680px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1C1814",
            }}
          >
            Every craft, refined into
            <span className="italic font-light"> a single celebration</span>
          </h2>

          <p
            className="text-[15px] font-normal leading-[1.75] max-w-[500px]"
            style={{
              color: "#7A6A58",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            From the first sketch to the final flourish, our services are handled entirely
            in-house — so every element of your day carries the same unmistakable signature.
          </p>
        </div>

        {/* ── Featured Card ── */}
        {featured.length > 0 && (
          <div className="mb-4 md:mb-5">
            <ServiceCard service={featured[0]} index={0} />
          </div>
        )}

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {rest.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
