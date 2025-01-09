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
];

export default function ProductListing() {
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
              <h2 className="font-semibold mb-4">Filter by Category</h2>
              <div className="space-y-2">
                <details className="cursor-pointer" open>
                  <summary className="text-secondary hover:text-secondary">
                    Produk Premium
                  </summary>
                  <ul className="ml-4 mt-2 space-y-1 text-sm">
                    <li className="text-gray-600 hover:text-[#8B4513]">
                      Keripik Pisang
                    </li>
                    <li className="text-gray-600 hover:text-[#8B4513]">
                      Keripik Nangka
                    </li>
                    <li className="text-gray-600 hover:text-[#8B4513]">
                      Kacang
                    </li>
                  </ul>
                </details>
                <details className="cursor-pointer">
                  <summary className="text-[#8B4513] hover:text-[#A0522D]">
                    Keripik pisang varian rasa
                  </summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="text-[#8B4513] hover:text-[#A0522D]">
                    Pio pisang varian rasa
                  </summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="text-[#8B4513] hover:text-[#A0522D]">
                    Askha Coffee
                  </summary>
                </details>
                <details className="cursor-pointer">
                  <summary className="text-[#8B4513] hover:text-[#A0522D]">
                    Frozen Food
                  </summary>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
