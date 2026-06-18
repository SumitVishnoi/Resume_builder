import React from 'react'
import Input from '../ui/Input'
import Label from '../ui/Label'
import { Resume } from '@/frontend/types/resume';

type Props = {
    update: (patch: Partial<Resume>) => void;
    resume: Resume;
}

const PersonalSection = ({update, resume}: Props) => {
  return (
    <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                    type="text"
                      value={resume.personalInfo?.fullname || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, fullname: v } })
                      }
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={resume.personalInfo?.email || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, email: v } })
                      }
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={resume.personalInfo?.mobile || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, mobile: v } })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={resume.personalInfo?.location || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, location: v } })
                      }
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label>linkedIn</Label>
                    <Input
                      value={resume.personalInfo?.linkedIn || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, linkedIn: v } })
                      }
                      placeholder="linkedIn.com/in/jane"
                    />
                  </div>
                  <div>
                    <Label>website</Label>
                    <Input
                      value={resume.personalInfo?.githubUrl || ""}
                      onChange={(v) =>
                        update({ personalInfo: { ...resume.personalInfo, githubUrl: v } })
                      }
                      placeholder="janesmith.dev"
                    />
                  </div>
                </div>
                <div>
                  <Label>Resume Title</Label>
                  <Input
                    value={resume.title || ""}
                    onChange={(v) => update({ title: v })}
                    placeholder="e.g. Software Engineer — Google"
                  />
                </div>
              </div>
  )
}

export default PersonalSection