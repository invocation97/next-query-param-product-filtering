"use server";
import axios from "axios";

export type ProductFilters = {
  category?: string;
  maxPrice?: number;
  search?: string;
  rating?: [number, number];
  sort?: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function getProducts(options?: ProductFilters) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/");

    let filteredProducts = response.data;

    if (!options) {
      return filteredProducts;
    }

    if (options.sort) {
      if (options.sort === "price-asc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return a.price - b.price;
        });
      } else if (options.sort === "price-desc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return b.price - a.price;
        });
      } else if (options.sort === "title-asc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return a.title.localeCompare(b.title);
        });
      } else if (options.sort === "title-desc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return b.title.localeCompare(a.title);
        });
      } else if (options.sort === "rating-asc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return a.rating.rate - b.rating.rate;
        });
      } else if (options.sort === "rating-desc") {
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          return b.rating.rate - a.rating.rate;
        });
      } else {
        return filteredProducts;
      }
    }

    if (options.search !== undefined && options.search !== null) {
      filteredProducts = filteredProducts.filter((product: Product) => {
        return product.title
          .toLowerCase()
          .includes(options.search!.toLowerCase());
      });
    }
    if (options.category) {
      filteredProducts = filteredProducts.filter((product: Product) => {
        return product.category
          .toLowerCase()
          .includes(options.category!.toLowerCase());
      });
    }

    if (options.maxPrice) {
      filteredProducts = filteredProducts.filter((product: Product) => {
        return product.price <= options.maxPrice!;
      });
    }

    if (options.rating) {
      filteredProducts = filteredProducts.filter((product: Product) => {
        return (
          product.rating.rate >= options.rating![0] &&
          product.rating.rate <= options.rating![1]
        );
      });
    }

    return filteredProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductsForCategory(handle: string) {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${handle}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        cache: "force-cache",
        next: {
          tags: ["categories"],
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
