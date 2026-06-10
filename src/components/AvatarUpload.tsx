"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { compressImage } from "@/lib/compressImage";

export default function AvatarUpload() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const compressed = await compressImage(file);
      const res = await fetch("/api/users/avatar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ img: compressed }),
      });

      if (!res.ok) throw new Error("Fehler beim Hochladen");

      const data = await res.json();
      setUser({ ...user!, avatarUrl: data.avatarUrl });
    } catch {
      setError("Avatar konnte nicht hochgeladen werden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {user?.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-6xl text-gray-400">👤</span>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <label className="relative cursor-pointer bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition">
        {loading
          ? "Wird hochgeladen…"
          : user?.avatarUrl
            ? "Avatar bearbeiten"
            : "Avatar hinzufügen"}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
}