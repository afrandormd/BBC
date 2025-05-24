import Image from "next/image";
import { Card, CardContent } from "../elements/card";

interface Product {
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    name: "Keripik Pisang Karamel Madu",
    price: 27500,
    image: "/product/keripik-pisang.jpg",
  },
  {
    name: "Pisang Muli Oven",
    price: 25000,
    image: "/product/muli-oven.jpg",
  },
  {
    name: "Keripik Sale Pisang",
    price: 25000,
    image: "/product/sale-pisang.jpg",
  },
  {
    name: "Keripik Nangka Oven",
    price: 27000,
    image: "/product/chips-nangka.jpg",
  },
];

export default function FeaturedProductSection() {
  return (
    <section className="py-16 px-4 bg-[#FDF6EC]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-secondary text-4xl font-bold font-serif mb-3">
            Produk Pilihan
          </h2>
          <p className="text-gray-700 text-lg">
            Produk premium rekomendasi dari kami yang wajib kamu coba!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="rounded-3xl overflow-hidden transform transition-transform hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="bg-white p-6 flex items-center justify-center">
                  <div className="w-48 h-48 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="bg-[#FDF6EC] p-6 flex flex-col items-center">
                  <h3 className="text-gray-800 text-center font-medium mb-2">
                    {product.name}
                  </h3>
                  <p className="text-secondary font-medium">
                    Rp. {product.price.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
