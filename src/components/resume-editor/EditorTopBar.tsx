"use client";

import {
  ArrowLeft,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
} from "lucide-react";
import { Resume, SaveState } from "@/frontend/types/resume";

interface Props {
  resume: Resume;
  saveState: SaveState;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
  onPreview: () => void;
  onTitleChange: (v: string) => void;
}

export default function EditorTopBar({
  resume,
  saveState,
  onBack,
  onSave,
  onDelete,
  onPreview,
  onTitleChange,
}: Props) {
  return (
    <header className="h-14 bg-white border-b border-[#E4E4E7] flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-30 flex-shrink-0">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111318] transition-colors flex-shrink-0"
      >
        <ArrowLeft size={15} />
        <span className="hidden sm:inline">Dashboard</span>
      </button>

      <div className="h-4 w-px bg-[#E4E4E7] flex-shrink-0" />

      {/* Title input */}
      <input
        value={resume.title || ""}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled Resume"
        className="flex-1 min-w-0 text-sm font-semibold text-[#111318] bg-transparent border-none outline-none placeholder:text-[#C4C4CC] placeholder:font-normal truncate"
      />

      {/* Save state — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs min-w-[100px] justify-end flex-shrink-0">
        {saveState === "saving" && (
          <>
            <Loader2 size={13} className="animate-spin text-[#7C3AED]" />
            <span className="text-[#9CA3AF]">Saving…</span>
          </>
        )}
        {saveState === "saved" && (
          <>
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span className="text-emerald-600">Saved</span>
          </>
        )}
        {saveState === "error" && (
          <>
            <AlertCircle size={13} className="text-red-400" />
            <span className="text-red-500">Error</span>
          </>
        )}
        {saveState === "idle" && (
          <span className="text-[#C4C4CC] text-[11px]">Auto-save on</span>
        )}
      </div>

      {/* Preview button — mobile/tablet only */}
      <button
        onClick={onPreview}
        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7C3AED] bg-[#F4F3FF] border border-[#DDD6FE] rounded-xl hover:bg-[#EDE9FE] transition-colors flex-shrink-0"
      >
        <Eye size={13} />
        <span className="hidden xs:inline">Preview</span>
      </button>

      {/* Save */}
      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg hover:bg-[#6D28D9] transition-colors flex-shrink-0"
      >
        <Save size={13} />
        <span className="hidden xs:inline">Save</span>
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="p-2 rounded-lg text-[#C4C4CC] hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </header>
  );
}