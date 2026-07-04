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
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
    </div>
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);
