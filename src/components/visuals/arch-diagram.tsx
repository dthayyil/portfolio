"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

type Node = { id: string; x: number; y: number; label: string };
type Edge = [string, string];

type DiagramSpec = { nodes: Node[]; edges: Edge[] };

const SPECS: Record<string, DiagramSpec> = {
  release: {
    nodes: [
      { id: "pr", x: 60, y: 90, label: "Pull Request" },
      { id: "ai", x: 200, y: 40, label: "AI Risk Scoring" },
      { id: "policy", x: 200, y: 140, label: "Policy-as-Code" },
      { id: "gate", x: 340, y: 90, label: "Release Gate" },
      { id: "prod", x: 460, y: 90, label: "Production" },
    ],
    edges: [["pr", "ai"], ["pr", "policy"], ["ai", "gate"], ["policy", "gate"], ["gate", "prod"]],
  },
  agent: {
    nodes: [
      { id: "copilot", x: 60, y: 90, label: "GitHub Copilot" },
      { id: "mcp", x: 210, y: 90, label: "MCP Agent" },
      { id: "policy", x: 350, y: 40, label: "Org Standards" },
      { id: "metrics", x: 350, y: 140, label: "Metrics" },
      { id: "repo", x: 470, y: 90, label: "Repositories" },
    ],
    edges: [["copilot", "mcp"], ["mcp", "policy"], ["mcp", "metrics"], ["policy", "repo"], ["metrics", "repo"]],
  },
  workflow: {
    nodes: [
      { id: "sdlc", x: 60, y: 90, label: "SDLC Events" },
      { id: "agents", x: 210, y: 90, label: "AI Agents" },
      { id: "triage", x: 350, y: 40, label: "Triage" },
      { id: "review", x: 350, y: 140, label: "Review" },
      { id: "devops", x: 470, y: 90, label: "DevOps Tools" },
    ],
    edges: [["sdlc", "agents"], ["agents", "triage"], ["agents", "review"], ["triage", "devops"], ["review", "devops"]],
  },
  cloud: {
    nodes: [
      { id: "mono", x: 60, y: 90, label: "Monolith" },
      { id: "ddd", x: 200, y: 90, label: "DDD Decompose" },
      { id: "svc", x: 340, y: 40, label: "Microservices" },
      { id: "k8s", x: 340, y: 140, label: "Kubernetes" },
      { id: "cloud", x: 470, y: 90, label: "Azure / AWS" },
    ],
    edges: [["mono", "ddd"], ["ddd", "svc"], ["ddd", "k8s"], ["svc", "cloud"], ["k8s", "cloud"]],
  },
};

export function ArchDiagram({ type, accent }: { type: string; accent: string }) {
  const spec = SPECS[type] ?? SPECS.cloud;
  const byId = (id: string) => spec.nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 540 190" className="h-full w-full" aria-hidden>
      {/* edges */}
      {spec.edges.map(([a, b], i) => {
        const na = byId(a);
        const nb = byId(b);
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={na.x + 46}
              y1={na.y}
              x2={nb.x - 46}
              y2={nb.y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            <motion.line
              x1={na.x + 46}
              y1={na.y}
              x2={nb.x - 46}
              y2={nb.y}
              stroke={accent}
              strokeWidth={1.5}
              strokeDasharray="4 10"
              initial={{ strokeDashoffset: 40, opacity: 0 }}
              whileInView={{ strokeDashoffset: 0, opacity: 0.9 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
            />
          </g>
        );
      })}

      {/* nodes */}
      {spec.nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 240 }}
        >
          <rect
            x={n.x - 46}
            y={n.y - 16}
            width={92}
            height={32}
            rx={8}
            fill="hsl(var(--surface-2))"
            stroke={accent}
            strokeOpacity={0.4}
          />
          <text
            x={n.x}
            y={n.y + 3.5}
            textAnchor="middle"
            className="fill-fg text-[9px] font-medium"
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
