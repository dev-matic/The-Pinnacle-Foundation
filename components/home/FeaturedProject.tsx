"use client";

import { useRef } from "react";
import { featuredProject as p } from "@/content/projects";
import { categoryLabel } from "@/content/work";
import { contactHref } from "@/content/site";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { setPageTone } from "@/lib/tone";
import { Photo } from "@/components/ui/Photo";
import { Button, ArrowLink } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

const lines = ["One community.", "One moment.", "A lasting impact."];

/**
 * One project, told big. A small photograph grows with the scroll until it
 * fills the screen, the headline parts around it, and the project's details
 * settle over the image.
 */
export function FeaturedProject() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.5}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
            onUpdate: (self) => self.isActive && setPageTone(self.progress > 0.32 ? "charcoal" : "sand"),
          },
        });
        tl.fromTo(
          ".fp-frame",
          { width: () => (window.innerWidth < 1024 ? "56vw" : "24vw"), height: () => (window.innerWidth < 1024 ? "34svh" : "42svh"), borderRadius: "2rem" },
          { width: "100vw", height: "100svh", borderRadius: "0rem", duration: 0.5, ease: "power2.inOut" },
          0,
        )
          .fromTo(".fp-img", { scale: 1.35 }, { scale: 1, duration: 0.5 }, 0)
          .to(".fp-line-0", { xPercent: -60, opacity: 0, duration: 0.4 }, 0)
          .to(".fp-line-1", { opacity: 0, scale: 0.9, duration: 0.25 }, 0)
          .to(".fp-line-2", { xPercent: 60, opacity: 0, duration: 0.4 }, 0)
          .to(".fp-shade", { opacity: 1, duration: 0.2 }, 0.38)
          .fromTo(".fp-info > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.2, ease: "power2.out" }, 0.5)
          .to({}, { duration: 0.2 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-scroll-tone="dynamic" data-initial-tone="sand" aria-labelledby="fp-title" className="fp relative">
      <div className="relative h-[100svh] min-h-[38rem] overflow-hidden">
        {/* Headline, parting around the image */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-[36svh] text-center lg:gap-[44svh] motion-reduce:hidden [html:not(.js)_&]:hidden">
          <span className="fp-line-0 display block text-[clamp(2.6rem,9vw,9rem)]">{lines[0]}</span>
          <span className="fp-line-2 display block text-[clamp(2.6rem,9vw,9rem)]">{lines[2]}</span>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-30 grid place-items-center motion-reduce:hidden [html:not(.js)_&]:hidden">
          <span className="fp-line-1 display block text-[clamp(1.6rem,3.1vw,3.4rem)] text-ivory [text-shadow:0_2px_24px_rgb(31_31_27/0.45)] max-lg:text-[7vw]">{lines[1]}</span>
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <div className="fp-frame relative h-full w-full overflow-hidden [&_.ph-caption]:hidden">
            <div className="fp-img absolute inset-0">
              <Photo slug={p.cover} sizes="100vw" className="h-full w-full" placeholder="scene" />
            </div>
            <div className="fp-shade absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/20 opacity-100 motion-safe:[html.js_&]:opacity-0" />
          </div>
        </div>

        {/* Project details */}
        <div data-tone="charcoal" className="absolute inset-0 z-20 flex items-end">
          <div className="fp-info container-x grid gap-8 pb-[8svh] lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                <span>Featured project</span>
                <span aria-hidden className="h-px w-8 bg-current" />
                <span>{categoryLabel(p.category)}</span>
                {p.placeholder && <PlaceholderTag label="Placeholder project" />}
              </div>
              <h2 id="fp-title" className="display mt-5 text-[clamp(2.6rem,1rem+5vw,6rem)]">
                <span className="sr-only">{lines.join(" ")} </span>
                {p.title}
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                {p.location}. {p.date}.
              </p>
              <p className="lede mt-6 max-w-[40ch]">{p.summary}</p>
            </div>
            <dl className="grid content-end gap-5 text-[0.95rem] sm:grid-cols-2 lg:col-span-5 lg:col-start-8 max-sm:[&>div:not(:last-child)]:hidden">
              {p.provided && (
                <div className="border-t border-[var(--hairline)] pt-3">
                  <dt className="text-[var(--muted)]">What we provided</dt>
                  <dd className="mt-1">{p.provided.join(", ")}</dd>
                </div>
              )}
              {p.participants && (
                <div className="border-t border-[var(--hairline)] pt-3">
                  <dt className="text-[var(--muted)]">Who took part</dt>
                  <dd className="mt-1">{p.participants}</dd>
                </div>
              )}
              {p.outcome && (
                <div className="border-t border-[var(--hairline)] pt-3">
                  <dt className="text-[var(--muted)]">Outcome</dt>
                  <dd className="mt-1">{p.outcome}</dd>
                </div>
              )}
              {p.whatNext && (
                <div className="border-t border-[var(--hairline)] pt-3">
                  <dt className="text-[var(--muted)]">What happens next</dt>
                  <dd className="mt-1">{p.whatNext}</dd>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-5 pt-3 sm:col-span-2">
                <Button href={contactHref("project")}>Sponsor a Project</Button>
                <ArrowLink href={`/projects#${p.slug}`}>Read the project story</ArrowLink>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
