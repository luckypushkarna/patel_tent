export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

export const BRAND = {
  name: "PATEL TENT",
  subtitle: "EVENT MANAGEMENT",
} as const;

// Design tokens
export const COLORS = {
  primaryText: "#F6F1E8",
  secondaryText: "rgba(246,241,232,0.92)",
  accent: "#D4B37F",
  scrolledBg: "rgba(24,20,18,0.82)",
  buttonText: "#2E241C",
  buttonBg: "#F6F1E8",
  mobileBg: "#181412",
  borderScrolled: "rgba(255,255,255,0.06)",
} as const;
