import type { Metadata } from "next";
import { site } from "./site";

type PageKey = "home" | "about" | "projects" | "getInvolved" | "stories" | "donate" | "contact";

const pages: Record<PageKey, { path: string; title: string; description: string }> = {
  home: {
    path: "/",
    title: "The Pinnacle Foundation | Faith, Compassion & Community Impact in Ghana",
    description:
      "The Pinnacle Foundation is a faith-based charitable organization in Ghana sharing God's love through community support, charitable donations, outreach and meaningful service.",
  },
  about: {
    path: "/about/",
    title: "About Us | The Pinnacle Foundation",
    description:
      "Who The Pinnacle Foundation is, why we serve and how our Christian faith shapes our work with communities across Ghana.",
  },
  projects: {
    path: "/projects/",
    title: "Projects & Community Work in Ghana | The Pinnacle Foundation",
    description:
      "Explore The Pinnacle Foundation's community giving, Christian outreach, community projects and relief work across Ghana.",
  },
  getInvolved: {
    path: "/get-involved/",
    title: "Get Involved: Give, Serve, Partner | The Pinnacle Foundation",
    description:
      "Volunteer your time, partner as a church or business, sponsor a project or give in kind with The Pinnacle Foundation in Ghana.",
  },
  stories: {
    path: "/stories/",
    title: "Stories | The Pinnacle Foundation",
    description:
      "Stories from communities, volunteers and partners, told with dignity, behind The Pinnacle Foundation's work in Ghana.",
  },
  donate: {
    path: "/donate/",
    title: "Donate | The Pinnacle Foundation",
    description:
      "Give to The Pinnacle Foundation and help serve communities across Ghana. See what your gift supports and how we account for it.",
  },
  contact: {
    path: "/contact/",
    title: "Contact | The Pinnacle Foundation",
    description:
      "Get in touch with The Pinnacle Foundation about volunteering, partnerships, donations, projects or general enquiries.",
  },
};

export function pageMetadata(key: PageKey): Metadata {
  const p = pages[key];
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: "website",
      url: p.path,
      siteName: site.name,
      title: p.title,
      description: p.description,
      locale: "en_GH",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: ["/og.jpg"] },
  };
}

export const routes = Object.values(pages).map((p) => p.path);
