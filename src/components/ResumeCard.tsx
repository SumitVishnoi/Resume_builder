"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
  onDelete: (id: string) => void;
}

export default function ResumeCard({ id, title, updatedAt, onDelete }: ResumeCardProps) {
  const router = useRouter();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Edited today";
    if (diffDays === 1) return "Edited yesterday";
    if (diffDays < 7) return `Edited ${diffDays} days ago`;
    return `Edited ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  return (
    <div className="group bg-white border border-border rounded-lg hover:shadow-lg hover:border-primary-200 transition-base animate-fade-in">
      {/* Preview thumbnail */}
      <div
        className="h-40 bg-surface-alt border-b border-border rounded-t-lg flex items-center justify-center cursor-pointer"
        onClick={() => router.push(`/resume/${id}/preview`)}
      >
        <div className="w-20 h-28 bg-white border border-border-dark rounded shadow-sm flex flex-col items-center justify-center gap-1.5 p-2">
          <div className="w-full h-1.5 bg-primary rounded-full" />
          <div className="w-full h-1 bg-border rounded-full" />
          <div className="w-3/4 h-1 bg-border rounded-full" />
          <div className="w-full h-1 bg-border rounded-full" />
          <div className="w-2/3 h-1 bg-border rounded-full" />
          <div className="w-full h-1 bg-border rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text text-sm truncate">
          {title || "Untitled Resume"}
        </h3>
        <p className="text-xs text-text-muted mt-1">{formatDate(updatedAt)}</p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={() => router.push(`/resume/${id}/edit`)}
            className="flex-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-base cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => router.push(`/resume/${id}/preview`)}
            className="flex-1 px-3 py-1.5 border border-border text-text text-xs font-medium rounded-lg hover:bg-surface-hover transition-base cursor-pointer"
          >
            Preview
          </button>
          <button
            onClick={() => onDelete(id)}
            className="px-2 py-1.5 border border-border text-text-muted text-xs rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-danger transition-base cursor-pointer"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
