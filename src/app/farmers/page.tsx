import Link from 'next/link';
import { api } from '@/lib/api';
import type { FarmerInfo } from '@/types/farmer';
import Pagination from '@/components/Pagination';

export const revalidate = 0;

export default async function FarmersListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  let farmers: FarmerInfo[] = [];
  let meta = { current_page: 1, per_page: 9, total_items: 0, total_pages: 1 };

  try {
    const data = await api.farmers.getAll(page);
    farmers = data.farmers;
    meta = data.meta;
  } catch (error) {
    console.error('Fehler beim Laden der Landwirte-Liste:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Unsere Landwirte
      </h1>
      {farmers.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Derzeit gibt es keine aktiven Landwirte.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {farmer.fullName}
                </h2>
                {farmer.about_me && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {farmer.about_me}
                  </p>
                )}
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>📧 {farmer.contacts.email}</p>
                  {farmer.contacts.phone && <p>📞 {farmer.contacts.phone}</p>}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                  Produkte: {farmer.active_products_count}
                </span>
                <Link
                  href={`/farmers/${farmer.id}`}
                  className="text-sm font-medium text-green-600 hover:text-green-700 underline"
                >
                  Mehr anzeigen →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {meta.total_pages > 1 && (
        <Pagination meta={meta} />
      )}
    </div>
  );
}