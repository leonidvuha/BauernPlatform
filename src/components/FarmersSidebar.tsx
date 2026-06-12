import Link from "next/link";
import { api } from "@/lib/api";
import type { FarmerInfo } from "@/types/farmer";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function FarmersSidebar() {
  let farmers: FarmerInfo[] = [];

  try {
    const data = await api.farmers.getAll();
    farmers = data.farmers.slice(0, 5);
  } catch (e) {
    console.error("FarmersSidebar error:", e);
  }

  if (farmers.length === 0) return null;

  return (
    <aside className="w-52 shrink-0 mt-8">
      <div className="border-2 border-green-700 rounded-xl p-4 bg-white sticky top-4">
        <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-3">
          Unsere Landwirte
        </p>

        <ul className="space-y-3">
          {farmers.map((farmer) => (
            <li key={farmer.id}>
              <Link
                href={`/farmers/${farmer.id}`}
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-medium shrink-0">
                  {getInitials(farmer.fullName)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {farmer.fullName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {farmer.active_products_count} Produkte
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/farmers"
          className="mt-4 block text-center text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg py-2 hover:bg-green-100 transition-colors"
        >
          Alle Landwirte ansehen →
        </Link>
      </div>
    </aside>
  );
}
