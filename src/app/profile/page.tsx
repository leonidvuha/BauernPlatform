"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import AvatarUpload from "@/components/AvatarUpload";

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Willkommen, {user.fullName}!
      </h1>
      <hr className="border-gray-300 mb-4" />
      <div className="flex gap-8 divide-x divide-gray-300">
        {/* Ліва частина — дані */}
        <div className="flex-1 flex flex-col pr-8 max-w-lg gap-4">
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              E-Mail
            </span>
            <p className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 bg-gray-50">
              {user.email}
            </p>
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Telefon
            </span>
            <p className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 bg-gray-50">
              {user.phone ?? "—"}
            </p>
          </div>

          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Standort
            </span>
            <p className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 bg-gray-50">
              {user.lat && user.lng ? `${user.lat}, ${user.lng}` : "—"}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Ihr Standort wird für die Produktsuche in Ihrer Nähe verwendet.
            </p>
          </div>

          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Über unseren Hof
            </span>
            <p className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm min-h-[80px] text-gray-800 bg-gray-50">
              {user.aboutMe ?? "—"}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Möchten Sie auch Ihre Produkte verkaufen? Stellen Sie sich und
              Ihren Hof vor — ein persönliches Profil schafft Vertrauen bei den
              Käufern.
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="mt-1 self-start w-fit bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Profil bearbeiten
          </Link>
        </div>

        {/* Права частина — аватар */}
        <div className="self-start pl-8">
          <AvatarUpload />
        </div>
      </div>
    </div>
  );
}
