"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCategoriesStore } from "@/store/categoriesStore";
import { createProduct } from "@/lib/productActions";
import { compressImage } from "@/lib/compressImage";

export default function AddProductPage() {
  const { user } = useAuthStore();
  const { categories } = useCategoriesStore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("KG");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [img, setImg] = useState<string | null>(null);

  if (!user) return null;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird nicht unterstützt");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toString());
        setLng(position.coords.longitude.toString());
      },
      () =>
        setError(
          "Standort konnte nicht ermittelt werden. Bitte geben Sie die Koordinaten manuell ein.",
        ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await createProduct({
        title,
        description,
        price: Number(price),
        unit,
        category_id: Number(categoryId),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        lat: Math.round(parseFloat(lat) * 1000000) / 1000000,
        lng: Math.round(parseFloat(lng) * 1000000) / 1000000,
        img: img!,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "Fehler beim Erstellen");
      }

      router.push("/products/my");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      setImg(compressed);
    } catch {
      setError("Fehler beim Verarbeiten des Bildes");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Produkt hinzufügen
      </h1>
      <hr className="border-gray-300 mb-4" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Назва */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Produktname *
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            placeholder="z.B. Karotten „Nantaise“ oder süß-saure Kirschen"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
          />
        </div>

        {/* Опис */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Beschreibung *
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={500}
            rows={3}
            placeholder="Beschreiben Sie Ihr Produkt"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700 resize-none"
          />
        </div>

        {/* Ціна і одиниця */}
        <div className="flex gap-4">
          <div className="flex-1">
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Preis (€) *
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0.01}
              max={10000}
              step={0.01}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="w-32">
            <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
              Einheit *
            </span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-green-700"
            >
              <option value="KG">kg</option>
              <option value="L">l</option>
              <option value="ST">stück</option>
            </select>
          </div>
        </div>

        {/* Категорія */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Kategorie *
          </span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
          >
            <option value="" className="text-gray-400">
              Kategorie wählen
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Теги */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Tags
          </span>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="bio, organic, saisonal, knackig, süß..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
          />
          <p className="text-xs text-gray-500 mt-1">
            Mit Tags können Sie Geschmack, Form oder Besonderheiten Ihres
            Produkts beschreiben (z.B. bio, knackig, süß). Das hilft Käufern bei
            der Auswahl und macht Ihr Produkt in der Suche leichter
            auffindbar.Tags mussen durch Komma trennen.
          </p>
        </div>

        {/* Координати */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Product Koordinaten *
          </span>
          <button
            type="button"
            onClick={handleGetLocation}
            className="w-full border border-gray-300 text-grey-900 text-sm px-4 py-2 rounded-lg focus:border-green-700"
          >
            📍 Meinen Standort verwenden
          </button>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}

          <div className="flex gap-4">
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value.replace(",", "."))}
              required
              placeholder="Latitude (z.B. 52.5246)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
            />
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value.replace(",", "."))}
              required
              placeholder="Longitude (z.B. 13.4028)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-700"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            * Pflichtfeld. Nutzen Sie den Standort-Button oder geben Sie die
            Koordinaten manuell ein.
          </p>
        </div>

        {/* Фото */}
        <div>
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
            Produkt Foto *
          </span>
          <label className="flex items-center gap-3 w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-gray-400 text-sm">🖼️</span>
            <span className="text-sm text-gray-400">
              {img ? "Foto ausgewählt ✓" : "Foto auswählen..."}
            </span>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-xs text-gray-500">* Pflichtfelder</p>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-60"
          >
            {loading ? "Wird gespeichert…" : "Produkt erstellen"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/products/my")}
            className="border border-green-700 text-green-700 text-sm px-6 py-2 rounded-lg hover:bg-green-50 transition"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
