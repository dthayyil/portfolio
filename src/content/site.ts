/**
 * Single source of truth for all site content.
 * Edit here to update copy across the whole portfolio.
 */

export const site = {
  name: "Deepak T",
  role: "Principal Software Engineer",
  brand: "Principal Software Engineer · Cloud Architect · AI-Native Engineering Leader",
  domain: "deepakthayyil.online",
  url: "https://deepakthayyil.online",
  email: "dthayyil@gmail.com",
  location: "Bengaluru, India",
  socials: {
    linkedin: "https://www.linkedin.com/in/deepakthayyil/",
    github: "https://github.com/dthayyil",
    email: "mailto:dthayyil@gmail.com",
  },
  keywords: [
    "Principal Software Engineer",
    "Cloud Architect",
    "AI-DLC",
    "GitHub Copilot",
    "Platform Engineering",
    "Azure AI",
    "Kubernetes",
    "DevOps",
    "Microservices",
    "Agentic Workflows",
    "AI-Native Engineering",
  ],
} as const;

export const hero = {
  headline: "Building the Future of AI-Native Engineering",
  subheadline:
    "Principal Software Engineer helping organisations modernise software delivery through Platform Engineering, AI-Augmented Development, Cloud-Native Architecture and Intelligent Automation.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Read Articles", href: "#thought-leadership" },
  badges: [
    "GitHub Copilot",
    "Azure AI Foundry",
    "AWS",
    "Azure",
    "Kubernetes",
    "Docker",
    ".NET",
    "React",
    "TypeScript",
  ],
};

// Section 2 — Work Life Visual Map
export const workMap = {
  center: { id: "core", label: "Deepak T", sub: "Principal Software Engineer" },
  nodes: [
    { id: "platform", label: "Platform Engineering", color: "#22d3ee" },
    { id: "ai", label: "AI Development", color: "#8b5cf6" },
    { id: "cloud", label: "Cloud Architecture", color: "#3b82f6" },
    { id: "devops", label: "DevOps", color: "#10b981" },
    { id: "quality", label: "Quality Engineering", color: "#f59e0b" },
    { id: "security", label: "Security", color: "#ef4444" },
    { id: "release", label: "Release Governance", color: "#ec4899" },
    { id: "observability", label: "Observability", color: "#14b8a6" },
    { id: "reviews", label: "Architecture Reviews", color: "#a78bfa" },
    { id: "dx", label: "Developer Experience", color: "#38bdf8" },
  ],
};

// Section 3 — About
export const about = {
  eyebrow: "About",
  title: "15+ years turning complex systems into simple, scalable platforms",
  paragraphs: [
    "I'm a Principal Software Engineer and Cloud Architect with over 15 years of experience designing and delivering enterprise-grade software. I help engineering organisations modernise how they build, ship and govern software — pairing cloud-native architecture with an AI-native development lifecycle.",
    "My work spans large-scale healthcare platforms, microservices modernisation and platform engineering initiatives that raise developer productivity and release confidence. I care about the whole delivery system: architecture, automation, quality, security and the developer experience that ties them together.",
    "Lately I'm focused on the AI-Driven Development Lifecycle (AI-DLC) — bringing GitHub Copilot, agentic workflows and intelligent automation into the way teams design, review, test and release software safely at scale.",
  ],
  specializations: [
    "Cloud Solutions",
    "Microservices",
    "Enterprise Architecture",
    "Platform Engineering",
    "AI Development",
    "DevOps",
  ],
  achievements: [
    { metric: "40%", label: "memory reduction via microservices migration" },
    { metric: "30%", label: "faster deployments with Kubernetes" },
    { metric: "20+", label: "applications hosted & operated" },
    { metric: "15+", label: "years engineering enterprise software" },
  ],
};

// Section 4 — Engineering Values
export const values = [
  { name: "Customer First", icon: "Heart", desc: "Every architectural decision traces back to a real user or business outcome." },
  { name: "Ownership", icon: "KeyRound", desc: "From commit to production and beyond — accountable end-to-end." },
  { name: "Engineering Excellence", icon: "Gem", desc: "Clean, tested, observable systems that are a pleasure to operate." },
  { name: "Simplicity", icon: "Minimize2", desc: "Remove accidental complexity; the best system is the one you can reason about." },
  { name: "Continuous Learning", icon: "GraduationCap", desc: "Stay at the frontier — today that means AI-native engineering." },
  { name: "Collaboration", icon: "Users", desc: "Great platforms are built with teams, not handed to them." },
  { name: "Innovation", icon: "Sparkles", desc: "Turn emerging capability into pragmatic, governed production value." },
];

