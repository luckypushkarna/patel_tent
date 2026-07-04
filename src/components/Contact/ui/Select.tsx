"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError = false, className = "", options, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        {...props}
        className={`
          h-14 w-full
          pl-[18px] pr-12
          rounded-[14px]
          bg-white
          text-[15px] text-[#0B3558]
          border transition-colors duration-[250ms] ease-out
          appearance-none
          focus:outline-none focus:ring-0
          cursor-pointer
          ${
            hasError
              ? "border-[#B84545] focus:border-[#B84545]"
              : "border-[#DDD8CF] focus:border-[#C9A96A]"
          }
          ${className}
        `}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B3558]/60 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
);

Select.displayName = "Select";
