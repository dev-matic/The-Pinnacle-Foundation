import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import { faqsFor } from "@/content/faqs";
import { RevealText } from "@/components/motion/RevealText";
import { PinnacleLine } from "@/components/motion/PinnacleLine";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { SocialLinks, hasSocial } from "@/components/layout/SocialLinks";
import { FaqSection } from "@/components/sections/FaqSection";
import { Photo } from "@/components/ui/Photo";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  const { email, phone, whatsapp, address, officeHours, mapUrl } = site.contact;
  const hasDirect = Boolean(email || phone || whatsapp || address);

  return (
    <>
      <section data-scroll-tone="ivory" aria-labelledby="contact-title" className="relative pb-16 pt-36 lg:pt-48">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealText as="h1" id="contact-title" lines={["Let's talk."]} trigger="load" delay={0.35} tilt className="display fs-giant lg:col-span-8" />
            <p className="lede max-w-[34ch] text-[var(--muted)] lg:col-span-4">
              Questions, ideas, offers of help or a story to share. We&apos;d love to hear from you, and we read every message.
            </p>
          </div>
        </div>
        <PinnacleLine peak={86} height={64} draw="once" className="mt-16" />
      </section>

      <section id="enquiry" data-scroll-tone="ivory" aria-labelledby="enquiry-title" className="scroll-mt-20 pb-24 lg:pb-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4" aria-label="Contact details">
            <div className="relative mb-10 hidden aspect-[4/5] max-w-xs overflow-hidden rounded-[1.5rem] lg:block">
              <Photo slug="joy-portrait" sizes="25vw" className="h-full w-full" />
            </div>
            {hasDirect ? (
              <dl className="space-y-6">
                {email && (
                  <div>
                    <dt className="text-sm text-[var(--muted)]">Email</dt>
                    <dd className="mt-1 text-lg">
                      <a href={`mailto:${email}`} className="u-link">
                        {email}
                      </a>
                    </dd>
                  </div>
                )}
                {phone && (
                  <div>
                    <dt className="text-sm text-[var(--muted)]">Phone</dt>
                    <dd className="mt-1 text-lg">
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="u-link">
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                {whatsapp && (
                  <div>
                    <dt className="text-sm text-[var(--muted)]">WhatsApp</dt>
                    <dd className="mt-1 text-lg">
                      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="u-link">
                        Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                )}
                {address && (
                  <div>
                    <dt className="text-sm text-[var(--muted)]">Office</dt>
                    <dd className="mt-1 text-lg">
                      <address className="not-italic">{address}</address>
                      {mapUrl && (
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="u-link-static mt-2 inline-block text-base">
                          Open in Maps<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </dd>
                  </div>
                )}
                {officeHours && (
                  <div>
                    <dt className="text-sm text-[var(--muted)]">Hours</dt>
                    <dd className="mt-1">{officeHours}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <div>
                <h2 className="display text-3xl">Write to us here</h2>
                <p className="mt-3 max-w-xs text-[var(--muted)]">
                  Direct phone, email and office details will appear here once confirmed. The form is the best way to reach the Foundation.
                </p>
              </div>
            )}
            {hasSocial() && (
              <div className="mt-10">
                <h2 className="text-sm text-[var(--muted)]">Follow the work</h2>
                <SocialLinks className="mt-3" />
              </div>
            )}
            <p className="mt-10 text-sm text-[var(--muted)]">{site.country}</p>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="enquiry-title" className="display fs-md">
              Send a message
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqsFor("contact")} title={["Before you", "write."]} tone="sand" />
    </>
  );
}
