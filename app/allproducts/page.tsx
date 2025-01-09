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
