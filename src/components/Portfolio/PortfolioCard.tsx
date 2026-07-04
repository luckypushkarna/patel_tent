"use client";

import { memo, useEffect, useRef } from "react";
import type { PortfolioItem } from "./portfolioData";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

function PortfolioCardComponent({ item, onClick }: PortfolioCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // GSAP scroll zoom removed to make it stock; only CSS hover zoom remains.

  return (
    <article
      ref={cardRef}
      data-card
      onClick={onClick}
      className={`
        group relative
        overflow-hidden rounded-xl
        bg-neutral-200
        cursor-pointer
      `}
      style={{ aspectRatio: "4/5" }}
    >
      {/* Image Wrapper */}
      <div ref={imgRef} className="absolute inset-0 w-full h-full">
        <CloudinaryImage
          publicId={item.image}
          alt={`${item.title} — ${item.location}`}
          width={800}
          height={1000}
          className="
            absolute inset-0 w-full h-full object-cover
            md:transition-transform md:duration-[900ms] md:ease-[cubic-bezier(0.22,1,0.36,1)]
            md:group-hover:scale-[1.05]
          "
        />
      </div>

      {/* Base subtle overlay — always visible */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          md:transition-opacity md:duration-[500ms]
          bg-black/[0.05]
          md:group-hover:bg-black/[0.18]
        "
      />

      {/* Bottom gradient — fades in on hover */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 h-[45%]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-[500ms] ease-out
        "
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Caption — slides up on hover */}
      <div
        className="
          absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6
          transform translate-y-3 opacity-0
          transition-all duration-[500ms] ease-out
          group-hover:translate-y-0 group-hover:opacity-100
        "
      >
        <h3 className="text-white text-[12px] md:text-[16px] font-medium leading-snug">
          {item.title}
        </h3>
        <p className="mt-0.5 md:mt-1 text-[10px] md:text-[13px] text-white/75 font-normal">
          {item.location}
        </p>
      </div>
    </article>
  );
}

export const PortfolioCard = memo(PortfolioCardComponent);
