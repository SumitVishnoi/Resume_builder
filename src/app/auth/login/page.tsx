"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { signIn } from "next-auth/react";

type FormState = "idle" | "loading" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { hydrateUser } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        await hydrateUser();
        router.push("/dashboard");
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setFormState("error");
      }
    } catch {
      setErrorMessage("Could not reach the server. Try again.");
      setFormState("error");
    }
  };

  const isLoading = formState === "loading";

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Left panel — branding */}
      <div className="hidden lg:flex w-[44%] bg-[#7C3AED] flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle background rings */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <FileText size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            Makresume
          </span>
        </div>

        {/* Center copy */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
              Welcome back
            </p>
            <h2
              className="text-white text-4xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your next role
              <br />
              starts here.
            </h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Build ATS-ready resumes with a live preview. Sign in to pick up
            where you left off.
          </p>

          {/* Floating resume card mockup */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">JS</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Jane Smith</p>
                <p className="text-white/50 text-[10px]">Senior Engineer</p>
              </div>
              <div className="ml-auto">
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/20">
                  Complete
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              {["Experience", "Education", "Skills"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="h-1.5 rounded-full bg-white/20"
                    style={{ width: `${[85, 60, 100][i]}%` }}
                  >
                    <div
                      className="h-full rounded-full bg-white/60"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span className="text-white/40 text-[10px] w-16 shrink-0">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-white/30 text-xs relative z-10">
          © 2026 Makresume. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-semibold text-[#111318] text-sm">
              Makresume
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-[#111318] tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-[#6B7280]">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>

          {/* Error banner */}
          {formState === "error" && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E4E4E7] rounded-xl text-[#111318] placeholder:text-[#C4C4CC] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                >
                  forget password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-11 text-sm bg-white border border-[#E4E4E7] rounded-xl text-[#111318] placeholder:text-[#C4C4CC] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <p className="text-center text-[11px] text-[#C4C4CC]">
              By signing in you agree to our Terms and Privacy Policy.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E4E4E7]" />
              <span className="text-xs text-[#C4C4CC] font-medium">or</span>
              <div className="flex-1 h-px bg-[#E4E4E7]" />
            </div>

            {/* OAuth — Google */}
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/google-success",
                })
              }
              type="button"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-[#E4E4E7] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F4F4F5] hover:border-[#D1D5DB] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {/* Google SVG */}
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
