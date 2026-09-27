import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";
import { TLink } from "./TLink";

type Variant = "solid" | "outline" | "ghost";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
}

const base =
  "group/btn relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full font-medium leading-none transition-[color,border-color] duration-500 ease-[var(--ease-out-expo)]";

const variants: Record<Variant, string> = {
  solid: "bg-[var(--cta-bg)] text-[var(--cta-fg)] hover:text-[var(--cta-hover-fg)]",
  outline: "border border-current/40 text-current hover:border-transparent hover:text-[var(--bg)]",
  ghost: "text-current",
};

const fills: Record<Variant, string> = {
  solid: "bg-[var(--cta-hover)]",
  outline: "bg-[var(--fg)]",
  ghost: "hidden",
};

const sizes = {
  md: "h-12 pl-6 pr-2 text-[0.95rem]",
  lg: "h-16 pl-8 pr-2.5 text-[1.05rem]",
};

/**
 * Pill button: a fill rises from below on hover while the arrow slides out and
 * back in. Wrapped in a magnetic field on fine pointers.
 */
export function Button({ href, children, variant = "solid", size = "md", external, magnetic = true, className, onClick }: Props) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <TLink
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      className={cn(base, variants[variant], sizes[size], variant === "ghost" && "px-0 pr-0", className)}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-y-0",
          fills[variant],
        )}
      />
      <span className="whitespace-nowrap">{children}</span>
      <span
        aria-hidden
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-full",
          size === "lg" ? "size-11" : "size-8",
          variant === "solid" ? "bg-[var(--cta-fg)] text-[var(--cta-bg)]" : "bg-current/10",
        )}
      >
        <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-[180%]" strokeWidth={1.8} />
        <Arrow className="absolute size-4 -translate-x-[180%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0" strokeWidth={1.8} />
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </TLink>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}

/** Text link with animated underline and a travelling arrow. */
export function ArrowLink({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <TLink href={href} target={external ? "_blank" : undefined} className={cn("group/al inline-flex min-h-11 items-center gap-2 font-medium", className)}>
      <span className="u-link pb-0.5">{children}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/al:translate-x-1.5" strokeWidth={1.8} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </TLink>
  );
}
