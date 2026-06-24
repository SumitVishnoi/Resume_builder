"use client";

import { AI_FEATURE } from "@/constants/landing";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

export default function AIFeatureCard() {
  const { icon: Icon, title, badge, body, bullets } = AI_FEATURE;

  return (
    <Reveal>
      <div
        className="relative bg-white border border-[#DDD6FE] rounded-2xl overflow-hidden
                      hover:border-[#7C3AED]/60 hover:shadow-[0_8px_32px_rgba(124,58,237,0.10)]
                      transition-all duration-300 group"
      >
        {/* Subtle top-left violet gradient */}
        <div
          className="absolute top-0 left-0 w-64 h-32 opacity-[0.06] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, #7C3AED 0%, transparent 70%)",
          }}
        />

        <div className="relative p-6 sm:p-8 grid sm:grid-cols-2 gap-8 items-center">
          {/* Left — title + body */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] group-hover:bg-[#EDE9FE] flex items-center justify-center transition-colors flex-shrink-0">
                <Icon size={17} className="text-[#7C3AED]" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#111318] tracking-tight">
                  {title}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#7C3AED] text-white rounded-full">
                  {badge}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#6B7280] leading-relaxed">{body}</p>
          </div>

          {/* Right — bullet list */}
          <ul className="space-y-2.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={14}
                  className="text-[#7C3AED] flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-[#374151] leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
