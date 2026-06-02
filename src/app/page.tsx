import Link from "next/link";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import CategoryList from "@/components/CategoryList";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

async function getProducts() {
  try {
    const data = await api.products.getAll();
    return data.products;
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      {/* Hero */}
      <section
        className="relative rounded-2xl overflow-hidden mb-10"
        style={{ minHeight: 320 }}
      >
        <img
          src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1400&q=80"
          alt="Bauernhof"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 opacity-50" />
        <div
          className="relative z-10 flex flex-col justify-end h-full px-8 py-12"
          style={{ minHeight: 320 }}
        >
          <h1 className="text-5xl font-bold text-white text-center leading-tight">
            Frische Produkte direkt vom Bauernhof
          </h1>
          <p className="text-green-100 text-lg text-center w-full">
            Entdecken Sie regionale Spezialitäten unserer Landwirte
          </p>
        </div>
      </section>

      <CategoryList />

      <SearchBar />
      <section className="mt-8">
        <div className="flex flex-wrap gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
