"use client"

import { ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Card from "../ui/Card";
import { Resume, WorkExperience } from "@/frontend/types/resume";
import AddButton from "../ui/AddButton";
import { emptyExperience } from "@/lib/resumeHelpers";

type Props = {
  update: (patch: Partial<Resume>) => void;
  resume: Resume;
};

const ExperienceSection = ({ update, resume }: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-3">
      {resume.workExperience?.map((w, i) => {
        const open = expandedCards[w.tempId!] !== false;
        return (
          <Card
            key={i}
            onRemove={() =>
              update({
                workExperience: resume.workExperience.filter((_, j) => j !== i),
              })
            }
          >
            <div
              className="flex items-center justify-between cursor-pointer pr-6"
              onClick={() =>
                setExpandedCards((p) => ({ ...p, [w.tempId!]: !open }))
              }
            >
              <p className="text-sm font-semibold text-[#111318]">
                {w.position || w.company || (
                  <span className="text-[#C4C4CC] font-normal italic">
                    New experience
                  </span>
                )}
              </p>
              {open ? (
                <ChevronUp size={14} className="text-[#9CA3AF]" />
              ) : (
                <ChevronUp size={14} className="text-[#9CA3AF]" />
              )}
            </div>
            {open && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={w.position || ""}
                      onChange={(v) => {
                        const arr = [...resume.workExperience];
                        arr[i] = { ...arr[i], position: v };
                        update({ workExperience: arr });
                      }}
                      placeholder="Senior Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={w.company || ""}
                      onChange={(v) => {
                        const arr = [...resume.workExperience];
                        arr[i] = { ...arr[i], company: v };
                        update({ workExperience: arr });
                      }}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      value={w.startDate || ""}
                      onChange={(v) => {
                        const arr = [...resume.workExperience];
                        arr[i] = { ...arr[i], startDate: v };
                        update({ workExperience: arr });
                      }}
                      placeholder="Jan 2022"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      value={w.endDate || ""}
                      onChange={(v) => {
                        const arr = [...resume.workExperience];
                        arr[i] = { ...arr[i], endDate: v };
                        update({ workExperience: arr });
                      }}
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={w.description || ""}
                    onChange={(v) => {
                      const arr = [...resume.workExperience];
                      arr[i] = { ...arr[i], description: v };
                      update({ workExperience: arr });
                    }}
                    placeholder="Key responsibilities and achievements…"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      })}
      <AddButton
        onClick={() =>
          update({
            workExperience: [
              ...(resume.workExperience || []),
              emptyExperience(),
            ],
          })
        }
        label="Add experience"
      />
    </div>
  );
};

export default ExperienceSection;
