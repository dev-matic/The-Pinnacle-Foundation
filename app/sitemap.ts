import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/content/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/donate/" ? 0.9 : 0.7,
  }));
}
