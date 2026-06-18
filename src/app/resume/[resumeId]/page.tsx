"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Certification, Education, Project, Resume, SaveState, Section, WorkExperience } from "@/frontend/types/resume";
import Label from "@/components/resume-editor/ui/Label";
import Input from "@/components/resume-editor/ui/Input";
import Textarea from "@/components/resume-editor/ui/Textarea";
import Card from "@/components/resume-editor/ui/Card";
import AddButton from "@/components/resume-editor/ui/AddButton";
import { ResumePreview } from "@/components/resume-editor/ResumePreview";
import PersonalSection from "@/components/resume-editor/sections/PersonalSection";
import SummarySection from "@/components/resume-editor/sections/SummarySection";

// ─── Types ────────────────────────────────────────────────────────────────────



// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const emptyEducation = (): Education => ({
  tempId: uid(),
  institute: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
});

const emptyExperience = (): WorkExperience => ({
  tempId: uid(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
});

const emptyProject = (): Project => ({
  tempId: uid(),
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
});

const emptyCert = (): Certification => ({
  tempId: uid(),
  name: "",
  issuer: "",
  year: "",
});

// ─── Sub-components ───────────────────────────────────────────────────────────



// ─── Resume Preview ───────────────────────────────────────────────────────────



// ─── Main Page ────────────────────────────────────────────────────────────────

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
          <div className="space-y-3">
            {resume.workExperience?.map((w, i) => {
              const open = expandedCards[w.tempId!] !== false;
              return (
                <Card key={i} onRemove={() => update({ workExperience: resume.workExperience.filter((_, j) => j !== i) })}>
                  <div
                    className="flex items-center justify-between cursor-pointer pr-6"
                    onClick={() => setExpandedCards((p) => ({ ...p, [w.tempId!]: !open }))}
                  >
                    <p className="text-sm font-semibold text-[#111318]">
                      {w.position || w.company || <span className="text-[#C4C4CC] font-normal italic">New experience</span>}
                    </p>
                    {open ? <ChevronUp size={14} className="text-[#9CA3AF]" /> : <ChevronDown size={14} className="text-[#9CA3AF]" />}
                  </div>
                  {open && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Role</Label>
                          <Input value={w.position || ""} onChange={(v) => { const arr = [...resume.workExperience]; arr[i] = { ...arr[i], position: v }; update({ workExperience: arr }); }} placeholder="Senior Engineer" />
                        </div>
                        <div>
                          <Label>Company</Label>
                          <Input value={w.company || ""} onChange={(v) => { const arr = [...resume.workExperience]; arr[i] = { ...arr[i], company: v }; update({ workExperience: arr }); }} placeholder="Acme Corp" />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input value={w.startDate || ""} onChange={(v) => { const arr = [...resume.workExperience]; arr[i] = { ...arr[i], startDate: v }; update({ workExperience: arr }); }} placeholder="Jan 2022" />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input value={w.endDate || ""} onChange={(v) => { const arr = [...resume.workExperience]; arr[i] = { ...arr[i], endDate: v }; update({ workExperience: arr }); }} placeholder="Present" />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={w.description || ""} onChange={(v) => { const arr = [...resume.workExperience]; arr[i] = { ...arr[i], description: v }; update({ workExperience: arr }); }} placeholder="Key responsibilities and achievements…" rows={3} />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
            <AddButton onClick={() => update({ workExperience: [...(resume.workExperience || []), emptyExperience()] })} label="Add experience" />
          </div>
        );

      case "education":
        return (
          <div className="space-y-3">
            {resume.education?.map((e, i) => {
              const open = expandedCards[e.tempId!] !== false;
              return (
                <Card key={i} onRemove={() => update({ education: resume.education.filter((_, j) => j !== i) })}>
                  <div className="flex items-center justify-between cursor-pointer pr-6" onClick={() => setExpandedCards((p) => ({ ...p, [e.tempId!]: !open }))}>
                    <p className="text-sm font-semibold text-[#111318]">
                      {e.institute || <span className="text-[#C4C4CC] font-normal italic">New education</span>}
                    </p>
                    {open ? <ChevronUp size={14} className="text-[#9CA3AF]" /> : <ChevronDown size={14} className="text-[#9CA3AF]" />}
                  </div>
                  {open && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="col-span-2">
                        <Label>institution</Label>
                        <Input value={e.institute || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], institute: v }; update({ education: arr }); }} placeholder="MIT" />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input value={e.degree || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], degree: v }; update({ education: arr }); }} placeholder="B.Sc." />
                      </div>
                      <div>
                        <Label>Field</Label>
                        <Input value={e.field || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], field: v }; update({ education: arr }); }} placeholder="Computer Science" />
                      </div>
                      <div>
                        <Label>Start Year</Label>
                        <Input value={e.startDate || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], startDate: v }; update({ education: arr }); }} placeholder="2018" />
                      </div>
                      <div>
                        <Label>End Year</Label>
                        <Input value={e.endDate || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], endDate: v }; update({ education: arr }); }} placeholder="2022" />
                      </div>
                      <div>
                        <Label>GPA</Label>
                        <Input value={e.gpa || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], gpa: v }; update({ education: arr }); }} placeholder="3.9" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
            <AddButton onClick={() => update({ education: [...(resume.education || []), emptyEducation()] })} label="Add education" />
          </div>
        );

      case "projects":
        return (
          <div className="space-y-3">
            {resume.projects?.map((proj, i) => {
              const open = expandedCards[proj.tempId!] !== false;
              return (
                <Card key={proj.tempId} onRemove={() => update({ projects: resume.projects.filter((_, j) => j !== i) })}>
                  <div className="flex items-center justify-between cursor-pointer pr-6" onClick={() => setExpandedCards((p) => ({ ...p, [proj.tempId!]: !open }))}>
                    <p className="text-sm font-semibold text-[#111318]">
                      {proj.title || <span className="text-[#C4C4CC] font-normal italic">New project</span>}
                    </p>
                    {open ? <ChevronUp size={14} className="text-[#9CA3AF]" /> : <ChevronDown size={14} className="text-[#9CA3AF]" />}
                  </div>
                  {open && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Project Name</Label>
                          <Input value={proj.title || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], title: v }; update({ projects: arr }); }} placeholder="My App" />
                        </div>
                        <div>
                          <Label>live Url</Label>
                          <Input value={proj.liveUrl || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], liveUrl: v }; update({ projects: arr }); }} placeholder="github.com/…" />
                        </div>
                        <div className="col-span-2">
                          <Label>Tech Stack</Label>
                          <Input value={proj.techStack || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], techStack: v }; update({ projects: arr }); }} placeholder="React, Node.js, MongoDB" />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={proj.description || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], description: v }; update({ projects: arr }); }} placeholder="What it does, your position, impact…" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
            <AddButton onClick={() => update({ projects: [...(resume.projects || []), emptyProject()] })} label="Add project" />
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <div>
              <Label>Add Skill</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
                      e.preventDefault();
                      update({ skills: [...(resume.skills || []), skillInput.trim()] });
                      setSkillInput("");
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl text-[#111318] placeholder:text-[#C4C4CC] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"
                />
                <button
                  onClick={() => {
                    if (skillInput.trim()) {
                      update({ skills: [...(resume.skills || []), skillInput.trim()] });
                      setSkillInput("");
                    }
                  }}
                  className="px-4 py-2.5 bg-[#7C3AED] text-white text-sm font-medium rounded-xl hover:bg-[#6D28D9] transition-colors"
                >
                  Add
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-[#9CA3AF]">Press Enter or comma to add quickly</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.skills?.filter(Boolean).map((skill, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F3FF] text-[#7C3AED] text-sm rounded-full border border-[#DDD6FE]">
                  {skill}
                  <button onClick={() => update({ skills: resume.skills.filter((_, j) => j !== i) })} className="hover:text-[#6D28D9] ml-0.5">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {!resume.skills?.filter(Boolean).length && (
                <p className="text-sm text-[#C4C4CC] italic">No skills added yet</p>
              )}
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-3">
            {resume.certification?.map((c, i) => (
              <Card key={c.tempId} onRemove={() => update({ certification: resume.certification.filter((_, j) => j !== i) })}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>Certification Name</Label>
                    <Input value={c.name || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], name: v }; update({ certification: arr }); }} placeholder="AWS Solutions Architect" />
                  </div>
                  <div>
                    <Label>Issuer</Label>
                    <Input value={c.issuer || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], issuer: v }; update({ certification: arr }); }} placeholder="Amazon" />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input value={c.year || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], year: v }; update({ certification: arr }); }} placeholder="2024" />
                  </div>
                </div>
              </Card>
            ))}
            <AddButton onClick={() => update({ certification: [...(resume.certification || []), emptyCert()] })} label="Add certification" />
          </div>
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-[360px] mx-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-[#111318] mb-1">Delete this resume?</h3>
            <p className="text-sm text-[#6B7280] mb-6">
              `{resume.title || "Untitled Resume"}` will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 border border-[#E4E4E7] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F4F4F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}