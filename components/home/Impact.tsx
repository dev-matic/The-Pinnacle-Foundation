"use client";

import { useRef } from "react";
import { impactStats, impactStatement, hasUnverifiedStats } from "@/content/impact";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Counter } from "@/components/motion/Counter";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

/**
 * Impact, as an ascent. Each figure sits a step higher than the last and the
 * brand line climbs through them to a point of light.
 */
export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const n = impactStats.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".im-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".im-steps", start: "top 80%", end: "bottom 60%", scrub: 0.8 } },
        );
        gsap.from(".im-step", {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 1.2,
          scrollTrigger: { trigger: ".im-steps", start: "top 75%", once: true },
        });
        gsap.fromTo(".im-light", { scale: 0 }, { scale: 1, ease: "back.out(3)", scrollTrigger: { trigger: ".im-steps", start: "bottom 70%", end: "bottom 60%", scrub: true } });
      });
    },
    { scope: ref },
  );

  // Staircase path through the top-left corner of each step (in a 0–100 box).
  const pts = impactStats.map((_, i) => [(i / n) * 100, 100 - ((i + 1) / (n + 1)) * 100 + 8]);
  const d = `M0 100 ${pts.map(([x, y]) => `L${x} ${y} L${x + 100 / n - 1} ${y}`).join(" ")} L100 0`;

  return (
    <section ref={ref} id="impact" data-scroll-tone="olive" aria-labelledby="impact-title" className="relative scroll-mt-24 overflow-hidden py-28 lg:py-40">
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="impact-title" className="display text-[clamp(1.6rem,1rem+1.6vw,2.4rem)]">
            Impact so far
          </h2>
          {hasUnverifiedStats && <PlaceholderTag label="Placeholder figures, awaiting verification" />}
        </div>
        <ScrollWords
          text={impactStatement}
          className="serif-statement mt-10 max-w-[20ch] text-[clamp(2.2rem,1rem+4.2vw,5.4rem)]"
          emphasis={["person", "family", "community", "story"]}
          emphasisClassName="italic text-gold"
        />

        <div className="im-steps relative mt-20 lg:mt-32">
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 hidden h-[24rem] w-full overflow-visible lg:block">
            <path className="im-path" d={d} fill="none" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
          </svg>
          <span aria-hidden className="im-light absolute right-0 top-0 hidden size-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold shadow-[0_0_30px_8px_rgb(198_161_91/0.55)] lg:block" />

          <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-0">
            {impactStats.map((s, i) => (
              <div
                key={s.id}
                className="im-step relative flex flex-col border-t border-[var(--hairline)] pt-5 lg:mt-[calc(24rem*var(--y))] lg:border-t-0 lg:px-5 lg:pt-6"
                style={{ ["--y" as string]: pts[i][1] / 100 }}
              >
                <dt className="order-2 mt-2 max-w-[14ch] text-lg text-[var(--muted)] lg:order-none lg:mt-0 lg:mb-3">{s.label}</dt>
                <dd className="order-1 display text-[clamp(4rem,1rem+7vw,8.5rem)] leading-[0.82] lg:order-none">
                  <Counter value={s.value} suffix={s.suffix} />
                  {!s.verified && <span className="sr-only"> (placeholder figure)</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {hasUnverifiedStats && (
          <p className="mt-12 max-w-xl text-sm text-[var(--muted)]">
            These figures are placeholders for design review only. Verified numbers will replace them once the Foundation has confirmed them.
          </p>
        )}
      </div>
    </section>
  );
}
