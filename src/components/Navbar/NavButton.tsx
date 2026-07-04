"use client";

import { memo } from "react";

interface NavButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

function NavButtonComponent({
  label = "Book Now",
  href = "/#contact",
  className = "",
}: NavButtonProps) {
  return (
    <a
      href={href}
      className={`
        inline-flex items-center justify-center
        h-[44px] px-8
        rounded-full
        bg-[#F6F1E8] text-[#2E241C]
        text-[13px] font-semibold uppercase tracking-[0.10em]
        transition-all duration-[250ms] ease-out
        hover:bg-white hover:scale-[1.02]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B37F] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
        active:scale-[0.99]
        ${className}
      `}
    >
      {label}
    </a>
  );
}

export const NavButton = memo(NavButtonComponent);
