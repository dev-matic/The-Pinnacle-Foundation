import type { Scripture } from "@/content/types";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { PinnacleLine } from "@/components/motion/PinnacleLine";
import { cn } from "@/lib/cn";

/**
 * Scripture, set as an editorial moment rather than a banner: the verse fills
 * in at reading pace, then a short line says why it matters to the Foundation.
 */
export function ScriptureMoment({
  scripture,
  bridge,
  tone = "ivory",
  className,
}: {
  scripture: Scripture;
  bridge: string;
  tone?: "ivory" | "sand" | "olive";
  className?: string;
}) {
  return (
    <section data-scroll-tone={tone} aria-label={`Scripture: ${scripture.reference}`} className={cn("relative py-28 lg:py-44", className)}>
      <div className="container-x">
        <PinnacleLine peak={18} height={70} className="mb-16 lg:mb-24" />
        <figure className="grid gap-10 lg:grid-cols-12">
          <blockquote className="lg:col-span-10">
            <ScrollWords
              text={`“${scripture.text}”`}
              className="serif-statement text-[clamp(2.3rem,1rem+4.6vw,6.2rem)] italic leading-[1.02]"
              emphasis={["actions", "truth"]}
              emphasisClassName="not-italic text-[var(--accent)]"
            />
          </blockquote>
          <figcaption className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            <span className="display text-3xl">
              {scripture.reference}
              {scripture.translation && <span className="ml-2 align-middle text-sm font-normal text-[var(--muted)]">{scripture.translation}</span>}
            </span>
            <p className="max-w-sm text-[var(--muted)]">{bridge}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
