import { transparencyDocs, contactHref } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const commitments = [
  "How donations are used",
  "Which projects receive support",
  "Which communities are served",
  "Who our verified partners are",
  "What each project achieved",
  "Financial information, where appropriate",
];

/**
 * "Giving with confidence." Used on About and Donate. Published documents are listed as
 * links; anything not yet published is described once, honestly, rather than as dead links.
 */
export function Transparency({ id = "accountability", tone = "sand" }: { id?: string; tone?: "sand" | "ivory" }) {
  const published = transparencyDocs.filter((d) => d.href);
  const pending = transparencyDocs.filter((d) => !d.href);
  return (
    <section id={id} data-scroll-tone={tone} aria-labelledby={`${id}-title`} className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealText id={`${id}-title`} lines={["Giving with", "confidence."]} className="display fs-lg" mode="words" />
          <p className="serif-statement mt-8 text-[clamp(1.6rem,1rem+1.4vw,2.4rem)]">We believe generosity deserves accountability.</p>
          <p className="mt-6 max-w-md text-[var(--muted)]">
            The Pinnacle Foundation aims to communicate clearly and regularly with everyone who supports its work, including:
          </p>
          <ul className="mt-6 space-y-2">
            {commitments.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-[var(--line)]" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {published.length > 0 && (
            <>
              <h3 className="text-sm text-[var(--muted)]">Published documents</h3>
              <ul className="mt-4 border-t border-[var(--hairline)]">
                {published.map((doc) => (
                  <li key={doc.id} className="border-b border-[var(--hairline)]">
                    <a href={doc.href!} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6">
                      <DocText title={doc.title} description={doc.description} />
                      <span className="grid size-11 place-items-center rounded-full border border-[var(--hairline)] transition-colors group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)]">
                        <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.6} />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {pending.length > 0 && (
            <div className={cn(published.length > 0 && "mt-12")}>
              <h3 className="display text-[clamp(1.6rem,1rem+1.2vw,2.3rem)]">
                {published.length > 0 ? "Still to come" : "What we will publish"}
              </h3>
              <p className="mt-3 max-w-md text-[var(--muted)]">
                Each document will appear here as it is finalised. Until then, ask and we will answer directly.
              </p>
              <ul className="mt-6 border-t border-[var(--hairline)]">
                {pending.map((doc) => (
                  <li key={doc.id} className="grid gap-1 border-b border-[var(--hairline)] py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <span className="font-medium">{doc.title}</span>
                    <span className="text-[0.95rem] text-[var(--muted)]">{doc.description}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ArrowLink href={contactHref("donation")}>Ask about our finances</ArrowLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DocText({ title, description }: { title: string; description: string }) {
  return (
    <span>
      <span className="display block text-[clamp(1.6rem,1rem+1.2vw,2.3rem)]">{title}</span>
      <span className="mt-1 block max-w-md text-[0.95rem] text-[var(--muted)]">{description}</span>
    </span>
  );
}
