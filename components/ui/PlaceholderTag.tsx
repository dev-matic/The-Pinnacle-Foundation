import { cn } from "@/lib/cn";

/** Visible marker for content that is not yet verified by the Foundation. */
export function PlaceholderTag({ label = "Placeholder", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-current/50 px-2.5 py-1 text-[0.8rem] font-medium leading-none opacity-80",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
