"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Plus,
  Trash2,
  Building2,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/resume/SectionHeader";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
}

function EducationCard({
  edu,
  index,
  onUpdate,
  onRemove,
  showRemove,
}: {
  edu: Education;
  index: number;
  onUpdate: (k: keyof Education, v: string) => void;
  onRemove: () => void;
  showRemove: boolean;
}) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-5
        sm:p-6
        lg:p-8
        shadow-sm
        hover:shadow-xl
        hover:border-primary/30
        transition-all
        duration-300
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-primary/10
              text-primary
              flex
              items-center
              justify-center
              font-bold
              text-sm
            "
          >
            {index + 1}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Education {index + 1}
            </h3>
            <p className="text-sm text-slate-500">
              Academic qualification details
            </p>
          </div>
        </div>

        {showRemove && (
          <button
            onClick={onRemove}
            className="
              flex
              items-center
              gap-2
              text-red-500
              hover:bg-red-50
              px-3
              py-2
              rounded-xl
              transition-all
              w-fit
            "
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* School */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            School / University
          </label>

          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              value={edu.school}
              onChange={(e) => onUpdate("school", e.target.value)}
              placeholder="IIT Delhi, MIT, BITS Pilani..."
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                pl-11
                pr-4
                text-sm
                focus:outline-none
                focus:ring-4
                focus:ring-primary/10
                focus:border-primary
                transition-all
              "
            />
          </div>
        </div>

        {/* Degree */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Degree
          </label>

          <input
            value={edu.degree}
            onChange={(e) => onUpdate("degree", e.target.value)}
            placeholder="Bachelor of Technology"
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              focus:outline-none
              focus:ring-4
              focus:ring-primary/10
              focus:border-primary
            "
          />
        </div>

        {/* Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Field of Study
          </label>

          <input
            value={edu.field}
            onChange={(e) => onUpdate("field", e.target.value)}
            placeholder="Computer Science"
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              focus:outline-none
              focus:ring-4
              focus:ring-primary/10
              focus:border-primary
            "
          />
        </div>

        {/* Start Year */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Start Year
          </label>

          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              value={edu.startYear}
              onChange={(e) => onUpdate("startYear", e.target.value)}
              placeholder="2020"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                pl-11
                pr-4
                text-sm
                focus:outline-none
                focus:ring-4
                focus:ring-primary/10
                focus:border-primary
              "
            />
          </div>
        </div>

        {/* End Year */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            End Year
          </label>

          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              value={edu.endYear}
              onChange={(e) => onUpdate("endYear", e.target.value)}
              placeholder="2024 or Present"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                pl-11
                pr-4
                text-sm
                focus:outline-none
                focus:ring-4
                focus:ring-primary/10
                focus:border-primary
              "
            />
          </div>
        </div>

        {/* Grade */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Grade / CGPA
            <span className="text-slate-400 font-normal ml-1">
              (optional)
            </span>
          </label>

          <input
            value={edu.grade}
            onChange={(e) => onUpdate("grade", e.target.value)}
            placeholder="8.5 / 10 or 3.8 / 4.0"
            className="
              w-full
              h-12
              rounded-xl
              border
              border-slate-200
              px-4
              text-sm
              focus:outline-none
              focus:ring-4
              focus:ring-primary/10
              focus:border-primary
            "
          />
        </div>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      grade: "",
    },
  ]);

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        grade: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEducation = (
    id: string,
    key: keyof Education,
    value: string
  ) => {
    setEducations((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, [key]: value } : e
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-up pb-32">
      <SectionHeader
        icon={GraduationCap}
        title="Education"
        subtitle="Showcase your academic achievements and qualifications"
      />

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Academic Qualifications
          </h2>

          <p className="text-slate-500 mt-1">
            Add your schools, colleges, universities and degrees.
          </p>
        </div>

        <div
          className="
            bg-primary/5
            border
            border-primary/10
            rounded-2xl
            px-4
            py-3
            flex
            items-center
            gap-2
            w-fit
          "
        >
          <GraduationCap className="w-4 h-4 text-primary" />
          <span className="font-semibold text-primary">
            {educations.length} Entries
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {educations.map((edu, index) => (
          <EducationCard
            key={edu.id}
            edu={edu}
            index={index}
            onUpdate={(k, v) =>
              updateEducation(edu.id, k, v)
            }
            onRemove={() => removeEducation(edu.id)}
            showRemove={educations.length > 1}
          />
        ))}

        <button
          onClick={addEducation}
          className="
            w-full
            py-5
            rounded-3xl
            border-2
            border-dashed
            border-primary/30
            bg-primary/5
            hover:bg-primary/10
            hover:border-primary
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-primary
              text-white
              flex
              items-center
              justify-center
            "
          >
            <Plus className="w-5 h-5" />
          </div>

          <span className="font-semibold text-primary">
            Add Another Education
          </span>
        </button>
      </div>

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          border-t
          bg-white/80
          backdrop-blur-xl
          z-50
        "
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <Link
            href="/resume/create/skills"
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              transition-all
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <Link
            href="/resume/create/projects"
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-primary
              text-white
              shadow-lg
              hover:opacity-90
              transition-all
            "
          >
            Next: Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}