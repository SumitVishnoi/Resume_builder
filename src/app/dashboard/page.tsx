"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Loader2,
  AlertCircle,
  MoreHorizontal,
  Trash2,
  Edit3,
  Clock,
  LogOut,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Resume {
  _id: string;
  title: string;
  summary: string;
  personalInfo: {
    fullName?: string;
    email?: string;
    location?: string;
  };
  education: unknown[];
  workExperience: unknown[];
  projects: unknown[];
  skills: string[];
  certification: unknown[];
  createdAt: string;
  updatedAt: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function completeness(r: Resume): number {
  let score = 0;
  if (r.personalInfo?.fullName) score += 20;
  if (r.summary) score += 15;
  if (r.workExperience?.length) score += 25;
  if (r.education?.length) score += 15;
  if (r.skills?.length) score += 15;
  if (r.projects?.length) score += 10;
  return score;
}

// ─── Mini Resume Card Preview ───────────────────────────────────────────────

function MiniPreview({ resume }: { resume: Resume }) {
  const name = resume.personalInfo?.fullName;
  const hasExp = resume.workExperience?.length > 0;
  const hasEdu = resume.education?.length > 0;
  const hasSkills = resume.skills?.filter(Boolean).length > 0;

  return (
    <div
      className="w-full h-full p-4 text-left overflow-hidden select-none"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Doc header */}
      <div className="border-b border-[#E4E4E7] pb-2 mb-2">
        <div className="text-[11px] font-bold text-[#111318] truncate leading-tight">
          {name || (
            <span className="italic text-[#C4C4CC] font-normal">Unnamed</span>
          )}
        </div>
        {resume.personalInfo?.email && (
          <div className="text-[8px] text-[#9CA3AF] truncate mt-0.5">
            {resume.personalInfo.email}
          </div>
        )}
      </div>

      {/* Sections as skeleton lines */}
      <div className="space-y-2">
        {hasExp && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Experience
            </div>
            <div className="space-y-0.5">
              <div className="h-[4px] bg-[#E4E4E7] rounded-full w-4/5" />
              <div className="h-[4px] bg-[#F4F4F5] rounded-full w-3/5" />
            </div>
          </div>
        )}
        {hasEdu && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Education
            </div>
            <div className="h-[4px] bg-[#E4E4E7] rounded-full w-3/4" />
          </div>
        )}
        {hasSkills && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Skills
            </div>
            <div className="flex flex-wrap gap-0.5">
              {resume.skills.filter(Boolean).slice(0, 4).map((s, i) => (
                <span
                  key={i}
                  className="text-[6px] px-1 py-0.5 bg-[#F4F3FF] text-[#7C3AED] rounded-full border border-[#DDD6FE]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {!hasExp && !hasEdu && !hasSkills && (
          <div className="space-y-1.5 mt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[4px] bg-[#F4F4F5] rounded-full"
                style={{ width: `${90 - i * 15}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Resume Card ────────────────────────────────────────────────────────────

function ResumeCard({
  resume,
  onOpen,
  onDelete,
}: {
  resume: Resume;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pct = completeness(resume);

  return (
    <div className="group relative bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden hover:border-[#7C3AED]/40 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)] transition-all duration-200">
      {/* Document preview area */}
      <button
        onClick={onOpen}
        className="block w-full h-44 bg-[#FAFAFA] border-b border-[#E4E4E7] relative overflow-hidden hover:bg-[#F4F3FF]/40 transition-colors"
      >
        <MiniPreview resume={resume} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#7C3AED]/0 group-hover:bg-[#7C3AED]/[0.03] transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-[#7C3AED] bg-white border border-[#DDD6FE] px-3 py-1.5 rounded-full shadow-sm">
            Open editor
          </span>
        </div>
      </button>

      {/* Card footer */}
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

          {/* Menu */}
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
                <div className="absolute right-0 top-8 bg-white border border-[#E4E4E7] rounded-xl shadow-lg py-1 w-36 z-20">
                  <button
                    onClick={() => { setMenuOpen(false); onOpen(); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F4F5] transition-colors"
                  >
                    <Edit3 size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(); }}
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

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">
              Complete
            </span>
            <span className="text-[10px] font-bold text-[#7C3AED]">{pct}%</span>
          </div>
          <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Modal ───────────────────────────────────────────────────────────

function DeleteModal({
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-[360px]">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
          <Trash2 size={18} className="text-red-500" />
        </div>
        <h3 className="text-base font-semibold text-[#111318] mb-1">
          Delete this resume?
        </h3>
        <p className="text-sm text-[#6B7280] mb-6">
          `{title || "Untitled resume"}`` will be permanently removed. This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-[#E4E4E7] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F4F4F5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2 transition-colors"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  // ── Toast helper ──────────────────────────────────────────────────────────

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch resumes ─────────────────────────────────────────────────────────

  const fetchResumes = useCallback (async () => {
    try {
      const res = await fetch("/api/resume", {method: "GET"});
      const data = await res.json();
      if (data.success) {
        setResumes(data.data.resumes ?? data.data.resume ?? []);
      } else {
        setFetchError(data.message || "Failed to load resumes");
      }
    } catch {
      setFetchError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
     fetchResumes()
  }, [fetchResumes])

  // ── Create resume ─────────────────────────────────────────────────────────

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/resume/create", { method: "POST" });
      const data = await res.json();
      const newResume = data.data?.resume;
      if (newResume?._id) {
        router.push(`/resume/${newResume._id}`);
      } else {
        showToast("Could not create resume", "err");
        setCreating(false);
      }
    } catch {
      showToast("Could not reach the server", "err");
      setCreating(false);
    }
  };

  // ── Delete resume ─────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/resume/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setResumes((prev) => prev.filter((r) => r._id !== deleteTarget._id));
        showToast("Resume deleted");
      } else {
        showToast(data.message || "Delete failed", "err");
      }
    } catch {
      showToast("Could not reach the server", "err");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ── Stats ─────────────────────────────────────────────────────────────────

  const complete = resumes.filter((r) => completeness(r) === 100).length;
  const drafts = resumes.length - complete;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-[#FAFAFA]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border transition-all ${
            toast.type === "ok"
              ? "bg-white text-[#111318] border-[#E4E4E7]"
              : "bg-red-50 text-red-600 border-red-100"
          }`}
        >
          {toast.type === "err" && <AlertCircle size={14} />}
          {toast.msg}
          <button
            onClick={() => setToast(null)}
            className="ml-1 text-[#9CA3AF] hover:text-[#6B7280]"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* ── Top nav ── */}
      <header className="bg-white border-b border-[#E4E4E7] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-semibold text-[#111318] text-sm tracking-tight">
              ResumeKit
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors">
              <Settings size={16} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors">
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* ── Hero row ── */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-2">
              Dashboard
            </p>
            <h1
              className="text-3xl font-bold text-[#111318] tracking-tight leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your resumes
            </h1>
            <p className="text-sm text-[#6B7280] mt-1.5">
              {loading
                ? "Loading…"
                : resumes.length === 0
                  ? "No resumes yet — create your first one."
                  : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""} · ${drafts} in progress`}
            </p>
          </div>

          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-60 transition-all shadow-sm shadow-[#7C3AED]/20 whitespace-nowrap"
          >
            {creating ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={15} />
            )}
            {creating ? "Creating…" : "New resume"}
          </button>
        </div>

        {/* ── Stats strip ── */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total", value: resumes.length },
              { label: "Complete", value: complete },
              { label: "In progress", value: drafts },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white border border-[#E4E4E7] rounded-2xl px-5 py-4"
              >
                <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-2xl font-bold text-[#111318] mt-1 tracking-tight">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={24} className="text-[#7C3AED] animate-spin" />
            <p className="text-sm text-[#9CA3AF]">Loading your resumes…</p>
          </div>
        )}

        {/* ── Error state ── */}
        {fetchError && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertCircle size={22} className="text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#111318]">{fetchError}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Check your connection and try again
              </p>
            </div>
            <button
              onClick={() => { setFetchError(null); setLoading(true); fetchResumes(); }}
              className="text-sm text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !fetchError && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-16 h-16 bg-[#F4F3FF] rounded-2xl flex items-center justify-center">
              <FileText size={28} className="text-[#7C3AED]" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-[#111318]">
                No resumes yet
              </p>
              <p className="text-sm text-[#9CA3AF] mt-1 max-w-xs">
                Create your first resume and start applying to jobs with
                confidence.
              </p>
            </div>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-60 transition-all"
            >
              {creating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Plus size={15} />
              )}
              Create my first resume
            </button>
          </div>
        )}

        {/* ── Resume grid ── */}
        {!loading && !fetchError && resumes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                All resumes
              </h2>
              <button className="text-xs text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 transition-colors">
                Sort by recent <ChevronRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Create new card */}
              <button
                onClick={handleCreate}
                disabled={creating}
                className="group h-full min-h-[260px] border-2 border-dashed border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#7C3AED] hover:bg-[#F4F3FF]/50 disabled:opacity-50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] group-hover:bg-[#EDE9FE] flex items-center justify-center transition-colors">
                  {creating ? (
                    <Loader2 size={18} className="text-[#7C3AED] animate-spin" />
                  ) : (
                    <Plus
                      size={18}
                      className="text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors"
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#6B7280] group-hover:text-[#7C3AED] transition-colors">
                    New resume
                  </p>
                  <p className="text-xs text-[#C4C4CC] mt-0.5">
                    Start from scratch
                  </p>
                </div>
              </button>

              {/* Resume cards */}
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onOpen={() => router.push(`/resume/${resume._id}`)}
                  onDelete={() => setDeleteTarget(resume)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}