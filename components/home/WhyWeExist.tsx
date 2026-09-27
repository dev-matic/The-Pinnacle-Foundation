"use client";

import { useRef } from "react";
import { principles, whyWeExist } from "@/content/home";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { setPageTone } from "@/lib/tone";
import { RevealText } from "@/components/motion/RevealText";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { Photo } from "@/components/ui/Photo";
import { archClipPct } from "@/lib/arch";
import { cn } from "@/lib/cn";

/**
 * FAITH → COMPASSION → ACTION. A pinned scene: the word, photograph, colour and
 * the rising marker all change together as the visitor scrolls.
 */
export function WhyWeExist() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const steps = principles.length;
        const tl = gsap.timeline({
          defaults: { ease: "expo.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ".wwe-stage",
            start: "top top",
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!self.isActive) return;
              // Colour turns over halfway through each transition. Read from scroll position,
              // not the smoothed timeline, so the tone never lags behind a stopped scroll.
              const t = self.progress * tl.duration();
              const i = Math.min(steps - 1, Math.max(0, Math.floor((t - 1.9) / 1.4) + 1));
              setPageTone(principles[i].theme);
            },
            onLeaveBack: () => setPageTone("olive"),
          },
        });

        for (let i = 1; i < steps; i++) {
          const at = i * 1.4;
          // Explicit from/to pairs: each word's entrance renders its hidden state up front,
          // its exit only takes effect when the playhead reaches it.
          tl.fromTo(`.wwe-word-${i - 1} .char`, { y: 0, yPercent: 0 }, { y: 0, yPercent: -110, stagger: 0.03, duration: 0.8, immediateRender: false }, at)
            .fromTo(`.wwe-word-${i} .char`, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, stagger: 0.03, duration: 0.9 }, at + 0.15)
            .to(`.wwe-photo-${i - 1}`, { clipPath: "inset(0% 0% 100% 0%)", duration: 1 }, at)
            .fromTo(`.wwe-photo-${i}`, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
            .fromTo(`.wwe-photo-${i} .wwe-img`, { scale: 1.3 }, { scale: 1, duration: 1.4 }, at)
            .to(`.wwe-text-${i - 1}`, { opacity: 0, y: -30, duration: 0.5 }, at)
            .fromTo(`.wwe-text-${i}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, at + 0.4)
            .to(".wwe-marker", { top: `${100 - (i / (steps - 1)) * 100}%`, duration: 1 }, at)
            .to(`.wwe-step-${i}`, { opacity: 1, duration: 0.4 }, at + 0.3);
        }
        tl.to({}, { duration: 0.6 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <section data-scroll-tone="olive" aria-labelledby="why-title" className="relative pb-16 pt-28 lg:pb-24 lg:pt-40">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <RevealText id="why-title" lines={[whyWeExist.title]} className="display fs-xl lg:col-span-7" tilt />
          <p className="lede max-w-[38ch] lg:col-span-5">{whyWeExist.copy}</p>
        </div>
      </section>

      {/* Pinned scene (motion) — or three calm blocks (reduced motion / no JS). */}
      <section data-scroll-tone="dynamic" aria-label="Faith, compassion, action" className="wwe-stage relative">
        <ul className="sr-only">
          {principles.map((p) => (
            <li key={p.word}>
              {p.word}: {p.text}
            </li>
          ))}
        </ul>
        <div aria-hidden className="wwe-scene container-x relative hidden h-[100svh] min-h-[40rem] grid-cols-12 content-center items-center gap-x-6 gap-y-8 motion-safe:[html.js_&]:grid lg:content-normal lg:gap-y-6">
          <div className="relative col-span-12 row-start-2 lg:col-span-7 lg:row-start-1 lg:self-center">
            <div className="relative h-[0.9em] text-[clamp(3.2rem,12.5vw,13rem)] lg:text-[min(8.1vw,10rem)]">
              {principles.map((p, i) => (
                <p key={p.word} aria-hidden className={cn("wwe-word display absolute inset-x-0 top-0 overflow-hidden pb-[0.05em]", `wwe-word-${i}`)}>
                  {Array.from(p.word).map((c, ci) => (
                    <span key={ci} className="char">
                      {c}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="relative mt-8 min-h-[6.5rem] max-w-md lg:mt-12">
              {principles.map((p, i) => (
                <p key={p.word} className={cn("wwe-text lede absolute inset-0", `wwe-text-${i}`)} style={i === 0 ? undefined : { opacity: 0 }}>
                  {p.text}
                </p>
              ))}
            </div>
          </div>

          <div className="relative col-span-12 row-start-1 w-[52vw] max-w-[15rem] lg:col-span-4 lg:col-start-8 lg:w-full lg:max-w-[26rem]">
            <div className="relative aspect-[0.72]" style={{ clipPath: archClipPct(0.72) }}>
              {principles.map((p, i) => (
                <div key={p.word} className={cn("absolute inset-0", `wwe-photo-${i}`)} style={i === 0 ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}>
                  <div className="wwe-img absolute inset-0">
                    <Photo slug={p.photo} sizes="(min-width:1024px) 30vw, 52vw" className="h-full w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The rising marker: three stations on a vertical line, climbing as the scene advances. */}
          <div aria-hidden className="absolute bottom-[14svh] top-[14svh] hidden w-px bg-[var(--hairline)] lg:right-[calc(clamp(1rem,0.4rem+3vw,3.5rem)+6.25rem)] lg:block">
            {principles.map((p, i) => (
              <span
                key={p.word}
                className={cn("wwe-step absolute left-4 translate-y-[-50%] whitespace-nowrap text-sm", `wwe-step-${i}`)}
                style={{ top: `${100 - (i / (principles.length - 1)) * 100}%`, opacity: i === 0 ? 1 : 0.35 }}
              >
                {p.word}
              </span>
            ))}
            <span className="wwe-marker absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--line)] shadow-[0_0_20px_4px_rgb(198_161_91/0.5)]" />
          </div>
        </div>

        {/* Static version */}
        <ol aria-hidden className="container-x space-y-20 pb-24 motion-safe:[html.js_&]:hidden">
          {principles.map((p) => (
            <li key={p.word} data-tone={p.theme} className="tone-surface grid items-center gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="display fs-xl">{p.word}</p>
                <p className="lede mt-6 max-w-md">{p.text}</p>
              </div>
              <ArchFrame slug={p.photo} className="w-full max-w-sm lg:col-span-4 lg:col-start-9" reveal={false} parallax={false} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
