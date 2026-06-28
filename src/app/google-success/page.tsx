"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { FileText } from "lucide-react";

type Stage = "connecting" | "verifying" | "finalizing" | "redirecting" | "error";

const STAGES: { key: Stage; label: string }[] = [
  { key: "connecting",  label: "Connecting to Google…"   },
  { key: "verifying",   label: "Verifying your account…" },
  { key: "finalizing",  label: "Setting up your session…"},
  { key: "redirecting", label: "Taking you to your dashboard…" },
];

export default function GoogleSuccessPage() {
  const { data: session, status } = useSession();
  const { hydrateUser } = useAuthContext();
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("connecting");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (status === "loading") return;

      if (status !== "authenticated") {
        setStage("error");
        setErrorMsg("Authentication failed. Please try again.");
        return;
      }

      try {
        setStage("verifying");

        const res = await fetch("/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          setStage("error");
          setErrorMsg(data.message || "Something went wrong.");
          await signOut({ redirect: false });
          return;
        }

        setStage("finalizing");
        await hydrateUser();
        await signOut({ redirect: false });

        setStage("redirecting");
        // Small pause so the user sees the final stage flash
        await new Promise((r) => setTimeout(r, 600));

        router.replace("/dashboard");
      } catch (err) {
        console.error(err);
        setStage("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    };

    handleGoogleLogin();
  }, [status, session, hydrateUser, router]);

  // ── Error state ──────────────────────────────────────────────────────────

  if (stage === "error") {
    return (
      <div
        className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="w-full max-w-sm text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-[#111318] tracking-tight">
              Makresume
            </span>
          </div>

          {/* Error card */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-8 shadow-sm space-y-4">
            {/* Red X icon */}
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
              <svg
                width="22" height="22" viewBox="0 0 22 22"
                fill="none" stroke="#EF4444" strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="17" y2="17" />
                <line x1="17" y1="5" x2="5" y2="17" />
              </svg>
            </div>

            <div>
              <p className="text-base font-semibold text-[#111318]">
                Sign-in failed
              </p>
              <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">
                {errorMsg}
              </p>
            </div>

            <a
              href="/login"
              className="block w-full py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] transition-all text-center"
            >
              Back to sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading state ────────────────────────────────────────────────────────

  const currentIdx = STAGES.findIndex((s) => s.key === stage);

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
            <FileText size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-[#111318] tracking-tight">
            Makresume
          </span>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E4E4E7] rounded-2xl p-8 shadow-sm space-y-7">
          {/* Spinner + Google logo */}
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16">
              {/* Spinning ring */}
              <svg
                className="absolute inset-0 animate-spin"
                width="64" height="64" viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32" cy="32" r="28"
                  stroke="#E4E4E7" strokeWidth="4"
                />
                <circle
                  cx="32" cy="32" r="28"
                  stroke="#7C3AED" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="44 132"
                />
              </svg>

              {/* Google G in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Current stage label */}
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-[#111318]">
              {STAGES[currentIdx]?.label ?? "Please wait…"}
            </p>
            <p className="text-xs text-[#9CA3AF]">
              This only takes a moment
            </p>
          </div>

          {/* Stage progress steps */}
          <div className="space-y-2.5">
            {STAGES.map((s, i) => {
              const done    = i < currentIdx;
              const active  = i === currentIdx;
              const pending = i > currentIdx;

              return (
                <div key={s.key} className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      done
                        ? "bg-[#7C3AED]"
                        : active
                          ? "bg-[#F4F3FF] border-2 border-[#7C3AED]"
                          : "bg-[#F4F4F5]"
                    }`}
                  >
                    {done ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1.5 5 4 7.5 8.5 2.5" />
                      </svg>
                    ) : active ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4C4CC]" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs transition-colors duration-300 ${
                      done
                        ? "text-[#374151] font-medium"
                        : active
                          ? "text-[#7C3AED] font-semibold"
                          : "text-[#C4C4CC]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-[#C4C4CC]">
          Secured by Google OAuth · Makresume never stores your Google password
        </p>
      </div>
    </div>
  );
}