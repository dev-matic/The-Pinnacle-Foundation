import type { PhotoSlug, Theme } from "./types";

/** Copy for the homepage story. Kept here so wording can change without touching components. */

export const hero = {
  lines: ["Faith", "in", "action."],
  support: "Sharing God's love by supporting communities, giving generously, and creating hope where it is needed most.",
  primary: { label: "Donate", href: "/donate" },
  secondary: { label: "Explore Our Projects", href: "/projects" },
  about: { label: "Learn about The Pinnacle Foundation", href: "/about" },
  photo: "preparing-donations" as PhotoSlug,
};

export const openingStatement = {
  statement: "We believe faith should be seen in what we do for others.",
  support:
    "Through charitable giving, community outreach and Christian service, The Pinnacle Foundation seeks to bring hope and practical support to communities throughout Ghana.",
};

export const principles: Array<{ word: string; text: string; photo: PhotoSlug; theme: Theme }> = [
  { word: "Faith", text: "Our Christian faith is at the heart of everything we do.", photo: "worship-ayigya", theme: "olive" },
  {
    word: "Compassion",
    text: "We believe every person deserves to be treated with dignity, kindness and care.",
    photo: "elder-portrait",
    theme: "terracotta",
  },
  {
    word: "Action",
    text: "We turn compassion into meaningful support through giving, outreach and community projects.",
    photo: "distribution-day",
    theme: "charcoal",
  },
];

export const whyWeExist = {
  title: "Why we exist.",
  copy: "The Pinnacle Foundation exists to share the Word and love of God while helping individuals and communities through charitable giving, compassionate service and meaningful outreach.",
};

export const journey: Array<{ title: string; text: string; photo: PhotoSlug }> = [
  { title: "You give", text: "A donor, partner or sponsor chooses to support the Foundation.", photo: "festival-smile" },
  { title: "We identify a need", text: "The Foundation works to understand where support can meaningfully help.", photo: "market-north" },
  { title: "We prepare", text: "Resources, donations and volunteers are coordinated.", photo: "preparing-donations" },
  { title: "We serve", text: "Support reaches communities through projects and outreach.", photo: "distribution-day" },
  {
    title: "We share the impact",
    text: "Stories and verified outcomes help supporters understand what their contribution made possible.",
    photo: "joy-portrait",
  },
];

export const finalCta = {
  lines: ["The world needs", "more love", "in action."],
  support:
    "Join The Pinnacle Foundation as we serve communities, share hope and demonstrate God's love through meaningful action.",
};
