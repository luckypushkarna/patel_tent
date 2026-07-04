export type PortfolioCategory =
  | "all"
  | "tenting"
  | "mandap"
  | "lighting"
  | "decor"
  | "sound"
  | "culinary";

export type CardSize = "large" | "portrait" | "landscape" | "square";

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: Exclude<PortfolioCategory, "all">;
  image: string;
  size: CardSize;
}

export const CATEGORIES: readonly { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tenting", label: "Premium Tenting" },
  { id: "mandap", label: "Mandap Architecture" },
  { id: "lighting", label: "Ambient Lighting" },
  { id: "decor", label: "Floral & Décor" },
  { id: "sound", label: "Sound & Stage" },
  { id: "culinary", label: "Culinary Experience" },
] as const;

/**
 * Portfolio items — arranged intentionally to create asymmetric rhythm.
 * Mix of sizes ensures no two rows look the same.
 */
export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "p1",
    title: "The Marigold Mandap",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "large",
    image: "event/gallery/1",
  },
  {
    id: "p2",
    title: "Golden Hour Reception",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/2",
  },
  {
    id: "p3",
    title: "Royal Peacock Décor",
    location: "Jaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/3",
  },
  {
    id: "p4",
    title: "Sundown Sangeet Stage",
    location: "Goa",
    category: "sound",
    size: "landscape",
    image: "event/gallery/4",
  },
  {
    id: "p5",
    title: "The Ivory Pavilion",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "portrait",
    image: "event/gallery/5",
  },
  {
    id: "p6",
    title: "Bespoke Catering Suite",
    location: "Mumbai, Maharashtra",
    category: "culinary",
    size: "square",
    image: "event/gallery/6",
  },
  {
    id: "p7",
    title: "Moonlit Garden Ceremony",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "large",
    image: "event/gallery/7",
  },
  {
    id: "p8",
    title: "Crystal Chandelier Hall",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/8",
  },
  {
    id: "p9",
    title: "The Rose Canopy",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "landscape",
    image: "event/gallery/9",
  },
  {
    id: "p10",
    title: "Twilight Terrace Setup",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "square",
    image: "event/gallery/10",
  },
  {
    id: "p11",
    title: "Live Counter Experience",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/11",
  },
  {
    id: "p12",
    title: "Grand Reception Stage",
    location: "Mumbai, Maharashtra",
    category: "sound",
    size: "large",
    image: "event/gallery/new_12",
  },
] as const;

/**
 * Maps each card size to its Tailwind grid classes.
 * This is the secret to asymmetry — different span combinations per size.
 */
export const SIZE_CLASSES: Record<CardSize, { grid: string; ratio: string }> = {
  large: {
    grid: "md:col-span-2 md:row-span-2",
    ratio: "3/4",
  },
  portrait: {
    grid: "md:col-span-1 md:row-span-2",
    ratio: "3/4",
  },
  landscape: {
    grid: "md:col-span-2 md:row-span-1",
    ratio: "16/10",
  },
  square: {
    grid: "md:col-span-1 md:row-span-1",
    ratio: "1/1",
  },
};
