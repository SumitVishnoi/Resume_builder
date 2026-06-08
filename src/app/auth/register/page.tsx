"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Zap, ArrowRight, Check } from "lucide-react";

const steps = [
  { num: "01", title: "Create Account", desc: "Just your name, email & password" },
  { num: "02", title: "Fill Your Details", desc: "AI helps you write every section" },
  { num: "03", title: "Download & Apply", desc: "ATS-ready PDF in one click" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-danger", "bg-warn", "bg-ok"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative w-full max-w-[380px] animate-fade-up">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-btn-primary">
              <Zap className="w-[18px] h-[18px] text-white fill-white" strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-bold text-ink tracking-tight">ResumeAI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-ink tracking-tight leading-tight mb-2">
              Create your account
            </h1>
            <p className="text-ink-secondary text-sm">
              Free forever. No credit card required.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="field-label">Full name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Alex Johnson" className="input-base" />
            </div>

            <div>
              <label className="field-label">Email address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com" className="input-base" />
            </div>

            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters" className="input-base pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink-secondary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-line"}`} />
                    ))}
                  </div>
                  <span className={`text-[11px] font-semibold ${passwordStrength === 1 ? "text-danger" : passwordStrength === 2 ? "text-warn" : "text-ok"}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-ink-tertiary leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <button className="btn-primary w-full py-3 text-[15px]">
              Create free account
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-line" />
              <span className="text-xs text-ink-tertiary font-medium">or</span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <button className="btn-secondary w-full py-2.5">
              <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-ink-secondary mt-8">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-bold text-primary hover:text-primary-hover transition-colors underline underline-offset-2 decoration-primary/30">
              Sign in →
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex w-[480px] xl:w-[520px] shrink-0 relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 flex flex-col justify-center p-10 w-full">
          <div className="mb-10">
            <h2 className="text-[30px] font-bold text-white leading-tight tracking-tight mb-3">
              3 steps to your<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #93C5FD)" }}>
                perfect resume
              </span>
            </h2>
            <p className="text-white/50 text-sm">Everything you need, nothing you don&apos;t.</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${i === 0 ? "bg-white/12 border-white/20" : "bg-white/4 border-white/8"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-primary text-white shadow-btn-primary" : "bg-white/10 text-white/60"}`}>
                  {i === 0 ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${i === 0 ? "text-white" : "text-white/70"}`}>{step.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-ok/20 border border-ok/30 flex items-center justify-center text-xs font-bold text-ok shrink-0">
                JP
              </div>
              <div>
                <p className="text-white/75 text-sm leading-relaxed italic">
                  &ldquo;Landed a senior role at a top startup after using ResumeAI. The AI content is genuinely impressive.&rdquo;
                </p>
                <div className="text-xs text-white/40 mt-2">Jaspreet P. · Senior Dev · Remote</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}