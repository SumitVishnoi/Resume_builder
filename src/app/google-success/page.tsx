"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function GoogleSuccessPage() {
  const { data: session, status } = useSession();
  const { hydrateUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      // Wait until NextAuth finishes authentication
      if (status !== "authenticated") return;

      try {
        const res = await fetch("/api/auth/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          alert(data.message);
          router.replace("/auth/login");
          return;
        }

        // Fetch user from your JWT cookie
        await hydrateUser();

        // Remove NextAuth session (optional but recommended if you're only using it for OAuth)
        await signOut({
          redirect: false,
        });

        router.replace("/dashboard");
      } catch (error) {
        console.error(error);
        router.replace("/auth/login");
      }
    };

    handleGoogleLogin();
  }, [status, session, hydrateUser, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-lg font-semibold">
        Signing you in...
      </h2>
    </div>
  );
}