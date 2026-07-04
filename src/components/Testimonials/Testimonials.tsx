"use client";

import { memo } from "react";
import { TestimonialItem } from "./TestimonialItem";
import { TESTIMONIALS } from "./testimonialData";

function TestimonialsComponent() {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="w-full bg-brand-bg py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-brand-accent/60" />
            <span className="text-[11px] font-medium uppercase tracking-[0.30em] text-brand-accent">
              TESTIMONIALS
            </span>
            <span className="h-px w-8 bg-brand-accent/60" />
          </span>

          <h2
            className="
              text-brand-primary
              text-[32px] md:text-[42px] lg:text-[56px]
              font-bold
              leading-[1.05]
              tracking-[-0.025em]
              max-w-[720px]
            "
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Kind Words From Our Clients
          </h2>

          <p className="mt-6 max-w-[620px] text-[15.5px] md:text-[17px] leading-[1.65] text-brand-muted">
            Every celebration tells a story. Here’s what families and clients
            have shared about their experience working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 lg:gap-y-20">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialItem
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="flex justify-center mt-20">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export const Testimonials = memo(TestimonialsComponent);
