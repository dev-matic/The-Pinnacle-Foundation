import type { Partner, PhotoSlug, TeamMember } from "./types";

export const pathways: Array<{
  id: "give" | "serve" | "partner";
  title: string;
  line: string;
  description: string;
  cta: { label: string; href: string };
  photo: PhotoSlug;
  theme: "olive" | "terracotta" | "charcoal";
}> = [
  {
    id: "give",
    title: "Give",
    line: "Support the work financially.",
    description: "Your gift turns into supplies packed, journeys made and projects completed across Ghana.",
    cta: { label: "Donate", href: "/donate" },
    photo: "preparing-donations",
    theme: "olive",
  },
  {
    id: "serve",
    title: "Serve",
    line: "Volunteer your time and skills.",
    description: "Pack, drive, photograph, organise, teach or pray. There's a place for what you bring.",
    cta: { label: "Volunteer With Us", href: "/get-involved#serve" },
    photo: "green-ghana-volunteers",
    theme: "terracotta",
  },
  {
    id: "partner",
    title: "Partner",
    line: "Help the Foundation reach further.",
    description: "Churches, businesses and organisations can multiply what one outreach can do.",
    cta: { label: "Become a Partner", href: "/get-involved#partner" },
    photo: "team-group",
    theme: "charcoal",
  },
];

export const volunteerAreas: Array<{ title: string; description: string }> = [
  { title: "Community outreach", description: "Be present with people on outreach days: welcoming, listening, praying and serving." },
  { title: "Donation distribution", description: "Sort, pack and hand over donations so they reach people with care." },
  { title: "Project support", description: "Help plan and carry out community projects from first visit to final day." },
  { title: "Media & storytelling", description: "Write, film or design so supporters can see what their generosity makes possible." },
  { title: "Photography", description: "Document outreach respectfully, always with consent and dignity first." },
  { title: "Fundraising", description: "Organise drives and events that grow the Foundation's capacity to serve." },
  { title: "Logistics", description: "Coordinate transport, storage and timing so the work runs smoothly." },
  { title: "Professional services", description: "Offer legal, finance, medical, IT or other expertise pro bono." },
  { title: "Event support", description: "Set up, host and steward gatherings, worship moments and community days." },
];

export const volunteerSteps = [
  { title: "Tell us about you", text: "Share your interests, skills and when you're available." },
  { title: "We'll talk", text: "Someone from the Foundation gets in touch to find the right fit." },
  { title: "Join an outreach", text: "Serve alongside the team on a project or behind the scenes." },
];

export const partnershipTypes: Array<{ title: string; description: string; for: string }> = [
  { title: "Project sponsorship", description: "Fund a specific project from planning through to follow-up.", for: "Businesses, families, individuals" },
  { title: "Corporate giving", description: "Give as a company, match employee gifts or adopt an annual outreach.", for: "Businesses" },
  { title: "Church partnerships", description: "Serve together through joint outreach, volunteers and shared projects.", for: "Congregations and ministries" },
  { title: "Donation drives", description: "Gather food, clothing or supplies in your church, school or workplace.", for: "Churches, schools, workplaces" },
  { title: "In-kind support", description: "Provide goods, transport, venues or services the work depends on.", for: "Businesses and organisations" },
  { title: "Community partnerships", description: "Work with us as a local leader or group to shape support around real needs.", for: "Community groups and leaders" },
  { title: "Volunteer partnerships", description: "Bring a team from your organisation to serve on a project day.", for: "Teams and groups" },
];

export const inKindExamples = ["Food and staples", "Clothing", "School supplies", "Hygiene essentials", "Transport", "Venue space"];

/**
 * PLACEHOLDER: add team members when the Foundation confirms names, roles and photographs.
 * Put portraits in public/images/team/ and list people in the order they should appear, e.g.
 *   { name: "Full Name", role: "Founder", image: "/images/team/full-name.jpg" },
 * While this list is empty, the About page shows labelled placeholder cards.
 */
export const team: TeamMember[] = [];

/** How many placeholder cards to show while `team` is empty. */
export const teamPlaceholderCount = 6;

/** Only real, confirmed partners belong here. Logos go in /public/images/partners. */
export const partners: Partner[] = [];
