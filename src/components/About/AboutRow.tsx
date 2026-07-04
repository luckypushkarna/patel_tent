"use client";

import { memo, ReactNode } from "react";

interface TextBlockProps {
  heading: ReactNode;
  paragraph: string;
  className?: string;
}

/**
 * Reusable text block used inside every About row.
 * Keeps typography perfectly consistent across the 3 folds.
 * No entrance animations — static render for smooth mobile performance.
 */
export const TextBlock = memo(function TextBlock({
  heading,
  paragraph,
  className = "",
}: TextBlockProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2
        className="
          text-[#032B53]
          text-[32px] sm:text-[36px] md:text-[44px]
          font-semibold
          leading-[1.05]
          tracking-[-0.03em]
          mb-6
        "
      >
        {heading}
      </h2>
      <p
        className="
          text-[#032B53]/75
          text-[13px] md:text-[14px]
          font-normal
          leading-[1.7]
          max-w-[360px]
        "
      >
        {paragraph}
      </p>
    </div>
  );
});
