import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  category: string;
  readingTime: string;
  featured?: boolean;
};

export type Post = PostMeta & { content: string };

function ensureDir(): boolean {
  return fs.existsSync(BLOG_DIR);
}

export function getPostSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const clean = slug.replace(/\.mdx?$/, "");
  const full = path.join(BLOG_DIR, `${clean}.mdx`);
  if (!fs.existsSync(full)) return null;
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
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
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
