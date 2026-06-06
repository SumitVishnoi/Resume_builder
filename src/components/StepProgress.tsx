"use client";

import React from "react";
import { STEPS, useResume } from "@/context/ResumeContext";

export default function StepProgress() {
  const { currentStep, goToStep } = useResume();

  return (
    <div className="w-full animate-fade-in">
      {/* Steps */}
      <div className="flex items-center justify-center gap-0 overflow-x-auto pb-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={step.key}>
              {/* Step */}
              <button
                onClick={() => goToStep(index)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg transition-base cursor-pointer min-w-[80px]
                  ${isCurrent ? "bg-primary-50" : "hover:bg-surface-hover"}
                `}
              >
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-base
                    ${isCompleted ? "bg-primary text-white" : ""}
                    ${isCurrent ? "bg-primary text-white ring-4 ring-primary-100" : ""}
                    ${isUpcoming ? "bg-surface-alt text-text-muted border border-border" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-[11px] font-medium whitespace-nowrap transition-base
                    ${isCurrent ? "text-primary" : ""}
                    ${isCompleted ? "text-text" : ""}
                    ${isUpcoming ? "text-text-muted" : ""}
                  `}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`h-[2px] w-6 flex-shrink-0 transition-base hidden sm:block
                    ${index < currentStep ? "bg-primary" : "bg-border"}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Arrow key hint */}
      <p className="text-center text-xs text-text-muted mt-2">
        Use <kbd className="px-1.5 py-0.5 bg-surface-alt border border-border rounded text-[10px] font-mono mx-0.5">←</kbd>{" "}
        <kbd className="px-1.5 py-0.5 bg-surface-alt border border-border rounded text-[10px] font-mono mx-0.5">→</kbd>{" "}
        arrow keys to navigate between steps
      </p>
    </div>
  );
}
