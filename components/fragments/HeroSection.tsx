import Image from "next/image";
// import { Button } from "@/elements/button"
import { Button } from "../elements/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                Askha Jaya
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-800">
                Lampung Surganya Pisang
              </h2>
            </div>
            <p className="max-w-[600px] text-gray-600 md:text-lg">
              Dengan lebih dari 4 cabang yang tersebar di berbagai wilayah di
              Bandar Lampung, Tentunya Askha Jaya selalu menghadirkan
              pengalaman, unik dan memperkuat hubungan kepada pelanggan menjadi
              fokus utama.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/allproducts">
                <Button className="w-full bg-primary text-white hover:bg-secondary hover:text-primary">
                  All Products
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <Image
              alt="Askha Jaya Store"
              className="rounded-lg object-cover"
              height="400"
              width="600"
              src="/gambar-toko.png"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
