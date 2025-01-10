'use client'

import * as React from "react"
import { Card, CardContent } from "../elements/card"
import { Avatar, AvatarFallback, AvatarImage } from "../elements/avatar"


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

                <div>
                {
  testimonials.map((testimonial, index) => (
    <Card key={index} className="bg-white shadow-md mb-4">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt={testimonial.name} />
          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <strong>{testimonial.name}</strong> ({testimonial.location}): {testimonial.quote}
        </div>
      </CardContent>
    </Card>
  ))
}
                </div>

            </div>
        </section>
    )
}
