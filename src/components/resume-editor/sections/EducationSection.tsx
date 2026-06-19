"use client"

import React, { useState } from 'react'
import AddButton from '../ui/AddButton';
import Card from '../ui/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { Resume } from '@/frontend/types/resume';
import { emptyEducation } from '@/lib/resumeHelpers';

type Props = {
    resume: Resume
    update: (patch: Partial<Resume>) => void;
}

const EducationSection = ({resume, update}: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-3">
            {resume.education?.map((e, i) => {
              const open = expandedCards[e.tempId!] !== false;
              return (
                <Card key={i} onRemove={() => update({ education: resume.education.filter((_, j) => j !== i) })}>
                  <div className="flex items-center justify-between cursor-pointer pr-6" onClick={() => setExpandedCards((p) => ({ ...p, [e.tempId!]: !open }))}>
                    <p className="text-sm font-semibold text-[#111318]">
                      {e.institute || <span className="text-[#C4C4CC] font-normal italic">New education</span>}
                    </p>
                    {open ? <ChevronUp size={14} className="text-[#9CA3AF]" /> : <ChevronDown size={14} className="text-[#9CA3AF]" />}
                  </div>
                  {open && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="col-span-2">
                        <Label>institution</Label>
                        <Input value={e.institute || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], institute: v }; update({ education: arr }); }} placeholder="MIT" />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input value={e.degree || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], degree: v }; update({ education: arr }); }} placeholder="B.Sc." />
                      </div>
                      <div>
                        <Label>Field</Label>
                        <Input value={e.field || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], field: v }; update({ education: arr }); }} placeholder="Computer Science" />
                      </div>
                      <div>
                        <Label>Start Year</Label>
                        <Input value={e.startDate || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], startDate: v }; update({ education: arr }); }} placeholder="2018" />
                      </div>
                      <div>
                        <Label>End Year</Label>
                        <Input value={e.endDate || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], endDate: v }; update({ education: arr }); }} placeholder="2022" />
                      </div>
                      <div>
                        <Label>GPA</Label>
                        <Input value={e.gpa || ""} onChange={(v) => { const arr = [...resume.education]; arr[i] = { ...arr[i], gpa: v }; update({ education: arr }); }} placeholder="3.9" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
            <AddButton onClick={() => update({ education: [...(resume.education || []), emptyEducation()] })} label="Add education" />
          </div>
  )
}

export default EducationSection