import { ProductGrid } from "./client";

export default async function ProductListing() {
  let products = [];
  try {
    const apiUrl = "http://localhost:3001"; // langsung pakai hardcoded URL
    const response = await fetch(`${apiUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    products = result.data || []; // ambil array dari properti "data"
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <section className="min-h-screen bg-[#FDF6EC]">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-serif text-[#8B4513] mb-3">
            All Products
          </h1>
          <p className="text-gray-600">Semua produk yang ada pada Askha Jaya</p>
        </div>
        <ProductGrid initialProducts={products} />
      </div>
    </section>
  );
}
