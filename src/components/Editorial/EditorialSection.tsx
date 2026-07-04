"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";
import { CarouselControls } from "./CarouselControls";
import { EditorialCarousel } from "./EditorialCarousel";
import { EDITORIAL_ITEMS } from "./editorialData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      aria-label="Featured celebrations by Patel Tent"
      className="w-full bg-[#F3EBE1] pt-20 pb-20 md:pt-[140px] md:pb-[120px]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <div ref={headerRef} className="opacity-0">
          <EditorialCarousel
            items={EDITORIAL_ITEMS}
            renderControls={({ prev, next, canPrev, canNext }) => (
              <SectionHeader
                title="Featured Celebrations"
                actions={
                  <CarouselControls
                    onPrev={prev}
                    onNext={next}
                    canPrev={canPrev}
                    canNext={canNext}
                  />
                }
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
