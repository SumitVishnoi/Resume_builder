"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  otp: string;
}

function strengthMeta(p: string): {
  pct: number;
  label: string;
  color: string;
} {
  if (p.length === 0) return { pct: 0, label: "", color: "" };
  if (p.length < 6) return { pct: 20, label: "Too short", color: "#EF4444" };
  if (p.length < 8) return { pct: 45, label: "Weak", color: "#F59E0B" };
  const strong = /[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p);
  if (strong) return { pct: 100, label: "Strong", color: "#10B981" };
  return { pct: 70, label: "Good", color: "#7C3AED" };
}

export default function StepNewPassword({ email, otp }: Props) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { pct, label, color } = strengthMeta(newPassword);
  const mismatch = confirm.length > 0 && newPassword !== confirm;
  const canSubmit =
    newPassword.length >= 6 && newPassword === confirm && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/auth/login"), 2200);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto">
          <CheckCircle2 size={26} className="text-emerald-500" />
        </div>
        <div>
          <h2
            className="text-xl font-bold text-[#111318] tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Password reset!
          </h2>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Your password has been updated. Redirecting you to sign in…
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
          <Loader2 size={12} className="animate-spin" />
          Redirecting…
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="w-11 h-11 bg-[#F4F3FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <KeyRound size={20} className="text-[#7C3AED]" />
        </div>
        <h1
          className="text-xl font-bold text-[#111318] tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Set new password
        </h1>
        <p className="text-sm text-[#6B7280]">
          Choose something strong and memorable.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
            New password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
              disabled={loading}
              className="w-full px-4 py-3 pr-11 text-sm bg-white border border-[#E4E4E7] rounded-xl
                         text-[#111318] placeholder:text-[#C4C4CC]
                         focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Strength bar */}
          {newPassword.length > 0 && (
            <div className="space-y-1 pt-0.5">
              <div className="h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-400"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
              <p className="text-[10px] font-semibold" style={{ color }}>
                {label}
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              required
              disabled={loading}
              className={`w-full px-4 py-3 pr-11 text-sm bg-white border rounded-xl
                         text-[#111318] placeholder:text-[#C4C4CC]
                         focus:outline-none focus:ring-2 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${
                           mismatch
                             ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                             : confirm && !mismatch
                               ? "border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100"
                               : "border-[#E4E4E7] focus:border-[#7C3AED] focus:ring-[#7C3AED]/10"
                         }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {mismatch && (
            <p className="text-[11px] text-red-500 font-medium">
              Passwords don't match
            </p>
          )}
          {confirm && !mismatch && (
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={11} /> Passwords match
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#7C3AED] text-white
                     text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Resetting…
            </>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
}
