"use client";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
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

type ProductFilterListProps = {
  categories: string[];
};

const sortOptions: Record<string, string> = {
  "Title A-Z": "title-asc",
  "Title Z-A": "title-desc",
  "Price low -> high": "price-asc",
  "Price high -> low": "price-desc",
  "Rating low -> high": "rating-asc",
  "Rating high -> low": "rating-desc",
};

export default function ProductFilterList({
  categories,
}: ProductFilterListProps) {
  const { filters, updateFilters } = useFilters();
  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "");
  const [price, setPrice] = useState(filters.maxPrice || 0);
  const [rating, setRating] = useState<[number, number]>(
    filters.rating || [0, 5]
  );
  const [sort, setSort] = useState(filters.sort || "title-asc");

  useEffect(() => {
    updateFilters({ search, category, maxPrice: price, rating, sort });
  }, [search, category, price, rating, sort, updateFilters]);

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <FilterWrapper>
        <Label htmlFor="search">Search</Label>
        <Input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <Label>Sort by</Label>
        <Select onValueChange={setSort} defaultValue={sort} value={sort}>
          <SelectTrigger>
            <SelectValue>
              {Object.keys(sortOptions).find(
                (key) => sortOptions[key] === sort
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(sortOptions).map((key) => (
                <SelectItem key={key} value={sortOptions[key]}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FilterWrapper>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="text-xl font-semibold">Refine your search</h4>
        <FilterWrapper>
          <Label>Category</Label>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category">
                {category || "Select a category"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
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
            onValueChange={(value) => setPrice(value ? parseInt(value) : 0)}
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
