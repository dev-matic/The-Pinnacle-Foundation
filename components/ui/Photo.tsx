import { getPhoto } from "@/content/photos";
import type { PhotoSlug } from "@/content/types";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";
import { PinnacleMark } from "./PinnacleMark";

interface Props {
  slug: PhotoSlug;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Override the alt text (e.g. "" when the image is purely decorative in context). */
  alt?: string;
  style?: CSSProperties;
  focus?: string;
  /**
   * How to stand in while no real photograph exists:
   * "frame" (default) a labelled swatch for framed images,
   * "scene" a dark full-bleed slate for moments that fill the screen,
   * "none" render nothing (for purely atmospheric backgrounds).
   */
  placeholder?: "frame" | "scene" | "none";
}

// Muted surfaces from the brand palette, so empty frames still sit well in each layout.
const surfaces = [
  { bg: "#d8ccb8", fg: "#1f1f1b" }, // sand
  { bg: "#b9c0a8", fg: "#1f1f1b" }, // sage
  { bg: "#d4b3a0", fg: "#1f1f1b" }, // clay
  { bg: "#c9bba3", fg: "#1f1f1b" }, // stone
];

const surfaceFor = (slug: string) => surfaces[Array.from(slug).reduce((n, c) => n + c.charCodeAt(0), 0) % surfaces.length];

/**
 * A photograph that fills its parent (object-fit: cover). Until a real image
 * has been added for the slug (see content/photos.ts), it renders a labelled
 * placeholder frame instead, so layouts keep their shape.
 */
export function Photo({ slug, sizes = "100vw", className, imgClassName, priority, alt, style, focus, placeholder = "frame" }: Props) {
  const p = getPhoto(slug);
  const label = alt ?? p.alt;

  if (!p.file) {
    if (placeholder === "none") return null;
    const a11y = label ? { role: "img", "aria-label": `Photo placeholder: ${label}` } : { "aria-hidden": true as const };

    if (placeholder === "scene") {
      return (
        <span
          className={cn("@container relative block overflow-hidden bg-[#2c3527] text-ivory", className)}
          style={style}
          {...a11y}
        >
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,currentColor_0_1px,transparent_1px_22px)]"
          />
          <span aria-hidden className="ph-caption absolute inset-0 flex flex-col items-center justify-center gap-5 px-[8%] text-center">
            <PinnacleMark className="h-[clamp(2.5rem,12cqw,6rem)] text-ivory/45 [--line:var(--color-gold)]" />
            {p.caption && (
              <span className="flex flex-col items-center gap-1.5">
                <span className="text-[0.8rem] font-medium tracking-[0.02em] text-ivory/70">Photograph to come</span>
                <span className="serif-statement max-w-[22ch] text-[clamp(1.35rem,5.5cqw,2.6rem)] italic leading-tight">{p.caption}</span>
              </span>
            )}
          </span>
        </span>
      );
    }

    const s = surfaceFor(slug);
    return (
      <span className={cn("@container relative block overflow-hidden", className)} style={{ backgroundColor: s.bg, color: s.fg, ...style }} {...a11y}>
        <span
          aria-hidden
          className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,currentColor_0_1px,transparent_1px_18px)]"
        />
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <PinnacleMark className="h-[clamp(1.5rem,16cqw,4.5rem)] opacity-35" />
        </span>
        {p.caption && (
          <span aria-hidden className="absolute inset-x-[max(1rem,10%)] bottom-[max(1rem,10%)] hidden flex-col gap-0.5 text-left leading-snug @min-[11rem]:flex">
            <span className="text-[0.75rem] font-medium opacity-75">Photograph to come</span>
            <span className="text-[0.875rem] font-medium">{p.caption}</span>
          </span>
        )}
      </span>
    );
  }

  const f = p.file;
  const srcSet = f.widths.map((w) => `/images/photos/${slug}-${w}.webp ${w}w`).join(", ");
  const fallback = `/images/photos/${slug}-${f.widths.find((w) => w >= 1080) ?? f.widths.at(-1)}.webp`;
  return (
    <span
      className={cn("relative block overflow-hidden bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${f.blur})`, backgroundColor: f.tone, ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={f.width}
        height={f.height}
        alt={label}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={cn("photo-grade absolute inset-0 h-full w-full object-cover", imgClassName)}
        style={{ objectPosition: focus ?? p.focus ?? "50% 50%" }}
      />
    </span>
  );
}
