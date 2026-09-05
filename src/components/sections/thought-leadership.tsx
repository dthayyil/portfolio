"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, ExternalLink, Linkedin } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { Section, SectionHeading } from "@/components/ui/section";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ThoughtLeadership({ posts }: { posts: PostMeta[] }) {
  return (
    <Section id="thought-leadership">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Thought Leadership"
          title="Writing on AI-native engineering"
          description="Notes on AI-DLC, GitHub Copilot, agentic engineering, platform engineering, Azure AI and developer experience."
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium transition-colors hover:border-brand/50"
        >
          All articles <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-fg-muted">Articles coming soon.</p>
      ) : (
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
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
              <motion.div key={post.slug} variants={staggerItem} whileHover={{ y: -4 }}>
                <CardWrapper
                  {...(linkProps as any)}
                  className="card card-hover group flex h-full flex-col p-6 relative"
                >
                  <div className="flex items-center justify-between text-xs text-fg-muted">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 font-medium text-brand">
                        {post.category}
                      </span>
                      <span>·</span>
                      <span>{fmt(post.date)}</span>
                    </div>
                    {post.source === "linkedin" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0A66C2]">
                        <Linkedin className="h-3.5 w-3.5 fill-current" /> LinkedIn
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-brand flex items-start justify-between gap-2">
                    <span>{post.title}</span>
                    {isExternal && (
                      <ExternalLink className="h-4 w-4 shrink-0 text-fg-muted opacity-60 group-hover:text-brand group-hover:opacity-100 transition-opacity" />
                    )}
                  </h3>
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
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </Section>
  );
}

