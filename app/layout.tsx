import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { SearchProvider } from "../context/SearchContext";


export const metadata: Metadata = {
  title: "Highway Delite",
  description: "Book amazing travel experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
