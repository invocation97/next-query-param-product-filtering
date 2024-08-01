import { getCategories } from "@/server/getProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Param Product Filtering",
  description: "Handling product sorting and filtering using query params",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto py-16 px-8">{children}</div>;
}
