"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { operatingSystem } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { viewportOnce } from "@/lib/motion";

export function OperatingSystem() {
  return (
    <Section id="operating-system">
      <SectionHeading
        eyebrow="My Engineering Operating System"
        title="How vision becomes business outcomes"
        description="A layered model of how I operate — from strategic vision down to measurable business impact. Each layer enables the next."
        align="center"
      />

      <div className="mx-auto mt-12 max-w-2xl space-y-3">
        {operatingSystem.map((layer, i) => (
          <div key={layer.layer}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.015 }}
              className="card card-hover flex items-center gap-4 overflow-hidden p-5"
              style={{ background: `linear-gradient(90deg, ${layer.color}12, transparent)` }}
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
                style={{ background: layer.color }}
              >
                <Icon name={layer.icon} className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-fg-muted">
                    L{operatingSystem.length - i}
                  </span>
                  <h3 className="text-base font-semibold">{layer.layer}</h3>
                </div>
                <p className="mt-0.5 text-sm text-fg-muted">{layer.desc}</p>
              </div>
            </motion.div>
            {i < operatingSystem.length - 1 ? (
              <div className="flex justify-center py-1">
                <ChevronDown className="h-4 w-4 text-fg-muted/50" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
