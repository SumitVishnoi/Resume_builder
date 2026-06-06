"use client";

import React from "react";
import { FormTextarea } from "@/components/FormInput";
import { useResume } from "@/context/ResumeContext";

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResume();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text">Professional Summary</h2>
        <p className="text-sm text-text-secondary mt-1">Write a brief summary highlighting your experience and goals.</p>
      </div>

      <FormTextarea
        label="Summary"
        id="summary"
        placeholder="Passionate software engineer with 3+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering impactful user experiences..."
        value={resumeData.summary}
        onChange={updateSummary}
        rows={8}
        maxLength={1000}
      />

      <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="text-sm font-semibold text-primary mb-2">💡 Tips for a great summary</h3>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>• Keep it concise — 2 to 4 sentences is ideal</li>
          <li>• Mention your years of experience and key skills</li>
          <li>• Highlight what makes you unique</li>
          <li>• Tailor it to the role you&apos;re applying for</li>
        </ul>
      </div>
    </div>
  );
}
