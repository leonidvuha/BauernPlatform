"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import CategoryMenu from "./CategoryMenu";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, logout, isLoading } = useAuthStore();

  const pathname = usePathname();
  const isHome = pathname === "/";
  const isRegisterActive = pathname === "/auth/register";
  const isLoginActive = pathname === "/auth/login";
  const isProfileActive = pathname.startsWith("/profile");
  const isMyProductsActive =
    pathname === "/products/my" ||
    pathname.startsWith("/products/edit") ||
    pathname.startsWith("/products/add");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#16a34a" />
            {/* Поля */}
            <path
              d="M8 28 Q20 23 32 28"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M6 31 Q20 25 34 31"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            {/*<path
              d="M10 25 Q20 21 30 25"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />*/}
            {/* Стебло */}
            <line
              x1="20"
              y1="24"
              x2="20"
              y2="12"
              stroke="white"
              strokeWidth="2"
            />
            {/* Лівий листок — горизонтальніший */}
            <path
              d="M20 17 C18 14 12 12 9 13 C11 15 17 17 20 17Z"
              fill="white"
            />
            {/* Правий листок — горизонтальніший */}
            <path
              d="M20 17 C22 14 28 12 31 13 C29 15 23 17 20 17Z"
              fill="white"
            />
            {/* Верхній листок */}
            <path d="M20 15 Q15 11 20 6 Q25 11 20 15Z" fill="white" />
          </svg>
          <span className="font-bold text-green-700 text-xl">
            BauernPlatform
          </span>
        </Link>

        {/* Navigation */}

        <nav className="flex items-center gap-3">
          {isLoading ? null : (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${isProfileActive ? "bg-green-700 text-white border-green-700" : "bg-white text-green-700 border-green-700 hover:bg-green-50"}`}
                  >
                    Mein Profil
                  </Link>
                  <Link
                    href="/products/my"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${isMyProductsActive ? "bg-green-700 text-white border-green-700" : "bg-white text-green-700 border-green-700 hover:bg-green-50"}`}
                  >
                    Meine Produkte
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-gray-500 text-sm font-medium hover:text-gray-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      isRegisterActive
                        ? "bg-green-700 text-white border-green-700"
                        : "bg-white text-green-700 border-green-700 hover:bg-green-50"
                    }`}
                  >
                    Registrierung
                  </Link>
                  <span className="text-gray-400 text-sm">oder</span>
                  <Link
                    href="/auth/login"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                      isLoginActive || (!isLoginActive && !isRegisterActive)
                        ? "bg-green-700 text-white border-green-700"
                        : "bg-white text-green-700 border-green-700 hover:bg-green-50"
                    }`}
                  >
                    Login
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
      {!isHome && (
        <Suspense fallback={<div className="h-10 bg-green-700" />}>
          <CategoryMenu />
        </Suspense>
      )}
    </header>
  );
}
