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
  lottie: string;
  lottieClassName?: string;
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
    lottie: "/lottie/City Skyline Building.lottie",
    lottieClassName: "object-right translate-x-[5%] md:translate-x-[12%] lg:translate-x-[18%]",
    span: "featured",
  },
  {
    id: "catering",
    number: "02",
    title: "Catering",
    description:
      "Curated multi-cuisine menus, live counters, and refined table service orchestrated by chefs who treat food as ceremony.",
    icon: CateringIcon,
    lottie: "/lottie/Man serving catering food.lottie",
    span: "normal",
  },
  {
    id: "theme-party",
    number: "03",
    title: "Theme Party",
    description:
      "Immersive themed environments designed with bespoke props, atmospheric lighting, and meticulous attention to detail.",
    icon: DecorIcon,
    lottie: "/lottie/congratulation.lottie",
    span: "normal",
  },
  {
    id: "birthday",
    number: "04",
    title: "Birthday Party Planning",
    description:
      "From intimate celebrations to grand bashes, we meticulously plan and execute memorable birthdays for all ages.",
    icon: SoundIcon,
    lottie: "/lottie/Happy Birthday!.lottie",
    span: "normal",
  },
  {
    id: "wedding-engagement",
    number: "05",
    title: "Wedding & Engagement",
    description:
      "Elegant décor and flawless execution for your pre-wedding rituals, grand engagements, and special ceremonies.",
    icon: MandapIcon,
    lottie: "/lottie/Wedding Destination Couple Merriage.lottie",
    span: "wide",
  },
  {
    id: "decorations",
    number: "06",
    title: "Decorations",
    description:
      "Sculpted florals, bespoke drapery, and layered textures tuned perfectly to your vision and the venue's architecture.",
    icon: DecorIcon,
    lottie: "/lottie/Animation - 1705409067911.lottie",
    span: "normal",
  },
] as const;
