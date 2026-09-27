import { Hero } from "@/components/home/Hero";
import { WhyWeExist } from "@/components/home/WhyWeExist";
import { WorkPreview } from "@/components/home/WorkPreview";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { StoryPreview } from "@/components/home/StoryPreview";
import { ScriptureMoment } from "@/components/home/ScriptureMoment";
import { Pathways } from "@/components/sections/Pathways";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { TLink } from "@/components/ui/TLink";
import { scriptures } from "@/content/site";
import { faqsFor } from "@/content/faqs";

/**
 * Home introduces, inspires and directs: who we are (hero, why we exist), what we do
 * (work, featured project), how to take part (pathways), then the human side and
 * the closing call. Detail lives on the supporting pages.
 *
 * components/home/Impact.tsx is kept for when verified figures exist: add <Impact />
 * back after <FeaturedProject /> and set `verified: true` in content/impact.ts.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyWeExist />
      <WorkPreview />
      <FeaturedProject />
      <Pathways />
      <StoryPreview />
      <ScriptureMoment
        scripture={scriptures.action}
        bridge="Love is proven by what it does. This verse is the reason the Foundation exists, and the test it holds its own work to."
      />
      <FaqSection
        faqs={faqsFor("home")}
        intro={
          <>
            The short version. How gifts are used and reported is set out in{" "}
            <TLink href="/donate#giving-confidence" className="u-link-static text-[var(--fg)]">
              our commitment to accountability
            </TLink>
            .
          </>
        }
        more={{ label: "Ask us something else", href: "/contact#enquiry" }}
      />
      <FinalCta />
    </>
  );
}
