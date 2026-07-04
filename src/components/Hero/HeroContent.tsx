"use client";

import { memo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { ArrowRight } from "lucide-react";

function HeroContentComponent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);

  /* ─── Scroll progress tied to the hero section ─────────────────────── */
  const { scrollY } = useScroll();

  // Detect first scroll to hide the scroll indicator
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 20) setHasScrolled(true);
  });

  // Responsive translation amounts
  const getY = (desktop: number, tablet: number, mobile: number) => {
    if (typeof window === "undefined") return desktop;
    const w = window.innerWidth;
    if (w < 640) return mobile;
    if (w < 1024) return tablet;
    return desktop;
  };

  /* ─── Per-element transforms ────────────────────────────────────────── */
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  // Heading: fade 0→35% of 100dvh
  const headingOpacity = useTransform(scrollY, [0, vh * 0.30], [1, 0]);
  const headingY = useTransform(scrollY, [0, vh * 0.35], [0, -(getY(60, 40, 28))]);
  const headingScale = useTransform(scrollY, [0, vh * 0.35], [1, 0.97]);

  // Sub: slightly faster fade, less movement
  const subOpacity = useTransform(scrollY, [0, vh * 0.25], [1, 0]);
  const subY = useTransform(scrollY, [0, vh * 0.30], [0, -(getY(45, 32, 22))]);

  // CTAs
  const ctaOpacity = useTransform(scrollY, [0, vh * 0.22], [1, 0]);
  const ctaY = useTransform(scrollY, [0, vh * 0.28], [0, -(getY(30, 22, 16))]);
  const ctaScale = useTransform(scrollY, [0, vh * 0.28], [1, 0.98]);

  // Trust line: fades first, barely moves
  const trustOpacity = useTransform(scrollY, [0, vh * 0.18], [1, 0]);
  const trustY = useTransform(scrollY, [0, vh * 0.20], [0, -(getY(12, 9, 6))]);

  // Gallery preview
  const previewOpacity = useTransform(scrollY, [0, vh * 0.20], [1, 0]);
  const previewY = useTransform(scrollY, [0, vh * 0.25], [0, -(getY(20, 14, 10))]);

  // Smooth springs — eliminate jitter during scroll
  const sHeadingY = useSpring(headingY, { stiffness: 80, damping: 25, mass: 0.5 });
  const sSubY = useSpring(subY, { stiffness: 80, damping: 25, mass: 0.5 });
  const sCtaY = useSpring(ctaY, { stiffness: 80, damping: 25, mass: 0.5 });
  const sTrustY = useSpring(trustY, { stiffness: 80, damping: 25, mass: 0.5 });
  const sPreviewY = useSpring(previewY, { stiffness: 80, damping: 25, mass: 0.5 });

  /* ─── Click handlers ────────────────────────────────────────────────── */
  const handleScrollToGallery = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── Entrance animation variants ──────────────────────────────────── */
  const entrance = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    show: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom,
        duration: 0.9,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    }),
  };

  /* When reduced-motion is on, skip transforms — only fade */
  const reducedStyle = { opacity: 1, y: 0, scale: 1 };

  return (
    <div
      ref={heroRef}
      className="
        relative z-10
        flex flex-col items-center text-center
        px-6 sm:px-10
        max-w-[900px] mx-auto
      "
      style={{ transform: "translateY(-5vh)" }}
    >
      {/* ── Heading ─────────────────────────────────────────────────── */}
      <motion.h1
        variants={entrance}
        initial="hidden"
        animate="show"
        custom={0.1}
        style={
          prefersReduced
            ? { ...reducedStyle, fontFamily: "'Cormorant Garamond', serif" }
            : { opacity: headingOpacity, y: sHeadingY, scale: headingScale, fontFamily: "'Cormorant Garamond', serif" }
        }
        className="
          font-semibold text-brand-light will-change-transform
          text-[32px] min-[400px]:text-[38px] sm:text-[44px] md:text-[56px] lg:text-[72px]
          leading-[1.05] md:leading-[0.95]
          tracking-[-1px] md:tracking-[-2px]
        "
      >
        <span className="block whitespace-nowrap">Beautiful Weddings</span>
        <span className="block whitespace-nowrap">
          Thoughtfully <em className="italic text-brand-accent">Designed</em>
        </span>
      </motion.h1>

      {/* ── Subtitle ─────────────────────────────────────────────────── */}
      <motion.p
        variants={entrance}
        initial="hidden"
        animate="show"
        custom={0.28}
        style={
          prefersReduced
            ? { ...reducedStyle, fontFamily: "'Inter', sans-serif" }
            : { opacity: subOpacity, y: sSubY, fontFamily: "'Inter', sans-serif" }
        }
        className="
          mt-6 sm:mt-8 will-change-transform
          max-w-[600px]
          text-[16px] sm:text-[18px]
          font-normal leading-[1.6]
          text-brand-light/85
        "
      >
        Patel Tent &amp; Event Management creates elegant wedding décor, premium
        tent setups, floral arrangements, and memorable celebrations across
        Udaipur and Rajasthan.
      </motion.p>

      {/* ── CTAs ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={entrance}
        initial="hidden"
        animate="show"
        custom={0.44}
        style={
          prefersReduced
            ? reducedStyle
            : { opacity: ctaOpacity, y: sCtaY, scale: ctaScale }
        }
        className="mt-8 sm:mt-12 flex flex-col items-center w-full will-change-transform"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[320px] sm:max-w-none">
          {/* Primary */}
          <button
            onClick={handleScrollToGallery}
            className="
              group flex items-center justify-center gap-2
              w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full
              bg-[#F5F2EB] text-[#0B3558]
              text-[14px] sm:text-[15px] font-semibold tracking-wide
              md:transition-all md:duration-300 md:ease-out
              md:hover:-translate-y-[2px] md:hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)]
            "
          >
            See Our Work
            <ArrowRight className="w-4 h-4 md:transition-transform md:duration-300 md:group-hover:translate-x-1" />
          </button>

          {/* Secondary */}
          <button
            onClick={handleScrollToContact}
            className="
              w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full
              bg-transparent text-[#F5F2EB]
              border border-[#F5F2EB]/30
              text-[14px] sm:text-[15px] font-semibold tracking-wide
              md:transition-all md:duration-300 md:ease-out
              md:hover:border-[#F5F2EB]/80 md:hover:bg-white/5
            "
          >
            Book Your Event
          </button>
        </div>

        {/* Trust line */}
        <motion.p
          style={
            prefersReduced
              ? reducedStyle
              : { opacity: trustOpacity, y: sTrustY }
          }
          className="mt-6 text-[12px] sm:text-[13px] text-brand-light/60 tracking-wide text-center will-change-transform"
        >
          Wedding &bull; Reception &bull; Haldi &bull; Mehendi &bull; Corporate
        </motion.p>
      </motion.div>

      {/* ── Gallery Preview ──────────────────────────────────────────── */}
      <motion.div
        variants={entrance}
        initial="hidden"
        animate="show"
        custom={0.58}
        style={
          prefersReduced
            ? reducedStyle
            : { opacity: previewOpacity, y: sPreviewY }
        }
        onClick={handleScrollToGallery}
        className="
          mt-8 md:mt-12 will-change-transform
          flex flex-row items-center justify-center gap-3 sm:gap-4
          cursor-pointer group
          px-4 py-2 rounded-2xl
          md:transition-colors md:duration-300 md:hover:bg-white/5
        "
      >
        <div className="flex items-center -space-x-3">
          {["event/gallery/1", "event/gallery/2", "event/gallery/3"].map(
            (id, i) => (
              <div
                key={id}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#1D2A39] shadow-sm md:shadow-lg"
                style={{ zIndex: 30 - i * 10, position: "relative" }}
              >
                <CloudinaryImage
                  publicId={id}
                  alt="Event gallery preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            )
          )}
        </div>
        <span className="text-[13px] sm:text-[14px] font-medium text-brand-light/90 md:group-hover:text-[#C9A86A] md:transition-colors md:duration-300">
          150+ Event Photos &rarr;
        </span>
      </motion.div>

      {/* ── Scroll Indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: hasScrolled ? 0 : 1, y: hasScrolled ? -4 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: hasScrolled ? 0 : 2.0 }}
        className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#F6F1E8]/50">
          Scroll
        </span>
        <div className="relative h-10 w-px bg-[#F6F1E8]/15 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#D4B37F]"
            style={{ height: "50%" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 2.2,
              ease: [0.65, 0, 0.35, 1],
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export const HeroContent = memo(HeroContentComponent);
