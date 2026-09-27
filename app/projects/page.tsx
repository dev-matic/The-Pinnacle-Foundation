import { pageMetadata } from "@/content/seo";
import { workAreas } from "@/content/work";
import { projects } from "@/content/projects";
import { contactHref, ctas } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectExplorer } from "@/components/pages/projects/ProjectExplorer";
import { Gallery } from "@/components/pages/projects/Gallery";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { PinnacleLine } from "@/components/motion/PinnacleLine";

export const metadata = pageMetadata("projects");

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title={["Where faith", "gets to work."]}
        intro="Giving, outreach, community projects and relief across Ghana. Each project is told as a story, with verified outcomes published as they are confirmed."
        photo="volunteers-field"
        peak={24}
      />

      {/* Areas of work */}
      <section data-scroll-tone="ivory" aria-labelledby="areas-title" className="pb-24 lg:pb-32">
        <div className="container-x">
          <h2 id="areas-title" className="display fs-lg">
            Areas of work
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-2 lg:grid-cols-6">
            {workAreas.map((a, i) => {
              const count = projects.filter((p) => p.category === a.id).length;
              return (
                <li
                  key={a.id}
                  id={a.id}
                  className={`group relative scroll-mt-28 overflow-hidden bg-[var(--bg)] p-7 lg:p-9 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <div className="relative z-10 flex h-full min-h-[15rem] flex-col">
                    <h3 className="display text-[clamp(2rem,1rem+2vw,3.2rem)]">{a.title}</h3>
                    <p className="mt-4 max-w-sm text-[var(--muted)]">{a.summary}</p>
                    <p className="mt-auto pt-8 text-sm">
                      {count > 0 ? (
                        <a href="#all-projects" className="u-link-static font-medium">
                          {count} project {count === 1 ? "story" : "stories"} below
                        </a>
                      ) : (
                        <span className="text-[var(--muted)]">Projects coming soon</span>
                      )}
                    </p>
                  </div>
                  <Photo
                    slug={a.photo}
                    sizes="(min-width:1024px) 30vw, 50vw"
                    alt=""
                    className="absolute inset-y-0 right-0 w-1/2 opacity-0 transition-opacity duration-700 [mask-image:linear-gradient(to_left,black,transparent)] group-hover:opacity-35"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProjectExplorer />

      <Gallery />

      {/* Support similar work */}
      <section data-scroll-tone="olive" aria-labelledby="support-title" className="py-24 lg:py-36">
        <div className="container-x">
          <PinnacleLine peak={80} height={60} className="mb-16" />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 id="support-title" className="display fs-xl lg:col-span-7">
              Help the next
              <br />
              project happen.
            </h2>
            <div className="lg:col-span-5">
              <p className="lede max-w-[36ch]">Sponsor a project, give toward one, or bring your church or business alongside the next outreach.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={ctas.donate.href}>Donate</Button>
                <Button href={contactHref("project")} variant="outline">
                  Sponsor a Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
