"use client";

import { useState } from "react";
import { Sparkles, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Resume } from "@/frontend/types/resume";
import AIPanel from "@/components/summary/AIPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  resume: Resume;
  update: (patch: Partial<Resume>) => void;
};

type AIState = "idle" | "open" | "loading" | "error";

const EXPERIENCE_OPTIONS = [
  { value: "Fresher", label: "Fresher", desc: "0–1 years" },
  { value: "Mid-Level", label: "Mid-Level", desc: "2–5 years" },
  { value: "Senior-Level", label: "Senior-Level", desc: "6+ years" },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

function FieldLabel({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
        {children}
      </label>
      {hint && <span className="text-[10px] text-[#C4C4CC]">{hint}</span>}
    </div>
  );
}

function AIInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                 text-[#111318] placeholder:text-[#C4C4CC]
                 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                 transition-all"
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SkillsSection({ resume, update }: Props) {
  const [skillInput, setSkillInput] = useState("");

  // AI state
  const [aiState, setAIState] = useState<AIState>("idle");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [aiError, setAIError] = useState("");
  const [justGenerated, setJustGenerated] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const skills = resume.skills?.filter(Boolean) ?? [];
  const isPanelOpen =
    aiState === "open" || aiState === "loading" || aiState === "error";
  const isLoading = aiState === "loading";

  // ── Manual add ───────────────────────────────────────────────────────────

  const addSkill = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) return; // no duplicates
    update({ skills: [...skills, trimmed] });
  };

  const removeSkill = (index: number) =>
    update({ skills: skills.filter((_, j) => j !== index) });

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput);
      setSkillInput("");
    }
  };

  // ── AI generate ──────────────────────────────────────────────────────────
const handleGenerate = async () => {
    if (!jobTitle.trim() || !experience) {
      setAIError("Both fields are required.");
      setAIState("error");
      return;
    }

    setAIState("loading");
    setAIError("");

    try {
      const res = await fetch("/api/ai/generate-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, experience }),
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.data?.skills)) {
        const incoming: string[] = data.data.skills.filter(
          (s: string) => typeof s === "string" && s.trim()
        );

        // Merge with existing, deduplicate
        const merged = Array.from(new Set([...skills, ...incoming]));
        update({ skills: merged });

        setGeneratedCount(incoming.length);
        setJustGenerated(true);
        setAIState("idle");
        setTimeout(() => setJustGenerated(false), 3500);
      } else {
        setAIError(data.message || "Generation failed. Try again.");
        setAIState("error");
      }
    } catch {
      setAIError("Could not reach the server.");
      setAIState("error");
    }
  };

  const closePanel = () => {
    setAIState("idle");
    setAIError("");
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* ── Section header ── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111318] tracking-tight">
            Skills
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
            Add technical skills one by one, or let AI suggest a full list for
            your role.
          </p>
        </div>

        {/* AI button */}
        <button
          onClick={() => setAIState(isPanelOpen ? "idle" : "open")}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
            isPanelOpen
              ? "bg-[#7C3AED] text-white border-[#7C3AED]"
              : "bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE] hover:bg-[#EDE9FE] hover:border-[#C4B5FD]"
          }`}
        >
          <Sparkles size={12} />
          AI Suggest
        </button>
      </div>

      {/* ── AI Panel ── */}
      {isPanelOpen && (
        <AIPanel aiState={aiState} jobTitle={jobTitle} closePanel={closePanel} aiError={aiError} setJobTitle={setJobTitle} skills={skills} setSkills={setSkills} experience={experience} setExperience={setExperience} handleGenerate={handleGenerate} isLoading={isLoading} />
      )}

      {/* ── Success flash ── */}
      {justGenerated && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700">
          <CheckCircle2 size={13} className="flex-shrink-0 text-emerald-500" />
          <span>
            <span className="font-semibold">{generatedCount} skills</span>{" "}
            added — duplicates removed automatically.
          </span>
        </div>
      )}

      {/* ── Manual input ── */}
      <div>
        <FieldLabel hint="press Enter or , to add">Add skill</FieldLabel>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleInputKey}
            placeholder="e.g. TypeScript, Docker, PostgreSQL…"
            className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                       text-[#111318] placeholder:text-[#C4C4CC]
                       focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                       transition-all"
          />
          <button
            onClick={() => {
              addSkill(skillInput);
              setSkillInput("");
            }}
            className="px-4 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* ── Skill chips ── */}
      {skills.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
              {skills.length} skill{skills.length !== 1 ? "s" : ""} added
            </span>
            <button
              onClick={() => update({ skills: [] })}
              className="text-[10px] text-red-400 hover:text-red-500 transition-colors font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all ${
                  justGenerated
                    ? "bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE]"
                    : "bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE]"
                }`}
              >
                {skill}
                <button
                  onClick={() => removeSkill(i)}
                  className="text-[#A78BFA] hover:text-[#7C3AED] ml-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-[#E4E4E7] rounded-xl gap-2">
          <p className="text-sm text-[#C4C4CC] italic">No skills added yet</p>
          <p className="text-[11px] text-[#C4C4CC]">
            Type above or use{" "}
            <button
              onClick={() => setAIState("open")}
              className="text-[#7C3AED] font-semibold hover:underline"
            >
              AI Suggest
            </button>
          </p>
        </div>
      )}

      {/* ── Tips ── */}
      {!isPanelOpen && skills.length < 5 && (
        <div className="bg-[#F4F3FF] border border-[#EDE9FE] rounded-xl p-3.5 space-y-2">
          <p className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-widest">
            Tips for a strong skills section
          </p>
          <ul className="space-y-1.5">
            {[
              "Aim for 10–20 skills — enough to be comprehensive without padding",
              "Prioritise technical skills; soft skills belong in your summary",
              "Mirror the exact keywords from the job description for ATS",
              "Group by category mentally: languages, frameworks, tools, cloud",
            ].map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[#6B7280]"
              >
                <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-white border border-[#DDD6FE] flex items-center justify-center flex-shrink-0 text-[8px] font-bold text-[#7C3AED]">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}