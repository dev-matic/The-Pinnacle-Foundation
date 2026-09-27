"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { stories, storyTypes } from "@/content/stories";
import { getProject } from "@/content/projects";
import type { Story, StoryType } from "@/content/types";
import { archClipPct } from "@/lib/arch";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";

/**
 * The stories index: a reading list set in large serif type. Pointing at a
 * story brings its photograph forward; choosing it opens the full story.
 */
export function StoriesExplorer() {
  const [type, setType] = useState<StoryType | "all">("all");
  const [hover, setHover] = useState<number | null>(null);
  const [reading, setReading] = useState<Story | null>(null);
  const list = useMemo(() => stories.filter((s) => type === "all" || s.type === type), [type]);
  const types = Array.from(new Set(stories.map((s) => s.type)));

  // Deep links: /stories#slug opens that story.
  useEffect(() => {
    const slug = decodeURIComponent(window.location.hash.slice(1));
    const s = stories.find((x) => x.slug === slug);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s) setReading(s);
  }, []);

  return (
    <section data-scroll-tone="ivory" aria-labelledby="all-stories-title" className="py-24 lg:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 id="all-stories-title" className="display fs-lg">
            More stories
          </h2>
          <div role="group" aria-label="Filter stories" className="flex flex-wrap gap-2">
            {(["all", ...types] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  type === t ? "border-transparent bg-[var(--fg)] text-[var(--bg)]" : "border-[var(--hairline)] hover:border-[var(--fg)]",
                )}
              >
                {t === "all" ? "All stories" : storyTypes[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-12" onPointerLeave={() => setHover(null)}>
          <ul className="border-t border-[var(--hairline)] lg:col-span-8">
            {list.map((s, i) => {
              const project = s.projectSlug ? getProject(s.projectSlug) : undefined;
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-[var(--hairline)]">
                  <button
                    type="button"
                    onClick={() => setReading(s)}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    className="group grid w-full gap-4 py-8 text-left sm:grid-cols-[1fr_auto] lg:py-10"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                        <span>{storyTypes[s.type]}</span>
                        <span aria-hidden className="h-px w-6 bg-current" />
                        <span>{s.location}</span>
                        {project && (
                          <>
                            <span aria-hidden className="h-px w-6 bg-current" />
                            <span>{project.title}</span>
                          </>
                        )}
                      </span>
                      <span className="serif-statement mt-3 block text-[clamp(2rem,1rem+2.6vw,3.8rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                        {s.title}
                      </span>
                      <span className="mt-3 block max-w-[54ch] text-[var(--muted)]">{s.excerpt}</span>
                    </span>
                    <span className="flex items-start gap-3 sm:flex-col sm:items-end">
                      {s.placeholder && <PlaceholderTag />}
                      <span className="grid size-12 place-items-center rounded-full border border-[var(--hairline)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)]">
                        <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.6} />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[0.78] w-full" style={{ clipPath: archClipPct(0.78) }}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={hover ?? "rest"}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Photo slug={(list[hover ?? 0] ?? stories[0]).photo} sizes="30vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StoryReader story={reading} onClose={() => setReading(null)} />
    </section>
  );
}

function StoryReader({ story, onClose }: { story: Story | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { stop, start } = useSmoothScroll();
  useEffect(() => {
    if (!story) return;
    const prev = document.activeElement as HTMLElement | null;
    stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      start();
      prev?.focus();
    };
  }, [story, onClose, stop, start]);

  const project = story?.projectSlug ? getProject(story.projectSlug) : undefined;

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
          data-tone="sand"
          data-lenis-prevent
          className="tone-surface fixed inset-0 z-[90] overflow-y-auto"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:py-28">
            <button ref={closeRef} type="button" onClick={onClose} className="fixed right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-charcoal text-ivory lg:right-8 lg:top-8">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close story</span>
            </button>
            <div className="lg:col-span-5">
              <div className="relative aspect-[0.8] w-full max-w-md overflow-hidden" style={{ clipPath: archClipPct(0.8) }}>
                <Photo slug={story.photo} sizes="(min-width:1024px) 36vw, 90vw" className="h-full w-full" />
              </div>
            </div>
            <article className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                <span>{storyTypes[story.type]}</span>
                <span aria-hidden className="h-px w-6 bg-current" />
                <span>{story.location}</span>
                {project && (
                  <>
                    <span aria-hidden className="h-px w-6 bg-current" />
                    <span>{project.title}</span>
                  </>
                )}
                {story.placeholder && <PlaceholderTag label="Placeholder story" />}
              </div>
              <h2 id="reader-title" className="display mt-6 text-[clamp(2.6rem,1rem+4vw,5.4rem)]">
                {story.title}
              </h2>
              <blockquote className="serif-statement mt-10 border-l-2 border-[var(--line)] pl-6 text-[clamp(1.6rem,1rem+1.6vw,2.6rem)] italic">
                {story.quote}
                <footer className="mt-4 text-base not-italic text-[var(--muted)]">
                  {story.person}, {story.role}
                </footer>
              </blockquote>
              <div className="mt-10 max-w-[60ch] space-y-5 text-lg">
                {story.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