// Section 5 — Focus Areas
export const focusAreas = [
  {
    title: "AI-DLC",
    icon: "Bot",
    problem: "Software lifecycles weren't designed for AI-augmented teams.",
    tech: ["GitHub Copilot", "MCP", "Azure AI Foundry"],
    impact: "A governed lifecycle where AI accelerates design, review and release without losing control.",
  },
  {
    title: "GitHub Copilot Enablement",
    icon: "Github",
    problem: "Teams adopt Copilot ad-hoc, with no standards or measurable ROI.",
    tech: ["Copilot", "Custom Instructions", "Policy"],
    impact: "Structured enablement, guardrails and metrics that turn Copilot into real productivity.",
  },
  {
    title: "AI Agents & Agentic Workflows",
    icon: "Workflow",
    problem: "Manual, repetitive engineering toil across the SDLC.",
    tech: ["MCP Servers", "LLM Orchestration", ".NET"],
    impact: "Agents that automate reviews, checks and operational workflows with humans in the loop.",
  },
  {
    title: "ReleaseGuard AI",
    icon: "ShieldCheck",
    problem: "Risky releases slip through inconsistent, manual governance gates.",
    tech: ["Azure AI", "GitHub Actions", "Policy-as-Code"],
    impact: "AI-assisted release governance that scores risk and enforces gates automatically.",
  },
  {
    title: "Platform Engineering",
    icon: "Layers",
    problem: "Every team reinvents CI/CD, environments and golden paths.",
    tech: ["Kubernetes", "Helm", "IDP"],
    impact: "Self-service golden paths that cut cognitive load and lead time.",
  },
  {
    title: "Cloud Native Platforms",
    icon: "Cloud",
    problem: "Monoliths that can't scale, deploy or fail independently.",
    tech: ["Azure", "AWS", "Microservices"],
    impact: "Resilient, elastic, independently deployable services.",
  },
  {
    title: "Kubernetes",
    icon: "Boxes",
    problem: "Container sprawl without consistent, safe operations.",
    tech: ["K8s", "Helm", "GitOps"],
    impact: "30% faster deployments and reliable, repeatable rollouts.",
  },
  {
    title: "Developer Productivity",
    icon: "Gauge",
    problem: "Friction and toil slow down otherwise strong teams.",
    tech: ["DX Metrics", "Automation", "Tooling"],
    impact: "Measurable flow: shorter lead time, higher deploy frequency.",
  },
];

// Section 6 — Featured Projects
export const projects = [
  {
    slug: "releaseguard-ai",
    name: "ReleaseGuard AI",
    tagline: "AI-assisted release governance",
    challenge:
      "Enterprise release gates were manual, inconsistent and slow — risky changes reached production while low-risk ones waited on approvals.",
    solution:
      "An AI governance layer that analyses diffs, change history and test signals to score release risk, then enforces policy-as-code gates in CI/CD with a human-in-the-loop override.",
    impact: [
      { metric: "↓ Risk", label: "consistent, explainable release decisions" },
      { metric: "Faster", label: "low-risk changes auto-approved" },
      { metric: "Audit", label: "every gate decision traceable" },
    ],
    stack: ["Azure AI", "GitHub Actions", "Policy-as-Code", ".NET", "Kubernetes"],
    accent: "#ec4899",
    diagram: "release",
  },
  {
    slug: "ai-dlc-copilot-governance",
    name: "AI-DLC Copilot Governance Agent",
    tagline: "Governed GitHub Copilot at scale",
    challenge:
      "Copilot adoption was ungoverned — no standards for prompts, security review or measuring impact across teams.",
    solution:
      "An agentic governance layer built on MCP that enforces org standards, reviews AI-generated changes against policy, and surfaces adoption & quality metrics to leadership.",
    impact: [
      { metric: "Standards", label: "consistent Copilot usage org-wide" },
      { metric: "Visibility", label: "adoption & quality metrics" },
      { metric: "Safe", label: "policy-checked AI contributions" },
    ],
    stack: ["GitHub Copilot", "MCP Servers", "Azure AI Foundry", "TypeScript"],
    accent: "#8b5cf6",
    diagram: "agent",
  },
  {
    slug: "workflowwise-ai",
    name: "Engineering WorkflowWise AI",
    tagline: "Intelligent SDLC automation",
    challenge:
      "Engineering workflows were full of manual toil — triage, reviews, status chasing and repetitive operational steps.",
    solution:
      "A set of AI agents that observe the SDLC and automate triage, review assistance and operational runbooks, integrating with existing DevOps tooling via MCP.",
    impact: [
      { metric: "↓ Toil", label: "automated repetitive workflows" },
      { metric: "Flow", label: "shorter lead time" },
      { metric: "Focus", label: "engineers on high-value work" },
    ],
    stack: ["AI Agents", "MCP", "GitHub Actions", ".NET", "React"],
    accent: "#22d3ee",
    diagram: "workflow",
  },
  {
    slug: "cloud-native-modernization",
    name: "Cloud Native Modernization Framework",
    tagline: "Monolith → microservices, safely",
    challenge:
      "A large healthcare platform monolith was expensive to run, hard to scale and slow to release.",
    solution:
      "A modernization framework — domain-driven decomposition, containerisation and a Kubernetes platform with golden-path CI/CD — applied incrementally with strangler-fig migration.",
    impact: [
      { metric: "40%", label: "memory reduction" },
      { metric: "30%", label: "faster deployments" },
      { metric: "20+", label: "apps hosted on the platform" },
    ],
    stack: ["Kubernetes", "Helm", "Azure", "AWS", "Microservices", "DDD"],
    accent: "#3b82f6",
    diagram: "cloud",
  },
];

