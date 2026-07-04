import type { EventType } from "./types";

export const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: "", label: "Select event type" },
  { value: "wedding", label: "Wedding" },
  { value: "reception", label: "Reception" },
  { value: "engagement", label: "Engagement" },
  { value: "corporate", label: "Corporate Event" },
  { value: "birthday", label: "Birthday" },
  { value: "festival", label: "Festival" },
  { value: "other", label: "Other" },
];

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "hello@pateltent.com",
  address: {
    line1: "Patel Tent & Event Management",
    line2: "Udaipur, Rajasthan",
    line3: "India",
  },
  hours: {
    days: "Monday – Sunday",
    time: "9:00 AM — 9:00 PM",
  },
  social: {
    instagram: "https://instagram.com/pateltent",
    facebook: "https://facebook.com/pateltent",
    whatsapp: "https://wa.me/919876543210",
  },
} as const;

// Design tokens — matches the whole website
export const COLORS = {
  bg: "#F3EBE1",
  cardBg: "#FFFFFF",
  cardBorder: "#EAE3D6",
  navy: "#0B3558",
  darkNavy: "#1D2A39",
  ivory: "#F6F1E8",
  gold: "#C9A96A",
  goldSoft: "#D4B37F",
  inputBorder: "#DDD8CF",
  placeholder: "#9C9587",
  error: "#B84545",
  success: "#4A7C59",
} as const;
