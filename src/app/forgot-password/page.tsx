"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import StepIndicator from "@/components/forgot-password/StepIndicator";
import StepEmail from "@/components/forgot-password/StepEmail";
import StepOTP from "@/components/forgot-password/StepOTP";
import StepNewPassword from "@/components/forgot-password/StepNewPassword";
import { ForgotState } from "@/frontend/types/forgot-password";


export default function ForgotPasswordPage() {
  const [state, setState] = useState<ForgotState>({
    step: 1,
    email: "",
    otp: "",
  });

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex flex-col"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Minimal nav */}
      <header className="border-b border-[#E4E4E7] bg-white">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#111318]">
              Makresume
            </span>
          </Link>

          <Link
            href="/login"
            className="text-sm text-[#6B7280] hover:text-[#111318] transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </header>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          {/* Step indicator */}
          <StepIndicator current={state.step} />

          {/* Card shell */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-8 shadow-sm">
            {state.step === 1 && (
              <StepEmail
                email={state.email}
                onSuccess={(email) =>
                  setState({ ...state, step: 2, email })
                }
              />
            )}

            {state.step === 2 && (
              <StepOTP
                email={state.email}
                onSuccess={(otp) =>
                  setState({ ...state, step: 3, otp })
                }
              />
            )}

            {state.step === 3 && (
              <StepNewPassword
                email={state.email}
                otp={state.otp}
              />
            )}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`rounded-full transition-all duration-300 ${
                  n === state.step
                    ? "w-4 h-1.5 bg-[#7C3AED]"
                    : n < state.step
                      ? "w-1.5 h-1.5 bg-[#7C3AED]/40"
                      : "w-1.5 h-1.5 bg-[#E4E4E7]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}