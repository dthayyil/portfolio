import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${base}/blog/`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date().toISOString(),
    },
  ];

  // getAllPosts() merges MDX local posts + LinkedIn articles — no entries missed
  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: post.date ? new Date(post.date).toISOString() : undefined,
  }));

  return [...routes, ...posts];
}
