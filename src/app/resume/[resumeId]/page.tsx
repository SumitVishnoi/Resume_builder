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

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalInfo {
  fullname?: string;
  email?: string;
  mobile?: string;
  location?: string;
  linkedIn?: string;
  githubUrl?: string;
}

interface Education {
  tempId?: string;
  institute?: string;
  degree?: string;
  // field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

interface WorkExperience {
  tempId?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

interface Project {
  tempId?: string;
  title?: string;
  description?: string;
  techStack?: string;
  liveUrl?: string;
}

interface Certification {
  tempId?: string;
  name?: string;
  issuer?: string;
  year?: string;
}

interface Resume {
  _id: string;
  title: string;
  summary: string;
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: string[];
  certification: Certification[];
}

type Section =
  | "personal"
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "certifications";

type SaveState = "idle" | "saving" | "saved" | "error";

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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl text-[#111318] placeholder:text-[#C4C4CC] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl text-[#111318] placeholder:text-[#C4C4CC] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all resize-none"
    />
  );
}

function Card({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl p-4 space-y-3">
      <button
        onClick={onRemove}
        className="absolute top-3.5 right-3.5 p-1 rounded-lg text-[#C4C4CC] hover:text-red-400 hover:bg-red-50 transition-colors"
      >
        <X size={14} />
      </button>
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[#E4E4E7] rounded-xl text-sm text-[#9CA3AF] hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#F4F3FF] transition-all"
    >
      <Plus size={14} /> {label}
    </button>
  );
}

// ─── Resume Preview ───────────────────────────────────────────────────────────

function ResumePreview({ resume }: { resume: Resume }) {
  const p = resume.personalInfo || {};
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-10 font-serif text-[#111318] text-sm leading-relaxed max-w-[680px] mx-auto"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="mb-6 pb-5 border-b-2 border-[#111318]">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {p.fullname || (
            <span className="text-[#C4C4CC] italic font-normal">{p.fullname}</span>
          )}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280] mt-2">
          {p.email && <span>{p.email}</span>}
          {p.mobile && <span>{p.mobile}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedIn && <span className="text-[#7C3AED]">{p.linkedIn}</span>}
          {p.githubUrl && <span className="text-[#7C3AED]">{p.githubUrl}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Profile
          </h2>
          <p className="text-[13px] text-[#374151] leading-relaxed">
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience.map((w, tempId) => (
              <div key={w.tempId}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[13px]">
                      {w.position && <em className="text-[#C4C4CC]">{w.position}</em>}
                    </p>
                    <p className="text-[12px] text-[#6B7280]">
                      {w.company && <em className="text-[#C4C4CC]">{w.company}</em>}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] whitespace-nowrap">
                    {w.startDate} {w.startDate && "–"}{" "}
                    {w.current ? "Present" : w.endDate}
                  </p>
                </div>
                {w.description && (
                  <p className="mt-1.5 text-[12px] text-[#374151]">
                    {w.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((e) => (
              <div key={e.tempId} className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-[13px]">
                    {e.institute || (
                      <em className="text-[#C4C4CC]">institute</em>
                    )}
                  </p>
                  {/* <p className="text-[12px] text-[#6B7280]">
                    {[e.degree, e.field].filter(Boolean).join(", ")}
                  </p> */}
                  {e.gpa && (
                    <p className="text-[11px] text-[#9CA3AF]">GPA: {e.gpa}</p>
                  )}
                </div>
                <p className="text-[11px] text-[#9CA3AF] whitespace-nowrap">
                  {e.startDate} {e.startDate && "–"} {e.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {resume.projects.map((proj) => (
              <div key={proj.tempId}>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[13px]">
                    {proj.title || <em className="text-[#C4C4CC]">Project</em>}
                  </p>
                  {proj.liveUrl && (
                    <span className="text-[11px] text-[#7C3AED]">
                      {proj.liveUrl}
                    </span>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    {proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="text-[12px] text-[#374151] mt-1">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.filter(Boolean).length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.filter(Boolean).map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-[#F4F3FF] text-[#7C3AED] text-[11px] rounded-full border border-[#DDD6FE]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certification?.length > 0 && (
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {resume.certification.map((c) => (
              <div key={c.tempId} className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">{c.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">
                  {c.issuer} {c.year && `· ${c.year}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Full Name</Label>
                <Input
                type="text"
                  value={resume.personalInfo?.fullname || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, fullname: v } })
                  }
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={resume.personalInfo?.email || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, email: v } })
                  }
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={resume.personalInfo?.mobile || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, mobile: v } })
                  }
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={resume.personalInfo?.location || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, location: v } })
                  }
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label>linkedIn</Label>
                <Input
                  value={resume.personalInfo?.linkedIn || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, linkedIn: v } })
                  }
                  placeholder="linkedIn.com/in/jane"
                />
              </div>
              <div>
                <Label>website</Label>
                <Input
                  value={resume.personalInfo?.githubUrl || ""}
                  onChange={(v) =>
                    update({ personalInfo: { ...resume.personalInfo, githubUrl: v } })
                  }
                  placeholder="janesmith.dev"
                />
              </div>
            </div>
            <div>
              <Label>Resume Title</Label>
              <Input
                value={resume.title || ""}
                onChange={(v) => update({ title: v })}
                placeholder="e.g. Software Engineer — Google"
              />
            </div>
          </div>
        );

      case "summary":
        return (
          <div>
            <Label>Professional Summary</Label>
            <Textarea
              value={resume.summary || ""}
              onChange={(v) => update({ summary: v })}
              placeholder="A concise statement about your professional background, key skills, and career goals…"
              rows={7}
            />
            <p className="mt-2 text-[11px] text-[#9CA3AF]">
              Keep it to 2–4 sentences. Write in first person without `I`.
            </p>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-3">
            {resume.workExperience?.map((w, i) => {
              const open = expandedCards[w.tempId!] !== false;
              return (
                <Card key={w.tempId} onRemove={() => update({ workExperience: resume.workExperience.filter((_, j) => j !== i) })}>
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
                <Card key={e.tempId} onRemove={() => update({ education: resume.education.filter((_, j) => j !== i) })}>
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
                      {/* <div>
                        <Label>Field</Label>
                        <Input value={e.field || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], field: v }; update({ education: arr }); }} placeholder="Computer Science" />
                      </div> */}
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