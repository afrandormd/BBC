// import next request and response
import { NextResponse } from "next/server";

// import prisma client
import prisma from "@/prisma/client";

// fungsi ambil seluruh data products
export async function GET() {
  // get all products 
  const products = await prisma.product.findMany();

  // return response JSON 
  return NextResponse.json(
    {
      success: true,
      message: "Kumpulan Data Products",
      data: products,
    },
    {
      status: 200,
    }
  )
}

// fungsi tambah data products
export async function POST(request: any) {
  // get all request
  const { name, price, image, category} = await request.json()

  // create data product
  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      image: image,
      category: category,
    },
  })

  // return response JSON
  return NextResponse.json(
    {
      success: true,
      message: "Data Produk Berhasil Dibuat!",
      data: product,
    },
    {
      status: 201,
    }
  )
}
