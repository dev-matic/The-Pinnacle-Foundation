"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { archClipPct } from "@/lib/arch";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import type { PhotoSlug } from "@/content/types";

interface Props {
  slug: PhotoSlug;
  /** width / height of the frame. */
  aspect?: number;
  sizes?: string;
  className?: string;
  /** "arch" is the Pinnacle frame; "rect" is a plain rectangle with the same motion. */
  shape?: "arch" | "rect";
  reveal?: boolean;
  parallax?: boolean;
  priority?: boolean;
  alt?: string;
  /** Draw the thin outline of the arch around the photograph. */
  outline?: boolean;
}

/**
 * A photograph in the Pinnacle arch. It rises into view from its base and
 * drifts gently inside its frame as the page moves.
 */
export function ArchFrame({
  slug,
  aspect = 0.72,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className,
  shape = "arch",
  reveal = true,
  parallax = true,
  priority,
  alt,
  outline,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        if (reveal)
          gsap.fromTo(
            ".af-mask",
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.6,
              ease: "expo.inOut",
              scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
            },
          );
        if (parallax)
          gsap.fromTo(
            ".af-img",
            { yPercent: -7, scale: 1.16 },
            { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
          );
        if (outline)
          gsap.fromTo(
            ".af-outline",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 0.5, scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } },
          );
      });
    },
    { scope: ref },
  );

  const clip = shape === "arch" ? archClipPct(aspect) : undefined;

  return (
    <div ref={ref} className={cn("relative", className)} style={{ aspectRatio: String(aspect) }}>
      <div className="af-mask absolute inset-0">
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
          <div className="af-img absolute inset-0">
            <Photo slug={slug} sizes={sizes} className="h-full w-full" priority={priority} alt={alt} />
          </div>
        </div>
      </div>
      {outline && shape === "arch" && (
        <svg aria-hidden className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className="af-outline"
            d={outlinePath(aspect)}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
          />
        </svg>
      )}
    </div>
  );
}

function outlinePath(aspect: number) {
  // Rebuild the same arch in a 100×100 box stretched to the frame.
  const poly = archClipPct(aspect)
    .replace(/^polygon\(|\)$/g, "")
    .split(",")
    .map((pair) => pair.trim().split(" ").map((v) => parseFloat(v)));
  return "M" + poly.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L");
}
