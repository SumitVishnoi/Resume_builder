"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award
} from "lucide-react";
import { Resume, SaveState, Section } from "@/frontend/types/resume";
import PersonalSection from "./sections/PersonalSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import CertificationsSection from "./sections/CertificationsSection";
import { ResumePreview } from "./ResumePreview";
import DeleteModal from "./DeleteModal";






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
  const [skillInput, setSkillInput] = useState("");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────

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

  // ── Auto-save (debounced 1.2s) ─────────────────────────────────────────────

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

  // ── Delete ─────────────────────────────────────────────────────────────────

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

  // ── Section config ─────────────────────────────────────────────────────────

  const sections: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "personal", label: "Personal", icon: User },
    { id: "summary", label: "Summary", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "certifications", label: "Certifications", icon: Award },
  ];

  // ── Loading / Error ────────────────────────────────────────────────────────

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
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
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

  // ── Editor panels ──────────────────────────────────────────────────────────

  const renderEditor = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalSection update={update} resume={resume}/>
        );

      case "summary":
        return (
          <SummarySection update={update} resume={resume} />
        );

      case "experience":
        return (
          <ExperienceSection update={update} resume={resume}/>
        );

      case "education":
        return (
          <EducationSection update={update} resume={resume}/>
        );

      case "projects":
        return (
          <ProjectsSection resume={resume} update={update}/>
        );

      case "skills":
        return (
          <SkillsSection resume={resume} update={update}/>
        );

      case "certifications":
        return (
          <CertificationsSection resume={resume} update={update}/>
        );
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-[#E4E4E7] flex items-center px-6 gap-4 sticky top-0 z-30">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111318] transition-colors"
        >
          <ArrowLeft size={15} />
          <span>Dashboard</span>
        </button>

        <div className="h-4 w-px bg-[#E4E4E7]" />

        <input
          value={resume.title || ""}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Untitled Resume"
          className="flex-1 text-sm font-semibold text-[#111318] bg-transparent border-none outline-none placeholder:text-[#C4C4CC] placeholder:font-normal"
        />

        {/* Save indicator */}
        <div className="flex items-center gap-1.5 text-xs min-w-[110px] justify-end">
          {saveState === "saving" && (<><Loader2 size={13} className="animate-spin text-[#7C3AED]" /><span className="text-[#9CA3AF]">Saving…</span></>)}
          {saveState === "saved" && (<><CheckCircle2 size={13} className="text-emerald-500" /><span className="text-emerald-600">Saved</span></>)}
          {saveState === "error" && (<><AlertCircle size={13} className="text-red-400" /><span className="text-red-500">Save failed</span></>)}
          {saveState === "idle" && <span className="text-[#C4C4CC] text-[11px]">Auto-save on</span>}
        </div>

        <button
          onClick={() => save(resume)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg hover:bg-[#6D28D9] transition-colors"
        >
          <Save size={13} />
          Save
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-2 rounded-lg text-[#C4C4CC] hover:text-red-400 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Editor */}
        <div className="w-[420px] flex-shrink-0 flex flex-col border-r border-[#E4E4E7] bg-white overflow-hidden">
          <div className="flex gap-0.5 px-3 pt-3 pb-2 border-b border-[#E4E4E7] flex-wrap">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === id
                    ? "bg-[#F4F3FF] text-[#7C3AED]"
                    : "text-[#6B7280] hover:bg-[#F4F4F5] hover:text-[#111318]"
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">{renderEditor()}</div>
        </div>

        {/* Right — Preview */}
        <div className="flex-1 overflow-y-auto bg-[#F4F3FF]/30 px-10 py-10">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest">Live Preview</p>
            <span className="text-[10px] text-[#C4C4CC]">Updates as you type</span>
          </div>
          <ResumePreview resume={resume} />
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal resume={resume} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} deleting={deleting}/>
    </div>
  );
}