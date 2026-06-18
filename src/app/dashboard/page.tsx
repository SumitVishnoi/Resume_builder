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
  ChevronRight,
  X,
  Download,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Navbar from "@/components/Navbar";


// ─── Types ──────────────────────────────────────────────────────────────────

interface Resume {
  _id: string;
  title: string;
  summary: string;
  personalInfo: {
    fullname?: string;
    email?: string;
    mobile?: string;
    location?: string;
    githubUrl?: string;
    linkedIn?: string;
    portfolio?: string;
  };
  education: unknown[];
  workExperience: unknown[];
  projects: unknown[];
  skills: string[];
  certification: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── ATS Score Engine ────────────────────────────────────────────────────────

interface ATSBreakdown {
  total: number;
  items: { label: string; points: number; earned: number; met: boolean }[];
}

function calcATS(r: Resume): ATSBreakdown {
  const items = [
    {
      label: "Full name",
      points: 10,
      earned: r.personalInfo?.fullname ? 10 : 0,
      met: !!r.personalInfo?.fullname,
    },
    {
      label: "Email address",
      points: 10,
      earned: r.personalInfo?.email ? 10 : 0,
      met: !!r.personalInfo?.email,
    },
    {
      label: "Phone number",
      points: 5,
      earned: r.personalInfo?.mobile ? 5 : 0,
      met: !!r.personalInfo?.mobile,
    },
    {
      label: "Location",
      points: 5,
      earned: r.personalInfo?.location ? 5 : 0,
      met: !!r.personalInfo?.location,
    },
    {
      label: "LinkedIn profile",
      points: 5,
      earned: r.personalInfo?.linkedIn ? 5 : 0,
      met: !!r.personalInfo?.linkedIn,
    },
    {
      label: "Professional summary",
      points: 15,
      earned: r.summary && r.summary.trim().length > 50 ? 15 : r.summary ? 8 : 0,
      met: !!(r.summary && r.summary.trim().length > 50),
    },
    {
      label: "Work experience",
      points: 20,
      earned: (r.workExperience?.length ?? 0) >= 2
        ? 20
        : (r.workExperience?.length ?? 0) === 1
          ? 12
          : 0,
      met: (r.workExperience?.length ?? 0) >= 2,
    },
    {
      label: "Education",
      points: 10,
      earned: r.education?.length ? 10 : 0,
      met: !!(r.education?.length),
    },
    {
      label: "Skills (5+)",
      points: 10,
      earned: (r.skills?.filter(Boolean).length ?? 0) >= 5
        ? 10
        : (r.skills?.filter(Boolean).length ?? 0) > 0
          ? 5
          : 0,
      met: (r.skills?.filter(Boolean).length ?? 0) >= 5,
    },
    {
      label: "Projects",
      points: 10,
      earned: r.projects?.length ? 10 : 0,
      met: !!(r.projects?.length),
    },
  ];

  const total = items.reduce((sum, i) => sum + i.earned, 0);
  return { total, items };
}

function atsLabel(score: number): {
  label: string;
  color: string;
  bg: string;
  ring: string;
} {
  if (score >= 85)
    return {
      label: "Excellent",
      color: "#10B981",
      bg: "#ECFDF5",
      ring: "#6EE7B7",
    };
  if (score >= 65)
    return {
      label: "Good",
      color: "#7C3AED",
      bg: "#F4F3FF",
      ring: "#C4B5FD",
    };
  if (score >= 40)
    return {
      label: "Fair",
      color: "#F59E0B",
      bg: "#FFFBEB",
      ring: "#FCD34D",
    };
  return { label: "Weak", color: "#EF4444", bg: "#FEF2F2", ring: "#FCA5A5" };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── ATS Score Modal ─────────────────────────────────────────────────────────

function ATSModal({
  resume,
  onClose,
}: {
  resume: Resume;
  onClose: () => void;
}) {
  const { total, items } = calcATS(resume);
  const { label, color, bg } = atsLabel(total);
  const maxPoints = items.reduce((s, i) => s + i.points, 0);
  const circumference = 2 * Math.PI * 36;
  const dash = (total / maxPoints) * circumference;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F4F4F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F4F3FF] rounded-lg flex items-center justify-center">
              <Target size={15} className="text-[#7C3AED]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111318]">
                ATS Score
              </h2>
              <p className="text-[11px] text-[#9CA3AF]">
                {resume.title || "Untitled resume"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C4C4CC] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Score ring */}
        <div className="flex flex-col items-center py-7 border-b border-[#F4F4F5]">
          <div className="relative w-24 h-24">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              className="-rotate-90"
            >
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke="#F4F4F5"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color }}
              >
                {total}
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-medium">
                / {maxPoints}
              </span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                color,
                backgroundColor: bg,
                borderColor: color + "33",
              }}
            >
              {label}
            </span>
            <p className="text-xs text-[#9CA3AF] mt-2 max-w-[240px]">
              {total >= 85
                ? "Your resume is highly optimised for ATS parsers."
                : total >= 65
                  ? "Good shape — fill the missing fields to push higher."
                  : "Complete the checklist below to improve your score."}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="px-6 py-4 space-y-2 max-h-64 overflow-y-auto">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">
            Checklist
          </p>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2.5">
                {item.met ? (
                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle size={14} className="text-[#E4E4E7] flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${item.met ? "text-[#374151]" : "text-[#9CA3AF]"}`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold tabular-nums ${
                  item.met ? "text-emerald-600" : "text-[#C4C4CC]"
                }`}
              >
                {item.earned}/{item.points}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Resume Preview ──────────────────────────────────────────────────────

function MiniPreview({ resume }: { resume: Resume }) {
  const name = resume.personalInfo?.fullname;
  const hasExp = (resume.workExperience?.length ?? 0) > 0;
  const hasEdu = (resume.education?.length ?? 0) > 0;
  const hasSkills = resume.skills?.filter(Boolean).length > 0;

  return (
    <div
      className="w-full h-full p-4 text-left overflow-hidden select-none"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <div className="border-b border-[#E4E4E7] pb-2 mb-2">
        <div className="text-[11px] font-bold text-[#111318] truncate leading-tight">
          {name || (
            <span className="italic text-[#C4C4CC] font-normal">{resume.personalInfo.fullname}</span>
          )}
        </div>
        {resume.personalInfo?.email && (
          <div className="text-[8px] text-[#9CA3AF] truncate mt-0.5">
            {resume.personalInfo.email}
          </div>
        )}
      </div>
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
              {resume.skills
                .filter(Boolean)
                .slice(0, 4)
                .map((s, i) => (
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

// ─── Resume Card ─────────────────────────────────────────────────────────────

function ResumeCard({
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

// ─── Delete Modal ─────────────────────────────────────────────────────────────

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
          `{title || "Untitled resume"}` will be permanently removed. This
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

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [atsTarget, setAtsTarget] = useState<Resume | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch("/api/resume", { method: "GET" });
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
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // ── Create ────────────────────────────────────────────────────────────────

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

  // ── Delete ────────────────────────────────────────────────────────────────

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

  // ── Download PDF ──────────────────────────────────────────────────────────

  const handleDownload = async (resume: Resume) => {
    setDownloadingId(resume._id);
    try {
      const res = await fetch(`/api/resume/${resume._id}/download`, {
        method: "GET",
      });

      if (!res.ok) {
        showToast("Download failed — try again", "err");
        return;
      }

      const contentType = res.headers.get("content-type") || "";

      // If API returns raw PDF bytes
      if (contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${resume.title || "resume"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Download started");
        return;
      }

      // If API returns JSON with a signed URL
      const data = await res.json();
      if (data.success && data.data?.url) {
        const a = document.createElement("a");
        a.href = data.data.url;
        a.download = `${resume.title || "resume"}.pdf`;
        a.target = "_blank";
        a.click();
        showToast("Download started");
        return;
      }

      showToast(data.message || "Download failed", "err");
    } catch {
      showToast("Could not reach the server", "err");
    } finally {
      setDownloadingId(null);
    }
  };

  // ── Aggregate stats ───────────────────────────────────────────────────────

  const avgATS =
    resumes.length > 0
      ? Math.round(resumes.reduce((s, r) => s + calcATS(r).total, 0) / resumes.length)
      : 0;
  const highScore = resumes.length > 0
    ? Math.max(...resumes.map((r) => calcATS(r).total))
    : 0;
  const readyCount = resumes.filter((r) => calcATS(r).total >= 65).length;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-[#FAFAFA]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border transition-all animate-in fade-in slide-in-from-top-2 ${
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

      {/* ATS Modal */}
      {atsTarget && (
        <ATSModal resume={atsTarget} onClose={() => setAtsTarget(null)} />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* ── Navbar ── */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* ── Hero ── */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
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
                  : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""} · ${readyCount} ATS-ready`}
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Total resumes",
                value: resumes.length,
                icon: FileText,
                iconColor: "#7C3AED",
                iconBg: "#F4F3FF",
              },
              {
                label: "Avg ATS score",
                value: `${avgATS}`,
                icon: Target,
                iconColor: atsLabel(avgATS).color,
                iconBg: atsLabel(avgATS).bg,
              },
              {
                label: "Best score",
                value: `${highScore}`,
                icon: TrendingUp,
                iconColor: atsLabel(highScore).color,
                iconBg: atsLabel(highScore).bg,
              },
              {
                label: "ATS ready",
                value: readyCount,
                icon: CheckCircle2,
                iconColor: "#10B981",
                iconBg: "#ECFDF5",
              },
            ].map(({ label, value, icon: Icon, iconColor, iconBg }) => (
              <div
                key={label}
                className="bg-white border border-[#E4E4E7] rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon size={15} style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-xl font-bold text-[#111318] tracking-tight">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={24} className="text-[#7C3AED] animate-spin" />
            <p className="text-sm text-[#9CA3AF]">Loading your resumes…</p>
          </div>
        )}

        {/* ── Error ── */}
        {fetchError && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertCircle size={22} className="text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#111318]">
                {fetchError}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Check your connection and try again
              </p>
            </div>
            <button
              onClick={() => {
                setFetchError(null);
                setLoading(true);
                fetchResumes();
              }}
              className="text-sm text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Empty ── */}
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
                Create your first resume. We&apos;ll score it for ATS compatibility
                as you build it.
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

        {/* ── Grid ── */}
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
              {/* New resume card */}
              <button
                onClick={handleCreate}
                disabled={creating}
                className="group min-h-[300px] border-2 border-dashed border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#7C3AED] hover:bg-[#F4F3FF]/50 disabled:opacity-50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] group-hover:bg-[#EDE9FE] flex items-center justify-center transition-colors">
                  {creating ? (
                    <Loader2
                      size={18}
                      className="text-[#7C3AED] animate-spin"
                    />
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
                  onATS={() => setAtsTarget(resume)}
                  onDownload={() => handleDownload(resume)}
                  downloading={downloadingId === resume._id}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}