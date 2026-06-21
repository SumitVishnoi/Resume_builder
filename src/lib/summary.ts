export const EXPERIENCE_OPTIONS = [
  { value: "Fresher", label: "Fresher", desc: "0–1 years, academic projects" },
  { value: "Mid-Level", label: "Mid-Level", desc: "2–5 years, hands-on experience" },
  { value: "Senior-Level", label: "Senior-Level", desc: "6+ years, leadership & strategy" },
];

export const MAX_CHARS = 600;

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function qualityMeta(text: string): { pct: number; label: string; color: string } {
  const w = wordCount(text);
  if (w === 0) return { pct: 0, label: "", color: "" };
  if (w < 15) return { pct: 20, label: "Too short", color: "#EF4444" };
  if (w < 30) return { pct: 55, label: "Getting there", color: "#F59E0B" };
  if (w < 50) return { pct: 80, label: "Good", color: "#7C3AED" };
  return { pct: 100, label: "Strong", color: "#10B981" };
}