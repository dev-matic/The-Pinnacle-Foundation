import manifest from "./generated/photo-manifest.json";
import type { PhotoMeta, PhotoSlug } from "./types";

/**
 * PHOTOGRAPHY
 *
 * PLACEHOLDER: no photographs are included yet. Every slot below renders as a
 * designed placeholder frame labelled with the photograph it is waiting for.
 * The `alt` and `caption` text describe the shot the Foundation should supply.
 *
 * To add a real photograph:
 *   1. Save it as assets/photos/<slug>.jpg (e.g. assets/photos/preparing-donations.jpg)
 *   2. Run `npm run images`
 *   3. Update `alt`, `caption`, `location` and `focus` below to match the real photo.
 * As soon as a slug appears in the generated manifest, the real image replaces its placeholder.
 */
export const photos: Record<PhotoSlug, PhotoMeta> = {
  "preparing-donations": {
    slug: "preparing-donations",
    alt: "Foundation volunteers preparing and packing donations together",
    caption: "Volunteers preparing donations",
    focus: "50% 35%",
  },
  "distribution-day": {
    slug: "distribution-day",
    alt: "Foundation volunteers handing out donations in a community",
    caption: "A distribution day",
    focus: "50% 40%",
  },
  "cleanup-volunteer": {
    slug: "cleanup-volunteer",
    alt: "A volunteer caring for a shared community space",
    caption: "Care for a shared space",
  },
  "volunteers-painting": {
    slug: "volunteers-painting",
    alt: "Volunteers and residents working side by side on a community project",
    caption: "A community project in progress",
  },
  "worship-shiashie": {
    slug: "worship-shiashie",
    alt: "A congregation gathered in worship",
    caption: "Worship together",
  },
  "worship-ayigya": {
    slug: "worship-ayigya",
    alt: "A faith gathering or outreach service led by the Foundation",
    caption: "A faith gathering",
  },
  "gathering-dawhenya": {
    slug: "gathering-dawhenya",
    alt: "A large community or church gathering",
    caption: "A community gathered",
  },
  "market-women": {
    slug: "market-women",
    alt: "Everyday community life in Ghana",
    caption: "Everyday community life",
  },
  "joy-portrait": {
    slug: "joy-portrait",
    alt: "A moment of genuine joy shared between people",
    caption: "A moment of joy",
  },
  "elder-portrait": {
    slug: "elder-portrait",
    alt: "A dignified portrait of a community member, shared with consent",
    caption: "A community member, with consent",
  },
  "youth-tamale": {
    slug: "youth-tamale",
    alt: "Young people from a community the Foundation serves",
    caption: "Young people of the community",
  },
  "community-produce": {
    slug: "community-produce",
    alt: "A community celebration or shared moment",
    caption: "Community, together",
  },
  "green-ghana-volunteers": {
    slug: "green-ghana-volunteers",
    alt: "Foundation volunteers on their way to serve",
    caption: "Volunteers on the move",
  },
  "volunteers-field": {
    slug: "volunteers-field",
    alt: "Foundation volunteers on location at a project",
    caption: "Volunteers on location",
  },
  "team-group": {
    slug: "team-group",
    alt: "The Foundation team and partners together",
    caption: "The team and partners",
  },
  "festival-smile": {
    slug: "festival-smile",
    alt: "A supporter or donor, smiling",
    caption: "A supporter",
  },
  "market-north": {
    slug: "market-north",
    alt: "Community members talking together, where the Foundation listens before it acts",
    caption: "Listening to a community",
  },
};

type ManifestEntry = { width: number; height: number; widths: number[]; blur: string; tone: string };
const m = manifest as Record<string, ManifestEntry>;

/** Photo metadata plus, when a real image has been added, its generated file details. */
export function getPhoto(slug: PhotoSlug) {
  const meta = photos[slug];
  const file = m[slug];
  return { ...meta, file: file ?? null };
}

export type ResolvedPhoto = ReturnType<typeof getPhoto>;

/** Photographs that need a credit line in the footer (e.g. licensed stock). */
export const creditedPhotos = Object.values(photos).filter((p) => p.credit);
