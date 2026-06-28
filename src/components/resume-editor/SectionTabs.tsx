"use client";

import { Section } from "@/frontend/types/resume";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

const SECTIONS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Personal", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "certifications", label: "Certs", icon: Award },
];

interface Props {
  active: Section;
  onChange: (s: Section) => void;
}

export default function SectionTabs({ active, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center border-b border-[#E4E4E7] bg-white">
      {/* Left arrow — only visible when scrollable */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex flex-shrink-0 p-2 text-[#C4C4CC] hover:text-[#6B7280] transition-colors"
        aria-label="Scroll tabs left"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Scrollable tab row */}
      <div
        ref={scrollRef}
        className="flex gap-0.5 px-3 pt-2.5 pb-2 overflow-x-auto scrollbar-none flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              active === id
                ? "bg-[#F4F3FF] text-[#7C3AED]"
                : "text-[#6B7280] hover:bg-[#F4F4F5] hover:text-[#111318]"
            }`}
          >
            <Icon size={12} />
            {/* Hide label on very small screens, show icon only */}
            <span className="hidden xs:inline sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex flex-shrink-0 p-2 text-[#C4C4CC] hover:text-[#6B7280] transition-colors"
        aria-label="Scroll tabs right"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}