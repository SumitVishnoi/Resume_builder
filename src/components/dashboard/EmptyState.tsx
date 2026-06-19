import { FileText, Loader2, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    handleCreate: () => Promise<void>; 
    creating: boolean;
}

const EmptyState = ({handleCreate, creating}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-16 h-16 bg-[#F4F3FF] rounded-2xl flex items-center justify-center">
              <FileText size={28} className="text-[#7C3AED]" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-[#111318]">
                No resumes yet
              </p>
              <p className="text-sm text-[#9CA3AF] mt-1 max-w-xs">
                Create your first resume. We&apos;ll score it for ATS compatibility
                as you build it.
              </p>
            </div>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-60 transition-all"
            >
              {creating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Plus size={15} />
              )}
              Create my first resume
            </button>
          </div>
  )
}

export default EmptyState