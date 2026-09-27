"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Counts up to `value` once when scrolled into view. Final value is in the HTML for no-JS and reduced motion. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => Math.round(n).toLocaleString("en-GH");

  useGSAP(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { n: 0 };
    el.textContent = format(0) + suffix;
    gsap.to(obj, {
      n: value,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = format(obj.n) + suffix;
      },
    });
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
      {suffix}
    </span>
  );
}
