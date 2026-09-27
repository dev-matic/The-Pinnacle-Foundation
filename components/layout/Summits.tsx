"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * "Reaching the highest heights": a mountain range drawn like a pen sketch:
 * dark olive masses with fine ivory ridge and rock-face lines. Two distant
 * ranges drift slowly; in front, peaks climb from left to right to one summit
 * above the rest. When the footer arrives a gold trail climbs over each crest
 * and a beacon of light blinks at the very top.
 */

type Pt = [number, number];
const pts = (p: Pt[]) => p.map(([x, y]) => `${x},${y}`).join(" ");

/* ── Distant ranges (drifting, seamless tiles) ─────────────────────── */

const TILE = 1800;
type Peak = [x: number, h: number, halfWidth: number];

// A jagged peak: two notched flanks meeting at a sharp point.
function jagged([x, h, hw]: Peak, b: number): Pt[] {
  return [
    [x - hw, b],
    [x - hw * 0.62, b - h * 0.42],
    [x - hw * 0.5, b - h * 0.46],
    [x - hw * 0.28, b - h * 0.78],
    [x - hw * 0.18, b - h * 0.8],
    [x, b - h],
    [x + hw * 0.2, b - h * 0.84],
    [x + hw * 0.3, b - h * 0.82],
    [x + hw * 0.55, b - h * 0.5],
    [x + hw * 0.66, b - h * 0.47],
    [x + hw, b],
  ];
}

// Each peak is repeated one tile left and right so the tile edges join seamlessly.
function tilePolys(peaks: Peak[], base: number) {
  return [-TILE, 0, TILE].flatMap((dx) => peaks.map(([x, h, hw]) => jagged([x + dx, h, hw], base)));
}

const far: Peak[] = [
  [0, 150, 150], [230, 200, 170], [470, 140, 140], [700, 220, 180], [950, 160, 150],
  [1180, 240, 190], [1420, 170, 160], [1640, 210, 170],
];
const middle: Peak[] = [
  [100, 120, 140], [330, 170, 150], [560, 110, 130], [790, 190, 160],
  [1030, 130, 140], [1260, 180, 160], [1500, 120, 140], [1720, 160, 150],
];

function Range({ peaks, height, fill, duration, className }: { peaks: Peak[]; height: number; fill: string; duration: number; className: string }) {
  const tile = (
    <svg viewBox={`0 0 ${TILE} ${height}`} preserveAspectRatio="none" className="h-full shrink-0" style={{ aspectRatio: `${TILE} / ${height}` }}>
      {tilePolys(peaks, height).map((p, i) => (
        <polygon key={i} points={pts(p)} fill={fill} />
      ))}
    </svg>
  );
  return (
    <div className={`summits-drift absolute bottom-0 left-0 flex w-max motion-reduce:[animation:none] ${className}`} style={{ animationDuration: `${duration}s` }}>
      {tile}
      {tile}
    </div>
  );
}

/* ── Near range (static): peaks rising to the summit ───────────────── */

const W = 1440;
const H = 360;
const HEADROOM = 70;

interface Mountain {
  /** Silhouette, left base to right base. */
  outline: Pt[];
  /** Rock-face lines inside the silhouette. */
  facets: Pt[][];
  fill: string;
}

