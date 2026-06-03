import ProductsSection from "@/components/ProductsSection";
import SearchBar from "@/components/SearchBar";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category ?? "";

  return (
    <div>
      <SearchBar />
      <ProductsSection page={page} category={category} />
    </div>
  );
}