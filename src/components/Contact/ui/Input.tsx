"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, className = "", ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`
        h-14 w-full
        px-[18px]
        rounded-[14px]
        bg-white
        text-[15px] text-[#0B3558]
        placeholder:text-[#9C9587]
        border transition-colors duration-[250ms] ease-out
        focus:outline-none focus:ring-0
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

Input.displayName = "Input";
