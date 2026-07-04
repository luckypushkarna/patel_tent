import {
  MandapIcon,
  LightingIcon,
  DecorIcon,
  TentIcon,
  SoundIcon,
  CateringIcon,
} from "./ServiceIcons";

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  span?: "normal" | "wide" | "featured";
}

export const SERVICES: readonly Service[] = [
  {
    id: "corporate",
    number: "01",
    title: "Corporate & Conference",
    description:
      "Professional setups tailored for corporate events, product launches, and grand conferences with flawless execution.",
    icon: TentIcon,
    image: "event/services/service-1",
    span: "featured",
  },
  {
    id: "catering",
    number: "02",
    title: "Catering",
    description:
      "Curated multi-cuisine menus, live counters, and refined table service orchestrated by chefs who treat food as ceremony.",
    icon: CateringIcon,
    image: "event/services/service-4",
    span: "normal",
  },
  {
    id: "theme-party",
    number: "03",
    title: "Theme Party",
    description:
      "Immersive themed environments designed with bespoke props, atmospheric lighting, and meticulous attention to detail.",
    icon: DecorIcon,
    image: "event/services/service-3",
    span: "normal",
  },
  {
    id: "birthday",
    number: "04",
    title: "Birthday Party Planning",
    description:
      "From intimate celebrations to grand bashes, we meticulously plan and execute memorable birthdays for all ages.",
    icon: SoundIcon,
    image: "event/services/service-2",
    span: "normal",
  },
  {
    id: "wedding-engagement",
    number: "05",
    title: "Wedding & Engagement",
    description:
      "Elegant décor and flawless execution for your pre-wedding rituals, grand engagements, and special ceremonies.",
    icon: MandapIcon,
    image: "event/services/service-5",
    span: "wide",
  },
  {
    id: "weddings",
    number: "06",
    title: "Weddings",
    description:
      "Comprehensive wedding planning from majestic mandap architecture to premium venue styling and seamless management.",
    icon: MandapIcon,
    image: "event/services/service-1",
    span: "normal",
  },
  {
    id: "decorations",
    number: "07",
    title: "Decorations",
    description:
      "Sculpted florals, bespoke drapery, and layered textures tuned perfectly to your vision and the venue's architecture.",
    icon: DecorIcon,
    image: "event/services/service-6",
    span: "wide",
  },
  {
    id: "anniversary",
    number: "08",
    title: "Anniversary Party Planning",
    description:
      "Celebrate your milestones with sophisticated venues, elegant dining, and deeply romantic atmospheres.",
    icon: LightingIcon,
    image: "event/services/service-3",
    span: "normal",
  },
] as const;
