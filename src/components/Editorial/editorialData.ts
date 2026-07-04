export interface EditorialItem {
  id: string;
  publication: string;
  headline: string;
  image: string;
  href?: string;
}

export const EDITORIAL_ITEMS: readonly EditorialItem[] = [
  {
    id: "1",
    publication: "ROYAL HERITAGE",
    headline: "Classic Achkan structures featuring grand ivory canvas panels and block-printed legacy details.",
    image: "event/editorial/editorial-1",
    href: "#",
  },
  {
    id: "2",
    publication: "CONTEMPORARY",
    headline: "All-weather crystal-clear architectural framing lit under custom fairy-light tunnels.",
    image: "event/editorial/editorial-2",
    href: "#",
  },
  {
    id: "3",
    publication: "LUXURY RESORT",
    headline: "Open-air linen setups styled with intricate scalloped borders and traditional hanging tassels.",
    image: "event/editorial/editorial-3",
    href: "#",
  },
  {
    id: "4",
    publication: "ROYAL SCALE",
    headline: "High-clearance mega structures engineered for unobstructed floor space and grand receptions.",
    image: "event/editorial/editorial-4",
    href: "#",
  },
  {
    id: "5",
    publication: "PALACE COURTYARD",
    headline: "Transforming historic courtyards with ambient lighting and bespoke floral architecture.",
    image: "event/editorial/editorial-1",
    href: "#",
  },
  {
    id: "6",
    publication: "MODERN MINIMAL",
    headline: "Clean lines and monochromatic palettes designed for sophisticated contemporary aesthetics.",
    image: "event/editorial/editorial-2",
    href: "#",
  },
] as const;
