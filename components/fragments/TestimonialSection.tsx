"use client";

import * as React from "react";
import { Card, CardContent } from "../elements/card";
import { Avatar, AvatarFallback, AvatarImage } from "../elements/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../elements/carousel";

const testimonials = [
  {
    name: "Ayu Wulandari",
    location: "Mahasiswa",
    image: "/placeholder.svg?height=40&width=40",
    quote:
      "Produk ini membantu meningkatkan produktivitas. Sangat direkomendasikan!",
  },
  {
    name: "Siti Nurhaliza",
    location: "Business Owner",
    image: "/placeholder.svg?height=40&width=40",
    quote:
      "Layanan pelanggan yang luar biasa dan produk berkualitas tinggi. Akan terus pakai!",
  },
  {
    name: "John Doe",
    location: "Professional",
    image: "/placeholder.svg?height=40&width=40",
    quote: "Puas dengan kualitas produk dan pelayanannya. Recommended!",
  },
  {
    name: "Natasya",
    location: "Mahasiswa",
    image: "/placeholder.svg?height=40&width=40",
    quote: "Recommended!Buat Oleh-oleh untuk keluarga",
  },
];

export default function Testimonial() {
  return (
    <section className="w-full py-12 overflow-hidden bg-[#FFF4D9]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-secondary font-serif mb-2">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-gray-700">
            Review pelanggan mengenai layanan dan produk dari askha jaya
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <blockquote className="text-secondary/80 text-sm">
                        {testimonial.quote}
                      </blockquote>
                      <div>
                        <div className="font-semibold text-secondary">
                          {testimonial.name}
                        </div>
                        <div className="text-secondary/60 text-sm">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
