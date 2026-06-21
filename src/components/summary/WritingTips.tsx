import React from 'react'

const WritingTips = () => {
  return (
    <div className="bg-[#F4F3FF] border border-[#EDE9FE] rounded-xl p-3.5 space-y-2">
          <p className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-widest">
            Tips for a strong summary
          </p>
          <ul className="space-y-1.5">
            {[
              "Open with your job title and years of experience",
              "Name 2–3 of your strongest, most relevant skills",
              "Add one concrete achievement or metric if possible",
              "Close with the type of role or impact you're seeking",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#6B7280]">
                <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-white border border-[#DDD6FE] flex items-center justify-center flex-shrink-0 text-[8px] font-bold text-[#7C3AED]">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default WritingTips