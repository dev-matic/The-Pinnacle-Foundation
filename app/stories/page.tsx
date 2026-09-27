import { pageMetadata } from "@/content/seo";
import { featuredStory as s, storyTypes } from "@/content/stories";
import { getProject } from "@/content/projects";
import { contactHref } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { StoriesExplorer } from "@/components/pages/stories/StoriesExplorer";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { RevealText } from "@/components/motion/RevealText";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata("stories");

const principles = [
  { title: "Consent, always", text: "No story, name or photograph is published without the clear agreement of the person in it." },
  { title: "Their words", text: "People tell their own stories. We edit for length, never for meaning." },
  { title: "Dignity before need", text: "We show people as whole human beings, not as the problems they face." },
  { title: "Children protected", text: "Children appear only with guardian consent, and never in ways that identify where they live." },
];

export default function StoriesPage() {
  const project = s.projectSlug ? getProject(s.projectSlug) : undefined;
  return (
    <>
      <PageHero
        title={["Stories behind", "the mission."]}
        intro="The human side of the Foundation's work: communities, volunteers, partners and the team, told with dignity and in their own words."
        peak={40}
      />

      {/* Featured story */}
      <section data-scroll-tone="terracotta" aria-labelledby="featured-story-title" className="py-24 lg:py-40">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <ArchFrame slug={s.photo} aspect={0.72} outline priority className="w-full max-w-md lg:col-span-5" sizes="(min-width:1024px) 34vw, 90vw" />
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span>Featured {storyTypes[s.type].toLowerCase()} story</span>
              <span aria-hidden className="h-px w-6 bg-current" />
              <span>{s.location}</span>
              {project && (
                <>
                  <span aria-hidden className="h-px w-6 bg-current" />
                  <span>{project.title}</span>
                </>
              )}
              {s.placeholder && <PlaceholderTag label="Placeholder story" />}
            </div>
            <h2 id="featured-story-title" className="display mt-6 text-[clamp(2.4rem,1rem+3.4vw,4.6rem)]">
              {s.title}
            </h2>
            <blockquote className="mt-10">
              <ScrollWords as="p" text={`“${s.quote}”`} className="serif-statement text-[clamp(1.9rem,1rem+2.6vw,3.6rem)] italic" end="bottom 55%" />
              <footer className="mt-6 text-[var(--muted)]">
                {s.person}, {s.role}
              </footer>
            </blockquote>
            <div className="mt-10 max-w-[58ch] space-y-4 text-lg">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StoriesExplorer />

      {/* How we tell stories */}
      <section data-scroll-tone="charcoal" aria-labelledby="ethics-title" className="py-24 lg:py-36">
        <div className="container-x">
          <RevealText id="ethics-title" lines={["Dignity", "before need."]} className="display fs-xl" />
          <p className="lede mt-8 max-w-[44ch] text-[var(--muted)]">How we tell stories, and the promises we make to the people in them.</p>
          <ul className="mt-16 grid gap-10 border-t border-[var(--hairline)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title}>
                <h3 className="display text-3xl text-gold">{p.title}</h3>
                <p className="mt-3 max-w-xs text-[var(--muted)]">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-[var(--hairline)] pt-10">
            <p className="serif-statement text-3xl">Have a story to share?</p>
            <Button href={contactHref("general")}>Tell us your story</Button>
          </div>
        </div>
      </section>
    </>
  );
}
