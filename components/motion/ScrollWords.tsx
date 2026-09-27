"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** Scroll distance over which the words fill in. */
  start?: string;
  end?: string;
  /** Words (lower-case, punctuation-free) that should also lift slightly as they arrive. */
  emphasis?: string[];
  emphasisClassName?: string;
}

/**
 * Reading-pace reveal: words brighten from a faint ghost to full strength as
 * the visitor scrolls, so the sentence arrives at the speed it is read.
 */
export function ScrollWords({ text, as: Tag = "p", className, start = "top 80%", end = "bottom 45%", emphasis = [], emphasisClassName }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const words = ref.current!.querySelectorAll<HTMLElement>(".sw");
        gsap.fromTo(
          words,
          { opacity: 0.3 },
          { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ref.current, start, end, scrub: 0.5 } },
        );
        const emph = ref.current!.querySelectorAll<HTMLElement>(".sw-em");
        if (emph.length)
          gsap.fromTo(
            emph,
            { yPercent: 18 },
            { yPercent: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ref.current, start, end, scrub: 0.5 } },
          );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((w, i, arr) => {
        const bare = w.toLowerCase().replace(/[^a-z']/g, "");
        const em = emphasis.includes(bare);
        return (
          <Fragment key={i}>
            <span className={em ? `sw sw-em inline-block ${emphasisClassName ?? ""}` : "sw"}>{w}</span>
            {i < arr.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </Tag>
  );
}
