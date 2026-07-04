"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      {...props}
      className={`
        min-h-[170px] w-full
        p-[18px]
        rounded-[14px]
        bg-white
        text-[15px] leading-[1.6] text-[#0B3558]
        placeholder:text-[#9C9587]
        border transition-colors duration-[250ms] ease-out
        focus:outline-none focus:ring-0
        resize-y
        ${
          hasError
            ? "border-[#B84545] focus:border-[#B84545]"
            : "border-[#DDD8CF] focus:border-[#C9A96A]"
        }
        ${className}
      `}
    />
  )
);

Textarea.displayName = "Textarea";
