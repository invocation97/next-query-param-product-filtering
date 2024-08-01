import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { GitlabIcon } from "./Footer";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-muted shadow-lg">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="font-medium hover:text-primary transition-colors"
          >
            Categories
          </Link>
        </nav>
        <Link
          href="https://github.com/invocation97"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <GitlabIcon className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </Link>
      </div>
    </header>
  );
}
