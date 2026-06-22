"use client"

import { Resume } from "@/frontend/types/resume";
import { useState } from "react";
import AIPanel from "../resume-editor/AIPanel";

type AIState = "idle" | "open" | "loading" | "error";

export default function ExperienceAIPanel({
  expIndex,
  resume,
  update,
  onClose,
}: {
  expIndex: number;
  resume: Resume;
  update: (patch: Partial<Resume>) => void;
  onClose: () => void;
}) {
  // Pre-fill jobRole from position if already typed
  const [jobRole, setJobRole] = useState(
    resume.workExperience[expIndex]?.position || ""
  );
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [aiState, setAIState] = useState<AIState>("open");
  const [aiError, setAIError] = useState("");
  const [justGenerated, setJustGenerated] = useState(false);

  const isLoading = aiState === "loading";

  const handleGenerate = async () => {
    if (
      !jobRole.trim() ||
      !techStack.trim() ||
      !experience ||
      !yearsOfExperience
    ) {
      setAIError("All four fields are required.");
      setAIState("error");
      return;
    }

    setAIState("loading");
    setAIError("");

    try {
      const res = await fetch("/api/ai/generate-experience-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole,
          techStack,
          experience,
          yearsOfExperience,
        }),
      });

      const data = await res.json();

      if (data.success && data.data?.workExperienceDescription) {
        const arr = [...resume.workExperience];
        arr[expIndex] = {
          ...arr[expIndex],
          description: data.data.workExperienceDescription,
        };
        update({ workExperience: arr });
        setJustGenerated(true);
        setAIState("open");
        setTimeout(() => setJustGenerated(false), 3500);
      } else {
        setAIError(data.message || "Generation failed. Try again.");
        setAIState("error");
      }
    } catch {
      setAIError("Could not reach the server.");
      setAIState("error");
    }
  };

  return (
    <AIPanel aiState={aiState} jobTitle={jobRole} closePanel={onClose} aiError={aiError} setJobTitle={setJobRole} experience={experience} setExperience={setExperience} handleGenerate={handleGenerate} isLoading={isLoading} techStack={techStack} setTechStack={setTechStack} justGenerated={justGenerated} setYearsOfExperience={setYearsOfExperience} yearsOfExperience={yearsOfExperience} />
    
  );
}