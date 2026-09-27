import { pageMetadata } from "@/content/seo";
import { partnershipTypes, partners, inKindExamples } from "@/content/involvement";
import { contactHref, ctas } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Pathways } from "@/components/sections/Pathways";
import { FinalCta } from "@/components/sections/FinalCta";
import { VolunteerSection } from "@/components/pages/involved/VolunteerSection";
import { RevealText } from "@/components/motion/RevealText";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { Button } from "@/components/ui/Button";
import { PinnacleLine } from "@/components/motion/PinnacleLine";

export const metadata = pageMetadata("getInvolved");

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title={["There's a place", "for you here."]}
        intro="Whether you give, serve or partner with us, you become part of how God's love reaches communities across Ghana."
        photo="green-ghana-volunteers"
        peak={50}
      />

      <Pathways headingId="pathways-title" />

      <VolunteerSection />

      {/* Partner */}
      <section id="partner" data-scroll-tone="charcoal" aria-labelledby="partner-title" className="scroll-mt-20 py-24 lg:py-40">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealText id="partner-title" lines={["Let's create more", "impact together."]} className="display fs-xl lg:col-span-8" mode="words" />
            <p className="max-w-[40ch] text-[var(--muted)] lg:col-span-4">
              The challenges facing communities cannot always be solved alone. We welcome churches, businesses, organisations and individuals who want to
              partner with us in meaningful service.
            </p>
          </div>

          <ul className="mt-16 border-t border-[var(--hairline)] lg:mt-24">
            {partnershipTypes.map((t) => (
              <li key={t.title} className="group grid gap-3 border-b border-[var(--hairline)] py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                <h3 className="display text-[clamp(1.9rem,1rem+2.4vw,3.4rem)] transition-colors duration-500 group-hover:text-gold lg:col-span-5">{t.title}</h3>
                <p className="max-w-md lg:col-span-4">{t.description}</p>
                <p className="text-sm text-[var(--muted)] lg:col-span-3 lg:text-right">For {t.for.toLowerCase()}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button href={contactHref("partnership")} size="lg">
              Become a Partner
            </Button>
            <Button href={contactHref("project")} size="lg" variant="outline">
              Sponsor a Project
            </Button>
          </div>

          <div className="mt-24 grid gap-8 border-t border-[var(--hairline)] pt-10 lg:grid-cols-12">
            <h3 className="text-sm text-[var(--muted)] lg:col-span-3">Our partners</h3>
            {partners.length ? (
              <ul className="flex flex-wrap items-center gap-10 lg:col-span-9">
                {partners.map((p) => (
                  <li key={p.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.name} className="h-10 w-auto opacity-80" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-xl text-[var(--muted)] lg:col-span-9">
                Partners who serve alongside the Foundation will be recognised here, with their permission. Could yours be the first?
              </p>
            )}
          </div>
        </div>
      </section>

      {/* In-kind & donation drives */}
      <section id="in-kind" data-scroll-tone="sand" aria-labelledby="inkind-title" className="scroll-mt-20 py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <ArchFrame slug="preparing-donations" aspect={0.8} outline className="w-full max-w-sm lg:col-span-4" />
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="inkind-title" className="display fs-lg">
              Give in kind.
              <br />
              Run a drive.
            </h2>
            <p className="lede mt-8 max-w-[40ch]">
              Goods and services can be as valuable as money. Churches, schools and workplaces can gather what a community needs and we&apos;ll help it
              get there.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {inKindExamples.map((x) => (
                <li key={x} className="rounded-full border border-[var(--hairline)] px-4 py-2 text-[0.95rem]">
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-sm text-[var(--muted)]">Please contact us before collecting, so every gift meets a current need.</p>
            <div className="mt-8">
              <Button href={contactHref("donation")}>Arrange an in-kind gift</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Give */}
      <section id="give" data-scroll-tone="olive" aria-labelledby="give-title" className="scroll-mt-20 py-24 lg:py-32">
        <div className="container-x">
          <PinnacleLine peak={15} height={60} className="mb-14" />
          <div className="flex flex-wrap items-end justify-between gap-10">
            <h2 id="give-title" className="display fs-xl">
              Prefer to give?
            </h2>
            <div className="max-w-sm">
              <p className="lede">Financial gifts keep outreach moving and let the Foundation respond when needs arise.</p>
              <div className="mt-8">
                <Button href={ctas.donate.href} size="lg">
                  Donate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCta photo="team-group" />
    </>
  );
}
