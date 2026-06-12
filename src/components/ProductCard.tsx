import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80";

export default function ProductCard({ product, categorySlug = ""  }: { product: Product;
  categorySlug?: string; }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="w-full h-36 overflow-hidden bg-gray-100 relative">
        <Image
          src={product.img_url || FALLBACK_IMAGE}
          alt={product.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-base font-bold text-gray-900">{product.title}</h2>
        {product.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-0.5 bg-green-700 text-white rounded font-medium"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-end border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900">
            {priceFormatter.format(Number(product.price))}
            <span className="text-sm font-normal text-gray-400">
              {" "}
              / {product.unit}
            </span>
          </span>
        </div>
        <Link
          href={`/products/${product.id}${categorySlug ? `?category=${categorySlug}` : ""}`}
          className="mt-2 block text-center bg-green-700 text-white py-2 rounded-xl font-medium hover:bg-green-800 transition text-sm"
        >
          Details anzeigen
        </Link>
      </div>
    </article>
  );
}
