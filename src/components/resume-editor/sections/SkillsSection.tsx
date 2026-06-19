"use client"

import React, { useState } from 'react'
import Label from '../ui/Label';
import { X } from 'lucide-react';
import { Resume } from '@/frontend/types/resume';

type Props = {
    resume: Resume,
    update: (patch: Partial<Resume>) => void;
}

const SkillsSection = ({resume, update}: Props) => {
    const [skillInput, setSkillInput] = useState("");
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
  )
}

export default SkillsSection