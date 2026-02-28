export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.35,
  drawer: 0.4,
};

export const ease = {
  smooth: [0.4, 0, 0.2, 1] as const,
  spring: [0.68, -0.15, 0.265, 1.35] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const slideRight = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

export const slideLeft = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export const slideUp = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export function getReducedMotionVariants(variants: Record<string, object>) {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    ...Object.fromEntries(
      Object.entries(variants).map(([key]) => [
        key,
        key === "hidden" ? { opacity: 0 } : { opacity: 1 },
      ])
    ),
  };
}
