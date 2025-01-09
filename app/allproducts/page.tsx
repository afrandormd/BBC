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
