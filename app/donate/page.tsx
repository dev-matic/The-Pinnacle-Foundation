import { pageMetadata } from "@/content/seo";
import { site, activeGivingMethods, contactHref } from "@/content/site";
import { workAreas } from "@/content/work";
import { faqsFor } from "@/content/faqs";
import { RevealText } from "@/components/motion/RevealText";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Transparency } from "@/components/sections/Transparency";
import { FaqSection } from "@/components/sections/FaqSection";
import { GenerosityJourney } from "@/components/sections/GenerosityJourney";
import { HowWeServe } from "@/components/sections/HowWeServe";

export const metadata = pageMetadata("donate");

export default function DonatePage() {
  const donationUrl = site.donation.url;
  const methods = activeGivingMethods();
  const { bank, mobileMoney } = site.donation;

  return (
    <>
      {/* Hero */}
      <section data-scroll-tone="olive" aria-labelledby="donate-title" className="relative overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              as="h1"
              id="donate-title"
              lines={["Your generosity", "can become", "someone's hope."]}
              trigger="load"
              delay={0.35}
              tilt
              className="display text-[clamp(3rem,1rem+5vw,6.75rem)]"
              lineClassName={["", "", "text-gold"]}
            />
            <p className="lede mt-10 max-w-[44ch]">
              Every contribution helps The Pinnacle Foundation continue its work of serving communities, sharing God&apos;s love and supporting people in
              need.
            </p>
            {donationUrl ? (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={donationUrl} external size="lg">
                  Donate Now
                </Button>
                <Button href="#ways-to-give" variant="outline" size="lg">
                  Other Ways to Give
                </Button>
              </div>
            ) : (
              <>
                <p className="mt-8 max-w-[44ch] border-l-2 border-[var(--line)] pl-4">
                  Online giving isn&apos;t open yet. You can still give today: support a project, give in kind, or ask us for direct giving
                  details.
                </p>
                <div className="mt-8">
                  <Button href="#ways-to-give" size="lg">
                    See Ways to Give Today
                  </Button>
                </div>
              </>
            )}
          </div>
          <ArchFrame slug="festival-smile" aspect={0.72} outline priority className="w-full max-w-sm justify-self-end max-lg:hidden lg:col-span-4" />
        </div>
      </section>

      {/* What gifts support */}
      <section data-scroll-tone="ivory" aria-labelledby="supports-title" className="py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealText id="supports-title" lines={["Why giving", "matters."]} className="display fs-lg" mode="words" />
            <p className="mt-8 max-w-md text-lg text-[var(--muted)]">
              Your gift is how compassion gets practical: food packed, journeys made, projects finished and hope carried into real places.
            </p>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-sm text-[var(--muted)]">What donations support</h3>
            <ul className="mt-4 border-t border-[var(--hairline)]">
              {workAreas.map((a) => (
                <li key={a.id} className="grid gap-2 border-b border-[var(--hairline)] py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                  <span className="display text-[clamp(1.7rem,1rem+1.4vw,2.6rem)]">{a.title}</span>
                  <span className="text-[var(--muted)]">{a.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ways to give */}
      <section id="ways-to-give" data-scroll-tone="sand" aria-labelledby="ways-title" className="scroll-mt-20 py-24 lg:py-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="ways-title" className="display fs-xl lg:col-span-7">
              Ways to give
            </h2>
            <p className="max-w-sm text-[var(--muted)] lg:col-span-4 lg:col-start-9">
              Choose what suits you. Each option below is available today.
            </p>
          </div>
          <ul className="mt-14 border-t border-[var(--hairline)]">
            {methods.map((m) => (
              <li key={m.id} className="group grid gap-4 border-b border-[var(--hairline)] py-8 lg:grid-cols-12 lg:items-center">
                <h3 className="display text-[clamp(2.2rem,1rem+3vw,4.2rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 lg:col-span-5">
                  {m.title}
                </h3>
                <p className="max-w-md text-[var(--muted)] lg:col-span-4">{m.description}</p>
                <div className="lg:col-span-3 lg:justify-self-end">
                  {m.action === "donation" && donationUrl ? (
                    <Button href={donationUrl} external variant="outline" magnetic={false}>
                      Give
                    </Button>
                  ) : (
                    <Button href={contactHref(m.contactReason)} variant="outline" magnetic={false}>
                      Get in touch
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Direct giving details: shown only once verified and configured */}
          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <h3 className="display text-3xl lg:col-span-4">Bank &amp; Mobile Money</h3>
            <div className="lg:col-span-7 lg:col-start-6">
              {bank || mobileMoney ? (
                <dl className="grid gap-8 sm:grid-cols-2">
                  {bank && (
                    <div>
                      <dt className="text-sm text-[var(--muted)]">Bank transfer</dt>
                      <dd className="mt-2 space-y-1">
                        <p>{bank.bankName}</p>
                        <p>{bank.accountName}</p>
                        <p className="font-medium">{bank.accountNumber}</p>
                        {bank.branch && <p>{bank.branch}</p>}
                        {bank.swift && <p>SWIFT: {bank.swift}</p>}
                      </dd>
                    </div>
                  )}
                  {mobileMoney && (
                    <div>
                      <dt className="text-sm text-[var(--muted)]">Mobile Money</dt>
                      <dd className="mt-2 space-y-1">
                        <p>{mobileMoney.network}</p>
                        <p>{mobileMoney.name}</p>
                        <p className="font-medium">{mobileMoney.number}</p>
                      </dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="max-w-lg text-[var(--muted)]">
                  Verified bank and Mobile Money details will be published here. To protect donors, please only use details shown on this page or given
                  to you directly by the Foundation.{" "}
                  <ArrowLink href={contactHref("donation")} className="mt-3 text-[var(--fg)]">
                    Ask for giving instructions
                  </ArrowLink>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <GenerosityJourney />

      <Transparency id="giving-confidence" tone="ivory" />

      <HowWeServe tone="sand" />

      <FaqSection faqs={faqsFor("donate")} title={["Giving", "questions."]} tone="ivory" more={{ label: "Ask about giving", href: contactHref("donation") }} />
    </>
  );
}