// Section 8 — What I Work With (ecosystem)
export const ecosystem = [
  { role: "Engineering Leadership", icon: "Crown" },
  { role: "Developers", icon: "Code2" },
  { role: "QA", icon: "TestTube2" },
  { role: "Security", icon: "ShieldCheck" },
  { role: "Product Owners", icon: "ClipboardList" },
  { role: "Release Managers", icon: "Rocket" },
  { role: "Architects", icon: "DraftingCompass" },
  { role: "Platform Teams", icon: "Server" },
  { role: "Business Stakeholders", icon: "Briefcase" },
];

// Section 9 — Skills
export const skills = [
  { group: "Cloud", color: "#3b82f6", items: ["Azure", "AWS"] },
  { group: "Architecture", color: "#8b5cf6", items: ["Microservices", "DDD", "Event-Driven Architecture"] },
  { group: "Backend", color: "#10b981", items: [".NET", "C#", "API Design"] },
  { group: "Frontend", color: "#22d3ee", items: ["React", "TypeScript"] },
  { group: "DevOps", color: "#f59e0b", items: ["GitHub Actions", "Jenkins", "Helm", "Kubernetes"] },
  { group: "AI", color: "#ec4899", items: ["GitHub Copilot", "Azure AI Foundry", "AI Agents", "MCP Servers"] },
];

// Section 10 — Timeline
export const timeline = [
  {
    period: "Early Career",
    role: "Software Developer",
    desc: "Built features across the stack, learned to ship reliable software and the craft of clean code.",
  },
  {
    period: "Growth",
    role: "Senior Software Engineer",
    desc: "Owned services end-to-end, mentored engineers, and drove quality and DevOps practices.",
  },
  {
    period: "Scale",
    role: "Software Architect",
    desc: "Led microservices modernization of a healthcare platform — 40% memory reduction, 30% faster deployments on Kubernetes.",
  },
  {
    period: "Now",
    role: "Principal Software Engineer",
    desc: "Drive platform engineering and the AI-Driven Development Lifecycle — governed Copilot, agentic workflows, release governance.",
  },
];

// Section 12 — Engineering Operating System
export const operatingSystem = [
  { layer: "Vision", icon: "Compass", desc: "AI-native engineering as a competitive advantage.", color: "#8b5cf6" },
  { layer: "Architecture", icon: "DraftingCompass", desc: "Cloud-native, event-driven, domain-aligned.", color: "#3b82f6" },
  { layer: "Platform", icon: "Layers", desc: "Golden paths, self-service, paved roads.", color: "#22d3ee" },
  { layer: "AI Agents", icon: "Bot", desc: "Agentic automation across the SDLC.", color: "#ec4899" },
  { layer: "Developer Productivity", icon: "Gauge", desc: "Flow, low toil, fast feedback.", color: "#10b981" },
  { layer: "Business Outcomes", icon: "TrendingUp", desc: "Faster, safer delivery of value.", color: "#f59e0b" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Articles", href: "#thought-leadership" },
  { label: "Contact", href: "#contact" },
];
