import { api } from "@/lib/api";
import Image from "next/image";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80";

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
            <div className="w-full h-64 relative rounded-xl overflow-hidden">
              <Image
                src={product.img_url || FALLBACK_IMAGE}
                alt={product.title}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
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

            <div className="relative border border-gray-300 rounded-xl p-4 mt-4 min-h-[205px]">
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs px-2 py-0.5 bg-green-700 text-white rounded font-medium border border-green-100"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-900 text-sm">{product.description}</p>
            </div>

            <div className="relative border border-gray-300 rounded-xl p-4 mt-4">
              <span className="absolute -top-3 left-4 bg-white px-1">
                <span className="inline-block bg-green-700 text-white text-xs px-2 py-0.5 rounded">
                  Verkäufer kontaktieren
                </span>
              </span>
              {product.contact?.fullName && (
                <p className="text-sm font-semibold text-gray-900">
                  👤 {product.contact.fullName}
                </p>
              )}
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
