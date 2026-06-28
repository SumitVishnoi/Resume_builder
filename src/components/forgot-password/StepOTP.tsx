"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { ArrowRight, Loader2, ShieldCheck, AlertCircle, RotateCcw } from "lucide-react";
import useCountdown from "@/hooks/useCountdown";



interface Props {
  email: string;
  onSuccess: (otp: string) => void;
}

const OTP_LENGTH = 6;

export default function StepOTP({ email, onSuccess }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { remaining, start, active } = useCountdown(60);

  // Start countdown on mount
  useEffect(() => { start(); }, []);

  // Focus first input on mount
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const otp = digits.join("");
  const isFilled = otp.length === OTP_LENGTH && digits.every((d) => d !== "");

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    setError("");

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    // Focus last filled or next empty
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleVerify = async () => {
    if (!isFilled) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(otp);
      } else {
        setError(data.message || "Invalid or expired OTP.");
        setDigits(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setDigits(Array(OTP_LENGTH).fill(""));

    try {
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        start();
        inputRefs.current[0]?.focus();
      } else {
        setError(data.message || "Failed to resend. Try again.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="w-11 h-11 bg-[#F4F3FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={20} className="text-[#7C3AED]" />
        </div>
        <h1
          className="text-xl font-bold text-[#111318] tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Check your email
        </h1>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-[#111318]">{email}</span>.
          <br />
          It expires in 10 minutes.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* OTP input boxes */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest mb-3 text-center">
          Enter 6-digit code
        </label>
        <div className="flex items-center justify-center gap-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={loading}
              className={`w-11 h-12 text-center text-lg font-bold border rounded-xl
                         text-[#111318] bg-white transition-all duration-200
                         focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${digit ? "border-[#7C3AED] bg-[#F4F3FF]" : "border-[#E4E4E7]"}`}
            />
          ))}
        </div>
      </div>

      {/* Verify button */}
      <button
        onClick={handleVerify}
        disabled={!isFilled || loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#7C3AED] text-white
                   text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Verifying…
          </>
        ) : (
          <>
            Verify code
            <ArrowRight size={14} />
          </>
        )}
      </button>

      {/* Resend */}
      <div className="text-center">
        {active ? (
          <p className="text-xs text-[#9CA3AF]">
            Resend code in{" "}
            <span className="font-semibold text-[#6B7280] tabular-nums">
              {remaining}s
            </span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 text-xs text-[#7C3AED] font-medium
                       hover:text-[#6D28D9] disabled:opacity-50 transition-colors"
          >
            {resending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <RotateCcw size={12} />
            )}
            {resending ? "Resending…" : "Resend code"}
          </button>
        )}
      </div>
    </div>
  );
}