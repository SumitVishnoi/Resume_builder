"use client"

import React, { useState } from 'react'
import AddButton from '../ui/AddButton';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../ui/Card';
import { Resume } from '@/frontend/types/resume';
import Textarea from '../ui/Textarea';
import { emptyProject } from '@/lib/resumeHelpers';

type Props = {
    resume: Resume;
    update: (patch: Partial<Resume>) => void; 
}

const ProjectsSection = ({resume, update}: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-3">
                {resume.projects?.map((proj, i) => {
                  const open = expandedCards[proj.tempId!] !== false;
                  return (
                    <Card key={i} onRemove={() => update({ projects: resume.projects.filter((_, j) => j !== i) })}>
                      <div className="flex items-center justify-between cursor-pointer pr-6" onClick={() => setExpandedCards((p) => ({ ...p, [proj.tempId!]: !open }))}>
                        <p className="text-sm font-semibold text-[#111318]">
                          {proj.title || <span className="text-[#C4C4CC] font-normal italic">New project</span>}
                        </p>
                        {open ? <ChevronUp size={14} className="text-[#9CA3AF]" /> : <ChevronDown size={14} className="text-[#9CA3AF]" />}
                      </div>
                      {open && (
                        <div className="space-y-3 pt-1">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Project Name</Label>
                              <Input value={proj.title || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], title: v }; update({ projects: arr }); }} placeholder="My App" />
                            </div>
                            <div>
                              <Label>live Url</Label>
                              <Input value={proj.liveUrl || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], liveUrl: v }; update({ projects: arr }); }} placeholder="github.com/…" />
                            </div>
                            <div className="col-span-2">
                              <Label>Tech Stack</Label>
                              <Input value={proj.techStack || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], techStack: v }; update({ projects: arr }); }} placeholder="React, Node.js, MongoDB" />
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea value={proj.description || ""} onChange={(v) => { const arr = [...resume.projects]; arr[i] = { ...arr[i], description: v }; update({ projects: arr }); }} placeholder="What it does, your position, impact…" />
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
                <AddButton onClick={() => update({ projects: [...(resume.projects || []), emptyProject()] })} label="Add project" />
              </div>
  )
}

export default ProjectsSection