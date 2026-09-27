import type { ProjectCategory, WorkArea } from "./types";

/** Areas of engagement. Add, remove or reorder freely as the Foundation's work grows. */
export const workAreas: WorkArea[] = [
  {
    id: "community-giving",
    title: "Community Giving",
    summary: "Providing practical donations and essential support to communities and individuals in need.",
    photo: "preparing-donations",
  },
  {
    id: "christian-outreach",
    title: "Christian Outreach",
    summary: "Sharing messages of faith, encouragement, compassion and the Word of God.",
    photo: "worship-ayigya",
  },
  {
    id: "community-projects",
    title: "Community Projects",
    summary: "Supporting initiatives designed to create meaningful and lasting improvements.",
    photo: "volunteers-painting",
  },
  {
    id: "relief-support",
    title: "Relief & Support",
    summary: "Responding where possible to immediate community needs with dignity and compassion.",
    photo: "distribution-day",
  },
  {
    id: "partnership-initiatives",
    title: "Partnership Initiatives",
    summary: "Working alongside individuals, churches, organisations, businesses and sponsors.",
    photo: "team-group",
  },
];

export const categoryLabel = (id: ProjectCategory) => workAreas.find((a) => a.id === id)?.title ?? id;

/**
 * How the Foundation serves a community, step by step (shown on the Donate page).
 * PLACEHOLDER: drafted wording; confirm with the Foundation, then set `approachIsDraft` to false.
 */
export const approachSteps = [
  { title: "Listen first", text: "We start by understanding a community's own priorities, through local leaders, churches and the people themselves." },
  { title: "Prepare carefully", text: "Resources, volunteers and partners are coordinated so that help arrives well organised and on time." },
  { title: "Serve with dignity", text: "Support is offered person to person, with respect, privacy and warmth. No one is reduced to their need." },
  { title: "Report honestly", text: "We share what happened, what it cost and what we learned, and we only publish outcomes we can verify." },
];
export const approachIsDraft = true;
