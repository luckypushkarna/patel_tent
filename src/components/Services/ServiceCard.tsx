"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import type { Service } from "./servicesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCardComponent({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const isFeatured = service.span === "featured";
  const isWide = service.span === "wide";

  useEffect(() => {
    if (!cardRef.current) return;

    const mm = gsap.matchMedia();
    
    // Card entrance — staggered fade up (desktop only)
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: (index % 3) * 0.12,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // Scroll-linked zoom out on image (both mobile and desktop)
    mm.add("all", () => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 95%",
              end: "center 40%",
              scrub: 0.8,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`
        group relative flex flex-col
        overflow-hidden
        rounded-[20px]
        bg-white/[0.06]
        border border-white/[0.12]
        shadow-sm
        md:transition-transform md:duration-300 md:ease-out
        md:hover:-translate-y-[6px]
        md:hover:shadow-lg
        cursor-pointer
        ${isFeatured ? "lg:col-span-2" : ""}
        ${isWide ? "lg:col-span-2" : ""}
      `}
    >
      {/* Background Image Wrapper — will-change scoped here only */}
      <div ref={imgRef} className="absolute inset-0 z-0 w-full h-full will-change-transform">
        <CloudinaryImage
          publicId={service.image}
          alt={service.title}
          width={800}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Editorial dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.65))"
        }}
      />

      {/* Giant watermark number — 3% opacity behind content */}
      <span
        aria-hidden="true"
        className="
          absolute -bottom-2 -right-1 md:-bottom-4 md:-right-2
          text-[60px] md:text-[100px] lg:text-[120px]
          font-bold leading-none
          text-white/[0.06]
          select-none pointer-events-none
          z-0
          transition-transform duration-[400ms] ease-out
          group-hover:translate-x-2 group-hover:translate-y-2
        "
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {service.number}
      </span>

      {/* ── Card Content ── */}
      <div className={`relative z-10 flex flex-col h-full p-5 sm:p-6 md:p-8 lg:p-10 ${isFeatured ? "min-h-[200px] md:min-h-[280px]" : "min-h-[160px] md:min-h-[220px]"}`}>

        {/* Top row — decorative line + number + service label */}
        <div className="flex flex-col gap-1.5 md:gap-2 mb-3 md:mb-6">
          <span
            className="block w-8 md:w-10 h-px bg-brand-accent transition-all duration-300 ease-out group-hover:w-16"
            aria-hidden="true"
          />
          <div className="flex items-center gap-2 md:gap-3">
            <span
              className="
                text-[15px] md:text-[18px] font-bold leading-none
                text-brand-accent
                transition-colors duration-300
              "
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {service.number}
            </span>
            <span className="h-px w-3 md:w-4 bg-white/40" aria-hidden="true" />
            <span 
              className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F5F2EB]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Service
            </span>
          </div>
        </div>

        {/* Icon */}
        <div
          className="
            mb-3 md:mb-5
            text-white
            md:transition-all md:duration-[400ms] md:ease-out
            md:group-hover:rotate-[-5deg] md:group-hover:scale-[1.08]
            origin-left
          "
        >
          <Icon className={isFeatured ? "w-8 h-8 md:w-12 md:h-12" : "w-7 h-7 md:w-10 md:h-10"} />
        </div>

        {/* Title — two-line editorial treatment */}
        <h3
          className={`
            text-[#F8F4EC]
            font-bold
            leading-[1.15]
            tracking-[-0.03em]
            mb-2 md:mb-3
            drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]
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
        <p
          className="
            text-[rgba(248,244,236,0.85)]
            font-sans
            text-[14px]
            font-medium
            leading-[1.7]
            max-w-[420px]
            mb-4 md:mb-5
            line-clamp-2 md:line-clamp-none
          "
        >
          {service.description}
        </p>

        {/* Bottom CTA link */}
        <div
          className="
            mt-auto
            flex items-center gap-2
            text-[10px] md:text-[11.5px] font-semibold uppercase tracking-[0.18em]
            text-white
            opacity-0 translate-y-3
            transition-all duration-[400ms] ease-out
            group-hover:opacity-100 group-hover:translate-y-0
          "
        >
          <span
            className="
              relative after:absolute after:bottom-0 after:left-0
              after:h-px after:w-0 after:bg-brand-accent
              after:transition-all after:duration-[350ms] after:ease-out
              group-hover:after:w-full
              pb-[2px]
            "
          >
            View Theme Gallery
          </span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-[350ms] group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const ServiceCard = memo(ServiceCardComponent);
