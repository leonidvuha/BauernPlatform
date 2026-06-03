"use client";

import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

interface Props {
  meta: PaginationMeta;
}

export default function Pagination({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const { current_page, per_page, total_items, total_pages } = meta;
  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total_items);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap text-sm">
      {/* Загальна інформація */}
      <span className="text-gray-500 mr-4">
        {from}–{to} von {total_items}
      </span>

      {/* Перша сторінка */}
      <button
        onClick={() => goToPage(1)}
        disabled={current_page === 1}
        className="px-2 py-1 rounded border border-green-700 text-green-700 disabled:opacity-40 hover:bg-green-50 transition"
      >
        «
      </button>

      {/* Попередня */}
      <button
        onClick={() => goToPage(current_page - 1)}
        disabled={current_page === 1}
        className="px-2 py-1 rounded border border-green-700 text-green-700 disabled:opacity-40 hover:bg-green-50 transition"
      >
        ‹ Zurück
      </button>

      {/* Номери сторінок */}
      {Array.from({ length: total_pages }, (_, i) => i + 1)
        .filter(
          (p) =>
            p === 1 || p === total_pages || Math.abs(p - current_page) <= 2,
        )
        .map((p, idx, arr) => (
          <Fragment key={p}>
            {idx > 0 && arr[idx - 1] !== p - 1 && (
              <span key={`dots-${p}`} className="px-2 text-gray-400">
                …
              </span>
            )}
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded border transition ${
                p === current_page
                  ? "bg-green-700 text-white border-green-700"
                  : "border-green-700 text-green-700 hover:bg-green-50"
              }`}
            >
              {p}
            </button>
          </Fragment>
        ))}

      {/* Наступна */}
      <button
        onClick={() => goToPage(current_page + 1)}
        disabled={current_page === total_pages}
        className="px-2 py-1 rounded border border-green-700 text-green-700 disabled:opacity-40 hover:bg-green-50 transition"
      >
        Weiter ›
      </button>

      {/* Остання сторінка */}
      <button
        onClick={() => goToPage(total_pages)}
        disabled={current_page === total_pages}
        className="px-2 py-1 rounded border border-green-700 text-green-700 disabled:opacity-40 hover:bg-green-50 transition"
      >
        »
      </button>
    </div>
  );
}
