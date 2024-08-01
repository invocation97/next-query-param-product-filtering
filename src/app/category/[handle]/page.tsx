import Product from "@/components/Product";
import { getProductsForCategory } from "@/server/getProducts";

type CategoryProps = {
  params: {
    handle: string;
  };
};

export default async function CategoryPage({ params }: CategoryProps) {
  const products = await getProductsForCategory(params.handle);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product: any) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
