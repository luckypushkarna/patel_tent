"use client";

import { memo } from "react";
import { motion, MotionValue } from "framer-motion";
import { MediaInfoButton } from "@/components/MediaInfoButton";
import { CloudinaryVideo } from "@/components/CloudinaryVideo";

interface HeroBackgroundProps {
  overlayOpacity?: MotionValue<number>;
}

function HeroBackgroundComponent({ overlayOpacity }: HeroBackgroundProps) {
  return (
    <div className="hero-bg-video absolute inset-0 overflow-hidden">
      <CloudinaryVideo
        publicId="event/wdxtdh8ihv"
        className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center"
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.01)' }}
        preload="auto"
        width={1920}
      />

      {/* ⓘ Media rights notice */}
      <MediaInfoButton corner="bottom-right" />

      {/* ── Scroll-driven cinematic overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={
          overlayOpacity
            ? { backgroundColor: `rgba(10, 28, 38, 1)`, opacity: overlayOpacity }
            : { background: "rgba(10, 28, 38, 0.38)" }
        }
      />

      {/* Radial vignette — draws eye to center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10, 28, 38, 0.55) 100%)",
        }}
      />
    </div>
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);
