import { cn } from "@/lib/utils";
import React from "react";

export default function FilterWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-2 w-full", className)}>
      {children}
    </div>
  );
}
