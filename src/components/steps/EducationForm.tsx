"use client";

import React from "react";
import FormInput from "@/components/FormInput";
import { useResume } from "@/context/ResumeContext";

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Education</h2>
          <p className="text-sm text-text-secondary mt-1">Add your educational background.</p>
        </div>
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-base cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Education
        </button>
      </div>

      {resumeData.education.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-4xl mb-3">🎓</div>
          <p className="text-text-secondary text-sm">No education entries yet.</p>
          <p className="text-text-muted text-xs mt-1">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="p-4 bg-white border border-border rounded-lg relative group animate-slide-in">
              {/* Remove button */}
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-3 right-3 p-1 text-text-muted hover:text-danger hover:bg-red-50 rounded transition-base opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-xs text-text-muted font-medium mb-3 uppercase tracking-wider">Education {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Institute"
                  id={`edu-institute-${index}`}
                  placeholder="University of Mumbai"
                  value={edu.institute}
                  onChange={(val) => updateEducation(index, "institute", val)}
                />
                <FormInput
                  label="Degree"
                  id={`edu-degree-${index}`}
                  placeholder="B.Tech in Computer Science"
                  value={edu.degree}
                  onChange={(val) => updateEducation(index, "degree", val)}
                />
                <FormInput
                  label="Start Date"
                  id={`edu-start-${index}`}
                  placeholder="Aug 2020"
                  value={edu.startDate}
                  onChange={(val) => updateEducation(index, "startDate", val)}
                />
                <FormInput
                  label="End Date"
                  id={`edu-end-${index}`}
                  placeholder="May 2024"
                  value={edu.endDate}
                  onChange={(val) => updateEducation(index, "endDate", val)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
