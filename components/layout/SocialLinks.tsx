import { site, type SocialPlatform } from "@/content/site";
import { cn } from "@/lib/cn";

const labels: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
};

/** Lists only the platforms that have a configured URL. Renders nothing otherwise. */
export function SocialLinks({ className }: { className?: string }) {
  const entries = (Object.keys(site.social) as SocialPlatform[]).filter((k) => site.social[k]);
  if (!entries.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)} aria-label="Social media">
      {entries.map((k) => (
        <li key={k}>
          <a href={site.social[k]!} target="_blank" rel="noopener noreferrer" className="u-link font-medium">
            {labels[k]}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export const hasSocial = () => Object.values(site.social).some(Boolean);
