"use client";

import { featuredStory, storyTypes } from "@/content/stories";
import { getProject } from "@/content/projects";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { ArrowLink } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

/** Stories behind the mission: one story given room to breathe, with a route to the rest. */
export function StoryPreview() {
  const s = featuredStory;
  const project = s.projectSlug ? getProject(s.projectSlug) : undefined;

  return (
    <section data-scroll-tone="terracotta" aria-labelledby="stories-title" className="relative py-28 lg:py-40">
      <div className="container-x">
        <RevealText id="stories-title" lines={["Stories behind", "the mission."]} className="display fs-xl" mode="words" />

        <article className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <ArchFrame slug={s.photo} aspect={0.7} outline className="w-full max-w-md lg:col-span-4" sizes="(min-width:1024px) 30vw, 90vw" />
          <div className="flex flex-col lg:col-span-7 lg:col-start-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span>{storyTypes[s.type]} story</span>
              <span aria-hidden className="h-px w-8 bg-current" />
              <span>{s.location}</span>
              {project && (
                <>
                  <span aria-hidden className="h-px w-8 bg-current" />
                  <span>{project.title}</span>
                </>
              )}
              {s.placeholder && <PlaceholderTag label="Placeholder story" />}
            </div>
            <blockquote className="mt-8">
              <span aria-hidden className="serif-statement block h-[0.5em] text-[7rem] leading-none text-[var(--accent)]">
                “
              </span>
              <ScrollWords as="p" text={s.quote} className="serif-statement text-[clamp(1.9rem,1rem+2.6vw,3.6rem)] italic" end="bottom 55%" />
              <footer className="mt-6 text-[var(--muted)]">
                {s.person}, {s.role}
              </footer>
            </blockquote>
            <p className="mt-10 max-w-[48ch] text-[var(--muted)]">{s.excerpt}</p>

            <div className="mt-10">
              <ArrowLink href="/stories">Explore More Stories</ArrowLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
