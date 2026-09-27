/**
 * Content model for The Pinnacle Foundation website.
 *
 * Every record that has not been confirmed by the Foundation carries
 * `placeholder: true`. Components render a visible "Placeholder" tag for those
 * records so nothing unverified is ever presented as fact.
 */

export type Theme = "ivory" | "sand" | "olive" | "terracotta" | "charcoal";

export type PhotoSlug =
  | "preparing-donations"
  | "distribution-day"
  | "cleanup-volunteer"
  | "volunteers-painting"
  | "worship-shiashie"
  | "worship-ayigya"
  | "gathering-dawhenya"
  | "market-women"
  | "joy-portrait"
  | "elder-portrait"
  | "youth-tamale"
  | "community-produce"
  | "green-ghana-volunteers"
  | "volunteers-field"
  | "team-group"
  | "festival-smile"
  | "market-north";

export interface PhotoCredit {
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export interface PhotoMeta {
  slug: PhotoSlug;
  /** Describes the photograph. Until a real image is added it describes the shot needed. */
  alt: string;
  /** CSS object-position used when the photo is cropped. */
  focus?: string;
  caption?: string;
  location?: string;
  /** Required only for licensed third-party photography. */
  credit?: PhotoCredit;
}

export type ProjectCategory =
  | "community-giving"
  | "christian-outreach"
  | "community-projects"
  | "relief-support"
  | "partnership-initiatives";

export interface WorkArea {
  id: ProjectCategory;
  title: string;
  summary: string;
  photo: PhotoSlug;
}

export interface Figure {
  label: string;
  value: number | null;
  suffix?: string;
  verified: boolean;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  date: string;
  summary: string;
  description: string[];
  cover: PhotoSlug;
  gallery: PhotoSlug[];
  provided?: string[];
  participants?: string;
  peopleReached?: Figure;
  itemsDonated?: Figure;
  partners?: string[];
  outcome?: string;
  whatNext?: string;
  featured?: boolean;
  tone: Theme;
  placeholder: boolean;
}

export type StoryType =
  | "community"
  | "volunteer"
  | "foundation"
  | "partner"
  | "sponsor"
  | "reflection"
  | "behind-the-scenes";

export interface Story {
  slug: string;
  type: StoryType;
  title: string;
  quote: string;
  person: string;
  role: string;
  location: string;
  projectSlug?: string;
  excerpt: string;
  body: string[];
  photo: PhotoSlug;
  featured?: boolean;
  placeholder: boolean;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  note?: string;
  verified: boolean;
}

export interface Faq {
  question: string;
  answer: string;
  /** Pages where this question appears. */
  pages: Array<"home" | "donate" | "contact">;
}

export interface Scripture {
  text: string;
  reference: string;
  translation?: string;
}

export interface DocumentLink {
  id: string;
  title: string;
  description: string;
  href: string | null;
}

export interface GivingMethod {
  id: "one-time" | "monthly" | "project" | "corporate" | "in-kind";
  title: string;
  description: string;
  /** "donation" uses the external donation URL; "contact" opens the enquiry form. */
  action: "donation" | "contact";
  contactReason?: ContactReason;
  enabled: boolean;
}

export type ContactReason = "general" | "volunteer" | "partnership" | "donation" | "project" | "other";

export interface TeamMember {
  name: string;
  role: string;
  /** Optional one or two sentences, in their own words where possible. */
  bio?: string;
  /** Portrait path under /public, e.g. "/images/team/ama-mensah.jpg" (roughly square or portrait). */
  image?: string;
  /** Optional profile links; only the ones provided are shown. */
  social?: { linkedin?: string; x?: string; instagram?: string; facebook?: string };
}

export interface Partner {
  name: string;
  logo: string;
  href?: string;
  type: "church" | "business" | "organization" | "individual";
}
