"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { projects } from "@/content/projects";
import { categoryLabel, workAreas } from "@/content/work";
import { contactHref } from "@/content/site";
import type { Figure, Project, ProjectCategory } from "@/content/types";
import { archClipPct } from "@/lib/arch";
import { setPageTone } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Button } from "@/components/ui/Button";
import { Lightbox, type LightboxItem } from "./Lightbox";

/**
 * Projects as long-form stories. On desktop the project titles scroll on the
 * left while a photograph in the Pinnacle arch holds still on the right and
 * changes with each project; the page's colour follows. Each story expands in place.
 */
export function ProjectExplorer() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const list = useMemo(() => projects.filter((p) => filter === "all" || p.category === filter), [filter]);
  const categories = workAreas.filter((a) => projects.some((p) => p.category === a.id));

  // Open a project or apply a category filter from the URL hash (/projects#slug or #category).
  useEffect(() => {
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      if (projects.some((p) => p.slug === hash)) setOpen(hash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.index);
          setActive(i);
          setPageTone(list[i]?.tone ?? "ivory");
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    list.forEach((p) => refs.current[p.slug] && io.observe(refs.current[p.slug]!));
    return () => io.disconnect();
  }, [list]);

  const current = list[active] ?? list[0];

  return (
    <section id="all-projects" data-scroll-tone="dynamic" aria-labelledby="projects-list-title" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 id="projects-list-title" className="display fs-lg">
            Project stories
          </h2>
          <div role="group" aria-label="Filter projects by area of work" className="flex flex-wrap gap-2">
            {[{ id: "all" as const, title: "All projects" }, ...categories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => {
                  setFilter(c.id);
                  setActive(0);
                }}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                  filter === c.id ? "border-transparent bg-[var(--fg)] text-[var(--bg)]" : "border-[var(--hairline)] hover:border-[var(--fg)]",
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <ol className="lg:col-span-6">
            {list.map((p, i) => (
              <li
                key={p.slug}
                id={p.slug}
                data-index={i}
                ref={(el) => void (refs.current[p.slug] = el)}
                className="scroll-mt-28 border-t border-[var(--hairline)] py-12 lg:min-h-[78svh] lg:py-16"
              >
                <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:hidden">
                  <Photo slug={p.cover} sizes="100vw" className="h-full w-full" />
                </div>
                <ProjectMeta p={p} />
                <h3 className="display mt-5 text-[clamp(2.6rem,1rem+4.6vw,5.8rem)]">{p.title}</h3>
                <p className="lede mt-6 max-w-[40ch]">{p.summary}</p>

                <button
                  type="button"
                  aria-expanded={open === p.slug}
                  aria-controls={`${p.slug}-details`}
                  onClick={() => setOpen(open === p.slug ? null : p.slug)}
                  className="group mt-8 inline-flex items-center gap-3 font-medium"
                >
                  <span className={cn("grid size-10 place-items-center rounded-full border border-[var(--hairline)] transition-all duration-500", open === p.slug && "rotate-45 bg-[var(--fg)] text-[var(--bg)]")}>
                    <Plus aria-hidden className="size-4" />
                  </span>
                  <span className="u-link">{open === p.slug ? "Close the story" : "Read the full story"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {open === p.slug && (
                    <motion.div
                      id={`${p.slug}-details`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ProjectDetails
                        p={p}
                        onOpenPhoto={(index) =>
                          setLightbox({
                            index,
                            items: p.gallery.map((slug) => ({ slug, caption: `${p.title}`, location: p.location })),
                          })
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
            {list.length === 0 && <li className="py-12 text-[var(--muted)]">No projects in this area have been published yet.</li>}
          </ol>

          {/* Sticky photograph */}
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[0.78] w-full" style={{ clipPath: archClipPct(0.78) }}>
                <AnimatePresence initial={false}>
                  {current && (
                    <motion.div
                      key={current.slug}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                      animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                      exit={{ opacity: 0, transition: { delay: 0.7, duration: 0.2 } }}
                      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Photo slug={current.cover} sizes="40vw" className="h-full w-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-[var(--muted)]" aria-hidden>
                <span>{current ? categoryLabel(current.category) : ""}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {String(active + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onIndex={(index) => setLightbox((l) => (l ? { ...l, index } : l))} />
    </section>
  );
}

function ProjectMeta({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--muted)]">
      <span>{categoryLabel(p.category)}</span>
      <span aria-hidden className="h-px w-6 bg-current" />
      <span>{p.location}</span>
      <span aria-hidden className="h-px w-6 bg-current" />
      <span>{p.date}</span>
      {p.placeholder && <PlaceholderTag label="Placeholder project" />}
    </div>
  );
}

function FigureValue({ f }: { f?: Figure }) {
  if (!f) return null;
  return (
    <div className="border-t border-[var(--hairline)] pt-3">
      <dt className="text-sm text-[var(--muted)]">{f.label}</dt>
      <dd className="mt-1">{f.verified && f.value !== null ? f.value.toLocaleString("en-GH") + (f.suffix ?? "") : "Awaiting verification"}</dd>
    </div>
  );
}

function ProjectDetails({ p, onOpenPhoto }: { p: Project; onOpenPhoto: (i: number) => void }) {
  return (
    <div className="pt-10">
      <div className="max-w-[58ch] space-y-5 text-lg">
        {p.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <dl className="mt-10 grid gap-5 sm:grid-cols-2">
        {p.provided && (
          <div className="border-t border-[var(--hairline)] pt-3">
            <dt className="text-sm text-[var(--muted)]">What was provided</dt>
            <dd className="mt-1">{p.provided.join(", ")}</dd>
          </div>
        )}
        {p.participants && (
          <div className="border-t border-[var(--hairline)] pt-3">
            <dt className="text-sm text-[var(--muted)]">Who took part</dt>
            <dd className="mt-1">{p.participants}</dd>
          </div>
        )}
        <FigureValue f={p.peopleReached} />
        <FigureValue f={p.itemsDonated} />
        {p.partners && p.partners.length > 0 && (
          <div className="border-t border-[var(--hairline)] pt-3">
            <dt className="text-sm text-[var(--muted)]">Partners</dt>
            <dd className="mt-1">{p.partners.join(", ")}</dd>
          </div>
        )}
        {p.outcome && (
          <div className="border-t border-[var(--hairline)] pt-3 sm:col-span-2">
            <dt className="text-sm text-[var(--muted)]">Outcome</dt>
            <dd className="mt-1">{p.outcome}</dd>
          </div>
        )}
        {p.whatNext && (
          <div className="border-t border-[var(--hairline)] pt-3 sm:col-span-2">
            <dt className="text-sm text-[var(--muted)]">What happened next</dt>
            <dd className="mt-1">{p.whatNext}</dd>
          </div>
        )}
      </dl>

      {p.gallery.length > 0 && (
        <ul className="mt-10 grid grid-cols-3 gap-3" aria-label={`${p.title} photographs`}>
          {p.gallery.map((slug, i) => (
            <li key={slug}>
              <button type="button" onClick={() => onOpenPhoto(i)} className="group relative block aspect-square w-full overflow-hidden rounded-xl">
                <Photo slug={slug} sizes="(min-width:1024px) 14vw, 30vw" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="sr-only">Open photograph {i + 1} of {p.gallery.length} full screen</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <Button href={contactHref("project")}>Sponsor a Project</Button>
      </div>
    </div>
  );
}
