import { approachSteps, approachIsDraft } from "@/content/work";
import { RevealText } from "@/components/motion/RevealText";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

/** "How we serve communities": the four steps every project follows. */
export function HowWeServe({ tone = "sand" }: { tone?: "sand" | "ivory" }) {
  return (
    <section data-scroll-tone={tone} aria-labelledby="approach-title" className="py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealText id="approach-title" lines={["How we serve", "communities."]} className="display fs-xl lg:col-span-8" mode="words" />
          <div className="lg:col-span-4">
            <p className="max-w-sm text-[var(--muted)]">Every project follows the same path, whatever its size.</p>
            {approachIsDraft && <PlaceholderTag label="Draft, to be confirmed" className="mt-4" />}
          </div>
        </div>
        <ol className="mt-16 grid gap-10 border-t border-[var(--hairline)] pt-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {approachSteps.map((a, i) => (
            <li key={a.title}>
              <span aria-hidden className="display block text-7xl text-transparent [-webkit-text-stroke:1px_var(--line)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-3xl">{a.title}</h3>
              <p className="mt-3 max-w-xs text-[var(--muted)]">{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
