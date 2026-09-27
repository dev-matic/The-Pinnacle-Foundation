"use client";

import { useRef } from "react";
import { finalCta } from "@/content/home";
import { ctas } from "@/content/site";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { archPath } from "@/lib/arch";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import type { PhotoSlug } from "@/content/types";

const RAYS = 13;

/**
 * The closing moment. The brand line completes its journey: a full arch rises
 * behind the headline and light breaks from its summit. A soft glow follows the cursor.
 */
export function FinalCta({ lines = finalCta.lines, support = finalCta.support, photo = "joy-portrait" as PhotoSlug }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 45%", scrub: 1 } });
        tl.fromTo(".fc-arch", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
          .fromTo(".fc-ray", { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.03, ease: "none", duration: 0.4 }, 0.6)
          .fromTo(".fc-sun", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2)", duration: 0.3 }, 0.55)
          .fromTo(".fc-line", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, ease: "expo.out", duration: 0.6 }, 0.1);
        gsap.fromTo(".fc-photo", { scale: 1.2, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: ref },
  );

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // Arch in a 1000×1000 box; rays fan out from its summit.
  const apex = { x: 500, y: 150 };
  const arch = archPath({ x: 230, y: 150, w: 540, h: 900 });

  return (
    <section
      ref={ref}
      data-scroll-tone="charcoal"
      aria-labelledby="final-title"
      onPointerMove={onMove}
      className="relative isolate overflow-hidden py-32 [--mx:50%] [--my:40%] lg:py-48"
    >
      <div aria-hidden className="absolute inset-0 -z-20 opacity-[0.16]">
        <div className="fc-photo absolute inset-0">
          <Photo slug={photo} sizes="100vw" alt="" className="h-full w-full" imgClassName="grayscale" placeholder="none" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300 [background:radial-gradient(38rem_circle_at_var(--mx)_var(--my),rgb(198_161_91/0.16),transparent_70%)] motion-reduce:[background:none]"
      />
      <svg aria-hidden viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <path className="fc-arch" d={arch} fill="none" stroke="var(--color-gold)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" opacity="0.7" />
        {Array.from({ length: RAYS }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 1)) / (RAYS + 1);
          const r1 = 26;
          const r2 = 150 + (i % 2) * 70;
          return (
            <line
              key={i}
              className="fc-ray"
              x1={apex.x + Math.cos(a) * r1}
              y1={apex.y + Math.sin(a) * r1}
              x2={apex.x + Math.cos(a) * r2}
              y2={apex.y + Math.sin(a) * r2}
              stroke="var(--color-gold)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              opacity="0.55"
            />
          );
        })}
        <circle className="fc-sun" cx={apex.x} cy={apex.y} r="7" fill="var(--color-gold)" style={{ transformOrigin: `${apex.x}px ${apex.y}px` }} />
      </svg>

      <div className="container-x relative text-center">
        <h2 id="final-title" className="display text-[clamp(3.4rem,1rem+10vw,12rem)]" aria-label={lines.join(" ")}>
          {lines.map((l, i) => (
            <span key={l} aria-hidden className="line-mask">
              <span className={`fc-line block ${i === 1 ? "text-gold" : ""}`}>{l}</span>
            </span>
          ))}
        </h2>
        <p className="lede mx-auto mt-10 max-w-[40ch] text-[var(--muted)]">{support}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button href={ctas.donate.href} size="lg">
            Donate
          </Button>
          <Button href={ctas.volunteer.href} size="lg" variant="outline">
            Volunteer With Us
          </Button>
          <Button href={ctas.partner.href} size="lg" variant="outline">
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
