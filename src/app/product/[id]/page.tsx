import CategoryList from "@/components/CategoryList";
import ProductTemplate from "@/components/ProductTemplate";
import { getCategories, getProductById } from "@/server/getProducts";

type ParamProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ParamProps) {
  const product = await getProductById(params.id);
  const categories = await getCategories();
  return (
    <div>
      <ProductTemplate product={product ? product : []} />
      <CategoryList categories={categories ? categories : []} />
    </div>
  );
}
