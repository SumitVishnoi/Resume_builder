import Link from "next/link";
import { FileText } from "lucide-react";


export default function Footer() {
  return (
    <footer className="border-t border-[#E4E4E7] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between gap-4 flex-wrap">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#7C3AED] rounded-md flex items-center justify-center">
            <FileText size={12} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-[#111318]">
            ResumeKit
          </span>
        </Link>

        <p className="text-xs text-[#9CA3AF]">
          © {new Date().getFullYear()} ResumeKit. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
