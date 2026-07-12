"use client";

import { motion } from "framer-motion";
import { values } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";

export function EngineeringValues() {
  return (
    <Section id="values">
      <SectionHeading
        eyebrow="Engineering Values"
        title="The principles behind every system I build"
        align="center"
      />

      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {values.map((v) => (
          <motion.li
            key={v.name}
            variants={staggerItem}
            className="card card-hover group p-6"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2/60 text-brand transition-colors group-hover:border-brand/40">
              <Icon name={v.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{v.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{v.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
