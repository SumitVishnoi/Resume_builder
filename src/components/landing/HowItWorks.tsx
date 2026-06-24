import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import Reveal from "./Reveal";
import { STEPS, EDITOR_TABS } from "@/constants/landing";

function Step({
  n,
  title,
  body,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white text-xs font-bold mt-0.5">
        {n}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#111318] mb-0.5">{title}</p>
        <p className="text-sm text-[#6B7280] leading-relaxed">{body}</p>
      </div>
    </Reveal>
  );
}

function EditorMockup() {
  return (
    <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-[#E4E4E7] overflow-x-auto">
        {EDITOR_TABS.map((tab, i) => (
          <span
            key={tab}
            className={`flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-lg ${
              i === 2 ? "bg-[#F4F3FF] text-[#7C3AED]" : "text-[#9CA3AF]"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Form fields */}
      <div className="p-5 space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-[#9CA3AF]">
            Position
          </p>
          <div className="px-3.5 py-2.5 text-sm rounded-xl border border-[#E4E4E7] bg-white text-[#374151]">
            Senior Engineer
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-[#9CA3AF]">
              Company
            </p>
            <div className="px-3.5 py-2.5 text-sm rounded-xl border border-[#E4E4E7] bg-white text-[#374151]">
              Acme Corp
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-[#9CA3AF]">
              Start date
            </p>
            <div className="px-3.5 py-2.5 text-sm rounded-xl border border-[#E4E4E7] bg-white text-[#374151]">
              Jan 2021
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5 text-[#9CA3AF]">
            Description
          </p>
          <div className="px-3.5 py-2.5 text-xs rounded-xl border border-[#E4E4E7] bg-white text-[#6B7280] leading-relaxed">
            • Built real-time pipeline reducing latency by 40%
            <br />
            • Led team of 5 engineers to ship v2 in 8 weeks
          </div>
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span className="text-[11px] text-emerald-600 font-medium">
              Saved
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target size={11} className="text-[#7C3AED]" />
            <span className="text-[11px] text-[#7C3AED] font-semibold">
              ATS 91/100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-[#E4E4E7] bg-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div>
            <Reveal>
              <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-3">
                How it works
              </p>
              <h2
                className="text-3xl font-bold tracking-tight mb-10 text-[#111318]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Ready to apply
                <br />
                in three steps.
              </h2>
            </Reveal>

            <div className="space-y-7">
              {STEPS.map((s, i) => (
                <Step key={s.n} {...s} delay={i * 100} />
              ))}
            </div>

            <Reveal delay={300}>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 mt-10 px-5 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.97] transition-all shadow-sm shadow-[#7C3AED]/20"
              >
                Get started free
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          {/* Editor mockup */}
          <Reveal delay={100}>
            <EditorMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}