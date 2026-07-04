"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "./icons";

import { DotLottiePlayer } from "@dotlottie/react-player";

function SuccessCardComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative
        flex flex-col items-center justify-center
        text-center
        py-16 px-6
        overflow-hidden
      "
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
        <DotLottiePlayer
          src="/Confetti.lottie"
          autoplay
          loop={false}
          style={{ width: "100%", height: "100%", transform: "scale(1.5)" }}
        />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="
          relative z-10
          flex items-center justify-center
          w-16 h-16
          rounded-full
          bg-[#C9A96A]/15
          text-[#0B3558]
          mb-6
        "
      >
        <CheckIcon className="w-7 h-7" />
      </motion.div>

      <h3
        className="relative z-10 text-[#0B3558] text-[26px] md:text-[30px] font-semibold leading-[1.15] mb-3"
        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
      >
        Thank you.
      </h3>

      <p className="relative z-10 text-[15px] text-[#0B3558]/75 max-w-[320px] leading-[1.65]">
        We&apos;ve received your inquiry. Our team will reach out shortly to help
        shape your celebration.
      </p>
    </motion.div>
  );
}

export const SuccessCard = memo(SuccessCardComponent);
