"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { SpinnerIcon } from "../icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { loading = false, loadingText = "Sending...", children, disabled, ...props },
    ref
  ) => (
    <motion.button
      ref={ref}
      {...(props as React.ComponentProps<typeof motion.button>)}
      disabled={disabled || loading}
      whileHover={!loading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.99 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        group relative
        inline-flex items-center justify-center gap-2
        h-[58px] w-full
        px-8
        rounded-[14px]
        bg-[#1D2A39] text-[#F6F1E8]
        text-[13px] font-semibold uppercase tracking-[0.14em]
        transition-colors duration-[300ms] ease-out
        hover:bg-[#C9A96A] hover:text-[#1D2A39]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A] focus-visible:ring-offset-2 focus-visible:ring-offset-white
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#1D2A39] disabled:hover:text-[#F6F1E8]
      `}
    >
      {loading ? (
        <>
          <SpinnerIcon className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
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
        </>
      )}
    </motion.button>
  )
);

Button.displayName = "Button";
