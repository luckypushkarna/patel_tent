"use client";

import { memo, useEffect, useRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { MediaInfoButton } from "@/components/MediaInfoButton";

interface HeroBackgroundProps {
  overlayOpacity?: MotionValue<number>;
}

function HeroBackgroundComponent({ overlayOpacity }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="hero-bg-video absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center"
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.01)' }}
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/13430873_1920_1080_60fps.mp4" type="video/mp4" />
      </video>

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
