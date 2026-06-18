import React from "react";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";
import { Resume } from "@/frontend/types/resume";

type Props = {
    update: (patch: Partial<Resume>) => void;
    resume: Resume;
};

const SummarySection = ({update, resume}: Props) => {
  return (
    <div>
      <Label>Professional Summary</Label>
      <Textarea
        value={resume.summary || ""}
        onChange={(v) => update({ summary: v })}
        placeholder="A concise statement about your professional background, key skills, and career goals…"
        rows={7}
      />
      <p className="mt-2 text-[11px] text-[#9CA3AF]">
        Keep it to 2–4 sentences. Write in first person without `I`.
      </p>
    </div>
  );
};

export default SummarySection;
