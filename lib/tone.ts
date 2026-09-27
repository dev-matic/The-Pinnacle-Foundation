import type { Theme } from "@/content/types";

/** Sets the page-wide colour tone (see globals.css). Sections opt in with data-scroll-tone. */
export function setPageTone(tone: Theme) {
  const root = document.documentElement;
  if (root.dataset.tone !== tone) root.dataset.tone = tone;
}
