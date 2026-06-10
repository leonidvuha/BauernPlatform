"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { useCategoriesStore } from "@/store/categoriesStore";

// Картинки категорій (їх немає в базі, тому тримаємо тут за slug)
const CATEGORY_IMAGES: Record<string, string> = {
  "": "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80",
  gemuse:
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80",
  "obst-und-beeren":
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80",
  "bauern-produkte":
    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80";

function CategoryListInner() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") ?? "";
  const { categories } = useCategoriesStore();

  // "Alle" + категорії з бекенду
  const items = [
    { label: "Alle", slug: "" },
    ...categories.map((c) => ({ label: c.name, slug: c.slug })),
  ];

  return (
    <section className="mb-8">
      <div className="flex gap-4 justify-center">
        {items.map((cat) => {
          const isActive = activeSlug === cat.slug;
          return (
            <Link
              key={cat.slug || "alle"}
              href={cat.slug ? `/products?category=${cat.slug}` : "/products"}
              className="flex flex-col items-center gap-2 group w-32"
            >
              <div
                className={`w-32 h-32 rounded-2xl overflow-hidden transition relative
                ${isActive ? "ring-4 ring-green-700" : ""}
              `}
              >
                <Image
                  src={CATEGORY_IMAGES[cat.slug] ?? FALLBACK_IMAGE}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span
                className={`text-sm font-medium transition
                ${isActive ? "text-green-700 font-bold underline" : "text-gray-700 group-hover:text-green-700"}
              `}
              >
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function CategoryList() {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <CategoryListInner />
    </Suspense>
  );
}