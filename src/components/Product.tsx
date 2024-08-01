import { Product as ProductType } from "@/server/getProducts";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export default function Product({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) {
  return (
    <Card className={cn("w-full flex flex-col max-w-sm h-full", className)}>
      <Link
        href={`/product/${product.id}`}
        className="relative isolate aspect-square w-full"
      >
        <Image
          className="p-8 rounded-t-lg absolute inset-0 w-full h-full object-cover"
          src={product.image}
          alt={product.title}
          quality={80}
          fill
          sizes="100%"
        />
      </Link>
      <div className="flex flex-col justify-between px-5 pb-5 flex-grow">
        <div className="flex flex-col items-start w-full">
          <Link href={`/product/${product.id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              {[...Array(5 - Math.round(product.rating.rate))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <Badge className="ms-3">
              {product.rating.rate} / {product.rating.count}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <Button>Add to cart</Button>
        </div>
      </div>
    </Card>
  );
}
