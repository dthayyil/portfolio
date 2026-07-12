"use client";

import { motion } from "framer-motion";
import { focusAreas } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";

export function FocusAreas() {
  return (
    <Section id="focus">
      <SectionHeading
        eyebrow="Focus Areas"
        title="Where I create the most leverage"
        description="Each area pairs a real problem with the technologies I apply and the business impact it drives."
      />

      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {focusAreas.map((f) => (
          <motion.article
            key={f.title}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="card card-hover flex flex-col p-5"
          >
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand-gradient text-white">
              <Icon name={f.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.problem}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {f.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-surface-2/50 px-2 py-0.5 text-[11px] text-fg-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-4 border-t border-border/60 pt-3 text-sm font-medium text-fg">
              <span className="text-brand">Impact · </span>
              {f.impact}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
