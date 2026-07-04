"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function FooterCTAComponent() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="
          text-[#F5EFE4]
          text-[30px] md:text-[40px] lg:text-[56px]
          font-medium
          leading-[1.05]
          tracking-[-0.02em]
          max-w-[820px]
        "
        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
      >
        Let&apos;s create something{" "}
        <span className="italic font-light text-[#F5EFE4]/95">beautiful</span>{" "}
        together.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
        className="
          mt-6
          max-w-[620px]
          text-[16px] md:text-[18px]
          leading-[1.65]
          text-[#F5EFE4]/70
          font-normal
        "
      >
        From intimate weddings to grand celebrations, we craft unforgettable
        experiences with elegance, precision, and timeless design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
        className="mt-10"
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            group
            inline-flex items-center justify-center gap-2
            h-[54px] px-8
            rounded-full
            bg-[#F5EFE4] text-[#1D2A39]
            text-[13px] font-semibold uppercase tracking-[0.14em]
            transition-colors duration-[300ms] ease-out
            hover:bg-[#C7A66A] hover:text-[#1D2A39]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F252C]
          "
        >
          <span>Book Your Event</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}

export const FooterCTA = memo(FooterCTAComponent);
