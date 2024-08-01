// useFilters.ts
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductFilters } from "@/server/getProducts";
import { useFilterContext } from "@/context/FilterContext";

export const useFilters = () => {
  const { filters, setFilters } = useFilterContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const updateFilters = useCallback(
    (newFilters: ProductFilters) => {
      setFilters(newFilters);

      if (newFilters.search) {
        params.set("query", newFilters.search);
      } else {
        params.delete("query");
      }
      if (newFilters.category) {
        params.set("category", newFilters.category);
      } else {
        params.delete("category");
      }
      if (newFilters.maxPrice !== undefined) {
        params.set("price", newFilters.maxPrice.toString());
      } else {
        params.delete("price");
      }
      if (newFilters.rating) {
        params.set("rating", newFilters.rating.toString().replace(",", "-"));
      } else {
        params.delete("rating");
      }
      if (newFilters.sort) {
        params.set("sort", newFilters.sort);
      } else {
        params.delete("sort");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [params, router, pathname]
  );

  return { filters, updateFilters };
};
