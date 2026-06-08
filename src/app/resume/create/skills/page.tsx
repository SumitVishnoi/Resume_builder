"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wrench, X, Plus } from "lucide-react";
import AIToggle from "@/components/resume/AIToggle";
import AIPanel from "@/components/resume/AIPanel";
import SectionHeader from "@/components/resume/SectionHeader";

const SUGGESTIONS = ["JavaScript", "TypeScript", "React.js", "Node.js", "Python", "Docker", "AWS", "PostgreSQL", "MongoDB", "Git"];

export default function SkillsPage() {
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("Mid-Level");
  const [loading, setLoading] = useState(false);

  const addSkill = (s?: string) => {
    const skill = (s || input).trim();
    if (skill && !skills.includes(skill)) { setSkills([...skills, skill]); setInput(""); }
  };

  const removeSkill = (s: string) => setSkills(skills.filter((x) => x !== s));

  const generate = async () => {
    if (!jobTitle) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobTitle, experience }) });
      const data = await res.json();
      if (data.success) setSkills(data.data.skills);
    } finally { setLoading(false); }
  };

  const suggestions = SUGGESTIONS.filter((s) => !skills.includes(s));

  return (
    <div className="animate-fade-up">
      <SectionHeader icon={Wrench} title="Skills" subtitle="Add your technical skills and expertise"
        action={<AIToggle mode={mode} onChange={setMode} />} />

      <div className="space-y-4">
        {mode === "ai" ? (
          <AIPanel
            title="Generate Skills with AI"
            description="Enter your job title and experience level for tailored skill suggestions"
            loading={loading}
            disabled={!jobTitle}
            onGenerate={generate}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="field-label text-xs">Job Title</label>
                <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Software Engineer"
                  className="input-base text-sm" />
              </div>
              <div className="col-span-2">
                <label className="field-label text-xs">Experience Level</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)}
                  className="input-base text-sm bg-white">
                  <option>Fresher</option><option>Mid-Level</option><option>Senior-Level</option>
                </select>
              </div>
            </div>
          </AIPanel>
        ) : (
          <div className="card-base p-5 shadow-card-md">
            <label className="field-label">Add Skills</label>
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter…"
                className="input-base flex-1" />
              <button onClick={() => addSkill()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover shadow-btn-primary transition-all shrink-0 self-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-ink-tertiary mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.slice(0, 8).map((s) => (
                    <button key={s} onClick={() => addSkill(s)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-line-soft border border-line text-ink-secondary hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all">
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills display */}
        <div className="card-base p-5 shadow-card-md min-h-[120px]">
          {skills.length > 0 ? (
            <>
              <p className="section-label">{skills.length} Skills Added</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill}
                    className="flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary text-sm px-3 py-1.5 rounded-xl font-semibold group hover:bg-primary/12 transition-all">
                    {skill}
                    <button onClick={() => removeSkill(skill)}
                      className="w-4 h-4 rounded-md flex items-center justify-center text-primary/60 hover:text-danger hover:bg-danger/10 transition-all">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-center">
              <Wrench className="w-8 h-8 text-line mb-2" />
              <p className="text-sm text-ink-tertiary">No skills added yet</p>
              <p className="text-xs text-ink-placeholder mt-0.5">{mode === "ai" ? "Generate with AI above" : "Type skills and press Enter"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/resume/create/personal-info" className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <Link href="/resume/create/education" className="btn-primary">
          Next: Education <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}