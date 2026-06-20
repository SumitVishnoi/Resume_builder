"use client";

import { Resume } from "@/frontend/types/resume";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

export const useDashboard = () => {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

   const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch("/api/resume", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setResumes(data.data.resumes ?? data.data.resume ?? []);
      } else {
        setFetchError(data.message || "Failed to load resumes");
      }
    } catch {
      setFetchError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/resume/create", { method: "POST" });
      const data = await res.json();
      const newResume = data.data?.resume;
      if (newResume?._id) {
        router.push(`/resume/${newResume._id}`);
      } else {
        showToast("Could not create resume", "err");
        setCreating(false);
      }
    } catch {
      showToast("Could not reach the server", "err");
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/resume/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setResumes((prev) => prev.filter((r) => r._id !== deleteTarget._id));
        showToast("Resume deleted");
      } else {
        showToast(data.message || "Delete failed", "err");
      }
    } catch {
      showToast("Could not reach the server", "err");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleDownload = async (resume: Resume) => {
    setDownloadingId(resume._id);
    try {
      const res = await fetch(`/api/resume/${resume._id}/download`, {
        method: "GET",
      });

      if (!res.ok) {
        showToast("Download failed — try again", "err");
        return;
      }

      const contentType = res.headers.get("content-type") || "";

      // If API returns raw PDF bytes
      if (contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${resume.title || "resume"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Download started");
        return;
      }

      // If API returns JSON with a signed URL
      const data = await res.json();
      if (data.success && data.data?.url) {
        const a = document.createElement("a");
        a.href = data.data.url;
        a.download = `${resume.title || "resume"}.pdf`;
        a.target = "_blank";
        a.click();
        showToast("Download started");
        return;
      }

      showToast(data.message || "Download failed", "err");
    } catch {
      showToast("Could not reach the server", "err");
    } finally {
      setDownloadingId(null);
    }
  };

  useEffect(() => {
    fetchResumes(); // eslint error
  }, [fetchResumes]);

  return {
    resumes,
    fetchError,
    setFetchError,
    loading,
    setLoading,
    fetchResumes,
    creating,
    toast,
    handleCreate,
    deleting,
    handleDelete,
    downloadingId,
    handleDownload,
    deleteTarget,
    setDeleteTarget
  };
};
