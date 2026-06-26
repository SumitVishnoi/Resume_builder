"use client"

import { FileText, LogOut } from 'lucide-react'
import React from 'react'

type Props = {
  signOut: () => Promise<void>;
}

const Navbar = ({signOut}: Props) => {
  
  return (
    <header className="bg-white border-b border-[#E4E4E7] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-semibold text-[#111318] text-sm tracking-tight">
              Makresume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={signOut} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F4F4F5] transition-colors">
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
  )
}

export default Navbar
