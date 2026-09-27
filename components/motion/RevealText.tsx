"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Mode = "chars" | "words" | "lines";

interface Props {
  /** Each entry renders on its own line. */
  lines: string[];
  as?: ElementType;
  mode?: Mode;
  className?: string;
  /** One class for every line, or one per line. */
  lineClassName?: string | string[];
  /** "scroll" plays once when entering the viewport; "load" plays immediately. */
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
  id?: string;
  /** Rotate letters slightly as they rise, for the most expressive headings. */
  tilt?: boolean;
}

/**
 * Masked text reveal. Lines sit in overflow-hidden masks and their characters,
 * words or whole lines rise into place. Screen readers get the plain text.
 */
export function RevealText({
  lines,
  as: Tag = "h2",
  mode = "chars",
  className,
  lineClassName,
  trigger = "scroll",
  delay = 0,
  stagger,
  id,
  tilt,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const targets = ref.current!.querySelectorAll(mode === "lines" ? ".rt-line" : mode === "words" ? ".word" : ".char");
        gsap.from(targets, {
          yPercent: 115,
          rotate: tilt ? 6 : 0,
          transformOrigin: "0% 100%",
          duration: mode === "lines" ? 1.3 : 1.1,
          ease: "expo.out",
          stagger: stagger ?? (mode === "chars" ? 0.028 : mode === "words" ? 0.06 : 0.12),
          delay,
          scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
        });
      });
    },
    { scope: ref },
  );

  const label = lines.join(" ");

  return (
    <Tag ref={ref} id={id} className={className} aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className={cn("line-mask", Array.isArray(lineClassName) ? lineClassName[i] : lineClassName)}>
          <span className="rt-line block">
            {mode === "lines"
              ? line
              : line.split(" ").map((word, wi, arr) => (
                  <span key={wi} className="word whitespace-nowrap">
                    {mode === "chars"
                      ? Array.from(word).map((c, ci) => (
                          <span key={ci} className="char">
                            {c}
                          </span>
                        ))
                      : word}
                    {wi < arr.length - 1 && " "}
                  </span>
                ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
