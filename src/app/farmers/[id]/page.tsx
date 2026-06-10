import { api, FarmerResponse } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface PageProps {
  params: Promise<{ id: string }>;
}
interface BackendShortProduct {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
  img_url?: string;
}

export default async function FarmerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let farmerData: FarmerResponse | null = null;

  try {
    // Делаем запрос к нашему новому методу в api.ts
    farmerData = await api.users.getFarmerById(id);

    // Принудительно приводим к типу, который ждет страница,
    // чтобы обойти строгие проверки TypeScript
  } catch (e) {
    console.error('Fehler beim Laden des Landwirt-Profils:', e);
  }
  if (!farmerData)
    return <div className="text-center mt-10">Landwirt nicht gefunden</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xs mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🧑‍🌾 {farmerData.fullName}
          </h1>

          <div className="mb-6">
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded mb-2">
              Über uns
            </span>
            <p className="text-sm text-gray-800 leading-relaxed">
              {farmerData.about_me ||
                'Dieser Landwirt hat noch keine Beschreibung hinzugefügt.'}
            </p>
          </div>

          {farmerData.coordinates?.lat && farmerData.coordinates?.lng && (
            <p className="text-xs text-gray-500 mb-2">
              📍 Standort: {farmerData.coordinates.lat},{' '}
              {farmerData.coordinates.lng}
            </p>
          )}
        </div>

        <div className="w-full md:w-72 bg-gray-50 border border-gray-200 rounded-xl p-5 h-fit">
          <span className="inline-block bg-green-600 text-white text-xs px-2 py-0.5 rounded mb-3">
            Kontakt
          </span>
          <p className="text-sm text-gray-900 mb-1">
            ✉️ {farmerData.contacts.email}
          </p>
          {farmerData.contacts.phone && (
            <p className="text-sm text-gray-900">
              📞 {farmerData.contacts.phone}
            </p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Produkte dieses Landwirts
      </h2>
      <hr className="border-gray-200 mb-6" />

      {farmerData.products.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          Dieser Landwirt hat aktuell keine aktiven Produkte.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {farmerData.products.map((shortProduct: BackendShortProduct) => {
            const fullProduct: Product = {
              id: shortProduct.id,
              title: shortProduct.title,
              price: String(shortProduct.price),
              img_url: shortProduct.imageUrl || shortProduct.img_url || '',
              created_at: new Date().toISOString(),
              owner_id: farmerData ? farmerData.id : '',
              contact: {
                email: farmerData?.contacts?.email || '',
                phone: farmerData?.contacts?.phone || null,
                fullName: farmerData.fullName || '',
              },
              category_id: 0,
              description: '',
              unit: '',
              tags: [],
            };

            return <ProductCard key={fullProduct.id} product={fullProduct} />;
          })}
        </div>
      )}
    </div>
  );
}
