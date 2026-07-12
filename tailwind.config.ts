import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * ─────────────────────────────────────────────────────────────
 *  DESIGN SYSTEM — Deepak T Portfolio
 *  Inspired by: Vercel, Linear, Stripe, GitHub, Azure
 *  Dark-mode-first. Semantic tokens map to CSS variables in
 *  globals.css so light/dark themes swap cleanly via next-themes.
 * ─────────────────────────────────────────────────────────────
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Semantic tokens (driven by CSS vars -> theme-aware)
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-2": "hsl(var(--surface-2) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        "fg-muted": "hsl(var(--fg-muted) / <alpha-value>)",
        // Brand accents
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          soft: "hsl(var(--brand-soft) / <alpha-value>)",
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#8b5cf6",
          blue: "#3b82f6",
          emerald: "#10b981",
          amber: "#f59e0b",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid display sizes via clamp()
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
        display: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        headline: ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--border)), 0 8px 40px -12px hsl(var(--brand) / 0.35)",
        "glow-lg": "0 0 60px -15px hsl(var(--brand) / 0.5)",
        card: "0 1px 0 0 hsl(var(--border)) inset, 0 20px 50px -20px rgb(0 0 0 / 0.5)",
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(to bottom, transparent, hsl(var(--bg)))",
        "brand-gradient": "linear-gradient(120deg, #22d3ee 0%, #3b82f6 40%, #8b5cf6 100%)",
        "radial-glow": "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), hsl(var(--brand)/0.12), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "border-flow": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-line": {
          "0%": { strokeDashoffset: "40", opacity: "0.2" },
          "50%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "0.2" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2s infinite",
        "border-flow": "border-flow 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-line": "pulse-line 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [typography],
};

export default config;
