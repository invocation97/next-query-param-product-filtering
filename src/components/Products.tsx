"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts, Product as ProductType } from "@/server/getProducts";
import Product from "./Product";
import ProductFilterList from "./filters/ProductFilterList";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useFilters } from "@/hooks/useFilters";
import { DialogTitle } from "@radix-ui/react-dialog";
import ProductSkeleton from "./skeletons/ProductSkeleton";

type ProductProps = {
  categories: string[];
};

export default function Products({ categories }: ProductProps) {
  const { filters } = useFilters();

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", { filters }],
    queryFn: async () => getProducts(filters),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] justify-between gap-8 py-4 md:container relative">
      <div className="hidden md:flex flex-col items-start gap-4 w-full">
        <h3 className="font-bold text-3xl">Filters</h3>
        <ProductFilterList categories={categories} />
      </div>
      <div className="fixed bottom-5 left-[50%] -translate-x-[50%] z-20 w-full md:hidden flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"default"} size={"lg"} className="w-1/2 mx-auto">
              Filters
              <Filter className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <DialogTitle className="sr-only">Filters</DialogTitle>
            <ScrollArea className="h-full">
              <ProductFilterList categories={categories} />
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
