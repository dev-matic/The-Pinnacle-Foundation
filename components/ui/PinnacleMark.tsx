import { cn } from "@/lib/cn";

/**
 * The Foundation's mark: a pointed arch drawn as a single line, with a point of
 * light at its summit. It echoes the arch frames used for photography.
 */
export function PinnacleMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      className={cn("h-8 w-auto", className)}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M4 39V22.4C4 13.6 9.3 7.2 16 3.6c6.7 3.6 12 10 12 18.8V39"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 39V26c0-5 2-8.7 5-11 3 2.3 5 6 5 11v13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".45" />
      <circle cx="16" cy="3.2" r="2.6" fill="var(--line, #c6a15b)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PinnacleMark className="h-8 shrink-0" />
      <span className="display text-[0.98rem] leading-[0.9] tracking-[0.02em]">
        The Pinnacle
        <br />
        Foundation
      </span>
    </span>
  );
}
