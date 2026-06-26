"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  email: string;
  onSuccess: (email: string) => void;
}

export default function StepEmail({ email: initialEmail, onSuccess }: Props) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(email);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="w-11 h-11 bg-[#F4F3FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail size={20} className="text-[#7C3AED]" />
        </div>
        <h1
          className="text-xl font-bold text-[#111318] tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Forgot your password?
        </h1>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Enter the email address on your account and we'll send you a one-time
          code.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            disabled={loading}
            className="w-full px-4 py-3 text-sm bg-white border border-[#E4E4E7] rounded-xl
                       text-[#111318] placeholder:text-[#C4C4CC]
                       focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#7C3AED] text-white
                     text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending code…
            </>
          ) : (
            <>
              Send code
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-[#9CA3AF]">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
