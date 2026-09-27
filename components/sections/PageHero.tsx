import type { ReactNode } from "react";
import type { PhotoSlug, Theme } from "@/content/types";
import { RevealText } from "@/components/motion/RevealText";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { PinnacleLine } from "@/components/motion/PinnacleLine";
import { cn } from "@/lib/cn";

interface Props {
  title: string[];
  intro?: string;
  photo?: PhotoSlug;
  photoAlt?: string;
  tone?: Theme;
  children?: ReactNode;
  /** Horizontal position of the brand line's summit under the hero. */
  peak?: number;
}

/**
 * Opening for supporting pages: oversized title that rises letter by letter,
 * a calm introduction, and (optionally) a photograph in the Pinnacle arch.
 */
export function PageHero({ title, intro, photo, photoAlt, tone = "ivory", children, peak = 72 }: Props) {
  return (
    <section data-scroll-tone={tone} className="relative pb-10 pt-36 lg:pb-16 lg:pt-48">
      <div className="container-x grid items-end gap-12 lg:grid-cols-12">
        <div className={cn(photo ? "lg:col-span-8" : "lg:col-span-11")}>
          <RevealText as="h1" lines={title} trigger="load" delay={0.35} tilt className="display fs-huge" />
          {intro && <p className="lede mt-10 max-w-[44ch] text-[var(--muted)]">{intro}</p>}
          {children}
        </div>
        {photo && (
          <ArchFrame slug={photo} alt={photoAlt} priority aspect={0.74} outline className="w-full max-w-[22rem] justify-self-end max-lg:hidden lg:col-span-4" sizes="(min-width:1024px) 26vw, 0px" />
        )}
      </div>
      <PinnacleLine peak={peak} height={64} draw="once" className="mt-16 lg:mt-24" />
    </section>
  );
}
