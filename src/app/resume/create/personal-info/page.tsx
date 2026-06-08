"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, User, Globe, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import SectionHeader from "@/components/resume/SectionHeader";

const fields = [
  { key: "fullName", label: "Full Name", placeholder: "Alex Johnson", type: "text", required: true, icon: User, span: 2 },
  { key: "email", label: "Email", placeholder: "alex@example.com", type: "email", required: true, icon: Mail },
  { key: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel", required: true, icon: Phone },
  { key: "location", label: "Location", placeholder: "Bangalore, India", type: "text", required: true, icon: MapPin },
  { key: "jobTitle", label: "Job Title / Headline", placeholder: "Software Engineer", type: "text", required: true, icon: Briefcase, span: 2 },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/alexj", type: "url", required: false, icon: Globe },
  { key: "github", label: "GitHub", placeholder: "github.com/alexj", type: "url", required: false, icon: Globe },
  { key: "portfolio", label: "Portfolio", placeholder: "alexjohnson.dev", type: "url", required: false, icon: Globe, span: 2 },
] as const;

export default function PersonalInfoPage() {
  const [form, setForm] = useState<Record<string, string>>({
    fullName: "", email: "", phone: "", location: "",
    jobTitle: "", linkedin: "", github: "", portfolio: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="animate-fade-up">
      <SectionHeader
        icon={User}
        title="Personal Information"
        subtitle="Your contact details and professional headline"
      />

      <div className="card-base p-6 shadow-card-md">
        {/* Required fields */}
        <div className="mb-5">
          <p className="section-label">Basic Details</p>
          <div className="grid grid-cols-2 gap-4">
            {fields.filter(f => f.required).map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className={`${"span" in field && field.span === 2 ? "col-span-2" : "col-span-1"}`}>
                  <label className="field-label">
                    {field.label}
                    <span className="text-danger ml-0.5">*</span>
                  </label>
                  <div className={`relative transition-all duration-200 ${focused === field.key ? "scale-[1.005]" : ""}`}>
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Icon className={`w-4 h-4 transition-colors ${focused === field.key ? "text-primary" : "text-ink-tertiary"}`} />
                    </div>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      className="input-base pl-10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line my-5" />

        {/* Optional fields */}
        <div>
          <p className="section-label">Online Presence <span className="normal-case font-normal text-ink-tertiary ml-1">— optional</span></p>
          <div className="grid grid-cols-2 gap-4">
            {fields.filter(f => !f.required).map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className={`${"span" in field && field.span === 2 ? "col-span-2" : "col-span-1"}`}>
                  <label className="field-label text-ink-secondary">{field.label}</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Icon className="w-4 h-4 text-ink-tertiary" />
                    </div>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      className="input-base pl-10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-6">
        <Link href="/resume/create/skills" className="btn-primary">
          Next: Skills
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
