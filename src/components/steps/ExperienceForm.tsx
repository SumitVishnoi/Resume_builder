"use client";

import React from "react";
import FormInput from "@/components/FormInput";
import { FormTextarea } from "@/components/FormInput";
import { useResume } from "@/context/ResumeContext";

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Work Experience</h2>
          <p className="text-sm text-text-secondary mt-1">Add your professional work experience.</p>
        </div>
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-base cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Experience
        </button>
      </div>

      {resumeData.workExperience.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-4xl mb-3">🏢</div>
          <p className="text-text-secondary text-sm">No work experience added yet.</p>
          <p className="text-text-muted text-xs mt-1">Click "Add Experience" to include your work history.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="p-4 bg-white border border-border rounded-lg relative group animate-slide-in">
              {/* Remove button */}
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-3 right-3 p-1 text-text-muted hover:text-danger hover:bg-red-50 rounded transition-base opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-xs text-text-muted font-medium mb-3 uppercase tracking-wider">Experience {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company"
                  id={`exp-company-${index}`}
                  placeholder="Google"
                  value={exp.company}
                  onChange={(val) => updateExperience(index, "company", val)}
                />
                <FormInput
                  label="Position"
                  id={`exp-position-${index}`}
                  placeholder="Software Engineer"
                  value={exp.position}
                  onChange={(val) => updateExperience(index, "position", val)}
                />
                <FormInput
                  label="Start Date"
                  id={`exp-start-${index}`}
                  placeholder="Jan 2023"
                  value={exp.startDate}
                  onChange={(val) => updateExperience(index, "startDate", val)}
                />
                <FormInput
                  label="End Date"
                  id={`exp-end-${index}`}
                  placeholder="Present"
                  value={exp.endDate}
                  onChange={(val) => updateExperience(index, "endDate", val)}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  label="Description"
                  id={`exp-desc-${index}`}
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(val) => updateExperience(index, "description", val)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
