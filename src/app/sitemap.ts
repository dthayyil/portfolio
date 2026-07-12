import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/blog";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog/`, changeFrequency: "weekly", priority: 0.8 },
  ];
  const posts = getPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...routes, ...posts];
}
