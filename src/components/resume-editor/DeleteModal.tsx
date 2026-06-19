import { Resume } from '@/frontend/types/resume';
import { Loader2, Trash2 } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    resume: Resume
    showDeleteModal: boolean;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>; 
    handleDelete: () => Promise<void>;
    deleting: boolean;
}

const DeleteModal = ({resume, showDeleteModal, setShowDeleteModal, handleDelete, deleting}: Props) => {
  return (
    <div>
        {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-[360px] mx-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-[#111318] mb-1">Delete this resume?</h3>
            <p className="text-sm text-[#6B7280] mb-6">
              `{resume.title || "Untitled Resume"}` will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 border border-[#E4E4E7] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F4F4F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
    )}
    </div>
  )
}

export default DeleteModal