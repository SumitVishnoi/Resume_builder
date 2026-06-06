"use client";

import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (input.trim()) {
        addSkill(input);
        setInput("");
      }
    }
  };

  const handleAdd = () => {
    if (input.trim()) {
      addSkill(input);
      setInput("");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text">Skills</h2>
        <p className="text-sm text-text-secondary mt-1">Add your technical and professional skills.</p>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Type a skill and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3.5 py-2.5 bg-white border border-border rounded-lg text-sm text-text
            placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition-base"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-base cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* Skills tags */}
      {resumeData.skills.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-4xl mb-3">⚡</div>
          <p className="text-text-secondary text-sm">No skills added yet.</p>
          <p className="text-text-muted text-xs mt-1">Type a skill above and press Enter to add it.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary border border-primary-200 rounded-lg text-sm font-medium animate-fade-in"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:text-danger transition-base cursor-pointer"
                title="Remove skill"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <p className="text-xs text-text-muted mt-4">{resumeData.skills.length} skill{resumeData.skills.length !== 1 ? "s" : ""} added</p>
      )}
    </div>
  );
}
