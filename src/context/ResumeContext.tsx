"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { IPersonalInfo, IEducation, IProjects, IWorkExperience } from "@/types/resume.types";

export const STEPS = [
  { key: "personal", label: "Personal Info", icon: "👤" },
  { key: "education", label: "Education", icon: "🎓" },
  { key: "skills", label: "Skills", icon: "⚡" },
  { key: "projects", label: "Projects", icon: "💼" },
  { key: "experience", label: "Experience", icon: "🏢" },
  { key: "summary", label: "Summary", icon: "📝" },
  { key: "preview", label: "Preview", icon: "👁" },
] as const;

interface ResumeData {
  _id?: string;
  title: string;
  summary: string;
  personalInfo: IPersonalInfo;
  education: IEducation[];
  skills: string[];
  projects: IProjects[];
  workExperience: IWorkExperience[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  currentStep: number;
  isSaving: boolean;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (field: keyof IPersonalInfo, value: string) => void;
  updateSummary: (value: string) => void;
  updateTitle: (value: string) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: keyof IEducation, value: string) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, field: keyof IProjects, value: string | string[]) => void;
  removeProject: (index: number) => void;
  addExperience: () => void;
  updateExperience: (index: number, field: keyof IWorkExperience, value: string) => void;
  removeExperience: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  saveResume: () => Promise<void>;
}

const defaultPersonalInfo: IPersonalInfo = {
  fullname: "",
  email: "",
  mobile: "",
  location: "",
  githubUrl: "",
  linkedIn: "",
  portfolio: "",
};

const defaultResumeData: ResumeData = {
  title: "",
  summary: "",
  personalInfo: { ...defaultPersonalInfo },
  education: [],
  skills: [],
  projects: [],
  workExperience: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children, resumeId }: { children: ReactNode; resumeId?: string }) {
  const [resumeData, setResumeDataState] = useState<ResumeData>({ ...defaultResumeData });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const setResumeData = useCallback((data: ResumeData) => {
    setResumeDataState(data);
  }, []);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updatePersonalInfo = useCallback((field: keyof IPersonalInfo, value: string) => {
    setResumeDataState((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const updateSummary = useCallback((value: string) => {
    setResumeDataState((prev) => ({ ...prev, summary: value }));
  }, []);

  const updateTitle = useCallback((value: string) => {
    setResumeDataState((prev) => ({ ...prev, title: value }));
  }, []);

  // Education
  const addEducation = useCallback(() => {
    setResumeDataState((prev) => ({
      ...prev,
      education: [...prev.education, { institute: "", degree: "", startDate: "", endDate: "", gpa:"", field:"" }],
    }));
  }, []);

  const updateEducation = useCallback((index: number, field: keyof IEducation, value: string) => {
    setResumeDataState((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  }, []);

  const removeEducation = useCallback((index: number) => {
    setResumeDataState((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  // Skills
  const addSkill = useCallback((skill: string) => {
    if (!skill.trim()) return;
    setResumeDataState((prev) => ({
      ...prev,
      skills: [...prev.skills, skill.trim()],
    }));
  }, []);

  const removeSkill = useCallback((index: number) => {
    setResumeDataState((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  // Projects
  const addProject = useCallback(() => {
    setResumeDataState((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", githubUrl: "", liveUrl: "", techStack: [] }],
    }));
  }, []);

  const updateProject = useCallback((index: number, field: keyof IProjects, value: string | string[]) => {
    setResumeDataState((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  }, []);

  const removeProject = useCallback((index: number) => {
    setResumeDataState((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }, []);

  // Experience
  const addExperience = useCallback(() => {
    setResumeDataState((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  }, []);

  const updateExperience = useCallback((index: number, field: keyof IWorkExperience, value: string) => {
    setResumeDataState((prev) => {
      const updated = [...prev.workExperience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, workExperience: updated };
    });
  }, []);

  const removeExperience = useCallback((index: number) => {
    setResumeDataState((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  }, []);

  // Navigation
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < STEPS.length) setCurrentStep(step);
  }, []);

  // Save
  const saveResume = useCallback(async () => {
    if (!resumeId) return;
    setIsSaving(true);
    try {
      await fetch(`/api/resume/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resumeData.title,
          summary: resumeData.summary,
          personalInfo: resumeData.personalInfo,
          education: resumeData.education,
          skills: resumeData.skills,
          projects: resumeData.projects,
          workExperience: resumeData.workExperience,
        }),
      });
    } catch (err) {
      console.error("Failed to save resume:", err);
    } finally {
      setIsSaving(false);
    }
  }, [resumeId, resumeData]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        currentStep,
        isSaving,
        setResumeData,
        updatePersonalInfo,
        updateSummary,
        updateTitle,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addExperience,
        updateExperience,
        removeExperience,
        nextStep,
        prevStep,
        goToStep,
        saveResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
}
