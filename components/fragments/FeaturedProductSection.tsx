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
    image: "/product/muli-ove.jpg",
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
