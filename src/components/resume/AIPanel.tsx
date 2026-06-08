"use client";

import { Sparkles, Loader2, Wand2 } from "lucide-react";

interface AIPanelProps {
  title?: string;
  description?: string;
  loading?: boolean;
  onGenerate: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function AIPanel({ title = "Generate with AI", description, loading, onGenerate, disabled, children }: AIPanelProps) {
  return (
    <div className="relative rounded-2xl border border-primary/20 bg-primary/3 p-5 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <Wand2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-bold text-ink">{title}</div>
            {description && <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">{description}</p>}
          </div>
        </div>

        {children && <div className="mb-4 space-y-3">{children}</div>}

        <button
          onClick={onGenerate}
          disabled={loading || disabled}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 rounded-xl shadow-btn-primary hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
}