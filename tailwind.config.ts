import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        brand: {
          primary: "#1a1a1a",
          accent: "#c9a96e",
          soft: "#f5f0eb",
        },
        success: "#16a34a",
        error: "#dc2626",
        warning: "#f59e0b",
      },
      fontFamily: {
        body: ["var(--font-body)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "DM Serif Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-right": "slideRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 1.5s infinite",
        confetti: "confetti 0.8s ease-out forwards",
        "bounce-in": "bounceIn 0.4s cubic-bezier(0.68, -0.15, 0.265, 1.35)",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        confetti: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.2) rotate(180deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "0" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
