import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-sm font-bold text-white">
            D
          </span>
          <div className="text-sm">
            <p className="font-semibold">{site.name}</p>
            <p className="text-fg-muted">{site.brand}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-brand/50 hover:text-fg">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={site.socials.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-brand/50 hover:text-fg">
            <Github className="h-4 w-4" />
          </a>
          <a href={site.socials.email} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-brand/50 hover:text-fg">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="container-page mt-8 text-center text-xs text-fg-muted">
        © {year} {site.name}.
      </div>
    </footer>
  );
}
