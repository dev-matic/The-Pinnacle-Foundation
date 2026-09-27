"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollTarget = number | string | HTMLElement;
type ScrollOptions = { immediate?: boolean; offset?: number };

const ScrollContext = createContext<{
  scrollTo: (target: ScrollTarget, opts?: ScrollOptions) => void;
  stop: () => void;
  start: () => void;
}>({ scrollTo: () => {}, stop: () => {}, start: () => {} });

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Lenis-powered inertial scrolling, driven by GSAP's ticker so ScrollTrigger
 * stays in perfect sync. Disabled entirely when reduced motion is requested.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: ScrollTarget, opts: ScrollOptions = {}) => {
    const lenis = lenisRef.current;
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;
    if (lenis) {
      lenis.scrollTo(el, { immediate: opts.immediate, offset: opts.offset ?? 0, duration: 1.4, force: true });
      return;
    }
    const top = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
    window.scrollTo({ top, behavior: opts.immediate ? "instant" : "smooth" });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>;
}
