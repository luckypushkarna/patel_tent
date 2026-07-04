"use client";

import { memo, useEffect, useRef, useState } from "react";

// FIX H7: Lazy-load the Google Maps iframe only when the footer is near the viewport.
// Loading the iframe eagerly triggers Google Maps JS, tile fetches, and tracking
// scripts on every page load — even though the map is at the very bottom.

function FooterMapComponent() {
  const mapUrl =
    "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Patel%20tent%20%26%20event%20management,%20Udaipur&t=&z=14&ie=UTF8&iwloc=B&output=embed";

  const searchUrl =
    "https://www.google.com/maps/place/Patel+tent+%26+event+management/@24.5970915,73.6338148,13z/data=!4m10!1m2!2m1!1spatel+tent+house+udaipur!3m6!1s0x3967e5364343029d:0x932ccf0703869457!8m2!3d24.5970915!4d73.7059126!15sChhwYXRlbCB0ZW50IGhvdXNlIHVkYWlwdXJaGiIYcGF0ZWwgdGVudCBob3VzZSB1ZGFpcHVykgEYZXZlbnRfbWFuYWdlbWVudF9jb21wYW554AEA!16s%2Fg%2F11js7h_cs4?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Only needs to fire once
        }
      },
      { rootMargin: "300px 0px" } // Start loading 300px before it enters viewport
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={wrapperRef}
        className="
          w-full max-w-5xl h-[300px] md:h-[400px]
          rounded-[8px] overflow-hidden
          border border-white/10
          shadow-xl
          mb-6
          bg-[#1a1a1a]
        "
      >
        {shouldLoad && (
          <iframe
            title="Patel Tent Office Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[13px] md:text-[14px] text-[#F5EFE4]/80 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
        <span className="font-semibold text-[#F5EFE4] uppercase tracking-widest text-[12px]">
          Patel Tent &amp; Event Management
        </span>
        <span className="hidden md:inline text-[#F5EFE4]/30">|</span>
        <span>
          CPS School Road, Opp. Divy Jyoti Complex, New Bhupalpura, Rupsagar, Udaipur, Rajasthan 313001
        </span>
      </div>

      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center gap-2
          h-[42px] px-6
          rounded-full
          border border-[#F5EFE4]/20 bg-transparent
          text-[#F5EFE4] text-[12px] font-medium uppercase tracking-[0.14em]
          transition-all duration-300 ease-out
          hover:bg-[#C7A66A] hover:border-[#C7A66A] hover:text-[#1D2A39]
        "
      >
        <span>Open in Google Maps</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

export const FooterMap = memo(FooterMapComponent);
