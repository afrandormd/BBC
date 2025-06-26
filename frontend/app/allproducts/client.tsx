/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { Card, CardContent } from "@/components/elements/card";
import {
  Star,
  Banana,
  PieChart,
  Coffee,
  Snowflake,
  ShoppingBag,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  name: string;
  items?: string[];
}

const categories: Category[] = [
  {
    name: "Produk Premium",
  },
  { name: "Keripik pisang varian rasa" },
  { name: "Pie pisang varian rasa" },
  { name: "Askha Coffee" },
  { name: "Frozen Food" },
];

export function ProductGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const filtered = initialProducts.filter(
      (product) =>
        (selectedCategory
          ? product.category.toLowerCase() === selectedCategory.toLowerCase()
          : true) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, initialProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSearchQuery("");
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "produk premium":
        return <Star className="w-4 h-4" />;
      case "keripik pisang varian rasa":
        return <Banana className="w-4 h-4" />;
      case "pie pisang varian rasa":
        return <PieChart className="w-4 h-4" />;
      case "askha coffee":
        return <Coffee className="w-4 h-4" />;
      case "frozen food":
        return <Snowflake className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-8">
      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white/80 rounded-lg shadow-md p-6">
          <h2 className="font-semibold mb-4 text-[#8B4513]">
            Filter by Category
          </h2>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`flex items-center w-full text-left ${
                  selectedCategory === category.name
                    ? "bg-[#FFA500] text-white"
                    : "text-[#8B4513] hover:text-[#A0522D] hover:bg-white"
                } transition-colors duration-200 font-medium p-2 rounded-md`}
                onClick={() => handleCategoryFilter(category.name)}
              >
                <span className="mr-2">{getCategoryIcon(category.name)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="space-y-6">
        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder="Cari Produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-full bg-white"
          />
          <Button
            className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B4513]"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={
                      product.image ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B986BD7B3-5C8F-4381-A2CD-94ED9DFC4338%7D-gdg5r9v8IR7uRrxKdGQX9QEhsdVeUD.png" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[#8B4513] text-center font-medium mb-2">
                  {product.name}
                </h3>
                <p className="text-[#8B4513] font-bold text-center">
                  Rp. {product.price.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B4513]"
            >
              Previous
            </Button>
            <span className="text-[#8B4513]">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B4513]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
