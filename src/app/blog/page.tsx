import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, Linkedin } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Thought leadership on AI-DLC, GitHub Copilot, agentic engineering, platform engineering, Azure AI and developer experience.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container-page min-h-screen pb-24 pt-32">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <header className="mt-8 max-w-2xl">
        <span className="eyebrow mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Thought Leadership
        </span>
        <h1 className="text-display text-balance">Articles</h1>
        <p className="mt-4 text-lg text-fg-muted">
          Writing on AI-native engineering — AI-DLC, GitHub Copilot, agentic
          workflows, platform engineering and developer experience.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-fg-muted">Articles coming soon.</p>
      ) : (
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const isExternal = Boolean(post.externalUrl);
            const CardWrapper = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? {
                  href: post.externalUrl!,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : { href: `/blog/${post.slug}` };

            return (
              <CardWrapper
                key={post.slug}
                {...(linkProps as any)}
                className="card card-hover group flex flex-col p-6 relative"
              >
                <div className="flex items-center justify-between text-xs text-fg-muted">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 font-medium text-brand">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  {post.source === "linkedin" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0A66C2]">
                      <Linkedin className="h-3.5 w-3.5 fill-current" /> LinkedIn
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-brand flex items-start justify-between gap-2">
                  <span>{post.title}</span>
                  {isExternal && (
                    <ExternalLink className="h-4 w-4 shrink-0 text-fg-muted opacity-60 group-hover:text-brand group-hover:opacity-100 transition-opacity" />
                  )}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-fg-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </div>
                  {isExternal && (
                    <span className="text-xs text-brand font-medium group-hover:underline">
                      Read on LinkedIn &rarr;
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}

