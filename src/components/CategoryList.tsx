"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  {
    label: "Alle",
    slug: "",
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80",
  },
  {
    label: "Gemüse",
    slug: "gemuse",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80",
  },
  {
    label: "Obst und Beeren",
    slug: "obst-und-beeren",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80",
  },
  {
    label: "Bauern Produkte",
    slug: "bauern",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80",
  },
];

export default function CategoryList() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") ?? "";

  return (
    <section className="mb-8">
      <div className="flex gap-4 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeSlug === cat.slug;
          return (
            <Link
              key={cat.slug || "alle"}
              href={cat.slug ? `/?category=${cat.slug}` : "/"}
              className="flex flex-col items-center gap-2 group w-32"
            >
              <div
                className={`w-32 h-32 rounded-2xl overflow-hidden transition
                ${isActive ? "ring-4 ring-green-700" : ""}
              `}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
