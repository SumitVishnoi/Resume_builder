"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText, Plus, Download, Eye, Trash2, Clock, TrendingUp,
  Sparkles, Zap, MoreHorizontal, Search, Bell, ChevronRight, BarChart3
} from "lucide-react";

const resumes = [
  { id: 1, title: "Software Engineer", company: "For Tech Roles", updatedAt: "2 days ago", atsScore: 88, status: "complete", color: "bg-primary/10 text-primary border-primary/20" },
  { id: 2, title: "Full Stack Developer", company: "Startup Applications", updatedAt: "1 week ago", atsScore: 74, status: "draft", color: "bg-warn/10 text-warn border-warn/20" },
  { id: 3, title: "Backend Engineer", company: "FAANG Applications", updatedAt: "3 weeks ago", atsScore: 91, status: "complete", color: "bg-ok/10 text-ok border-ok/20" },
];

const stats = [
  { label: "Total Resumes", value: "3", sub: "+1 this month", icon: FileText, color: "text-primary", bg: "bg-primary/8", border: "border-primary/15" },
  { label: "Avg ATS Score", value: "84%", sub: "Above average", icon: BarChart3, color: "text-ok", bg: "bg-ok/8", border: "border-ok/15" },
  { label: "AI Generations", value: "24", sub: "Across all resumes", icon: Sparkles, color: "text-warn", bg: "bg-warn/8", border: "border-warn/15" },
];

export default function DashboardPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-btn-primary">
              <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
            </div>
            <span className="text-[16px] font-bold text-ink tracking-tight">ResumeAI</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-line-soft border border-line rounded-xl px-3.5 py-2">
            <Search className="w-3.5 h-3.5 text-ink-tertiary" />
            <input placeholder="Search resumes..." className="bg-transparent text-sm text-ink placeholder:text-ink-tertiary w-44 ml-2" />
            <kbd className="text-[10px] text-ink-tertiary bg-white border border-line rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl border border-line bg-white flex items-center justify-center text-ink-secondary hover:bg-line-soft transition-all shadow-card">
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 ml-1 pl-3 border-l border-line">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-bold shadow-btn-primary">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-ink leading-none">Alex</div>
                <div className="text-xs text-ink-tertiary mt-0.5">Free plan</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p className="text-sm text-ink-secondary mb-1">Good morning, Alex 👋</p>
            <h1 className="text-2xl font-bold text-ink tracking-tight">My Resumes</h1>
          </div>
          <Link href="/resume/create/personal-info"
            className="btn-primary">
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          {stats.map((stat) => (
            <div key={stat.label} className={`card-base p-5 border ${stat.border} hover:shadow-card-md transition-all duration-200`}>
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ChevronRight className="w-4 h-4 text-ink-tertiary" />
              </div>
              <div className="text-2xl font-bold text-ink tracking-tight">{stat.value}</div>
              <div className="text-sm text-ink-secondary mt-0.5">{stat.label}</div>
              <div className="text-xs text-ink-tertiary mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Resume List ── */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-ink-secondary uppercase tracking-[0.07em]">All Resumes</h2>
            <span className="text-xs text-ink-tertiary">{resumes.length} total</span>
          </div>

          <div className="space-y-2.5">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                onMouseEnter={() => setHoveredId(resume.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="card-base p-5 flex items-center gap-4 hover:shadow-card-md hover:border-primary/20 transition-all duration-200 group cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${resume.color}`}>
                  <FileText className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-ink text-[15px] truncate">{resume.title}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      resume.status === "complete"
                        ? "bg-ok/10 text-ok"
                        : "bg-warn/10 text-warn"
                    }`}>
                      {resume.status === "complete" ? "Complete" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-ink-tertiary truncate">{resume.company}</span>
                    <span className="text-ink-placeholder">·</span>
                    <span className="flex items-center gap-1 text-xs text-ink-tertiary shrink-0">
                      <Clock className="w-3 h-3" />
                      {resume.updatedAt}
                    </span>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="hidden md:flex items-center gap-3 shrink-0">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-ink-tertiary">ATS Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-line rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${resume.atsScore >= 85 ? "bg-ok" : resume.atsScore >= 70 ? "bg-warn" : "bg-danger"}`}
                          style={{ width: `${resume.atsScore}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${resume.atsScore >= 85 ? "text-ok" : resume.atsScore >= 70 ? "text-warn" : "text-danger"}`}>
                        {resume.atsScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className={`flex items-center gap-1 transition-all duration-200 ${hoveredId === resume.id ? "opacity-100" : "opacity-0"}`}>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-primary hover:bg-primary/8 transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-ok hover:bg-ok/8 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-danger hover:bg-danger/8 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-ink hover:bg-line-soft transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Create new card */}
            <Link href="/resume/create/personal-info"
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-line hover:border-primary/40 hover:bg-primary/3 transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-line-soft border border-line flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                <Plus className="w-5 h-5 text-ink-tertiary group-hover:text-primary transition-all" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink-secondary group-hover:text-ink transition-all">Create new resume</div>
                <div className="text-xs text-ink-tertiary mt-0.5">Start from scratch with AI assistance</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Upgrade banner ── */}
        <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative overflow-hidden rounded-2xl bg-ink p-6 flex items-center justify-between">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-warn" />
                <span className="text-xs font-bold text-warn uppercase tracking-wider">Pro Feature</span>
              </div>
              <h3 className="text-base font-bold text-white">Unlock unlimited AI generations</h3>
              <p className="text-sm text-white/50 mt-0.5">Upgrade to Pro for unlimited resumes and AI features</p>
            </div>
            <button className="relative z-10 shrink-0 flex items-center gap-2 bg-white text-ink text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-line-soft transition-all shadow-card-lg">
              Upgrade <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}