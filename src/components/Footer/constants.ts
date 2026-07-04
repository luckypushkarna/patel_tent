import type { FooterLink, SocialLink } from "./types";

export const FOOTER_NAV: readonly FooterLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_CONTACT = {
  phone: "+91 98765 43210",
  email: "hello@pateltent.com",
  address: "Udaipur, Rajasthan",
  hoursDays: "Mon – Sun",
  hoursTime: "9 AM – 9 PM",
} as const;

export const FOOTER_SOCIALS: readonly SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/pateltent",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/pateltent",
    icon: "facebook",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919876543210",
    icon: "whatsapp",
  },
] as const;

// Design tokens
export const FOOTER_COLORS = {
  bg: "#1F252C",
  heading: "#F5EFE4",
  body: "rgba(245,239,228,0.72)",
  muted: "rgba(245,239,228,0.45)",
  divider: "rgba(255,255,255,0.08)",
  gold: "#C7A66A",
  buttonBg: "#F5EFE4",
  buttonText: "#1D2A39",
} as const;
