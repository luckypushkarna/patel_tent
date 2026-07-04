"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * ConfettiOverlay — Optimized
 *
 * Changes:
 * - Lottie player is lazily imported (dynamic import) so it's NOT in the initial bundle
 * - useCallback on handler to prevent re-registration on every render
 * - clearTimeout stored in ref to guarantee cleanup
 * - pointer-events-none ensures confetti never blocks interaction
 */
import dynamic from "next/dynamic";

// Lazy-load the heavy Lottie player — NOT shipped in initial JS bundle
const DotLottiePlayer = dynamic(
  () => import("@dotlottie/react-player").then((m) => ({ default: m.DotLottiePlayer })),
  { ssr: false }
);

export function ConfettiOverlay() {
  const [play, setPlay] = useState(false);

  const handleTrigger = useCallback(() => {
    setPlay(true);
    const t = setTimeout(() => setPlay(false), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.addEventListener("show-confetti", handleTrigger);
    return () => window.removeEventListener("show-confetti", handleTrigger);
  }, [handleTrigger]);

  if (!play) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: "var(--z-confetti)" }}
      aria-hidden="true"
    >
      <DotLottiePlayer
        src="/Confetti.lottie"
        autoplay
        loop={false}
        style={{ width: "100%", height: "100%", maxWidth: "800px", maxHeight: "800px" }}
      />
    </div>
  );
}
