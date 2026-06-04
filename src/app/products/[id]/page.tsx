import { api } from "@/lib/api";
import Image from "next/image";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await api.products.getById(id);
  if (!product) return <div>Produkt leider nicht gefunden</div>;

  return (
    <div className="max-w-4xl mx-auto mt-1 px-4">
      <ProductBreadcrumb
        categoryId={product.category_id}
        productTitle={product.title}
      />
      <div className="relative border border-gray-300 rounded-xl p-8">
        <div className="flex gap-8">
          {/* Ліва частина — фото */}
          <div className="w-80 shrink-0">
            {product.img_url ? (
              <Image
                src={product.img_url}
                alt={product.title}
                fill
                className="object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 text-6xl">🌿</span>
              </div>
            )}
          </div>

          {/* Права частина — інфо */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-green-700">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-gray-900">
                {product.price} €{" "}
                <span className="text-sm font-normal text-gray-500">
                  / {product.unit}
                </span>
              </p>
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium border border-green-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="relative border border-gray-300 rounded-xl p-4 mt-4">
              <span className="absolute -top-3 left-4 bg-white px-1">
                <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
                  Beschreibung
                </span>
              </span>
              <p className="text-gray-900 text-sm">{product.description}</p>
            </div>

            <div className="relative border border-gray-300 rounded-xl p-4 mt-4">
              <span className="absolute -top-3 left-4 bg-white px-1">
                <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
                  Verkäufer kontaktieren
                </span>
              </span>
              <p className="text-sm text-gray-900">
                📧 {product.contact?.email}
              </p>
              {product.contact?.phone && (
                <p className="text-sm text-gray-900">
                  📞 {product.contact.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
