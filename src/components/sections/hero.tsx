"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { hero } from "@/content/site";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg mask-fade-b opacity-60" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[30%] h-[280px] w-[280px] rounded-full bg-accent-violet/20 blur-[110px]" />
      </div>

      <div className="container-page">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={staggerItem} className="flex justify-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              AI-Native Engineering Leader
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mt-6 text-display-lg text-balance"
          >
            Building the Future of{" "}
            <span className="text-gradient">AI-Native Engineering</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg shadow-glow-lg transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-brand/50 hover:bg-surface-2"
            >
              <BookOpen className="h-4 w-4" />
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>

        {/* Animated technology badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <p className="mb-5 text-center text-xs uppercase tracking-widest text-fg-muted">
            Technologies I build with
          </p>
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = [...hero.badges, ...hero.badges];
  return (
    <div className="relative mask-fade-x">
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {items.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-fg-muted backdrop-blur-sm"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: badgeColor(i) }}
            />
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function badgeColor(i: number) {
  const c = ["#22d3ee", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];
  return c[i % c.length];
}
