"use client"

import React from 'react'
import Card from '../ui/Card';
import Input from '../ui/Input';
import Label from '../ui/Label';
import AddButton from '../ui/AddButton';
import { Resume } from '@/frontend/types/resume';
import { emptyCert } from '@/lib/resumeHelpers';

type Props = {
    resume: Resume;
    update: (patch: Partial<Resume>) => void;
}

const CertificationsSection = ({resume, update}: Props) => {
  return (
    <div className="space-y-3">
            {resume.certification?.map((c, i) => (
              <Card key={i} onRemove={() => update({ certification: resume.certification.filter((_, j) => j !== i) })}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>Certification Name</Label>
                    <Input value={c.name || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], name: v }; update({ certification: arr }); }} placeholder="AWS Solutions Architect" />
                  </div>
                  <div>
                    <Label>Issuer</Label>
                    <Input value={c.issuer || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], issuer: v }; update({ certification: arr }); }} placeholder="Amazon" />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input value={c.year || ""} onChange={(v) => { const arr = [...resume.certification]; arr[i] = { ...arr[i], year: v }; update({ certification: arr }); }} placeholder="2024" />
                  </div>
                </div>
              </Card>
            ))}
            <AddButton onClick={() => update({ certification: [...(resume.certification || []), emptyCert()] })} label="Add certification" />
          </div>
  )
}

export default CertificationsSection