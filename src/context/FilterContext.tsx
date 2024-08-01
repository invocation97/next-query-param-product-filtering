"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { ProductFilters } from "@/server/getProducts";

type FilterContextProps = {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
};

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<ProductFilters>({});

  const value = useMemo(() => ({ filters, setFilters }), [filters]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
