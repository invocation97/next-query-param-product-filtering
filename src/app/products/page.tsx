import Products from "@/components/Products";
import ProductsPageSkeleton from "@/components/skeletons/ProductsPageSkeleton";
import { getCategories } from "@/server/getProducts";
import { Suspense } from "react";

export default async function ProductsPage() {
  const categories = await getCategories();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Suspense fallback={<ProductsPageSkeleton />}>
        <Products categories={categories} />
      </Suspense>
    </main>
  );
}
