import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants + transitions.
 * Keep motion subtle and consistent across sections.
 * All entrance animations pair with `whileInView` + `viewport`.
 */

export const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeExpo } },
};

/** Parent that staggers children. Pair with `fadeUp` on each child. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Item for staggered lists. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeExpo } },
};