// Drawn back to front.
const mountains: Mountain[] = [
  {
    // The summit
    outline: [
      [930, 360], [990, 300], [1040, 272], [1090, 206], [1120, 192], [1160, 130], [1180, 122], [1208, 80], [1225, 72], [1250, 40],
      [1268, 64], [1290, 74], [1312, 112], [1335, 124], [1365, 176], [1395, 192], [1440, 248], [1440, 360],
    ],
    facets: [
      [[1250, 40], [1262, 118], [1244, 196], [1268, 290]],
      [[1225, 72], [1206, 150], [1218, 232]],
      [[1290, 74], [1302, 160], [1332, 238]],
      [[1335, 124], [1356, 200], [1350, 262]],
      [[1160, 130], [1150, 204]],
      [[1090, 206], [1098, 262]],
    ],
    fill: "#3d4a35",
  },
  {
    outline: [
      [830, 360], [860, 322], [915, 242], [940, 232], [975, 180], [990, 174], [1010, 150],
      [1030, 182], [1050, 192], [1086, 250], [1120, 312], [1150, 360],
    ],
    facets: [
      [[1010, 150], [1020, 232], [1002, 300]],
      [[990, 174], [966, 252]],
      [[1050, 192], [1068, 262]],
    ],
    fill: "#38442f",
  },
  {
    outline: [[640, 360], [700, 292], [740, 246], [760, 220], [786, 250], [802, 254], [842, 302], [880, 360]],
    facets: [[[760, 220], [772, 292]], [[802, 254], [812, 318]]],
    fill: "#333d2c",
  },
  {
    outline: [[410, 360], [452, 330], [496, 276], [520, 250], [546, 276], [562, 282], [602, 332], [632, 360]],
    facets: [[[520, 250], [528, 318]]],
    fill: "#333d2c",
  },
  {
    outline: [[170, 360], [230, 310], [260, 285], [286, 306], [300, 310], [340, 360]],
    facets: [[[260, 285], [266, 340]]],
    fill: "#333d2c",
  },
  {
    outline: [[-10, 360], [40, 338], [80, 300], [112, 326], [150, 360]],
    facets: [[[80, 300], [86, 345]]],
    fill: "#333d2c",
  },
  {
    // Foothills in front
    outline: [
      [0, 360], [0, 342], [120, 330], [200, 346], [300, 318], [380, 342], [470, 312], [560, 340], [650, 306], [740, 334], [830, 300],
      [910, 332], [990, 312], [1070, 342], [1160, 318], [1240, 346], [1330, 322], [1440, 340], [1440, 360],
    ],
    facets: [],
    fill: "#2a3225",
  },
];

const summit = { x: 1250, y: 40 };

// The climb: over each crest, every one higher than the last, to the summit.
const trailPoints: Pt[] = [[0, 348], [80, 300], [260, 285], [520, 250], [760, 220], [1010, 150], [1180, 122], [summit.x, summit.y]];
function smooth(points: Pt[]) {
  // Catmull-Rom to cubic Bézier, so the trail flows rather than zigzags.
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}
const trail = smooth(trailPoints);

export function Summits({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Drift and blink only while visible.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
        tl.fromTo(".summits-ridge", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, stagger: 0.12, ease: "power2.out" })
          .fromTo(".summits-trail-mask", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 3.2, ease: "power2.inOut" }, 0.4)
          .fromTo(".summits-light", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(2.5)", transformOrigin: "50% 50%" }, "-=0.35")
          .fromTo(".summits-halo", { opacity: 0 }, { opacity: 1, duration: 1.4 }, "<");
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative h-[15rem] overflow-hidden sm:h-[19rem] lg:h-[24rem]" data-drifting={inView || undefined}>
      <Range peaks={far} height={300} fill="#262a21" duration={160} className="h-[74%]" />
      <Range peaks={middle} height={260} fill="#2d3428" duration={105} className="h-[56%]" />

      {/* Extra room above the summit so the beacon's glow is never clipped. */}
      <svg aria-hidden viewBox={`0 ${-HEADROOM} ${W} ${H + HEADROOM}`} preserveAspectRatio="xMaxYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="summits-trail-reveal" maskUnits="userSpaceOnUse">
            <path className="summits-trail-mask" d={trail} fill="none" stroke="#fff" strokeWidth="8" pathLength={1} strokeDasharray="1" />
          </mask>
          <radialGradient id="summits-glow">
            <stop offset="0%" stopColor="#c6a15b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c6a15b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {mountains.map((m, i) => (
          <g key={i}>
            <polygon points={pts(m.outline)} fill={m.fill} />
            {/* Ridge line: the silhouette's upper edge, drawn like a pen stroke */}
            <polyline
              className="summits-ridge"
              points={pts(m.outline.slice(1, -1))}
              fill="none"
              stroke="#f6f1e8"
              strokeOpacity={i === 0 ? 0.55 : 0.32}
              strokeWidth="1.3"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
            />
            {m.facets.map((f, j) => (
              <polyline key={j} points={pts(f)} fill="none" stroke="#f6f1e8" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        ))}

        <path d={trail} fill="none" stroke="#c6a15b" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 9" mask="url(#summits-trail-reveal)" />

        {/* The beacon at the very top */}
        <g className="summits-blink">
          <circle className="summits-halo" cx={summit.x} cy={summit.y} r="60" fill="url(#summits-glow)" />
        </g>
        <g className="summits-blink">
          <circle className="summits-light" cx={summit.x} cy={summit.y} r="6" fill="#c6a15b" />
        </g>
      </svg>

      {children && <div className="absolute inset-x-0 bottom-0 z-10">{children}</div>}
    </div>
  );
}
