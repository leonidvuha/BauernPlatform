"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import AvatarUpload from "@/components/AvatarUpload";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(user?.lat ?? "");
  const [lng, setLng] = useState(user?.lng ?? "");

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
          lat: lat ? Math.round(parseFloat(lat) * 1000000) / 1000000 : null,
          lng: lng ? Math.round(parseFloat(lng) * 1000000) / 1000000 : null,
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

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird nicht unterstützt");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toString());
        setLng(position.coords.longitude.toString());
      },
      () => setError("Standort konnte nicht ermittelt werden"),
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Profil bearbeiten
      </h1>
      <hr className="border-gray-300 mb-4" />

      <div className="flex gap-6 divide-x divide-gray-300">
        {/* Ліва частина — форма */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 pr-8"
        >
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Vollständiger Name
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              minLength={2}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-700"
            />
          </div>
          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Telefon
            </span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-700"
            />
          </div>

          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Standort
            </span>
            <button
              type="button"
              onClick={handleGetLocation}
              className="w-full border border-gray-300 text-gray-900 text-sm px-4 py-2 rounded-lg focus:border-green-700"
            >
              📍 Meinen Standort verwenden
            </button>
            <div className="flex gap-4">
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value.replace(",", "."))}
                placeholder="Latitude (z.B. 52.5246)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
              />
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value.replace(",", "."))}
                placeholder="Longitude (z.B. 13.4028)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
              />
            </div>
            <p className="text-xs text-green-700 mt-1">
              Wird für die Produktsuche in Ihrer Nähe verwendet.
            </p>
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}

          <div>
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Über unseren Hof
            </span>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-700 resize-none"
            />
            <p className="text-xs text-green-700 mt-1">
              Möchten Sie auch Ihre Produkte verkaufen? Stellen Sie sich und
              Ihren Hof vor — ein persönliches Profil schafft Vertrauen bei den
              Käufern.
            </p>
          </div>

          <div className="flex gap-3 mt-1">
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
        <div className="self-start pl-8">
          <AvatarUpload />
        </div>
      </div>
    </div>
  );
}
