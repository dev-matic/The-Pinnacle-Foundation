"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { Theme } from "@/content/types";
import { setPageTone } from "@/lib/tone";

/**
 * Watches every element with data-scroll-tone and hands the page its colour
 * tone when that element covers the centre of the viewport (so horizontal
 * tracks work too). Sections that
 * orchestrate their own tone changes (pinned scenes) use data-scroll-tone="dynamic".
 */
export function ToneController() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const setup = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-tone]"));
      const first = sections.find((s) => s.dataset.scrollTone !== "dynamic");
      setPageTone((sections[0]?.dataset.initialTone ?? first?.dataset.scrollTone ?? "ivory") as Theme);
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const tone = (entry.target as HTMLElement).dataset.scrollTone;
            if (entry.isIntersecting && tone && tone !== "dynamic") setPageTone(tone as Theme);
          }
        },
        { rootMargin: "-50% -45% -50% -45%", threshold: 0 },
      );
      sections.forEach((s) => io!.observe(s));
    };
    const raf = requestAnimationFrame(setup);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
