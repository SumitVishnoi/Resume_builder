"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { Resume, SaveState, Section } from "@/frontend/types/resume";

import PersonalSection from "@/components/resume-editor/sections/PersonalSection";
import SummarySection from "@/components/resume-editor/sections/SummarySection";
import ExperienceSection from "@/components/resume-editor/sections/ExperienceSection";
import EducationSection from "@/components/resume-editor/sections/EducationSection";
import ProjectsSection from "@/components/resume-editor/sections/ProjectsSection";
import SkillsSection from "@/components/resume-editor/sections/SkillsSection";
import CertificationsSection from "@/components/resume-editor/sections/CertificationsSection";
import { ResumePreview } from "@/components/resume-editor/ResumePreview";
import DeleteModal from "@/components/resume-editor/DeleteModal";
import EditorTopBar from "./EditorTopBar";
import SectionTabs from "./SectionTabs";
import MobilePreviewModal from "./MobilePreviewModal";

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.resumeId as string;

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!resumeId) return;
    (async () => {
      try {
        const res = await fetch(`/api/resume/${resumeId}`);
        const data = await res.json();
        if (data.success) {
          setResume(data.data.resume);
        } else {
          setError(data.message || "Failed to load resume");
        }
      } catch {
        setError("Could not reach the server");
      } finally {
        setLoading(false);
      }
    })();
  }, [resumeId]);

  // ── Auto-save ─────────────────────────────────────────────────────────────

  const save = useCallback(
    async (updated: Resume) => {
      setSaveState("saving");
      try {
        const res = await fetch(`/api/resume/${resumeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        const data = await res.json();
        setSaveState(data.success ? "saved" : "error");
        setTimeout(() => setSaveState("idle"), 2500);
      } catch {
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 2500);
      }
    },
    [resumeId]
  );

  const scheduleAutoSave = useCallback(
    (updated: Resume) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => save(updated), 1200);
    },
    [save]
  );

  const update = useCallback(
    (patch: Partial<Resume>) => {
      setResume((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...patch };
        scheduleAutoSave(updated);
        return updated;
      });
    },
    [scheduleAutoSave]
  );

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/resume/${resumeId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message);
        setShowDeleteModal(false);
      }
    } catch {
      setError("Delete failed");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  // ── Section renderer ──────────────────────────────────────────────────────

  const renderSection = (section: Section) => {
    if (!resume) return null;
    switch (section) {
      case "personal":      return <PersonalSection update={update} resume={resume} />;
      case "summary":       return <SummarySection update={update} resume={resume} />;
      case "experience":    return <ExperienceSection update={update} resume={resume} />;
      case "education":     return <EducationSection update={update} resume={resume} />;
      case "projects":      return <ProjectsSection resume={resume} update={update} />;
      case "skills":        return <SkillsSection resume={resume} update={update} />;
      case "certifications":return <CertificationsSection resume={resume} update={update} />;
    }
  };

  // ── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-[#7C3AED] animate-spin" />
          <p className="text-sm text-[#9CA3AF]">Loading resume…</p>
        </div>
      </div>
    );
  }

  if (error && !resume) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
        <div className="text-center">
          <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
          <p className="text-[#111318] font-medium">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 text-sm text-[#7C3AED] hover:underline"
          >
            ← Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex flex-col"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Top bar ── */}
      <EditorTopBar
        resume={resume}
        saveState={saveState}
        onBack={() => router.push("/dashboard")}
        onSave={() => save(resume)}
        onDelete={() => setShowDeleteModal(true)}
        onPreview={() => setShowMobilePreview(true)}
        onTitleChange={(v) => update({ title: v })}
      />

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Editor panel ── */}
        {/*
          Mobile  (< lg): full width, no right panel
          Tablet  (md):   full width, preview via modal
          Desktop (lg+):  fixed 420px, right panel shows preview
        */}
        <div className="w-full lg:w-[440px] xl:w-[460px] flex-shrink-0 flex flex-col border-r border-[#E4E4E7] bg-white overflow-hidden">
          {/* Scrollable section tabs */}
          <SectionTabs active={activeSection} onChange={setActiveSection} />

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {renderSection(activeSection)}
          </div>

          {/* Mobile bottom bar — preview button pinned at bottom */}
          <div className="lg:hidden flex-shrink-0 border-t border-[#E4E4E7] bg-white px-4 py-3">
            <button
              onClick={() => setShowMobilePreview(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#F4F3FF] text-[#7C3AED] text-sm font-semibold rounded-xl border border-[#DDD6FE] hover:bg-[#EDE9FE] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z"/>
                <circle cx="7" cy="7" r="1.5"/>
              </svg>
              Preview resume
            </button>
          </div>
        </div>

        {/* ── Right: Live preview — desktop only ── */}
        <div className="hidden lg:flex flex-1 flex-col overflow-y-auto bg-[#F4F3FF]/30 px-6 xl:px-10 py-8">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
              Live Preview
            </p>
            <span className="text-[10px] text-[#C4C4CC]">Updates as you type</span>
          </div>
          <ResumePreview resume={resume} />
        </div>
      </div>

      {/* ── Mobile preview modal ── */}
      {showMobilePreview && (
        <MobilePreviewModal
          resume={resume}
          onClose={() => setShowMobilePreview(false)}
        />
      )}

      {/* ── Delete modal ── */}
      <DeleteModal
        resume={resume}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}