import type { ImpactStat } from "./types";

/**
 * IMPACT STATISTICS
 *
 * PLACEHOLDER: these numbers are NOT real. They exist only so the layout and
 * counters can be reviewed. Every stat with `verified: false` is shown with a
 * visible placeholder label. Replace with audited figures and set `verified: true`.
 */
export const impactStats: ImpactStat[] = [
  { id: "communities", label: "Communities reached", value: 12, verified: false },
  { id: "projects", label: "Projects completed", value: 30, verified: false },
  { id: "volunteers", label: "Volunteers", value: 150, suffix: "+", verified: false },
  { id: "people", label: "People supported", value: 2500, suffix: "+", verified: false },
];

export const impactStatement = "Behind every number is a person, a family, a community and a story.";

export const hasUnverifiedStats = impactStats.some((s) => !s.verified);
