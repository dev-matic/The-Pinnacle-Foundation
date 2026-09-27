import { ArrowUpRight } from "lucide-react";
import { workAreas } from "@/content/work";
import { ctas } from "@/content/site";
import { RevealText } from "@/components/motion/RevealText";
import { TLink } from "@/components/ui/TLink";
import { Button } from "@/components/ui/Button";

/**
 * "Where love becomes action." Each area of work is a large typographic row;
 * hovering or focusing a row slides it forward and reveals its description
 * (always visible on touch screens).
 */
export function WorkPreview() {
  return (
    <section data-scroll-tone="ivory" aria-labelledby="work-title" className="relative py-28 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealText id="work-title" lines={["Where love", "becomes action."]} className="display fs-xl lg:col-span-8" />
          <div className="lg:col-span-4">
            <p className="max-w-sm text-[var(--muted)]">
              Five ways the Foundation turns compassion into practical help across Ghana, each one rooted in the same love.
            </p>
          </div>
        </div>

        <ul className="mt-16 border-t border-[var(--hairline)] lg:mt-24">
          {workAreas.map((area) => (
            <li key={area.id} className="border-b border-[var(--hairline)]">
              <TLink href={`/projects#${area.id}`} className="group relative grid gap-4 py-7 lg:grid-cols-12 lg:items-center lg:py-9">
                <span className="display text-[clamp(2rem,1rem+3vw,4rem)] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:text-olive group-focus-visible:translate-x-4 lg:col-span-7">
                  {area.title}
                </span>
                <span className="max-w-sm text-[var(--muted)] transition-opacity duration-500 lg:col-span-4 lg:[@media(hover:hover)]:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  {area.summary}
                </span>
                <span className="hidden justify-self-end lg:col-span-1 lg:flex">
                  <span className="grid size-12 place-items-center rounded-full border border-[var(--hairline)] transition-all duration-500 group-hover:rotate-45 group-hover:border-olive group-hover:bg-olive group-hover:text-ivory">
                    <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                </span>
              </TLink>
            </li>
          ))}

        </ul>

        <div className="mt-14 flex justify-end">
          <Button href={ctas.projects.href} variant="outline">
            {ctas.projects.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
