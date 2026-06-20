import React, { Dispatch, SetStateAction } from 'react'
import ResumeCard from './ResumeCard'
import { ChevronRight, Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Resume } from '@/frontend/types/resume'

type Props = {
    creating: boolean;
    handleCreate: () => Promise<void>;
    handleDownload: (resume: Resume) => Promise<void>; 
    resumes: Resume[]; 
    setDeleteTarget: Dispatch<SetStateAction<Resume | null>>; 
    setAtsTarget: Dispatch<SetStateAction<Resume | null>>;
    downloadingId: string | null;
}

const Grid = ({creating, handleCreate, resumes, handleDownload, setDeleteTarget, setAtsTarget, downloadingId}: Props) => {
    const router = useRouter()
  return (
    <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                All resumes
              </h2>
              <button className="text-xs text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 transition-colors">
                Sort by recent <ChevronRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* New resume card */}
              <button
                onClick={handleCreate}
                disabled={creating}
                className="group min-h-[300px] border-2 border-dashed border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#7C3AED] hover:bg-[#F4F3FF]/50 disabled:opacity-50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] group-hover:bg-[#EDE9FE] flex items-center justify-center transition-colors">
                  {creating ? (
                    <Loader2
                      size={18}
                      className="text-[#7C3AED] animate-spin"
                    />
                  ) : (
                    <Plus
                      size={18}
                      className="text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors"
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#6B7280] group-hover:text-[#7C3AED] transition-colors">
                    New resume
                  </p>
                  <p className="text-xs text-[#C4C4CC] mt-0.5">
                    Start from scratch
                  </p>
                </div>
              </button>

              {/* Resume cards */}
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onOpen={() => router.push(`/resume/${resume._id}`)}
                  onDelete={() => setDeleteTarget(resume)}
                  onATS={() => setAtsTarget(resume)}
                  onDownload={() => handleDownload(resume)}
                  downloading={downloadingId === resume._id}
                />
              ))}
            </div>
          </div>
  )
}

export default Grid