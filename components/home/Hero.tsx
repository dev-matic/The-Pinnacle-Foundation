"use client";

import { Fragment, useRef } from "react";
import { hero, openingStatement } from "@/content/home";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { archClipPct, archClipPx, archPath } from "@/lib/arch";
import { setPageTone } from "@/lib/tone";
import { Photo } from "@/components/ui/Photo";
import { Button, ArrowLink } from "@/components/ui/Button";
import { INTRO_DONE_EVENT } from "@/components/layout/Nav";

type Box = { x: number; y: number; w: number; h: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const OUTLINE_GAP = 14;

/**
 * Home hero. A photograph rises inside the Pinnacle arch beside the headline,
 * then, as the visitor scrolls, the arch opens to fill the screen and becomes
 * the backdrop for the Foundation's opening statement.
 *
 * Layout lives in CSS (.hero-anchor marks the arch's resting place); the
 * script only mirrors that box into an animated clip-path.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      if (!motionOK) {
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
        return;
      }

      const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
      const stage = q<HTMLElement>(".hero-stage");
      const anchor = q<HTMLElement>(".hero-anchor");
      const photo = q<HTMLElement>(".hero-photo");
      const img = q<HTMLElement>(".hero-img");
      const outline = q<SVGPathElement>(".hero-outline path");
      const light = q<HTMLElement>(".hero-light");
      const ray = q<HTMLElement>(".hero-ray");

      const state = { rise: 0, expand: 0 };
      let base: Box = { x: 0, y: 0, w: 0, h: 0 };
      let W = 0;
      let H = 0;

      const measure = () => {
        const s = stage.getBoundingClientRect();
        const a = anchor.getBoundingClientRect();
        base = { x: a.left - s.left, y: a.top - s.top, w: a.width, h: a.height };
        W = s.width;
        H = s.height;
      };

      const render = () => {
        const r = state.rise;
        const e = state.expand;
        const risen: Box = { ...base, y: base.y + base.h * (1 - r), h: Math.max(base.h * r, 0.01) };
        const box: Box = {
          x: lerp(risen.x, 0, e),
          y: lerp(risen.y, 0, e),
          w: lerp(risen.w, W, e),
          h: lerp(risen.h, H, e),
        };
        const k = 1 - e;
        photo.style.clipPath = archClipPx(box, k);
        // The image itself frames the arch at rest (so its focal point sits inside) and opens with it.
        img.style.left = `${lerp(base.x, 0, e)}px`;
        img.style.top = `${lerp(base.y, 0, e)}px`;
        img.style.width = `${lerp(base.w, W, e)}px`;
        img.style.height = `${lerp(base.h, H, e)}px`;
        const g = OUTLINE_GAP;
        const ob = { x: box.x - g, y: box.y - g, w: box.w + g * 2, h: box.h + g };
        outline.setAttribute("d", archPath(ob, k));
        const apexX = ob.x + ob.w / 2;
        const apexY = ob.y;
        light.style.transform = `translate(${apexX}px, ${apexY}px)`;
        // The ray of light rises from the summit but stops short of the navigation.
        const navClearance = window.innerWidth >= 1024 ? 116 : 92;
        const rayLength = Math.max(apexY - 6 - navClearance, 0);
        ray.style.transform = `translate(${apexX}px, ${apexY - 6 - rayLength}px)`;
        ray.style.height = `${rayLength}px`;
      };

      measure();
      render();
      const onRefresh = () => {
        measure();
        render();
      };
      ScrollTrigger.addEventListener("refreshInit", measure);
      ScrollTrigger.addEventListener("refresh", onRefresh);

      // ── Opening sequence ───────────────────────────────
      const intro = gsap.timeline({ delay: 0.2 });
      intro
        .set(".hero-stage [data-intro]", { visibility: "visible" })
        .from(".hero-headline .char", { yPercent: 118, rotate: 5, transformOrigin: "0% 100%", stagger: 0.045, duration: 1.3 }, 0.35)
        .to(state, { rise: 1, duration: 1.7, ease: "expo.inOut", onUpdate: render }, 0.75)
        .from(".hero-img-inner", { scale: 1.4, duration: 2.4, ease: "expo.out" }, 0.8)
        .fromTo(outline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 1.5)
        .from(".hero-light-dot", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(3)" }, 2.5)
        .from(ray, { scaleY: 0, transformOrigin: "50% 100%", duration: 1.2, ease: "expo.out" }, 2.6)
        .from(".hero-support-text", { y: 28, opacity: 0, duration: 1 }, 2.0)
        .from(".hero-cta", { y: 22, opacity: 0, stagger: 0.1, duration: 0.9 }, 2.2)
        .add(() => window.dispatchEvent(new Event(INTRO_DONE_EVENT)), 1.8);

      // ── Scroll: the arch opens into the statement ──────
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.5}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
          // Only while this scene holds the screen; afterwards the next section owns the tone.
          onUpdate: (self) => self.isActive && setPageTone(self.progress > 0.4 ? "charcoal" : "ivory"),
        },
      });
      tl.to(state, { expand: 1, duration: 0.46, ease: "power2.inOut", onUpdate: render }, 0)
        .to(".hero-headline", { yPercent: -14, opacity: 0, duration: 0.34, ease: "power1.in" }, 0.04)
        .to(".hero-support", { y: -40, opacity: 0, duration: 0.16 }, 0)
        .fromTo(".hero-img", { scale: 1.1 }, { scale: 1, duration: 0.46 }, 0)
        .to([".hero-outline", ".hero-light", ".hero-ray-wrap"], { opacity: 0, duration: 0.1 }, 0.04)
        .to(".hero-shade", { opacity: 0.7, duration: 0.2 }, 0.34)
        // Placeholder caption (only present until real photography is added) clears before the statement arrives.
        .to(el.querySelectorAll(".hero-photo .ph-caption"), { opacity: 0, duration: 0.14 }, 0.22)
        .set(".hero-statement", { visibility: "visible" }, 0.5)
        .fromTo(".hs-word", { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, stagger: 0.028, duration: 0.12 }, 0.5)
        .fromTo(".hs-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.72)
        .fromTo(".hs-support", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.16 }, 0.78)
        .to({}, { duration: 0.1 });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", measure);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    },
    { scope: root },
  );

  const words = openingStatement.statement.split(" ");

  return (
    <section ref={root} data-scroll-tone="dynamic" data-initial-tone="ivory" aria-labelledby="hero-title" className="hero relative">
      <div className="hero-stage relative">
        <div className="hero-comp relative h-[100svh] min-h-[36rem] overflow-hidden">
          {/* Where the arch rests. Invisible; measured by the script and mirrored by the CSS fallback. */}
          <div aria-hidden className="hero-anchor pointer-events-none absolute bottom-[16rem] left-[50%] top-[var(--arch-top)] w-[44vw] lg:bottom-0 lg:left-[57%] lg:top-[20svh] lg:w-[min(28vw,30rem)]" />

          <div className="container-x relative z-10 flex h-full flex-col pt-[7rem] lg:pt-[9.5rem]">
            <h1 id="hero-title" data-intro className="hero-headline display text-[length:var(--hfs)]" aria-label={hero.lines.join(" ")}>
              {hero.lines.map((line, li) => (
                // On desktop the middle line also holds the supporting text beside it, so it is never shorter than that block.
                <span key={line} aria-hidden className={li === 1 ? "line-mask lg:min-h-[max(calc(var(--hfs)*0.84),12.5rem)]" : "line-mask"}>
                  <span className="block">
                    {Array.from(line).map((c, i) => (
                      <span key={i} className="char">
                        {c}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <div className="hero-support relative z-30 mt-auto max-w-md pb-[max(1.75rem,4svh)] lg:absolute lg:left-[calc(clamp(1rem,0.4rem+3vw,3.5rem)+var(--hfs)*0.98)] lg:top-[calc(9.5rem+var(--hfs)*0.9)] lg:mt-0 lg:max-w-[min(30rem,calc(57vw-var(--hfs)*0.98-6rem))] lg:pb-0">
              <p data-intro className="hero-support-text lede text-[var(--muted)] max-lg:text-[1.1rem]">
                {hero.support}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span data-intro className="hero-cta">
                  <Button href={hero.primary.href}>{hero.primary.label}</Button>
                </span>
                <span data-intro className="hero-cta">
                  <Button href={hero.secondary.href} variant="outline">
                    {hero.secondary.label}
                  </Button>
                </span>
              </div>
            </div>
            <p data-intro className="hero-cta hero-support relative z-30 text-[0.95rem] max-lg:hidden lg:absolute lg:bottom-[max(1.5rem,3svh)] [@media(max-height:780px)]:hidden">
              <ArrowLink href={hero.about.href}>{hero.about.label}</ArrowLink>
            </p>
          </div>

          {/* The photograph, clipped to the arch. Above the headline so the type passes behind it. */}
          <div data-intro className="hero-photo absolute z-20 overflow-hidden" style={{ clipPath: archClipPct(0.56) }}>
            <div className="hero-img absolute inset-0">
              <div className="hero-img-inner absolute inset-0">
                <Photo slug={hero.photo} priority sizes="100vw" className="h-full w-full" placeholder="scene" />
              </div>
            </div>
            <div className="hero-shade absolute inset-0 bg-charcoal opacity-0" />
          </div>

          <svg data-intro aria-hidden className="hero-outline pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible">
            <path fill="none" stroke="var(--color-gold)" strokeWidth="1.25" pathLength={1} strokeDasharray="1" />
          </svg>
          <div data-intro aria-hidden className="hero-ray-wrap pointer-events-none absolute inset-0 z-20">
            <span className="hero-ray absolute left-0 top-0 block w-px origin-bottom bg-gradient-to-b from-transparent to-gold" />
          </div>
          <span data-intro aria-hidden className="hero-light pointer-events-none absolute left-0 top-0 z-20 block">
            <span className="hero-light-dot absolute -left-[5px] -top-[5px] block size-2.5 rounded-full bg-gold shadow-[0_0_28px_8px_rgb(198_161_91/0.55)]" />
          </span>
        </div>

        {/* Opening statement: revealed over the opened photograph. */}
        <div className="hero-statement" data-tone="charcoal">
          <div className="container-x flex h-full flex-col justify-center py-24">
            <p className="serif-statement max-w-[17ch] text-[clamp(2.5rem,1rem+5.4vw,6.6rem)]">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                    <span className="hs-word inline-block">{w}</span>
                  </span>{" "}
                </Fragment>
              ))}
            </p>
            <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-start lg:gap-10">
              <span aria-hidden className="hs-rule mt-[0.9em] block h-px w-24 shrink-0 origin-left bg-gold lg:w-40" />
              <p className="hs-support lede max-w-[42ch] text-ivory/80">{openingStatement.support}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
