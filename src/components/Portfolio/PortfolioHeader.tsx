"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function PortfolioHeaderComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-start mb-14 md:mb-20"
    >
      {/* Small label */}
      <span
        className="
          opacity-0
          flex items-center gap-3 mb-6
        "
      >
        <span className="h-px w-8 bg-brand-primary/40" />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-primary/70">
          Gallery
        </span>
      </span>

      {/* Main heading */}
      <h2
        className="
          opacity-0
          text-brand-primary
          text-[36px] md:text-[52px] lg:text-[64px]
          font-bold
          leading-[1.02]
          tracking-[-0.03em]
          max-w-[720px]
        "
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Crafted Celebrations,
        <br />
        <span className="italic font-light">quietly extraordinary.</span>
      </h2>

      {/* Description */}
      <p
        className="
          opacity-0
          mt-8
          max-w-[520px]
          text-[15px] leading-[1.7]
          text-brand-muted
        "
      >
        A curated journal of weddings and celebrations we&apos;ve shaped across
        India — each frame a reflection of the trust our families place in
        our craft.
      </p>
    </div>
  );
}

export const PortfolioHeader = memo(PortfolioHeaderComponent);
