import { Resume } from '@/frontend/types/resume'
import { atsLabel } from '@/lib/ats'
import { CheckCircle2, FileText, Target, TrendingUp } from 'lucide-react'
import React from 'react'

type Props = {
    resumes: Resume[];
    avgATS: number;
    highScore: number;
    readyCount: number;
}

const StatsStrip = ({resumes, avgATS, highScore, readyCount}: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Total resumes",
                value: resumes.length,
                icon: FileText,
                iconColor: "#7C3AED",
                iconBg: "#F4F3FF",
              },
              {
                label: "Avg ATS score",
                value: `${avgATS}`,
                icon: Target,
                iconColor: atsLabel(avgATS).color,
                iconBg: atsLabel(avgATS).bg,
              },
              {
                label: "Best score",
                value: `${highScore}`,
                icon: TrendingUp,
                iconColor: atsLabel(highScore).color,
                iconBg: atsLabel(highScore).bg,
              },
              {
                label: "ATS ready",
                value: readyCount,
                icon: CheckCircle2,
                iconColor: "#10B981",
                iconBg: "#ECFDF5",
              },
            ].map(({ label, value, icon: Icon, iconColor, iconBg }) => (
              <div
                key={label}
                className="bg-white border border-[#E4E4E7] rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon size={15} style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-xl font-bold text-[#111318] tracking-tight">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
  )
}

export default StatsStrip