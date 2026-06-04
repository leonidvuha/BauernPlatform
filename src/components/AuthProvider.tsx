"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCategoriesStore } from "@/store/categoriesStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading } = useAuthStore();
  const { setCategories } = useCategoriesStore();

  useEffect(() => {
    // Завантажуємо профіль юзера
    fetch("/api/users/profile", { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((userData) => setUser(userData))
      .catch(() => setLoading(false));

    // Завантажуємо категорії
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setUser, setLoading, setCategories]);

  return <>{children}</>;
}
