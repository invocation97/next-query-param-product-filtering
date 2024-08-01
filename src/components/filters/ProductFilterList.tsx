"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductFilters } from "@/server/getProducts";
import { useCallback, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Star, X } from "lucide-react";
import FilterWrapper from "./FilterWrapper";
import { on } from "events";

type ProductFilterListProps = {
  onChange: (filters: ProductFilters) => void;
  categories: string[];
};
type SortOptionKeys =
  | "Title A-Z"
  | "Title Z-A"
  | "Price low -> high"
  | "Price high -> low"
  | "Rating low -> high"
  | "Rating high -> low";

const sortOptions: Record<SortOptionKeys, string> = {
  "Title A-Z": "title-asc",
  "Title Z-A": "title-desc",
  "Price low -> high": "price-asc",
  "Price high -> low": "price-desc",
  "Rating low -> high": "rating-asc",
  "Rating high -> low": "rating-desc",
};
type SortOptions = (typeof sortOptions)[keyof typeof sortOptions];

export default function ProductFilterList({
  onChange,
  categories,
}: ProductFilterListProps) {
  const [search, setSearch] = useState<ProductFilters["search"]>();
  const [category, setCategory] = useState<ProductFilters["category"]>();
  const [price, setPrice] = useState<ProductFilters["maxPrice"]>();
  const [rating, setRating] = useState<ProductFilters["rating"]>();
  const [sort, setSort] = useState<ProductFilters["sort"]>("title-asc");

  const debouncedSearch = useDebounce(search, 500);

  const handleOnChange = useCallback(() => {
    onChange({
      search: debouncedSearch,
      category,
      maxPrice: price,
      rating,
      sort,
    });
  }, [debouncedSearch, category, price, rating, sort]);

  useEffect(() => {
    handleOnChange();
  }, []);

  const handleSortChange = useCallback((displayValue: SortOptionKeys) => {
    const sortValue = sortOptions[displayValue];
    setSort(sortValue);
  }, []);

  const getDisplayValue = useCallback((sortValue: ProductFilters["sort"]) => {
    return (Object.keys(sortOptions) as SortOptionKeys[]).find(
      (key) => sortOptions[key] === sortValue
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <FilterWrapper>
        <FilterWrapper>
          <Label htmlFor="search">Search</Label>
          <Input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <FilterWrapper>
            <Label>Sort by</Label>
            <Select
              onValueChange={handleSortChange}
              defaultValue={getDisplayValue("title-asc")}
              value={getDisplayValue(sort)}
            >
              <SelectTrigger>
                <SelectValue>{getDisplayValue(sort)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(sortOptions).map((displayValue) => (
                    <SelectItem key={displayValue} value={displayValue}>
                      {displayValue}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FilterWrapper>
        </FilterWrapper>
      </FilterWrapper>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="text-xl font-semibold">Refine your search</h4>
        <FilterWrapper>
          <Label>Category</Label>
          <Select
            onValueChange={(value) => setCategory(value)}
            defaultValue={category}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category">
                {category || "Select a category"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterWrapper>
        <FilterWrapper>
          <Label>Choose a max price</Label>
          <Select
            name="max-price"
            defaultValue={price?.toString()}
            onValueChange={(value) =>
              setPrice(value ? parseInt(value) : undefined)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a price">
                {price || "Select a price"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="500">500</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterWrapper>
        <FilterWrapper>
          <Label>Choose a rating range</Label>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-center justify-between px-1 w-full">
              <span>
                {rating ? rating[0] : 0}{" "}
                <Star className="w-3 h-3 inline-flex -ml-1 text-yellow-800 fill-yellow-300" />
              </span>
              <span>
                <Star className="w-3 h-3 inline-flex -ml-1 text-yellow-800 fill-yellow-300" />
                {rating ? rating[1] : 5}{" "}
              </span>
            </div>
            <Slider
              min={0}
              max={5}
              step={0.1}
              defaultValue={[0, 5]}
              minStepsBetweenThumbs={0.1}
              onValueCommit={(value) => setRating([value[0], value[1]])}
            />
          </div>
        </FilterWrapper>
        <div className="relative mt-2">
          <Button
            onClick={() => {
              setSearch("");
              setCategory("");
              setPrice(0);
              setRating([0, 5]);
              setSort("title-asc");
            }}
          >
            <X className="w-4 h-4 inline-flex -ml-1 mr-1" />
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}
