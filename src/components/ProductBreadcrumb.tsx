"use client";

import Link from "next/link";
import { useCategoriesStore } from "@/store/categoriesStore";

interface Props {
  categoryId: number;
  productTitle: string;
}

export default function ProductBreadcrumb({ categoryId, productTitle }: Props) {
  const { categories } = useCategoriesStore();
  const category = categories.find((c) => c.id === categoryId);

  return (
    <div className="flex items-center gap-2 text-sm mb-2">
      <Link href="/products" className="text-gray-800 hover:text-gray-800">
        Alle
      </Link>
      <span className="text-gray-800 text-lg">›</span>
      {category && (
        <>
          <Link
            href={`/products?category=${category.slug}`}
            className="text-gray-800 hover:text-gray-800"
          >
            {category.name}
          </Link>
          <span className="text-gray-800 text-lg">›</span>
        </>
      )}
      <span className="text-gray-800 font-medium">{productTitle}</span>
    </div>
  );
}
