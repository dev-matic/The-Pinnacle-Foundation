import { team, teamPlaceholderCount } from "@/content/involvement";
import { TeamShowcase, type ShowcaseMember } from "@/components/ui/TeamShowcase";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

/** "Meet our team" on the About page. Shows labelled placeholders until the team is supplied. */
export function TeamSection() {
  const isPlaceholder = team.length === 0;
  const members: ShowcaseMember[] = isPlaceholder
    ? Array.from({ length: teamPlaceholderCount }, (_, i) => ({ id: `p${i}`, name: "Name to come", role: "Role to come", placeholder: true }))
    : team.map((m, i) => ({ ...m, id: `${i}-${m.name}` }));

  return (
    <section data-scroll-tone="ivory" aria-labelledby="team-title" className="py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="team-title" className="display fs-lg lg:col-span-6">
            Meet our team
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-md text-[var(--muted)]">
              The people who give their time, skills and faith to the work, from leadership and trustees to the volunteers who make each outreach
              happen.
            </p>
            {isPlaceholder && <PlaceholderTag label="Team details to be supplied" className="mt-4" />}
          </div>
        </div>
        <div className="mt-14 lg:mt-20">
          <TeamShowcase members={members} />
        </div>
      </div>
    </section>
  );
}
