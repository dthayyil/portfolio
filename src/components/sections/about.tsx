"use client";

import { motion } from "framer-motion";
import { about } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { fadeUp, stagger, staggerItem, viewportOnce } from "@/lib/motion";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {about.eyebrow}
            </span>
            <h2 className="text-headline text-balance">{about.title}</h2>
          </Reveal>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted"
          >
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={staggerItem} className="text-pretty">
                {p}
              </motion.p>
            ))}
          </motion.div>

          <Reveal className="mt-8" delay={0.1}>
            <p className="mb-3 text-xs uppercase tracking-widest text-fg-muted">
              Specializations
            </p>
            <div className="flex flex-wrap gap-2">
              {about.specializations.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm text-fg"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Achievement stats */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 self-start lg:sticky lg:top-28"
        >
          {about.achievements.map((a) => (
            <motion.div
              key={a.label}
              variants={fadeUp}
              className="card card-hover flex flex-col justify-between p-5"
            >
              <span className="text-3xl font-bold text-gradient sm:text-4xl">
                {a.metric}
              </span>
              <span className="mt-2 text-sm leading-snug text-fg-muted">
                {a.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
