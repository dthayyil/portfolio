import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, Linkedin } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getPostBySlug, getPostSlugs, formatDate, Post } from "@/lib/blog";
import { site } from "@/content/site";

// VisualArticle component for full HTML articles with Chart.js
function VisualArticle({ post }: { post: Post }) {
  // Remove HTML comments and convert markdown horizontal rules to <hr>
  // This preprocessing helps ensure the content renders correctly
  const processedContent = post.content
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/^---+\s*$/gm, '<hr class="border-slate-800 my-12" />') // Convert markdown horizontal rules
    .replace(/\n\n/g, '\n'); // Normalize whitespace

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Portfolio navigation overlay */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="flex shrink-0 items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Articles</span>
          </Link>
          <span className="hidden text-sm font-bold tracking-tight text-cyan-300 sm:block">⚡ AI Token Economics</span>
          <div className="flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap text-xs font-medium text-slate-300 sm:gap-5">
            <a href="#overview" className="transition-colors hover:text-cyan-400">Overview</a>
            <a href="#economics" className="transition-colors hover:text-cyan-400">Economics</a>
            <a href="#token-trap" className="transition-colors hover:text-cyan-400">Token Trap</a>
            <a href="#framework" className="transition-colors hover:text-cyan-400">Framework</a>
            <a href="#comparison" className="transition-colors hover:text-cyan-400">Compare</a>
            <a href="#finops" className="transition-colors hover:text-cyan-400">Governance</a>
          </div>
          <span className="hidden shrink-0 text-xs text-slate-500 lg:block">{formatDate(post.date)} · {post.readingTime}</span>
        </div>
      </nav>

      {/* Render HTML content directly */}
      <main 
        className="min-h-screen"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

      {/* Chart.js for interactive charts */}
      <script src="https://cdn.jsdelivr.net/npm/chart.js" defer />
    </div>
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
      publishedTime: post.date,
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
  const isVisual = post.visual === true || post.content.trim().startsWith('<');

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
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

  // Visual articles: Full HTML with custom styling
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
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

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
    </article>
  );
}
