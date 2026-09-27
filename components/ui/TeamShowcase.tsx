"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { TeamMember } from "@/content/types";
import { cn } from "@/lib/cn";
import { PinnacleMark } from "./PinnacleMark";

export type ShowcaseMember = TeamMember & { id: string; placeholder?: boolean };

const socialLinks = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "x", label: "X", Icon: FaXTwitter },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
] as const;

/**
 * Team showcase: a staggered, three-column portrait grid beside a list of names.
 * Pointing at (or focusing, or tapping) a person brings their portrait into colour
 * and quietens everyone else, in both the grid and the list.
 */
export function TeamShowcase({ members }: { members: ShowcaseMember[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const columns = [0, 1, 2].map((c) => members.filter((_, i) => i % 3 === c));
  const offsets = ["mt-0", "mt-[18%]", "mt-[8%]"];

  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-12 lg:gap-20">
      {/* Portrait grid */}
      <div className="flex w-full gap-3 md:w-[54%] md:shrink-0 lg:gap-4" onMouseLeave={() => setActiveId(null)}>
        {columns.map((col, c) => (
          <div key={c} className={cn("flex flex-1 flex-col gap-3 lg:gap-4", offsets[c])}>
            {col.map((m) => (
              <Portrait key={m.id} member={m} activeId={activeId} onActive={setActiveId} />
            ))}
          </div>
        ))}
      </div>

      {/* Names */}
      <ul className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-1 md:gap-6 md:pt-2" onMouseLeave={() => setActiveId(null)}>
        {members.map((m) => (
          <NameRow key={m.id} member={m} activeId={activeId} onActive={setActiveId} />
        ))}
      </ul>
    </div>
  );
}

function Portrait({ member, activeId, onActive }: { member: ShowcaseMember; activeId: string | null; onActive: (id: string | null) => void }) {
  const active = activeId === member.id;
  const dimmed = activeId !== null && !active;
  return (
    <div
      className={cn("relative aspect-[15/16] overflow-hidden rounded-[1.25rem] bg-sand transition-opacity duration-500", dimmed ? "opacity-55" : "opacity-100")}
      onMouseEnter={() => onActive(member.id)}
      onClick={() => onActive(active ? null : member.id)}
    >
      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-[filter] duration-500"
          style={{ filter: active ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.8)" }}
        />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center text-charcoal">
          <span className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,currentColor_0_1px,transparent_1px_18px)]" />
          <PinnacleMark className={cn("h-10 transition-opacity duration-500 lg:h-12", active ? "opacity-70" : "opacity-30")} />
        </span>
      )}
    </div>
  );
}

function NameRow({ member, activeId, onActive }: { member: ShowcaseMember; activeId: string | null; onActive: (id: string | null) => void }) {
  const active = activeId === member.id;
  const dimmed = activeId !== null && !active;
  const links = socialLinks.filter((s) => member.social?.[s.key]);

  return (
    <li
      className={cn("transition-opacity duration-300", dimmed ? "opacity-55" : "opacity-100")}
      onMouseEnter={() => onActive(member.id)}
      onFocus={() => onActive(member.id)}
      onBlur={() => onActive(null)}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className={cn("h-2.5 shrink-0 rounded-full transition-all duration-300", active ? "w-6 bg-olive" : "w-3.5 bg-[var(--fg)]/25")} />
        <span className="display text-[clamp(1.4rem,1rem+0.9vw,1.9rem)]">{member.name}</span>
        {links.length > 0 && (
          <span
            className={cn(
              "flex items-center gap-1 transition-all duration-300 focus-within:translate-x-0 focus-within:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100",
              active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
            )}
          >
            {links.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={member.social![key]!}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-8 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--fg)]/10 hover:text-[var(--fg)]"
              >
                <Icon aria-hidden className="size-3.5" />
                <span className="sr-only">
                  {member.name} on {label} (opens in a new tab)
                </span>
              </a>
            ))}
          </span>
        )}
      </div>
      <p className="mt-1 pl-[1.625rem] text-sm text-[var(--muted)]">{member.role}</p>
    </li>
  );
}
