"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function ContactHeaderComponent() {
  return (
    <div className="flex flex-col items-start mb-16 md:mb-20">
      {/* Small label */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="h-px w-8 bg-[#0B3558]/40" />
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#0B3558]/70">
          Contact Us
        </span>
      </motion.span>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="
          text-[#0B3558]
          text-[32px] md:text-[40px] lg:text-[56px]
          font-medium
          leading-[1.05]
          tracking-[-0.025em]
          max-w-[760px]
        "
        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
      >
        Let&apos;s start crafting{" "}
        <span className="italic font-light">beautiful.</span>
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="
          mt-6
          max-w-[650px]
          text-[16px] md:text-[18px]
          leading-[1.65]
          text-[#0B3558]/70
          font-normal
        "
      >
        Whether you&apos;re planning a grand royal wedding, an intimate gathering, corporate event or private
        celebration — our team is ready to help bring your vision to life.
      </motion.p>
    </div>
  );
}

export const ContactHeader = memo(ContactHeaderComponent);
