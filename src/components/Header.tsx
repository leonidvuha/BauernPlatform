import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-green-700 text-xl">
            BauernPlatform
          </span>
        </Link>

        <nav className="flex gap-6">
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
        </nav>
      </div>

      <div className="bg-green-50 border-t border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6">
          <Link
            href="/?category=obst"
            className="text-sm text-green-800 hover:underline"
          >
            Obst
          </Link>
          <Link
            href="/?category=gemuse"
            className="text-sm text-green-800 hover:underline"
          >
            Gemüse
          </Link>
          <Link
            href="/?category=bauern"
            className="text-sm text-green-800 hover:underline"
          >
            Bauern Produkte
          </Link>
        </div>
      </div>
    </header>
  );
}
