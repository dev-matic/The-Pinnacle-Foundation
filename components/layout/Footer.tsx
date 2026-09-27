"use client";

import { useRef } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { nav, site, ctas, type SocialPlatform } from "@/content/site";
import { creditedPhotos } from "@/content/photos";
import { TLink } from "@/components/ui/TLink";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { NewsletterForm } from "./NewsletterForm";
import { Summits } from "./Summits";

const taglineWords = site.tagline.split(" ");

const socialIcons: Record<SocialPlatform, { label: string; Icon: IconType }> = {
  instagram: { label: "Instagram", Icon: FaInstagram },
  facebook: { label: "Facebook", Icon: FaFacebookF },
  youtube: { label: "YouTube", Icon: FaYoutube },
  tiktok: { label: "TikTok", Icon: FaTiktok },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn },
};

/**
 * Footer: the Foundation's tagline, four columns (stay connected, quick links,
 * contact, follow), and a range of summits climbing to the highest peak.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".footer-word", {
          yPercent: 105,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".footer-tagline", start: "top bottom", end: "bottom 80%", scrub: 0.6 },
        });
      });
    },
    { scope: ref },
  );

  const year = new Date().getFullYear();
  const { email, phone, address, whatsapp } = site.contact;
  const socials = (Object.keys(site.social) as SocialPlatform[]).filter((k) => site.social[k]);

  return (
    <footer ref={ref} id="site-footer" data-tone="charcoal" data-scroll-tone="charcoal" className="tone-surface relative overflow-hidden pt-24 lg:pt-32">
      <div className="container-x">
        <p className="footer-tagline display flex flex-wrap gap-x-[0.22em] text-[clamp(3rem,1rem+8vw,9.5rem)] leading-[0.86]" aria-label={site.tagline}>
          {taglineWords.map((w, i) => (
            <span key={i} className="line-mask" aria-hidden>
              <span className={`footer-word block ${i >= taglineWords.length - 2 ? "text-gold" : ""}`}>{w}</span>
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-12 border-t border-[var(--hairline)] pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Stay connected */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="display text-2xl">Stay connected</h2>
            <p className="mt-3 max-w-sm text-[var(--muted)]">News of projects, outreach days and ways to help, a few times a year.</p>
            <div className="mt-6 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-links" className="lg:col-span-2 lg:col-start-6">
            <h2 id="footer-links" className="display text-2xl">
              Quick links
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {nav.footer.map((item) => (
                <li key={item.href}>
                  <TLink href={item.href} className="inline-flex min-h-11 items-center text-[1.05rem] text-[var(--muted)] transition-colors hover:text-[var(--fg)] lg:min-h-9">
                    <span className="u-link">{item.label}</span>
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="display text-2xl">Contact us</h2>
            {email || phone || address || whatsapp ? (
              <address className="mt-4 space-y-2 not-italic text-[var(--muted)]">
                {address && <p>{address}</p>}
                {phone && (
                  <p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="u-link text-[var(--fg)]">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p>
                    <a href={`mailto:${email}`} className="u-link text-[var(--fg)]">
                      {email}
                    </a>
                  </p>
                )}
                {whatsapp && (
                  <p>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="u-link text-[var(--fg)]">
                      WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                )}
              </address>
            ) : (
              <p className="mt-4 max-w-xs text-[var(--muted)]">
                Questions, offers of help or a story to share? Write to us through the{" "}
                <TLink href="/contact#enquiry" className="u-link-static text-[var(--fg)]">
                  enquiry form
                </TLink>
                .
              </p>
            )}
            <p className="mt-4 text-sm text-[var(--muted)]">Serving communities across {site.country}</p>
          </div>

          {/* Follow, or ways in while no channels are set up */}
          <div className="lg:col-span-2">
            {socials.length ? (
              <>
                <h2 className="display text-2xl">Follow us</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((k) => {
                    const { label, Icon } = socialIcons[k];
                    return (
                      <li key={k}>
                        <a
                          href={site.social[k]!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-11 place-items-center rounded-full border border-[var(--hairline)] transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
                        >
                          <Icon aria-hidden className="size-4" />
                          <span className="sr-only">{label} (opens in a new tab)</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <>
                <h2 className="display text-2xl">Get involved</h2>
                <ul className="mt-4">
                  {[ctas.donate, ctas.volunteer, ctas.partner].map((c, i) => (
                    <li key={c.href}>
                      <TLink href={c.href} className={`inline-flex min-h-11 items-center text-[1.05rem] lg:min-h-9 ${i === 0 ? "text-gold" : "text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                        <span className="u-link">{c.label}</span>
                      </TLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {creditedPhotos.length > 0 && (
          <details className="group mt-10 text-sm text-[var(--muted)]">
            <summary className="cursor-pointer list-none font-medium text-[var(--fg)] [&::-webkit-details-marker]:hidden">
              <span className="u-link">Photography credits</span>
            </summary>
            <ul className="mt-4 space-y-1.5">
              {creditedPhotos.map((p) => (
                <li key={p.slug}>
                  {p.caption}: {p.credit!.author},{" "}
                  <a href={p.credit!.licenseUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                    {p.credit!.license}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {/* The ascent */}
      <Summits>
        <div className="container-x flex flex-col gap-2 pb-6 text-sm text-ivory/75 sm:flex-row sm:items-end sm:justify-between lg:pb-8">
          <p>
            © {year} {site.name}. {site.footerLine}
          </p>
          {site.showPreviewNotice && <p className="max-w-md sm:text-right">{site.previewNotice}</p>}
        </div>
      </Summits>
    </footer>
  );
}
