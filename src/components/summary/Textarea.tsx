import { Resume } from '@/frontend/types/resume';
import { MAX_CHARS } from '@/lib/summary';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    justGenerated: boolean; 
    setJustGenerated: Dispatch<SetStateAction<boolean>>; 
    update: (patch: Partial<Resume>) => void; 
    summary: string; 
    remaining: number;
}

const Textarea = ({justGenerated, setJustGenerated, update, summary, remaining}: Props) => {
  return (
    <div className="relative">
        {/* "Just generated" flash overlay */}
        {justGenerated && (
          <div className="absolute inset-0 rounded-xl border-2 border-[#7C3AED] pointer-events-none z-10 animate-pulse" />
        )}

        <textarea
          value={summary}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              update({ summary: e.target.value });
              setJustGenerated(false);
            }
          }}
          placeholder="Write your professional summary here, or click 'AI Write' above to generate one…"
          rows={7}
          className="w-full px-3.5 py-3 text-sm bg-white border border-[#E4E4E7] rounded-xl
                     text-[#111318] placeholder:text-[#C4C4CC] resize-none leading-relaxed
                     focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                     transition-all"
        />

        {/* Char counter */}
        <span
          className={`absolute bottom-3 right-3.5 text-[10px] font-medium tabular-nums pointer-events-none ${
            remaining < 60 ? "text-amber-500" : "text-[#C4C4CC]"
          }`}
        >
          {remaining}
        </span>
      </div>
  )
}

export default Textarea