"use client";

import React from "react";
import FormInput from "@/components/FormInput";
import { useResume } from "@/context/ResumeContext";

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const info = resumeData.personalInfo;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text">Personal Information</h2>
        <p className="text-sm text-text-secondary mt-1">Add your contact details so employers can reach you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          id="fullname"
          placeholder="John Doe"
          value={info.fullname}
          onChange={(val) => updatePersonalInfo("fullname", val)}
        />
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="john@example.com"
          value={info.email}
          onChange={(val) => updatePersonalInfo("email", val)}
        />
        <FormInput
          label="Mobile Number"
          id="mobile"
          type="tel"
          placeholder="+91 9876543210"
          value={info.mobile}
          onChange={(val) => updatePersonalInfo("mobile", val)}
        />
        <FormInput
          label="Location"
          id="location"
          placeholder="Mumbai, India"
          value={info.location}
          onChange={(val) => updatePersonalInfo("location", val)}
        />
        <FormInput
          label="GitHub URL"
          id="githubUrl"
          type="url"
          placeholder="https://github.com/johndoe"
          value={info.githubUrl}
          onChange={(val) => updatePersonalInfo("githubUrl", val)}
        />
        <FormInput
          label="LinkedIn URL"
          id="linkedIn"
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
          value={info.linkedIn}
          onChange={(val) => updatePersonalInfo("linkedIn", val)}
        />
        <FormInput
          label="Portfolio URL"
          id="portfolio"
          type="url"
          placeholder="https://johndoe.dev"
          value={info.portfolio}
          onChange={(val) => updatePersonalInfo("portfolio", val)}
        />
      </div>
    </div>
  );
}
