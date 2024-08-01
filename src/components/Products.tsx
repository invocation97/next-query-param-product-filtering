"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  ProductFilters,
  Product as ProductType,
} from "@/server/getProducts";
import Product from "./Product";
import ProductFilterList from "./filters/ProductFilterList";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import ProductSkeleton from "./skeletons/ProductSkeleton";

export default function Products({ categories }: { categories: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<ProductFilters["search"]>();
  const [category, setCategory] = useState<ProductFilters["category"]>();
  const [price, setPrice] = useState<ProductFilters["maxPrice"]>();
  const [rating, setRating] = useState<ProductFilters["rating"]>();
  const [sort, setSort] = useState<ProductFilters["sort"]>();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleSearch = useCallback(
    (term: string) => {
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      router.push(`${pathname}?${params.toString()}`);
      setSearch(term);
    },
    [params, router, pathname]
  );

  const handleCategory = useCallback(
    (category: string) => {
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      router.push(`${pathname}?${params.toString()}`);
      setCategory(category);
    },
    [params, router, pathname]
  );

  const handleMaxPrice = useCallback(
    (price: number) => {
      if (price) {
        params.set("price", price.toString());
      } else {
        params.delete("price");
      }
      router.push(`${pathname}?${params.toString()}`);
      setPrice(price);
    },
    [params, router, pathname]
  );

  const handleRating = useCallback(
    (rating: [number, number]) => {
      const [minRating, maxRating] = rating;
      if (minRating !== 0 || maxRating !== 5) {
        params.set("rating", rating.toString().replace(",", "-"));
      } else {
        params.delete("rating");
      }
      router.push(`${pathname}?${params.toString()}`);
      setRating(rating);
    },
    [params, router, pathname]
  );

  const handleSort = useCallback(
    (sort: string) => {
      if (sort) {
        params.set("sort", sort);
      } else {
        params.set("sort", "relevance");
      }
      router.push(`${pathname}?${params.toString()}`);
      setSort(sort);
    },
    [params, router, pathname]
  );

  const handleFilterChange = useCallback(
    (filters: ProductFilters) => {
      handleSearch(filters.search || "");
      handleCategory(filters.category || "");
      handleMaxPrice(filters.maxPrice || 0);
      handleRating(filters.rating || [0, 5]);
      handleSort(filters.sort || "title-asc");
    },
    [handleSearch, handleCategory, handleMaxPrice, handleRating, handleSort]
  );

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      {
        search: search,
        category: category,
        maxPrice: price,
        rating: rating,
        sort: sort,
      },
    ],
    queryFn: async () =>
      getProducts({
        search: search,
        category: category,
        maxPrice: price,
        rating: rating,
        sort: sort,
      }),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] justify-between gap-8 container relative">
      <div className="hidden md:flex flex-col items-start gap-4 w-full">
        <h3 className="font-bold text-3xl">Filters</h3>
        <ProductFilterList
          onChange={handleFilterChange}
          categories={categories}
        />
      </div>
      <div className="fixed bottom-1 left-[50%] -translate-x-[50%] z-20 w-full max-w-sm block md:hidden mx-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} className="w-full">
              Filters
              <Filter className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <ScrollArea className="h-full">
              <ProductFilterList
                onChange={(filters) => {
                  handleSearch(filters.search || "");
                  handleCategory(filters.category || "");
                  handleMaxPrice(filters.maxPrice || 0);
                  handleRating(filters.rating || [0, 5]);
                  handleSort(filters.sort || "title-asc");
                }}
                categories={categories}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto md:mx-0">
        {(isLoading || isFetching) &&
          Array.from({ length: 9 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        {products && products.length > 0
          ? products.map((product: ProductType) => (
              <Product key={product.id} product={product} />
            ))
          : !isLoading &&
            !isFetching && (
              <div className="col-span-full text-center">
                No products available
              </div>
            )}
        {isError && (
          <div className="col-span-full text-center">
            An error occurred while fetching products
          </div>
        )}
      </div>
    </div>
  );
}
