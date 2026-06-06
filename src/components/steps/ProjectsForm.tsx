"use client";

import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { FormTextarea } from "@/components/FormInput";
import { useResume } from "@/context/ResumeContext";

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const [techInputs, setTechInputs] = useState<{ [key: number]: string }>({});

  const handleAddTech = (index: number) => {
    const tech = techInputs[index]?.trim();
    if (!tech) return;
    const current = resumeData.projects[index].techStack || [];
    updateProject(index, "techStack", [...current, tech]);
    setTechInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    const current = resumeData.projects[projectIndex].techStack || [];
    updateProject(
      projectIndex,
      "techStack",
      current.filter((_, i) => i !== techIndex)
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Projects</h2>
          <p className="text-sm text-text-secondary mt-1">Showcase your best projects.</p>
        </div>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-base cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {resumeData.projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-4xl mb-3">💼</div>
          <p className="text-text-secondary text-sm">No projects added yet.</p>
          <p className="text-text-muted text-xs mt-1">Click "Add Project" to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="p-4 bg-white border border-border rounded-lg relative group animate-slide-in">
              {/* Remove button */}
              <button
                onClick={() => removeProject(index)}
                className="absolute top-3 right-3 p-1 text-text-muted hover:text-danger hover:bg-red-50 rounded transition-base opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-xs text-text-muted font-medium mb-3 uppercase tracking-wider">Project {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Project Title"
                  id={`proj-title-${index}`}
                  placeholder="E-Commerce Platform"
                  value={project.title}
                  onChange={(val) => updateProject(index, "title", val)}
                />
                <FormInput
                  label="GitHub URL"
                  id={`proj-github-${index}`}
                  type="url"
                  placeholder="https://github.com/user/project"
                  value={project.githubUrl}
                  onChange={(val) => updateProject(index, "githubUrl", val)}
                />
                <FormInput
                  label="Live URL"
                  id={`proj-live-${index}`}
                  type="url"
                  placeholder="https://project.vercel.app"
                  value={project.liveUrl}
                  onChange={(val) => updateProject(index, "liveUrl", val)}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  label="Description"
                  id={`proj-desc-${index}`}
                  placeholder="Describe what the project does, your role, and key achievements..."
                  value={project.description}
                  onChange={(val) => updateProject(index, "description", val)}
                  rows={3}
                />
              </div>

              {/* Tech stack tags */}
              <div className="mt-4">
                <label className="text-sm font-medium text-text mb-1.5 block">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add technology..."
                    value={techInputs[index] || ""}
                    onChange={(e) => setTechInputs((prev) => ({ ...prev, [index]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddTech(index);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm text-text
                      placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-base"
                  />
                  <button
                    onClick={() => handleAddTech(index)}
                    className="px-3 py-2 bg-surface-alt border border-border text-text-secondary text-sm rounded-lg hover:bg-surface-hover transition-base cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {(project.techStack?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, ti) => (
                      <span
                        key={ti}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-surface-alt text-text-secondary border border-border rounded text-xs font-medium"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTech(index, ti)}
                          className="hover:text-danger cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
