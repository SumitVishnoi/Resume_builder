import { forgetStep } from "@/frontend/types/forgot-password";
import { Check } from "lucide-react";


const STEPS = [
  { n: 1, label: "Email" },
  { n: 2, label: "Verify OTP" },
  { n: 3, label: "New password" },
];

export default function StepIndicator({ current }: { current: forgetStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;

        return (
          <div key={s.n} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-[#7C3AED] text-white"
                    : active
                      ? "bg-[#7C3AED] text-white ring-4 ring-[#7C3AED]/20"
                      : "bg-[#F4F4F5] text-[#9CA3AF]"
                }`}
              >
                {done ? <Check size={13} /> : s.n}
              </div>
              <span
                className={`text-[10px] font-semibold whitespace-nowrap ${
                  active
                    ? "text-[#7C3AED]"
                    : done
                      ? "text-[#374151]"
                      : "text-[#C4C4CC]"
                }`}
              >
                {s.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-px mx-2 mb-5 transition-all duration-500 ${
                  current > s.n ? "bg-[#7C3AED]" : "bg-[#E4E4E7]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}