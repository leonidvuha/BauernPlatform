"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-8">
        Willkommen, {user.fullName}!
      </h1>
      <hr className="border-gray-300 mb-8" />
      <div className="flex gap-8 divide-x divide-gray-300">
        {/* Ліва частина — дані */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              E-Mail
            </span>
            <p className="text-sm font-medium text-gray-800">{user.email}</p>
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Telefon
            </span>
            <p className="text-sm font-medium text-gray-800">
              {user.phone ?? "—"}
            </p>
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Über unseren Hof
            </span>
            <p className="text-sm font-medium text-gray-800">
              {user.aboutMe ?? "—"}
            </p>
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Stadt
            </span>
            <p className="text-sm font-medium text-gray-800">
              {user.city ?? "—"}
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="mt-8 self-start w-fit bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Profil bearbeiten
          </Link>
        </div>

        {/* Права частина — аватар */}
        <div className="flex flex-col items-center gap-3 self-start">
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
