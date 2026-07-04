"use client";

import { memo } from "react";
import type { EditorialItem } from "./editorialData";
import { CloudinaryImage } from "@/components/CloudinaryImage";

interface EditorialCardProps {
  item: EditorialItem;
}

function EditorialCardComponent({ item }: EditorialCardProps) {
  return (
    <article
      data-card
      className="
        group relative
        flex-shrink-0
        w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]
        snap-start
      "
    >
      <a
        href={item.href || "#"}
        aria-label={`${item.publication}: ${item.headline}`}
        className="
          relative block w-full
          rounded-lg overflow-hidden
          bg-neutral-200
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3558]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F6F2]
        "
        style={{ aspectRatio: "4/5" }}
      >
        {/* Image */}
        <CloudinaryImage
          publicId={item.image}
          alt=""
          width={800}
          height={1000}
          className="
            absolute inset-0 w-full h-full object-cover
            transition-transform duration-[700ms] ease-out
            group-hover:scale-[1.05]
          "
        />

        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t from-black/85 via-black/30 to-transparent
            transition-opacity duration-[500ms] ease-out
            group-hover:opacity-90
          "
        />

        {/* Publication Label — top left */}
        <span
          className="
            absolute top-6 left-6
            text-[11px] font-semibold uppercase
            tracking-[0.18em]
            text-white/95
            transition-opacity duration-[400ms]
            group-hover:opacity-80
          "
        >
          {item.publication}
        </span>

        {/* Headline — bottom left */}
        <h3
          className="
            absolute bottom-6 left-6 right-6
            max-w-[85%]
            text-white
            font-sans
            text-[15px]
            font-normal
            leading-[1.25]
            tracking-[-0.01em]
            transition-transform duration-[500ms] ease-out
            group-hover:-translate-y-1.5
          "
        >
          {item.headline}
        </h3>
      </a>
    </article>
  );
}

export const EditorialCard = memo(EditorialCardComponent);
