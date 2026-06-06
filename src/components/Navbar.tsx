"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-base group-hover:scale-105">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-xl font-bold text-text tracking-tight">
            Resume<span className="text-primary">Forge</span>
          </span>
        </Link>

        {/* Right side */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-text hidden sm:block">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-text-secondary hover:text-text px-3 py-1.5 rounded-lg hover:bg-surface-hover transition-base cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
