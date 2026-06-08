"use client";

import { Sparkles, PenLine } from "lucide-react";

interface AIToggleProps {
  mode: "manual" | "ai";
  onChange: (mode: "manual" | "ai") => void;
  size?: "sm" | "md";
}

export default function AIToggle({ mode, onChange, size = "md" }: AIToggleProps) {
  const isSmall = size === "sm";

  return (
    <div className={`inline-flex items-center bg-line-soft border border-line rounded-xl p-1 gap-0.5`}>
      <button
        onClick={() => onChange("manual")}
        className={`flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-200 
          ${isSmall ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}
          ${mode === "manual"
            ? "bg-white text-ink shadow-card border border-line"
            : "text-ink-tertiary hover:text-ink-secondary"
          }`}
      >
        <PenLine className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Manual
      </button>
      <button
        onClick={() => onChange("ai")}
        className={`flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-200 
          ${isSmall ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}
          ${mode === "ai"
            ? "bg-primary text-white shadow-btn-primary"
            : "text-ink-tertiary hover:text-ink-secondary"
          }`}
      >
        <Sparkles className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
        AI Write
      </button>
    </div>
  );
}