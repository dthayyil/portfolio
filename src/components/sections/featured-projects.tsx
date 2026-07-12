"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArchDiagram } from "@/components/visuals/arch-diagram";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function FeaturedProjects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Systems that ship value safely at scale"
        description="Selected initiatives — from AI-driven release governance to cloud-native modernization. Each pairs a business challenge with a technical solution and measurable impact."
      />

      <div className="mt-12 space-y-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="card overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left: narrative */}
              <div className="order-2 p-6 sm:p-8 lg:order-1">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="text-xs uppercase tracking-widest text-fg-muted">
                    {p.tagline}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">{p.name}</h3>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-fg">Challenge</dt>
                    <dd className="mt-1 leading-relaxed text-fg-muted">{p.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fg">Solution</dt>
                    <dd className="mt-1 leading-relaxed text-fg-muted">{p.solution}</dd>
                  </div>
                </dl>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {p.impact.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-border bg-surface-2/40 p-3"
                    >
                      <div
                        className="text-lg font-bold"
                        style={{ color: p.accent }}
                      >
                        {m.metric}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-tight text-fg-muted">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-surface/60 px-2 py-0.5 text-[11px] text-fg-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: animated architecture diagram */}
              <div className="order-1 flex items-center justify-center border-b border-border/60 bg-surface-2/30 p-6 lg:order-2 lg:border-b-0 lg:border-l">
                <div
                  className="relative w-full overflow-hidden rounded-xl p-4"
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, ${p.accent}18, transparent 60%)`,
                  }}
                >
                  <span className="mb-2 block text-center text-[10px] uppercase tracking-widest text-fg-muted">
                    Architecture · flow
                  </span>
                  <ArchDiagram type={p.diagram} accent={p.accent} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
