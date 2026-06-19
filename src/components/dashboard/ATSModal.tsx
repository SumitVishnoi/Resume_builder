import { Resume } from "@/frontend/types/resume";
import { atsLabel, calcATS } from "@/lib/ats";
import { CheckCircle2, Circle, Target, X } from "lucide-react";

export default function ATSModal({
  resume,
  onClose,
}: {
  resume: Resume;
  onClose: () => void;
}) {
  const { total, items } = calcATS(resume);
  const { label, color, bg } = atsLabel(total);
  const maxPoints = items.reduce((s, i) => s + i.points, 0);
  const circumference = 2 * Math.PI * 36;
  const dash = (total / maxPoints) * circumference;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F4F4F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F4F3FF] rounded-lg flex items-center justify-center">
              <Target size={15} className="text-[#7C3AED]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111318]">
                ATS Score
              </h2>
              <p className="text-[11px] text-[#9CA3AF]">
                {resume.title || "Untitled resume"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C4C4CC] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Score ring */}
        <div className="flex flex-col items-center py-7 border-b border-[#F4F4F5]">
          <div className="relative w-24 h-24">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              className="-rotate-90"
            >
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke="#F4F4F5"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color }}
              >
                {total}
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-medium">
                / {maxPoints}
              </span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                color,
                backgroundColor: bg,
                borderColor: color + "33",
              }}
            >
              {label}
            </span>
            <p className="text-xs text-[#9CA3AF] mt-2 max-w-[240px]">
              {total >= 85
                ? "Your resume is highly optimised for ATS parsers."
                : total >= 65
                  ? "Good shape — fill the missing fields to push higher."
                  : "Complete the checklist below to improve your score."}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="px-6 py-4 space-y-2 max-h-64 overflow-y-auto">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">
            Checklist
          </p>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2.5">
                {item.met ? (
                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle size={14} className="text-[#E4E4E7] flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${item.met ? "text-[#374151]" : "text-[#9CA3AF]"}`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold tabular-nums ${
                  item.met ? "text-emerald-600" : "text-[#C4C4CC]"
                }`}
              >
                {item.earned}/{item.points}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}