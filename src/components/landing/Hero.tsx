"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import LiveResumeCard from "./LiveResumeCard";
import { TRUST_ITEMS } from "@/constants/landing";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-7 bg-[#F4F3FF] border-[#DDD6FE] text-[#7C3AED]">
              <Sparkles size={11} />
              <span className="text-[11px] font-semibold tracking-wide">
                ATS-optimised resume builder
              </span>
            </div>

            <h1
              className="text-4xl lg:text-[52px] font-bold leading-[1.06] tracking-tight mb-5 text-[#111318]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Resumes that{" "}
              <span className="text-[#7C3AED]">get you hired.</span>
            </h1>

            <p className="text-base leading-relaxed mb-8 max-w-md text-[#6B7280]">
              Build a polished, ATS-ready resume with a live preview. See your
              score update as you type — then download and apply with
              confidence.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/register"
                className="flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.97] transition-all shadow-sm shadow-[#7C3AED]/25"
              >
                Sign up free
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl border border-[#E4E4E7] text-[#6B7280] hover:bg-white hover:text-[#111318] transition-all"
              >
                Sign in
              </Link>
            </div>

            {/* Trust ticks */}
            <div className="flex items-center gap-5 mt-7 flex-wrap">
              {TRUST_ITEMS.map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-[#7C3AED]" />
                  <span className="text-xs text-[#6B7280]">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated resume card */}
          <div style={{ animation: "fadeUp 0.7s ease 0.15s both" }}>
            <LiveResumeCard />
          </div>
        </div>
      </div>
    </section>
  );
}