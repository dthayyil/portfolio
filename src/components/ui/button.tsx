import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg px-5 py-2.5 hover:opacity-90 shadow-glow-lg",
  secondary:
    "border border-border bg-surface/60 px-5 py-2.5 text-fg hover:border-brand/50 hover:bg-surface-2",
  ghost: "px-3 py-2 text-fg-muted hover:text-fg",
};

export function ButtonLink({
  children,
  variant = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
