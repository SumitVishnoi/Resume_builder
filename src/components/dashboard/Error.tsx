import { AlertCircle } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    fetchError: string; 
    setFetchError: Dispatch<SetStateAction<string | null>>;
    fetchResumes: () => Promise<void>; 
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const Error = ({fetchError, setFetchError, fetchResumes, setLoading}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertCircle size={22} className="text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#111318]">
                {fetchError}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Check your connection and try again
              </p>
            </div>
            <button
              onClick={() => {
                setFetchError(null);
                setLoading(true);
                fetchResumes();
              }}
              className="text-sm text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors"
            >
              Retry
            </button>
          </div>
  )
}

export default Error