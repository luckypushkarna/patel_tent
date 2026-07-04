"use client";

import { memo, useMemo, useRef } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  scrollY: MotionValue<number>;
}

function HeroContentComponent({ scrollY }: HeroContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Memoize viewport height — read ONCE, not on every render.
  // Recalculated only if window resizes (handled via resize listener if needed).
  const vh = useMemo(
    () => (typeof window !== "undefined" ? window.innerHeight : 800),
    []
  );

  // Memoize translation amounts — read window.innerWidth ONCE at mount
  const yAmounts = useMemo(() => {
    if (typeof window === "undefined") return { heading: 60, sub: 45, cta: 30, trust: 12, preview: 20 };
    const w = window.innerWidth;
    const scale = w < 640 ? 0 : w < 1024 ? 0.67 : 1;
    return {
      heading: Math.round((60 - 32) * scale + 32),
      sub:     Math.round((45 - 22) * scale + 22),
      cta:     Math.round((30 - 16) * scale + 16),
      trust:   Math.round((12 - 6) * scale + 6),
      preview: Math.round((20 - 10) * scale + 10),
    };
  }, []);

  /* ─── Per-element transforms ────────────────────────────────────────── */
  const headingOpacity = useTransform(scrollY, [0, vh * 0.30], [1, 0]);
  const headingY       = useTransform(scrollY, [0, vh * 0.35], [0, -yAmounts.heading]);
  const headingScale   = useTransform(scrollY, [0, vh * 0.35], [1, 0.97]);

  const subOpacity = useTransform(scrollY, [0, vh * 0.25], [1, 0]);
  const subY       = useTransform(scrollY, [0, vh * 0.30], [0, -yAmounts.sub]);

  const ctaOpacity = useTransform(scrollY, [0, vh * 0.22], [1, 0]);
  const ctaY       = useTransform(scrollY, [0, vh * 0.28], [0, -yAmounts.cta]);
  const ctaScale   = useTransform(scrollY, [0, vh * 0.28], [1, 0.98]);

  const trustOpacity = useTransform(scrollY, [0, vh * 0.18], [1, 0]);
  const trustY       = useTransform(scrollY, [0, vh * 0.20], [0, -yAmounts.trust]);

  const previewOpacity = useTransform(scrollY, [0, vh * 0.20], [1, 0]);
  const previewY       = useTransform(scrollY, [0, vh * 0.25], [0, -yAmounts.preview]);

  const scrollIndicatorOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const scrollIndicatorY       = useTransform(scrollY, [0, 50], [0, -4]);

  const handleScrollToGallery = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── Entrance animation variants ──────────────────────────────────── */
  const entrance = useMemo(() => ({
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
  }), [prefersReduced]);

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
        -translate-y-2 sm:-translate-y-4 md:-translate-y-8
      "
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
            : { opacity: headingOpacity, y: headingY, scale: headingScale, fontFamily: "'Cormorant Garamond', serif" }
        }
        className="
          font-semibold text-brand-light
          text-[30px] min-[400px]:text-[34px] sm:text-[42px] md:text-[50px] lg:text-[58px]
          leading-[1.15] md:leading-[1.2]
          tracking-[-0.02em]
        "
      >
        Beautiful Weddings
        <br />
        Thoughtfully <em className="italic text-brand-accent">Designed</em>
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
            : { opacity: subOpacity, y: subY, fontFamily: "'Inter', sans-serif" }
        }
        className="
          mt-4 sm:mt-6
          max-w-[500px]
          text-[14px] sm:text-[16px]
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
            : { opacity: ctaOpacity, y: ctaY, scale: ctaScale }
        }
        className="mt-6 sm:mt-8 flex flex-col items-center w-full"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none">
          {/* Primary */}
          <button
            onClick={handleScrollToGallery}
            className="
              group flex items-center justify-center gap-2
              w-full sm:w-auto px-6 py-3 rounded-full
              bg-[#F5F2EB] text-[#0B3558]
              text-[13px] sm:text-[14px] font-semibold tracking-wide
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
              w-full sm:w-auto px-6 py-3 rounded-full
              bg-transparent text-[#F5F2EB]
              border border-[#F5F2EB]/30
              text-[13px] sm:text-[14px] font-semibold tracking-wide
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
              : { opacity: trustOpacity, y: trustY }
          }
          className="mt-5 text-[11px] sm:text-[12px] text-brand-light/60 tracking-wide text-center"
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
            : { opacity: previewOpacity, y: previewY }
        }
        onClick={handleScrollToGallery}
        className="
          mt-6 md:mt-8
          flex flex-row items-center justify-center gap-3
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
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#1D2A39] shadow-sm md:shadow-lg"
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
        <span className="text-[12px] sm:text-[13px] font-medium text-brand-light/90 md:group-hover:text-[#C9A86A] md:transition-colors md:duration-300">
          150+ Event Photos &rarr;
        </span>
      </motion.div>

      {/* ── Scroll Indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 2.0 }}
        style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
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
