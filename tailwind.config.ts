import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563EB", hover: "#1D4ED8", light: "#EFF6FF", mid: "#BFDBFE" },
        brand: { bg: "#F8FAFC", card: "#FFFFFF", dark: "#0F172A" },
        ink: { DEFAULT: "#0F172A", secondary: "#64748B", tertiary: "#94A3B8", placeholder: "#CBD5E1" },
        line: { DEFAULT: "#E2E8F0", soft: "#F1F5F9" },
        ok: "#10B981",
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.06)",
        "card-md": "0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)",
        "card-lg": "0 10px 25px -5px rgba(15,23,42,0.08), 0 8px 10px -6px rgba(15,23,42,0.04)",
        "card-xl": "0 20px 40px -8px rgba(15,23,42,0.12), 0 8px 16px -4px rgba(15,23,42,0.06)",
        "input-focus": "0 0 0 3px rgba(37,99,235,0.12)",
        "btn-primary": "0 1px 2px rgba(29,78,216,0.3), 0 4px 8px rgba(37,99,235,0.2)",
      },
      backgroundImage: {
        "mesh-blue": "radial-gradient(at 40% 20%, rgba(37,99,235,0.15) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(29,78,216,0.1) 0, transparent 50%), radial-gradient(at 0% 50%, rgba(59,130,246,0.08) 0, transparent 50%)",
        "mesh-dark": "radial-gradient(at 30% 20%, rgba(37,99,235,0.4) 0, transparent 40%), radial-gradient(at 70% 70%, rgba(29,78,216,0.3) 0, transparent 40%), radial-gradient(at 90% 10%, rgba(96,165,250,0.2) 0, transparent 30%)",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "slide-in": "slideIn 0.3s ease forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { opacity: "0", transform: "translateX(-8px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        display: ["var(--font-cabinet-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;