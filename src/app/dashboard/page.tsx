"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { calcATS } from "@/lib/ats";
import { Resume } from "@/frontend/types/resume";
import ATSModal from "@/components/dashboard/ATSModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import StatsStrip from "@/components/dashboard/StatsStrip";
import EmptyState from "@/components/dashboard/EmptyState";
import { useDashboard } from "../hooks/useDashboard";
import Hero from "@/components/dashboard/Hero";
import Error from "@/components/dashboard/Error";
import Grid from "@/components/dashboard/Grid";
import { useAuth } from "../hooks/useAuth";
import ProtectedLayout from "../protected/layout";

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  // const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null);
  const [atsTarget, setAtsTarget] = useState<Resume | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const { handleLogout } = useAuth();
  const {
    handleCreate,
    handleDelete,
    handleDownload,
    fetchResumes,
    deleting,
    resumes,
    downloadingId,
    creating,
    fetchError,
    setFetchError,
    loading,
    setLoading,
    deleteTarget,
    setDeleteTarget,
  } = useDashboard();

  // ── Aggregate stats ───────────────────────────────────────────────────────

  const avgATS =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((s, r) => s + calcATS(r).total, 0) / resumes.length,
        )
      : 0;
  const highScore =
    resumes.length > 0 ? Math.max(...resumes.map((r) => calcATS(r).total)) : 0;
  const readyCount = resumes.filter((r) => calcATS(r).total >= 65).length;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <ProtectedLayout>
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
        <Navbar signOut={handleLogout} />

        <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          {/* ── Hero ── */}
          <Hero
            resumes={resumes}
            creating={creating}
            handleCreate={handleCreate}
            loading={loading}
            readyCount={readyCount}
          />

          {/* ── Stats strip ── */}
          {!loading && resumes.length > 0 && (
            <StatsStrip
              resumes={resumes}
              avgATS={avgATS}
              highScore={highScore}
              readyCount={readyCount}
            />
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
            <Error
              fetchError={fetchError}
              setFetchError={setFetchError}
              fetchResumes={fetchResumes}
              setLoading={setLoading}
            />
          )}

          {/* ── Empty ── */}
          {!loading && !fetchError && resumes.length === 0 && (
            <EmptyState handleCreate={handleCreate} creating={creating} />
          )}

          {/* ── Grid ── */}
          {!loading && !fetchError && resumes.length > 0 && (
            <Grid
              creating={creating}
              handleCreate={handleCreate}
              handleDownload={handleDownload}
              resumes={resumes}
              setDeleteTarget={setDeleteTarget}
              setAtsTarget={setAtsTarget}
              downloadingId={downloadingId}
            />
          )}
        </main>
      </div>
    </ProtectedLayout>
  );
}
