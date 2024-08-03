import Products from "@/components/Products";
import ProductsPageSkeleton from "@/components/skeletons/ProductsPageSkeleton";
import { getCategories } from "@/server/getProducts";
import { Suspense } from "react";
import { FilterProvider } from "@/context/FilterContext";

type ProductsPageProps = {
  searchParams: {
    query?: string;
    category?: string;
    price?: number;
    rating?: [number, number];
    sort?: string;
  };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const categories = await getCategories();
  const { query, category, price: maxPrice, rating, sort } = searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Suspense fallback={<ProductsPageSkeleton />}>
        <FilterProvider
          initialFilters={{ search: query, category, maxPrice, rating, sort }}
        >
          <Products categories={categories} />
        </FilterProvider>
      </Suspense>
    </main>
  );
}
