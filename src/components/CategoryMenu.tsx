"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { id: 1, name: "Gemüse", slug: "gemuse" },
  { id: 2, name: "Obst und Beeren", slug: "obst-und-beeren" },
  { id: 3, name: "BauernProdukte", slug: "bauern-produkte" },
];

export default function CategoryMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") ?? "";

  return (
    <div className="bg-green-700">
      <div className="max-w-6xl mx-auto px-4 py-2 justify-center flex gap-1">
        <Link
          href="/products"
          className={`px-6 text-center text-sm font-bold py-2 rounded-lg transition
            ${activeSlug === "" && pathname === "/products"
              ? "bg-white text-green-700"
              : "text-white hover:bg-green-800"}
          `}
        >
          Alle
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-6 text-center text-sm font-bold py-2 rounded-lg transition
              ${activeSlug === cat.slug
                ? "bg-white text-green-700"
                : "text-white hover:bg-green-800"}
            `}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}