import type { ReactNode } from "react";
import type { Faq } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/Button";

export function FaqSection({
  faqs,
  title = ["Questions,", "answered."],
  intro,
  more,
  tone = "ivory",
}: {
  faqs: Faq[];
  title?: string[];
  intro?: ReactNode;
  more?: { label: string; href: string };
  tone?: "ivory" | "sand";
}) {
  return (
    <section id="faq" data-scroll-tone={tone} aria-labelledby="faq-title" className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RevealText id="faq-title" lines={title} className="display fs-lg" mode="words" />
          {intro && <p className="mt-6 max-w-xs text-[var(--muted)]">{intro}</p>}
          {more && (
            <div className="mt-8">
              <ArrowLink href={more.href}>{more.label}</ArrowLink>
            </div>
          )}
        </div>
        <Accordion items={faqs} className="lg:col-span-8" />
      </div>
    </section>
  );
}
