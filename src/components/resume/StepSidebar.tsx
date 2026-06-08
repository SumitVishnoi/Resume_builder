"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Wrench, GraduationCap, FolderGit2, Briefcase, FileText, Award, Eye, Check, Zap } from "lucide-react";

const steps = [
  { label: "Personal Info", href: "/resume/create/personal-info", icon: User },
  { label: "Skills", href: "/resume/create/skills", icon: Wrench },
  { label: "Education", href: "/resume/create/education", icon: GraduationCap },
  { label: "Projects", href: "/resume/create/projects", icon: FolderGit2 },
  { label: "Work Experience", href: "/resume/create/work-experience", icon: Briefcase, optional: true },
  { label: "Summary", href: "/resume/create/summary", icon: FileText },
  { label: "Certifications", href: "/resume/create/certifications", icon: Award, optional: true },
  { label: "Preview", href: "/resume/create/preview", icon: Eye },
];

export default function StepSidebar() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((s) => s.href === pathname);
  const progress = Math.round((Math.max(currentIndex, 0) / (steps.length - 1)) * 100);

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-line flex flex-col sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-line shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-btn-primary group-hover:shadow-lg transition-all">
            <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold text-ink tracking-tight">ResumeAI</span>
        </Link>
      </div>

      {/* Resume name */}
      <div className="px-5 py-4 border-b border-line shrink-0">
        <div className="text-[11px] font-semibold text-ink-tertiary uppercase tracking-[0.08em] mb-1">Editing</div>
        <div className="text-sm font-semibold text-ink truncate">Untitled Resume</div>
      </div>

      {/* Steps */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {steps.map((step, index) => {
          const isActive = pathname === step.href;
          const isDone = index < currentIndex;
          const isUpcoming = index > currentIndex;
          const Icon = step.icon;

          return (
            <Link key={step.href} href={step.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group
                ${isActive ? "bg-primary text-white shadow-btn-primary" : ""}
                ${isDone ? "text-ink-secondary hover:bg-line-soft hover:text-ink" : ""}
                ${isUpcoming ? "text-ink-tertiary hover:bg-line-soft hover:text-ink-secondary" : ""}
              `}
            >
              {/* Icon / Check circle */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all
                ${isActive ? "bg-white/20" : ""}
                ${isDone ? "bg-ok/10" : ""}
                ${isUpcoming ? "bg-line" : ""}
              `}>
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-ok" strokeWidth={2.5} />
                ) : (
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : ""}`} />
                )}
              </div>

              <span className="flex-1 font-medium">{step.label}</span>

              {step.optional && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md transition-all
                  ${isActive ? "bg-white/20 text-white" : "bg-line text-ink-tertiary"}`}>
                  opt
                </span>
              )}

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Progress */}
      <div className="px-5 py-4 border-t border-line shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-ink-secondary">Progress</span>
          <span className="text-xs font-bold text-ink">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px] text-ink-tertiary mt-2">
          {currentIndex + 1} of {steps.length} sections
        </p>
      </div>
    </aside>
  );
}