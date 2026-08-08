"use client";

import { memo } from "react";
import type { Service } from "./servicesData";
import { LazyLottie } from "./LazyLottie";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCardComponent({ service }: ServiceCardProps) {
  const scale = service.lottieScale ?? 1;

  return (
    <div
      className="group relative flex flex-col items-center text-center overflow-hidden rounded-2xl border border-[#1D3557]/8 cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(29,53,87,0.10)]"
      style={{ backgroundColor: "#FFF8F1", padding: "28px 24px 24px" }}
    >
      {/* Lottie — centered at top, renders at 170px but layout height is fixed */}
      <div
        className="flex-shrink-0 flex items-center justify-center mb-2"
        style={{ width: 170, height: 120, overflow: "visible" }}
      >
        <div
          style={{
            width: 170,
            height: 170,
            flexShrink: 0,
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: "center center",
          }}
        >
          <LazyLottie
            src={service.lottie}
            label={`${service.title} animation`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-bold leading-[1.2] tracking-[-0.02em] mb-2 w-full"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 2vw, 21px)",
          color: "#1D3557",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="leading-[1.65] mb-5 line-clamp-2 w-full"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "#475569",
        }}
      >
        {service.description}
      </p>



      {/* Hover accent border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          transition: "opacity 280ms ease",
          boxShadow: "inset 0 0 0 1.5px rgba(193,138,58,0.30)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export const ServiceCard = memo(ServiceCardComponent);
