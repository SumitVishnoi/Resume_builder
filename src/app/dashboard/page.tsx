"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Loader2,
  AlertCircle,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { calcATS } from "@/lib/ats";
import { Resume } from "@/frontend/types/resume";
import ATSModal from "@/components/dashboard/ATSModal";
import ResumeCard from "@/components/dashboard/ResumeCard";
import DeleteModal from "@/components/dashboard/DeleteModal";
import StatsStrip from "@/components/dashboard/StatsStrip";
import EmptyState from "@/components/dashboard/EmptyState";
import { useDashboard } from "../hooks/useDashboard";


// ─── Types ──────────────────────────────────────────────────────────────────

// interface Resume {
//   _id: string;
//   title: string;
//   summary: string;
//   personalInfo: {
//     fullname?: string;
//     email?: string;
//     mobile?: string;
//     location?: string;
//     githubUrl?: string;
//     linkedIn?: string;
//     portfolio?: string;
//   };
//   education: unknown[];
//   workExperience: unknown[];
//   projects: unknown[];
//   skills: string[];
//   certification: string[];
//   createdAt: string;
//   updatedAt: string;
// }



// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null);
  const [atsTarget, setAtsTarget] = useState<Resume | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const {handleCreate, handleDelete, handleDownload, fetchResumes, deleting, resumes, downloadingId, creating, fetchError, setFetchError, loading, setLoading}= useDashboard()


  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ─── logout user ────────────────────────────────────────────────────────

const handleLogout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.success) {
      showToast(data.message, "ok");
      router.push("/auth/login");
    } else {
      showToast(data.message, "err");
    }
  } catch {
    showToast("Could not reach the server", "err");
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
      <Navbar signOut={handleLogout}/>

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

          <StatsStrip resumes={resumes} avgATS={avgATS} highScore={highScore} readyCount={readyCount} />

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
          <EmptyState handleCreate={handleCreate} creating={creating}  />
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