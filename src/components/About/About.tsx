"use client";

import { Photo } from "./Photo";
import { TextBlock } from "./AboutRow";
import { Speaker1, Speaker2 } from "./DecorativeSpeakers";
import {
  MandapIcon,
  LightingIcon,
  DecorIcon,
  TentIcon,
  SoundIcon,
  CateringIcon,
} from "../Services/ServiceIcons";

export function About() {
  return (
    <section
      id="about"
      aria-label="About Patel Tent & Event Management"
      className="relative z-10 w-full bg-[#F3EBE1] flex justify-center -mt-[1px] bg-clip-padding"
    >
      <div className="relative w-full flex flex-col items-center pb-20 md:pb-36">
        {/* ── Floating Decorative Background Icons ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <MandapIcon className="absolute top-[4%] -left-8 md:left-[-5%] w-40 h-40 md:w-64 md:h-64 text-[#032B53] opacity-[0.12] md:opacity-10 -rotate-12" />
          <LightingIcon className="absolute top-[16%] -right-10 md:right-[-2%] w-36 h-36 md:w-48 md:h-48 text-[#032B53] opacity-[0.12] md:opacity-15 rotate-45" />
          <DecorIcon className="absolute top-[32%] -left-12 md:left-[8%] w-44 h-44 md:w-56 md:h-56 text-[#032B53] opacity-[0.12] md:opacity-10 -rotate-6" />
          <TentIcon className="absolute top-[48%] -right-8 md:right-[15%] w-32 h-32 md:w-40 md:h-40 text-[#032B53] opacity-[0.12] md:opacity-10 rotate-12" />
          <SoundIcon className="absolute top-[64%] -left-10 md:left-[10%] w-32 h-32 md:w-32 md:h-32 text-[#032B53] opacity-[0.12] md:opacity-15 -rotate-[30deg]" />
          <CateringIcon className="absolute top-[80%] -right-16 md:right-[5%] w-48 h-48 md:w-72 md:h-72 text-[#032B53] opacity-[0.12] md:opacity-10 rotate-90" />
          <MandapIcon className="absolute bottom-[2%] -left-6 md:left-[40%] w-40 h-40 md:w-80 md:h-80 text-[#032B53] opacity-[0.12] md:opacity-10 rotate-[160deg]" />
          <DecorIcon className="absolute bottom-[10%] -right-6 md:right-[60%] w-32 h-32 md:w-36 md:h-36 text-[#032B53] opacity-[0.12] md:opacity-15 rotate-45" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-10 md:pt-24">

          {/* ╔══════════════════════════════════════════════╗
              ROW 1 — Text Left / Tall Image Right
              with secondary offset image below the text
              ╚══════════════════════════════════════════════╝ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-32">

            {/* LEFT — Text + Offset Photo */}
            <div className="lg:col-span-5">
              <TextBlock
                heading={
                  <>
                    A family
                    <br />
                    legacy
                  </>
                }
                paragraph="Established in 2005, Patel Tent & Event Management has been the trusted name behind Udaipur's most memorable celebrations. We blend premium tent architecture, refined décor, and meticulous planning — creating moments that last a lifetime."
              />

              {/* Offset secondary image */}
              <div className="relative w-[85%] md:w-[70%] mt-8 md:mt-16">
                {/* Asymmetrical Speaker Decoration */}
                <Speaker2 className="absolute bottom-0 right-0 translate-x-[45%] translate-y-[45%] w-40 h-40 md:w-72 md:h-72 pointer-events-none rotate-[15deg] z-0 opacity-60" />
                <div className="relative z-10">
                  <Photo
                    src="event/about/wedding-detail"
                    alt="Elegant wedding decor detail"
                    ratio="4/5"
                    objectPosition="center top"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Tall vertical hero image */}
            <div className="lg:col-span-7 lg:pt-8">
              <Photo
                src="event/about/mandap-hero"
                alt="Grand wedding mandap with intricate floral design"
                ratio="3/4"
                objectPosition="center"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ╔══════════════════════════════════════════════╗
              ROW 2 — Wide Image Left / Text Right
              ╚══════════════════════════════════════════════╝ */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-32">

            {/* Decorative Speaker 1 (Top Left of Image) */}
            <Speaker1 className="absolute top-0 left-0 -translate-x-[45%] -translate-y-[45%] w-32 h-32 md:w-64 md:h-64 pointer-events-none -rotate-12 z-0 opacity-60" />

            {/* LEFT — Wide landscape image */}
            <div className="lg:col-span-7 relative z-10">
              <Photo
                src="event/about/bou4dkq7ytcft3ftlofb"
                alt="Patel Tent team preparing a luxury venue"
                ratio="3/2"
                objectPosition="bottom"
                width={1000}
              />
            </div>

            {/* RIGHT — Text, offset downward for editorial rhythm */}
            <div className="lg:col-span-5 lg:pt-24 relative z-10">
              <TextBlock
                heading={
                  <>
                    An experienced
                    <br />
                    crew
                  </>
                }
                paragraph="Every celebration is shaped by a dedicated team of artisans, planners, and décor specialists who take pride in their craft. From draping to precision lighting, each detail is handled with the same care — every single time."
              />
            </div>
          </div>

          {/* ╔══════════════════════════════════════════════╗
              ROW 3 — Text Left / Grand Vertical Image Right
              ╚══════════════════════════════════════════════╝ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-12 lg:gap-20">

            {/* LEFT — Text, offset for editorial stagger */}
            <div className="lg:col-span-5 lg:pt-24">
              <TextBlock
                heading={
                  <>
                    Tailored themes
                    <br />
                    for every wedding
                  </>
                }
                paragraph="We don't just set up tents — we craft immersive environments. Whether it's an intimate garden ceremony or a grand royal reception, our bespoke themes reflect your unique story and vision."
              />
            </div>

            {/* RIGHT — Grand showcase image/video */}
            <div className="lg:col-span-7">
              <Photo
                src="event/about/themed-venue"
                alt="Themed wedding venue with luxury lighting"
                ratio="4/5"
                objectPosition="center"
                isVideo={true}
                width={800}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
