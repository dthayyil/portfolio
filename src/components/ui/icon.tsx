import {
  Heart, KeyRound, Gem, Minimize2, GraduationCap, Users, Sparkles,
  Bot, Github, Workflow, ShieldCheck, Layers, Cloud, Boxes, Gauge,
  Crown, Code2, TestTube2, ClipboardList, Rocket, DraftingCompass,
  Server, Briefcase, Compass, TrendingUp,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Heart, KeyRound, Gem, Minimize2, GraduationCap, Users, Sparkles,
  Bot, Github, Workflow, ShieldCheck, Layers, Cloud, Boxes, Gauge,
  Crown, Code2, TestTube2, ClipboardList, Rocket, DraftingCompass,
  Server, Briefcase, Compass, TrendingUp,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden />;
}
