import React from 'react'

interface Props {
    hint: string;
    children: React.ReactNode
}

export default function FieldLabel({children, hint}: Props) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
        {children}
      </label>
      {hint && <span className="text-[10px] text-[#C4C4CC]">{hint}</span>}
    </div>
  );
}