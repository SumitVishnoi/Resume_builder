import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Subtle violet glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 opacity-[0.07] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, #7C3AED 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-4">
                Start today
              </p>
              <h2
                className="text-3xl font-bold tracking-tight mb-4 text-[#111318]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your next role starts
                <br />
                with a great resume.
              </h2>
              <p className="text-sm mb-8 max-w-sm mx-auto leading-relaxed text-[#6B7280]">
                Free to create. No credit card. Takes two minutes to build your
                first resume.
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/auth/register"
                  className="flex items-center gap-2 px-7 py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.97] transition-all shadow-sm shadow-[#7C3AED]/25"
                >
                  Sign up free
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-xl border border-[#E4E4E7] text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111318] transition-all"
                >
                  I have an account
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
