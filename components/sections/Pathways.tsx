"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { pathways } from "@/content/involvement";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * GIVE / SERVE / PARTNER. Three tall panels share the width; the one you point
 * at (or focus) opens, takes its colour, reveals its photograph, and the brand
 * line's summit slides beneath it.
 */
export function Pathways({ headingId = "pathways-title", title = "Give. Serve. Partner." }: { headingId?: string; title?: string }) {
  const [current, setActive] = useState(0);

  return (
    <section data-scroll-tone="ivory" aria-labelledby={headingId} className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <h2 id={headingId} className="display fs-xl">
            {title}
          </h2>
          <p className="max-w-sm text-[var(--muted)]">Three ways to be part of what God is doing through the Foundation. Choose the one that fits you today.</p>
        </div>

        {/* Desktop: expanding panels */}
        <div className="hidden lg:block">
          <ul className="flex h-[68svh] min-h-[32rem] gap-3">
            {pathways.map((p, i) => {
              const open = current === i;
              return (
                <motion.li
                  key={p.id}
                  data-tone={open ? p.theme : undefined}
                  layout
                  className={cn(
                    "group relative isolate flex min-w-0 overflow-hidden rounded-[1.75rem] border border-[var(--hairline)] transition-colors duration-700",
                    open ? "tone-surface border-transparent" : "bg-transparent",
                  )}
                  style={{ flexGrow: open ? 2.4 : 1, flexBasis: 0 }}
                  transition={{ layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                  onPointerEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                >
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        key="photo"
                        className="absolute inset-y-4 right-4 -z-10 w-[42%] overflow-hidden rounded-[1.25rem]"
                        initial={{ clipPath: "inset(100% 0 0 0)" }}
                        animate={{ clipPath: "inset(0% 0 0 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      >
                        <Photo slug={p.photo} sizes="30vw" alt="" className="h-full w-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex w-full flex-col justify-between p-8 xl:p-10">
                    <span className="text-sm text-[var(--muted)]">{p.line}</span>
                    <div className={cn(open ? "max-w-[52%]" : "max-w-full")}>
                      {/* Collapsed panels are narrow, so the title shrinks from its base until the panel opens. */}
                      <h3
                        className={cn(
                          "display origin-bottom-left whitespace-nowrap text-[clamp(3.5rem,5.6vw,7rem)] transition-transform duration-700 ease-[var(--ease-out-expo)]",
                          open ? "scale-100" : "scale-[0.7]",
                        )}
                      >
                        {p.title}
                      </h3>
                      <div className={cn("grid transition-[grid-template-rows,opacity] duration-700", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <div className="overflow-hidden">
                          <p className="mt-4 max-w-xs text-[1.05rem]">{p.description}</p>
                          <div className="mt-6 pb-1">
                            <Button href={p.cta.href} magnetic={false}>
                              {p.cta.label}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          {/* Brand line: its summit travels to the open pathway */}
          <div aria-hidden className="relative mt-8 h-10">
            <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--hairline)]" />
            <motion.span
              className="absolute bottom-0 block h-10 w-40 -translate-x-1/2"
              animate={{ left: `${[1.2 / 4.4, 0.5, 3.2 / 4.4][current] * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <svg viewBox="0 0 160 40" className="h-full w-full overflow-visible">
                <path d="M0 39.5 C40 39.5 62 4 80 2 C98 4 120 39.5 160 39.5" fill="none" stroke="var(--line)" strokeWidth="1.25" />
                <circle cx="80" cy="2" r="3.5" fill="var(--color-gold)" />
              </svg>
            </motion.span>
          </div>
        </div>

        {/* Mobile: stacked panels, everything visible */}
        <ul className="space-y-4 lg:hidden">
          {pathways.map((p) => (
            <li key={p.id} data-tone={p.theme} className="tone-surface relative overflow-hidden rounded-[1.75rem]">
              <div className="relative h-56">
                <Photo slug={p.photo} sizes="100vw" alt="" className="h-full w-full" />
              </div>
              <div className="p-6">
                <h3 className="display text-[clamp(3.5rem,18vw,5rem)]">{p.title}</h3>
                <p className="mt-2 font-medium">{p.line}</p>
                <p className="mt-2 text-[var(--muted)]">{p.description}</p>
                <div className="mt-6">
                  <Button href={p.cta.href} magnetic={false}>
                    {p.cta.label}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
