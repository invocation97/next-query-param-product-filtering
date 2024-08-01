import { Card } from "../ui/card";

export default function ProductSkeleton() {
  return (
    <Card className="w-full flex flex-col max-w-sm">
      <div className="flex flex-col gap-2 items-start justify-between animate-pulse p-4">
        <div className="relative aspect-square w-full mb-4 bg-gray-300 rounded"></div>
        <div className="h-[3rem] bg-gray-300 rounded w-full mb-2"></div>
        <div className="flex items-start gap-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        </div>
        <div className="flex justify-between items-center w-full px-1">
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </Card>
  );
}
