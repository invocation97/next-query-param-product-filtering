import Product from "@/components/Product";
import { capitalizeFirstLetter } from "@/lib/utils";
import { getProductsForCategory } from "@/server/getProducts";

type CategoryProps = {
  params: {
    handle: string;
  };
};
export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const capitalizedHandle = capitalizeFirstLetter(params.handle);

  return {
    title: `${capitalizedHandle} | Category`,
    description: `Products in the category: ${params.handle}`,
  };
}

export default async function CategoryPage({ params }: CategoryProps) {
  const products = await getProductsForCategory(params.handle);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
