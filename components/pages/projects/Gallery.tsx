"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import { categoryLabel } from "@/content/work";
import { getPhoto } from "@/content/photos";
import type { PhotoSlug, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { RevealText } from "@/components/motion/RevealText";
import { Lightbox } from "./Lightbox";

type Item = { slug: PhotoSlug; category: ProjectCategory; project: string };

// Every photograph attached to a project, once, tagged with that project's area of work.
const items: Item[] = [];
for (const p of projects) for (const slug of p.gallery) if (!items.some((i) => i.slug === slug)) items.push({ slug, category: p.category, project: p.title });

/** Masonry gallery with filtering and a full-screen viewer. */
export function Gallery() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const shown = useMemo(() => items.filter((i) => filter === "all" || i.category === filter), [filter]);
  const cats = Array.from(new Set(items.map((i) => i.category)));

  return (
    <section data-scroll-tone="charcoal" aria-labelledby="gallery-title" className="py-24 lg:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <RevealText id="gallery-title" lines={["In pictures."]} className="display fs-xl" />
            <p className="mt-6 max-w-md text-[var(--muted)]">
              Moments from preparation, outreach and community life. Each frame marks a photograph still to come from the Foundation&apos;s own work.
            </p>
          </div>
          <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-2">
            {(["all", ...cats] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === c ? "border-transparent bg-[var(--fg)] text-[var(--bg)]" : "border-[var(--hairline)] hover:border-[var(--fg)]",
                )}
              >
                {c === "all" ? "Everything" : categoryLabel(c)}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item, i) => {
              const p = getPhoto(item.slug);
              const tall = i % 3 === 1;
              return (
                <motion.li
                  layout
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid"
                >
                  <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-[1.25rem] text-left">
                    <Photo
                      slug={item.slug}
                      sizes="(min-width:1024px) 32vw, (min-width:640px) 48vw, 100vw"
                      className={cn("w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]", tall ? "aspect-[3/4]" : "aspect-[4/3]")}
                    />
                    {p.file && (
                    <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-4 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                      <span>
                        <span className="block font-medium">{p.caption}</span>
                        <span className="block text-sm opacity-80">{p.location}</span>
                      </span>
                      <span className="shrink-0 text-xs opacity-70">{categoryLabel(item.category)}</span>
                    </span>
                    )}
                    <span className="sr-only">Open full screen</span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
      <Lightbox
        state={index === null ? null : { index, items: shown.map((s) => ({ slug: s.slug })) }}
        onClose={() => setIndex(null)}
        onIndex={setIndex}
      />
    </section>
  );
}
