import {
  MandapIcon,
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
  lottieScale?: number;
  span?: "normal" | "wide" | "featured";
}

export const SERVICES: readonly Service[] = [
  {
    id: "corporate",
    number: "01",
    title: "Corporate & Conference",
    description:
      "Flawless execution for corporate events, product launches, and grand professional conferences.",
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
      "Curated multi-cuisine menus and refined service orchestrated by expert culinary professionals.",
    icon: CateringIcon,
    lottie: "/lottie/Man serving catering food.lottie",
    span: "normal",
  },
  {
    id: "theme-party",
    number: "03",
    title: "Theme Party",
    description:
      "Immersive themed environments designed with bespoke props and meticulous attention to detail.",
    icon: DecorIcon,
    lottie: "/lottie/congratulation.lottie",
    span: "normal",
  },
  {
    id: "birthday",
    number: "04",
    title: "Birthday Party Planning",
    description:
      "Meticulously planned and executed memorable birthday celebrations for all ages and scales.",
    icon: SoundIcon,
    lottie: "/lottie/Happy Birthday!.lottie",
    span: "normal",
  },
  {
    id: "wedding-engagement",
    number: "05",
    title: "Wedding & Engagement",
    description:
      "Elegant décor and flawless execution for pre-wedding rituals and grand wedding ceremonies.",
    icon: MandapIcon,
    lottie: "/lottie/Wedding Destination Couple Merriage.lottie",
    lottieScale: 1.7,
    span: "wide",
  },
  {
    id: "decorations",
    number: "06",
    title: "Decorations",
    description:
      "Sculpted florals, bespoke drapery, and layered textures perfectly tuned to your vision.",
    icon: DecorIcon,
    lottie: "/lottie/Animation - 1705409067911.lottie",
    span: "normal",
  },
] as const;
