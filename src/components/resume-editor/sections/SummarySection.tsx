"use client";

import { Sparkles } from "lucide-react";
import { Resume } from "@/frontend/types/resume";
import WritingTips from "@/components/summary/WritingTips";
import { MAX_CHARS} from "@/lib/summary";
import QualityBar from "@/components/summary/QualityBar";
import AIPanel from "@/components/resume-editor/AIPanel";
import Textarea from "@/components/summary/Textarea";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type AIState = "idle" | "open" | "loading" | "error";

type Props = {
  update: (patch: Partial<Resume>) => void;
  resume: Resume;
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function SummarySection({ update, resume }: Props) {

  const [aiState, setAiState] = useState<AIState>("idle");
      const [jobTitle, setJobTitle] = useState("");
      const [skills, setSkills] = useState("");
      const [experience, setExperience] = useState("");
      const [aiError, setAiError] = useState("");
      const [justGenerated, setJustGenerated] = useState(false);

    const handleGenerate = async () => {
    if (!jobTitle.trim() || !skills.trim() || !experience) {
      setAiError("All three fields are required.");
      return;
    }

    setAiState("loading");
    setAiError("");

    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, skills, experience }),
      });

      const data = await res.json();

      if (data.success && data.data?.summary) {
        update({ summary: data.data.summary });
        setJustGenerated(true);
        setAiState("idle");
        setTimeout(() => setJustGenerated(false), 3000);
      } else {
        setAiError(data.message || "Generation failed. Try again.");
        setAiState("error");
      }
    } catch {
      setAiError("Could not reach the server.");
      setAiState("error");
    }
  };

  const summary = resume.summary || "";
  const remaining = MAX_CHARS - summary.length;

  // ── Generate via AI ────────────────────────────────────────────────────────

  
  const closePanel = () => {
    setAiState("idle");
    setAiError("");
  };

  const isLoading = aiState === "loading";
  const isPanelOpen = aiState === "open" || aiState === "loading" || aiState === "error";

  return (
    <div className="space-y-4">
      {/* ── Section header ── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#111318] tracking-tight">
            Professional summary
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
            2–4 sentences. No "I". Lead with your title, core skills, and what
            you bring to a team.
          </p>
        </div>

        {/* AI button */}
        <button
          onClick={() => setAiState(isPanelOpen ? "idle" : "open")}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
            isPanelOpen
              ? "bg-[#7C3AED] text-white border-[#7C3AED]"
              : "bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE] hover:bg-[#EDE9FE] hover:border-[#C4B5FD]"
          }`}
        >
          <Sparkles size={12} />
          AI Write
        </button>
      </div>

      {/* ── AI Panel ── */}
      {isPanelOpen && (
        <AIPanel aiState={aiState} jobTitle={jobTitle} closePanel={closePanel} aiError={aiError} setJobTitle={setJobTitle} skills={skills} setSkills={setSkills} experience={experience} setExperience={setExperience} handleGenerate={handleGenerate} isLoading={isLoading} />
      )}

      {/* ── Textarea ── */}
      <Textarea justGenerated={justGenerated} setJustGenerated={setJustGenerated} update={update} summary={summary} remaining={remaining} />

      {/* ── Quality bar ── */}
      {summary.length > 0 && (
        <QualityBar summary={summary} />
      )}

      {/* ── Writing tips ── */}
      {!isPanelOpen && (
        <WritingTips />
      )}
    </div>
  );
}