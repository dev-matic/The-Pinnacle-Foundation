"use client";

import { useRef } from "react";
import { journey } from "@/content/home";
import type { Theme } from "@/content/types";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

const tones: Theme[] = ["ivory", "sand", "olive", "terracotta", "charcoal"];

/**
 * From generosity to impact: five steps travelled sideways. The colour of the
 * page walks from ivory to charcoal and the brand line climbs one step per stage.
 */
export function GenerosityJourney() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const track = ref.current!.querySelector<HTMLElement>(".gj-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          ".gj-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8 } },
        );
        gsap.utils.toArray<HTMLElement>(".gj-num").forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 40 },
            {
              xPercent: -40,
              ease: "none",
              scrollTrigger: { trigger: num, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".gj-photo").forEach((ph) => {
          gsap.fromTo(
            ph,
            { clipPath: "inset(12% 12% 12% 12% round 1.5rem)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
              ease: "none",
              scrollTrigger: { trigger: ph, containerAnimation: tween, start: "left 90%", end: "center 55%", scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  const n = journey.length;
  // A five-step ascent along the base of the track.
  const d =
    "M0 100 " +
    journey.map((_, i) => `L${((i + 0.5) / (n + 0.5)) * 100} ${100 - (i / n) * 100} L${((i + 1.5) / (n + 0.5)) * 100} ${100 - (i / n) * 100}`).join(" ") +
    " L100 0";

  return (
    <section ref={ref} id="how-giving-works" aria-labelledby="gj-title" className="relative overflow-hidden">
      <div className="gj-track relative flex flex-col lg:motion-safe:[html.js_&]:h-[100svh] lg:motion-safe:[html.js_&]:w-max lg:motion-safe:[html.js_&]:flex-row">
        <div data-scroll-tone="ivory" className="container-x flex shrink-0 flex-col justify-center py-24 lg:motion-safe:[html.js_&]:w-[62vw] lg:motion-safe:[html.js_&]:max-w-none lg:motion-safe:[html.js_&]:py-0">
          <h2 id="gj-title" className="display text-[clamp(3.2rem,1rem+8vw,9.5rem)]">
            From generosity
            <br /> to impact.
          </h2>
          <p className="lede mt-8 max-w-[34ch] text-[var(--muted)]">
            Every gift travels. Here is the path it takes, from the moment you choose to give to the moment you see what it made possible.
          </p>
        </div>

        <ol className="contents">
          {journey.map((step, i) => (
            <li
              key={step.title}
              data-scroll-tone={tones[i]}
              className={cn(
                "relative flex shrink-0 flex-col gap-8 px-[clamp(1rem,0.4rem+3vw,3.5rem)] py-20",
                "lg:motion-safe:[html.js_&]:h-full lg:motion-safe:[html.js_&]:w-[70vw] lg:motion-safe:[html.js_&]:flex-row lg:motion-safe:[html.js_&]:items-center lg:motion-safe:[html.js_&]:gap-[2.5vw] lg:motion-safe:[html.js_&]:py-0 lg:motion-safe:[html.js_&]:pr-[10vw]",
              )}
            >
              <div className="relative flex-1 lg:motion-safe:[html.js_&]:w-[30vw] lg:motion-safe:[html.js_&]:flex-none">
                <span aria-hidden className="gj-num display block text-[clamp(7rem,4rem+14vw,20rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--line)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-6 text-[clamp(2.2rem,1rem+3.4vw,4.6rem)]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="lede mt-5 max-w-[30ch] text-[var(--muted)]">{step.text}</p>
              </div>
              <div className="gj-photo relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl lg:motion-safe:[html.js_&]:w-[24vw]">
                <Photo slug={step.photo} sizes="(min-width:1024px) 26vw, 90vw" className="h-full w-full" />
              </div>
            </li>
          ))}
        </ol>

        {/* The ascent along the base (desktop horizontal mode only) */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[6svh] left-[62vw] hidden h-[10svh] w-[calc(100%-62vw)] overflow-visible lg:motion-safe:[html.js_&]:block"
        >
          <path className="gj-path" d={d} fill="none" stroke="var(--line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
        </svg>
      </div>
    </section>
  );
}
