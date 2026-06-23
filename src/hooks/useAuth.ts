"use client"


import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuth = ()=> {
  
  const router = useRouter()

const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);


const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

const handleLogout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.success) {
      showToast(data.message, "ok");
      router.push("/auth/login");
    } else {
      showToast(data.message, "err");
    }
  } catch {
    showToast("Could not reach the server", "err");
  }
};
  return {
    toast,
    handleLogout
  }
}