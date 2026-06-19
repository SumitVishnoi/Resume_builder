import { timeAgo } from "@/app/utils/timeAgo";
import { Clock, Download, Edit3, Loader2, MoreHorizontal, Target, Trash2 } from "lucide-react";
import MiniPreview from "./MiniPreview";
import { atsLabel, calcATS } from "@/lib/ats";
import { useState } from "react";
import { Resume } from "@/frontend/types/resume";

export default function ResumeCard({
  resume,
  onOpen,
  onDelete,
  onATS,
  onDownload,
  downloading,
}: {
  resume: Resume;
  onOpen: () => void;
  onDelete: () => void;
  onATS: () => void;
  onDownload: () => void;
  downloading: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { total } = calcATS(resume);
  const { color, bg, label } = atsLabel(total);

  return (
    <div className="group relative bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden hover:border-[#7C3AED]/40 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)] transition-all duration-200">
      {/* ATS badge — top-left of preview */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onATS();
          }}
          title="View ATS Score"
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm transition-transform hover:scale-105"
          style={{ color, backgroundColor: bg, borderColor: color + "44" }}
        >
          <Target size={9} />
          {total}
        </button>
      </div>

      {/* Preview */}
      <button
        onClick={onOpen}
        className="block w-full h-44 bg-[#FAFAFA] border-b border-[#E4E4E7] relative overflow-hidden hover:bg-[#F4F3FF]/40 transition-colors"
      >
        <MiniPreview resume={resume} />
        <div className="absolute inset-0 bg-[#7C3AED]/0 group-hover:bg-[#7C3AED]/[0.03] transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-[#7C3AED] bg-white border border-[#DDD6FE] px-3 py-1.5 rounded-full shadow-sm">
            Open editor
          </span>
        </div>
      </button>

      {/* Footer */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[#111318] truncate leading-snug">
              {resume.title || (
                <span className="text-[#C4C4CC] font-normal italic">
                  Untitled resume
                </span>
              )}
            </h3>
            <p className="flex items-center gap-1 text-[11px] text-[#9CA3AF] mt-0.5">
              <Clock size={10} />
              {timeAgo(resume.updatedAt)}
            </p>
          </div>

          {/* Context menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
              className="p-1.5 rounded-lg text-[#C4C4CC] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors"
            >
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 bg-white border border-[#E4E4E7] rounded-xl shadow-lg py-1 w-44 z-20">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpen();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F4F5] transition-colors"
                  >
                    <Edit3 size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onATS();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F4F5] transition-colors"
                  >
                    <Target size={13} />
                    ATS score
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDownload();
                    }}
                    disabled={downloading}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F4F5] transition-colors disabled:opacity-50"
                  >
                    {downloading ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Download size={13} />
                    )}
                    {downloading ? "Downloading…" : "Download PDF"}
                  </button>
                  <div className="my-1 h-px bg-[#F4F4F5]" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ATS bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider flex items-center gap-1">
              <Target size={9} />
              ATS score
            </span>
            <span
              className="text-[10px] font-bold"
              style={{ color }}
            >
              {total}/100 · {label}
            </span>
          </div>
          <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${total}%`, backgroundColor: color }}
            />
          </div>
        </div>

        {/* Quick action row */}
        <div className="mt-3 flex items-center gap-1.5">
          <button
            onClick={onATS}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-[#7C3AED] bg-[#F4F3FF] rounded-lg hover:bg-[#EDE9FE] transition-colors"
          >
            <Target size={11} />
            ATS
          </button>
          <button
            onClick={onDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-[#6B7280] bg-[#F4F4F5] rounded-lg hover:bg-[#E9E9EB] transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <Download size={11} />
            )}
            {downloading ? "…" : "PDF"}
          </button>
          <button
            onClick={onOpen}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-[#6B7280] bg-[#F4F4F5] rounded-lg hover:bg-[#E9E9EB] transition-colors"
          >
            <Edit3 size={11} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}