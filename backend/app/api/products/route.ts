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
  const { name, price, image, description, category} = await request.json()

  // validasi apakah nama produk sudah pernah dibuat atau belum
  const check = await prisma.product.findMany({
    where: {
      name: name,
    },
  })

  // jika data nama produk ditemukan
  if (check.length === 1) {
    return NextResponse.json(
      {
        success: false,
        message: "Data Produk Gagal Disimpan! Nama Produk Sudah Ada",
      },
      {
        status: 409,
      },
    )
  }

  // create data product
  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      image: image,
      description: description,
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
