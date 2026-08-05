"use client";

import { memo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import type { Service } from "./servicesData";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

interface ServiceCardProps {
  service: Service;
  index: number;
}

// ── Injected CSS — compositor-only animations, no layout/paint ───────────────
const CARD_CSS = `
  .sc-card {
    transition:
      transform 300ms cubic-bezier(0.25, 0, 0, 1),
      box-shadow 300ms cubic-bezier(0.25, 0, 0, 1),
      border-color 300ms cubic-bezier(0.25, 0, 0, 1);
  }
  .sc-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 2px 4px rgba(28, 24, 20, 0.04),
      0 12px 32px rgba(28, 24, 20, 0.09),
      0 24px 48px rgba(28, 24, 20, 0.05);
    border-color: rgba(201, 168, 106, 0.28) !important;
  }

  /* Illustration scales softly on hover */
  .sc-card:hover .sc-lottie-wrap {
    transform: scale(1.04);
  }
  .sc-lottie-wrap {
    transition: transform 400ms cubic-bezier(0.25, 0, 0, 1);
    transform-origin: center center;
  }

  /* CTA arrow slides on hover */
  .sc-card:hover .sc-cta-arrow {
    transform: translateX(4px);
  }
  .sc-cta-arrow {
    transition: transform 280ms cubic-bezier(0.25, 0, 0, 1);
  }

  /* Underline grows from left on hover */
  .sc-cta-text::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 0%;
    background: rgba(201, 168, 106, 0.85);
    transition: width 280ms cubic-bezier(0.25, 0, 0, 1);
  }
  .sc-card:hover .sc-cta-text::after {
    width: 100%;
  }

  /* Hover glow overlay fades in */
  .sc-hover-overlay {
    transition: opacity 300ms cubic-bezier(0.25, 0, 0, 1);
  }
`;

function ServiceCardComponent({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<DotLottie | null>(null);
  // Inject CSS once
  const cssInjected = useRef(false);

  const isFeatured = service.span === "featured";
  const isWide = service.span === "wide";

  // ── Inject CSS on first mount ──────────────────────────────────────────────
  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const style = document.createElement("style");
    style.textContent = CARD_CSS;
    document.head.appendChild(style);
    return () => { style.remove(); cssInjected.current = false; };
  }, []);

  // ── Play/pause Lottie based on visibility ─────────────────────────────────
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const anim = lottieRef.current;
        if (!anim) return;
        entry.isIntersecting ? anim.play() : anim.pause();
      },
      { rootMargin: "150px 0px", threshold: 0 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // ── Illustration size by card type ────────────────────────────────────────
  const lottieZoneWidth = isFeatured ? "42%" : isWide ? "40%" : "45%";

  return (
    <div
      ref={cardRef}
      className={`
        sc-card group relative flex flex-col
        overflow-hidden rounded-[28px] bg-white cursor-pointer
        ${isFeatured ? "lg:col-span-2" : ""}
        ${isWide ? "lg:col-span-2" : ""}
      `}
      style={{
        border: "1px solid #E8E0D4",
        // Default (no-hover) shadow — very subtle, feels elevated not floating
        boxShadow:
          "0 1px 3px rgba(28,24,20,0.04), 0 4px 12px rgba(28,24,20,0.05)",
        contain: "layout",
      }}
    >
      {/* ── Subtle noise texture overlay (5% opacity) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none rounded-[28px]"
        aria-hidden="true"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Illustration zone — right column (hidden on mobile, moved below on sm) ── */}
      <div
        className="absolute top-0 right-0 bottom-0 pointer-events-none hidden sm:block z-[2]"
        aria-hidden="true"
        style={{ width: lottieZoneWidth }}
      >
        {/* Soft radial gradient fade — left edge of illustration zone blends into card */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at left center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 65%)",
            zIndex: 1,
          }}
        />
        {/* Warm ambient glow behind illustration */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,235,210,0.50) 0%, transparent 65%)",
            zIndex: 0,
          }}
        />
        <div className="sc-lottie-wrap absolute inset-0 z-0">
          <DotLottieReact
            src={service.lottie}
            loop
            autoplay={false}
            dotLottieRefCallback={(ref) => { lottieRef.current = ref; }}
            renderConfig={{
              autoResize: false,
              freezeOnOffscreen: true,
              devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1,
            }}
            className="w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* ── Card content — left column ── */}
      <div
        className={`
          relative z-10 flex flex-col h-full
          ${isFeatured
            ? "p-7 sm:p-9 md:p-10 lg:p-12 min-h-[220px] md:min-h-[300px]"
            : "p-6 sm:p-7 md:p-8 min-h-[180px] md:min-h-[240px]"
          }
        `}
        style={{
          // Content area only occupies the left portion on desktop
          maxWidth: `calc(100% - ${lottieZoneWidth})`,
        }}
      >
        {/* ── Service number + accent line ── */}
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <span
            className="text-[11px] font-medium tabular-nums leading-none"
            style={{
              color: "#C9A86A",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            {service.number}
          </span>
          <span
            className="block h-px flex-1 max-w-[32px]"
            style={{ background: "rgba(201,168,106,0.45)" }}
            aria-hidden="true"
          />
        </div>

        {/* ── Icon ── */}
        <div className="mb-4 md:mb-5" style={{ color: "#8A6E3E" }}>
          <service.icon
            className={isFeatured ? "w-7 h-7 md:w-9 md:h-9" : "w-6 h-6 md:w-8 md:h-8"}
          />
        </div>

        {/* ── Title ── */}
        <h3
          className={`
            font-bold leading-[1.15] tracking-[-0.025em] mb-3 md:mb-4
            ${isFeatured
              ? "text-[24px] md:text-[30px] lg:text-[34px] max-w-[400px]"
              : "text-[19px] md:text-[22px] lg:text-[24px] max-w-[280px]"
            }
          `}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#1C1814",
          }}
        >
          {service.title}
        </h3>

        {/* ── Description ── */}
        <p
          className={`
            leading-[1.75] mb-5 md:mb-6
            ${isFeatured ? "text-[15px] md:text-[16px] max-w-[380px]" : "text-[14px] md:text-[15px] max-w-[280px]"}
          `}
          style={{
            color: "#7A6A58",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {service.description}
        </p>

        {/* ── CTA ── */}
        <div className="mt-auto flex items-center gap-2">
          <span
            className="sc-cta-text relative text-[11px] font-medium uppercase pb-[2px]"
            style={{
              color: "#8A6E3E",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.14em",
            }}
          >
            Explore
          </span>
          <svg
            className="sc-cta-arrow w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A86A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* ── Mobile illustration — below text (sm and down) ── */}
      <div
        className="relative block sm:hidden w-full overflow-hidden pointer-events-none"
        style={{ height: 160 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%)",
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at top right, rgba(255,235,210,0.4) 0%, transparent 65%)",
          }}
        />
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
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.80,
          }}
        />
      </div>

      {/* ── Subtle giant watermark number (background) ── */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-2 md:-bottom-6 md:-right-3 leading-none select-none pointer-events-none z-0"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isFeatured ? "clamp(80px, 14vw, 140px)" : "clamp(60px, 10vw, 110px)",
          fontWeight: 700,
          color: "rgba(28,24,20,0.035)",
        }}
      >
        {service.number}
      </span>

      {/* ── Hover glow overlay (compositor-only, zero layout cost) ── */}
      <div
        className="sc-hover-overlay absolute inset-0 z-[3] pointer-events-none rounded-[28px] opacity-0 group-hover:opacity-100"
        aria-hidden="true"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(201,168,106,0.22)",
        }}
      />
    </div>
  );
}

export const ServiceCard = memo(ServiceCardComponent);
