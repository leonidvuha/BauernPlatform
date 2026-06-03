import CategoryList from "@/components/CategoryList";
import ProductsSection from "@/components/ProductsSection";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <div>
      <Hero />
      <CategoryList />
      <SearchBar />
      <ProductsSection page={page} />
    </div>
  );
}