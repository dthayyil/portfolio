"use client";

import { motion } from "framer-motion";
import { ecosystem } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { viewportOnce } from "@/lib/motion";

const CX = 300;
const CY = 230;
const R = 175;

const nodes = ecosystem.map((e, i) => {
  const angle = (i / ecosystem.length) * Math.PI * 2 - Math.PI / 2;
  return { ...e, x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * (R * 0.72) };
});

export function WhatIWorkWith() {
  return (
    <Section id="ecosystem">
      <SectionHeading
        eyebrow="What I Work With"
        title="Engineering is a team sport"
        description="I partner across the whole delivery org — from leadership and architects to developers, QA, security, release and the business."
        align="center"
      />

      <div className="mx-auto mt-10 max-w-3xl">
        <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label="Ecosystem of roles I collaborate with">
          {nodes.map((n, i) => (
            <motion.line
              key={`l-${n.role}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke="hsl(var(--brand))"
              strokeOpacity={0.25}
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          ))}

          {/* center */}
          <g transform={`translate(${CX} ${CY})`}>
            <circle r={46} fill="url(#ecoGrad)" />
            <text textAnchor="middle" y={-2} className="fill-white text-[12px] font-bold">Deepak T</text>
            <text textAnchor="middle" y={13} className="fill-white/70 text-[8px]">Principal Engineer</text>
          </g>

          {nodes.map((n, i) => (
            <motion.g
              key={n.role}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 240 }}
              whileHover={{ scale: 1.08 }}
              className="cursor-default"
            >
              <foreignObject x={n.x - 60} y={n.y - 24} width={120} height={48}>
                <div className="flex h-full items-center gap-2 rounded-xl border border-border bg-surface/90 px-2.5 py-1.5 backdrop-blur">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand/10 text-brand">
                    <Icon name={n.icon} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[10px] font-medium leading-tight">{n.role}</span>
                </div>
              </foreignObject>
            </motion.g>
          ))}

          <defs>
            <radialGradient id="ecoGrad">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </Section>
  );
}
