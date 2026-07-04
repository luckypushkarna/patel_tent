"use client";

import { motion, Variants } from "framer-motion";
import { FooterCTA } from "./FooterCTA";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterContact } from "./FooterContact";
import { FooterSocial } from "./FooterSocial";
import { FooterBottom } from "./FooterBottom";
import { FooterMap } from "./FooterMap";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="w-full bg-[#1F252C] text-[#F5EFE4]"
    >
      {/* ── TOP CTA BLOCK ── */}
      <div className="w-full pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
          <FooterCTA />
        </div>
      </div>

      {/* ── MAP BLOCK ── */}
      <div className="w-full pb-16 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
          <FooterMap />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-white/[0.08]" />
      </div>

      {/* ── MAIN GRID ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full py-8 md:py-10"
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
          <div
            className="
              grid
              grid-cols-1 md:grid-cols-3
              gap-6 md:gap-8 lg:gap-12
            "
          >
            <motion.div variants={itemVariants}>
              <FooterBrand />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FooterLinks />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FooterContact />
            </motion.div>
          </div>

          {/* Social row */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex justify-center"
          >
            <FooterSocial />
          </motion.div>
        </div>
      </motion.div>

      {/* ── DIVIDER ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-white/[0.08]" />
      </div>

      {/* ── BOTTOM ── */}
      <div className="w-full py-8">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}
