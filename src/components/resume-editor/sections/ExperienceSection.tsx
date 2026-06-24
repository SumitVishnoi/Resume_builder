"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Resume } from "@/frontend/types/resume";
import { emptyExperience } from "@/lib/resumeHelpers";
import AddButton from "../ui/AddButton";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Textarea from "../ui/Textarea";
import ExperienceAIPanel from "@/components/work-experience/ExperienceAIPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  resume: Resume;
  update: (patch: Partial<Resume>) => void;
};

type AIState = "idle" | "open" | "loading" | "error";





// ─── AI Field Label ───────────────────────────────────────────────────────────



// ─── AI Panel (per experience entry) ─────────────────────────────────────────



// ─── Main component ───────────────────────────────────────────────────────────

export default function WorkExperienceSection({ resume, update }: Props) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );
  const [openAIPanels, setOpenAIPanels] = useState<Record<string, boolean>>({});
  const [flashDesc, setFlashDesc] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) =>
    setExpandedCards((p) => ({ ...p, [id]: !p[id] }));

  const toggleAI = (id: string) =>
    setOpenAIPanels((p) => ({ ...p, [id]: !p[id] }));

  const closeAI = (id: string) =>
    setOpenAIPanels((p) => ({ ...p, [id]: false }));

  const flashDescription = (id: string) => {
    setFlashDesc((p) => ({ ...p, [id]: true }));
    setTimeout(() => setFlashDesc((p) => ({ ...p, [id]: false })), 3500);
  };

  return (
    <div className="space-y-4">
      {/* ── Section header ── */}
      <div>
        <h2 className="text-base font-semibold text-[#111318] tracking-tight">
          Work experience
        </h2>
        <p className="text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
          Most recent first. Use AI to generate an ATS-ready description for
          each role.
        </p>
      </div>

      {/* ── Empty state ── */}
      {(!resume.workExperience || resume.workExperience.length === 0) && (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#E4E4E7] rounded-2xl gap-2">
          <p className="text-sm text-[#C4C4CC] italic">
            No work experience added yet
          </p>
          <p className="text-[11px] text-[#C4C4CC]">
            Click "Add experience" below to get started
          </p>
        </div>
      )}

      {/* ── Experience cards ── */}
      <div className="space-y-3">
        {resume.workExperience?.map((exp, i) => {
          const id = exp.tempId || String(i);
          const isOpen = expandedCards[id] !== false;
          const isAIOpen = openAIPanels[id] === true;
          const isFlashing = flashDesc[id];

          const headline =
            [exp.position, exp.company].filter(Boolean).join(" · ") ||
            "New experience";

          return (
            <Card
              key={i}
              onRemove={() =>
                update({
                  workExperience: resume.workExperience.filter(
                    (_, j) => j !== i
                  ),
                })
              }
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between cursor-pointer pr-6"
                onClick={() => toggleCard(id)}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#111318] truncate">
                    {exp.position || exp.company ? (
                      headline
                    ) : (
                      <span className="text-[#C4C4CC] font-normal italic">
                        New experience
                      </span>
                    )}
                  </p>
                  {!isOpen && (exp.startDate || exp.endDate) && (
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                      {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                    </p>
                  )}
                </div>
                {isOpen ? (
                  <ChevronUp
                    size={14}
                    className="text-[#9CA3AF] flex-shrink-0"
                  />
                ) : (
                  <ChevronDown
                    size={14}
                    className="text-[#9CA3AF] flex-shrink-0"
                  />
                )}
              </div>

              {/* Expanded fields */}
              {isOpen && (
                <div className="space-y-3 pt-1">
                  {/* Position + Company */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position || ""}
                        onChange={(v) => {
                          const arr = [...resume.workExperience];
                          arr[i] = { ...arr[i], position: v };
                          update({ workExperience: arr });
                        }}
                        placeholder="Senior Engineer"
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company || ""}
                        onChange={(v) => {
                          const arr = [...resume.workExperience];
                          arr[i] = { ...arr[i], company: v };
                          update({ workExperience: arr });
                        }}
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  {/* Start + End date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Start date</Label>
                      <Input
                        value={exp.startDate || ""}
                        onChange={(v) => {
                          const arr = [...resume.workExperience];
                          arr[i] = { ...arr[i], startDate: v };
                          update({ workExperience: arr });
                        }}
                        placeholder="Jan 2021"
                      />
                    </div>
                    <div>
                      <Label>End date</Label>
                      <Input
                        value={exp.endDate || ""}
                        onChange={(v) => {
                          const arr = [...resume.workExperience];
                          arr[i] = { ...arr[i], endDate: v };
                          update({ workExperience: arr });
                        }}
                        placeholder="Present"
                      />
                    </div>
                  </div>

                  {/* Description + AI button */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
                        Description
                      </label>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAI(id);
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all ${
                          isAIOpen
                            ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                            : "bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE] hover:bg-[#EDE9FE]"
                        }`}
                      >
                        <Sparkles size={10} />
                        AI Write
                      </button>
                    </div>

                    {/* AI Panel — per experience */}
                    {isAIOpen && (
                      <ExperienceAIPanel
                        expIndex={i}
                        resume={resume}
                        update={update}
                        onClose={() => closeAI(id)}
                        onGenerated={() => flashDescription(id)}
                      />
                    )}

                    {/* Description textarea with flash border */}
                    <div className="relative mt-2">
                      {isFlashing && (
                        <div className="absolute inset-0 rounded-xl border-2 border-[#7C3AED] pointer-events-none z-10 animate-pulse" />
                      )}
                      <Textarea
                        value={exp.description || ""}
                        onChange={(v) => {
                          const arr = [...resume.workExperience];
                          arr[i] = { ...arr[i], description: v };
                          update({ workExperience: arr });
                        }}
                        placeholder={
                          "Describe your responsibilities and impact. Use the AI button above to generate one automatically.\n\n• Start each point with a strong verb\n• Quantify results where possible"
                        }
                        rows={5}
                      />
                    </div>

                    {/* Word count */}
                    {exp.description && (
                      <p className="text-[10px] text-[#C4C4CC] mt-1">
                        {
                          exp.description
                            .trim()
                            .split(/\s+/)
                            .filter(Boolean).length
                        }{" "}
                        words · aim for 80–150 for ATS
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        <AddButton
          onClick={() =>
            update({
              workExperience: [
                ...(resume.workExperience || []),
                emptyExperience(),
              ],
            })
          }
          label="Add experience"
        />
      </div>

      {/* ── Tips ── */}
      {(resume.workExperience?.length ?? 0) < 2 && (
        <div className="bg-[#F4F3FF] border border-[#EDE9FE] rounded-xl p-3.5 space-y-2">
          <p className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-widest">
            Tips for a strong experience section
          </p>
          <ul className="space-y-1.5">
            {[
              "List roles most-recent first — recruiters read top-down",
              "Open each description with a strong verb: Built, Led, Optimised",
              "Quantify impact: reduced load time by 40%, served 10k daily users",
              "Mirror the exact tech keywords from the job description for ATS",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#6B7280]">
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