"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { TLink } from "@/components/ui/TLink";
import { Wordmark } from "@/components/ui/PinnacleMark";
import { Magnetic } from "@/components/motion/Magnetic";
import { useSmoothScroll } from "./SmoothScroll";
import { SocialLinks } from "./SocialLinks";

export const INTRO_DONE_EVENT = "pinnacle:intro-done";

const isActive = (pathname: string, href: string) => pathname.replace(/\/$/, "") === href || pathname.startsWith(href + "/");

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { stop, start } = useSmoothScroll();
  const menuButton = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";

  // On a first visit to Home the navigation arrives last, after the hero sequence.
  // The inline script in app/layout.tsx adds html.intro-pending; the hero removes it.
  useEffect(() => {
    const show = () => document.documentElement.classList.remove("intro-pending");
    window.addEventListener(INTRO_DONE_EVENT, show);
    return () => window.removeEventListener(INTRO_DONE_EVENT, show);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) stop();
    else start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, stop, start]);

  const floating = (scrolled || !isHome) && !open;

  return (
    <>
      <header
        data-tone={open ? "olive" : undefined}
        className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 transition-[opacity,translate] duration-[900ms] ease-[var(--ease-out-expo)]"
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto flex items-center justify-between transition-all duration-700 ease-[var(--ease-out-expo)]",
            floating
              ? "mt-3 w-[calc(100%-1.5rem)] max-w-[76rem] rounded-full border border-[var(--hairline)] py-2 pl-5 pr-2 shadow-[0_10px_40px_-18px_rgb(31_31_27/0.35)] backdrop-blur-xl [background:color-mix(in_oklab,var(--bg)_78%,transparent)] lg:pl-6"
              : "mt-0 w-full max-w-[108rem] border border-transparent px-4 py-5 sm:px-8 lg:px-14 lg:py-7",
          )}
        >
          <TLink href="/" aria-label={`${site.name}, home`} className="relative z-10 shrink-0">
            <Wordmark className={cn("transition-transform duration-700", floating ? "scale-[0.92]" : "scale-100")} />
          </TLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.primary.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <TLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors",
                        active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute bottom-1 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[var(--line)] transition-all duration-500 ease-[var(--ease-out-expo)]",
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60",
                        )}
                      />
                    </TLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.2}>
              <TLink
                href={nav.donate.href}
                aria-current={isActive(pathname, nav.donate.href) ? "page" : undefined}
                className="group/d relative isolate inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[var(--cta-bg)] px-5 text-[0.95rem] font-semibold text-[var(--cta-fg)] transition-colors duration-500 hover:text-[var(--cta-hover-fg)] lg:h-12 lg:px-6"
              >
                <span aria-hidden className="absolute inset-0 -z-10 translate-y-full rounded-full bg-[var(--cta-hover)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/d:translate-y-0" />
                {nav.donate.label}
                <svg aria-hidden viewBox="0 0 12 14" className="h-3 w-3 transition-transform duration-500 group-hover/d:-translate-y-0.5">
                  <path d="M1 13V6.5C1 3.9 3.2 1.9 6 1c2.8.9 5 2.9 5 5.5V13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </TLink>
            </Magnetic>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-11 place-items-center rounded-full border border-[var(--hairline)] lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500", open && "-translate-y-[5.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} pathname={pathname} onClose={() => { setOpen(false); menuButton.current?.focus(); }} />
    </>
  );
}

function MobileMenu({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => first.current?.focus(), 350);
  }, [open]);

  const items = [{ label: "Home", href: "/" }, ...nav.primary, nav.donate];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-tone="olive"
          data-lenis-prevent
          className="tone-surface fixed inset-0 z-[45] flex flex-col overflow-y-auto px-5 pb-10 pt-28 lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.6rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onKeyDown={(e) => {
            if (e.key !== "Tab") return;
            const focusables = e.currentTarget.querySelectorAll<HTMLElement>("a,button");
            const last = focusables[focusables.length - 1];
            if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
            }
          }}
        >
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {items.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <TLink
                        ref={i === 0 ? first : undefined}
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="display flex items-baseline gap-3 py-1 text-[clamp(3rem,15vw,5.5rem)]"
                      >
                        <span className={cn(active ? "text-[var(--color-gold)]" : "")}>{item.label}</span>
                        {active && <span className="h-2.5 w-2.5 translate-y-[-0.4em] rounded-full bg-[var(--color-gold)]" aria-hidden />}
                      </TLink>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            className="mt-auto space-y-4 pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
          >
            <p className="serif-statement text-2xl">{site.footerLine}</p>
            <SocialLinks />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
