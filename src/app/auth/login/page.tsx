"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string | string[];
        } | null;
        const msg = Array.isArray(body?.message)
          ? body.message.join(", ")
          : (body?.message ?? "Anmeldung fehlgeschlagen");
        throw new Error(msg);
      }
      const profileRes = await fetch("/api/users/profile", {
        credentials: "include",
      });
      const userData = await profileRes.json();
      setUser(userData);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="beispiel@email.de"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={12}
            maxLength={72}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mindestens 12 Zeichen"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Wird angemeldet…" : "Login"}
        </button>

        <p className="text-sm text-gray-600 text-center mt-2">
          Noch nicht registriert?{" "}
          <Link
            href="/auth/register"
            className="text-green-700 hover:text-green-800 underline"
          >
            Erstelle ein Konto
          </Link>
        </p>
      </form>
    </div>
  );
}
