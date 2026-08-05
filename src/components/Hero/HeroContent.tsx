"use client";

import { memo, useMemo } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { CloudinaryImage } from "@/components/CloudinaryImage";

interface HeroContentProps {
  scrollY: MotionValue<number>;
}

// ── Entrance spring — used for all staggered children ────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function HeroContentComponent({ scrollY }: HeroContentProps) {
  const prefersReduced = useReducedMotion();

  const vh = useMemo(
    () => (typeof window !== "undefined" ? window.innerHeight : 800),
    []
  );

  // ── Scroll-exit transforms (GPU-only: opacity + translateY) ──────────────
  // Elements fade + float upward as the hero scrolls out of view.
  // Using staggered exit ranges so each layer disappears at a slightly
  // different scroll depth — creates a layered, editorial parallax feel.
  const headingOpacity = useTransform(scrollY, [0, vh * 0.28], [1, 0]);
  const headingY       = useTransform(scrollY, [0, vh * 0.35], [0, -52]);

  const eyebrowOpacity = useTransform(scrollY, [0, vh * 0.20], [1, 0]);
  const eyebrowY       = useTransform(scrollY, [0, vh * 0.25], [0, -20]);

  const subOpacity = useTransform(scrollY, [0, vh * 0.22], [1, 0]);
  const subY       = useTransform(scrollY, [0, vh * 0.28], [0, -36]);

  const ctaOpacity = useTransform(scrollY, [0, vh * 0.18], [1, 0]);
  const ctaY       = useTransform(scrollY, [0, vh * 0.22], [0, -24]);

  const trustOpacity = useTransform(scrollY, [0, vh * 0.14], [1, 0]);
  const trustY       = useTransform(scrollY, [0, vh * 0.18], [0, -12]);



  const handleScrollToGallery = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Entrance variants ────────────────────────────────────────────────────
  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 1.1, ease: EASE_OUT_EXPO },
    },
  });

  return (
    <div
      className="
        relative z-10
        flex flex-col items-center text-center
        w-full px-5 sm:px-8 md:px-10
        max-w-[860px] mx-auto
        select-none
      "
    >

      {/* ── Headline ─────────────────────────────────────────────────────── */}
      {/* Copy philosophy: specific, emotional, avoids every generic wedding phrase.
          "Every garland, every light" references real craft; "stays" is timeless. */}
      <motion.h1
        variants={fadeUp(0.18)}
        initial="hidden"
        animate="show"
        style={
          prefersReduced
            ? { fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }
            : {
                opacity: headingOpacity,
                y: headingY,
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              }
        }
        className="
          font-light text-[#F8F3EC]
          text-[34px] min-[400px]:text-[38px] sm:text-[48px] md:text-[58px] lg:text-[64px]
          leading-[1.1] sm:leading-[1.08]
          tracking-[-0.01em]
          mb-0
        "
      >
        Where every garland,
        <br className="hidden sm:block" />
        {" "}every light,{" "}
        <em
          className="not-italic font-light"
          style={{ color: "#C9A86A" }}
        >
          stays
        </em>
        {" "}with you.
      </motion.h1>

      {/* ── Supporting paragraph ─────────────────────────────────────────── */}
      <motion.p
        variants={fadeUp(0.34)}
        initial="hidden"
        animate="show"
        style={
          prefersReduced
            ? { fontFamily: "'Inter', sans-serif", color: "rgba(248,243,236,0.72)" }
            : { opacity: subOpacity, y: subY, fontFamily: "'Inter', sans-serif", color: "rgba(248,243,236,0.72)" }
        }
        className="
          mt-5 sm:mt-6
          max-w-[440px] sm:max-w-[500px]
          text-[14px] sm:text-[15px] md:text-[16px]
          font-light leading-[1.72]
          tracking-[0.01em]
        "
      >
        Patel Tent crafts weddings, receptions, and corporate celebrations across
        Rajasthan — from grand mandap architecture to the smallest floral detail.
      </motion.p>

      {/* ── CTA buttons ──────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.52)}
        initial="hidden"
        animate="show"
        style={prefersReduced ? {} : { opacity: ctaOpacity, y: ctaY }}
        className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-none"
      >
        {/* Primary CTA — champagne fill */}
        <button
          onClick={handleScrollToGallery}
          aria-label="View our event gallery"
          className="
            group relative w-full sm:w-auto
            flex items-center justify-center gap-2.5
            px-7 sm:px-8 py-3.5
            rounded-full
            text-[13px] sm:text-[14px] font-semibold tracking-[0.04em]
            overflow-hidden
          "
          style={{
            background: "linear-gradient(135deg, #C9A86A 0%, #B8945A 100%)",
            color: "#1A110A",
            boxShadow: "0 4px 24px rgba(201,168,106,0.30)",
            transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 280ms ease",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.01)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(201,168,106,0.45)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(201,168,106,0.30)";
          }}
        >
          Explore Our Work
          {/* Arrow — translates on hover via group */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1)" }}
            aria-hidden="true"
          >
            <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Secondary CTA — ghost / outlined */}
        <button
          onClick={handleScrollToContact}
          aria-label="Book your event with Patel Tent"
          className="
            w-full sm:w-auto
            flex items-center justify-center
            px-7 sm:px-8 py-3.5
            rounded-full
            text-[13px] sm:text-[14px] font-medium tracking-[0.04em]
          "
          style={{
            color: "rgba(248,243,236,0.88)",
            border: "1px solid rgba(248,243,236,0.22)",
            background: "rgba(248,243,236,0.04)",
            transition: "border-color 260ms ease, background 260ms ease, transform 260ms ease",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,106,0.55)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,106,0.07)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(248,243,236,0.22)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,243,236,0.04)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Book a Consultation
        </button>
      </motion.div>

      {/* ── Trust / Social proof bar ──────────────────────────────────────── */}
      {/* Glass card with avatar stack + two concise stats.
          Designed to feel integrated with the content, not floating. */}
      <motion.div
        variants={fadeUp(0.70)}
        initial="hidden"
        animate="show"
        style={prefersReduced ? {} : { opacity: trustOpacity, y: trustY }}
        className="
          mt-8 sm:mt-10
          flex flex-col sm:flex-row items-center justify-center
          gap-4 sm:gap-0
        "
      >
        {/* Glass pill container */}
        <div
          className="
            flex flex-col sm:flex-row items-center
            gap-4 sm:gap-0
            px-5 sm:px-6 py-3.5
            rounded-2xl
          "
          style={{
            background: "rgba(248,243,236,0.06)",
            border: "1px solid rgba(248,243,236,0.10)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          {/* Avatar stack + label */}
          <button
            onClick={handleScrollToGallery}
            className="flex items-center gap-3 cursor-pointer group"
            style={{ background: "none", border: "none", padding: 0 }}
            aria-label="View 150+ event photos"
          >
            {/* Avatar circles */}
            <div className="flex items-center -space-x-2.5">
              {["event/gallery/1", "event/gallery/2", "event/gallery/3"].map((id, i) => (
                <div
                  key={id}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden"
                  style={{
                    zIndex: 30 - i * 10,
                    position: "relative",
                    border: "2px solid rgba(30,22,14,0.85)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <CloudinaryImage
                    publicId={id}
                    alt=""
                    width={72}
                    height={72}
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p
                className="text-[13px] sm:text-[14px] font-semibold leading-none"
                style={{ color: "rgba(248,243,236,0.92)", fontFamily: "'Inter', sans-serif" }}
              >
                150+ Weddings
              </p>
              <p
                className="text-[11px] mt-0.5 leading-none"
                style={{ color: "rgba(201,168,106,0.75)", fontFamily: "'Inter', sans-serif" }}
              >
                delivered with care →
              </p>
            </div>
          </button>

        </div>
      </motion.div>

    </div>
  );
}

export const HeroContent = memo(HeroContentComponent);

