import CategoryList from "@/components/CategoryList";
import { getCategories } from "@/server/getProducts";
import React from "react";

export default async function CategoryPage() {
  const categories = await getCategories();
  return (
    <div>
      <CategoryList categories={categories} />
    </div>
  );
}
