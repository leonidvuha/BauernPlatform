import Link from 'next/link';
import { api } from '@/lib/api';

export const revalidate = 0;

// Описываем интерфейс СТРОГО по возвращаемому объекту из твоего бэкенда!
interface ValidSeller {
  id: string;
  fullName: string;
  about_me: string | null;
  contacts: {
    email: string;
    phone: string | null;
  };
  active_products_count: number;
}

export default async function FarmersListPage() {
  let sellers: ValidSeller[] = [];

  try {
    const rawData = await api.users.getActiveSellers();
    // Безопасный каст через unknown, так как мы точно знаем структуру
    sellers = rawData as unknown as ValidSeller[];
  } catch (error) {
    console.error('Fehler beim Laden der Landwirte-Liste:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Unsere Landwirte
      </h1>

      {sellers.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Derzeit gibt es keine aktiven Landwirte.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller: ValidSeller) => {
            // Больше никаких проверок на undefined! Поля гарантированно есть в типе
            const sellerId = seller.id;
            const sellerName = seller.fullName || 'Verifizierter Landwirt';
            const sellerAbout = seller.about_me;
            const sellerProductsCount = seller.active_products_count || 0;
            const sellerEmail = seller.contacts.email;
            const sellerPhone = seller.contacts.phone;

            return (
              <div
                key={sellerId}
                className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {sellerName}
                  </h2>
                  {sellerAbout && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {sellerAbout}
                    </p>
                  )}
                  <div className="text-xs text-gray-500 space-y-1 mb-4">
                    <p>📧 {sellerEmail}</p>
                    {sellerPhone && <p>📞 {sellerPhone}</p>}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                    Produkte: {sellerProductsCount}
                  </span>

                  <Link
                    href={`/farmers/${sellerId}`}
                    className="text-sm font-medium text-green-600 hover:text-green-700 underline"
                  >
                    Mehr anzeigen →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
