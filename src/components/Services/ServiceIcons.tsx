"use client";

import { memo } from "react";

/**
 * Custom hand-crafted line-art SVG icons.
 * Stroke: 1.5, rounded caps, minimal geometry.
 * Designed to feel like they were drawn by an architect, not a designer tool.
 */

interface IconProps {
  className?: string;
}

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const MandapIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <path d="M8 42V18" />
    <path d="M18 42V18" />
    <path d="M30 42V18" />
    <path d="M40 42V18" />
    <path d="M6 18L24 6L42 18" />
    <path d="M12 18Q24 14 36 18" />
    <path d="M10 24L14 24" />
    <path d="M26 24L30 24" />
    <path d="M34 24L38 24" />
    <path d="M18 24L22 24" />
  </svg>
));
MandapIcon.displayName = "MandapIcon";

export const LightingIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <path d="M24 4V12" />
    <path d="M18 12H30" />
    <path d="M16 18L20 12H28L32 18" />
    <path d="M14 24Q24 20 34 24" />
    <path d="M12 30Q24 26 36 30" />
    <path d="M16 36Q24 32 32 36" />
    <path d="M20 40L24 44L28 40" />
    <circle cx="16" cy="30" r="0.5" fill="currentColor" />
    <circle cx="24" cy="32" r="0.5" fill="currentColor" />
    <circle cx="32" cy="30" r="0.5" fill="currentColor" />
  </svg>
));
LightingIcon.displayName = "LightingIcon";

export const DecorIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <path d="M24 44V26" />
    <circle cx="24" cy="18" r="6" />
    <path d="M18 14Q14 10 16 6" />
    <path d="M30 14Q34 10 32 6" />
    <path d="M20 12Q18 4 24 4Q30 4 28 12" />
    <path d="M18 22Q14 26 16 32" />
    <path d="M30 22Q34 26 32 32" />
    <circle cx="24" cy="18" r="1.5" fill="currentColor" />
  </svg>
));
DecorIcon.displayName = "DecorIcon";

export const TentIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <path d="M4 40L24 8L44 40" />
    <path d="M4 40H44" />
    <path d="M24 8V40" />
    <path d="M14 40L20 24" />
    <path d="M34 40L28 24" />
    <path d="M20 40Q24 36 28 40" />
  </svg>
));
TentIcon.displayName = "TentIcon";

export const SoundIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <rect x="14" y="8" width="20" height="32" rx="2" />
    <circle cx="24" cy="18" r="3" />
    <circle cx="24" cy="30" r="5" />
    <circle cx="24" cy="30" r="1.5" fill="currentColor" />
    <circle cx="24" cy="18" r="0.5" fill="currentColor" />
  </svg>
));
SoundIcon.displayName = "SoundIcon";

export const CateringIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...baseProps}>
    <path d="M6 32H42" />
    <path d="M8 32Q8 20 24 20Q40 20 40 32" />
    <path d="M24 20V14" />
    <path d="M22 14H26" />
    <path d="M4 38H44" />
    <path d="M14 26Q14 24 16 24" />
    <path d="M12 32L10 40" />
    <path d="M36 32L38 40" />
  </svg>
));
CateringIcon.displayName = "CateringIcon";
