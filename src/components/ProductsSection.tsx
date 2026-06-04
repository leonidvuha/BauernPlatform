import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { Suspense } from "react";
import Pagination from "@/components/Pagination";

interface Props {
  page: number;
  category?: string;
}

export default async function ProductsSection({ page, category }: Props) {
  let products: Product[] = [];
  let meta = { current_page: 1, per_page: 12, total_items: 0, total_pages: 1 };
  let categories: { id: number; name: string; slug: string }[] = [];

  try {
    const [data, categoriesData] = await Promise.all([
      api.products.getAll(page, category),
      api.categories.getAll(),
    ]);
    products = data.products;
    meta = data.meta;
    categories = categoriesData;
  } catch {
    products = [];
  }

  return (
    <section className="mt-8">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map((product) => {
          const categorySlug = category || categories.find(c => c.id === product.category_id)?.slug || "";
          return (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={categorySlug}
            />
          );
        })}
      </div>
      {meta.total_pages > 1 && (
        <Suspense fallback={<div className="h-12" />}>
          <Pagination meta={meta} />
        </Suspense>
      )}
    </section>
  );
}