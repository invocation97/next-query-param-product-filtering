import CategoryList from "@/components/CategoryList";
import ProductTemplate from "@/components/ProductTemplate";
import { capitalizeFirstLetter } from "@/lib/utils";
import { getCategories, getProductById } from "@/server/getProducts";

type ParamProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  const capitalizedHandle = capitalizeFirstLetter(product ? product.title : "");

  return {
    title: `${capitalizedHandle} | Category`,
    description: `${product ? product.description : ""}`,
  };
}

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
