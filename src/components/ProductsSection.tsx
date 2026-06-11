import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import { Product, ProductsResponse } from "@/types/product";
import { Suspense } from "react";
import Pagination from "@/components/Pagination";

interface Props {
  page: number;
  category?: string;
  search?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}

export default async function ProductsSection({
  page,
  category,
  search,
  lat,
  lng,
  radius,
}: Props) {
  let products: Product[] = [];
  let meta: ProductsResponse["meta"] = {
    current_page: 1,
    per_page: 12,
    total_items: 0,
    total_pages: 1,
  };
  let categories: { id: number; name: string; slug: string }[] = [];

  try {
    const categoriesData = await api.categories.getAll();
    const categoryId = category
      ? categoriesData.find(
          (c: { slug: string; id: number }) => c.slug === category,
        )?.id
      : undefined;

    const hasSearch = search || lat;
    const data = hasSearch
      ? await api.products.search({
          page,
          categoryId,
          search,
          lat,
          lng,
          radius,
        })
      : await api.products.getAll(page, categoryId);

    products = data.products;
    meta = data.meta;
    categories = categoriesData;
  } catch (e) {
    console.error("ProductsSection error:", e);
    products = [];
  }
  const fallbackMessage =
    meta.fallback && meta.fallback_word
      ? `Keine Ergebnisse für die vollständige Suche. Zeige Ergebnisse für „${meta.fallback_word}".`
      : null;

  return (
    <section className="mt-8">
      {fallbackMessage && (
        <p className="mb-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          ⚠️ {fallbackMessage}
        </p>
      )}
      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-medium text-gray-500">
            Keine Produkte gefunden
          </p>
          <p className="text-sm mt-1">
            Versuchen Sie andere Suchbegriffe oder Filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {products.map((product) => {
            const categorySlug =
              category ||
              categories.find((c) => c.id === product.category_id)?.slug ||
              "";
            return (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={categorySlug}
              />
            );
          })}
        </div>
      )}
      {meta.total_pages > 1 && (
        <Suspense fallback={<div className="h-12" />}>
          <Pagination meta={meta} />
        </Suspense>
      )}
    </section>
  );
}
