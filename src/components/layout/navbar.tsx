"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle smooth scrolling when navigating to hash anchors, especially from external or dynamic routes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      if (!id) return;

      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        } else if (++attempts > 30) {
          clearInterval(interval);
        }
      }, 40);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  const resolveNavItem = (item: { label: string; href: string }) => {
    const isArticles = item.label === "Articles" || item.href === "#thought-leadership";
    const isArticlesActive = isArticles && pathname.startsWith("/blog");

    // When on home page, use anchor hash for smooth scrolling to sections
    // When not on home page, route to home with hash (or directly to /blog/ for articles)
    let href: string;
    if (isHome) {
      href = item.href;
    } else if (isArticles) {
      href = "/blog/";
    } else {
      href = `/${item.href}`;
    }

    return {
      href,
      isActive: isArticlesActive,
      isHomeAnchor: isHome,
    };
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-glow" : "border border-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-sm font-bold text-white">
              D
            </span>
            <span className="text-sm font-semibold tracking-tight">
              {site.name}
              <span className="ml-1 hidden text-fg-muted sm:inline">/ Principal Engineer</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const { href, isActive, isHomeAnchor } = resolveNavItem(item);

              if (isHomeAnchor) {
                return (
                  <a
                    key={item.href}
                    href={href}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg",
                      isActive && "bg-surface-2 text-fg font-medium",
                    )}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg",
                    isActive && "bg-surface-2 text-fg font-medium",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="container-page md:hidden"
          >
            <div className="glass mt-2 grid gap-1 rounded-2xl p-3">
              {nav.map((item) => {
                const { href, isActive, isHomeAnchor } = resolveNavItem(item);

                if (isHomeAnchor) {
                  return (
                    <a
                      key={item.href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-2.5 text-sm text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors",
                        isActive && "bg-surface-2 text-fg font-medium",
                      )}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-sm text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors",
                      isActive && "bg-surface-2 text-fg font-medium",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
