import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/providers/Provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { FilterProvider } from "@/context/FilterContext";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Search Param Product Filtering",
  description: "Handling product sorting and filtering using query params",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
