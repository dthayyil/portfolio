"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { viewportOnce } from "@/lib/motion";

const links = [
  { label: "LinkedIn", handle: "in/deepakthayyil", href: site.socials.linkedin, Icon: Linkedin, color: "#3b82f6" },
  { label: "GitHub", handle: "@dthayyil", href: site.socials.github, Icon: Github, color: "#8b5cf6" },
  { label: "Email", handle: site.email, href: site.socials.email, Icon: Mail, color: "#22d3ee" },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface/40 p-8 text-center sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

          <span className="eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Contact
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-headline text-balance">
            Let&apos;s build{" "}
            <span className="text-gradient">intelligent engineering platforms</span>{" "}
            together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-muted">
            Open to Principal Engineer roles, platform &amp; AI-DLC consulting, and
            speaking on AI-native engineering.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {links.map(({ label, handle, href, Icon, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                whileHover={{ y: -4 }}
                className="card card-hover group flex flex-col items-center gap-2 p-6"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white"
                  style={{ background: color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-1 flex items-center gap-1 text-sm font-semibold">
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-xs text-fg-muted">{handle}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
