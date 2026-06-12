import ProductsSection from "@/components/ProductsSection";
import SearchBar from "@/components/SearchBar";
import FarmersSidebar from "@/components/FarmersSidebar";
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
      <div className="flex gap-6 mt-4 items-start">
        <div className="flex-1 min-w-0">
          <ProductsSection
            page={page}
            category={category}
            search={search}
            lat={lat}
            lng={lng}
            radius={radius}
          />
        </div>
        <Suspense fallback={<div className="w-52 shrink-0" />}>
          <FarmersSidebar />
        </Suspense>
      </div>
    </div>
  );
}