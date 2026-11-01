import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, Linkedin } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getPostBySlug, getPostSlugs, formatDate, Post } from "@/lib/blog";
import { site } from "@/content/site";

// VisualArticle component for full HTML articles
function VisualArticle({ post }: { post: Post }) {
  // Remove HTML comments, normalize landmarks, and convert markdown horizontal rules to <hr>
  const processedContent = post.content
    .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
    .replace(/<main(\s|>)/g, "<div$1") // Avoid nested <main> landmark
    .replace(/<\/main>/g, "</div>")
    .replace(/^---+\s*$/gm, '<hr class="border-slate-800 my-12" />') // Convert markdown horizontal rules
    .replace(/\n\n/g, "\n"); // Normalize whitespace

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation & Breadcrumbs Bar */}
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/blog/"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white hover:shadow-glow"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400 transition-transform group-hover:-translate-x-1" />
              <span>All articles</span>
            </Link>
            <span className="hidden text-slate-600 sm:inline">/</span>
            <Link
              href="/"
              className="hidden text-xs text-slate-400 transition-colors hover:text-slate-200 sm:inline"
            >
              Home
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
            {post.category && (
              <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 font-medium text-cyan-300">
                {post.category}
              </span>
            )}
            {post.date && (
              <>
                <span>·</span>
                <span>{formatDate(post.date)}</span>
              </>
            )}
            {post.readingTime && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  {post.readingTime}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Render HTML content directly */}
      <div
        className="pb-16"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

      {/* Bottom Navigation & Next Steps */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Visual Framework Complete
            </div>
            <h3 className="mt-3 text-xl font-bold text-white">Continue Reading</h3>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Explore more thought leadership on AI-DLC, platform engineering, and enterprise engineering leadership.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${slug}/` },
    authors: [{ name: site.fullName, url: site.url }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${slug}/`,
      ...(post.date ? { publishedTime: post.date } : {}),
      tags: post.tags,
      authors: [site.fullName],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Check if this is a visual/HTML article
  const isVisual = post.visual === true || post.content.trim().startsWith("<");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    url: `${site.url}/blog/${slug}/`,
    author: {
      "@type": "Person",
      name: site.fullName,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.fullName,
      url: site.url,
    },
    keywords: post.tags?.join(", "),
    inLanguage: "en",
  };

  // Visual articles: Full HTML with custom styling and dedicated chrome
  if (isVisual) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <VisualArticle post={post} />
      </>
    );
  }

  // Standard MDX articles
  return (
    <article className="container-page min-h-screen max-w-3xl pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="flex items-center justify-between">
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-brand/40 hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All articles</span>
        </Link>
        <Link
          href="/"
          className="text-xs text-fg-muted transition-colors hover:text-fg"
        >
          Home
        </Link>
      </div>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span className="rounded-full bg-brand/10 px-2 py-0.5 font-medium text-brand">
            {post.category}
          </span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
          {post.source === "linkedin" && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0A66C2]">
                <Linkedin className="h-3.5 w-3.5 fill-current" /> LinkedIn
              </span>
            </>
          )}
        </div>
        <h1 className="mt-4 text-display text-balance">{post.title}</h1>
        <p className="mt-4 text-lg text-fg-muted">{post.description}</p>
      </header>

      {post.externalUrl && (
        <div className="mt-8 rounded-xl border border-brand/30 bg-brand/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-fg flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-[#0A66C2]" /> Originally published on LinkedIn
            </p>
            <p className="text-sm text-fg-muted mt-1">
              Read full discussion, comments, and insights directly on LinkedIn.
            </p>
          </div>
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-surface transition-colors hover:bg-brand/90 shrink-0"
          >
            Read on LinkedIn <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      <div className="prose dark:prose-invert mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-fg">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-brand/50 hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
        <Link
          href="/"
          className="text-sm text-fg-muted transition-colors hover:text-fg"
        >
          Back to Home &rarr;
        </Link>
      </div>
    </article>
  );
}
