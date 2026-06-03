"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function CategoryMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") ?? "";
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="bg-green-700">
      <div className="max-w-6xl mx-auto px-4 py-2 justify-center flex gap-1">
        <Link
          href="/products"
          className={`px-6 text-center text-sm font-bold py-2 rounded-lg transition
            ${
              activeSlug === "" && pathname === "/products"
                ? "bg-white text-green-700"
                : "text-white hover:bg-green-800"
            }
          `}
        >
          Alle
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-6 text-center text-sm font-bold py-2 rounded-lg transition
              ${
                activeSlug === cat.slug
                  ? "bg-white text-green-700"
                  : "text-white hover:bg-green-800"
              }
            `}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
