"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { PersonalInfo } from "@/types/resume";

interface Props {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  const set = (key: keyof PersonalInfo) => (value: string) =>
    onChange({ ...data, [key]: value });

  return (
    <div>
      {/* <
        title="Personal information"
        description="This appears at the top of your resume — make it easy for recruiters to reach you."
      /> */}

      <div className="space-y-4">
        {/* Full name — full width, most important */}
        <Field>
          <Label>Full name</Label>
          <input
            type="text"
            value={data.fullname || ""}
            onChange={(e) => set("fullname")(e.target.value)}
            placeholder="Jane Smith"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                       text-[#111318] placeholder:text-[#C4C4CC]
                       focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                       transition-all font-medium"
          />
        </Field>

        {/* Email + Mobile */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              value={data.email || ""}
              onChange={set("email")}
              placeholder="jane@example.com"
            />
          </Field>
          <Field>
            <Label>Mobile</Label>
            <Input
              type="tel"
              value={data.mobile || ""}
              onChange={set("mobile")}
              placeholder="+1 (555) 000-0000"
            />
          </Field>
        </div>

        {/* Location */}
        <Field>
          <Label>Location</Label>
          <Input
            value={data.location || ""}
            onChange={set("location")}
            placeholder="San Francisco, CA"
          />
        </Field>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#F4F4F5]" />
          <span className="text-[10px] font-semibold text-[#C4C4CC] uppercase tracking-widest">
            Online presence
          </span>
          <div className="flex-1 h-px bg-[#F4F4F5]" />
        </div>

        {/* GitHub + LinkedIn */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <Label>GitHub</Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C4C4CC] text-xs select-none pointer-events-none">
                github.com/
              </span>
              <input
                type="text"
                value={data.githubUrl || ""}
                onChange={(e) => set("githubUrl")(e.target.value)}
                placeholder="username"
                className="w-full pl-[88px] pr-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                           text-[#111318] placeholder:text-[#C4C4CC]
                           focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                           transition-all"
              />
            </div>
          </Field>
          <Field>
            <Label>LinkedIn</Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C4C4CC] text-xs select-none pointer-events-none">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={data.linkedIn || ""}
                onChange={(e) => set("linkedIn")(e.target.value)}
                placeholder="username"
                className="w-full pl-[112px] pr-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                           text-[#111318] placeholder:text-[#C4C4CC]
                           focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                           transition-all"
              />
            </div>
          </Field>
        </div>

        {/* Portfolio */}
        <Field>
          <Label>Portfolio</Label>
          <Input
            value={data.portfolio || ""}
            onChange={set("portfolio")}
            placeholder="https://janesmith.dev"
          />
        </Field>
      </div>
    </div>
  );
}