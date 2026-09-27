import { pageMetadata } from "@/content/seo";
import { site, scriptures, ctas } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { TeamSection } from "@/components/sections/TeamSection";
import { RevealText } from "@/components/motion/RevealText";
import { ArchFrame } from "@/components/motion/ArchFrame";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ArrowLink, Button } from "@/components/ui/Button";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={["Love", "made visible."]}
        intro="We are a non-governmental, faith-based charitable organisation in Ghana. We believe God's love should be seen, and we set out to make it visible in practical ways."
        photo="gathering-dawhenya"
      />

      {/* Who we are: story, mission and vision together */}
      <section data-scroll-tone="olive" aria-labelledby="story-title" className="py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="story-title" className="display fs-lg">
              Who we are
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="serif-statement max-w-[30ch] text-[clamp(1.7rem,1rem+1.8vw,2.8rem)]">
              The Pinnacle Foundation exists to share the Word and love of God, and to stand beside individuals and communities in need.
            </p>
            <p className="mt-8 max-w-[60ch] text-lg text-[var(--muted)]">
              Our work takes many forms: charitable donations, Christian outreach, community projects, relief when it is needed and partnerships that
              multiply what any one of us could do alone. What holds it together is a simple conviction: faith is something you do, not only something
              you say.
            </p>
            <dl className="mt-14 grid gap-10 border-t border-[var(--hairline)] pt-10 md:grid-cols-2">
              <div>
                <dt className="display text-2xl">Our mission</dt>
                <dd className="mt-3 max-w-[44ch]">{site.mission}</dd>
              </div>
              <div>
                <dt className="flex flex-wrap items-center gap-3">
                  <span className="display text-2xl">Our vision</span>
                  {site.visionIsDraft && <PlaceholderTag label="Draft, to be confirmed" />}
                </dt>
                <dd className="mt-3 max-w-[44ch]">{site.vision}</dd>
              </div>
            </dl>
            <p className="mt-10 flex flex-wrap items-center gap-3 text-[var(--muted)]">
              <PlaceholderTag label="Founding story to be supplied" />
              How the Foundation began will be told here, in the founders&apos; own words.
            </p>
          </div>
        </div>
      </section>

      {/* Why we serve, with the verse that shapes it */}
      <section data-scroll-tone="charcoal" aria-labelledby="serve-title" className="py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <RevealText id="serve-title" lines={["Why we serve."]} className="display fs-xl" />
            <p className="lede mt-10 max-w-[40ch]">
              Our work is rooted in the Christian belief that loving God also means loving and serving people. We seek to share the Word of God not only
              through what we say, but through generosity, compassion and service.
            </p>
            <figure className="mt-10 border-l border-[var(--line)] pl-6">
              <blockquote className="serif-statement max-w-[34ch] text-[clamp(1.35rem,1rem+0.9vw,1.8rem)] italic">
                &ldquo;{scriptures.hungry.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-[var(--muted)]">
                {scriptures.hungry.reference} ({scriptures.hungry.translation})
              </figcaption>
            </figure>
            <p className="mt-8 max-w-[46ch] text-[var(--muted)]">
              Everyone is welcome to receive our help. Support from the Foundation is never conditional on anyone&apos;s beliefs, background or
              church.
            </p>
          </div>
          <ArchFrame slug="worship-shiashie" aspect={0.8} outline className="w-full max-w-md justify-self-end lg:col-span-5 lg:col-start-8" />
        </div>
      </section>

      {/* Rooted in Ghana */}
      <section data-scroll-tone="terracotta" aria-labelledby="ghana-title" className="overflow-hidden py-24 lg:py-40">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealText id="ghana-title" lines={["Rooted", "in Ghana."]} className="display fs-xl" />
            <p className="lede mt-10 max-w-[38ch]">
              The Foundation serves communities in Ghana, and its work is shaped by the places it serves: their streets, markets, churches, languages
              and leaders.
            </p>
            <p className="mt-6 max-w-[46ch] text-[var(--muted)]">
              We would rather show Ghana as it is, busy, generous, faithful and full of life, than reduce it to a backdrop for charity. The people in
              our stories are neighbours first.
            </p>
            <div className="mt-10 rounded-[1.5rem] border border-dashed border-[var(--hairline)] p-6">
              <h3 className="font-medium">Communities served</h3>
              <p className="mt-2 text-[var(--muted)]">
                The communities we serve will be listed here as projects are verified and their leaders agree to be named.
              </p>
              <div className="mt-4">
                <ArrowLink href="/projects">See our projects</ArrowLink>
              </div>
            </div>
          </div>
          <Photo
            slug="market-north"
            sizes="(min-width:1024px) 40vw, 90vw"
            className="aspect-[4/5] w-full max-w-lg justify-self-end rounded-[1.5rem] lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>

      <TeamSection />

      {/* Closing: the three ways in, without repeating the homepage finale */}
      <section data-scroll-tone="charcoal" aria-labelledby="about-cta-title" className="py-20 lg:py-28">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 id="about-cta-title" className="display fs-lg">
            Be part of it.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={ctas.donate.href}>{ctas.donate.label}</Button>
            <Button href={ctas.volunteer.href} variant="outline">
              {ctas.volunteer.label}
            </Button>
            <Button href={ctas.partner.href} variant="outline">
              {ctas.partner.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
