"use client"

import { useState } from "react";
import AIPanel from "../resume-editor/AIPanel";
import { Resume } from "@/frontend/types/resume";

type AIState = "idle" | "open" | "loading" | "error";

export default function ProjectAIPanel({
  projectIndex,
  resume,
  update,
  onClose,
}: {
  projectIndex: number;
  resume: Resume;
  update: (patch: Partial<Resume>) => void;
  onClose: () => void;
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [techStack, setTechStack] = useState(
    // Pre-fill from whatever is already typed in the tech stack field
    Array.isArray(resume.projects[projectIndex]?.techStack)
      ? (resume.projects[projectIndex].techStack as string[]).join(", ")
      : (resume.projects[projectIndex]?.techStack as string) || "",
  );
  const [experience, setExperience] = useState("");
  const [aiState, setAIState] = useState<AIState>("open");
  const [aiError, setAIError] = useState("");
  const [justGenerated, setJustGenerated] = useState(false);

  const isLoading = aiState === "loading";

  const handleGenerate = async () => {
    if (!jobTitle.trim() || !techStack.trim() || !experience) {
      setAIError("All three fields are required.");
      setAIState("error");
      return;
    }

    setAIState("loading");
    setAIError("");

    try {
      const res = await fetch("/api/ai/generate-project-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, techStack, experience }),
      });

      const data = await res.json();

      if (data.success && data.data?.projectDescription) {
        const arr = [...resume.projects];
        arr[projectIndex] = {
          ...arr[projectIndex],
          description: data.data.projectDescription,
        };
        update({ projects: arr });

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
    <AIPanel aiState={aiState} jobTitle={jobTitle} closePanel={onClose} aiError={aiError} setJobTitle={setJobTitle} experience={experience} setExperience={setExperience} handleGenerate={handleGenerate} isLoading={isLoading} techStack={techStack} setTechStack={setTechStack} justGenerated={justGenerated} />

  );
}