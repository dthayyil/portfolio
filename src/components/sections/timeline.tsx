"use client";

import { motion } from "framer-motion";
import { timeline } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeading
        eyebrow="Career Journey"
        title="Developer → Principal Engineer"
        description="Fifteen years of compounding scope — from shipping features to shaping how organisations engineer software."
      />

      <div className="relative mt-12 pl-4 sm:pl-0">
        {/* vertical line */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-brand/60 via-border to-transparent sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {timeline.map((t, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={t.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative sm:grid sm:grid-cols-2 sm:gap-8"
              >
                {/* dot */}
                <span className="absolute left-4 top-2 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center sm:left-1/2">
                  <span className="h-3 w-3 rounded-full bg-brand shadow-glow-lg" />
                </span>

                <div
                  className={`pl-8 sm:pl-0 ${
                    left ? "sm:col-start-1 sm:pr-10 sm:text-right" : "sm:col-start-2 sm:pl-10"
                  }`}
                >
                  <div className="card card-hover p-5">
                    <span className="text-xs uppercase tracking-widest text-brand">
                      {t.period}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">{t.role}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
