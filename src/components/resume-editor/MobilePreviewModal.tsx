"use client";

import { X } from "lucide-react";
import { Resume } from "@/frontend/types/resume";
import { ResumePreview } from "./ResumePreview";

interface Props {
  resume: Resume;
  onClose: () => void;
}

export default function MobilePreviewModal({ resume, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#F4F3FF]/95 backdrop-blur-sm flex flex-col"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Modal top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E4E4E7] flex-shrink-0">
        <div>
          <p className="text-sm font-semibold text-[#111318]">Live Preview</p>
          <p className="text-[10px] text-[#C4C4CC]">Updates as you type</p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B7280] border border-[#E4E4E7] rounded-xl hover:bg-[#F4F4F5] transition-colors"
        >
          <X size={13} />
          Close
        </button>
      </div>

      {/* Scrollable preview */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
}