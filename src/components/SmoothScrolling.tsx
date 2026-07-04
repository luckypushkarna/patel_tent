"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
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
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // While determining device type or on mobile, use native scroll to guarantee 60fps compositor thread
  if (isTouch === null || isTouch === true) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, smoothTouch: false }}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
