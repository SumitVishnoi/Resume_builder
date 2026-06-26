"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/landing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E4E4E7] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
            <FileText size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#111318]">
            Makresume
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-1.5 text-sm text-[#6B7280] hover:text-[#111318] hover:bg-[#F4F4F5] rounded-lg transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/auth/login"
            className="text-sm font-medium px-3 py-1.5 rounded-lg text-[#6B7280] hover:text-[#111318] hover:bg-[#F4F4F5] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:bg-[#6D28D9] active:scale-[0.97] transition-all shadow-sm shadow-[#7C3AED]/20"
          >
            Sign up free
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg text-[#6B7280] hover:bg-[#F4F4F5] transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E4E4E7] bg-white px-6 py-4 space-y-2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block py-2 text-sm text-[#6B7280]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <Link
              href="/auth/login"
              className="block py-2.5 text-sm font-medium text-[#6B7280] text-center border border-[#E4E4E7] rounded-xl"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="block py-2.5 px-4 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl text-center"
              onClick={() => setMobileOpen(false)}
            >
              Sign up free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}