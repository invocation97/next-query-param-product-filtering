import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-20">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Browse Categories</h2>
        <Carousel
          className="w-full"
          opts={{
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {categories &&
              categories.map(
                (category: string, index: number, array: string[]) => (
                  <CarouselItem
                    key={category}
                    className={`basis-1${array.length}`}
                  >
                    <Link
                      href={`/category/${category}`}
                      className="flex flex-col items-center gap-2 p-4"
                    >
                      <span className="text-xl font-medium select-none">
                        <mark className="p-2 text-white bg-primary/70 rounded">
                          {category}
                        </mark>
                      </span>
                    </Link>
                  </CarouselItem>
                )
              )}
          </CarouselContent>
          <CarouselPrevious className="-translate-x-8 translate-y-0 top-1/4 left-0" />
          <CarouselNext className="translate-x-8 translate-y-0 top-1/4 right-0" />
        </Carousel>
      </div>
    </section>
  );
}
