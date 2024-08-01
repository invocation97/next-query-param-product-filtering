import ProductSkeleton from "./ProductSkeleton";

export default function ProductsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] justify-between gap-8 container relative animate-pulse">
      <div className="bg-gray-200 w-full h-80"></div>
      {Array.from({ length: 9 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
