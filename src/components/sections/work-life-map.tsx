"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { workMap } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CX = 400;
const CY = 300;
const RX = 320;
const RY = 210;

const positioned = workMap.nodes.map((n, i) => {
  const angle = (i / workMap.nodes.length) * Math.PI * 2 - Math.PI / 2;
  return {
    ...n,
    x: CX + Math.cos(angle) * RX,
    y: CY + Math.sin(angle) * RY,
  };
});

export function WorkLifeMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section id="work-map">
      <SectionHeading
        eyebrow="Work-Life Map"
        title="A systems view of how I work"
        description="Everything I do connects back to one goal: helping teams design, build, ship and govern software better. Hover a node to trace the relationships."
      />

      <div className="mt-12 overflow-hidden rounded-3xl border border-border/70 bg-surface/40 p-2 sm:p-4">
        <div className="relative dot-bg rounded-2xl">
          <svg
            viewBox="0 0 800 600"
            className="h-auto w-full"
            role="img"
            aria-label="Interactive map of engineering disciplines connected to Deepak T"
          >
            {/* relationship lines */}
            {positioned.map((n) => {
              const dim = active !== null && active !== n.id;
              return (
                <motion.line
                  key={`line-${n.id}`}
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.color}
                  strokeWidth={active === n.id ? 2.4 : 1.2}
                  strokeDasharray="6 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: dim ? 0.12 : 0.5 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              );
            })}

            {/* nodes */}
            {positioned.map((n, i) => {
              const dim = active !== null && active !== n.id;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x} ${n.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                >
                  <motion.circle
                    r={6}
                    fill={n.color}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: dim ? 0.3 : 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 260 }}
                  />
                  <motion.foreignObject
                    x={-78}
                    y={12}
                    width={156}
                    height={54}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: dim ? 0.35 : 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div
                      className={cn(
                        "mx-auto w-max max-w-[150px] rounded-lg border bg-surface/90 px-3 py-1.5 text-center text-[11px] font-medium leading-tight backdrop-blur transition-all",
                        active === n.id ? "border-current" : "border-border",
                      )}
                      style={{ color: active === n.id ? n.color : undefined }}
                    >
                      {n.label}
                    </div>
                  </motion.foreignObject>
                </g>
              );
            })}

            {/* center node */}
            <g transform={`translate(${CX} ${CY})`}>
              <motion.circle
                r={54}
                fill="url(#coreGrad)"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewportOnce}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              />
              <motion.circle
                r={54}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={1.5}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <text textAnchor="middle" y={-2} className="fill-white text-[13px] font-bold">
                {workMap.center.label}
              </text>
              <text textAnchor="middle" y={14} className="fill-white/70 text-[8px]">
                Principal Engineer
              </text>
            </g>

            <defs>
              <radialGradient id="coreGrad">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </Section>
  );
}
