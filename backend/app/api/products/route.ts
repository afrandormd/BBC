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
