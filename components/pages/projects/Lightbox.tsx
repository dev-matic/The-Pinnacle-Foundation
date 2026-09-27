"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { PhotoSlug } from "@/content/types";
import { getPhoto } from "@/content/photos";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { Photo } from "@/components/ui/Photo";

export interface LightboxItem {
  slug: PhotoSlug;
  caption?: string;
  location?: string;
}

/** Full-screen photograph viewer. Arrow keys move, Escape closes, focus stays inside. */
export function Lightbox({
  state,
  onClose,
  onIndex,
}: {
  state: { items: LightboxItem[]; index: number } | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const { stop, start } = useSmoothScroll();
  const open = Boolean(state);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    stop();
    closeRef.current?.focus();
    return () => {
      start();
      returnFocus.current?.focus();
    };
  }, [open, stop, start]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((state.index + 1) % state.items.length);
      if (e.key === "ArrowLeft") onIndex((state.index - 1 + state.items.length) % state.items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onClose, onIndex]);

  const item = state?.items[state.index];
  const photo = item ? getPhoto(item.slug) : null;
  const aspect = photo?.file ? photo.file.width / photo.file.height : 3 / 2;

  return (
    <AnimatePresence>
      {state && item && photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          data-tone="charcoal"
          data-lenis-prevent
          className="tone-surface fixed inset-0 z-[90] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onKeyDown={(e) => {
            if (e.key !== "Tab") return;
            const f = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button"));
            const i = f.indexOf(document.activeElement as HTMLElement);
            if (e.shiftKey && i === 0) {
              e.preventDefault();
              f[f.length - 1].focus();
            } else if (!e.shiftKey && i === f.length - 1) {
              e.preventDefault();
              f[0].focus();
            }
          }}
        >
          <div className="flex items-center justify-between p-4 lg:p-6">
            <p className="text-sm text-[var(--muted)]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {state.index + 1} / {state.items.length}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className="grid size-12 place-items-center rounded-full border border-[var(--hairline)] hover:bg-ivory hover:text-charcoal">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close viewer</span>
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-4 lg:px-24">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={item.slug}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 lg:px-24"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Photo
                  slug={item.slug}
                  sizes="90vw"
                  className="w-[min(100%,calc(72svh*var(--ar)))] rounded-xl"
                  imgClassName="object-contain"
                  style={{ ["--ar" as string]: aspect, aspectRatio: aspect }}
                />
                <figcaption className="mt-5 max-w-2xl text-center text-sm text-[var(--muted)]">
                  <span className="text-[var(--fg)]">{item.caption ?? photo.caption}</span>
                  {(item.location ?? photo.location) && <> in {item.location ?? photo.location}</>}
                  {photo.credit && (
                    <span className="block opacity-80">
                      Photo: {photo.credit.author}, {photo.credit.license}.
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {state.items.length > 1 && (
            <div className="flex justify-center gap-3 p-5">
              <button type="button" onClick={() => onIndex((state.index - 1 + state.items.length) % state.items.length)} className="grid size-12 place-items-center rounded-full border border-[var(--hairline)] hover:bg-ivory hover:text-charcoal">
                <ArrowLeft aria-hidden className="size-5" />
                <span className="sr-only">Previous photograph</span>
              </button>
              <button type="button" onClick={() => onIndex((state.index + 1) % state.items.length)} className="grid size-12 place-items-center rounded-full border border-[var(--hairline)] hover:bg-ivory hover:text-charcoal">
                <ArrowRight aria-hidden className="size-5" />
                <span className="sr-only">Next photograph</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
