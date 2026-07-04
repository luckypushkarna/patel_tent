"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GsapLenisSync() {
  useLenis(ScrollTrigger.update);
  
  useEffect(() => {
    // Disable GSAP's lag smoothing as Lenis handles the smoothing
    gsap.ticker.lagSmoothing(0);
  }, []);
  
  return null;
}

export function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
