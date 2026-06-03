import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { api } from "@/lib/api";
import { Product } from "@/types/product";

interface Props {
  page: number;
}

export default async function ProductsSection({ page }: Props) {
  let products: Product[] = [];
  let meta = { current_page: 1, per_page: 12, total_items: 0, total_pages: 1 };

  try {
    const data = await api.products.getAll(page);
    products = data.products;
    meta = data.meta;
  } catch {
    products = [];
  }

  return (
    <section className="mt-8">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {meta.total_pages > 1 && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {page > 1 && (
            <Link
              href={`/?page=${page - 1}`}
              className="px-4 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition"
            >
              ←
            </Link>
          )}

          {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(
            (p) => (
              <Link
                key={p}
                href={`/?page=${p}`}
                className={`px-4 py-2 rounded-lg transition ${
                  p === page
                    ? "bg-green-700 text-white"
                    : "border border-green-700 text-green-700 hover:bg-green-50"
                }`}
              >
                {p}
              </Link>
            ),
          )}

          {page < meta.total_pages && (
            <Link
              href={`/?page=${page + 1}`}
              className="px-4 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition"
            >
              →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
