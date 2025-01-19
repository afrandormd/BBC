"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/elements/button";
import { Card, CardContent } from "@/components/elements/card";
import { Input } from "@/components/elements/input";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Keripik Pisang Karamel Madu",
    price: 27500,
    image: "/product/keripik-pisang.jpg",
  },
  {
    id: 2,
    name: "Pisang Muli Oven",
    price: 25000,
    image: "/product/muli-ove.jpg",
  },
  {
    id: 3,
    name: "Keripik Sale Pisang",
    price: 25000,
    image: "/product/sale-pisang.jpg",
  },
  {
    id: 4,
    name: "Keripik Nangka Oven",
    price: 27000,
    image: "/product/chips-nangka.jpg",
  },
  {
    id: 5,
    name: "Keripik Nangka",
    price: 27000,
    image: "/product/sale-pisang.jpg",
  },
  {
    id: 6,
    name: "Kacang Udang",
    price: 27000,
    image: "/product/muli-ove.jpg",
  },
  {
    id: 7,
    name: "Keripik Singkong",
    price: 23000,
    image: "/product/keripik-pisang.jpg",
  },
  {
    id: 8,
    name: "Keripik Tempe",
    price: 22000,
    image: "/product/chips-nangka.jpg",
  },
  {
    id: 9,
    name: "Keripik Ubi",
    price: 24000,
    image: "/product/sale-pisang.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

export default function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-serif text-secondary mb-3">
            All Products
          </h1>
          <p className="text-gray-600">Semua produk yang ada pada Askha Jaya</p>
        </div>

        {/* Sidebar filter by category */}
        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-[#FDF6EC] rounded-lg shadow-[0_2px_15px_-3px_rgba(139,69,19,0.07),0_10px_20px_-2px_rgba(139,69,19,0.04)] p-6">
              <h2 className="font-semibold mb-4 text-secondary">
                Filter by Category
              </h2>
              <div className="space-y-2">
                <details className="cursor-pointer group" open>
                  <summary className="text-secondary hover:text-secondary transition-colors duration-200 font-medium p-2 rounded-md hover:bg-[#FFF8DC] flex items-center justify-between">
                    <span>Produk Premium</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <ul className="ml-4 mt-2 space-y-1 text-sm">
                    <li className="text-gray-600 hover:text-secondary p-1.5 rounded-md hover:bg-[#FFF8DC] transition-colors duration-200">
                      Keripik Pisang
                    </li>
                    <li className="text-gray-600 hover:text-secondary p-1.5 rounded-md hover:bg-[#FFF8DC] transition-colors duration-200">
                      Keripik Nangka
                    </li>
                    <li className="text-gray-600 hover:text-secondary p-1.5 rounded-md hover:bg-[#FFF8DC] transition-colors duration-200">
                      Kacang
                    </li>
                  </ul>
                </details>
                <details className="cursor-pointer group">
                  <summary className="text-secondary hover:text-secondary transition-colors duration-200 font-medium p-2 rounded-md hover:bg-[#FFF8DC] flex items-center justify-between">
                    <span>Keripik pisang varian rasa</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                </details>
                <details className="cursor-pointer group">
                  <summary className="text-secondary hover:text-secondary transition-colors duration-200 font-medium p-2 rounded-md hover:bg-[#FFF8DC] flex items-center justify-between">
                    <span>Pio pisang varian rasa</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                </details>
                <details className="cursor-pointer group">
                  <summary className="text-secondary hover:text-secondary transition-colors duration-200 font-medium p-2 rounded-md hover:bg-[#FFF8DC] flex items-center justify-between">
                    <span>Askha Coffee</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                </details>
                <details className="cursor-pointer group">
                  <summary className="text-secondary hover:text-secondary transition-colors duration-200 font-medium p-2 rounded-md hover:bg-[#FFF8DC] flex items-center justify-between">
                    <span>Frozen Food</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                </details>
              </div>
            </div>
          </div>

          {/* input & search form */}
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input
                placeholder="Cari Produk..."
                className="max-w-full bg-white"
              />
              <Button className="bg-primary hover:bg-secondary text-secondary hover:text-primary">
                Search
              </Button>
            </div>
            {/* Card All Products */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="rounded-3xl shadow-md overflow-hidden transform transition-transform hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="bg-white p-6 flex items-center justify-center">
                      <div className="w-48 h-48 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="bg-[#FDF6EC] p-6 flex flex-col items-center">
                      <h3 className="text-gray-800 text-center font-medium mb-2">
                        {product.name}
                      </h3>
                      <p className="text-secondary font-bold">
                        Rp. {product.price.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="bg-primary hover:bg-secondary text-secondary hover:text-primary disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="text-secondary">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-primary hover:bg-secondary text-secondary hover:text-primary disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
