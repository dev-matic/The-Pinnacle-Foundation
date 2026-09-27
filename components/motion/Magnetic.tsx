"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Pulls its child gently toward the cursor. Fine pointers only; inert under reduced motion.
 */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

  const onMove = (e: PointerEvent) => {
    if (!enabled() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className={cn("inline-block", className)} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
