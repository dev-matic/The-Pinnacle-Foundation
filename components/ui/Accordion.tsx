"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion with oversized numbering. Buttons carry aria-expanded and
 * control labelled regions; one item opens at a time.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className={cn("border-t border-[var(--hairline)]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={item.question} className="border-b border-[var(--hairline)]">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[3.2rem_1fr_auto] items-baseline gap-3 py-6 text-left sm:grid-cols-[6rem_1fr_auto] sm:gap-6 lg:py-8"
              >
                <span
                  aria-hidden
                  className={cn(
                    "display text-[2.2rem] leading-none transition-colors duration-500 sm:text-[3.6rem]",
                    isOpen ? "text-[var(--accent)]" : "text-transparent [-webkit-text-stroke:1px_var(--muted)]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="serif-statement text-[clamp(1.35rem,1rem+1.1vw,2.1rem)] transition-transform duration-500 group-hover:translate-x-1">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-10 place-items-center self-center rounded-full border border-[var(--hairline)] transition-all duration-500",
                    isOpen && "rotate-45 border-transparent bg-[var(--fg)] text-[var(--bg)]",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.8} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-8 pl-[3.95rem] text-[1.05rem] text-[var(--muted)] sm:pl-[7.5rem]">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
