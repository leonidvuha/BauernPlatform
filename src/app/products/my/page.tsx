"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { deleteProduct, toggleProductStatus } from "@/lib/productActions";

export default function MyProductsPage() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    await toggleProductStatus(id, !isActive);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: isActive ? "INACTIVE" : "ACTIVE" } : p,
      ),
    );
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProduct(deleteId);
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  useEffect(() => {
    if (!user) return;
    fetch("/api/products/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="text-center mt-10">Wird geladen…</div>;

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Meine Produkte
        </h1>
        <p className="text-gray-900 text-sm">
          In diesem Bereich können Sie Ihre Produkte für den Verkauf auf dem
          Marktplatz einstellen.
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Link
          href="/products/add"
          className="bg-green-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-800 transition"
        >
          + Produkt hinzufügen
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-900 text-center mt-10">
          Sie haben noch keine Produkte. Fügen Sie Ihr erstes Produkt hinzu!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white border border-green-700 rounded-xl p-4 flex flex-row gap-4 items-start ${product.status !== "ACTIVE" ? "opacity-60" : ""}`}
            >
              {/* Фото */}
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={
                    product.img_url ||
                    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80"
                  }
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Інфо */}
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* Назва і toggle */}
                <div className="flex justify-between items-center gap-4">
                  <p className="text-base font-bold text-gray-900">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-xs font-medium ${product.status === "ACTIVE" ? "text-green-700" : "text-gray-400"}`}
                    >
                      {product.status === "ACTIVE" ? "Aktiv" : "Inaktiv"}
                    </span>
                    <button
                      onClick={() =>
                        handleToggleStatus(
                          product.id,
                          product.status === "ACTIVE",
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${product.status === "ACTIVE" ? "bg-green-700" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${product.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Ціна */}
                <p className="text-base font-bold text-gray-900">
                  {product.price} €{" "}
                  <span className="text-sm font-normal text-gray-400">
                    / {product.unit}
                  </span>
                </p>

                {/* Теги */}
                <div className="flex gap-1 flex-wrap">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs bg-green-700 text-white px-2 py-0.5 rounded font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Опис */}
                <p className="text-sm text-gray-900">{product.description}</p>

                {/* Лінія */}
                <hr className="border-gray-300" />

                {/* Координати і дати */}
                <div className="flex justify-between items-end">
                  <div className="flex gap-4 items-center">
                    {product.lat && product.lng && (
                      <p className="text-xs text-gray-900">
                        📍 {product.lat}, {product.lng}
                      </p>
                    )}
                    <p className="text-xs text-gray-900">
                      Erstellt:{" "}
                      {new Date(product.created_at).toLocaleDateString("de-DE")}
                    </p>
                    {product.updated_at && (
                      <p className="text-xs text-gray-900">
                        Aktualisiert:{" "}
                        {new Date(product.updated_at).toLocaleDateString(
                          "de-DE",
                        )}
                      </p>
                    )}
                  </div>

                  {/* Кнопки */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/edit/${product.id}`}
                      className="text-xs border bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-800 transition"
                    >
                      Bearbeiten
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="text-xs border bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-sm w-full mx-4 shadow-xl overflow-hidden">
            <div className="bg-green-700 px-6 py-4">
              <h2 className="text-base font-bold text-white">
                Produkt löschen
              </h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-900 mb-6">
                Möchten Sie dieses Produkt wirklich löschen?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="text-xs border border-green-700 text-gray-90000 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs bg-red-700 text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
