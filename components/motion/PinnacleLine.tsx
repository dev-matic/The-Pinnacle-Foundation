"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface Props {
  /** Horizontal position of the summit, 0–100. */
  peak?: number;
  /** Height of the rise in px. */
  height?: number;
  className?: string;
  /** "scrub" draws with scroll; "once" draws when it enters the viewport. */
  draw?: "scrub" | "once";
  /** Point of light at the summit. */
  light?: boolean;
}

/**
 * The recurring brand line: a quiet horizon that rises once to a single point
 * of light and settles again. It draws itself as the visitor moves through the page.
 */
export function PinnacleLine({ peak = 50, height = 90, className, draw = "scrub", light = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = peak * 10;
  const span = 70; // half-width of the rise in viewBox units
  const d = `M0 ${height} L${x - span * 2.2} ${height} C${x - span * 1.1} ${height} ${x - span * 0.55} ${height * 0.35} ${x} 2 C${x + span * 0.55} ${height * 0.35} ${x + span * 1.1} ${height} ${x + span * 2.2} ${height} L1000 ${height}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st =
          draw === "scrub"
            ? { trigger: ref.current, start: "top 92%", end: "top 35%", scrub: 0.8 }
            : { trigger: ref.current, start: "top 85%", once: true };
        const tl = gsap.timeline({ scrollTrigger: st });
        tl.fromTo(".pl-path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: draw === "scrub" ? "none" : "power2.inOut", duration: 1.6 });
        if (light) tl.fromTo(".pl-light", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" }, "-=0.9");
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none relative w-full", className)} style={{ height: height + 4 }}>
      <svg viewBox={`0 0 1000 ${height + 4}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path className="pl-path" d={d} fill="none" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
      </svg>
      {light && (
        <span
          className="pl-light absolute top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--line)] shadow-[0_0_24px_6px_color-mix(in_oklab,var(--color-gold)_55%,transparent)]"
          style={{ left: `${peak}%`, top: 2 }}
        />
      )}
    </div>
  );
}
