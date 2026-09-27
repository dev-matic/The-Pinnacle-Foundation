import type { Story, StoryType } from "./types";

/**
 * STORIES
 *
 * PLACEHOLDER: no real testimonials exist yet. Each entry below is a frame that
 * shows where a consented story will sit and how it will read. Quotes are
 * written as descriptions of the story to come, never as invented words from
 * real people. Replace with real, consented stories and set `placeholder: false`.
 */
export const storyTypes: Record<StoryType, string> = {
  community: "Community",
  volunteer: "Volunteer",
  foundation: "Foundation",
  partner: "Partner",
  sponsor: "Sponsor",
  reflection: "Project reflection",
  "behind-the-scenes": "Behind the scenes",
};

export const stories: Story[] = [
  {
    slug: "a-community-in-its-own-words",
    type: "community",
    title: "A community, in its own words",
    quote: "A community member's own words will live here, shared with their consent and in the way they choose to tell it.",
    person: "Community member",
    role: "Name shared with consent",
    location: "Ghana",
    projectSlug: "community-giving-day",
    excerpt:
      "Community stories are told with the people in them, not about them. This space is reserved for a story shared on its teller's own terms.",
    body: [
      "This is a placeholder for a community story. Before any story is published, the Foundation asks for consent, agrees how names and photographs will be used, and gives the storyteller the final word.",
      "The finished story will describe the person and their community as they are: with their work, their faith, their humour and their hopes, not only their needs.",
    ],
    photo: "elder-portrait",
    featured: true,
    placeholder: true,
  },
  {
    slug: "why-i-serve",
    type: "volunteer",
    title: "Why I serve",
    quote: "A volunteer's reflection on what serving alongside the Foundation has meant to them will be shared here.",
    person: "Foundation volunteer",
    role: "Volunteer",
    location: "Accra",
    projectSlug: "community-giving-day",
    excerpt: "What moves someone to give a Saturday, a skill or a season to serve others? A volunteer answers in their own words.",
    body: [
      "Placeholder volunteer story. It will follow one volunteer from the first time they joined an outreach to the moment they understood what it meant to them.",
    ],
    photo: "green-ghana-volunteers",
    placeholder: true,
  },
  {
    slug: "before-the-first-box-is-packed",
    type: "behind-the-scenes",
    title: "Before the first box is packed",
    quote: "The quiet work behind every outreach: planning, listening and preparing, told by the people who do it.",
    person: "Foundation team",
    role: "Behind the scenes",
    location: "Ghana",
    excerpt: "Most of an outreach happens before anyone arrives. A look at the preparation that makes a single day possible.",
    body: ["Placeholder behind-the-scenes story describing how a project is planned, resourced and coordinated."],
    photo: "preparing-donations",
    placeholder: true,
  },
  {
    slug: "a-church-that-said-yes",
    type: "partner",
    title: "A church that said yes",
    quote: "A partner church's perspective on serving together will be shared here once the partnership is confirmed.",
    person: "Partner church",
    role: "Partner",
    location: "Ghana",
    projectSlug: "word-and-worship-outreach",
    excerpt: "What it looks like when a congregation decides to carry an outreach together.",
    body: ["Placeholder partner story. Real partner names will appear only with their agreement."],
    photo: "worship-shiashie",
    placeholder: true,
  },
  {
    slug: "the-day-after",
    type: "reflection",
    title: "The day after",
    quote: "A reflection on what happened after a project ended: what lasted, what the Foundation learned, and what comes next.",
    person: "The Pinnacle Foundation",
    role: "Project reflection",
    location: "Ghana",
    projectSlug: "shared-spaces-project",
    excerpt: "Impact is measured over months, not moments. A look back at a project once the volunteers have gone home.",
    body: ["Placeholder project reflection."],
    photo: "community-produce",
    placeholder: true,
  },
  {
    slug: "why-we-give",
    type: "sponsor",
    title: "Why we give",
    quote: "A sponsor's perspective on why they chose to support this work will be shared here.",
    person: "Project sponsor",
    role: "Sponsor",
    location: "Ghana",
    excerpt: "A business or individual sponsor on choosing to give, and what they hoped their support would make possible.",
    body: ["Placeholder sponsor story."],
    photo: "festival-smile",
    placeholder: true,
  },
];

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];
