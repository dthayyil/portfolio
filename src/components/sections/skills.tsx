"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="An AI-native, cloud-first toolkit"
        description="Depth across cloud, architecture, backend, frontend, DevOps and AI — chosen to build platforms that scale."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group) => (
          <motion.div
            key={group.group}
            variants={staggerItem}
            className="card p-6"
            style={{ borderColor: `${group.color}30` }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: group.color }}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {group.group}
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border bg-surface-2/50 px-3 py-1.5 text-sm font-medium"
                  style={{ boxShadow: `inset 0 0 0 1px ${group.color}15` }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
