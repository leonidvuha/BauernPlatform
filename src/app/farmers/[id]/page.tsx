import { api } from "@/lib/api";
import type { FarmerProfile } from "@/types/farmer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FarmerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let farmerData: FarmerProfile | null = null;

  try {
    farmerData = await api.farmers.getById(id);
  } catch (e) {
    console.error("Fehler beim Laden des Landwirt-Profils:", e);
  }

  if (!farmerData)
    return (
      <div className="text-center mt-10 text-gray-500">
        Landwirt nicht gefunden
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold text-green-700 uppercase tracking-wide mb-8 text-center md:text-left">
        {farmerData.fullName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-xs min-h-[320px] flex flex-col justify-between">
          <p className="text-base text-gray-800 leading-relaxed">
            {farmerData.about_me ||
              "Dieser Landwirt hat noch keine Beschreibung hinzugefügt."}
          </p>
          {farmerData.coordinates?.lat && farmerData.coordinates?.lng && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                📍 Standort: {farmerData.coordinates.lat},{" "}
                {farmerData.coordinates.lng}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
              {farmerData.avatarUrl ? (
                <Image
                  src={farmerData.avatarUrl}
                  alt={farmerData.fullName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-400">👤</span>
              )}
            </div>
            <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded-full mt-2">
              ✓ Verifizierter Landwirt
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
            <span className="inline-block bg-green-600 text-white text-xs px-2 py-0.5 rounded mb-2 font-medium">
              Kontakt
            </span>
            <div className="space-y-1 text-xs text-gray-900">
              <p>✉️ {farmerData.contacts.email}</p>
              {farmerData.contacts.phone && (
                <p>📞 {farmerData.contacts.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Produkte dieses Landwirts
      </h2>
      <hr className="border-gray-200 mb-6" />

      {farmerData.products.length === 0 ? (
        <p className="text-gray-500 text-center py-8 bg-white border border-gray-200 rounded-2xl">
          Dieser Landwirt hat aktuell keine aktiven Produkte.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {farmerData.products.map((product) => {
            const fullProduct: Product = {
              id: product.id,
              title: product.title,
              price: String(product.price),
              img_url: product.imageUrl || "",
              created_at: new Date().toISOString(),
              owner_id: farmerData!.id,
              contact: {
                email: farmerData!.contacts.email,
                phone: farmerData!.contacts.phone,
                fullName: farmerData!.fullName,
              },
              category_id: 0,
              description: "",
              unit: "",
              tags: product.tags || [],
            };
            return <ProductCard key={fullProduct.id} product={fullProduct} />;
          })}
        </div>
      )}
    </div>
  );
}
