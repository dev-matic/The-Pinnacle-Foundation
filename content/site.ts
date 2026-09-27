import type { ContactReason, DocumentLink, GivingMethod, Scripture } from "./types";

/**
 * SITE CONFIGURATION
 *
 * Everything the Foundation is likely to change lives here. Any value set to
 * `null` is treated as "not configured": the matching button, link or detail is
 * hidden or replaced with an honest "coming soon" state, never a broken link.
 *
 * Search this folder for "PLACEHOLDER" to find everything awaiting real content.
 */

export const site = {
  name: "The Pinnacle Foundation",
  shortName: "Pinnacle Foundation",
  type: "Non-governmental, faith-based charitable organisation",
  country: "Ghana",
  countryCode: "GH",

  // PLACEHOLDER: set NEXT_PUBLIC_SITE_URL (or edit this line) to the live domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.org",

  mission:
    "The Pinnacle Foundation is a non-governmental, faith-based organization dedicated to spreading the Word of God, supporting individuals and communities in need through charitable donations, and promoting love, compassion, and hope.",
  // PLACEHOLDER: draft vision statement. Confirm wording with the Foundation.
  vision:
    "Communities across Ghana where the love of God is visible in everyday acts of generosity, dignity and hope.",
  visionIsDraft: true,

  // Verbal identity: one core line, two supporting lines. Used consistently across the site.
  core: "Faith expressed through action.",
  /** The Foundation's own tagline (supplied by the Foundation). */
  tagline: "Reaching the highest heights.",
  footerLine: "Serving communities. Sharing hope.",

  heroSupport:
    "Sharing God's love by supporting communities, giving generously, and creating hope where it is needed most.",

  /** Shown in the footer while any placeholder content remains on the site. */
  previewNotice:
    "Preview edition. Photographs, projects, stories and figures are placeholders awaiting the Foundation's own verified content.",
  showPreviewNotice: true,

  contact: {
    // PLACEHOLDER: all contact details are unconfirmed. Leave null to hide.
    email: null as string | null,
    phone: null as string | null,
    /** Digits only, international format, e.g. "233201234567". */
    whatsapp: null as string | null,
    address: null as string | null,
    officeHours: null as string | null,
    mapUrl: null as string | null,
  },

  /** Only platforms with a URL are displayed. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
  },

  donation: {
    // PLACEHOLDER: external donation platform URL (e.g. Paystack, Flutterwave, GivePlus).
    url: null as string | null,
    // PLACEHOLDER: never publish bank or Mobile Money details until verified by the Foundation.
    bank: null as null | { bankName: string; accountName: string; accountNumber: string; branch?: string; swift?: string },
    mobileMoney: null as null | { network: string; name: string; number: string },
  },

  forms: {
    /**
     * Static-host friendly form handling. Set `endpoint` to a form service that
     * accepts JSON POSTs (Formspree, Getform, Basin, etc.). When no endpoint is
     * set, forms fall back to the configured email (mailto:) and then WhatsApp.
     */
    endpoint: null as string | null,
    volunteerEndpoint: null as string | null,
    /** PLACEHOLDER: newsletter sign-up endpoint (e.g. a Mailchimp/Buttondown/Formspree form). Falls back like the other forms. */
    newsletterEndpoint: null as string | null,
  },
};

export type SocialPlatform = keyof typeof site.social;

export const nav = {
  primary: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Stories", href: "/stories" },
    { label: "Contact", href: "/contact" },
  ],
  donate: { label: "Donate", href: "/donate" },
  footer: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Stories", href: "/stories" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const ctas = {
  donate: { label: "Donate", href: "/donate" },
  volunteer: { label: "Volunteer With Us", href: "/get-involved#serve" },
  partner: { label: "Become a Partner", href: "/get-involved#partner" },
  projects: { label: "Explore Our Projects", href: "/projects" },
};

export const contactReasons: Array<{ value: ContactReason; label: string }> = [
  { value: "general", label: "General Enquiry" },
  { value: "volunteer", label: "Volunteer" },
  { value: "partnership", label: "Partnership" },
  { value: "donation", label: "Donation" },
  { value: "project", label: "Project" },
  { value: "other", label: "Other" },
];

export const scriptures: Record<"action" | "hungry", Scripture> = {
  action: {
    text: "Let us not love with words or speech but with actions and in truth.",
    reference: "1 John 3:18",
    translation: "NIV",
  },
  hungry: {
    text: "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in.",
    reference: "Matthew 25:35",
    translation: "NIV",
  },
};

/**
 * Transparency documents. `href: null` lists the document under "What we will publish" (no dead links).
 * PLACEHOLDER: add links once documents are verified and published.
 */
export const transparencyDocs: DocumentLink[] = [
  { id: "annual-report", title: "Annual reports", description: "A yearly account of projects, communities served and lessons learned.", href: null },
  { id: "financials", title: "Financial reports", description: "How donations were received and where they were used.", href: null },
  { id: "registration", title: "Registration", description: "The Foundation's registration details as a non-governmental organisation in Ghana.", href: null },
  { id: "governance", title: "Governance", description: "Who oversees the Foundation and how decisions are made.", href: null },
  { id: "policies", title: "Policies", description: "Safeguarding, consent in storytelling, and use of funds.", href: null },
];

/**
 * Giving methods. Methods with action "donation" only appear when `site.donation.url` is set.
 * Methods with action "contact" route to the enquiry form with a pre-selected reason.
 */
export const givingMethods: GivingMethod[] = [
  { id: "one-time", title: "Give once", description: "A single gift toward the Foundation's current work across Ghana.", action: "donation", enabled: true },
  { id: "monthly", title: "Give monthly", description: "A steady gift that lets the Foundation plan outreach with confidence.", action: "donation", enabled: true },
  { id: "project", title: "Support a project", description: "Direct your gift toward a specific project or community initiative.", action: "contact", contactReason: "project", enabled: true },
  { id: "corporate", title: "Corporate giving", description: "Give as a business, sponsor an outreach, or match your team's generosity.", action: "contact", contactReason: "partnership", enabled: true },
  { id: "in-kind", title: "Give in kind", description: "Food, clothing, school supplies and other essentials, coordinated with the Foundation.", action: "contact", contactReason: "donation", enabled: true },
];

export function activeGivingMethods() {
  return givingMethods.filter((m) => m.enabled && (m.action === "contact" || Boolean(site.donation.url)));
}

export function contactHref(reason?: ContactReason) {
  return reason ? `/contact?reason=${reason}#enquiry` : "/contact#enquiry";
}
