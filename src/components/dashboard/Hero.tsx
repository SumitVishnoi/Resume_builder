import { Resume } from '@/frontend/types/resume';
import { Loader2, Plus } from 'lucide-react'
import React from 'react'

type Props = {
     resumes: Resume[]; 
     creating: boolean; 
     handleCreate: () => Promise<void>;
     loading: boolean;
     readyCount: number;
}

const Hero = ({resumes, creating, handleCreate, loading, readyCount}: Props) => {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-2">
              Dashboard
            </p>
            <h1
              className="text-3xl font-bold text-[#111318] tracking-tight leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your resumes
            </h1>
            <p className="text-sm text-[#6B7280] mt-1.5">
              {loading
                ? "Loading…"
                : resumes.length === 0
                  ? "No resumes yet — create your first one."
                  : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""} · ${readyCount} ATS-ready`}
            </p>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-60 transition-all shadow-sm shadow-[#7C3AED]/20 whitespace-nowrap"
          >
            {creating ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={15} />
            )}
            {creating ? "Creating…" : "New resume"}
          </button>
        </div>
  )
}

export default Hero