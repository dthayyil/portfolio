import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const LINKEDIN_FILE = path.join(BLOG_DIR, "linkedin-articles.json");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  category: string;
  readingTime: string;
  featured?: boolean;
  externalUrl?: string;
  source?: "local" | "linkedin";
};

export type Post = PostMeta & { content: string };

function ensureDir(): boolean {
  return fs.existsSync(BLOG_DIR);
}

export function getLinkedInPosts(): Post[] {
  if (!fs.existsSync(LINKEDIN_FILE)) return [];
  try {
    const raw = fs.readFileSync(LINKEDIN_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      slug: item.slug || `linkedin-${Date.now()}`,
      title: item.title || "Untitled Article",
      description: item.description || "",
      date: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      tags: Array.isArray(item.tags) ? item.tags : ["LinkedIn"],
      category: item.category || "LinkedIn Article",
      readingTime: item.readingTime || "5 min read",
      featured: Boolean(item.featured),
      externalUrl: item.externalUrl || item.link || "https://www.linkedin.com/in/deepakthayyil/",
      source: "linkedin" as const,
      content: item.content || `This article was originally published on LinkedIn. [Read the full article on LinkedIn](${item.externalUrl || item.link || "https://www.linkedin.com/in/deepakthayyil/"}).`,
    }));
  } catch (err) {
    console.error("Failed to parse linkedin-articles.json:", err);
    return [];
  }
}

export function getLocalPostSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostSlugs(): string[] {
  const localSlugs = getLocalPostSlugs();
  const linkedinPosts = getLinkedInPosts();
  const linkedinSlugs = linkedinPosts.map((p) => p.slug);
  return Array.from(new Set([...localSlugs, ...linkedinSlugs]));
}

export function getPostBySlug(slug: string): Post | null {
  const clean = slug.replace(/\.mdx?$/, "");
  const full = path.join(BLOG_DIR, `${clean}.mdx`);

  if (fs.existsSync(full)) {
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    return {
      slug: clean,
      title: data.title ?? clean,
      description: data.description ?? "",
      date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
      tags: data.tags ?? [],
      category: data.category ?? "Engineering",
      featured: data.featured ?? false,
      externalUrl: data.externalUrl,
      source: data.externalUrl ? "linkedin" : "local",
      readingTime: readingTime(content).text,
      content,
    };
  }

  const linkedinPosts = getLinkedInPosts();
  const found = linkedinPosts.find((p) => p.slug === clean);
  if (found) return found;

  return null;
}

export function getAllPosts(): Post[] {
  const localPosts = getLocalPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p));

  const linkedinPosts = getLinkedInPosts();
  
  // Merge and deduplicate by slug (local overrides linkedin if same slug)
  const map = new Map<string, Post>();
  for (const post of linkedinPosts) {
    map.set(post.slug, post);
  }
  for (const post of localPosts) {
    map.set(post.slug, post);
  }

  return Array.from(map.values()).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

export function getLatestPosts(n = 6): PostMeta[] {
  return getAllPosts()
    .slice(0, n)
    .map(({ content: _content, ...meta }) => meta);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

