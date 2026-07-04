"use client";

import { forwardRef } from "react";

/**
 * WeddingDivider — Premium handcrafted landscape illustration.
 *
 * A continuous, asymmetric panoramic scene of a luxury Indian wedding venue.
 * Three depth layers create parallax-ready composition:
 *   BACK  → distant trees, fairy lights, rolling hills
 *   MID   → grand mandap (centre focal), tent (left), gate (right)
 *   FRONT → flowers, grass, pathway, speakers, lamps, shrubs
 *
 * Every major structure lives inside a named <g> for GSAP:
 *   #ground          → static baseline (rolling hills)
 *   #back-trees      → subtle skewX sway
 *   #palms           → wind sway via skewX
 *   #tent            → scaleY from 0.8
 *   #grand-mandap    → scaleY from 0.85, transformOrigin bottom
 *   #stage           → fade + scaleY
 *   #gate            → slideUp y +20
 *   #buffet          → slide from left
 *   #seating         → fade in
 *   #speaker         → y bounce
 *   #lights-moving   → y bounce
 *   #camera          → x arc pan
 *   #instruments     → rotation sway
 *   #umbrella        → rotation sway from base
 *   #flowers         → rotation sway
 *   #lights          → opacity pulse / glow
 *   #string-lights   → opacity twinkle
 *   #foreground      → always static (flower beds, grass, pathway)
 */
