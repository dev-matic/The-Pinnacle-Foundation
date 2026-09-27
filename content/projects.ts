import type { Project } from "./types";

/**
 * PROJECTS
 *
 * PLACEHOLDER: these entries show the structure of a project story. None of them
 * describe a real Foundation project. Replace each one with verified details
 * (or delete it) and set `placeholder: false`.
 *
 * `slug` is stable so that individual project pages (/projects/[slug]) can be
 * added later with generateStaticParams() without changing this data.
 */
export const projects: Project[] = [
  {
    slug: "community-giving-day",
    title: "Community Giving Day",
    category: "community-giving",
    location: "Greater Accra · community to be confirmed",
    date: "Date to be confirmed",
    summary:
      "An example of the Foundation's core work: volunteers gather, pack essentials together, and deliver them in person to families the Foundation has come to know.",
    description: [
      "This is placeholder text describing how a project story will read. A real entry explains why the project happened, who asked for help, and what the Foundation learned before planning began.",
      "It then walks through the day itself: where people gathered, what was prepared, and how the Foundation made sure support was received with dignity rather than handed down.",
    ],
    cover: "preparing-donations",
    gallery: ["preparing-donations", "distribution-day", "team-group"],
    provided: ["Essential food items (to be confirmed)", "Household supplies (to be confirmed)"],
    participants: "Foundation volunteers and a partner church (to be confirmed)",
    peopleReached: { label: "People reached", value: null, verified: false },
    itemsDonated: { label: "Items donated", value: null, verified: false },
    partners: [],
    outcome: "Verified outcomes will be published here once the Foundation has confirmed them.",
    whatNext: "Follow-up plans for this community will be shared here.",
    featured: true,
    tone: "olive",
    placeholder: true,
  },
  {
    slug: "word-and-worship-outreach",
    title: "Word & Worship Outreach",
    category: "christian-outreach",
    location: "Ashanti Region · community to be confirmed",
    date: "Date to be confirmed",
    summary:
      "An example outreach where a gathering of worship and encouragement sits alongside practical support, open to everyone whatever their faith.",
    description: [
      "Placeholder text. A real entry will describe the gathering, the churches and volunteers involved, and how the message of hope was shared.",
      "It will also note clearly that any support offered alongside the outreach was given freely and without condition.",
    ],
    cover: "worship-ayigya",
    gallery: ["worship-ayigya", "worship-shiashie", "gathering-dawhenya"],
    participants: "Local congregations and Foundation volunteers (to be confirmed)",
    peopleReached: { label: "People reached", value: null, verified: false },
    partners: [],
    outcome: "Verified outcomes will be published here once confirmed.",
    whatNext: "Plans for continued fellowship and support will be shared here.",
    tone: "terracotta",
    placeholder: true,
  },
  {
    slug: "shared-spaces-project",
    title: "Shared Spaces Project",
    category: "community-projects",
    location: "Location to be confirmed",
    date: "Date to be confirmed",
    summary:
      "An example community project where volunteers and residents work side by side to care for, repair or improve a space the whole community uses.",
    description: [
      "Placeholder text. A real entry will explain what the community identified as important, how residents led the work, and what the Foundation contributed.",
      "Long-term projects will include updates as the work continues.",
    ],
    cover: "volunteers-painting",
    gallery: ["volunteers-painting", "cleanup-volunteer", "green-ghana-volunteers"],
    participants: "Residents, youth volunteers and partners (to be confirmed)",
    partners: [],
    outcome: "Verified outcomes will be published here once confirmed.",
    whatNext: "Next steps will be shared here.",
    tone: "sand",
    placeholder: true,
  },
  {
    slug: "support-in-season",
    title: "Support in Season",
    category: "relief-support",
    location: "Northern Region · community to be confirmed",
    date: "Date to be confirmed",
    summary:
      "An example of responsive support: when a community faces an immediate need, the Foundation coordinates donations and volunteers quickly, and with care.",
    description: [
      "Placeholder text. A real entry will explain the need, how the Foundation learned about it, and how the response was organised with local leaders.",
    ],
    cover: "market-north",
    gallery: ["market-north", "elder-portrait", "community-produce"],
    participants: "Community leaders and Foundation volunteers (to be confirmed)",
    peopleReached: { label: "People reached", value: null, verified: false },
    partners: [],
    outcome: "Verified outcomes will be published here once confirmed.",
    whatNext: "Follow-up support will be shared here.",
    tone: "charcoal",
    placeholder: true,
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
