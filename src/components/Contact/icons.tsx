"use client";

import { memo } from "react";

interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PhoneIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
));
PhoneIcon.displayName = "PhoneIcon";

export const MailIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
));
MailIcon.displayName = "MailIcon";

export const PinIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 22s-8-7-8-13a8 8 0 1 1 16 0c0 6-8 13-8 13z" />
    <circle cx="12" cy="9" r="3" />
  </svg>
));
PinIcon.displayName = "PinIcon";

export const ClockIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
));
ClockIcon.displayName = "ClockIcon";

export const InstagramIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";

export const FacebookIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
  </svg>
));
FacebookIcon.displayName = "FacebookIcon";

export const WhatsappIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M21 12a9 9 0 1 1-3.6-7.2L21 3l-1.8 3.6A9 9 0 0 1 21 12z" />
    <path d="M8.5 8.5c0 4 3 7 7 7l1.5-1.5-2-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2L9.5 7A2 2 0 0 0 8.5 8.5z" />
  </svg>
));
WhatsappIcon.displayName = "WhatsappIcon";

export const CheckIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12l6 6L20 6" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

export const SpinnerIcon = memo(({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
));
SpinnerIcon.displayName = "SpinnerIcon";
