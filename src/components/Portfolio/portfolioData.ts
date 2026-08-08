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
    title: "Event Gallery 1",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_01",
  },

  {
    id: "p3",
    title: "Event Gallery 3",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_03",
  },
  {
    id: "p4",
    title: "Event Gallery 4",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_04",
  },
  {
    id: "p5",
    title: "Event Gallery 5",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_05",
  },
  {
    id: "p6",
    title: "Event Gallery 6",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_06",
  },
  {
    id: "p7",
    title: "Event Gallery 7",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_07",
  },
  {
    id: "p8",
    title: "Event Gallery 8",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_08",
  },

  {
    id: "p10",
    title: "Event Gallery 10",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_10",
  },
  {
    id: "p11",
    title: "Event Gallery 11",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_11",
  },
  {
    id: "p12",
    title: "Event Gallery 12",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_12",
  },
  {
    id: "p13",
    title: "Event Gallery 13",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_13",
  },
  {
    id: "p14",
    title: "Event Gallery 14",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_14",
  },
  {
    id: "p15",
    title: "Event Gallery 15",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_15",
  },
  {
    id: "p16",
    title: "Event Gallery 16",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_16",
  },
  {
    id: "p17",
    title: "Event Gallery 17",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_17",
  },
  {
    id: "p18",
    title: "Event Gallery 18",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_18",
  },
  {
    id: "p19",
    title: "Event Gallery 19",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_19",
  },
  {
    id: "p20",
    title: "Event Gallery 20",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_20",
  },
  {
    id: "p21",
    title: "Event Gallery 21",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_21",
  },
  {
    id: "p22",
    title: "Event Gallery 22",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_22",
  },
  {
    id: "p23",
    title: "Event Gallery 23",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_23",
  },
  {
    id: "p24",
    title: "Event Gallery 24",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_24",
  },
  {
    id: "p25",
    title: "Event Gallery 25",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_25",
  },
  {
    id: "p26",
    title: "Event Gallery 26",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_26",
  },
  {
    id: "p27",
    title: "Event Gallery 27",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_27",
  },
  {
    id: "p28",
    title: "Event Gallery 28",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_28",
  },
  {
    id: "p29",
    title: "Event Gallery 29",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_29",
  },
  {
    id: "p30",
    title: "Event Gallery 30",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_30",
  },
  {
    id: "p31",
    title: "Event Gallery 31",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_31",
  },
  {
    id: "p32",
    title: "Event Gallery 32",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_32",
  },
  {
    id: "p33",
    title: "Event Gallery 33",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_33",
  },
  {
    id: "p34",
    title: "Event Gallery 34",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_34",
  },
  {
    id: "p35",
    title: "Event Gallery 35",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_35",
  },
  {
    id: "p36",
    title: "Event Gallery 36",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_36",
  },
  {
    id: "p37",
    title: "Event Gallery 37",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_37",
  },
  {
    id: "p38",
    title: "Event Gallery 38",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_38",
  },
  {
    id: "p39",
    title: "Event Gallery 39",
    location: "Udaipur, Rajasthan",
    category: "decor",
    size: "square",
    image: "event/gallery/gallery_img_39",
  },
  {
    id: "p40",
    title: "Event Gallery 40",
    location: "Udaipur, Rajasthan",
    category: "sound",
    size: "landscape",
    image: "event/gallery/gallery_img_40",
  },
  {
    id: "p41",
    title: "Event Gallery 41",
    location: "Udaipur, Rajasthan",
    category: "culinary",
    size: "portrait",
    image: "event/gallery/gallery_img_41",
  },
  {
    id: "p42",
    title: "Event Gallery 42",
    location: "Udaipur, Rajasthan",
    category: "tenting",
    size: "large",
    image: "event/gallery/gallery_img_42",
  },
  {
    id: "p43",
    title: "Event Gallery 43",
    location: "Udaipur, Rajasthan",
    category: "mandap",
    size: "square",
    image: "event/gallery/gallery_img_43",
  },
  {
    id: "p44",
    title: "Event Gallery 44",
    location: "Udaipur, Rajasthan",
    category: "lighting",
    size: "portrait",
    image: "event/gallery/gallery_img_44",
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
