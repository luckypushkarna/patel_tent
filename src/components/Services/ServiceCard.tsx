"use client";

import { memo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import type { Service } from "./servicesData";

// Dynamically load the Lottie engine — no SSR, loaded once globally
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCardComponent({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // dotLottie instance ref — lets us play/pause without unmounting the canvas
  const lottieRef = useRef<DotLottie | null>(null);
  const Icon = service.icon;

  const isFeatured = service.span === "featured";
  const isWide = service.span === "wide";

  // ── Intersection: play when visible, pause when not ────────────────────────
  // NEVER unmount the Lottie component — destroying/recreating the WASM canvas
  // is the most expensive operation possible. We just pause/play instead.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const anim = lottieRef.current;
        if (!anim) return;
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      },
      { rootMargin: "150px 0px", threshold: 0 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative flex flex-col
        overflow-hidden
        rounded-[20px]
        bg-white
        border border-[#032B53]/8
        cursor-pointer
        ${isFeatured ? "lg:col-span-2" : ""}
        ${isWide ? "lg:col-span-2" : ""}
      `}
      // contain:layout prevents this card's layout from affecting siblings on every repaint
      // will-change is NOT set here — it was creating 6 permanent GPU layers. Only promoted on hover via overlay.
      style={{ contain: "layout" }}
    >
      {/* ── Background Lottie — always mounted, play/pause via ref ───────── */}
      {/* devicePixelRatio=1 caps the canvas at logical size (≈300×200px equivalent)
          instead of the default 1123×688px Retina canvas seen in the profiler.
          autoResize=false removes per-frame getBoundingClientRect calls. */}
      <div
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
        aria-hidden="true"
      >
        <DotLottieReact
          src={service.lottie}
          loop
          autoplay={false}
          dotLottieRefCallback={(ref) => { lottieRef.current = ref; }}
          renderConfig={{
            autoResize: false,
            freezeOnOffscreen: true,
            devicePixelRatio: 1,
          }}
          className={`w-full h-full ${service.lottieClassName || ""}`}
          style={{
            width: "100%",
            height: "100%",
            transform: "scale(1.15)",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Giant watermark number */}
      <span
        aria-hidden="true"
        className="
          absolute -bottom-2 -right-1 md:-bottom-4 md:-right-2
          text-[60px] md:text-[100px] lg:text-[120px]
          font-bold leading-none text-[#032B53]/5
          select-none pointer-events-none z-0
        "
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {service.number}
      </span>

      {/* ── Card Content ── */}
      <div
        className={`
          relative z-10 flex flex-col h-full
          p-5 sm:p-6 md:p-8 lg:p-10
          ${isFeatured ? "min-h-[200px] md:min-h-[280px]" : "min-h-[160px] md:min-h-[220px]"}
        `}
      >
        {/* Top row */}
        <div className="flex flex-col gap-1.5 md:gap-2 mb-3 md:mb-6">
          <span
            className="block h-px bg-brand-accent"
            aria-hidden="true"
            style={{ width: "2rem" }}
          />
          <div className="flex items-center gap-2 md:gap-3">
            <span
              className="text-[15px] md:text-[18px] font-bold leading-none text-[#032B53]/60"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {service.number}
            </span>
            <span className="h-px w-3 md:w-4 bg-[#032B53]/20" aria-hidden="true" />
            <span
              className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#032B53]/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Service
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="mb-3 md:mb-5 text-[#032B53] origin-left">
          <Icon className={isFeatured ? "w-8 h-8 md:w-12 md:h-12" : "w-7 h-7 md:w-10 md:h-10"} />
        </div>

        {/* Title */}
        <h3
          className={`
            text-[#032B53] font-bold leading-[1.15] tracking-[-0.03em]
            mb-2 md:mb-3
            ${isFeatured
              ? "text-[26px] md:text-[32px] lg:text-[36px] max-w-[460px]"
              : "text-[20px] md:text-[24px] lg:text-[26px] max-w-[320px]"
            }
          `}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#032B53]/85 font-sans text-[14px] font-medium leading-[1.7] max-w-[420px] mb-4 md:mb-5 line-clamp-2 md:line-clamp-none">
          {service.description}
        </p>

        {/* Bottom CTA */}
        <div className="mt-auto flex items-center gap-2 text-[10px] md:text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#032B53]">
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-brand-accent pb-[2px]">
            View Theme Gallery
          </span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* ── Hover effect — pure compositor-only opacity on a single layer ─── */}
      {/* This is the cheapest possible hover: one opacity transition on an
          already-composited layer. No box-shadow on the card wrapper, no
          translate (which would promote 6 layers at once). */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100"
        style={{
          transition: "opacity 300ms ease",
          boxShadow: "inset 0 0 0 1px rgba(201,168,106,0.35), 0 16px 36px rgba(3,43,83,0.07)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export const ServiceCard = memo(ServiceCardComponent);


