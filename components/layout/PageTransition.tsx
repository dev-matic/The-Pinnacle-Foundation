"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import { PinnacleMark } from "@/components/ui/PinnacleMark";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Phase = "idle" | "covering" | "covered";

const NavContext = createContext<{ navigate: (href: string) => void; phase: Phase }>({
  navigate: () => {},
  phase: "idle",
});

export const usePageTransition = () => useContext(NavContext);

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

/**
 * Route changes play a short curtain: an olive panel rises with the Pinnacle
 * mark, the next page loads underneath, and the panel lifts away.
 * Total added time ≈ 0.9s; reduced motion swaps it for a brief fade.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<{ path: string; hash: string } | null>(null);

  const scrollToHash = useCallback(
    (hash: string, immediate = false) => {
      const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (el) scrollTo(el, { offset: -24, immediate });
    },
    [scrollTo],
  );

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = normalise(url.pathname);
      if (target === normalise(window.location.pathname)) {
        if (url.hash) {
          history.replaceState(null, "", url.pathname + url.search + url.hash);
          scrollToHash(url.hash);
        } else {
          scrollTo(0);
        }
        return;
      }
      pending.current = { path: url.pathname + url.search, hash: url.hash };
      setPhase("covering");
    },
    [scrollTo, scrollToHash],
  );

  const onCovered = () => {
    if (!pending.current) return;
    setPhase("covered");
    router.push(pending.current.path + pending.current.hash, { scroll: false });
  };

  // When the new route has rendered, reset scroll and lift the curtain.
  useEffect(() => {
    if (phase !== "covered") return;
    const hash = pending.current?.hash ?? "";
    pending.current = null;
    window.scrollTo(0, 0);
    scrollTo(0, { immediate: true });
    const raf = requestAnimationFrame(() => {
      setPhase("idle");
      // Move focus to the new page for keyboard and screen reader users.
      document.getElementById("main")?.focus({ preventScroll: true });
      if (hash) setTimeout(() => scrollToHash(hash, true), 80);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <NavContext.Provider value={{ navigate, phase }}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            aria-hidden
            className="fixed inset-0 z-[100] flex items-center justify-center bg-olive text-ivory"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduced ? 0.15 : 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (phase === "covering") onCovered();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <PinnacleMark className="h-16 [--line:var(--color-gold)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavContext.Provider>
  );
}
