"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";

function ScrollIndicatorComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Fade in after main content
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.8,
          ease: "power2.out",
        }
      );

      // Fade out as user scrolls
      gsap.to(ref.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        absolute bottom-10 left-1/2 -translate-x-1/2
        z-10
        flex flex-col items-center gap-3
        opacity-0
      `}
      aria-hidden="true"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#F6F1E8]/60">
        Scroll
      </span>
      <div className="relative h-12 w-px bg-[#F6F1E8]/15 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-[#D4B37F]"
          style={{
            animation: "scrollLine 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </div>
  );
}

export const ScrollIndicator = memo(ScrollIndicatorComponent);
