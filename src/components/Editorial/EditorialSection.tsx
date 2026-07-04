"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { CarouselControls } from "./CarouselControls";
import { EditorialCarousel } from "./EditorialCarousel";
import { EDITORIAL_ITEMS } from "./editorialData";

export function EditorialSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="featured"
      aria-label="Featured celebrations by Patel Tent"
      className="w-full bg-[#F3EBE1] pt-20 pb-20 md:pt-[140px] md:pb-[120px]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <div 
          ref={headerRef} 
          className="opacity-0 translate-y-6 transition-all duration-1000 ease-out will-change-[opacity,transform]"
        >
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
