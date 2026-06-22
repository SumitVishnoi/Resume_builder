"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Resume } from "@/frontend/types/resume";
import { emptyProject } from "@/lib/resumeHelpers";
import AddButton from "../ui/AddButton";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Textarea from "../ui/Textarea";
import ProjectAIPanel from "@/components/projects/ProjectAIPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  resume: Resume;
  update: (patch: Partial<Resume>) => void;
};



// ─── AI Panel (per-project) ───────────────────────────────────────────────────



// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectsSection({ resume, update }: Props) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
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
          Projects
        </h2>
        <p className="text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
          Showcase 2–4 of your best projects. Use AI to generate a polished
          description per project.
        </p>
      </div>

      {/* ── Empty state ── */}
      {(!resume.projects || resume.projects.length === 0) && (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#E4E4E7] rounded-2xl gap-2">
          <p className="text-sm text-[#C4C4CC] italic">No projects added yet</p>
          <p className="text-[11px] text-[#C4C4CC]">
            Click "Add project" below to get started 
          </p> 
        </div>
      )}

      {/* ── Project cards ── */}
      <div className="space-y-3">
        {resume.projects?.map((proj, i) => {
          const id = proj.tempId || String(i);
          const isOpen = expandedCards[id] !== false;
          const isAIOpen = openAIPanels[id] === true;
          const isFlashing = flashDesc[id];

          return (
            <Card
              key={i}
              onRemove={() =>
                update({
                  projects: resume.projects.filter((_, j) => j !== i),
                })
              }
            >
              {/* Card header / accordion toggle */}
              <div
                className="flex items-center justify-between cursor-pointer pr-6"
                onClick={() => toggleCard(id)}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#111318] truncate">
                    {proj.title || (
                      <span className="text-[#C4C4CC] font-normal italic">
                        New project
                      </span>
                    )}
                  </p>
                  {!isOpen && proj.techStack && (
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5 truncate">
                      {Array.isArray(proj.techStack)
                        ? proj.techStack.slice(0, 4).join(", ")
                        : proj.techStack}
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
                  {/* Title + Live URL */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Project name</Label>
                      <Input
                        value={proj.title || ""}
                        onChange={(v) => {
                          const arr = [...resume.projects];
                          arr[i] = { ...arr[i], title: v };
                          update({ projects: arr });
                        }}
                        placeholder="My App"
                      />
                    </div>
                    <div>
                      <Label>Live URL</Label>
                      <Input
                        value={proj.liveUrl || ""}
                        onChange={(v) => {
                          const arr = [...resume.projects];
                          arr[i] = { ...arr[i], liveUrl: v };
                          update({ projects: arr });
                        }}
                        placeholder="myapp.vercel.app"
                      />
                    </div>
                  </div>

                  {/* GitHub URL */}
                  {/* <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={proj.githubUrl || ""}
                      onChange={(v) => {
                        const arr = [...resume.projects];
                        arr[i] = { ...arr[i], githubUrl: v };
                        update({ projects: arr });
                      }}
                      placeholder="github.com/username/repo"
                    />
                  </div> */}

                  {/* Tech stack */}
                  <div>
                    <Label>Tech stack</Label>
                    <Input
                      value={
                        Array.isArray(proj.techStack)
                          ? proj.techStack.join(", ")
                          : proj.techStack || ""
                      }
                      onChange={(v) => {
                        const arr = [...resume.projects];
                        arr[i] = {
                          ...arr[i],
                          techStack: v.split(",").map((item) => item.trim()),
                        };
                        update({ projects: arr });
                      }}
                      placeholder="React, Node.js, MongoDB"
                    />
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

                    {/* AI Panel — per project */}
                    {isAIOpen && (
                      <ProjectAIPanel
                        projectIndex={i}
                        resume={resume}
                        update={(patch) => {
                          update(patch);
                          flashDescription(id);
                        }}
                        onClose={() => closeAI(id)}
                      />
                    )}

                    {/* Description textarea */}
                    <div className={`relative mt-2 ${isAIOpen ? "" : ""}`}>
                      {isFlashing && (
                        <div className="absolute inset-0 rounded-xl border-2 border-[#7C3AED] pointer-events-none z-10 animate-pulse" />
                      )}
                      <Textarea
                        value={proj.description || ""}
                        onChange={(v) => {
                          const arr = [...resume.projects];
                          arr[i] = { ...arr[i], description: v };
                          update({ projects: arr });
                        }}
                        placeholder="Describe what the project does, your role, and its impact. Use the AI button above to generate one automatically."
                        rows={4}
                      />
                    </div>

                    {/* Word count hint */}
                    {proj.description && (
                      <p className="text-[10px] text-[#C4C4CC] mt-1">
                        {
                          proj.description.trim().split(/\s+/).filter(Boolean)
                            .length
                        }{" "}
                        words
                        {" · "}aim for 80–120 for ATS
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
              projects: [...(resume.projects || []), emptyProject()],
            })
          }
          label="Add project"
        />
      </div>

      {/* ── Tips ── */}
      {(resume.projects?.length ?? 0) < 2 && (
        <div className="bg-[#F4F3FF] border border-[#EDE9FE] rounded-xl p-3.5 space-y-2">
          <p className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-widest">
            Tips for a strong projects section
          </p>
          <ul className="space-y-1.5">
            {[
              "Include 2–4 projects — quality beats quantity every time",
              "Lead the description with a strong verb: Built, Developed, Engineered",
              "Name the tech stack exactly as it appears in job descriptions for ATS",
              "Add measurable impact where possible — users, uptime, performance gains",
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