export const WeddingDivider = forwardRef<SVGSVGElement>(
  function WeddingDivider(_, ref) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full z-10 overflow-hidden leading-none"
      >
        <svg
          ref={ref}
          viewBox="0 0 2400 240"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-24 sm:h-32 md:h-auto object-cover"
        >
          <style>
            {`
              /* Cluster elements toward the center on mobile so they don't get cropped */
              @media (max-width: 1024px) {
                #instruments { transform: translateX(530px); }
                #buffet { transform: translateX(500px); }
                #camera { transform: translateX(370px); }
                #tent { transform: translateX(340px); }
                
                #gate { transform: translateX(-300px); }
                #seating { transform: translateX(-350px); }
                #umbrella { transform: translateX(-300px); }
              }
            `}
          </style>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 0 — ROLLING HILLS & GROUND (3 depth curves)  ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="ground">
            {/* --- Back hills (distant, lightest) --- */}
            <path
              d="M0,195 Q120,182 280,188 Q400,192 520,185 Q680,176 850,182
                 Q1000,188 1200,178 Q1350,172 1500,180 Q1650,188 1800,182
                 Q1950,176 2100,184 Q2250,190 2400,185 L2400,240 L0,240 Z"
              fill="#F3ECE3"
            />
            {/* --- Mid hills (rolling, medium tone) --- */}
            <path
              d="M0,205 Q100,196 200,200 Q350,206 480,198 Q600,192 750,196
                 Q900,202 1050,194 Q1200,186 1350,192 Q1500,198 1650,194
                 Q1800,190 1950,196 Q2100,202 2250,195 Q2350,190 2400,195
                 L2400,240 L0,240 Z"
              fill="#D8CCBC"
            />
            {/* --- Front ground (organic curves, warmest) --- */}
            <path
              d="M0,215 Q80,210 180,213 Q300,218 420,210 Q540,204 700,208
                 Q850,214 1000,206 Q1150,200 1300,205 Q1450,212 1600,206
                 Q1750,200 1900,208 Q2050,214 2200,208 Q2320,204 2400,210
                 L2400,240 L0,240 Z"
              fill="#E6DDD2"
            />

            {/* --- Decorative pathway (red carpet / stone path) --- */}
            <path
              d="M800,210 Q900,206 1000,204 Q1100,200 1200,198 Q1300,200 1400,204
                 Q1500,206 1600,210"
              fill="none"
              stroke="#C8BBAB"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M820,212 Q920,208 1020,206 Q1120,202 1200,200 Q1280,202 1380,206
                 Q1480,208 1580,212"
              fill="none"
              stroke="#D8CCBC"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* --- Decorative fencing (low fence dots) --- */}
            <g opacity="0.3">
              <circle cx="720" cy="208" r="1.2" fill="#A67C52" />
              <circle cx="735" cy="207" r="1.2" fill="#A67C52" />
              <circle cx="750" cy="206" r="1.2" fill="#A67C52" />
              <line x1="720" y1="208" x2="750" y2="206" stroke="#A67C52" strokeWidth="0.5" />
              <circle cx="1650" cy="207" r="1.2" fill="#A67C52" />
              <circle cx="1665" cy="208" r="1.2" fill="#A67C52" />
              <circle cx="1680" cy="209" r="1.2" fill="#A67C52" />
              <line x1="1650" y1="207" x2="1680" y2="209" stroke="#A67C52" strokeWidth="0.5" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 1 — BACK TREES (distant, smaller, muted)     ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="back-trees">
            {/* Distant tree cluster (far left) */}
            <g opacity="0.7">
              <rect x="58" y="168" width="4" height="27" rx="1.5" fill="#7A5A42" />
              <ellipse cx="60" cy="170" rx="14" ry="12" fill="#4F7C4D" />
              <ellipse cx="63" cy="167" rx="10" ry="9" fill="#6F995E" />
              <ellipse cx="58" cy="164" rx="7" ry="6" fill="#8FB07A" />
            </g>
            {/* Distant tree 2 */}
            <g opacity="0.65">
              <rect x="135" y="174" width="3.5" height="22" rx="1.5" fill="#7A5A42" />
              <ellipse cx="137" cy="176" rx="12" ry="10" fill="#4F7C4D" />
              <ellipse cx="139" cy="173" rx="9" ry="8" fill="#6F995E" />
              <ellipse cx="136" cy="171" rx="6" ry="5" fill="#8FB07A" />
            </g>
            {/* Distant shrub cluster (behind tent area) */}
            <g opacity="0.6">
              <ellipse cx="480" cy="192" rx="18" ry="8" fill="#4F7C4D" />
              <ellipse cx="495" cy="190" rx="14" ry="7" fill="#6F995E" />
              <ellipse cx="470" cy="191" rx="10" ry="5" fill="#8FB07A" />
            </g>
            {/* Distant trees behind mandap */}
            <g opacity="0.5">
              <rect x="1050" y="170" width="4" height="22" rx="1.5" fill="#7A5A42" />
              <ellipse cx="1052" cy="172" rx="13" ry="11" fill="#4F7C4D" />
              <ellipse cx="1055" cy="169" rx="9" ry="8" fill="#6F995E" />
            </g>
            <g opacity="0.5">
              <rect x="1340" y="172" width="3.5" height="20" rx="1.5" fill="#7A5A42" />
              <ellipse cx="1342" cy="174" rx="11" ry="10" fill="#4F7C4D" />
              <ellipse cx="1344" cy="171" rx="8" ry="7" fill="#6F995E" />
            </g>
            {/* Distant shrubs (right side) */}
            <g opacity="0.6">
              <ellipse cx="1960" cy="192" rx="16" ry="7" fill="#4F7C4D" />
              <ellipse cx="1975" cy="190" rx="12" ry="6" fill="#6F995E" />
            </g>
            {/* Far right distant tree */}
            <g opacity="0.6">
              <rect x="2340" y="175" width="3.5" height="20" rx="1.5" fill="#7A5A42" />
              <ellipse cx="2342" cy="177" rx="11" ry="9" fill="#4F7C4D" />
              <ellipse cx="2344" cy="174" rx="8" ry="7" fill="#6F995E" />
              <ellipse cx="2341" cy="172" rx="5" ry="4" fill="#8FB07A" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 2 — PALM TREES (tall, overlapping layers)    ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="palms">
            {/* ── Palm 1 (left, tall) ── */}
            <g>
              <path d="M42,210 Q41,185 40,160 Q39,140 40,120 Q41,108 42,100" fill="#7A5A42" strokeWidth="4" stroke="#7A5A42" strokeLinecap="round" />
              <path d="M43,200 Q42,178 41,158 Q40,140 41,125" fill="none" stroke="#A17855" strokeWidth="1.5" opacity="0.4" />
              {/* Trunk segments */}
              <line x1="39" y1="170" x2="45" y2="169" stroke="#6D4C41" strokeWidth="0.7" />
              <line x1="39" y1="150" x2="45" y2="149" stroke="#6D4C41" strokeWidth="0.7" />
              <line x1="39" y1="135" x2="45" y2="134" stroke="#6D4C41" strokeWidth="0.7" />
              {/* Fronds */}
              <path d="M42,100 Q25,88 5,82 Q20,85 35,94 Z" fill="#556B2F" />
              <path d="M42,100 Q58,85 78,80 Q65,86 50,96 Z" fill="#556B2F" />
              <path d="M42,100 Q22,80 10,65 Q22,74 38,92 Z" fill="#6E8B3D" />
              <path d="M42,100 Q60,78 75,65 Q65,78 48,94 Z" fill="#6E8B3D" />
              <path d="M42,100 Q35,82 22,72 Q32,80 40,95 Z" fill="#8AAE55" />
              <path d="M42,100 Q50,80 65,74 Q56,82 44,96 Z" fill="#8AAE55" />
              <path d="M42,100 Q42,82 40,68 Q44,80 43,95 Z" fill="#6E8B3D" />
            </g>

            {/* ── Palm 2 (between tent and mandap, medium height) ── */}
            <g>
              <path d="M770,208 Q769,188 768,168 Q767,152 768,138 Q769,128 770,122" fill="#7A5A42" strokeWidth="3.5" stroke="#7A5A42" strokeLinecap="round" />
              <path d="M771,200 Q770,182 769,165 Q768,152 769,142" fill="none" stroke="#A17855" strokeWidth="1.2" opacity="0.4" />
              <line x1="767" y1="185" x2="773" y2="184" stroke="#6D4C41" strokeWidth="0.6" />
              <line x1="767" y1="168" x2="773" y2="167" stroke="#6D4C41" strokeWidth="0.6" />
              <path d="M770,122 Q755,112 738,108 Q750,110 762,118 Z" fill="#556B2F" />
              <path d="M770,122 Q784,110 800,106 Q790,112 778,120 Z" fill="#556B2F" />
              <path d="M770,122 Q752,106 742,94 Q752,100 766,116 Z" fill="#6E8B3D" />
              <path d="M770,122 Q786,104 798,92 Q790,104 774,118 Z" fill="#6E8B3D" />
              <path d="M770,122 Q762,108 750,100 Q758,106 768,118 Z" fill="#8AAE55" />
              <path d="M770,122 Q778,106 790,100 Q782,108 772,120 Z" fill="#8AAE55" />
            </g>

            {/* ── Palm 3 (right side, tall) ── */}
            <g>
              <path d="M2180,206 Q2179,180 2178,156 Q2177,138 2178,120 Q2179,110 2180,104" fill="#7A5A42" strokeWidth="3.5" stroke="#7A5A42" strokeLinecap="round" />
              <path d="M2181,198 Q2180,175 2179,155 Q2178,140 2179,128" fill="none" stroke="#A17855" strokeWidth="1.2" opacity="0.4" />
              <line x1="2177" y1="178" x2="2183" y2="177" stroke="#6D4C41" strokeWidth="0.6" />
              <line x1="2177" y1="158" x2="2183" y2="157" stroke="#6D4C41" strokeWidth="0.6" />
              <line x1="2177" y1="140" x2="2183" y2="139" stroke="#6D4C41" strokeWidth="0.6" />
              <path d="M2180,104 Q2164,92 2148,88 Q2160,90 2172,98 Z" fill="#556B2F" />
              <path d="M2180,104 Q2196,90 2212,86 Q2200,92 2188,100 Z" fill="#556B2F" />
              <path d="M2180,104 Q2162,86 2150,74 Q2160,80 2176,98 Z" fill="#6E8B3D" />
              <path d="M2180,104 Q2198,84 2210,72 Q2202,84 2184,100 Z" fill="#6E8B3D" />
              <path d="M2180,104 Q2172,88 2160,80 Q2168,86 2178,100 Z" fill="#8AAE55" />
              <path d="M2180,104 Q2190,86 2202,80 Q2194,88 2182,102 Z" fill="#8AAE55" />
            </g>

            {/* ── Palm 4 (far right edge) ── */}
            <g>
              <path d="M2370,208 Q2369,186 2368,164 Q2367,148 2368,134 Q2369,126 2370,120" fill="#7A5A42" strokeWidth="3" stroke="#7A5A42" strokeLinecap="round" />
              <line x1="2367" y1="180" x2="2373" y2="179" stroke="#6D4C41" strokeWidth="0.6" />
              <line x1="2367" y1="162" x2="2373" y2="161" stroke="#6D4C41" strokeWidth="0.6" />
              <path d="M2370,120 Q2356,110 2342,106 Q2354,108 2364,114 Z" fill="#556B2F" />
              <path d="M2370,120 Q2384,108 2398,104 Q2388,110 2376,118 Z" fill="#556B2F" />
              <path d="M2370,120 Q2354,104 2344,92 Q2354,98 2366,114 Z" fill="#6E8B3D" />
              <path d="M2370,120 Q2386,102 2396,90 Q2388,102 2374,116 Z" fill="#6E8B3D" />
              <path d="M2370,120 Q2362,106 2350,98 Q2358,104 2368,116 Z" fill="#8AAE55" />
              <path d="M2370,120 Q2380,104 2390,98 Q2384,106 2372,118 Z" fill="#8AAE55" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 3a — EVENT TENT (left of centre)             ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="tent">
            {/* Shadow */}
            <ellipse cx="540" cy="208" rx="75" ry="5" fill="#C8BBAB" opacity="0.25" />
            {/* Outer tent shell */}
            <path
              d="M460,210 L475,148 Q490,118 520,100 Q535,92 545,88
                 Q555,92 570,100 Q600,118 615,148 L630,210 Z"
              fill="#E8DED0"
            />
            {/* Front fabric face */}
            <path
              d="M478,210 L490,155 Q505,128 530,110 Q545,102 545,102
                 Q545,102 560,110 Q585,128 600,155 L612,210 Z"
              fill="#F6F2EA"
            />
            {/* Inner tent highlight */}
            <path
              d="M498,210 L505,165 Q520,140 540,128 Q545,126 550,128
                 Q570,140 585,165 L592,210 Z"
              fill="#F7F3EC"
            />
            {/* Support poles */}
            <rect x="473" y="148" width="3.5" height="64" fill="#8D6E63" />
            <rect x="474" y="150" width="1.5" height="60" fill="#A67C52" opacity="0.4" />
            <rect x="613" y="148" width="3.5" height="64" fill="#8D6E63" />
            <rect x="614" y="150" width="1.5" height="60" fill="#A67C52" opacity="0.4" />
            {/* Centre pole */}
            <rect x="543" y="88" width="4" height="124" fill="#7A5A42" />
            <rect x="544" y="92" width="1.8" height="118" fill="#A67C52" opacity="0.35" />
            {/* Finial */}
            <path d="M543,88 L545,76 L547,88 Z" fill="#C8A24D" />
            <circle cx="545" cy="74" r="2.8" fill="#C8A24D" />
            {/* Scalloped drape edge */}
            <path
              d="M475,148 Q490,142 505,148 Q520,142 535,148 Q550,142 565,148
                 Q580,142 595,148 Q610,142 615,148"
              fill="none"
              stroke="#E9DDD0"
              strokeWidth="2.5"
              opacity="0.7"
            />
            {/* Side drape panels */}
            <path d="M460,210 L475,148 L485,210 Z" fill="#F5EFE4" opacity="0.5" />
            <path d="M605,210 L615,148 L630,210 Z" fill="#F5EFE4" opacity="0.5" />
          </g>

          {/* ╔══════════════════════════════════════════════════════════════╗
              ║  LAYER 3b — ★ GRAND MANDAP (center focal point, largest)  ║
              ╚══════════════════════════════════════════════════════════════╝ */}
          <g id="grand-mandap">
            {/* Ground shadow */}
            <ellipse cx="1200" cy="205" rx="110" ry="6" fill="#C8BBAB" opacity="0.25" />

            {/* ── Base platform (two-tier) ── */}
            <rect x="1095" y="195" width="210" height="12" rx="2" fill="#A67C52" />
            <rect x="1098" y="195" width="204" height="4" rx="1.5" fill="#C8A24D" />
            <rect x="1105" y="190" width="190" height="8" rx="2" fill="#8A6546" />
            <rect x="1108" y="190" width="184" height="3" rx="1" fill="#A67C52" opacity="0.6" />

            {/* ── Carpet on platform ── */}
            <rect x="1130" y="193" width="140" height="5" rx="1" fill="#9B3B3B" opacity="0.25" />
            <rect x="1135" y="194" width="130" height="3" rx="0.5" fill="#C85050" opacity="0.15" />

            {/* ── Main pillars (4 pillars, slightly different heights) ── */}
            {/* Pillar 1 (outer left) */}
            <rect x="1108" y="100" width="8" height="90" rx="2" fill="#6E4E37" />
            <rect x="1109.5" y="104" width="3" height="82" fill="#A67C52" opacity="0.45" />
            {/* Pillar base */}
            <rect x="1105" y="186" width="14" height="6" rx="1" fill="#8D6E63" />
            {/* Pillar cap */}
            <rect x="1105" y="97" width="14" height="5" rx="1.5" fill="#C8A24D" />

            {/* Pillar 2 (inner left) */}
            <rect x="1155" y="105" width="7" height="85" rx="2" fill="#6E4E37" />
            <rect x="1156.5" y="108" width="2.5" height="78" fill="#A67C52" opacity="0.45" />
            <rect x="1152" y="186" width="13" height="6" rx="1" fill="#8D6E63" />
            <rect x="1152" y="102" width="13" height="5" rx="1.5" fill="#C8A24D" />

            {/* Pillar 3 (inner right) */}
            <rect x="1238" y="105" width="7" height="85" rx="2" fill="#6E4E37" />
            <rect x="1239.5" y="108" width="2.5" height="78" fill="#A67C52" opacity="0.45" />
            <rect x="1235" y="186" width="13" height="6" rx="1" fill="#8D6E63" />
            <rect x="1235" y="102" width="13" height="5" rx="1.5" fill="#C8A24D" />

            {/* Pillar 4 (outer right) */}
            <rect x="1284" y="100" width="8" height="90" rx="2" fill="#6E4E37" />
            <rect x="1285.5" y="104" width="3" height="82" fill="#A67C52" opacity="0.45" />
            <rect x="1281" y="186" width="14" height="6" rx="1" fill="#8D6E63" />
            <rect x="1281" y="97" width="14" height="5" rx="1.5" fill="#C8A24D" />

            {/* ── Grand roof structure ── */}
            {/* Outer roof */}
            <path
              d="M1090,102 L1105,72 Q1140,48 1200,38 Q1260,48 1295,72 L1310,102 Z"
              fill="#F7F3EC"
            />
            {/* Inner roof highlight */}
            <path
              d="M1098,102 L1112,76 Q1145,55 1200,46 Q1255,55 1288,76 L1302,102 Z"
              fill="#FAF7F2"
            />
            {/* Golden roof borders */}
            <path d="M1090,102 L1310,102" stroke="#C8A24D" strokeWidth="3" fill="none" />
            <path d="M1105,72 L1295,72" stroke="#C8A24D" strokeWidth="2" fill="none" />
            <path d="M1140,50 L1260,50" stroke="#C8A24D" strokeWidth="1.5" fill="none" />

            {/* ── Grand finial (kalash) ── */}
            <path d="M1197,38 L1200,20 L1203,38 Z" fill="#C8A24D" />
            <circle cx="1200" cy="18" r="3.5" fill="#C8A24D" />
            <circle cx="1200" cy="18" r="2" fill="#D8A84A" />

            {/* ── Fabric drapes between pillars ── */}
            <path d="M1116,102 Q1135,118 1155,102" fill="#F5EFE4" opacity="0.7" />
            <path d="M1162,102 Q1200,125 1238,102" fill="#F5EFE4" opacity="0.6" />
            <path d="M1245,102 Q1265,118 1284,102" fill="#F5EFE4" opacity="0.7" />

            {/* ── Side drape panels (flowing fabric) ── */}
            <path d="M1090,102 Q1085,140 1095,190" fill="none" stroke="#E9DDD0" strokeWidth="3" opacity="0.4" />
            <path d="M1310,102 Q1315,140 1305,190" fill="none" stroke="#E9DDD0" strokeWidth="3" opacity="0.4" />

            {/* ── Marigold garlands on pillars ── */}
            <path d="M1108,110 Q1102,118 1108,126 Q1102,134 1108,142 Q1102,150 1108,158 Q1102,166 1108,174" fill="none" stroke="#D8A84A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M1292,110 Q1298,118 1292,126 Q1298,134 1292,142 Q1298,150 1292,158 Q1298,166 1292,174" fill="none" stroke="#D8A84A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Inner pillar garlands (shorter) */}
            <path d="M1155,112 Q1150,120 1155,128 Q1150,136 1155,144" fill="none" stroke="#D8A84A" strokeWidth="2" strokeLinecap="round" />
            <path d="M1245,112 Q1250,120 1245,128 Q1250,136 1245,144" fill="none" stroke="#D8A84A" strokeWidth="2" strokeLinecap="round" />

            {/* ── Floral decorations on roof ── */}
            <circle cx="1150" cy="72" r="4" fill="#E9B8B8" />
            <circle cx="1200" cy="62" r="5" fill="#E6B4B8" />
            <circle cx="1250" cy="72" r="4" fill="#E9B8B8" />
            <circle cx="1175" cy="68" r="3.5" fill="#D8A84A" />
            <circle cx="1225" cy="68" r="3.5" fill="#D8A84A" />
            <circle cx="1140" cy="76" r="3" fill="#FAFAF7" />
            <circle cx="1260" cy="76" r="3" fill="#FAFAF7" />
            <circle cx="1160" cy="65" r="2.5" fill="#F2C6A8" />
            <circle cx="1240" cy="65" r="2.5" fill="#F2C6A8" />
            {/* Leaves on roof */}
            <ellipse cx="1145" cy="78" rx="5" ry="2" transform="rotate(-10 1145 78)" fill="#6E8B55" opacity="0.7" />
            <ellipse cx="1255" cy="78" rx="5" ry="2" transform="rotate(10 1255 78)" fill="#6E8B55" opacity="0.7" />
            <ellipse cx="1185" cy="64" rx="4" ry="1.5" transform="rotate(-5 1185 64)" fill="#6E8B55" opacity="0.6" />
            <ellipse cx="1215" cy="64" rx="4" ry="1.5" transform="rotate(5 1215 64)" fill="#6E8B55" opacity="0.6" />

            {/* ── Hanging chandelier (centre of mandap) ── */}
            <line x1="1200" y1="48" x2="1200" y2="62" stroke="#B8893C" strokeWidth="0.8" />
            <path d="M1190,68 Q1190,60 1200,58 Q1210,60 1210,68 Z" fill="#B8893C" />
            <path d="M1192,68 Q1192,62 1200,60 Q1208,62 1208,68 Z" fill="#C9A35A" />
            <path d="M1193,68 L1194,80 Q1197,86 1200,86 Q1203,86 1206,80 L1207,68 Z" fill="#FFF4D8" opacity="0.75" />
            <ellipse cx="1200" cy="74" rx="6" ry="5" fill="#FFF2C8" opacity="0.15" />
            <path d="M1199,86 L1200,91 L1201,86 Z" fill="#B8893C" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 3c — STAGE (behind mandap, LED screen)       ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="stage">
            {/* LED screen backdrop (partially visible behind mandap) */}
            <rect x="1135" y="105" width="130" height="45" rx="3" fill="#1E1E1E" opacity="0.3" />
            <rect x="1140" y="108" width="120" height="39" rx="2" fill="#2A2A2A" opacity="0.25" />
            <rect x="1145" y="111" width="110" height="33" rx="1.5" fill="#344050" opacity="0.15" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 3d — FLORAL ENTRANCE GATE (right of centre)  ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="gate">
            <ellipse cx="1780" cy="206" rx="40" ry="3" fill="#C8BBAB" opacity="0.2" />
            {/* Gate pillars */}
            <rect x="1748" y="108" width="8" height="100" rx="2" fill="#6E4E37" />
            <rect x="1749.5" y="112" width="3" height="94" fill="#A67C52" opacity="0.45" />
            <rect x="1804" y="108" width="8" height="100" rx="2" fill="#6E4E37" />
            <rect x="1805.5" y="112" width="3" height="94" fill="#A67C52" opacity="0.45" />
            {/* Pillar bases */}
            <rect x="1745" y="204" width="14" height="5" rx="1" fill="#8D6E63" />
            <rect x="1801" y="204" width="14" height="5" rx="1" fill="#8D6E63" />
            {/* Arch structure */}
            <path d="M1748,112 Q1755,78 1780,68 Q1805,78 1812,112" fill="#F5EFE4" />
            <path d="M1753,112 Q1760,84 1780,76 Q1800,84 1807,112" fill="#F7F3EC" />
            {/* Arch golden trim */}
            <path d="M1748,112 Q1755,78 1780,68 Q1805,78 1812,112" fill="none" stroke="#C8A24D" strokeWidth="1.5" />
            {/* Dense floral decoration on arch */}
            <path d="M1748,112 Q1755,78 1780,68 Q1805,78 1812,112" fill="none" stroke="#E9B8B8" strokeWidth="8" opacity="0.5" />
            {/* Individual arch flowers */}
            <circle cx="1756" cy="105" r="3.5" fill="#E6B4B8" />
            <circle cx="1764" cy="92" r="4" fill="#F2C6A8" />
            <circle cx="1772" cy="80" r="3.5" fill="#FAFAF7" />
            <circle cx="1780" cy="72" r="4.5" fill="#D6A53F" />
            <circle cx="1788" cy="80" r="3.5" fill="#E6B4B8" />
            <circle cx="1796" cy="92" r="4" fill="#F2C6A8" />
            <circle cx="1804" cy="105" r="3.5" fill="#FAFAF7" />
            {/* Arch leaves */}
            <ellipse cx="1760" cy="98" rx="5" ry="2" transform="rotate(-20 1760 98)" fill="#6E8B55" />
            <ellipse cx="1800" cy="98" rx="5" ry="2" transform="rotate(20 1800 98)" fill="#6E8B55" />
            <ellipse cx="1768" cy="86" rx="4" ry="1.8" transform="rotate(-12 1768 86)" fill="#6E8B55" />
            <ellipse cx="1792" cy="86" rx="4" ry="1.8" transform="rotate(12 1792 86)" fill="#6E8B55" />
            {/* Marigold garlands hanging from gate */}
            <path d="M1752,120 Q1746,128 1752,136 Q1746,144 1752,152 Q1746,160 1752,168" fill="none" stroke="#D8A84A" strokeWidth="2" strokeLinecap="round" />
            <path d="M1808,120 Q1814,128 1808,136 Q1814,144 1808,152 Q1814,160 1808,168" fill="none" stroke="#D8A84A" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 4 — BUFFET AREA (left side)                  ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="buffet">
            {/* Counter body */}
            <rect x="230" y="190" width="100" height="20" rx="2" fill="#9B7452" />
            <rect x="230" y="190" width="100" height="5" rx="1.5" fill="#A67C52" />
            <rect x="230" y="190" width="18" height="20" rx="2" fill="#7A5A42" opacity="0.3" />
            {/* Food domes */}
            <path d="M248,190 Q248,180 258,180 Q268,180 268,190 Z" fill="#B5B5B5" opacity="0.55" />
            <circle cx="258" cy="179" r="1.2" fill="#8B8B8B" />
            <path d="M278,190 Q278,182 286,182 Q294,182 294,190 Z" fill="#B5B5B5" opacity="0.55" />
            <circle cx="286" cy="181" r="1.2" fill="#8B8B8B" />
            <path d="M304,190 Q304,181 312,181 Q320,181 320,190 Z" fill="#B5B5B5" opacity="0.55" />
            <circle cx="312" cy="180" r="1.2" fill="#8B8B8B" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 4b — SEATING AREA (right side)               ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="seating">
            {/* ── Table 1 ── */}
            <ellipse cx="1920" cy="195" rx="22" ry="4" fill="#F8F6F0" />
            <ellipse cx="1920" cy="194" rx="20" ry="3" fill="#FAF7F2" />
            <rect x="1918" y="197" width="4" height="12" fill="#8A6546" />
            <rect x="1919" y="198" width="1.8" height="10" fill="#A67C52" opacity="0.4" />
            {/* Centrepiece */}
            <circle cx="1920" cy="193" r="2.5" fill="#D6A53F" />
            <circle cx="1917" cy="192" r="1.5" fill="#E6B4B8" />
            <circle cx="1923" cy="192" r="1.5" fill="#FAFAF7" />
            {/* Chairs */}
            <rect x="1898" y="193" width="6" height="16" rx="1" fill="#EFE7DD" />
            <rect x="1898" y="188" width="6" height="7" rx="1" fill="#EFE7DD" />
            <rect x="1897" y="188" width="1.5" height="21" fill="#7A5A42" opacity="0.5" />
            <rect x="1936" y="193" width="6" height="16" rx="1" fill="#EFE7DD" />
            <rect x="1936" y="188" width="6" height="7" rx="1" fill="#EFE7DD" />
            <rect x="1941" y="188" width="1.5" height="21" fill="#7A5A42" opacity="0.5" />

            {/* ── Table 2 (smaller, behind) ── */}
            <ellipse cx="2020" cy="198" rx="16" ry="3" fill="#F8F6F0" opacity="0.8" />
            <rect x="2018" y="200" width="3.5" height="10" fill="#8A6546" />
            <circle cx="2020" cy="197" r="2" fill="#E6B4B8" />
            {/* Single chair */}
            <rect x="2036" y="196" width="5" height="14" rx="1" fill="#EFE7DD" />
            <rect x="2036" y="192" width="5" height="6" rx="1" fill="#EFE7DD" />
            <rect x="2040" y="192" width="1.3" height="18" fill="#7A5A42" opacity="0.5" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 5 — SPEAKERS (small, near stage areas)       ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="speaker">
            {/* Line array (left of mandap) */}
            <g>
              <rect x="1060" y="172" width="3" height="32" fill="#8B8B8B" />
              <rect x="1056" y="202" width="11" height="3" rx="1" fill="#666666" />
              <rect x="1052" y="140" width="18" height="34" rx="2" fill="#2A2A2A" />
              <rect x="1052" y="140" width="5" height="34" rx="2" fill="#171717" opacity="0.35" />
              <rect x="1055" y="144" width="12" height="4" rx="1" fill="#424242" />
              <rect x="1055" y="150" width="12" height="4" rx="1" fill="#424242" />
              <rect x="1055" y="156" width="12" height="4" rx="1" fill="#424242" />
              <rect x="1055" y="162" width="12" height="4" rx="1" fill="#424242" />
              <rect x="1055" y="168" width="12" height="4" rx="1" fill="#424242" />
              <rect x="1067" y="142" width="1.5" height="30" fill="#575757" opacity="0.4" />
            </g>
            {/* DJ sub (left of tent) */}
            <g>
              <rect x="440" y="194" width="15" height="18" rx="2" fill="#2A2A2A" />
              <rect x="440" y="194" width="4" height="18" rx="2" fill="#171717" opacity="0.35" />
              <rect x="443" y="197" width="9" height="3.5" rx="1" fill="#424242" />
              <rect x="443" y="202" width="9" height="3.5" rx="1" fill="#424242" />
              <rect x="443" y="207" width="9" height="3.5" rx="1" fill="#424242" />
            </g>
            {/* Small monitor speaker (right of mandap) */}
            <g>
              <rect x="1330" y="192" width="12" height="15" rx="2" fill="#2A2A2A" />
              <rect x="1330" y="192" width="3.5" height="15" rx="2" fill="#171717" opacity="0.35" />
              <rect x="1332" y="195" width="8" height="3" rx="0.5" fill="#424242" />
              <rect x="1332" y="200" width="8" height="3" rx="0.5" fill="#424242" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 5b — MOVING HEAD LIGHTS                      ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="lights-moving">
            {/* Light 1 (left of mandap) */}
            <g>
              <rect x="1080" y="160" width="2.5" height="44" fill="#8B8B8B" />
              <rect x="1076" y="202" width="10" height="3" rx="1" fill="#666666" />
              <rect x="1076" y="148" width="10" height="4" rx="1" fill="#B5B5B5" />
              <path d="M1074,148 L1076,134 Q1078,126 1081,126 Q1084,126 1086,134 L1088,148 Z" fill="#444444" />
              <ellipse cx="1081" cy="130" rx="4" ry="3.5" fill="#87A3B8" />
              <ellipse cx="1081" cy="130" rx="2.5" ry="2" fill="#87A3B8" opacity="0.5" />
            </g>
            {/* Light 2 (right of mandap) */}
            <g>
              <rect x="1315" y="158" width="2.5" height="46" fill="#8B8B8B" />
              <rect x="1311" y="202" width="10" height="3" rx="1" fill="#666666" />
              <rect x="1311" y="146" width="10" height="4" rx="1" fill="#B5B5B5" />
              <path d="M1309,146 L1311,132 Q1313,124 1316,124 Q1319,124 1321,132 L1323,146 Z" fill="#444444" />
              <ellipse cx="1316" cy="128" rx="4" ry="3.5" fill="#87A3B8" />
              <ellipse cx="1316" cy="128" rx="2.5" ry="2" fill="#87A3B8" opacity="0.5" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 6 — CAMERA CRANE + PHOTOGRAPHER              ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="camera">
            {/* Photographer (right of gate) */}
            <g>
              <path d="M1855,208 L1851,208 L1848,196 L1847,186 L1849,178 L1853,174 L1859,174 L1863,178 L1865,186 L1864,196 L1861,208 Z" fill="#3D3D3D" />
              <circle cx="1856" cy="169" r="5" fill="#3D3D3D" />
              <rect x="1863" y="180" width="10" height="6" rx="1" fill="#3D3D3D" />
              <rect x="1871" y="178" width="5" height="5" rx="1" fill="#1E1E1E" />
              <circle cx="1874" cy="181" r="2" fill="#1E1E1E" />
              <circle cx="1874" cy="181" r="1" fill="#87A3B8" opacity="0.35" />
            </g>

            {/* Camera crane (left side of scene) */}
            <g>
              <path d="M390,210 L387,210 L385,202 L392,202 L390,210 Z" fill="#666666" />
              <path d="M397,210 L394,210 L392,202 L399,202 L397,210 Z" fill="#666666" />
              <rect x="390" y="150" width="3" height="58" fill="#8B8B8B" />
              <path d="M393,152 L420,138 L422,141 L393,156 Z" fill="#666666" />
              <rect x="382" y="148" width="10" height="5" rx="1" fill="#444444" />
              <rect x="417" y="133" width="9" height="7" rx="1.5" fill="#3D3D3D" />
              <rect x="424" y="131" width="5" height="5" rx="1" fill="#1E1E1E" />
              <circle cx="427" cy="134" r="2.2" fill="#1E1E1E" />
              <circle cx="427" cy="134" r="1.2" fill="#87A3B8" opacity="0.3" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 6b — INSTRUMENTS (left area, near buffet)    ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="instruments">
            {/* Dhol */}
            <g>
              <ellipse cx="185" cy="204" rx="8" ry="5" fill="#A67C52" />
              <rect x="177" y="194" width="16" height="10" rx="2" fill="#8A6546" />
              <ellipse cx="185" cy="194" rx="8" ry="5" fill="#C8B08C" />
              <ellipse cx="185" cy="194" rx="5" ry="3" fill="#F5EFE4" />
              <path d="M179,192 Q185,182 191,192" fill="none" stroke="#5D4037" strokeWidth="1" />
            </g>
            {/* Shehnai */}
            <g>
              <path d="M155,210 L157,200 L158,192 Q160,182 165,180 L170,180 Q172,182 172,190 L172,198 L170,210 Z" fill="#C8A24D" />
              <path d="M165,180 L166,172 L168,167 L170,172 L171,180 Z" fill="#8A6546" />
              <ellipse cx="168" cy="167" rx="3" ry="1.5" fill="#C8A24D" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 7 — WEDDING UMBRELLAS                        ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="umbrella">
            {/* Umbrella 1 (near gate) */}
            <g>
              <rect x="1700" y="120" width="2" height="88" fill="#7A5A42" />
              <rect x="1700.5" y="125" width="1" height="80" fill="#A17855" opacity="0.35" />
              <path d="M1680,122 Q1686,98 1701,92 Q1716,98 1722,122 Z" fill="#E9DDD0" />
              <path d="M1683,122 Q1690,102 1701,96 Q1712,102 1719,122 Z" fill="#F5EFE4" />
              <path d="M1680,122 Q1685,127 1690,122 Q1695,127 1701,122 Q1706,127 1711,122 Q1716,127 1722,122" fill="none" stroke="#E9DDD0" strokeWidth="1.5" />
              <circle cx="1701" cy="90" r="2.2" fill="#C8A24D" />
              <path d="M1682,123 L1681,127" stroke="#D8A84A" strokeWidth="0.7" />
              <path d="M1720,123 L1719,127" stroke="#D8A84A" strokeWidth="0.7" />
            </g>
            {/* Umbrella 2 (right section) */}
            <g>
              <rect x="2100" y="130" width="2" height="78" fill="#7A5A42" />
              <rect x="2100.5" y="134" width="1" height="72" fill="#A17855" opacity="0.35" />
              <path d="M2082,132 Q2088,110 2101,105 Q2114,110 2120,132 Z" fill="#E9DDD0" />
              <path d="M2085,132 Q2092,114 2101,109 Q2110,114 2117,132 Z" fill="#F5EFE4" />
              <path d="M2082,132 Q2087,137 2092,132 Q2097,137 2101,132 Q2106,137 2111,132 Q2116,137 2120,132" fill="none" stroke="#E9DDD0" strokeWidth="1.5" />
              <circle cx="2101" cy="103" r="2.2" fill="#C8A24D" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 8 — LANTERNS + CHANDELIERS                   ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="lights">
            {/* Lantern 1 (left area) */}
            <g>
              <line x1="130" y1="168" x2="130" y2="176" stroke="#5B4633" strokeWidth="0.6" />
              <rect x="126" y="176" width="8" height="12" rx="1.5" fill="#B8893C" />
              <rect x="127.5" y="178" width="5" height="8" rx="1" fill="#FFF4D8" opacity="0.75" />
              <ellipse cx="130" cy="182" rx="3" ry="4" fill="#FFF2C8" opacity="0.12" />
              <path d="M126,176 L130,173 L134,176 Z" fill="#B8893C" />
            </g>
            {/* Lantern 2 (near gate) */}
            <g>
              <line x1="1740" y1="140" x2="1740" y2="148" stroke="#5B4633" strokeWidth="0.6" />
              <rect x="1736" y="148" width="8" height="12" rx="1.5" fill="#B8893C" />
              <rect x="1737.5" y="150" width="5" height="8" rx="1" fill="#FFF4D8" opacity="0.75" />
              <ellipse cx="1740" cy="154" rx="3" ry="4" fill="#FFF2C8" opacity="0.12" />
              <path d="M1736,148 L1740,145 L1744,148 Z" fill="#B8893C" />
            </g>
            {/* Lantern 3 (right area) */}
            <g>
              <line x1="2060" y1="150" x2="2060" y2="158" stroke="#5B4633" strokeWidth="0.6" />
              <rect x="2056" y="158" width="8" height="12" rx="1.5" fill="#B8893C" />
              <rect x="2057.5" y="160" width="5" height="8" rx="1" fill="#FFF4D8" opacity="0.75" />
              <ellipse cx="2060" cy="164" rx="3" ry="4" fill="#FFF2C8" opacity="0.12" />
              <path d="M2056,158 L2060,155 L2064,158 Z" fill="#B8893C" />
            </g>

            {/* Chandelier (above tent) */}
            <g>
              <line x1="545" y1="68" x2="545" y2="78" stroke="#B8893C" strokeWidth="0.7" />
              <path d="M538,82 Q538,76 545,74 Q552,76 552,82 Z" fill="#B8893C" />
              <path d="M540,82 Q540,78 545,76 Q550,78 550,82 Z" fill="#C9A35A" />
              <path d="M541,82 L542,90 Q544,94 545,94 Q546,94 548,90 L549,82 Z" fill="#FFF4D8" opacity="0.7" />
              <ellipse cx="545" cy="86" rx="4" ry="3" fill="#FFF2C8" opacity="0.12" />
            </g>
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 9 — STRING / FAIRY LIGHTS                    ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="string-lights">
            {/* String across tent */}
            <path
              d="M475,145 Q500,152 520,148 Q535,144 545,140 Q555,144 570,148 Q590,152 615,145"
              fill="none" stroke="#5B4633" strokeWidth="0.5"
            />
            <circle cx="492" cy="150" r="1.5" fill="#FFF2C8" />
            <circle cx="510" cy="149" r="1.5" fill="#FFF2C8" />
            <circle cx="528" cy="146" r="1.5" fill="#FFF2C8" />
            <circle cx="545" cy="142" r="1.5" fill="#FFF2C8" />
            <circle cx="562" cy="146" r="1.5" fill="#FFF2C8" />
            <circle cx="580" cy="149" r="1.5" fill="#FFF2C8" />
            <circle cx="598" cy="148" r="1.5" fill="#FFF2C8" />
            {/* Glow halos */}
            <circle cx="510" cy="149" r="3" fill="#FFF4D6" opacity="0.08" />
            <circle cx="545" cy="142" r="3.5" fill="#FFF4D6" opacity="0.08" />
            <circle cx="580" cy="149" r="3" fill="#FFF4D6" opacity="0.08" />

            {/* String across mandap (wide drape) */}
            <path
              d="M1095,98 Q1120,108 1150,104 Q1175,100 1200,96 Q1225,100 1250,104
                 Q1280,108 1305,98"
              fill="none" stroke="#5B4633" strokeWidth="0.5"
            />
            <circle cx="1115" cy="106" r="1.3" fill="#FFF2C8" />
            <circle cx="1140" cy="103" r="1.3" fill="#FFF2C8" />
            <circle cx="1165" cy="100" r="1.3" fill="#FFF2C8" />
            <circle cx="1200" cy="97" r="1.3" fill="#FFF2C8" />
            <circle cx="1235" cy="100" r="1.3" fill="#FFF2C8" />
            <circle cx="1260" cy="103" r="1.3" fill="#FFF2C8" />
            <circle cx="1285" cy="106" r="1.3" fill="#FFF2C8" />

            {/* String between mandap and gate (long drape) */}
            <path
              d="M1310,102 Q1400,120 1500,115 Q1600,110 1700,112 Q1740,115 1750,112"
              fill="none" stroke="#5B4633" strokeWidth="0.4" opacity="0.6"
            />
            <circle cx="1380" cy="118" r="1.2" fill="#FFF2C8" opacity="0.8" />
            <circle cx="1450" cy="116" r="1.2" fill="#FFF2C8" opacity="0.8" />
            <circle cx="1520" cy="114" r="1.2" fill="#FFF2C8" opacity="0.8" />
            <circle cx="1590" cy="112" r="1.2" fill="#FFF2C8" opacity="0.8" />
            <circle cx="1660" cy="113" r="1.2" fill="#FFF2C8" opacity="0.8" />
          </g>

          {/* ╔══════════════════════════════════════════════════════╗
              ║  LAYER 10 — FOREGROUND (flowers, grass, shrubs)     ║
              ╚══════════════════════════════════════════════════════╝ */}
          <g id="foreground">
            {/* ── Flower beds (organic clusters along ground) ── */}
            {/* Bed 1 (far left) */}
            <g>
              <ellipse cx="85" cy="212" rx="20" ry="5" fill="#6E8B55" opacity="0.6" />
              <circle cx="78" cy="209" r="3" fill="#E6B4B8" />
              <circle cx="85" cy="208" r="3.5" fill="#D6A53F" />
              <circle cx="92" cy="209" r="2.5" fill="#FAFAF7" />
              <circle cx="82" cy="211" r="2" fill="#F2C6A8" />
              <circle cx="89" cy="211" r="2" fill="#E6B4B8" />
            </g>
            {/* Bed 2 (near tent) */}
            <g>
              <ellipse cx="650" cy="210" rx="22" ry="5" fill="#6E8B55" opacity="0.5" />
              <circle cx="642" cy="207" r="3" fill="#E6B4B8" />
              <circle cx="650" cy="206" r="3.5" fill="#FAFAF7" />
              <circle cx="658" cy="207" r="3" fill="#D6A53F" />
              <circle cx="646" cy="209" r="2" fill="#F2C6A8" />
              <circle cx="654" cy="209" r="2" fill="#E6B4B8" />
            </g>
            {/* Bed 3 (before mandap) */}
            <g>
              <ellipse cx="960" cy="208" rx="25" ry="5" fill="#6E8B55" opacity="0.5" />
              <circle cx="950" cy="205" r="3" fill="#D6A53F" />
              <circle cx="958" cy="204" r="3.5" fill="#E6B4B8" />
              <circle cx="966" cy="205" r="3" fill="#FAFAF7" />
              <circle cx="974" cy="206" r="2.5" fill="#F2C6A8" />
              <circle cx="954" cy="207" r="2" fill="#E6B4B8" />
            </g>
            {/* Bed 4 (after mandap) */}
            <g>
              <ellipse cx="1450" cy="208" rx="22" ry="5" fill="#6E8B55" opacity="0.5" />
              <circle cx="1442" cy="205" r="3" fill="#E6B4B8" />
              <circle cx="1450" cy="204" r="3.5" fill="#D6A53F" />
              <circle cx="1458" cy="205" r="3" fill="#FAFAF7" />
              <circle cx="1446" cy="207" r="2" fill="#F2C6A8" />
            </g>
            {/* Bed 5 (right side) */}
            <g>
              <ellipse cx="2250" cy="210" rx="20" ry="5" fill="#6E8B55" opacity="0.5" />
              <circle cx="2243" cy="207" r="2.5" fill="#E6B4B8" />
              <circle cx="2250" cy="206" r="3" fill="#FAFAF7" />
              <circle cx="2257" cy="207" r="2.5" fill="#D6A53F" />
              <circle cx="2246" cy="209" r="2" fill="#F2C6A8" />
            </g>

            {/* ── Decorative shrubs ── */}
            <ellipse cx="350" cy="206" rx="14" ry="6" fill="#4F7C4D" opacity="0.6" />
            <ellipse cx="354" cy="204" rx="10" ry="4.5" fill="#6F995E" opacity="0.6" />
            <ellipse cx="348" cy="203" rx="6" ry="3" fill="#8FB07A" opacity="0.5" />

            <ellipse cx="1550" cy="208" rx="12" ry="5" fill="#4F7C4D" opacity="0.6" />
            <ellipse cx="1554" cy="206" rx="8" ry="4" fill="#6F995E" opacity="0.5" />

            <ellipse cx="2130" cy="208" rx="12" ry="5" fill="#4F7C4D" opacity="0.6" />
            <ellipse cx="2134" cy="206" rx="8" ry="4" fill="#6F995E" opacity="0.5" />
            <ellipse cx="2128" cy="205" rx="5" ry="3" fill="#8FB07A" opacity="0.4" />

            {/* ── Grass tufts (scattered organically) ── */}
            <g opacity="0.8">
              <path d="M25,214 Q27,207 29,214" fill="#4F7C4D" />
              <path d="M28,214 Q31,205 33,214" fill="#6E8B55" />
              <path d="M31,214 Q34,208 36,214" fill="#8FB07A" />

              <path d="M200,212 Q202,205 204,212" fill="#6E8B55" />
              <path d="M203,212 Q206,204 208,212" fill="#4F7C4D" />

              <path d="M500,206 Q502,200 504,206" fill="#8FB07A" />
              <path d="M503,206 Q506,198 508,206" fill="#6E8B55" />

              <path d="M690,208 Q692,202 694,208" fill="#4F7C4D" />
              <path d="M693,208 Q696,200 698,208" fill="#6E8B55" />
              <path d="M696,208 Q699,203 701,208" fill="#8FB07A" />

              <path d="M850,210 Q852,203 854,210" fill="#6E8B55" />
              <path d="M853,210 Q856,202 858,210" fill="#4F7C4D" />

              <path d="M1100,204 Q1102,197 1104,204" fill="#8FB07A" />
              <path d="M1103,204 Q1106,196 1108,204" fill="#6E8B55" />

              <path d="M1370,206 Q1372,199 1374,206" fill="#4F7C4D" />
              <path d="M1373,206 Q1376,198 1378,206" fill="#6E8B55" />
              <path d="M1376,206 Q1379,200 1381,206" fill="#8FB07A" />

              <path d="M1620,208 Q1622,201 1624,208" fill="#6E8B55" />
              <path d="M1623,208 Q1626,200 1628,208" fill="#4F7C4D" />

              <path d="M1850,208 Q1852,202 1854,208" fill="#8FB07A" />
              <path d="M1853,208 Q1856,200 1858,208" fill="#6E8B55" />

              <path d="M2000,208 Q2002,201 2004,208" fill="#4F7C4D" />
              <path d="M2003,208 Q2006,200 2008,208" fill="#6E8B55" />
              <path d="M2006,208 Q2009,202 2011,208" fill="#8FB07A" />

              <path d="M2280,210 Q2282,203 2284,210" fill="#6E8B55" />
              <path d="M2283,210 Q2286,202 2288,210" fill="#4F7C4D" />
            </g>

            {/* ── Flower pots (small accents) ── */}
            <g>
              {/* Pot 1 */}
              <path d="M1490,210 L1488,200 Q1488,197 1492,197 L1498,197 Q1502,197 1502,200 L1500,210 Z" fill="#A67C52" />
              <ellipse cx="1495" cy="196" rx="5.5" ry="4" fill="#6E8B55" />
              <circle cx="1495" cy="193" r="2.5" fill="#E6B4B8" />
              <circle cx="1492" cy="195" r="1.8" fill="#D6A53F" />
              <circle cx="1498" cy="195" r="1.8" fill="#FAFAF7" />
              {/* Pot 2 */}
              <path d="M700,210 L698,202 Q698,199 702,199 L706,199 Q710,199 710,202 L708,210 Z" fill="#A67C52" />
              <ellipse cx="704" cy="198" rx="4.5" ry="3.5" fill="#6E8B55" />
              <circle cx="704" cy="195" r="2" fill="#D6A53F" />
              <circle cx="701" cy="197" r="1.5" fill="#E6B4B8" />
            </g>

            {/* ── Decorative poles (small accent posts) ── */}
            <g opacity="0.5">
              <rect x="820" y="198" width="2" height="14" rx="0.5" fill="#A67C52" />
              <circle cx="821" cy="197" r="2" fill="#C8A24D" />
              <rect x="1580" y="200" width="2" height="12" rx="0.5" fill="#A67C52" />
              <circle cx="1581" cy="199" r="2" fill="#C8A24D" />
            </g>
          </g>

        </svg>
      </div>
    );
  }
);
