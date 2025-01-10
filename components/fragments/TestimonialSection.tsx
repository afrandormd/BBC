'use client'

import * as React from "react"

const testimonials = [
    {
      name: "Ayu Wulandari",
      location: "Mahasiswa",
      quote: "Produk ini membantu meningkatkan produktivitas. Sangat direkomendasikan!"
    },
    {
      name: "Siti Nurhaliza",
      location: "Business Owner",
      quote: "Layanan pelanggan yang luar biasa dan produk berkualitas tinggi. Akan terus pakai!"
    },
    {
      name: "John Doe",
      location: "Professional",
      quote: "Puas dengan kualitas produk dan pelayanannya. Recommended!"
    }
  ]
  

export default function Testimonial() {
  return (
    <section className="w-full py-12 bg-[#FFF4D9]">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-secondary mb-2">
          Apa Kata Pelanggan Kami
        </h2>
        <p className="text-secondary/80">
          Review pelanggan mengenai layanan dan produk dari askha jaya
        </p>
      </div>
    </section>
  )
}
