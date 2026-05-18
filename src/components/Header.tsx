"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

const TOKEN_KEY = "bp_token";

const categories = [
  { label: "Alle", slug: "" },
  { label: "Gemüse", slug: "gemuse" },
  { label: "Obst und Beeren", slug: "obst-und-beeren" },
  { label: "Bauern Produkte", slug: "bauern" },
];

// Subscribe to localStorage changes from other tabs.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(TOKEN_KEY);
}

// SSR snapshot: no localStorage on the server.
function getServerSnapshot() {
  return null;
}

export default function Header() {
  const router = useRouter();
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    // Notify same-tab subscribers (storage event fires only cross-tab).
    window.dispatchEvent(new StorageEvent("storage", { key: TOKEN_KEY }));
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-green-700 text-xl">
            BauernPlatform
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <Link
                href="/products/my"
                className="text-gray-700 hover:text-green-700"
              >
                Meine Produkte
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-green-700"
              >
                Mein Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="text-gray-600 hover:text-green-700"
              >
                Registrierung
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-green-700 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="bg-green-50 border-t border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.slug ? `/?category=${cat.slug}` : "/"}
              className="text-sm text-green-800 hover:underline"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
