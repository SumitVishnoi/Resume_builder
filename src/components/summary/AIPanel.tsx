import { AlertCircle, Loader2, Sparkles, X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import FieldLabel from './FieldLabel'
import { EXPERIENCE_OPTIONS } from '@/lib/summary'
import AIInput from './AIInput'

type Props = {
    aiState: "open" | "loading" | "error"; 
    jobTitle: string; 
    closePanel: () => void; 
    aiError: string;

    setJobTitle: Dispatch<SetStateAction<string>>; 
    skills: string; 
    setSkills: Dispatch<SetStateAction<string>>;
    experience: string; 
    setExperience: Dispatch<SetStateAction<string>>;

    handleGenerate: () => Promise<void>
    isLoading: boolean
}

const AIPanel = ({aiState, jobTitle, closePanel, aiError, setJobTitle, skills, setSkills, setExperience, experience, isLoading, handleGenerate}: Props) => {
  return (
    <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E4E7] bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#F4F3FF] rounded-lg flex items-center justify-center">
            <Sparkles size={12} className="text-[#7C3AED]" />
          </div>
          <p className="text-sm font-semibold text-[#111318]">
            AI Summary Generator
          </p>
        </div>
        <button
          onClick={closePanel}
          className="p-1 rounded-lg text-[#C4C4CC] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Error banner */}
        {aiState === "error" && aiError && (
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
            <AlertCircle size={13} className="flex-shrink-0" />
            {aiError}
          </div>
        )}

        {/* Job title */}
        <div>
          <FieldLabel hint="required">Job title</FieldLabel>
          <AIInput
            value={jobTitle}
            onChange={setJobTitle}
            placeholder="e.g. Senior Full-Stack Engineer"
          />
        </div>

        {/* Skills */}
        <div>
          <FieldLabel hint="comma-separated">Key skills</FieldLabel>
          <AIInput
            value={skills}
            onChange={setSkills}
            placeholder="e.g. React, Node.js, PostgreSQL, AWS"
          />
        </div>

        {/* Experience level — custom select */}
        <div>
          <FieldLabel hint="required">Experience level</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setExperience(opt.value)}
                className={`relative flex flex-col items-start px-3 py-2.5 rounded-xl border text-left transition-all ${
                  experience === opt.value
                    ? "border-[#7C3AED] bg-[#F4F3FF]"
                    : "border-[#E4E4E7] bg-white hover:border-[#C4B5FD] hover:bg-[#FDFCFF]"
                }`}
              >
                {experience === opt.value && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                )}
                <span
                  className={`text-xs font-semibold leading-tight ${
                    experience === opt.value
                      ? "text-[#7C3AED]"
                      : "text-[#374151]"
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-[9px] text-[#9CA3AF] mt-0.5 leading-tight">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Generate summary
            </>
          )}
        </button>

        <p className="text-[10px] text-[#C4C4CC] text-center">
          Output appears directly in the summary field below
        </p>
      </div>
    </div>
  )
}

export default AIPanel