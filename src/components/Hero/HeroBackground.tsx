"use client";

import { memo } from "react";
import { motion, MotionValue } from "framer-motion";
import { CloudinaryVideo } from "@/components/CloudinaryVideo";

interface HeroBackgroundProps {
  overlayOpacity?: MotionValue<number>;
}

function HeroBackgroundComponent({ overlayOpacity }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CloudinaryVideo
        publicId="event/wdxtdh8ihv"
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
      />

      {/* ── Scroll-driven cinematic overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={
          overlayOpacity
            ? { backgroundColor: `#16140C`, opacity: overlayOpacity }
            : { background: "rgba(22,20,12,0.48)" }
        }
      />

      {/* Radial vignette — draws eye to center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(20,16,12,0.55) 100%)",
        }}
      />

      {/* Soft grain texture — filmic, not digital */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);
