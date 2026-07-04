"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "./types";

interface TestimonialItemProps {
  testimonial: Testimonial;
  index: number;
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-brand-accent"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21 16.54 13.47 22 9.24 14.81 8.62 12 2 9.19 8.62 2 9.24 7.46 13.47 5.82 21z" />
  </svg>
);

function TestimonialItemComponent({ testimonial, index }: TestimonialItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col h-full"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-brand-primary text-[20px] leading-[1.7] font-medium tracking-[-0.01em] mb-10 flex-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        “{testimonial.quote}”
      </blockquote>

      {/* Author */}
      <div>
        <cite className="not-italic">
          <div className="text-brand-primary text-[17px] font-medium">
            {testimonial.name}
          </div>
          <div className="text-[13px] text-brand-muted uppercase tracking-[0.08em] mt-1">
            {testimonial.event} • {testimonial.location}
          </div>
        </cite>
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-brand-primary/10 mt-12 group-hover:bg-brand-accent/30 transition-colors duration-500" />
    </motion.article>
  );
}

export const TestimonialItem = memo(TestimonialItemComponent);
