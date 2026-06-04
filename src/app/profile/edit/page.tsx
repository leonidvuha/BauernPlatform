"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";


export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          phone: phone || null,
          aboutMe: aboutMe || null,
          city: city || null,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string;
          errors?: { path: string[]; message: string }[];
        } | null;

        if (body?.errors && body.errors.length > 0) {
          const msg = body.errors.map((e) => e.message).join(", ");
          throw new Error(msg);
        }
        throw new Error(body?.message ?? "Fehler beim Speichern");
      }

      const updated = await res.json();
      setUser(updated);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Profil bearbeiten
      </h1>
      <hr className="border-gray-300 mb-8" />

      <div className="flex gap-8 divide-x divide-gray-300">
        {/* Ліва частина — форма */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-6 pr-8"
        >
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Vollständiger Name
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              minLength={2}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Telefon
            </span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Über unseren Hof
            </span>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Stadt
            </span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Wird gespeichert…" : "Speichern"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="border border-green-700 text-green-700 text-sm px-6 py-2 rounded-lg hover:bg-green-50 transition"
            >
              Abbrechen
            </button>
          </div>
        </form>

        {/* Права частина — аватар */}
        <div className="flex flex-col items-center gap-3 self-start pl-8">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user.avatarUrl ? (
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
          <button
            type="button"
            className="inline-block bg-green-600 text-white text-xs px-2 py-0.5 rounded"
          >
            {user.avatarUrl ? "Avatar bearbeiten" : "Avatar hinzufügen"}
          </button>
        </div>
      </div>
    </div>
  );
}
