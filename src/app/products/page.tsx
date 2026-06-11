import ProductsSection from "@/components/ProductsSection";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    lat?: string;
    lng?: string;
    radius?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category ?? "";
  const search = params.search ?? "";
  const lat = params.lat ? Number(params.lat) : undefined;
  const lng = params.lng ? Number(params.lng) : undefined;
  const radius = params.radius ? Number(params.radius) : undefined;

  return (
    <div>
      <Suspense fallback={<div className="h-20" />}>
        <SearchBar />
      </Suspense>
      <ProductsSection
        page={page}
        category={category}
        search={search}
        lat={lat}
        lng={lng}
        radius={radius}
      />
    </div>
  );
}
