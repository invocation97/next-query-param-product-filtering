import { Product } from "@/server/getProducts";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function ProductTemplate({ product }: { product: Product }) {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full aspect-square"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-muted-foreground">{product.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-primary" />
              ))}
              {[...Array(5 - Math.round(product.rating.rate))].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-5 h-5 fill-muted stroke-muted-foreground"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.count}
            </span>
          </div>
          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">${product.price}</span>
            <Button size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
