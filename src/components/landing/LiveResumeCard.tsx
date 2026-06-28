"use client";

import { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const SKILLS = ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"];

export default function LiveResumeCard() {
  const { displayed: name, done: nameDone } = useTypewriter(
    "Jane Smith",
    65,
    900
  );
  const { displayed: role, done: roleDone } = useTypewriter(
    "Senior Full-Stack Engineer",
    48,
    nameDone ? 250 : 999999
  );
  const { displayed: summary } = useTypewriter(
    "6 years building scalable web products at funded startups. Open to remote roles.",
    20,
    roleDone ? 300 : 999999
  );

  const [visibleSkills, setVisibleSkills] = useState(0);
  useEffect(() => {
    if (!roleDone) return;
    let c = 0;
    const iv = setInterval(() => {
      c++;
      setVisibleSkills(c);
      if (c >= SKILLS.length) clearInterval(iv);
    }, 200);
    return () => clearInterval(iv);
  }, [roleDone]);

  const [ats, setAts] = useState(0);
  useEffect(() => {
    if (!roleDone) return;
    let n = 0;
    const iv = setInterval(() => {
      n += 3;
      setAts(Math.min(n, 91));
      if (n >= 91) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, [roleDone]);

  const circ = 2 * Math.PI * 18;
  const dash = (ats / 100) * circ;

  return (
    <div
      className="relative bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E4E4E7] bg-[#FAFAFA]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-[10px] font-medium text-[#9CA3AF]">
          resume-editor · Makresume
        </span>
      </div>

      <div className="p-5" style={{ fontFamily: "Georgia, serif" }}>
        {/* Name + role */}
        <div className="border-b border-[#E4E4E7] pb-3 mb-4">
          <div className="text-lg font-bold leading-tight min-h-[26px] text-[#111318]">
            {name}
            {!nameDone && (
              <span className="inline-block w-0.5 h-5 bg-[#7C3AED] ml-0.5 align-middle animate-pulse" />
            )}
          </div>
          <div className="text-[11px] text-[#7C3AED] mt-1 font-sans min-h-[16px]">
            {role}
            {nameDone && !roleDone && (
              <span className="inline-block w-0.5 h-3.5 bg-[#7C3AED] ml-0.5 align-middle animate-pulse" />
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#7C3AED] mb-1.5 font-sans">
            Profile
          </div>
          <p className="text-[11px] leading-relaxed min-h-[40px] font-sans text-[#6B7280]">
            {summary}
            {roleDone && summary.length < 80 && (
              <span className="inline-block w-0.5 h-3 bg-[#7C3AED] ml-0.5 align-middle animate-pulse" />
            )}
          </p>
        </div>

        {/* Skills */}
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#7C3AED] mb-2 font-sans">
            Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.slice(0, visibleSkills).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[9px] font-semibold border rounded-full font-sans bg-[#F4F3FF] text-[#7C3AED] border-[#DDD6FE]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ATS ring */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-0.5">
        <div className="relative w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
            <circle
              cx="20" cy="20" r="18"
              fill="none" stroke="#F4F4F5" strokeWidth="3.5"
            />
            <circle
              cx="20" cy="20" r="18"
              fill="none" stroke="#7C3AED" strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ transition: "stroke-dasharray 0.04s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#7C3AED] tabular-nums">
              {ats}
            </span>
          </div>
        </div>
        <span className="text-[8px] font-semibold uppercase tracking-wider font-sans text-[#9CA3AF]">
          ATS
        </span>
      </div>
    </div>
  );
}