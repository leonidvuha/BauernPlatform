"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    fetch("/api/users/profile", { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((userData) => setUser(userData))
      .catch(() => setLoading(false));
  }, [setUser, setLoading]);

  return <>{children}</>;
}
