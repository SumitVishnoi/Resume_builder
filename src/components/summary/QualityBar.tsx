import { qualityMeta, wordCount } from '@/lib/summary'
import React from 'react'

type Props = {
    summary: string;
}

  


const QualityBar = ({summary}: Props) => {
    const { pct, label, color } = qualityMeta(summary);
    
  return (
    <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
              Quality
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#C4C4CC]">
                {wordCount(summary)} words
              </span>
              {label && (
                <span
                  className="text-[10px] font-semibold"
                  style={{ color }}
                >
                  {label}
                </span>
              )}
            </div>
          </div>
          <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: color }}
            />
          </div>
        </div>
  )
}

export default QualityBar